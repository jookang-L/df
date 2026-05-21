import { parseValue } from "@/lib/pandas/bracket-utils";
import { evaluateCondition } from "@/lib/pandas/condition/evaluate";
import type { DataRow } from "@/lib/pandas/types";

export function parseSingleCondition(
  expr: string,
  data: DataRow[],
  columns: string[]
): number[] {
  const trimmed = expr.trim().replace(/^\(|\)$/g, "").trim();
  const condMatch = trimmed.match(/^df\[['"](.+?)['"]\]\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
  if (!condMatch) {
    throw new Error(`SyntaxError: 조건식을 인식할 수 없습니다: "${expr}"`);
  }
  const col = condMatch[1];
  const op = condMatch[2];
  const val = parseValue(condMatch[3]);
  return data
    .map((row, i) => (evaluateCondition(row, col, op, val, columns) ? i : -1))
    .filter((i) => i !== -1);
}

function splitAndConditions(expr: string): string[] {
  const trimmed = expr.trim();
  if (!trimmed.includes("&")) {
    return [trimmed.replace(/^\(|\)$/g, "").trim()];
  }

  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (ch === "&" && depth === 0) {
      parts.push(trimmed.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(trimmed.slice(start).trim());

  if (parts.length > 1) {
    return parts.map((p) => p.replace(/^\(|\)$/g, "").trim());
  }

  const fallback = trimmed.split(/\)\s*&\s*\(/).map((p) => p.replace(/^\(|\)$/g, "").trim());
  if (fallback.length > 1) return fallback;

  return [trimmed.replace(/^\(|\)$/g, "").trim()];
}

export function parseConditionExpr(
  expr: string,
  data: DataRow[],
  columns: string[]
): number[] {
  const trimmed = expr.trim();
  const parts = splitAndConditions(trimmed);

  if (parts.length === 1) {
    return parseSingleCondition(parts[0], data, columns);
  }

  let indices = data.map((_, i) => i);
  for (const part of parts) {
    const matched = parseSingleCondition(part, data, columns);
    const set = new Set(matched);
    indices = indices.filter((i) => set.has(i));
  }
  return indices;
}
