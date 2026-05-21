"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { maskName, maskStudentNumber } from "@/lib/masking";

export interface LeaderboardEntry {
  rank: number;
  maskedStudentNumber: string;
  maskedName: string;
  totalScore: number;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("students")
      .select("student_number, name, total_score")
      .order("total_score", { ascending: false })
      .order("created_at", { ascending: true });

    if (error || !data) return [];

    return data.map((row, index) => ({
      rank: index + 1,
      maskedStudentNumber: maskStudentNumber(row.student_number),
      maskedName: maskName(row.name),
      totalScore: row.total_score,
    }));
  } catch {
    return [];
  }
}
