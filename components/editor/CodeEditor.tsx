"use client";

import { useState, useEffect, KeyboardEvent, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

interface CodeTemplate {
  label: string;
  code: string;
  desc: string;
}

const TEMPLATES: CodeTemplate[] = [
  { label: "단일 열 선택", code: "df['Name']", desc: "특정 열을 선택합니다" },
  { label: "다중 열 선택", code: "df[['Name', 'Type 1', 'HP']]", desc: "여러 열을 동시에 선택합니다" },
  { label: "불리언 필터", code: "df[df['Type 1'] == '불꽃']", desc: "조건에 맞는 행만 필터링합니다" },
  { label: "숫자 조건", code: "df[df['HP'] > 80]", desc: "숫자 비교로 행을 필터링합니다" },
  { label: "loc 필터", code: "df.loc[df['Legendary'] == True]", desc: "loc으로 조건 필터링합니다" },
  { label: "loc 행+열", code: "df.loc[df['Type 1'] == '물', ['Name', 'HP']]", desc: "조건 + 열 동시 선택합니다" },
  { label: "iloc 슬라이싱", code: "df.iloc[0:5]", desc: "행 번호로 범위 선택합니다" },
  { label: "iloc (앞부터)", code: "df.iloc[:5]", desc: "0부터 5 직전까지 (파이썬과 동일)" },
  { label: "복합 조건", code: "df[(df['HP'] > 90) & (df['Attack'] > 100)]", desc: "& 연산자로 조건을 결합합니다" },
];

function columnRefSnippet(col: string): string {
  if (col.includes("'")) return `df["${col.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"]`;
  return `df['${col}']`;
}

interface CodeEditorProps {
  onRun: (code: string) => void;
  onReset: () => void;
  isAnimating: boolean;
  hint?: string;
  /** 미션/페이지 전환 시 초기 코드 */
  initialCode?: string;
  /** 클릭 시 코드에 열 참조 삽입 */
  columnNames?: string[];
}

export default function CodeEditor({
  onRun,
  onReset,
  isAnimating,
  hint,
  initialCode = "df['Name']",
  columnNames,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const insertAtCursor = useCallback((text: string) => {
    const ta = textareaRef.current;
    if (!ta) {
      setCode((c) => c + text);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    setCode((prev) => {
      const next = prev.slice(0, start) + text + prev.slice(end);
      requestAnimationFrame(() => {
        ta.focus();
        const pos = start + text.length;
        ta.setSelectionRange(pos, pos);
      });
      return next;
    });
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isAnimating) handleRun();
    }
  };

  const handleRun = () => {
    if (code.trim() && !isAnimating) {
      onRun(code.trim());
    }
  };

  const handleTemplate = (template: CodeTemplate) => {
    setCode(template.code);
    setShowTemplates(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      {/* 에디터 헤더 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {/* 맥OS 스타일 닷 */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs ml-2 font-mono">pandas_code.py</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-xs hidden sm:block">Ctrl+Enter 로 실행</span>
        </div>
      </div>

      {/* 코드 입력 영역 */}
      <div className="relative">
        {/* 줄 번호 */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800/50 flex flex-col pt-3 items-center">
          <span className="text-gray-600 text-xs font-mono select-none">1</span>
        </div>

        {/* 프롬프트 */}
        <div className="absolute left-10 top-3 text-green-400 font-mono text-sm select-none pointer-events-none">
          &gt;&gt;&gt;&nbsp;
        </div>

        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          className="w-full bg-gray-900 text-green-300 font-mono text-sm pl-24 pr-4 pt-3 pb-3
                     resize-none focus:outline-none focus:ring-1 focus:ring-red-500/50 caret-green-400
                     selection:bg-green-900"
          placeholder="df['Name']"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {columnNames && columnNames.length > 0 && (
        <div className="px-4 py-2 bg-gray-800/80 border-t border-gray-700">
          <p className="text-[10px] text-gray-500 mb-1.5">열 이름 클릭 시 커서 위치에 삽입</p>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
            {columnNames.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => insertAtCursor(columnRefSnippet(col))}
                className="text-[10px] bg-gray-700 hover:bg-gray-600 border border-gray-600 
                           rounded px-1.5 py-0.5 text-green-300 font-mono transition-colors"
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 힌트 영역 */}
      {hint && (
        <div className="border-t border-gray-700">
          <button
            onClick={() => setShowHint((v) => !v)}
            className="w-full flex items-center gap-2 px-4 py-2 text-yellow-400 text-xs hover:bg-gray-800 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>힌트 {showHint ? "숨기기" : "보기"}</span>
            {showHint ? <ChevronUp className="w-3.5 h-3.5 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
          </button>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="px-4 pb-3 text-yellow-300/80 text-xs bg-gray-800/40 font-mono"
            >
              💡 {hint}
            </motion.div>
          )}
        </div>
      )}

      {/* 하단 액션 바 */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-800 border-t border-gray-700">
        {/* 템플릿 선택 */}
        <div className="relative">
          <button
            onClick={() => setShowTemplates((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 
                       text-gray-300 text-xs rounded-lg transition-colors"
          >
            코드 예시
            {showTemplates ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showTemplates && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full left-0 mb-1 w-72 bg-gray-800 border border-gray-600 
                         rounded-xl shadow-xl overflow-hidden z-50"
            >
              {TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => handleTemplate(t)}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-0"
                >
                  <div className="text-xs text-green-400 font-mono">{t.code}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.label} — {t.desc}</div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* 실행 / 초기화 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 
                       text-gray-300 text-xs rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기화
          </button>

          <motion.button
            onClick={handleRun}
            disabled={isAnimating || !code.trim()}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-500 
                       disabled:bg-gray-600 disabled:cursor-not-allowed
                       text-white text-xs font-semibold rounded-lg transition-colors shadow-md"
          >
            {isAnimating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                />
                실행 중...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                실행
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
