import { normalizeCode } from "@/lib/pandas/normalize";
import {
  extractFirstDfBracket,
  extractIlocBracket,
  extractLocBracket,
  getColumns,
  parseColumnList,
} from "@/lib/pandas/bracket-utils";
import { applyColumnChain } from "@/lib/pandas/selectors/chain";
import {
  executeBooleanFilter,
  executeColumnSelect,
  executeConditionChain,
} from "@/lib/pandas/selectors/column-select";
import { executeIloc } from "@/lib/pandas/selectors/iloc";
import { executeLoc } from "@/lib/pandas/selectors/loc";
import type { AnimationStep, DataRow, ParseResult } from "@/lib/pandas/types";

function errorResult(steps: AnimationStep[], e: unknown): ParseResult {
  const msg = e instanceof Error ? e.message : String(e);
  let errorType: "KeyError" | "IndexError" | "SyntaxError" | "TypeError" = "SyntaxError";
  if (msg.startsWith("KeyError")) errorType = "KeyError";
  else if (msg.startsWith("IndexError")) errorType = "IndexError";
  else if (msg.startsWith("TypeError")) errorType = "TypeError";
  steps.push({ type: "error", message: msg, errorType });
  return { steps, finalData: [], finalColumns: [] };
}

export function parsePandasCode(code: string, data: DataRow[]): ParseResult {
  const steps: AnimationStep[] = [];
  const columns = getColumns(data);
  const trimmed = normalizeCode(code);

  if (!data.length) {
    return errorResult(steps, new Error("SyntaxError: 데이터가 비어 있습니다"));
  }

  try {
    if (trimmed.startsWith("df.iloc[")) {
      const ilocBracket = extractIlocBracket(trimmed);
      if (!ilocBracket) throw new Error(`SyntaxError: df.iloc[] 형식이 올바르지 않습니다`);

      const ilocResult = executeIloc(data, columns, ilocBracket.inner, steps);
      const rest = ilocBracket.rest.trim();
      if (rest.startsWith("[")) {
        return applyColumnChain(rest, ilocResult, columns, steps);
      }
      return ilocResult;
    }

    if (trimmed.startsWith("df.loc[")) {
      const locBracket = extractLocBracket(trimmed);
      if (!locBracket) throw new Error(`SyntaxError: df.loc[] 형식이 올바르지 않습니다`);

      const locResult = executeLoc(locBracket.inner, data, columns, steps);
      const rest = locBracket.rest.trim();
      if (rest.startsWith("[")) {
        return applyColumnChain(rest, locResult, columns, steps);
      }
      return locResult;
    }

    const chain = extractFirstDfBracket(trimmed);
    if (chain && chain.rest.trim().startsWith("[")) {
      const inner1 = chain.inner.trim();
      if (inner1.includes("df[")) {
        return executeConditionChain(data, columns, inner1, chain.rest.trim(), steps);
      }
    }

    const multiColMatch = trimmed.match(/^df\[\[(.+)\]\]$/);
    if (multiColMatch) {
      const selectedCols = parseColumnList(`[${multiColMatch[1]}]`);
      return executeColumnSelect(data, columns, selectedCols, steps);
    }

    const singleColMatch = trimmed.match(/^df\[['"](.+?)['"]\]$/);
    if (singleColMatch) {
      return executeColumnSelect(data, columns, [singleColMatch[1]], steps);
    }

    const boolFilterMatch = trimmed.match(/^df\[(.+)\]$/);
    if (boolFilterMatch) {
      const inner = boolFilterMatch[1].trim();
      if (inner.includes("df[")) {
        return executeBooleanFilter(data, columns, inner, steps);
      }
    }

    throw new Error(
      `SyntaxError: 인식할 수 없는 코드 형식입니다. df[], df.loc[], df.iloc[] 중 하나를 사용하세요.`
    );
  } catch (e) {
    return errorResult(steps, e);
  }
}

export { parsePandasCode as executeCode };
