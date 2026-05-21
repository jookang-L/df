"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashPassword } from "@/lib/auth/password";
import { getAdminSession } from "@/lib/auth/admin-session";
import type { MissionAttempt, Student } from "@/types/database";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export type AdminStudent = Pick<
  Student,
  "id" | "student_number" | "name" | "total_score" | "created_at"
>;

export async function getAdminStudents(): Promise<AdminStudent[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("students")
    .select("id, student_number, name, total_score, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getStudentAttempts(studentId: string): Promise<MissionAttempt[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("mission_attempts")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function resetStudentScore(studentId: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient();

  const { error: deleteError } = await supabase
    .from("mission_attempts")
    .delete()
    .eq("student_id", studentId);

  if (deleteError) throw new Error(deleteError.message);

  const { error: updateError } = await supabase
    .from("students")
    .update({ total_score: 0 })
    .eq("id", studentId);

  if (updateError) throw new Error(updateError.message);
  revalidatePath("/admin");
  revalidatePath("/score");
}

export async function deleteStudent(studentId: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("students").delete().eq("id", studentId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/score");
}

export async function updateStudentPassword(
  studentId: string,
  newPassword: string
): Promise<{ error?: string }> {
  await requireAdmin();

  if (newPassword.length < 4) {
    return { error: "비밀번호는 4자 이상이어야 합니다." };
  }

  const supabase = createAdminClient();
  const passwordHash = await hashPassword(newPassword);
  const { error } = await supabase
    .from("students")
    .update({ password_hash: passwordHash })
    .eq("id", studentId);

  if (error) return { error: error.message };
  return {};
}

export async function resetLeaderboard(): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient();

  const { error: truncateAttempts } = await supabase
    .from("mission_attempts")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (truncateAttempts) throw new Error(truncateAttempts.message);

  const { error: resetScores } = await supabase
    .from("students")
    .update({ total_score: 0 })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (resetScores) throw new Error(resetScores.message);
  revalidatePath("/admin");
  revalidatePath("/score");
}
