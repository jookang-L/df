import { findTopLevelComma, parseColumnList } from "@/lib/pandas/bracket-utils";
import { parseConditionExpr } from "@/lib/pandas/condition/parser";
import {
  buildDoneStep,
  buildFilterStep,
  buildScanSteps,
  buildSelectStep,
  projectRows,
} from "@/lib/pandas/animation";
import type { AnimationStep, DataRow, LocSelection, ParseResult } from "@/lib/pandas/types";

export function resolveLocColumns(
  colExpr: string | null,
  columns: string[]
): string[] {
  if (!colExpr || colExpr.trim() === ":") return columns;
  const t = colExpr.trim();
  const multi = t.match(/^\[(.+)\]$/);
  if (multi) {
    const cols = parseColumnList(`[${multi[1]}]`);
    const invalid = cols.find((c) => !columns.includes(c));
    if (invalid) throw new Error(`KeyError: '${invalid}'`);
    return cols;
  }
  const single = t.match(/^['"](.+?)['"]$/);
  if (single) {
    if (!columns.includes(single[1])) throw new Error(`KeyError: '${single[1]}'`);
    return [single[1]];
  }
  throw new Error(`SyntaxError: loc 열 선택을 해석할 수 없습니다: ${colExpr}`);
}

export function parseLocSelection(inner: string): LocSelection {
  const commaIdx = findTopLevelComma(inner);
  if (commaIdx !== -1) {
    return {
      rowSelector: inner.slice(0, commaIdx).trim(),
      colSelector: inner.slice(commaIdx + 1).trim(),
    };
  }
  return { rowSelector: inner.trim(), colSelector: null };
}

export function executeLoc(
  inner: string,
  data: DataRow[],
  columns: string[],
  steps: AnimationStep[]
): ParseResult {
  const { rowSelector, colSelector } = parseLocSelection(inner);

  let matchedIndices: number[];
  if (rowSelector === ":") {
    matchedIndices = data.map((_, i) => i);
  } else {
    matchedIndices = parseConditionExpr(rowSelector, data, columns);
    steps.push(...buildScanSteps(data.length, matchedIndices));
  }

  steps.push(buildFilterStep(matchedIndices));
  const selectedCols = resolveLocColumns(colSelector, columns);
  steps.push(buildSelectStep(selectedCols));

  const finalData = projectRows(data, matchedIndices, selectedCols);
  steps.push(buildDoneStep(finalData, selectedCols));
  return { steps, finalData, finalColumns: selectedCols };
}
