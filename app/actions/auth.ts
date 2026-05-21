"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  createStudentSession,
  deleteStudentSession,
  getStudentSession,
} from "@/lib/auth/student-session";

export interface AuthActionState {
  error?: string;
  success?: boolean;
}

export async function registerStudent(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const studentNumber = String(formData.get("studentNumber") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  if (!studentNumber || !name || !password) {
    return { error: "모든 항목을 입력해주세요." };
  }

  if (password.length < 4) {
    return { error: "비밀번호는 4자 이상이어야 합니다." };
  }

  if (password !== passwordConfirm) {
    return { error: "비밀번호가 일치하지 않습니다." };
  }

  try {
    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from("students")
      .select("id")
      .eq("student_number", studentNumber)
      .maybeSingle();

    if (existing) {
      return { error: "이미 등록된 학번입니다." };
    }

    const passwordHash = await hashPassword(password);

    const { data: student, error } = await supabase
      .from("students")
      .insert({
        student_number: studentNumber,
        name,
        password_hash: passwordHash,
      })
      .select("id, student_number, name")
      .single();

    if (error || !student) {
      return { error: "회원가입에 실패했습니다. 다시 시도해주세요." };
    }

    await createStudentSession({
      studentId: student.id,
      studentNumber: student.student_number,
      name: student.name,
    });
  } catch {
    return { error: "서버 설정 오류입니다. 관리자에게 문의하세요." };
  }

  redirect("/mission");
}

export async function loginStudent(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const studentNumber = String(formData.get("studentNumber") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/mission");

  if (!studentNumber || !password) {
    return { error: "학번과 비밀번호를 입력해주세요." };
  }

  try {
    const supabase = createAdminClient();

    const { data: student } = await supabase
      .from("students")
      .select("id, student_number, name, password_hash")
      .eq("student_number", studentNumber)
      .maybeSingle();

    if (!student) {
      return { error: "학번 또는 비밀번호가 올바르지 않습니다." };
    }

    const valid = await verifyPassword(password, student.password_hash);
    if (!valid) {
      return { error: "학번 또는 비밀번호가 올바르지 않습니다." };
    }

    await createStudentSession({
      studentId: student.id,
      studentNumber: student.student_number,
      name: student.name,
    });
  } catch {
    return { error: "서버 설정 오류입니다. 관리자에게 문의하세요." };
  }

  redirect(redirectTo.startsWith("/") ? redirectTo : "/mission");
}

export async function logoutStudent(): Promise<void> {
  await deleteStudentSession();
  redirect("/");
}

export async function getCurrentStudent() {
  return getStudentSession();
}
