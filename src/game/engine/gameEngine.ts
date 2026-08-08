import {
  Card,
  Condition,
  DelayedTrigger,
  GameResult,
  GameStatus,
  StatKey,
} from "./types";

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

function applyFlags(
  flags: Record<string, boolean>,
  setFlags?: Record<string, boolean>
): Record<string, boolean> {
  if (!setFlags) return flags;
  return { ...flags, ...setFlags };
}

function checkDeath(
  stats: Record<StatKey, number>
): {
  isDead: boolean;
  reason?: StatKey;
  direction?: "min" | "max";
} {
  for (const key of Object.keys(stats) as StatKey[]) {
    if (stats[key] >= STAT_MAX) {
      return { isDead: true, reason: key, direction: "max" };
    }
    if (stats[key] <= STAT_MIN) {
      return { isDead: true, reason: key, direction: "min" };
    }
  }
  return { isDead: false };
}

export function getInitialStats(): Record<StatKey, number> {
  return { ...INITIAL_STATS };
}

export function getInitialFlags(): Record<string, boolean> {
  return {};
}

export interface ProcessedChoice {
  stats: Record<StatKey, number>;
  flags: Record<string, boolean>;
  result: GameResult;
}

export function processChoice(
  currentStats: Record<StatKey, number>,
  currentFlags: Record<string, boolean>,
  card: Card,
  direction: "left" | "right"
): ProcessedChoice {
  const choice = direction === "left" ? card.left : card.right;
  const newStats = applyEffects(currentStats, choice.effects);
  const newFlags = applyFlags(currentFlags, choice.setFlags);
  const deathCheck = checkDeath(newStats);

  let status: GameStatus = "playing";
  let deathReason: StatKey | undefined;
  let deathDirection: "min" | "max" | undefined;

  if (deathCheck.isDead) {
    status = "dead";
    deathReason = deathCheck.reason;
    deathDirection = deathCheck.direction;
  }

  return {
    stats: newStats,
    flags: newFlags,
    result: { status, stats: newStats, deathReason, deathDirection },
  };
}

export function checkGameEnd(
  stats: Record<StatKey, number>,
  currentCardIndex: number,
  totalCards: number
): GameResult {
  const deathCheck = checkDeath(stats);

  if (deathCheck.isDead) {
    return {
      status: "dead",
      stats,
      deathReason: deathCheck.reason,
      deathDirection: deathCheck.direction,
    };
  }

  if (currentCardIndex >= totalCards) {
    return { status: "survived", stats };
  }

  return { status: "playing", stats };
}

export function evaluateConditions(
  conditions: Condition[],
  stats: Record<StatKey, number>,
  flags: Record<string, boolean>
): boolean {
  return conditions.every((c) => {
    if (c.type === "flag") {
      return (flags[c.flag] ?? false) === c.value;
    }

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

function isDelayedTriggerReady(
  trigger: DelayedTrigger | undefined,
  flags: Record<string, boolean>,
  flagSetAt: Record<string, number>,
  turn: number
): boolean {
  if (!trigger) return true;

  const setTurn = flagSetAt[trigger.flag];
  if (setTurn === undefined) return false;
  return turn - setTurn >= trigger.afterTurns;
}

export function isCardAvailable(
  card: Card,
  stats: Record<StatKey, number>,
  flags: Record<string, boolean>,
  flagSetAt: Record<string, number>,
  turn: number
): boolean {
  if (card.conditions && !evaluateConditions(card.conditions, stats, flags)) {
    return false;
  }
  return isDelayedTriggerReady(card.delayedTrigger, flags, flagSetAt, turn);
}

export function getFirstCard(
  pool: Card[],
  stats: Record<StatKey, number>,
  flags: Record<string, boolean>,
  flagSetAt: Record<string, number>
): Card | null {
  const available = pool.filter((c) =>
    isCardAvailable(c, stats, flags, flagSetAt, 1)
  );
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

export function pickNextCard(
  pool: Card[],
  currentCard: Card,
  direction: "left" | "right",
  playedCardIds: Set<string>,
  stats: Record<StatKey, number>,
  flags: Record<string, boolean>,
  flagSetAt: Record<string, number>,
  turn: number
): Card | null {
  const choice = direction === "left" ? currentCard.left : currentCard.right;
  if (choice.nextCardId) {
    const forced = pool.find((c) => c.id === choice.nextCardId);
    if (forced) return forced;
  }

  const available = pool.filter((c) => {
    if (playedCardIds.has(c.id)) return false;
    return isCardAvailable(c, stats, flags, flagSetAt, turn);
  });

  if (available.length === 0) return null;

  const readyTriggers = available.filter(
    (c) =>
      c.delayedTrigger &&
      isDelayedTriggerReady(c.delayedTrigger, flags, flagSetAt, turn)
  );

  const candidates = readyTriggers.length > 0 ? readyTriggers : available;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
