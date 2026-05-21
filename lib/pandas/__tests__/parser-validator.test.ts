import { describe, it, expect } from "vitest";
import type { DataRow } from "@/lib/pandas/types";
import { compareDataFrames } from "@/lib/pandas/validator";
import { buildExpectedResult } from "@/lib/pandas/expected";
import { parsePandasCode } from "@/lib/pandas/executor/index";
import { validateMission } from "@/lib/pandas/validator";
import { ALL_MISSION_POOLS } from "@/constants/missions";
import { TEST_POKEMON } from "./mission-alternatives";

const FIXTURE: DataRow[] = TEST_POKEMON;

describe("parsePandasCode integration", () => {
  const colsMission = ALL_MISSION_POOLS.find((m) => m.id === "n-cols")!;

  it("accepts df[[]], loc, iloc equivalent for n-cols", () => {
    const codes = [
      "df[['Name', 'Type 1', 'HP']]",
      "df.loc[:, ['Name', 'Type 1', 'HP']]",
      "df.iloc[:, [1, 2, 4]]",
    ];
    for (const code of codes) {
      const result = parsePandasCode(code, FIXTURE);
      expect(result.steps[0]?.type).not.toBe("error");
      expect(
        validateMission(colsMission, result.finalData, result.finalColumns, FIXTURE)
      ).toBe(true);
    }
  });

  it("rejects wrong column order for n-cols", () => {
    const result = parsePandasCode("df[['HP', 'Name', 'Type 1']]", FIXTURE);
    expect(
      validateMission(colsMission, result.finalData, result.finalColumns, FIXTURE)
    ).toBe(false);
  });
});

describe("edge cases", () => {
  it("returns KeyError for unknown column", () => {
    const result = parsePandasCode("df['NoSuch']", FIXTURE);
    expect(result.steps[0]?.type).toBe("error");
    expect((result.steps[0] as { message: string }).message).toContain("KeyError");
  });

  it("returns SyntaxError for invalid code", () => {
    const result = parsePandasCode("df.sort_values('Name')", FIXTURE);
    expect(result.steps[0]?.type).toBe("error");
  });

  it("handles multi condition without & spaces", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "h-hp-atk")!;
    const result = parsePandasCode("df[(df['HP']>90)&(df['Attack']>100)]", FIXTURE);
    expect(validateMission(mission, result.finalData, result.finalColumns, FIXTURE)).toBe(true);
  });
});

describe("compareDataFrames strictness", () => {
  it("rejects wrong column order", () => {
    const expected = buildExpectedResult(
      { kind: "select_columns", columns: ["Name", "HP"] },
      FIXTURE
    );
    const actual = buildExpectedResult(
      { kind: "select_columns", columns: ["HP", "Name"] },
      FIXTURE
    );
    expect(compareDataFrames(actual, expected)).toBe(false);
  });
});
