import { parseColumnList } from "@/lib/pandas/bracket-utils";
import { buildDoneStep, buildSelectStep } from "@/lib/pandas/animation";
import type { AnimationStep, DataRow, ParseResult } from "@/lib/pandas/types";

export function parseColumnChain(rest: string, allColumns: string[]): string[] {
  const trimmed = rest.trim();
  if (!trimmed.startsWith("[")) {
    throw new Error(
      `SyntaxError: 체인 인덱싱 두 번째는 [['열']] 또는 ['열'] 형식이어야 합니다`
    );
  }

  const multi = trimmed.match(/^\[\[(.+)\]\]$/);
  const single = trimmed.match(/^\[['"](.+?)['"]\]$/);
  let selectedCols: string[];

  if (multi) {
    selectedCols = parseColumnList(`[${multi[1]}]`);
  } else if (single) {
    selectedCols = [single[1]];
  } else {
    throw new Error(
      `SyntaxError: 체인 인덱싱 두 번째는 [['열']] 또는 ['열'] 형식이어야 합니다`
    );
  }

  const invalid = selectedCols.find((c) => !allColumns.includes(c));
  if (invalid) throw new Error(`KeyError: '${invalid}'`);
  return selectedCols;
}

export function applyColumnChain(
  rest: string,
  intermediate: ParseResult,
  allColumns: string[],
  steps: AnimationStep[]
): ParseResult {
  const selectedCols = parseColumnChain(rest, allColumns);
  steps.push(buildSelectStep(selectedCols));

  const finalData = intermediate.finalData.map((row) => {
    const newRow: DataRow = {};
    selectedCols.forEach((c) => {
      newRow[c] = row[c];
    });
    return newRow;
  });

  steps.push(buildDoneStep(finalData, selectedCols));
  return { steps, finalData, finalColumns: selectedCols };
}
