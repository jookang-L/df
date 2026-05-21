import type { DataFrameResult } from "@/lib/pandas/types";

export interface DataFrameLike {
  data: DataFrameResult["data"];
  columns: string[];
}

export function cellValuesEqual(a: unknown, b: unknown): boolean {
  // eslint-disable-next-line eqeqeq
  return a == b;
}

export function compareDataFrames(actual: DataFrameLike, expected: DataFrameLike): boolean {
  if (actual.columns.length !== expected.columns.length) return false;
  for (let i = 0; i < expected.columns.length; i++) {
    if (actual.columns[i] !== expected.columns[i]) return false;
  }
  if (actual.data.length !== expected.data.length) return false;
  for (let r = 0; r < expected.data.length; r++) {
    for (const col of expected.columns) {
      if (!cellValuesEqual(actual.data[r][col], expected.data[r][col])) return false;
    }
  }
  return true;
}
