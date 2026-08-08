export type StatKey = "aclik" | "kut" | "asker" | "halk";

export interface Choice {
  text: string;
  effects: Partial<Record<StatKey, number>>;
  nextCardId?: string;
  setFlags?: Record<string, boolean>;
}

export type Condition =
  | {
      type: "stat";
      stat: StatKey;
      operator: ">" | "<" | ">=" | "<=" | "==";
      value: number;
    }
  | { type: "flag"; flag: string; value: boolean };

export interface DelayedTrigger {
  afterTurns: number;
  flag: string;
}

export interface Card {
  id: string;
  characterName: string;
  text: string;
  left: Choice;
  right: Choice;
  image?: any;
  conditions?: Condition[];
  delayedTrigger?: DelayedTrigger;
}

export type GameStatus = "playing" | "dead" | "survived";

export type DeathDirection = "min" | "max";

export interface GameResult {
  status: GameStatus;
  stats: Record<StatKey, number>;
  deathReason?: StatKey;
  deathDirection?: DeathDirection;
}
