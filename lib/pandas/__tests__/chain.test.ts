import { describe, it, expect } from "vitest";
import { parsePandasCode } from "@/lib/pandas/executor/index";
import { validateMission } from "@/lib/pandas/validator";
import { ALL_MISSION_POOLS } from "@/constants/missions";
import { TEST_POKEMON } from "./mission-alternatives";

describe("chain indexing", () => {
  it("supports df[cond][cols]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "h-water")!;
    const result = parsePandasCode("df[df['Type 1'] == '물'][['Name', 'HP']]", TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.loc[cond][cols]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "h-grass-cols")!;
    const result = parsePandasCode(
      "df.loc[df['Type 1'] == '풀'][['Name', 'Attack', 'Speed']]",
      TEST_POKEMON
    );
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.iloc[rows][cols]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "h2-iloc-range")!;
    const result = parsePandasCode("df.iloc[5:15][['Name', 'HP']]", TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df[df['Type 1']=='불꽃'][['Name']]", () => {
    const result = parsePandasCode("df[df['Type 1']=='불꽃'][['Name']]", TEST_POKEMON);
    expect(result.finalColumns).toEqual(["Name"]);
    expect(result.finalData.length).toBeGreaterThan(0);
    for (const row of result.finalData) {
      expect(row.Name).toBeTruthy();
    }
  });

  it("rejects invalid chain format", () => {
    const result = parsePandasCode("df[df['Type 1']=='물'].Name", TEST_POKEMON);
    expect(result.steps[0]?.type).toBe("error");
  });
});
