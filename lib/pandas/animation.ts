import type { AnimationStep, DataRow } from "@/lib/pandas/types";

export function buildScanSteps(dataLen: number, matchedIndices: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  for (let i = 0; i < dataLen; i++) {
    steps.push({
      type: "scanning",
      scannedIndex: i,
      matchedIndices: matchedIndices.filter((k) => k <= i),
    });
  }
  return steps;
}

export function buildFilterStep(keptIndices: number[]): AnimationStep {
  return { type: "filtering", keptIndices };
}

export function buildSelectStep(selectedColumns: string[]): AnimationStep {
  return { type: "selecting", selectedColumns };
}

export function buildDoneStep(result: DataRow[], resultColumns: string[]): AnimationStep {
  return { type: "done", result, resultColumns };
}

export function projectRows(
  data: DataRow[],
  rowIndices: number[],
  selectedCols: string[]
): DataRow[] {
  return rowIndices.map((i) => {
    const row: DataRow = {};
    selectedCols.forEach((c) => {
      row[c] = data[i][c];
    });
    return row;
  });
}

export function assembleResult(
  steps: AnimationStep[],
  data: DataRow[],
  rowIndices: number[],
  selectedCols: string[],
  options?: { skipScan?: boolean }
): { steps: AnimationStep[]; finalData: DataRow[]; finalColumns: string[] } {
  if (!options?.skipScan && rowIndices.length < data.length) {
    steps.push(...buildScanSteps(data.length, rowIndices));
  } else if (options?.skipScan || rowIndices.length === data.length) {
    steps.push(buildFilterStep(rowIndices));
  }

  if (selectedCols.length < Object.keys(data[0] || {}).length || rowIndices.length < data.length) {
    if (steps[steps.length - 1]?.type !== "filtering") {
      steps.push(buildFilterStep(rowIndices));
    }
  }

  steps.push(buildSelectStep(selectedCols));
  const finalData = projectRows(data, rowIndices, selectedCols);
  steps.push(buildDoneStep(finalData, selectedCols));
  return { steps, finalData, finalColumns: selectedCols };
}
