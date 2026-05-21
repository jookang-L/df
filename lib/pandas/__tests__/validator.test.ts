import { describe, it, expect } from "vitest";
import type { DataRow } from "@/lib/pandas/types";
import { compareDataFrames, validateMission } from "@/lib/pandas/validator";
import { buildExpectedResult } from "@/lib/pandas/expected";
import { parsePandasCode } from "@/lib/pandas/executor/index";
import { TEST_POKEMON } from "./mission-alternatives";

const FIXTURE: DataRow[] = TEST_POKEMON;

describe("compareDataFrames", () => {
  it("accepts identical dataframes", () => {
    const expected = buildExpectedResult(
      { kind: "select_columns", columns: ["Name", "HP"] },
      FIXTURE
    );
    expect(compareDataFrames(expected, expected)).toBe(true);
  });

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

  it("rejects partial columns", () => {
    const expected = buildExpectedResult(
      { kind: "select_columns", columns: ["Name", "HP"] },
      FIXTURE
    );
    const actual = buildExpectedResult({ kind: "select_columns", columns: ["Name"] }, FIXTURE);
    expect(compareDataFrames(actual, expected)).toBe(false);
  });

  it("rejects same row count wrong values", () => {
    const expected = buildExpectedResult(
      { kind: "filter_rows", condition: { column: "Type 1", op: "==", value: "불꽃" } },
      FIXTURE
    );
    const wrong = parsePandasCode("df[df['Type 1'] == '물']", FIXTURE);
    expect(
      compareDataFrames({ data: wrong.finalData, columns: wrong.finalColumns }, expected)
    ).toBe(false);
  });

  it("rejects wrong row count even if some values match", () => {
    const expected = buildExpectedResult(
      { kind: "filter_rows", condition: { column: "Type 1", op: "==", value: "불꽃" } },
      FIXTURE
    );
    const partial = parsePandasCode("df[df['Type 1'] == '불꽃'][['Name']]", FIXTURE);
    expect(
      compareDataFrames(
        { data: partial.finalData, columns: partial.finalColumns },
        expected
      )
    ).toBe(false);
  });
});

describe("validateMission", () => {
  it("returns false on parse error result", () => {
    const result = parsePandasCode("df['NoSuch']", FIXTURE);
    expect(
      validateMission(
        { spec: { kind: "select_columns", columns: ["Name"] } },
        result.finalData,
        result.finalColumns,
        FIXTURE
      )
    ).toBe(false);
  });
});
