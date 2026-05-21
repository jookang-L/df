"use client";

import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import type { LeaderboardEntry } from "@/app/actions/leaderboard";

interface RankingTableProps {
  entries: LeaderboardEntry[];
}

export default function RankingTable({ entries }: RankingTableProps) {
  const rest = entries.slice(3);

  if (rest.length === 0 && entries.length <= 3) {
    if (entries.length === 0) return null;
    return (
      <p className="text-center text-sm text-gray-500 py-4">
        4등 이하 참가자가 없습니다.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Medal className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700">전체 랭킹</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <th className="px-4 py-3 text-left w-16">순위</th>
              <th className="px-4 py-3 text-left">학번</th>
              <th className="px-4 py-3 text-left">이름</th>
              <th className="px-4 py-3 text-right">총점</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <motion.tr
                key={`${entry.maskedStudentNumber}-${entry.rank}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ backgroundColor: "rgba(58, 92, 26, 0.05)" }}
                className={`border-t border-gray-100 ${entry.rank <= 3 ? "bg-yellow-50/30" : ""}`}
              >
                <td className="px-4 py-3 font-bold text-gray-700">{entry.rank}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{entry.maskedStudentNumber}</td>
                <td className="px-4 py-3 text-gray-800">{entry.maskedName}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{entry.totalScore}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
