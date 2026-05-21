"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Trash2,
  RotateCcw,
  KeyRound,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ArrowUpDown,
  Trophy,
  TrendingUp,
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

type SortKey = "score" | "student_number";
type SortDir = "asc" | "desc";

function sortStudents(students: AdminStudent[], key: SortKey, dir: SortDir): AdminStudent[] {
  return [...students].sort((a, b) => {
    let cmp = 0;
    if (key === "score") {
      cmp = a.total_score - b.total_score;
    } else {
      cmp = a.student_number.localeCompare(b.student_number, "ko", { numeric: true });
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

function getScoreStyle(score: number, maxScore: number) {
  if (score <= 0) {
    return {
      badge: "bg-gray-100 text-gray-500 border-gray-200",
      bar: "bg-gray-200",
      label: "text-gray-400",
    };
  }
  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio >= 0.8) {
    return {
      badge: "bg-gradient-to-br from-yellow-400 to-amber-500 text-white border-amber-300 shadow-md shadow-amber-200/60",
      bar: "bg-gradient-to-r from-yellow-400 to-amber-500",
      label: "text-amber-600",
    };
  }
  if (ratio >= 0.5) {
    return {
      badge: "bg-gradient-to-br from-emerald-500 to-green-600 text-white border-green-300 shadow-md shadow-green-200/50",
      bar: "bg-gradient-to-r from-emerald-400 to-green-500",
      label: "text-green-600",
    };
  }
  return {
    badge: "bg-gradient-to-br from-sky-500 to-blue-600 text-white border-blue-300 shadow-md shadow-blue-200/50",
    bar: "bg-gradient-to-r from-sky-400 to-blue-500",
    label: "text-blue-600",
  };
}

function ScoreDisplay({
  score,
  maxScore,
  rank,
  showRank,
}: {
  score: number;
  maxScore: number;
  rank: number;
  showRank: boolean;
}) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const style = getScoreStyle(score, maxScore);

  return (
    <div className="flex items-center gap-3 shrink-0 min-w-[120px] sm:min-w-[160px]">
      {showRank && rank <= 3 && score > 0 && (
        <span className="text-lg sm:text-xl" aria-hidden>
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
        </span>
      )}
      <div className="flex-1 text-right">
        <div
          className={`inline-flex items-baseline gap-1 px-3 py-1.5 rounded-xl border font-black tabular-nums ${style.badge}`}
        >
          <span className="text-2xl sm:text-3xl leading-none">{score}</span>
          <span className="text-xs sm:text-sm font-bold opacity-90">점</span>
        </div>
        {maxScore > 0 && score > 0 && (
          <div className="mt-1.5 flex items-center gap-2 justify-end">
            <div className="w-16 sm:w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${style.bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={`text-[10px] font-semibold ${style.label}`}>{pct}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard({ initialStudents }: AdminDashboardProps) {
  const [students, setStudents] = useState(initialStudents);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<MissionAttempt[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sortedStudents = useMemo(
    () => sortStudents(students, sortKey, sortDir),
    [students, sortKey, sortDir]
  );

  const maxScore = useMemo(
    () => Math.max(...students.map((s) => s.total_score), 0),
    [students]
  );

  const avgScore = useMemo(() => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, s) => acc + s.total_score, 0);
    return Math.round(sum / students.length);
  }, [students]);

  const rankMap = useMemo(() => {
    const byScore = sortStudents(students, "score", "desc");
    const map = new Map<string, number>();
    byScore.forEach((s, i) => map.set(s.id, i + 1));
    return map;
  }, [students]);

  const setSort = (key: SortKey, dir: SortDir) => {
    setSortKey(key);
    setSortDir(dir);
  };

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

  const sortButtons: { label: string; key: SortKey; dir: SortDir }[] = [
    { label: "점수 높은순", key: "score", dir: "desc" },
    { label: "점수 낮은순", key: "score", dir: "asc" },
    { label: "학번순", key: "student_number", dir: "asc" },
    { label: "학번 역순", key: "student_number", dir: "desc" },
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">전체 학생</p>
            <p className="text-2xl font-black text-gray-900">{students.length}명</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 flex items-center gap-3 bg-gradient-to-br from-white to-amber-50">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-amber-700/80 font-medium">최고 점수</p>
            <p className="text-2xl font-black text-amber-600">{maxScore}점</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">평균 점수</p>
            <p className="text-2xl font-black text-emerald-600">{avgScore}점</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <h2 className="font-semibold text-gray-800">전체 학생 ({students.length}명)</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-500 mr-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              정렬
            </span>
            {sortButtons.map(({ label, key, dir }) => {
              const active = sortKey === key && sortDir === dir;
              return (
                <button
                  key={`${key}-${dir}`}
                  type="button"
                  onClick={() => setSort(key, dir)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    active
                      ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {students.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-12">등록된 학생이 없습니다.</p>
          )}

          {sortedStudents.map((student, index) => {
            const rank = rankMap.get(student.id) ?? index + 1;
            const showRank = sortKey === "score";

            return (
              <div key={student.id}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 hover:bg-gray-50/80">
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

                    {showRank && (
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                          rank === 1
                            ? "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300"
                            : rank === 2
                              ? "bg-gray-100 text-gray-600 ring-2 ring-gray-300"
                              : rank === 3
                                ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300"
                                : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {rank}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 truncate">
                        {student.name}{" "}
                        <span className="text-gray-400 font-normal font-mono text-sm">
                          ({student.student_number})
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        가입 {new Date(student.created_at).toLocaleDateString("ko-KR")}
                        {sortKey === "student_number" && (
                          <span className="ml-2 text-gray-400">· {index + 1}번째</span>
                        )}
                      </p>
                    </div>
                  </button>

                  <ScoreDisplay
                    score={student.total_score}
                    maxScore={maxScore}
                    rank={rank}
                    showRank={showRank}
                  />

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
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200">
                        <span className="text-xs font-semibold text-gray-500 uppercase">현재 총점</span>
                        <span className="text-3xl font-black text-amber-600 tabular-nums">
                          {student.total_score}
                          <span className="text-base font-bold text-amber-500 ml-0.5">점</span>
                        </span>
                        {maxScore > 0 && (
                          <span className="text-xs text-gray-400 ml-auto">
                            최고점 대비{" "}
                            {Math.round((student.total_score / maxScore) * 100)}%
                          </span>
                        )}
                      </div>

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
                                    <td className="px-3 py-2">
                                      <span
                                        className={`inline-flex px-2 py-0.5 rounded-md font-bold ${
                                          a.earned_score > 0
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                      >
                                        {a.earned_score}점
                                      </span>
                                    </td>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
