"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { DataRow, PandasParserState } from "@/hooks/usePandasParser";

interface DataTableProps {
  data: DataRow[];
  columns: string[];
  parserState: PandasParserState;
}

function typeColor(val: string | number | boolean): string {
  if (typeof val === "boolean") return val ? "text-green-600 font-semibold" : "text-red-500";
  if (typeof val === "number") return "text-blue-700";
  const s = String(val);
  const typeColors: Record<string, string> = {
    // 한글 타입 (missionData 기준)
    불꽃: "text-orange-600", 물: "text-blue-600", 풀: "text-green-600",
    전기: "text-yellow-600", 에스퍼: "text-pink-600", 얼음: "text-cyan-600",
    드래곤: "text-purple-700", 악: "text-gray-700", 격투: "text-red-700",
    고스트: "text-indigo-600", 강철: "text-gray-500", 비행: "text-sky-500",
    바위: "text-yellow-800", 땅: "text-amber-700", 벌레: "text-lime-600",
    독: "text-violet-600", 노말: "text-gray-500", 페어리: "text-pink-500",
    // 영문 (CSV 업로드 등 호환)
    Fire: "text-orange-600", Water: "text-blue-600", Grass: "text-green-600",
    Electric: "text-yellow-600", Psychic: "text-pink-600", Ice: "text-cyan-600",
    Dragon: "text-purple-700", Dark: "text-gray-700", Fighting: "text-red-700",
    Ghost: "text-indigo-600", Steel: "text-gray-500", Flying: "text-sky-500",
    Rock: "text-yellow-800", Ground: "text-amber-700", Bug: "text-lime-600",
    Poison: "text-violet-600", Normal: "text-gray-500", Fairy: "text-pink-500",
  };
  return typeColors[s] || "text-gray-800";
}

export default function DataTable({ data, columns, parserState }: DataTableProps) {
  const {
    currentStep,
    scannedRows,
    matchedRows,
    keptRows,
    selectedColumns,
  } = parserState;

  const isScanning = currentStep.type === "scanning";
  const isFiltering = currentStep.type === "filtering";
  const isSelecting = currentStep.type === "selecting";
  const isDone = currentStep.type === "done";

  // 표시할 열 결정
  const displayColumns = (isSelecting || isDone) && selectedColumns.length > 0
    ? selectedColumns
    : columns;

  // 행 표시 여부: filtering 이후엔 keptRows만 표시
  const shouldShowRow = (rowIdx: number): boolean => {
    if (isFiltering || isSelecting || isDone) {
      return keptRows.has(rowIdx);
    }
    return true;
  };

  // 행 배경색
  const getRowBg = (rowIdx: number): string => {
    if (isDone) return "bg-green-50";
    if (isFiltering || isSelecting) {
      return keptRows.has(rowIdx) ? "bg-green-50" : "bg-transparent";
    }
    if (isScanning) {
      if (matchedRows.has(rowIdx)) return "bg-green-50";
      if (scannedRows.has(rowIdx)) return "bg-gray-50";
    }
    return "bg-white";
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full text-sm border-collapse">
        {/* 헤더 */}
        <thead>
          <tr className="bg-red-600">
            {/* 인덱스 열 */}
            <th className="px-3 py-2 text-white text-xs font-bold text-left w-10 sticky left-0 bg-red-600">
              #
            </th>
            <AnimatePresence initial={false}>
              {columns.map((col) => {
                const isSelected = displayColumns.includes(col);
                return (
                  <motion.th
                    key={col}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: isSelected ? 1 : 0.15,
                      x: 0,
                      scale: isSelected ? 1 : 0.95,
                    }}
                    exit={{ opacity: 0, x: -30, width: 0, padding: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`px-3 py-2 text-xs font-bold text-left whitespace-nowrap transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-white/30"
                    } ${
                      (isSelecting || isDone) && isSelected
                        ? "bg-red-500 ring-2 ring-yellow-300 ring-inset"
                        : ""
                    }`}
                  >
                    {col}
                  </motion.th>
                );
              })}
            </AnimatePresence>
          </tr>
        </thead>

        {/* 바디 */}
        <tbody>
          <AnimatePresence initial={false}>
            {data.map((row, rowIdx) => {
              const show = shouldShowRow(rowIdx);
              const isCurrentScan = isScanning && (currentStep as { scannedIndex: number }).scannedIndex === rowIdx;
              const isMatched = matchedRows.has(rowIdx);
              const isKept = keptRows.has(rowIdx);

              if (!show) return null;

              return (
                <motion.tr
                  key={rowIdx}
                  layout
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: show ? 1 : 0,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                    height: 0,
                    transition: { duration: 0.35 },
                  }}
                  transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
                  className={`border-b border-gray-100 transition-colors duration-300 ${getRowBg(rowIdx)} ${
                    isCurrentScan ? "ring-2 ring-blue-400 ring-inset" : ""
                  }`}
                >
                  {/* 인덱스 + 상태 아이콘 */}
                  <td className="px-3 py-2 text-gray-400 text-xs sticky left-0 bg-inherit">
                    <div className="flex items-center gap-1">
                      <span>{rowIdx}</span>
                      {isScanning && scannedRows.has(rowIdx) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex"
                        >
                          {isMatched ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-red-400" />
                          )}
                        </motion.span>
                      )}
                      {(isFiltering || isSelecting || isDone) && isKept && (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      )}
                    </div>
                  </td>

                  {/* 데이터 셀 */}
                  {columns.map((col) => {
                    const isColSelected = displayColumns.includes(col);
                    const val = row[col];
                    return (
                      <motion.td
                        key={col}
                        layout
                        animate={{
                          opacity: isColSelected ? 1 : 0.12,
                          scale: isColSelected ? 1 : 0.97,
                        }}
                        transition={{ duration: 0.4 }}
                        className={`px-3 py-2 whitespace-nowrap text-xs ${typeColor(val)} ${
                          (isSelecting || isDone) && isColSelected
                            ? "font-semibold"
                            : ""
                        }`}
                      >
                        {String(val)}
                      </motion.td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {/* 결과 요약 */}
      {isDone && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 bg-green-50 border-t border-green-200 text-xs text-green-700 flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-green-600" />
          결과: <strong>{parserState.finalData.length}개 행</strong>,{" "}
          <strong>{parserState.finalColumns.length}개 열</strong>
        </motion.div>
      )}
    </div>
  );
}
