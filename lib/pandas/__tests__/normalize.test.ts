import { describe, it, expect } from "vitest";
import { normalizeCode } from "@/lib/pandas/normalize";

describe("normalizeCode", () => {
  it("trims outer whitespace", () => {
    expect(normalizeCode("  df['Name']  ")).toBe("df['Name']");
  });

  it("collapses consecutive spaces and normalizes brackets", () => {
    expect(normalizeCode("df[  df['Name']  ==  'A'  ]")).toBe("df[df['Name'] == 'A']");
  });

  it("normalizes operator spacing", () => {
    expect(normalizeCode("df[df['HP']>=100]")).toBe("df[df['HP'] >= 100]");
    expect(normalizeCode("df[df['HP']>90]")).toBe("df[df['HP'] > 90]");
  });

  it("normalizes & spacing in multi conditions", () => {
    expect(normalizeCode("df[(df['HP']>90)&(df['Attack']>100)]")).toBe(
      "df[(df['HP'] > 90) & (df['Attack'] > 100)]"
    );
  });

  it("normalizes loc/iloc bracket spacing", () => {
    expect(normalizeCode("df.loc[ : , ['Name'] ]")).toBe("df.loc[:, ['Name']]");
    expect(normalizeCode("df . loc [ :, 'Name' ]")).toBe("df.loc[:, 'Name']");
    expect(normalizeCode("df . iloc [ 0:5 ]")).toBe("df.iloc[0:5]");
  });

  it("preserves spaces inside string literals", () => {
    expect(normalizeCode("df[df['Type 1'] == '불꽃']")).toBe("df[df['Type 1'] == '불꽃']");
    expect(normalizeCode("df[['Sp. Atk']]")).toBe("df[['Sp. Atk']]");
  });

  it("normalizes comma spacing in loc/iloc", () => {
    expect(normalizeCode("df.loc[df['Legendary']==True,  ['Name']  ]")).toBe(
      "df.loc[df['Legendary'] == True, ['Name']]"
    );
    expect(normalizeCode("df.iloc[0:5,  :  ]")).toBe("df.iloc[0:5, :]");
  });
});
