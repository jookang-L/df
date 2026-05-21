import type { Condition, MissionSpec } from "@/lib/pandas/types";

export interface Mission {
  id: string;
  title: string;
  description: string;
  hint: string;
  difficulty: "쉬움" | "보통" | "어려움";
  targetCode: string;
  spec: MissionSpec;
}

const c = (
  column: string,
  op: Condition["op"],
  value: string | number | boolean
): Condition => ({ column, op, value });

/** 쉬움 풀 (10개) */
export const MISSION_EASY: Mission[] = [
  {
    id: "e-name",
    title: "포켓몬 이름만 골라라!",
    description: "데이터프레임에서 'Name' 열만 선택하세요.",
    hint: "df['열이름'] 또는 df.loc[:, 'Name'] 형식을 사용해보세요!",
    difficulty: "쉬움",
    targetCode: "df['Name']",
    spec: { kind: "select_columns", columns: ["Name"] },
  },
  {
    id: "e-fire",
    title: "불 속성 포켓몬을 찾아라!",
    description: "1타입이 '불꽃'인 포켓몬만 필터링하세요.",
    hint: "df[df['Type 1'] == '불꽃'] 형식을 사용해보세요!",
    difficulty: "쉬움",
    targetCode: "df[df['Type 1'] == '불꽃']",
    spec: { kind: "filter_rows", condition: c("Type 1", "==", "불꽃") },
  },
  {
    id: "e-attack",
    title: "강력한 포켓몬을 찾아라!",
    description: "공격(Attack)이 100 이상인 포켓몬만 필터링하세요.",
    hint: "df[df['Attack'] >= 100] 형식을 사용해보세요!",
    difficulty: "쉬움",
    targetCode: "df[df['Attack'] >= 100]",
    spec: { kind: "filter_rows", condition: c("Attack", ">=", 100) },
  },
  {
    id: "e-electric",
    title: "전기 타입을 찾아라!",
    description: "1타입이 '전기'인 포켓몬만 필터링하세요.",
    hint: "df[df['Type 1'] == '전기']",
    difficulty: "쉬움",
    targetCode: "df[df['Type 1'] == '전기']",
    spec: { kind: "filter_rows", condition: c("Type 1", "==", "전기") },
  },
  {
    id: "e-speed",
    title: "스피드가 빠른 포켓몬!",
    description: "스피드(Speed)가 100 초과인 포켓몬만 필터링하세요.",
    hint: "df[df['Speed'] > 100]",
    difficulty: "쉬움",
    targetCode: "df[df['Speed'] > 100]",
    spec: { kind: "filter_rows", condition: c("Speed", ">", 100) },
  },
  {
    id: "e2-hp-col",
    title: "HP만 확인하자!",
    description: "HP 열만 선택하세요.",
    hint: "df['HP'] 또는 df.loc[:, 'HP']",
    difficulty: "쉬움",
    targetCode: "df['HP']",
    spec: { kind: "select_columns", columns: ["HP"] },
  },
  {
    id: "e2-water",
    title: "물 타입 포켓몬!",
    description: "1타입이 '물'인 포켓몬만 필터링하세요.",
    hint: "df[df['Type 1'] == '물']",
    difficulty: "쉬움",
    targetCode: "df[df['Type 1'] == '물']",
    spec: { kind: "filter_rows", condition: c("Type 1", "==", "물") },
  },
  {
    id: "e2-hp-low",
    title: "체력이 낮은 포켓몬!",
    description: "HP가 50 미만인 포켓몬만 필터링하세요.",
    hint: "df[df['HP'] < 50]",
    difficulty: "쉬움",
    targetCode: "df[df['HP'] < 50]",
    spec: { kind: "filter_rows", condition: c("HP", "<", 50) },
  },
  {
    id: "e2-gen1",
    title: "1세대 포켓몬!",
    description: "세대(Generation)가 1인 포켓몬만 필터링하세요.",
    hint: "df[df['Generation'] == 1]",
    difficulty: "쉬움",
    targetCode: "df[df['Generation'] == 1]",
    spec: { kind: "filter_rows", condition: c("Generation", "==", 1) },
  },
  {
    id: "e2-legend-false",
    title: "일반 포켓몬만!",
    description: "전설(Legendary)이 False인 포켓몬만 찾으세요.",
    hint: "df[df['Legendary'] == False]",
    difficulty: "쉬움",
    targetCode: "df[df['Legendary'] == False]",
    spec: { kind: "filter_rows", condition: c("Legendary", "==", false) },
  },
];

/** 보통 풀 (10개) */
export const MISSION_NORMAL: Mission[] = [
  {
    id: "n-cols",
    title: "이름과 타입만 보여줘!",
    description: "이름(Name), 1타입(Type 1), HP 열만 선택하세요.",
    hint: "df[['열1', '열2', '열3']] 또는 df.loc[:, [...]]",
    difficulty: "보통",
    targetCode: "df[['Name', 'Type 1', 'HP']]",
    spec: { kind: "select_columns", columns: ["Name", "Type 1", "HP"] },
  },
  {
    id: "n-legend",
    title: "전설의 포켓몬을 찾아라!",
    description: "전설(Legendary)이 True인 포켓몬만 찾으세요.",
    hint: "df.loc[df['Legendary'] == True] 또는 df[df['Legendary'] == True]",
    difficulty: "보통",
    targetCode: "df.loc[df['Legendary'] == True]",
    spec: { kind: "filter_rows", condition: c("Legendary", "==", true) },
  },
  {
    id: "n-iloc5",
    title: "처음 5마리만 보여줘!",
    description: "df.iloc로 상위 5개 행만 가져오세요. (0:5, :5 모두 가능)",
    hint: "df.iloc[0:5] 또는 df.iloc[:5]",
    difficulty: "보통",
    targetCode: "df.iloc[0:5]",
    spec: { kind: "iloc_rows", rowStart: 0, rowEnd: 5, columns: "all" },
  },
  {
    id: "n-gen",
    title: "5세대 포켓몬!",
    description: "세대(Generation)가 5인 포켓몬만 필터링하세요.",
    hint: "df[df['Generation'] == 5]",
    difficulty: "보통",
    targetCode: "df[df['Generation'] == 5]",
    spec: { kind: "filter_rows", condition: c("Generation", "==", 5) },
  },
  {
    id: "n-defense",
    title: "방어력이 높은 포켓몬!",
    description: "방어(Defense)가 100 이상인 포켓몬만 필터링하세요.",
    hint: "df[df['Defense'] >= 100]",
    difficulty: "보통",
    targetCode: "df[df['Defense'] >= 100]",
    spec: { kind: "filter_rows", condition: c("Defense", ">=", 100) },
  },
  {
    id: "n2-stats",
    title: "전투 스탯 3종!",
    description: "공격(Attack), 방어(Defense), 스피드(Speed) 열만 선택하세요.",
    hint: "df[['Attack', 'Defense', 'Speed']]",
    difficulty: "보통",
    targetCode: "df[['Attack', 'Defense', 'Speed']]",
    spec: { kind: "select_columns", columns: ["Attack", "Defense", "Speed"] },
  },
  {
    id: "n2-iloc10",
    title: "처음 10마리!",
    description: "df.iloc로 상위 10개 행만 가져오세요.",
    hint: "df.iloc[0:10] 또는 df.iloc[:10]",
    difficulty: "보통",
    targetCode: "df.iloc[0:10]",
    spec: { kind: "iloc_rows", rowStart: 0, rowEnd: 10, columns: "all" },
  },
  {
    id: "n2-dual-type",
    title: "이중 타입 불꽃!",
    description: "1타입이 '불꽃'이고 2타입(Type 2)이 비어있지 않은 포켓몬을 찾으세요.",
    hint: "df[(df['Type 1'] == '불꽃') & (df['Type 2'] != '')]",
    difficulty: "보통",
    targetCode: "df[(df['Type 1'] == '불꽃') & (df['Type 2'] != '')]",
    spec: {
      kind: "multi_filter",
      conditions: [c("Type 1", "==", "불꽃"), c("Type 2", "!=", "")],
    },
  },
  {
    id: "n2-spatk",
    title: "특수공격 강자!",
    description: "특수공격(Sp. Atk)이 100 이상인 포켓몬만 필터링하세요.",
    hint: "df[df['Sp. Atk'] >= 100]",
    difficulty: "보통",
    targetCode: "df[df['Sp. Atk'] >= 100]",
    spec: { kind: "filter_rows", condition: c("Sp. Atk", ">=", 100) },
  },
  {
    id: "n2-loc-cols",
    title: "loc으로 열 선택!",
    description: "이름(Name)과 스피드(Speed) 열만 loc으로 선택하세요.",
    hint: "df.loc[:, ['Name', 'Speed']]",
    difficulty: "보통",
    targetCode: "df.loc[:, ['Name', 'Speed']]",
    spec: { kind: "select_columns", columns: ["Name", "Speed"] },
  },
];

/** 어려움 풀 (10개) */
export const MISSION_HARD: Mission[] = [
  {
    id: "h-water",
    title: "물 속성 포켓몬의 이름과 HP!",
    description: "1타입이 '물'인 포켓몬의 이름(Name)과 HP만 가져오세요.",
    hint: "df.loc[조건, ['열1','열2']] 또는 df[조건][['열1','열2']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '물', ['Name', 'HP']]",
    spec: {
      kind: "filter_select",
      condition: c("Type 1", "==", "물"),
      columns: ["Name", "HP"],
    },
  },
  {
    id: "h-hp-atk",
    title: "체력이 높은 강한 포켓몬!",
    description: "HP가 90 초과이고 공격(Attack)이 100 초과인 포켓몬을 찾으세요.",
    hint: "df[(조건1) & (조건2)]",
    difficulty: "어려움",
    targetCode: "df[(df['HP'] > 90) & (df['Attack'] > 100)]",
    spec: {
      kind: "multi_filter",
      conditions: [c("HP", ">", 90), c("Attack", ">", 100)],
    },
  },
  {
    id: "h-grass-cols",
    title: "풀 타입의 핵심 스탯!",
    description: "1타입이 '풀'인 포켓몬의 이름(Name), 공격(Attack), 스피드(Speed)만 가져오세요.",
    hint: "loc 또는 체인 인덱싱",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '풀', ['Name', 'Attack', 'Speed']]",
    spec: {
      kind: "filter_select",
      condition: c("Type 1", "==", "풀"),
      columns: ["Name", "Attack", "Speed"],
    },
  },
  {
    id: "h-psychic",
    title: "에스퍼 타입 스펙!",
    description: "1타입이 '에스퍼'인 포켓몬의 이름(Name)과 특수공격(Sp. Atk)만 가져오세요.",
    hint: "열 이름에 공백이 있으면 그대로 따옴표에 넣으세요.",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '에스퍼', ['Name', 'Sp. Atk']]",
    spec: {
      kind: "filter_select",
      condition: c("Type 1", "==", "에스퍼"),
      columns: ["Name", "Sp. Atk"],
    },
  },
  {
    id: "h-legend-stats",
    title: "전설의 공격과 방어!",
    description: "전설(Legendary)이 True인 포켓몬의 이름(Name), 공격(Attack), 방어(Defense)만 가져오세요.",
    hint: "df[df['Legendary'] == True][['Name', 'Attack', 'Defense']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Legendary'] == True, ['Name', 'Attack', 'Defense']]",
    spec: {
      kind: "filter_select",
      condition: c("Legendary", "==", true),
      columns: ["Name", "Attack", "Defense"],
    },
  },
  {
    id: "h2-dragon",
    title: "드래곤 타입의 힘!",
    description: "1타입이 '드래곤'인 포켓몬의 이름(Name)과 공격(Attack)만 가져오세요.",
    hint: "df.loc[df['Type 1'] == '드래곤', ['Name', 'Attack']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '드래곤', ['Name', 'Attack']]",
    spec: {
      kind: "filter_select",
      condition: c("Type 1", "==", "드래곤"),
      columns: ["Name", "Attack"],
    },
  },
  {
    id: "h2-hp-def",
    title: "체력과 방어 모두!",
    description: "HP가 100 이상이고 방어(Defense)가 100 이상인 포켓몬을 찾으세요.",
    hint: "df[(df['HP'] >= 100) & (df['Defense'] >= 100)]",
    difficulty: "어려움",
    targetCode: "df[(df['HP'] >= 100) & (df['Defense'] >= 100)]",
    spec: {
      kind: "multi_filter",
      conditions: [c("HP", ">=", 100), c("Defense", ">=", 100)],
    },
  },
  {
    id: "h2-gen5-cols",
    title: "5세대 핵심 정보!",
    description: "세대(Generation)가 5인 포켓몬의 이름(Name), 1타입(Type 1), HP만 가져오세요.",
    hint: "df.loc[df['Generation'] == 5, ['Name', 'Type 1', 'HP']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Generation'] == 5, ['Name', 'Type 1', 'HP']]",
    spec: {
      kind: "filter_select",
      condition: c("Generation", "==", 5),
      columns: ["Name", "Type 1", "HP"],
    },
  },
  {
    id: "h2-iloc-range",
    title: "중간 구간 포켓몬!",
    description: "iloc로 6번째~15번째 행(인덱스 5:15)의 이름(Name)과 HP만 가져오세요.",
    hint: "df.iloc[5:15][['Name', 'HP']] 또는 df.iloc[5:15, [1, 4]] — iloc는 열을 숫자 인덱스로 지정합니다",
    difficulty: "어려움",
    targetCode: "df.iloc[5:15][['Name', 'HP']]",
    spec: {
      kind: "iloc_rows",
      rowStart: 5,
      rowEnd: 15,
      columns: ["Name", "HP"],
    },
  },
  {
    id: "h2-electric-stats",
    title: "전기 타입 전투력!",
    description: "1타입이 '전기'인 포켓몬의 이름(Name), 공격(Attack), 스피드(Speed)만 가져오세요.",
    hint: "df.loc[df['Type 1'] == '전기', ['Name', 'Attack', 'Speed']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '전기', ['Name', 'Attack', 'Speed']]",
    spec: {
      kind: "filter_select",
      condition: c("Type 1", "==", "전기"),
      columns: ["Name", "Attack", "Speed"],
    },
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildSessionMissions(): Mission[] {
  const pick = <T,>(pool: T[], n: number) => shuffleArray(pool).slice(0, n);
  return [
    ...pick(MISSION_EASY, 3),
    ...pick(MISSION_NORMAL, 3),
    ...pick(MISSION_HARD, 2),
  ];
}

export const ALL_MISSION_POOLS = [...MISSION_EASY, ...MISSION_NORMAL, ...MISSION_HARD];

export const DIFFICULTY_COLOR: Record<string, string> = {
  "쉬움": "text-green-600 bg-green-100",
  "보통": "text-yellow-600 bg-yellow-100",
  "어려움": "text-red-600 bg-red-100",
};

export type { MissionSpec, Condition } from "@/lib/pandas/types";
