import type { Condition, DataRow } from "@/lib/pandas/types";

export function evaluateCondition(
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

export function filterByCondition(
  data: DataRow[],
  condition: Condition,
  columns: string[]
): number[] {
  return data
    .map((row, i) =>
      evaluateCondition(row, condition.column, condition.op, condition.value, columns) ? i : -1
    )
    .filter((i) => i !== -1);
}

export function filterByConditions(
  data: DataRow[],
  conditions: Condition[],
  columns: string[]
): number[] {
  let indices = data.map((_, i) => i);
  for (const cond of conditions) {
    const matched = filterByCondition(data, cond, columns);
    const set = new Set(matched);
    indices = indices.filter((i) => set.has(i));
  }
  return indices;
}
