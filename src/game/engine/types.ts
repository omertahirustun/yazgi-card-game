export type StatKey = "aclik" | "kut" | "asker" | "halk";

export interface Choice {
  text: string;
  effects: Partial<Record<StatKey, number>>;
  nextCardId?: string;
}

export interface Condition {
  stat: StatKey;
  operator: ">" | "<" | ">=" | "<=" | "==";
  value: number;
}

export interface Card {
  id: string;
  characterName: string;
  text: string;
  left: Choice;
  right: Choice;
  image?: any;
  conditions?: Condition[];
}

export type GameStatus = "playing" | "dead" | "survived";

export interface GameResult {
  status: GameStatus;
  stats: Record<StatKey, number>;
  deathReason?: StatKey;
}
