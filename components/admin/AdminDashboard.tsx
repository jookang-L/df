"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Trash2,
  RotateCcw,
  KeyRound,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import {
  deleteStudent,
  getAdminStudents,
  getStudentAttempts,
  resetLeaderboard,
  resetStudentScore,
  updateStudentPassword,
  type AdminStudent,
} from "@/app/actions/admin";
import { logoutAdmin } from "@/app/actions/admin-auth";
import type { MissionAttempt } from "@/types/database";

interface AdminDashboardProps {
  initialStudents: AdminStudent[];
}

export default function AdminDashboard({ initialStudents }: AdminDashboardProps) {
  const [students, setStudents] = useState(initialStudents);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<MissionAttempt[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const refreshStudents = () => {
    startTransition(async () => {
      const data = await getAdminStudents();
      setStudents(data);
    });
  };

  const handleExpand = (studentId: string) => {
    if (expandedId === studentId) {
      setExpandedId(null);
      setAttempts([]);
      return;
    }
    setExpandedId(studentId);
    setNewPassword("");
    startTransition(async () => {
      const data = await getStudentAttempts(studentId);
      setAttempts(data);
    });
  };

  const runAction = (action: () => Promise<void>, successMsg: string) => {
    startTransition(async () => {
      try {
        await action();
        setMessage(successMsg);
        refreshStudents();
        if (expandedId) {
          const data = await getStudentAttempts(expandedId);
          setAttempts(data);
        }
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "오류가 발생했습니다.");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">관리자 대시보드</h1>
          <p className="text-sm text-gray-500 mt-1">학생 관리 및 리더보드 설정</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (!confirm("전체 리더보드를 초기화할까요? 모든 점수와 기록이 삭제됩니다.")) return;
              runAction(resetLeaderboard, "리더보드가 초기화되었습니다.");
            }}
            disabled={pending}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            <AlertTriangle className="w-4 h-4" />
            리더보드 초기화
          </button>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl px-4 py-3"
        >
          {message}
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          <h2 className="font-semibold text-gray-800">전체 학생 ({students.length}명)</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {students.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-12">등록된 학생이 없습니다.</p>
          )}

          {students.map((student) => (
            <div key={student.id}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 hover:bg-gray-50">
                <button
                  type="button"
                  onClick={() => handleExpand(student.id)}
                  className="flex-1 flex items-center gap-3 text-left min-w-0"
                >
                  {expandedId === student.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {student.name}{" "}
                      <span className="text-gray-400 font-normal font-mono text-sm">
                        ({student.student_number})
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      총점 {student.total_score}점 · 가입{" "}
                      {new Date(student.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </button>

                <div className="flex gap-2 shrink-0 pl-7 sm:pl-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (!confirm(`${student.name} 학생의 점수를 초기화할까요?`)) return;
                      runAction(
                        () => resetStudentScore(student.id),
                        "점수가 초기화되었습니다."
                      );
                    }}
                    disabled={pending}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    점수 초기화
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!confirm(`${student.name} 학생을 삭제할까요?`)) return;
                      runAction(() => deleteStudent(student.id), "학생이 삭제되었습니다.");
                      setExpandedId(null);
                    }}
                    disabled={pending}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제
                  </button>
                </div>
              </div>

              {expandedId === student.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-4 pb-4 bg-gray-50 border-t border-gray-100"
                >
                  <div className="pt-4 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호 (4자 이상)"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          startTransition(async () => {
                            const result = await updateStudentPassword(student.id, newPassword);
                            if (result.error) {
                              setMessage(result.error);
                            } else {
                              setMessage("비밀번호가 변경되었습니다.");
                              setNewPassword("");
                            }
                          });
                        }}
                        disabled={pending || newPassword.length < 4}
                        className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium disabled:opacity-50"
                      >
                        <KeyRound className="w-4 h-4" />
                        비밀번호 변경
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        풀이 기록 ({attempts.length}건)
                      </h3>
                      {attempts.length === 0 ? (
                        <p className="text-sm text-gray-500">기록이 없습니다.</p>
                      ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                          <table className="min-w-full text-xs">
                            <thead className="bg-gray-100 text-gray-500">
                              <tr>
                                <th className="px-3 py-2 text-left">미션 ID</th>
                                <th className="px-3 py-2 text-left">난이도</th>
                                <th className="px-3 py-2 text-left">정답</th>
                                <th className="px-3 py-2 text-left">오답 횟수</th>
                                <th className="px-3 py-2 text-left">점수</th>
                                <th className="px-3 py-2 text-left">제출 시간</th>
                              </tr>
                            </thead>
                            <tbody>
                              {attempts.map((a) => (
                                <tr key={a.id} className="border-t border-gray-100">
                                  <td className="px-3 py-2 font-mono">{a.mission_id}</td>
                                  <td className="px-3 py-2">{a.difficulty}</td>
                                  <td className="px-3 py-2">{a.is_correct ? "O" : "X"}</td>
                                  <td className="px-3 py-2">{a.wrong_attempts}</td>
                                  <td className="px-3 py-2 font-bold">{a.earned_score}</td>
                                  <td className="px-3 py-2 text-gray-500">
                                    {new Date(a.created_at).toLocaleString("ko-KR")}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
