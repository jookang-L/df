"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Key, Hash, Code2, AlertCircle } from "lucide-react";

interface ErrorBalloonProps {
  errorType?: "KeyError" | "IndexError" | "SyntaxError" | "TypeError";
  message?: string;
  onClose?: () => void;
}

const ERROR_CONFIG = {
  KeyError: {
    icon: Key,
    title: "KeyError: 열 이름 오류",
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    textColor: "text-red-800",
    iconColor: "text-red-600",
    tip: "열 이름의 대소문자와 띄어쓰기를 정확히 확인하세요. 예: 'Type 1' (공백 포함)",
  },
  IndexError: {
    icon: Hash,
    title: "IndexError: 인덱스 범위 오류",
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    textColor: "text-orange-800",
    iconColor: "text-orange-600",
    tip: "인덱스 번호가 데이터 크기를 벗어났습니다. df.iloc[0:데이터크기] 범위 내에서 사용하세요.",
  },
  SyntaxError: {
    icon: Code2,
    title: "SyntaxError: 문법 오류",
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-800",
    iconColor: "text-purple-600",
    tip: "코드 형식을 확인하세요. df['열이름'], df[조건], df.loc[], df.iloc[] 중 하나를 사용하세요.",
  },
  TypeError: {
    icon: AlertCircle,
    title: "TypeError: 자료형 오류",
    color: "yellow",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-600",
    tip: "숫자형 열에는 따옴표 없이, 문자형 열에는 따옴표를 사용하세요.",
  },
};

export default function ErrorBalloon({ errorType, message, onClose }: ErrorBalloonProps) {
  const hasError = !!errorType && !!message;
  const config = errorType ? ERROR_CONFIG[errorType] : null;

  return (
    <AnimatePresence>
      {hasError && config && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: [0, -6, 6, -4, 4, 0], // 흔들림 효과
          }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            x: { duration: 0.5, delay: 0.1 },
          }}
          className={`rounded-xl border-2 ${config.bgColor} ${config.borderColor} p-4 shadow-md`}
        >
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg bg-white shadow-sm`}>
                <AlertTriangle className={`w-4 h-4 ${config.iconColor}`} />
              </div>
              <span className={`font-bold text-sm ${config.textColor}`}>
                {config.title}
              </span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 에러 메시지 */}
          <div className="mt-3 ml-9">
            <div className="bg-white/70 rounded-lg px-3 py-2 border border-white/80">
              <code className={`text-xs font-mono ${config.textColor} break-all`}>
                {message}
              </code>
            </div>

            {/* 힌트 */}
            <div className="mt-2 flex items-start gap-1.5">
              <span className="text-lg leading-none mt-0.5">💡</span>
              <p className={`text-xs ${config.textColor} opacity-80 leading-relaxed`}>
                {config.tip}
              </p>
            </div>
          </div>

          {/* 말풍선 꼬리 (아래쪽) */}
          <div
            className={`absolute -bottom-2 left-8 w-4 h-4 rotate-45 border-r-2 border-b-2 ${config.borderColor} ${config.bgColor}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
