"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronRight, ChevronLeft, Star, Table2, RefreshCw, Shuffle } from "lucide-react";
import CodeEditor from "@/components/editor/CodeEditor";
import DataTable from "@/components/visualizer/DataTable";
import StepIndicator from "@/components/visualizer/StepIndicator";
import ErrorBalloon from "@/components/visualizer/ErrorBalloon";
import { usePandasParser, DataRow, validateMission } from "@/hooks/usePandasParser";
import { buildSessionMissions, DIFFICULTY_COLOR, type Mission } from "@/constants/missions";
import { getSamplePokemon } from "@/data/missionData";

function pokemonToDataRow(p: ReturnType<typeof getSamplePokemon>[0]): DataRow {
  return {
    "#": p["#"],
    Name: p.Name,
    "Type 1": p["Type 1"],
    "Type 2": p["Type 2"],
    HP: p.HP,
    Attack: p.Attack,
    Defense: p.Defense,
    "Sp. Atk": p["Sp. Atk"],
    "Sp. Def": p["Sp. Def"],
    Speed: p.Speed,
    Generation: p.Generation,
    Legendary: p.Legendary,
  };
}

export default function MissionPage() {
  const [sessionMissions, setSessionMissions] = useState<Mission[]>(() => buildSessionMissions());
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<Set<number>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pokemonData] = useState<DataRow[]>(() => getSamplePokemon().map(pokemonToDataRow));

  const columns = useMemo(() => Object.keys(pokemonData[0] || {}), [pokemonData]);
  const currentMission = sessionMissions[currentMissionIdx];

  const { state, runCode, reset } = usePandasParser(pokemonData);

  const reshuffleSession = () => {
    setSessionMissions(buildSessionMissions());
    setCurrentMissionIdx(0);
    setCompletedMissions(new Set());
    setShowSuccess(false);
    setShowAnswer(false);
    reset();
  };

  const handleRun = (code: string) => {
    const result = runCode(code);
    if (!result) return;

    // 애니메이션 완료 후 정답 검증 (done 단계 후)
    const checkTimeout = result.finalData.length > 0 ? 2500 : 500;
    setTimeout(() => {
      if (result.finalData.length > 0) {
        const isCorrect = validateMission(
          currentMission.validateFn,
          result.finalData,
          result.finalColumns,
          pokemonData
        );
        if (isCorrect) {
          setCompletedMissions((prev) => new Set([...prev, currentMissionIdx]));
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 4000);
        }
      }
    }, checkTimeout);
  };

  const handleReset = () => {
    reset();
    setShowSuccess(false);
    setShowAnswer(false);
  };

  const goNext = () => {
    if (currentMissionIdx < sessionMissions.length - 1) {
      setCurrentMissionIdx((i) => i + 1);
      handleReset();
    }
  };

  const goPrev = () => {
    if (currentMissionIdx > 0) {
      setCurrentMissionIdx((i) => i - 1);
      handleReset();
    }
  };

  const errorStep = state.currentStep.type === "error" ? state.currentStep : null;
  const isCompleted = completedMissions.has(currentMissionIdx);

  return (
    <div className="flex-1 bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">

        {/* 미션 선택 바 */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {sessionMissions.map((m, i) => {
            const done = completedMissions.has(i);
            const isCurrent = i === currentMissionIdx;
            return (
              <button
                key={`${m.id}-${i}`}
                onClick={() => { setCurrentMissionIdx(i); handleReset(); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs 
                           font-medium transition-all border ${
                  isCurrent
                    ? "bg-red-600 text-white border-red-600 shadow-md"
                    : done
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
              >
                {done ? <Star className="w-3.5 h-3.5 fill-current" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{m.title.slice(0, 8)}...</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={reshuffleSession}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium
                       border border-dashed border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            title="문제 세트를 새로 뽑습니다 (진행도 초기화)"
          >
            <Shuffle className="w-3.5 h-3.5" />
            문제 다시 뽑기
          </button>
          <div className="ml-auto text-xs text-gray-500 flex-shrink-0">
            {completedMissions.size}/{sessionMissions.length} 완료
          </div>
        </div>

        {/* 현재 미션 카드 */}
        <motion.div
          key={currentMissionIdx}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-red-100 shadow-sm p-5 mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs text-gray-400 font-medium">
                  미션 {currentMissionIdx + 1}/{sessionMissions.length}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[currentMission.difficulty]}`}>
                  {currentMission.difficulty}
                </span>
                {isCompleted && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> 완료!
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">{currentMission.title}</h2>
              <p className="text-gray-600 text-sm">{currentMission.description}</p>
            </div>
            {/* 이전/다음 */}
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={goPrev}
                disabled={currentMissionIdx === 0}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 
                           disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={goNext}
                disabled={currentMissionIdx === sessionMissions.length - 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 
                           disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 성공 애니메이션 */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 
                         bg-gradient-to-r from-yellow-400 to-orange-400 
                         text-white rounded-2xl px-8 py-5 shadow-2xl text-center"
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="font-black text-xl">정답입니다!</div>
              <div className="text-sm opacity-90 mt-1">미션 {currentMissionIdx + 1} 클리어!</div>
              {currentMissionIdx < sessionMissions.length - 1 && (
                <button
                  onClick={() => { setShowSuccess(false); goNext(); }}
                  className="mt-3 bg-white/30 hover:bg-white/40 rounded-xl px-4 py-2 
                             text-sm font-semibold transition-colors flex items-center gap-1 mx-auto"
                >
                  다음 미션 <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 메인 레이아웃 */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* 좌측: 테이블 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Table2 className="w-4 h-4 text-gray-500" />
                  포켓몬 데이터프레임 (df)
                </h2>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                  {pokemonData.length}행 × {columns.length}열
                </span>
              </div>

              {/* 에러 말풍선 */}
              <div className="relative mb-3">
                <ErrorBalloon
                  errorType={errorStep?.errorType}
                  message={errorStep?.message}
                  onClose={reset}
                />
              </div>

              {/* 에러 시 흔들기 */}
              <motion.div
                animate={errorStep ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <DataTable
                  data={pokemonData}
                  columns={columns}
                  parserState={state}
                />
              </motion.div>
            </div>

            {/* 결과 테이블 */}
            <AnimatePresence>
              {state.currentStep.type === "done" && state.finalData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-xl shadow-sm border p-4 ${
                    isCompleted
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <h2 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                    isCompleted ? "text-green-800" : "text-blue-800"
                  }`}>
                    {isCompleted ? "✅ 정답! 실행 결과" : "📊 실행 결과"}
                    <span className={`ml-auto text-xs font-normal px-2 py-1 rounded-lg ${
                      isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {state.finalData.length}행 × {state.finalColumns.length}열
                    </span>
                  </h2>
                  <div className={`overflow-x-auto rounded-xl border bg-white ${
                    isCompleted ? "border-green-200" : "border-blue-200"
                  }`}>
                    <table className="min-w-full text-xs border-collapse">
                      <thead>
                        <tr className={isCompleted ? "bg-green-600" : "bg-blue-600"}>
                          <th className="px-3 py-2 text-white text-left w-8">#</th>
                          {state.finalColumns.map((col) => (
                            <th key={col} className="px-3 py-2 text-white text-left font-bold whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {state.finalData.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                            <td className="px-3 py-2 text-gray-400">{i}</td>
                            {state.finalColumns.map((col) => (
                              <td key={col} className="px-3 py-2 text-gray-700 whitespace-nowrap">
                                {String(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 우측: 코드 에디터 + 단계 안내 */}
          <div className="space-y-4">
            <StepIndicator
              currentStep={state.currentStep}
              isAnimating={state.isAnimating}
            />

            <CodeEditor
              key={`${currentMission.id}-${currentMissionIdx}`}
              onRun={handleRun}
              onReset={handleReset}
              isAnimating={state.isAnimating}
              hint={currentMission.hint}
              initialCode="df['Name']"
              columnNames={columns}
            />

            {/* 정답 보기 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowAnswer((v) => !v)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 
                           hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-gray-400" />
                <span>정답 코드 확인 (스포일러 주의!)</span>
                <span className="ml-auto text-xs text-gray-400">
                  {showAnswer ? "숨기기" : "보기"}
                </span>
              </button>
              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                      <code className="text-sm font-mono text-green-700 block mt-2">
                        {currentMission.targetCode}
                      </code>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 전체 진행도 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                  전체 진행도
                </span>
                <span className="text-xs text-gray-500">
                  {completedMissions.size} / {sessionMissions.length}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-red-500 to-orange-400 h-2 rounded-full"
                  animate={{ width: `${(completedMissions.size / sessionMissions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {completedMissions.size === sessionMissions.length && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center text-yellow-600 font-bold mt-2"
                >
                  🎊 모든 미션 완료! Pandas 마스터!
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
