"use client";

import { motion } from "framer-motion";
import { Search, Filter, Columns, CheckCircle2, Loader2 } from "lucide-react";
import { AnimationStep } from "@/hooks/usePandasParser";

interface StepIndicatorProps {
  currentStep: AnimationStep;
  isAnimating: boolean;
}

const STEPS = [
  { id: "scanning", label: "조건 스캔", icon: Search, color: "blue" },
  { id: "filtering", label: "행 필터링", icon: Filter, color: "orange" },
  { id: "selecting", label: "열 선택", icon: Columns, color: "purple" },
  { id: "done", label: "완료!", icon: CheckCircle2, color: "green" },
] as const;

const COLOR_MAP = {
  blue: {
    active: "bg-blue-500 text-white ring-blue-300",
    done: "bg-blue-100 text-blue-700",
    line: "bg-blue-400",
    label: "text-blue-700",
  },
  orange: {
    active: "bg-orange-500 text-white ring-orange-300",
    done: "bg-orange-100 text-orange-700",
    line: "bg-orange-400",
    label: "text-orange-700",
  },
  purple: {
    active: "bg-purple-500 text-white ring-purple-300",
    done: "bg-purple-100 text-purple-700",
    line: "bg-purple-400",
    label: "text-purple-700",
  },
  green: {
    active: "bg-green-500 text-white ring-green-300",
    done: "bg-green-100 text-green-700",
    line: "bg-green-400",
    label: "text-green-700",
  },
};

function getStepStatus(
  stepId: string,
  currentStep: AnimationStep
): "pending" | "active" | "done" {
  const order = ["scanning", "filtering", "selecting", "done"];
  const currentId =
    currentStep.type === "idle" || currentStep.type === "error"
      ? ""
      : currentStep.type;
  const stepOrder = order.indexOf(stepId);
  const currentOrder = order.indexOf(currentId);

  if (currentOrder === -1) return "pending";
  if (stepOrder < currentOrder) return "done";
  if (stepOrder === currentOrder) return "active";
  return "pending";
}

export default function StepIndicator({ currentStep, isAnimating }: StepIndicatorProps) {
  const showSteps =
    currentStep.type !== "idle" && currentStep.type !== "error";

  // 건너뛰는 단계 처리 (다중 열 선택 등 스캔 없이 바로 필터링)
  const hasScanning = currentStep.type === "scanning" ||
    (currentStep.type !== "idle" && currentStep.type !== "error" &&
      STEPS.some((s) => s.id === "scanning" && getStepStatus("scanning", currentStep) === "done"));

  const stepsToShow = hasScanning
    ? STEPS
    : STEPS.filter((s) => s.id !== "scanning");

  const stepDescription: Record<string, string> = {
    idle: "코드를 입력하고 실행 버튼을 누르세요.",
    scanning: "각 행이 조건에 맞는지 위에서 아래로 스캔합니다...",
    filtering: "조건에 맞지 않는 행들이 제거됩니다...",
    selecting: "선택된 열만 남기고 나머지를 숨깁니다...",
    done: "실행 완료! 최종 결과를 확인하세요.",
    error: "오류가 발생했습니다.",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        {isAnimating && (
          <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
        )}
        <h3 className="text-sm font-semibold text-gray-700">실행 단계</h3>
      </div>

      {/* 단계 표시 */}
      {showSteps && (
        <div className="flex items-center gap-0 mb-4">
          {stepsToShow.map((step, idx) => {
            const status = getStepStatus(step.id, currentStep);
            const colors = COLOR_MAP[step.color];
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    animate={{
                      scale: status === "active" ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ repeat: status === "active" ? Infinity : 0, duration: 1 }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ring-2 transition-all duration-300 ${
                      status === "active"
                        ? `${colors.active} ring-offset-1`
                        : status === "done"
                        ? `${colors.done} ring-transparent`
                        : "bg-gray-100 text-gray-400 ring-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  <span
                    className={`mt-1 text-xs font-medium truncate max-w-[60px] text-center ${
                      status === "active"
                        ? colors.label
                        : status === "done"
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < stepsToShow.length - 1 && (
                  <motion.div
                    className={`h-0.5 flex-1 mx-1 transition-colors duration-500 ${
                      getStepStatus(stepsToShow[idx + 1].id, currentStep) !== "pending"
                        ? colors.line
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 단계 설명 */}
      <motion.p
        key={currentStep.type}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-xs rounded-lg px-3 py-2 ${
          currentStep.type === "done"
            ? "bg-green-50 text-green-700"
            : currentStep.type === "error"
            ? "bg-red-50 text-red-700"
            : "bg-gray-50 text-gray-600"
        }`}
      >
        {stepDescription[currentStep.type] || "코드를 입력하고 실행 버튼을 누르세요."}
      </motion.p>
    </div>
  );
}
