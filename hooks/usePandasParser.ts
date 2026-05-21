"use client";

import { useState, useCallback } from "react";
import {
  parsePandasCode,
  validateMission,
  type AnimationStep,
  type DataRow,
  type ParseResult,
} from "@/lib/pandas";

export type { AnimationStep, DataRow, ParseResult };
export { parsePandasCode, validateMission };

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

      const firstStep = steps[0];
      if (firstStep.type === "error") {
        setState({
          ...IDLE_STATE,
          currentStep: firstStep,
          totalSteps: 1,
        });
        return result;
      }

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
