"use client";

import { useState, useCallback } from "react";

export type DataRow = Record<string, string | number | boolean>;

export type AnimationStep =
  | { type: "idle" }
  | { type: "scanning"; scannedIndex: number; matchedIndices: number[] }
  | { type: "filtering"; keptIndices: number[] }
  | { type: "selecting"; selectedColumns: string[] }
  | { type: "done"; result: DataRow[]; resultColumns: string[] }
  | { type: "error"; message: string; errorType: "KeyError" | "IndexError" | "SyntaxError" | "TypeError" };

export interface ParseResult {
  steps: AnimationStep[];
  finalData: DataRow[];
  finalColumns: string[];
}

// ─── 토큰 파서 ──────────────────────────────────────────────
function parseValue(val: string): string | number | boolean {
  const trimmed = val.trim();
  if (trimmed === "True" || trimmed === "true") return true;
  if (trimmed === "False" || trimmed === "false") return false;
  const num = Number(trimmed.replace(/['"]/g, ""));
  if (!isNaN(num) && trimmed.replace(/['"]/g, "") !== "") return num;
  return trimmed.replace(/^['"]|['"]$/g, "");
}

function getColumns(data: DataRow[]): string[] {
  if (!data.length) return [];
  return Object.keys(data[0]);
}

// ─── 조건 평가 ───────────────────────────────────────────────
function evaluateCondition(
  row: DataRow,
  col: string,
  op: string,
  val: string | number | boolean,
  columns: string[]
): boolean {
  if (!columns.includes(col)) throw new Error(`KeyError: '${col}'`);
  const cellVal = row[col];
  switch (op) {
    case "==":
      // eslint-disable-next-line eqeqeq
      return cellVal == val;
    case "!=":
      // eslint-disable-next-line eqeqeq
      return cellVal != val;
    case ">":
      return Number(cellVal) > Number(val);
    case ">=":
      return Number(cellVal) >= Number(val);
    case "<":
      return Number(cellVal) < Number(val);
    case "<=":
      return Number(cellVal) <= Number(val);
    default:
      throw new Error(`SyntaxError: 알 수 없는 연산자 '${op}'`);
  }
}

// ─── 간단한 표현식 파서 ──────────────────────────────────────
// 지원 패턴:
//  df['col']
//  df[['col1','col2',...]]
//  df[df['col'] op val]
//  df[(df['col1'] op val1) & (df['col2'] op val2)]
//  df.loc[condition]
//  df.loc[condition, ['col1','col2']]
//  df.iloc[start:end]
//  df.iloc[index]

function parseConditionExpr(
  expr: string,
  data: DataRow[],
  columns: string[]
): number[] {
  expr = expr.trim();

  // & 연산자로 결합된 복합 조건
  if (expr.includes(") & (") || expr.includes(")&(")) {
    const parts = expr.split(/\)\s*&\s*\(/).map((p) => p.replace(/^\(|\)$/g, "").trim());
    let indices = data.map((_, i) => i);
    for (const part of parts) {
      const matched = parseSingleCondition(part, data, columns);
      indices = indices.filter((i) => matched.includes(i));
    }
    return indices;
  }

  return parseSingleCondition(expr, data, columns);
}

function parseSingleCondition(
  expr: string,
  data: DataRow[],
  columns: string[]
): number[] {
  expr = expr.trim().replace(/^\(|\)$/g, "").trim();

  // df['col'] op val
  const condMatch = expr.match(/^df\[['"](.+?)['"]\]\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
  if (condMatch) {
    const col = condMatch[1];
    const op = condMatch[2];
    const val = parseValue(condMatch[3]);
    return data
      .map((row, i) => (evaluateCondition(row, col, op, val, columns) ? i : -1))
      .filter((i) => i !== -1);
  }

  throw new Error(`SyntaxError: 조건식을 인식할 수 없습니다: "${expr}"`);
}

function parseColumnList(expr: string): string[] {
  // ['col1','col2'] 또는 ["col1","col2"]
  const matches = expr.match(/['"]([^'"]+)['"]/g);
  if (!matches) return [];
  return matches.map((m) => m.replace(/['"]/g, ""));
}

/** df[ ... ] 첫 번째 대괄호 쌍 추출 (체인 인덱싱용) */
function extractFirstDfBracket(s: string): { inner: string; rest: string } | null {
  if (!s.startsWith("df[")) return null;
  let depth = 0;
  for (let i = 2; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") {
      depth--;
      if (depth === 0) {
        return { inner: s.slice(3, i), rest: s.slice(i + 1) };
      }
    }
  }
  return null;
}

/** df.iloc[내부] — 0:5, :5, 5:, 3, : 등 파이썬 슬라이스 */
function parseIlocRange(inner: string, dataLen: number): { start: number; end: number } | null {
  const t = inner.trim();
  if (!t.includes(":")) {
    const n = parseInt(t, 10);
    if (Number.isNaN(n)) return null;
    return { start: n, end: n + 1 };
  }
  const colon = t.indexOf(":");
  const left = t.slice(0, colon).trim();
  const right = t.slice(colon + 1).trim();
  const start = left === "" ? 0 : parseInt(left, 10);
  const end = right === "" ? dataLen : parseInt(right, 10);
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  return { start, end };
}

function pushIlocSteps(
  steps: AnimationStep[],
  data: DataRow[],
  columns: string[],
  start: number,
  end: number
): ParseResult {
  if (start < 0 || start > data.length) {
    throw new Error(`IndexError: 인덱스 ${start}이(가) 범위를 벗어났습니다 (데이터 행 수: ${data.length})`);
  }
  if (end < start) throw new Error(`IndexError: iloc 슬라이스 끝(${end})이 시작(${start})보다 작습니다`);
  if (end > data.length) {
    throw new Error(`IndexError: 인덱스 ${end}이(가) 범위를 벗어났습니다 (데이터 행 수: ${data.length})`);
  }

  const keptIndices: number[] = [];
  for (let i = start; i < end; i++) keptIndices.push(i);

  for (let i = 0; i < data.length; i++) {
    steps.push({ type: "scanning", scannedIndex: i, matchedIndices: [...keptIndices.filter((k) => k <= i)] });
  }
  steps.push({ type: "filtering", keptIndices });
  steps.push({ type: "selecting", selectedColumns: columns });

  const finalData = keptIndices.map((i) => data[i]);
  steps.push({ type: "done", result: finalData, resultColumns: columns });
  return { steps, finalData, finalColumns: columns };
}

// ─── 메인 파서 ───────────────────────────────────────────────
export function parsePandasCode(
  code: string,
  data: DataRow[]
): ParseResult {
  const steps: AnimationStep[] = [];
  const columns = getColumns(data);
  const trimmed = code.trim();

  try {
    // ── df.iloc[ ... ] (0:5, :5, 5:, 단일 행 등) ──
    if (trimmed.startsWith("df.iloc[")) {
      const m = trimmed.match(/^df\.iloc\[(.*)\]$/);
      if (!m) throw new Error(`SyntaxError: df.iloc[] 형식이 올바르지 않습니다`);
      const range = parseIlocRange(m[1], data.length);
      if (!range) throw new Error(`SyntaxError: iloc 슬라이스를 해석할 수 없습니다`);
      return pushIlocSteps(steps, data, columns, range.start, range.end);
    }

    // ── 체인: df[조건][['열',...]] 또는 df[조건]['열'] (loc 생략) ──
    const chain = extractFirstDfBracket(trimmed);
    if (chain && chain.rest.trim().startsWith("[")) {
      const inner1 = chain.inner.trim();
      const rest = chain.rest.trim();
      if (inner1.includes("df[")) {
        const matchedIndices = parseConditionExpr(inner1, data, columns);
        let selectedCols: string[] = [];
        const multi = rest.match(/^\[\[(.+)\]\]$/);
        const single = rest.match(/^\[['"](.+?)['"]\]$/);
        if (multi) {
          selectedCols = parseColumnList(`[${multi[1]}]`);
        } else if (single) {
          selectedCols = [single[1]];
        } else {
          throw new Error(`SyntaxError: 체인 인덱싱 두 번째는 [['열']] 또는 ['열'] 형식이어야 합니다`);
        }
        const invalid = selectedCols.find((c) => !columns.includes(c));
        if (invalid) throw new Error(`KeyError: '${invalid}'`);

        for (let i = 0; i < data.length; i++) {
          steps.push({ type: "scanning", scannedIndex: i, matchedIndices: matchedIndices.filter((k) => k <= i) });
        }
        steps.push({ type: "filtering", keptIndices: matchedIndices });
        steps.push({ type: "selecting", selectedColumns: selectedCols });

        const finalData = matchedIndices.map((i) => {
          const row: DataRow = {};
          selectedCols.forEach((c) => { row[c] = data[i][c]; });
          return row;
        });
        steps.push({ type: "done", result: finalData, resultColumns: selectedCols });
        return { steps, finalData, finalColumns: selectedCols };
      }
    }

    // ── df.loc[condition] 또는 df.loc[condition, ['col',...]] ──
    const locMatch = trimmed.match(/^df\.loc\[(.+)\]$/);
    if (locMatch) {
      const inner = locMatch[1].trim();

      let condExpr = inner;
      let colExpr: string | null = null;

      // 쉼표로 조건과 열 목록 분리 (대괄호 안의 쉼표는 무시)
      const commaIdx = findTopLevelComma(inner);
      if (commaIdx !== -1) {
        condExpr = inner.slice(0, commaIdx).trim();
        colExpr = inner.slice(commaIdx + 1).trim();
      }

      const matchedIndices = parseConditionExpr(condExpr, data, columns);

      // 1단계: 스캔
      for (let i = 0; i < data.length; i++) {
        steps.push({ type: "scanning", scannedIndex: i, matchedIndices: matchedIndices.filter((k) => k <= i) });
      }
      // 2단계: 필터
      steps.push({ type: "filtering", keptIndices: matchedIndices });

      let selectedCols = columns;
      if (colExpr) {
        selectedCols = parseColumnList(colExpr);
        const invalid = selectedCols.find((c) => !columns.includes(c));
        if (invalid) throw new Error(`KeyError: '${invalid}'`);
      }

      // 3단계: 열 선택
      steps.push({ type: "selecting", selectedColumns: selectedCols });

      const finalData = matchedIndices.map((i) => {
        const row: DataRow = {};
        selectedCols.forEach((c) => { row[c] = data[i][c]; });
        return row;
      });

      steps.push({ type: "done", result: finalData, resultColumns: selectedCols });
      return { steps, finalData, finalColumns: selectedCols };
    }

    // ── df[['col1','col2',...]] 다중 열 선택 ──
    const multiColMatch = trimmed.match(/^df\[\[(.+)\]\]$/);
    if (multiColMatch) {
      const selectedCols = parseColumnList(`[${multiColMatch[1]}]`);
      const invalid = selectedCols.find((c) => !columns.includes(c));
      if (invalid) throw new Error(`KeyError: '${invalid}'`);

      // 스캔 없이 바로 열 선택 단계
      steps.push({ type: "filtering", keptIndices: data.map((_, i) => i) });
      steps.push({ type: "selecting", selectedColumns: selectedCols });

      const finalData = data.map((row) => {
        const r: DataRow = {};
        selectedCols.forEach((c) => { r[c] = row[c]; });
        return r;
      });

      steps.push({ type: "done", result: finalData, resultColumns: selectedCols });
      return { steps, finalData, finalColumns: selectedCols };
    }

    // ── df['col'] 단일 열 선택 ──
    const singleColMatch = trimmed.match(/^df\[['"](.+?)['"]\]$/);
    if (singleColMatch) {
      const col = singleColMatch[1];
      if (!columns.includes(col)) throw new Error(`KeyError: '${col}'`);

      steps.push({ type: "filtering", keptIndices: data.map((_, i) => i) });
      steps.push({ type: "selecting", selectedColumns: [col] });

      const finalData = data.map((row) => ({ [col]: row[col] }));
      steps.push({ type: "done", result: finalData, resultColumns: [col] });
      return { steps, finalData, finalColumns: [col] };
    }

    // ── df[(cond1) & (cond2)] 또는 df[condition] 불리언 필터링 ──
    const boolFilterMatch = trimmed.match(/^df\[(.+)\]$/);
    if (boolFilterMatch) {
      const inner = boolFilterMatch[1].trim();

      // 조건식 판별 (df['col'] 형태가 포함된 경우)
      if (inner.includes("df[")) {
        const matchedIndices = parseConditionExpr(inner, data, columns);

        // 1단계: 스캔
        for (let i = 0; i < data.length; i++) {
          steps.push({ type: "scanning", scannedIndex: i, matchedIndices: matchedIndices.filter((k) => k <= i) });
        }
        // 2단계: 필터
        steps.push({ type: "filtering", keptIndices: matchedIndices });
        // 3단계: 모든 열 유지
        steps.push({ type: "selecting", selectedColumns: columns });

        const finalData = matchedIndices.map((i) => data[i]);
        steps.push({ type: "done", result: finalData, resultColumns: columns });
        return { steps, finalData, finalColumns: columns };
      }
    }

    throw new Error(`SyntaxError: 인식할 수 없는 코드 형식입니다. df[], df.loc[], df.iloc[] 중 하나를 사용하세요.`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    let errorType: "KeyError" | "IndexError" | "SyntaxError" | "TypeError" = "SyntaxError";
    if (msg.startsWith("KeyError")) errorType = "KeyError";
    else if (msg.startsWith("IndexError")) errorType = "IndexError";
    else if (msg.startsWith("TypeError")) errorType = "TypeError";

    steps.push({ type: "error", message: msg, errorType });
    return { steps, finalData: [], finalColumns: [] };
  }
}

// 최상위 레벨의 쉼표 위치 찾기 (대괄호 내부 제외)
function findTopLevelComma(str: string): number {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "[" || str[i] === "(") depth++;
    else if (str[i] === "]" || str[i] === ")") depth--;
    else if (str[i] === "," && depth === 0) return i;
  }
  return -1;
}

// ─── 미션 검증 ───────────────────────────────────────────────
export function validateMission(
  validateFn: string,
  resultData: DataRow[],
  resultColumns: string[],
  originalData: DataRow[]
): boolean {
  try {
    const [type, ...args] = validateFn.split(":");

    switch (type) {
      case "single_column": {
        const col = args[0];
        return resultColumns.length === 1 && resultColumns[0] === col && resultData.length === originalData.length;
      }
      case "boolean_filter": {
        const [col, val] = args;
        const expected = originalData.filter((r) => String(r[col]) === val);
        return resultData.length === expected.length;
      }
      case "numeric_filter": {
        const [col, op, valStr] = args;
        const val = Number(valStr);
        const expected = originalData.filter((r) => {
          const cell = Number(r[col]);
          switch (op) {
            case ">=": return cell >= val;
            case ">": return cell > val;
            case "<=": return cell <= val;
            case "<": return cell < val;
            case "==": return cell === val;
            default: return false;
          }
        });
        return resultData.length === expected.length;
      }
      case "multi_column": {
        const cols = args[0].split(",");
        return cols.every((c) => resultColumns.includes(c)) && resultColumns.length === cols.length && resultData.length === originalData.length;
      }
      case "loc_boolean": {
        const [col, val] = args;
        const parsed = parseValue(val);
        const expected = originalData.filter((r) => r[col] === parsed || String(r[col]) === val);
        return resultData.length === expected.length;
      }
      case "iloc_slice": {
        const [start, end] = args.map(Number);
        return resultData.length === end - start;
      }
      case "loc_filter_cols": {
        const parts = validateFn.split("|");
        if (parts.length < 4) return false;
        const col = parts[1];
        const valRaw = parts[2];
        const colsStr = parts.slice(3).join("|");
        const cols = colsStr.split(",").map((c) => c.trim());
        const expected = originalData.filter((r) => {
          if (valRaw === "True" || valRaw === "true") return r[col] === true;
          if (valRaw === "False" || valRaw === "false") return r[col] === false;
          return String(r[col]) === valRaw;
        });
        return resultData.length === expected.length && cols.every((c) => resultColumns.includes(c));
      }
      case "multi_condition": {
        const [col1, op1, val1, col2, op2, val2] = args;
        const n1 = Number(val1), n2 = Number(val2);
        const expected = originalData.filter((r) => {
          const c1 = Number(r[col1]);
          const c2 = Number(r[col2]);
          const m1 = op1 === ">" ? c1 > n1 : op1 === ">=" ? c1 >= n1 : op1 === "<" ? c1 < n1 : c1 <= n1;
          const m2 = op2 === ">" ? c2 > n2 : op2 === ">=" ? c2 >= n2 : op2 === "<" ? c2 < n2 : c2 <= n2;
          return m1 && m2;
        });
        return resultData.length === expected.length;
      }
      default:
        return false;
    }
  } catch {
    return false;
  }
}

// ─── React 훅 ────────────────────────────────────────────────
export interface PandasParserState {
  currentStep: AnimationStep;
  stepIndex: number;
  totalSteps: number;
  isAnimating: boolean;
  scannedRows: Set<number>;
  matchedRows: Set<number>;
  keptRows: Set<number>;
  selectedColumns: string[];
  finalData: DataRow[];
  finalColumns: string[];
}

const IDLE_STATE: PandasParserState = {
  currentStep: { type: "idle" },
  stepIndex: 0,
  totalSteps: 0,
  isAnimating: false,
  scannedRows: new Set(),
  matchedRows: new Set(),
  keptRows: new Set(),
  selectedColumns: [],
  finalData: [],
  finalColumns: [],
};

export function usePandasParser(data: DataRow[]) {
  const [state, setState] = useState<PandasParserState>(IDLE_STATE);

  const runCode = useCallback(
    (code: string) => {
      if (!data.length || !code.trim()) return null;

      const result = parsePandasCode(code, data);
      const steps = result.steps;

      if (!steps.length) return null;

      // 에러인 경우 즉시 반환
      const firstStep = steps[0];
      if (firstStep.type === "error") {
        setState({
          ...IDLE_STATE,
          currentStep: firstStep,
          totalSteps: 1,
        });
        return result;
      }

      // 애니메이션 단계 시작
      let stepIdx = 0;
      const scannedRows = new Set<number>();
      const matchedRows = new Set<number>();

      function advanceStep() {
        if (stepIdx >= steps.length) return;
        const step = steps[stepIdx];

        if (step.type === "scanning") {
          scannedRows.add(step.scannedIndex);
          step.matchedIndices.forEach((i) => matchedRows.add(i));
          setState((prev) => ({
            ...prev,
            currentStep: step,
            stepIndex: stepIdx,
            totalSteps: steps.length,
            isAnimating: true,
            scannedRows: new Set(scannedRows),
            matchedRows: new Set(matchedRows),
          }));
          stepIdx++;
          // 스캔 중에는 0.15초 간격
          setTimeout(advanceStep, 150);
        } else if (step.type === "filtering") {
          setState((prev) => ({
            ...prev,
            currentStep: step,
            stepIndex: stepIdx,
            isAnimating: true,
            keptRows: new Set(step.keptIndices),
          }));
          stepIdx++;
          setTimeout(advanceStep, 1500);
        } else if (step.type === "selecting") {
          setState((prev) => ({
            ...prev,
            currentStep: step,
            stepIndex: stepIdx,
            isAnimating: true,
            selectedColumns: step.selectedColumns,
          }));
          stepIdx++;
          setTimeout(advanceStep, 1500);
        } else if (step.type === "done") {
          setState((prev) => ({
            ...prev,
            currentStep: step,
            stepIndex: stepIdx,
            isAnimating: false,
            finalData: step.result,
            finalColumns: step.resultColumns,
          }));
        }
      }

      setState({
        ...IDLE_STATE,
        isAnimating: true,
        totalSteps: steps.length,
        currentStep: { type: "idle" },
      });

      setTimeout(advanceStep, 300);
      return result;
    },
    [data]
  );

  const reset = useCallback(() => {
    setState(IDLE_STATE);
  }, []);

  return { state, runCode, reset };
}
