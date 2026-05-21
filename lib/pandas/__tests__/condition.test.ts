import { describe, it, expect } from "vitest";
import type { DataRow } from "@/lib/pandas/types";
import { parseConditionExpr } from "@/lib/pandas/condition/parser";
import { TEST_POKEMON } from "./mission-alternatives";

const columns = Object.keys(TEST_POKEMON[0]);

describe("parseConditionExpr", () => {
  it("parses single equality condition", () => {
    const indices = parseConditionExpr("df['Type 1'] == '불꽃'", TEST_POKEMON, columns);
    expect(indices.length).toBeGreaterThan(0);
    for (const i of indices) {
      expect(TEST_POKEMON[i]["Type 1"]).toBe("불꽃");
    }
  });

  it("parses comparison operators", () => {
    const indices = parseConditionExpr("df['Attack'] >= 100", TEST_POKEMON, columns);
    for (const i of indices) {
      expect(Number(TEST_POKEMON[i].Attack)).toBeGreaterThanOrEqual(100);
    }
  });

  it("parses multi condition with spaced &", () => {
    const indices = parseConditionExpr(
      "(df['Type 1'] == '불꽃') & (df['Type 2'] != '')",
      TEST_POKEMON,
      columns
    );
    for (const i of indices) {
      expect(TEST_POKEMON[i]["Type 1"]).toBe("불꽃");
      expect(TEST_POKEMON[i]["Type 2"]).not.toBe("");
    }
  });

  it("parses multi condition without spaced &", () => {
    const indices = parseConditionExpr(
      "(df['HP']>90)&(df['Attack']>100)",
      TEST_POKEMON,
      columns
    );
    for (const i of indices) {
      expect(Number(TEST_POKEMON[i].HP)).toBeGreaterThan(90);
      expect(Number(TEST_POKEMON[i].Attack)).toBeGreaterThan(100);
    }
  });

  it("throws on invalid condition", () => {
    expect(() => parseConditionExpr("invalid", TEST_POKEMON, columns)).toThrow(
      "SyntaxError"
    );
  });
});
