import { Trophy } from "lucide-react";
import { getLeaderboard } from "@/app/actions/leaderboard";
import Podium from "@/components/leaderboard/Podium";
import RankingTable from "@/components/leaderboard/RankingTable";

export default async function ScorePage() {
  const entries = await getLeaderboard();

  return (
    <div className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-3">
            <Trophy className="w-7 h-7 text-yellow-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-800">Score Board</h1>
          <p className="text-gray-500 text-sm mt-1">미션 점수 기준 전체 학생 랭킹</p>
        </div>

        <Podium entries={entries} />
        <RankingTable entries={entries} />
      </div>
    </div>
  );
}
