"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import type { LeaderboardEntry } from "@/app/actions/leaderboard";

interface PodiumProps {
  entries: LeaderboardEntry[];
}

const PODIUM_CONFIG = [
  {
    rank: 2,
    index: 1,
    height: "h-28",
    color: "from-gray-300 to-gray-400",
    ring: "ring-gray-300",
    label: "은",
    medal: "🥈",
  },
  {
    rank: 1,
    index: 0,
    height: "h-36",
    color: "from-yellow-300 to-yellow-500",
    ring: "ring-yellow-400",
    label: "금",
    medal: "🥇",
  },
  {
    rank: 3,
    index: 2,
    height: "h-24",
    color: "from-orange-300 to-orange-500",
    ring: "ring-orange-400",
    label: "동",
    medal: "🥉",
  },
] as const;

export default function Podium({ entries }: PodiumProps) {
  const topThree = entries.slice(0, 3);

  if (topThree.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-200">
        아직 랭킹 데이터가 없습니다. 미션을 풀어보세요!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
      <h2 className="text-lg font-bold text-gray-800 text-center mb-8 flex items-center justify-center gap-2">
        <Crown className="w-5 h-5 text-yellow-500" />
        TOP 3 시상대
      </h2>

      <div className="flex items-end justify-center gap-3 sm:gap-6 max-w-lg mx-auto">
        {PODIUM_CONFIG.map((config) => {
          const entry = topThree[config.index];
          if (!entry) {
            return <div key={config.rank} className="flex-1" />;
          }

          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: config.index * 0.15, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="text-2xl mb-2">{config.medal}</div>
              <div
                className={`w-full rounded-t-2xl bg-gradient-to-t ${config.color} ${config.height}
                            flex flex-col items-center justify-end pb-3 px-2 ring-2 ${config.ring}
                            shadow-lg cursor-default transition-shadow hover:shadow-xl`}
              >
                <span className="text-xs font-bold text-white/90 mb-1">{config.label} {entry.rank}위</span>
                <span className="text-sm font-bold text-white truncate max-w-full">
                  {entry.maskedName}
                </span>
                <span className="text-xs text-white/80 font-mono">{entry.maskedStudentNumber}</span>
                <span className="text-lg font-black text-white mt-1">{entry.totalScore}점</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-b-lg" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
