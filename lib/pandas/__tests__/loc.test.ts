import { describe, it, expect } from "vitest";
import { parsePandasCode } from "@/lib/pandas/executor/index";
import { validateMission } from "@/lib/pandas/validator";
import { ALL_MISSION_POOLS } from "@/constants/missions";
import { TEST_POKEMON } from "./mission-alternatives";

describe("loc parser", () => {
  const mission = ALL_MISSION_POOLS.find((m) => m.id === "n2-loc-cols")!;

  it("supports df.loc[:, cols]", () => {
    const result = parsePandasCode("df.loc[:, ['Name', 'Speed']]", TEST_POKEMON);
    expect(result.steps[0]?.type).not.toBe("error");
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.loc[:, single col]", () => {
    const mission2 = ALL_MISSION_POOLS.find((m) => m.id === "e-name")!;
    const result = parsePandasCode("df.loc[:, 'Name']", TEST_POKEMON);
    expect(validateMission(mission2, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.loc[cond, :]", () => {
    const mission3 = ALL_MISSION_POOLS.find((m) => m.id === "n-legend")!;
    const result = parsePandasCode("df.loc[df['Legendary'] == True, :]", TEST_POKEMON);
    expect(validateMission(mission3, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.loc[cond, cols]", () => {
    const mission4 = ALL_MISSION_POOLS.find((m) => m.id === "h-water")!;
    const result = parsePandasCode(
      "df.loc[df['Type 1'] == '물', ['Name', 'HP']]",
      TEST_POKEMON
    );
    expect(validateMission(mission4, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.loc[cond] without cols", () => {
    const mission5 = ALL_MISSION_POOLS.find((m) => m.id === "n-legend")!;
    const result = parsePandasCode("df.loc[df['Legendary'] == True]", TEST_POKEMON);
    expect(validateMission(mission5, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.loc[cond][cols] chain", () => {
    const mission6 = ALL_MISSION_POOLS.find((m) => m.id === "h-water")!;
    const result = parsePandasCode(
      "df.loc[df['Type 1'] == '물'][['Name', 'HP']]",
      TEST_POKEMON
    );
    expect(validateMission(mission6, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("handles whitespace variations", () => {
    const mission7 = ALL_MISSION_POOLS.find((m) => m.id === "e-name")!;
    const result = parsePandasCode("df.loc[ : , [ 'Name' ] ]", TEST_POKEMON);
    expect(validateMission(mission7, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });
});
