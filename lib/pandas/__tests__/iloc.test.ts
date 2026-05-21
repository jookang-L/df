import { describe, it, expect } from "vitest";
import { parsePandasCode } from "@/lib/pandas/executor/index";
import { validateMission } from "@/lib/pandas/validator";
import { ALL_MISSION_POOLS } from "@/constants/missions";
import { COL, TEST_POKEMON } from "./mission-alternatives";

describe("iloc parser", () => {
  it("supports row slice df.iloc[0:5]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "n-iloc5")!;
    const result = parsePandasCode("df.iloc[0:5]", TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports row slice df.iloc[:5]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "n-iloc5")!;
    const result = parsePandasCode("df.iloc[:5]", TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports df.iloc[0:5, :]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "n-iloc5")!;
    const result = parsePandasCode("df.iloc[0:5, :]", TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports column int list df.iloc[:, [1,2,4]]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "n-cols")!;
    const result = parsePandasCode(
      `df.iloc[:, [${COL.name}, ${COL.type1}, ${COL.hp}]]`,
      TEST_POKEMON
    );
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports column slice df.iloc[:, 1:4]", () => {
    const result = parsePandasCode("df.iloc[:, 1:4]", TEST_POKEMON);
    expect(result.finalColumns).toEqual(["Name", "Type 1", "Type 2"]);
    expect(result.finalData.length).toBe(TEST_POKEMON.length);
  });

  it("supports single column df.iloc[:, 1]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "e-name")!;
    const result = parsePandasCode(`df.iloc[:, ${COL.name}]`, TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports 2D iloc with int columns", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "h2-iloc-range")!;
    const result = parsePandasCode(
      `df.iloc[5:15, [${COL.name}, ${COL.hp}]]`,
      TEST_POKEMON
    );
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("supports iloc chain df.iloc[5:15][['Name','HP']]", () => {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === "h2-iloc-range")!;
    const result = parsePandasCode("df.iloc[5:15][['Name', 'HP']]", TEST_POKEMON);
    expect(validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON)).toBe(
      true
    );
  });

  it("rejects iloc with column names in 2D", () => {
    const result = parsePandasCode("df.iloc[5:15, ['Name', 'HP']]", TEST_POKEMON);
    expect(result.steps[0]?.type).toBe("error");
  });

  it("clamps row end beyond data length", () => {
    const result = parsePandasCode("df.iloc[5:100]", TEST_POKEMON);
    expect(result.steps[0]?.type).not.toBe("error");
    expect(result.finalData.length).toBe(TEST_POKEMON.length - 5);
  });
});
