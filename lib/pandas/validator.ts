import type { DataRow, MissionSpec } from "@/lib/pandas/types";
import { buildExpectedResult } from "@/lib/pandas/expected";
import { compareDataFrames } from "@/lib/pandas/compare/dataframe";

export type { DataFrameLike } from "@/lib/pandas/compare/dataframe";
export { compareDataFrames, cellValuesEqual } from "@/lib/pandas/compare/dataframe";

export function validateMission(
  mission: { spec: MissionSpec },
  resultData: DataRow[],
  resultColumns: string[],
  originalData: DataRow[]
): boolean {
  try {
    const expected = buildExpectedResult(mission.spec, originalData);
    return compareDataFrames(
      { data: resultData, columns: resultColumns },
      expected
    );
  } catch {
    return false;
  }
}
