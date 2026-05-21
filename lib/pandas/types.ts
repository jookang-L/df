export type DataRow = Record<string, string | number | boolean>;

export type AnimationStep =
  | { type: "idle" }
  | { type: "scanning"; scannedIndex: number; matchedIndices: number[] }
  | { type: "filtering"; keptIndices: number[] }
  | { type: "selecting"; selectedColumns: string[] }
  | { type: "done"; result: DataRow[]; resultColumns: string[] }
  | { type: "error"; message: string; errorType: "KeyError" | "IndexError" | "SyntaxError" | "TypeError" };

export interface ParseResult {
  steps: AnimationStep[];
  finalData: DataRow[];
  finalColumns: string[];
}

export type CompareOp = "==" | "!=" | ">" | ">=" | "<" | "<=";

export interface Condition {
  column: string;
  op: CompareOp;
  value: string | number | boolean;
}

export interface DataFrameResult {
  data: DataRow[];
  columns: string[];
}

export interface SelectorResult {
  finalData: DataRow[];
  finalColumns: string[];
}

export interface LocSelection {
  rowSelector: string;
  colSelector: string | null;
}

export interface IlocSelection {
  rowStart: number;
  rowEnd: number;
  colIndices: number[] | "all";
}

export type MissionSpec =
  | { kind: "select_columns"; columns: string[] }
  | { kind: "filter_rows"; condition: Condition }
  | { kind: "filter_select"; condition: Condition; columns: string[] }
  | { kind: "iloc_rows"; rowStart: number; rowEnd: number; columns?: string[] | "all" }
  | { kind: "multi_filter"; conditions: Condition[] };
