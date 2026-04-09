export interface Mission {
  /** 풀 내 고유 ID (세션에서 중복 없이 뽑힘) */
  id: string;
  title: string;
  description: string;
  hint: string;
  difficulty: "쉬움" | "보통" | "어려움";
  targetCode: string;
  validateFn: string;
}

/** 쉬움 풀 (4~5개) — missionData.ts 값(타입명 등)과 동일한 한글 사용 */
export const MISSION_EASY: Mission[] = [
  {
    id: "e-name",
    title: "포켓몬 이름만 골라라!",
    description: "데이터프레임에서 'Name' 열만 선택하세요.",
    hint: "df['열이름'] 형식을 사용해보세요!",
    difficulty: "쉬움",
    targetCode: "df['Name']",
    validateFn: "single_column:Name",
  },
  {
    id: "e-fire",
    title: "불 속성 포켓몬을 찾아라!",
    description: "1타입이 '불꽃'인 포켓몬만 필터링하세요.",
    hint: "df[df['Type 1'] == '불꽃'] 형식을 사용해보세요!",
    difficulty: "쉬움",
    targetCode: "df[df['Type 1'] == '불꽃']",
    validateFn: "boolean_filter:Type 1:불꽃",
  },
  {
    id: "e-attack",
    title: "강력한 포켓몬을 찾아라!",
    description: "공격(Attack)이 100 이상인 포켓몬만 필터링하세요.",
    hint: "df[df['Attack'] >= 숫자] 형식을 사용해보세요!",
    difficulty: "쉬움",
    targetCode: "df[df['Attack'] >= 100]",
    validateFn: "numeric_filter:Attack:>=:100",
  },
  {
    id: "e-electric",
    title: "전기 타입을 찾아라!",
    description: "1타입이 '전기'인 포켓몬만 필터링하세요.",
    hint: "df[df['Type 1'] == '전기']",
    difficulty: "쉬움",
    targetCode: "df[df['Type 1'] == '전기']",
    validateFn: "boolean_filter:Type 1:전기",
  },
  {
    id: "e-speed",
    title: "스피드가 빠른 포켓몬!",
    description: "스피드(Speed)가 100 초과인 포켓몬만 필터링하세요.",
    hint: "df[df['Speed'] > 100]",
    difficulty: "쉬움",
    targetCode: "df[df['Speed'] > 100]",
    validateFn: "numeric_filter:Speed:>:100",
  },
];

/** 보통 풀 (4~5개) */
export const MISSION_NORMAL: Mission[] = [
  {
    id: "n-cols",
    title: "이름과 타입만 보여줘!",
    description: "이름(Name), 1타입(Type 1), HP 열만 선택하세요.",
    hint: "df[['열1', '열2', '열3']] 형식으로 여러 열을 선택하세요!",
    difficulty: "보통",
    targetCode: "df[['Name', 'Type 1', 'HP']]",
    validateFn: "multi_column:Name,Type 1,HP",
  },
  {
    id: "n-legend",
    title: "전설의 포켓몬을 찾아라!",
    description: "전설(Legendary)이 True인 포켓몬만 찾으세요. (df.loc 생략 가능)",
    hint: "df.loc[df['Legendary'] == True] 또는 df[df['Legendary'] == True]",
    difficulty: "보통",
    targetCode: "df.loc[df['Legendary'] == True]",
    validateFn: "loc_boolean:Legendary:True",
  },
  {
    id: "n-iloc5",
    title: "처음 5마리만 보여줘!",
    description: "df.iloc로 상위 5개 행만 가져오세요. (0:5, :5 모두 가능)",
    hint: "df.iloc[0:5] 또는 df.iloc[:5]",
    difficulty: "보통",
    targetCode: "df.iloc[0:5]",
    validateFn: "iloc_slice:0:5",
  },
  {
    id: "n-gen",
    title: "5세대 포켓몬!",
    description: "세대(Generation)가 5인 포켓몬만 필터링하세요.",
    hint: "df[df['Generation'] == 5]",
    difficulty: "보통",
    targetCode: "df[df['Generation'] == 5]",
    validateFn: "numeric_filter:Generation:==:5",
  },
  {
    id: "n-defense",
    title: "방어력이 높은 포켓몬!",
    description: "방어(Defense)가 100 이상인 포켓몬만 필터링하세요.",
    hint: "df[df['Defense'] >= 100]",
    difficulty: "보통",
    targetCode: "df[df['Defense'] >= 100]",
    validateFn: "numeric_filter:Defense:>=:100",
  },
];

/** 어려움 풀 (4~5개) */
export const MISSION_HARD: Mission[] = [
  {
    id: "h-water",
    title: "물 속성 포켓몬의 이름과 HP!",
    description: "1타입이 '물'인 포켓몬의 이름(Name)과 HP만 가져오세요. (loc 생략 시 체인 인덱싱)",
    hint: "df.loc[조건, ['열1','열2']] 또는 df[조건][['열1','열2']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '물', ['Name', 'HP']]",
    validateFn: "loc_filter_cols|Type 1|물|Name,HP",
  },
  {
    id: "h-hp-atk",
    title: "체력이 높은 강한 포켓몬!",
    description: "HP가 90 초과이고 공격(Attack)이 100 초과인 포켓몬을 찾으세요.",
    hint: "df[(조건1) & (조건2)]",
    difficulty: "어려움",
    targetCode: "df[(df['HP'] > 90) & (df['Attack'] > 100)]",
    validateFn: "multi_condition:HP:>:90:Attack:>:100",
  },
  {
    id: "h-grass-cols",
    title: "풀 타입의 핵심 스탯!",
    description: "1타입이 '풀'인 포켓몬의 이름(Name), 공격(Attack), 스피드(Speed)만 가져오세요.",
    hint: "loc 또는 체인 인덱싱",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '풀', ['Name', 'Attack', 'Speed']]",
    validateFn: "loc_filter_cols|Type 1|풀|Name,Attack,Speed",
  },
  {
    id: "h-psychic",
    title: "에스퍼 타입 스펙!",
    description: "1타입이 '에스퍼'인 포켓몬의 이름(Name)과 특수공격(Sp. Atk)만 가져오세요.",
    hint: "열 이름에 공백이 있으면 그대로 따옴표에 넣으세요.",
    difficulty: "어려움",
    targetCode: "df.loc[df['Type 1'] == '에스퍼', ['Name', 'Sp. Atk']]",
    validateFn: "loc_filter_cols|Type 1|에스퍼|Name,Sp. Atk",
  },
  {
    id: "h-legend-stats",
    title: "전설의 공격과 방어!",
    description: "전설(Legendary)이 True인 포켓몬의 이름(Name), 공격(Attack), 방어(Defense)만 가져오세요.",
    hint: "df[df['Legendary'] == True][['Name', 'Attack', 'Defense']]",
    difficulty: "어려움",
    targetCode: "df.loc[df['Legendary'] == True, ['Name', 'Attack', 'Defense']]",
    validateFn: "loc_filter_cols|Legendary|True|Name,Attack,Defense",
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

/**
 * 한 세션에서 풀리는 미션: 쉬움 3 + 보통 3 + 어려움 2 = 총 8문제 (각 난이도에서 랜덤)
 */
export function buildSessionMissions(): Mission[] {
  const pick = <T,>(pool: T[], n: number) => shuffleArray(pool).slice(0, n);
  return [
    ...pick(MISSION_EASY, 3),
    ...pick(MISSION_NORMAL, 3),
    ...pick(MISSION_HARD, 2),
  ];
}

/** 하위 호환·문서용: 전체 풀 합친 목록 */
export const ALL_MISSION_POOLS = [...MISSION_EASY, ...MISSION_NORMAL, ...MISSION_HARD];

export const DIFFICULTY_COLOR: Record<string, string> = {
  "쉬움": "text-green-600 bg-green-100",
  "보통": "text-yellow-600 bg-yellow-100",
  "어려움": "text-red-600 bg-red-100",
};
