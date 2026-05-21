"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getStudentSession } from "@/lib/auth/student-session";
import { calculateEarnedScore, type Difficulty } from "@/lib/scoring";

export interface SubmitMissionResult {
  success: boolean;
  error?: string;
  earnedScore?: number;
  totalScore?: number;
  alreadySolved?: boolean;
}

export async function submitMissionAttempt(params: {
  missionId: string;
  difficulty: Difficulty;
  isCorrect: boolean;
  wrongAttempts: number;
  submittedCode: string;
}): Promise<SubmitMissionResult> {
  const session = await getStudentSession();
  if (!session) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  if (!params.isCorrect) {
    return { success: true, earnedScore: 0 };
  }

  try {
    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from("mission_attempts")
      .select("id, is_correct, earned_score")
      .eq("student_id", session.studentId)
      .eq("mission_id", params.missionId)
      .maybeSingle();

    const { data: studentRow } = await supabase
      .from("students")
      .select("total_score")
      .eq("id", session.studentId)
      .single();

    if (existing?.is_correct) {
      return {
        success: true,
        earnedScore: 0,
        totalScore: studentRow?.total_score ?? 0,
        alreadySolved: true,
      };
    }

    const earnedScore = calculateEarnedScore(params.difficulty, params.wrongAttempts);

    const { error: insertError } = await supabase.from("mission_attempts").insert({
      student_id: session.studentId,
      mission_id: params.missionId,
      difficulty: params.difficulty,
      is_correct: true,
      wrong_attempts: params.wrongAttempts,
      earned_score: earnedScore,
      submitted_code: params.submittedCode,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        const { data: refreshedStudent } = await supabase
          .from("students")
          .select("total_score")
          .eq("id", session.studentId)
          .single();
        return {
          success: true,
          earnedScore: 0,
          totalScore: refreshedStudent?.total_score ?? 0,
          alreadySolved: true,
        };
      }
      return { success: false, error: "기록 저장에 실패했습니다." };
    }

    const { data: updatedStudent } = await supabase
      .from("students")
      .select("total_score")
      .eq("id", session.studentId)
      .single();

    return {
      success: true,
      earnedScore,
      totalScore: updatedStudent?.total_score ?? 0,
      alreadySolved: false,
    };
  } catch {
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}

export async function getSolvedMissionIds(): Promise<string[]> {
  const session = await getStudentSession();
  if (!session) return [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("mission_attempts")
      .select("mission_id")
      .eq("student_id", session.studentId)
      .eq("is_correct", true);

    return (data ?? []).map((row) => row.mission_id);
  } catch {
    return [];
  }
}
