import { findTopLevelComma, parseIntList } from "@/lib/pandas/bracket-utils";
import {
  buildDoneStep,
  buildFilterStep,
  buildSelectStep,
  projectRows,
} from "@/lib/pandas/animation";
import type { AnimationStep, DataRow, IlocSelection, ParseResult } from "@/lib/pandas/types";

function parseSlicePart(part: string, max: number): { start: number; end: number } {
  const t = part.trim();
  if (t === ":") return { start: 0, end: max };
  if (!t.includes(":")) {
    const n = parseInt(t, 10);
    if (Number.isNaN(n)) throw new Error(`SyntaxError: iloc 인덱스를 해석할 수 없습니다: ${part}`);
    return { start: n, end: n + 1 };
  }
  const colon = t.indexOf(":");
  const left = t.slice(0, colon).trim();
  const right = t.slice(colon + 1).trim();
  const start = left === "" ? 0 : parseInt(left, 10);
  const end = right === "" ? max : parseInt(right, 10);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error(`SyntaxError: iloc 슬라이스를 해석할 수 없습니다: ${part}`);
  }
  return { start, end };
}

export function parseIlocSelection(
  inner: string,
  dataLen: number,
  colLen: number
): IlocSelection {
  const commaIdx = findTopLevelComma(inner);
  let rowPart: string;
  let colPart: string | null = null;

  if (commaIdx !== -1) {
    rowPart = inner.slice(0, commaIdx).trim();
    colPart = inner.slice(commaIdx + 1).trim();
  } else {
    rowPart = inner.trim();
  }

  const rowSlice = parseSlicePart(rowPart, dataLen);
  if (rowSlice.start < 0 || rowSlice.start > dataLen) {
    throw new Error(
      `IndexError: 행 인덱스 ${rowSlice.start}이(가) 범위를 벗어났습니다 (행 수: ${dataLen})`
    );
  }
  const clampedEnd = Math.min(rowSlice.end, dataLen);
  if (clampedEnd < rowSlice.start) {
    throw new Error(`IndexError: iloc 행 슬라이스가 범위를 벗어났습니다`);
  }

  let colIndices: number[] | "all" = "all";
  if (colPart !== null) {
    const cp = colPart.trim();
    if (cp === ":") {
      colIndices = "all";
    } else if (cp.startsWith("[")) {
      colIndices = parseIntList(cp);
      for (const idx of colIndices) {
        if (idx < 0 || idx >= colLen) {
          throw new Error(
            `IndexError: 열 인덱스 ${idx}이(가) 범위를 벗어났습니다 (열 수: ${colLen})`
          );
        }
      }
    } else if (cp.includes(":")) {
      const colSlice = parseSlicePart(cp, colLen);
      colIndices = [];
      for (let i = colSlice.start; i < colSlice.end; i++) colIndices.push(i);
    } else {
      const n = parseInt(cp, 10);
      if (Number.isNaN(n) || n < 0 || n >= colLen) {
        throw new Error(`IndexError: 열 인덱스 ${cp}이(가) 범위를 벗어났습니다`);
      }
      colIndices = [n];
    }
  }

  return { rowStart: rowSlice.start, rowEnd: clampedEnd, colIndices };
}

export function resolveIlocColumns(
  colIndices: number[] | "all",
  columns: string[]
): string[] {
  if (colIndices === "all") return columns;
  return colIndices.map((i) => columns[i]);
}

export function rowIndicesFromRange(start: number, end: number): number[] {
  const indices: number[] = [];
  for (let i = start; i < end; i++) indices.push(i);
  return indices;
}

export function executeIloc(
  data: DataRow[],
  columns: string[],
  inner: string,
  steps: AnimationStep[]
): ParseResult {
  const sel = parseIlocSelection(inner, data.length, columns.length);
  const rowIndices = rowIndicesFromRange(sel.rowStart, sel.rowEnd);
  const selectedCols = resolveIlocColumns(sel.colIndices, columns);

  if (rowIndices.length < data.length) {
    for (let i = 0; i < data.length; i++) {
      steps.push({
        type: "scanning",
        scannedIndex: i,
        matchedIndices: rowIndices.filter((k) => k <= i),
      });
    }
  }
  steps.push(buildFilterStep(rowIndices));
  steps.push(buildSelectStep(selectedCols));
  const finalData = projectRows(data, rowIndices, selectedCols);
  steps.push(buildDoneStep(finalData, selectedCols));
  return { steps, finalData, finalColumns: selectedCols };
}
