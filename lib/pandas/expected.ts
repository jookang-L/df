import type { Condition, DataRow, DataFrameResult, MissionSpec } from "@/lib/pandas/types";
import { filterByCondition, filterByConditions } from "@/lib/pandas/condition/evaluate";
import { getColumns } from "@/lib/pandas/bracket-utils";
import { projectRows } from "@/lib/pandas/animation";

export function buildExpectedResult(spec: MissionSpec, data: DataRow[]): DataFrameResult {
  const columns = getColumns(data);

  switch (spec.kind) {
    case "select_columns": {
      for (const col of spec.columns) {
        if (!columns.includes(col)) throw new Error(`KeyError: '${col}'`);
      }
      const rowIndices = data.map((_, i) => i);
      return {
        columns: [...spec.columns],
        data: projectRows(data, rowIndices, spec.columns),
      };
    }
    case "filter_rows": {
      const kept = filterByCondition(data, spec.condition, columns);
      return {
        columns: [...columns],
        data: kept.map((i) => ({ ...data[i] })),
      };
    }
    case "filter_select": {
      const kept = filterByCondition(data, spec.condition, columns);
      for (const col of spec.columns) {
        if (!columns.includes(col)) throw new Error(`KeyError: '${col}'`);
      }
      return {
        columns: [...spec.columns],
        data: projectRows(data, kept, spec.columns),
      };
    }
    case "iloc_rows": {
      const kept: number[] = [];
      const end = Math.min(spec.rowEnd, data.length);
      for (let i = spec.rowStart; i < end; i++) kept.push(i);
      const selectedCols =
        spec.columns === "all" || spec.columns === undefined
          ? columns
          : spec.columns;
      for (const col of selectedCols) {
        if (!columns.includes(col)) throw new Error(`KeyError: '${col}'`);
      }
      return {
        columns: [...selectedCols],
        data: projectRows(data, kept, selectedCols),
      };
    }
    case "multi_filter": {
      const kept = filterByConditions(data, spec.conditions, columns);
      return {
        columns: [...columns],
        data: kept.map((i) => ({ ...data[i] })),
      };
    }
    default:
      throw new Error("SyntaxError: 알 수 없는 미션 spec");
  }
}
