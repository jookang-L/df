import { parseColumnList } from "@/lib/pandas/bracket-utils";
import { parseConditionExpr } from "@/lib/pandas/condition/parser";
import {
  buildDoneStep,
  buildFilterStep,
  buildScanSteps,
  buildSelectStep,
  projectRows,
} from "@/lib/pandas/animation";
import { parseColumnChain } from "@/lib/pandas/selectors/chain";
import type { AnimationStep, DataRow, ParseResult } from "@/lib/pandas/types";

export function executeColumnSelect(
  data: DataRow[],
  columns: string[],
  selectedCols: string[],
  steps: AnimationStep[]
): ParseResult {
  const invalid = selectedCols.find((c) => !columns.includes(c));
  if (invalid) throw new Error(`KeyError: '${invalid}'`);
  const rowIndices = data.map((_, i) => i);

  steps.push(buildFilterStep(rowIndices));
  steps.push(buildSelectStep(selectedCols));
  const finalData = projectRows(data, rowIndices, selectedCols);
  steps.push(buildDoneStep(finalData, selectedCols));
  return { steps, finalData, finalColumns: selectedCols };
}

export function executeBooleanFilter(
  data: DataRow[],
  columns: string[],
  inner: string,
  steps: AnimationStep[]
): ParseResult {
  const matchedIndices = parseConditionExpr(inner, data, columns);
  steps.push(...buildScanSteps(data.length, matchedIndices));
  steps.push(buildFilterStep(matchedIndices));
  steps.push(buildSelectStep(columns));
  const finalData = matchedIndices.map((i) => ({ ...data[i] }));
  steps.push(buildDoneStep(finalData, columns));
  return { steps, finalData, finalColumns: columns };
}

export function executeConditionChain(
  data: DataRow[],
  columns: string[],
  inner1: string,
  rest: string,
  steps: AnimationStep[]
): ParseResult {
  const matchedIndices = parseConditionExpr(inner1, data, columns);
  const selectedCols = parseColumnChain(rest, columns);

  steps.push(...buildScanSteps(data.length, matchedIndices));
  steps.push(buildFilterStep(matchedIndices));
  steps.push(buildSelectStep(selectedCols));
  const finalData = projectRows(data, matchedIndices, selectedCols);
  steps.push(buildDoneStep(finalData, selectedCols));
  return { steps, finalData, finalColumns: selectedCols };
}
