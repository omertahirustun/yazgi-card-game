import { Card, Condition, GameResult, GameStatus, StatKey } from "./types";

const STAT_MIN = 0;
const STAT_MAX = 100;
const INITIAL_STATS: Record<StatKey, number> = {
  aclik: 50,
  kut: 50,
  asker: 50,
  halk: 50,
};

function clamp(value: number): number {
  return Math.min(STAT_MAX, Math.max(STAT_MIN, value));
}

function applyEffects(
  stats: Record<StatKey, number>,
  effects: Partial<Record<StatKey, number>>
): Record<StatKey, number> {
  const newStats = { ...stats };
  for (const [key, delta] of Object.entries(effects)) {
    if (delta !== undefined) {
      newStats[key as StatKey] = clamp(newStats[key as StatKey] + delta);
    }
  }
  return newStats;
}

function checkDeath(
  stats: Record<StatKey, number>
): { isDead: boolean; reason?: StatKey } {
  for (const key of Object.keys(stats) as StatKey[]) {
    if (stats[key] <= STAT_MIN || stats[key] >= STAT_MAX) {
      return { isDead: true, reason: key };
    }
  }
  return { isDead: false };
}

export function getInitialStats(): Record<StatKey, number> {
  return { ...INITIAL_STATS };
}

export interface ProcessedChoice {
  stats: Record<StatKey, number>;
  result: GameResult;
}

export function processChoice(
  currentStats: Record<StatKey, number>,
  card: Card,
  direction: "left" | "right"
): ProcessedChoice {
  const choice = direction === "left" ? card.left : card.right;
  const newStats = applyEffects(currentStats, choice.effects);
  const deathCheck = checkDeath(newStats);

  let status: GameStatus = "playing";
  let deathReason: StatKey | undefined;

  if (deathCheck.isDead) {
    status = "dead";
    deathReason = deathCheck.reason;
  }

  return {
    stats: newStats,
    result: { status, stats: newStats, deathReason },
  };
}

export function checkGameEnd(
  stats: Record<StatKey, number>,
  currentCardIndex: number,
  totalCards: number
): GameResult {
  const deathCheck = checkDeath(stats);

  if (deathCheck.isDead) {
    return { status: "dead", stats, deathReason: deathCheck.reason };
  }

  if (currentCardIndex >= totalCards) {
    return { status: "survived", stats };
  }

  return { status: "playing", stats };
}

export function evaluateConditions(
  conditions: Condition[],
  stats: Record<StatKey, number>
): boolean {
  return conditions.every((c) => {
    const current = stats[c.stat];
    switch (c.operator) {
      case "<":
        return current < c.value;
      case ">":
        return current > c.value;
      case "<=":
        return current <= c.value;
      case ">=":
        return current >= c.value;
      case "==":
        return current === c.value;
    }
  });
}

export function getFirstCard(
  pool: Card[],
  stats: Record<StatKey, number>
): Card | null {
  const available = pool.filter((c) => {
    if (!c.conditions) return true;
    return evaluateConditions(c.conditions, stats);
  });
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

export function pickNextCard(
  pool: Card[],
  currentCard: Card,
  direction: "left" | "right",
  playedCardIds: Set<string>,
  stats: Record<StatKey, number>
): Card | null {
  const choice = direction === "left" ? currentCard.left : currentCard.right;
  if (choice.nextCardId) {
    const forced = pool.find((c) => c.id === choice.nextCardId);
    if (forced) return forced;
  }

  const available = pool.filter((c) => {
    if (playedCardIds.has(c.id)) return false;
    if (!c.conditions) return true;
    return evaluateConditions(c.conditions, stats);
  });

  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
