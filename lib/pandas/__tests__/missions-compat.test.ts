import { describe, it, expect } from "vitest";
import { parsePandasCode } from "@/lib/pandas/executor/index";
import { validateMission } from "@/lib/pandas/validator";
import { buildExpectedResult } from "@/lib/pandas/expected";
import { ALL_MISSION_POOLS } from "@/constants/missions";
import { MISSION_ALTERNATIVES, TEST_POKEMON } from "./mission-alternatives";

describe("mission compatibility", () => {
  for (const alt of MISSION_ALTERNATIVES) {
    const mission = ALL_MISSION_POOLS.find((m) => m.id === alt.missionId)!;

    describe(`mission ${alt.missionId}`, () => {
      for (const code of alt.accepted) {
        it(`accepts: ${code}`, () => {
          const result = parsePandasCode(code, TEST_POKEMON);
          expect(result.steps[0]?.type, `parse error: ${code}`).not.toBe("error");
          expect(
            validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON),
            `validation failed: ${code}`
          ).toBe(true);
        });
      }

      for (const code of alt.rejected) {
        it(`rejects: ${code}`, () => {
          const result = parsePandasCode(code, TEST_POKEMON);
          if (result.steps[0]?.type === "error") {
            expect(true).toBe(true);
            return;
          }
          expect(
            validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON),
            `should reject: ${code}`
          ).toBe(false);
        });
      }
    });
  }
});

describe("all mission specs", () => {
  it("buildExpectedResult works for every mission", () => {
    for (const mission of ALL_MISSION_POOLS) {
      const expected = buildExpectedResult(mission.spec, TEST_POKEMON);
      expect(expected.columns.length).toBeGreaterThan(0);
      expect(expected.data.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("targetCode passes validateMission for each mission", () => {
    for (const mission of ALL_MISSION_POOLS) {
      const result = parsePandasCode(mission.targetCode, TEST_POKEMON);
      expect(result.steps[0]?.type, `parse error for ${mission.id}`).not.toBe("error");
      const ok = validateMission(mission, result.finalData, result.finalColumns, TEST_POKEMON);
      expect(ok, `targetCode failed for ${mission.id}: ${mission.targetCode}`).toBe(true);
    }
  });
});
