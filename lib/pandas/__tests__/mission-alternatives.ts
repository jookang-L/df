import type { DataRow } from "@/lib/pandas/types";
import { ALL_POKEMON } from "@/data/missionData";

/** 테스트용 포켓몬 데이터 (처음 20행) */
export const TEST_POKEMON: DataRow[] = ALL_POKEMON.slice(0, 20) as DataRow[];

/** iloc 열 인덱스: #=0, Name=1, Type 1=2, Type 2=3, HP=4, Attack=5, Defense=6, Sp. Atk=7, Sp. Def=8, Speed=9, Generation=10, Legendary=11 */
export const COL = {
  name: 1,
  type1: 2,
  type2: 3,
  hp: 4,
  attack: 5,
  defense: 6,
  spAtk: 7,
  spDef: 8,
  speed: 9,
  generation: 10,
  legendary: 11,
} as const;

export interface MissionAlternative {
  missionId: string;
  accepted: string[];
  rejected: string[];
}

/** 미션별 허용/거부 표현 매트릭스 */
export const MISSION_ALTERNATIVES: MissionAlternative[] = [
  {
    missionId: "e-name",
    accepted: [
      "df['Name']",
      'df["Name"]',
      "df.loc[:, 'Name']",
      "df.loc[ :, ['Name'] ]",
      "df[['Name']]",
      `df.iloc[:, ${COL.name}]`,
    ],
    rejected: ["df['HP']", "df[['Name', 'HP']]"],
  },
  {
    missionId: "e-fire",
    accepted: [
      "df[df['Type 1'] == '불꽃']",
      "df.loc[df['Type 1'] == '불꽃']",
      "df.loc[df['Type 1'] == '불꽃', :]",
      "df[df['Type 1']=='불꽃']",
    ],
    rejected: ["df[df['Type 1'] == '물']", "df[['Name']]"],
  },
  {
    missionId: "e-attack",
    accepted: [
      "df[df['Attack'] >= 100]",
      "df.loc[df['Attack'] >= 100]",
      "df.loc[df['Attack'] >= 100, :]",
    ],
    rejected: ["df[df['Attack'] < 100]"],
  },
  {
    missionId: "e-electric",
    accepted: ["df[df['Type 1'] == '전기']", "df.loc[df['Type 1'] == '전기']"],
    rejected: ["df[df['Type 1'] == '불꽃']"],
  },
  {
    missionId: "e-speed",
    accepted: ["df[df['Speed'] > 100]", "df.loc[df['Speed'] > 100]"],
    rejected: ["df[df['Speed'] <= 100]"],
  },
  {
    missionId: "e2-hp-col",
    accepted: ["df['HP']", "df.loc[:, 'HP']", `df.iloc[:, ${COL.hp}]`],
    rejected: ["df['Name']"],
  },
  {
    missionId: "e2-water",
    accepted: ["df[df['Type 1'] == '물']", "df.loc[df['Type 1'] == '물', :]"],
    rejected: ["df[df['Type 1'] == '불꽃']"],
  },
  {
    missionId: "e2-hp-low",
    accepted: ["df[df['HP'] < 50]", "df.loc[df['HP'] < 50]"],
    rejected: ["df[df['HP'] >= 50]"],
  },
  {
    missionId: "e2-gen1",
    accepted: ["df[df['Generation'] == 1]", "df.loc[df['Generation'] == 1]"],
    rejected: ["df[df['Generation'] == 2]"],
  },
  {
    missionId: "e2-legend-false",
    accepted: [
      "df[df['Legendary'] == False]",
      "df.loc[df['Legendary'] == False]",
    ],
    rejected: ["df[df['Legendary'] == True]"],
  },
  {
    missionId: "n-cols",
    accepted: [
      "df[['Name', 'Type 1', 'HP']]",
      "df.loc[:, ['Name', 'Type 1', 'HP']]",
      `df.iloc[:, [${COL.name}, ${COL.type1}, ${COL.hp}]]`,
    ],
    rejected: ["df[['HP', 'Name', 'Type 1']]", "df[['Name', 'HP']]"],
  },
  {
    missionId: "n-legend",
    accepted: [
      "df.loc[df['Legendary'] == True]",
      "df[df['Legendary'] == True]",
      "df.loc[df['Legendary'] == True, :]",
    ],
    rejected: ["df[df['Legendary'] == False]"],
  },
  {
    missionId: "n-iloc5",
    accepted: ["df.iloc[0:5]", "df.iloc[:5]", "df.iloc[0:5, :]"],
    rejected: ["df.iloc[0:3]", "df.iloc[5:10]"],
  },
  {
    missionId: "n-gen",
    accepted: ["df[df['Generation'] == 5]", "df.loc[df['Generation'] == 5]"],
    rejected: ["df[df['Generation'] == 1]"],
  },
  {
    missionId: "n-defense",
    accepted: ["df[df['Defense'] >= 100]", "df.loc[df['Defense'] >= 100]"],
    rejected: ["df[df['Defense'] < 100]"],
  },
  {
    missionId: "n2-stats",
    accepted: [
      "df[['Attack', 'Defense', 'Speed']]",
      "df.loc[:, ['Attack', 'Defense', 'Speed']]",
    ],
    rejected: ["df[['Speed', 'Defense', 'Attack']]"],
  },
  {
    missionId: "n2-iloc10",
    accepted: ["df.iloc[0:10]", "df.iloc[:10]", "df.iloc[0:10, :]"],
    rejected: ["df.iloc[0:5]"],
  },
  {
    missionId: "n2-dual-type",
    accepted: [
      "df[(df['Type 1'] == '불꽃') & (df['Type 2'] != '')]",
      "df[(df['Type 1']=='불꽃')&(df['Type 2']!='')]",
      "df.loc[(df['Type 1'] == '불꽃') & (df['Type 2'] != '')]",
    ],
    rejected: ["df[df['Type 1'] == '불꽃']"],
  },
  {
    missionId: "n2-spatk",
    accepted: ["df[df['Sp. Atk'] >= 100]", "df.loc[df['Sp. Atk'] >= 100]"],
    rejected: ["df[df['Sp. Atk'] < 100]"],
  },
  {
    missionId: "n2-loc-cols",
    accepted: [
      "df.loc[:, ['Name', 'Speed']]",
      "df[['Name', 'Speed']]",
      "df.loc[ : , [ 'Name', 'Speed' ] ]",
    ],
    rejected: ["df[['Speed', 'Name']]"],
  },
  {
    missionId: "h-water",
    accepted: [
      "df.loc[df['Type 1'] == '물', ['Name', 'HP']]",
      "df[df['Type 1'] == '물'][['Name', 'HP']]",
      "df.loc[df['Type 1'] == '물'][['Name', 'HP']]",
    ],
    rejected: [
      "df.loc[df['Type 1'] == '물', ['Name']]",
      "df[df['Type 1'] == '불꽃'][['Name', 'HP']]",
    ],
  },
  {
    missionId: "h-hp-atk",
    accepted: [
      "df[(df['HP'] > 90) & (df['Attack'] > 100)]",
      "df[(df['HP']>90)&(df['Attack']>100)]",
      "df.loc[(df['HP'] > 90) & (df['Attack'] > 100)]",
    ],
    rejected: ["df[df['HP'] > 90]"],
  },
  {
    missionId: "h-grass-cols",
    accepted: [
      "df.loc[df['Type 1'] == '풀', ['Name', 'Attack', 'Speed']]",
      "df[df['Type 1'] == '풀'][['Name', 'Attack', 'Speed']]",
      "df.loc[df['Type 1'] == '풀'][['Name', 'Attack', 'Speed']]",
    ],
    rejected: ["df.loc[df['Type 1'] == '풀', ['Name', 'HP']]"],
  },
  {
    missionId: "h-psychic",
    accepted: [
      "df.loc[df['Type 1'] == '에스퍼', ['Name', 'Sp. Atk']]",
      "df[df['Type 1'] == '에스퍼'][['Name', 'Sp. Atk']]",
    ],
    rejected: ["df.loc[df['Type 1'] == '풀', ['Name', 'Sp. Atk']]"],
  },
  {
    missionId: "h-legend-stats",
    accepted: [
      "df.loc[df['Legendary'] == True, ['Name', 'Attack', 'Defense']]",
      "df[df['Legendary'] == True][['Name', 'Attack', 'Defense']]",
      "df.loc[df['Legendary'] == True][['Name', 'Attack', 'Defense']]",
    ],
    rejected: ["df.loc[df['Legendary'] == False, ['Name', 'Attack', 'Defense']]"],
  },
  {
    missionId: "h2-dragon",
    accepted: [
      "df.loc[df['Type 1'] == '드래곤', ['Name', 'Attack']]",
      "df[df['Type 1'] == '드래곤'][['Name', 'Attack']]",
    ],
    rejected: ["df.loc[df['Type 1'] == '물', ['Name', 'Attack']]"],
  },
  {
    missionId: "h2-hp-def",
    accepted: [
      "df[(df['HP'] >= 100) & (df['Defense'] >= 100)]",
      "df[(df['HP']>=100)&(df['Defense']>=100)]",
    ],
    rejected: ["df[df['HP'] >= 100]"],
  },
  {
    missionId: "h2-gen5-cols",
    accepted: [
      "df.loc[df['Generation'] == 5, ['Name', 'Type 1', 'HP']]",
      "df[df['Generation'] == 5][['Name', 'Type 1', 'HP']]",
    ],
    rejected: ["df.loc[df['Generation'] == 1, ['Name', 'Type 1', 'HP']]"],
  },
  {
    missionId: "h2-iloc-range",
    accepted: [
      "df.iloc[5:15][['Name', 'HP']]",
      `df.iloc[5:15, [${COL.name}, ${COL.hp}]]`,
    ],
    rejected: [
      "df.iloc[5:15, ['Name', 'HP']]",
      "df.iloc[0:5][['Name', 'HP']]",
    ],
  },
  {
    missionId: "h2-electric-stats",
    accepted: [
      "df.loc[df['Type 1'] == '전기', ['Name', 'Attack', 'Speed']]",
      "df[df['Type 1'] == '전기'][['Name', 'Attack', 'Speed']]",
    ],
    rejected: ["df.loc[df['Type 1'] == '물', ['Name', 'Attack', 'Speed']]"],
  },
];
