export type Difficulty = "쉬움" | "보통" | "어려움";

const BASE_SCORES: Record<Difficulty, number> = {
  쉬움: 20,
  보통: 30,
  어려움: 50,
};

const PENALTY_PER_WRONG = 5;

export function getBaseScore(difficulty: Difficulty): number {
  return BASE_SCORES[difficulty];
}

export function calculateEarnedScore(difficulty: Difficulty, wrongAttempts: number): number {
  const base = getBaseScore(difficulty);
  const penalty = wrongAttempts * PENALTY_PER_WRONG;
  return Math.max(0, base - penalty);
}
