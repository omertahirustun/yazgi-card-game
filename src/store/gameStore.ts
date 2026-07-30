import { create } from "zustand";
import { GameStatus, StatKey, Card } from "../game/engine/types";
import {
  getInitialStats,
  processChoice,
  checkGameEnd,
} from "../game/engine/gameEngine";
import { cards as allCards } from "../game/data/cards";

interface GameState {
  currentCardIndex: number;
  stats: Record<StatKey, number>;
  gameStatus: GameStatus;
  deathReason?: StatKey;
  cards: Card[];

  makeChoice: (direction: "left" | "right") => void;
  restart: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentCardIndex: 0,
  stats: getInitialStats(),
  gameStatus: "playing",
  deathReason: undefined,
  cards: allCards,

  makeChoice: (direction: "left" | "right") => {
    const state = get();
    if (state.gameStatus !== "playing") return;

    const currentCard = state.cards[state.currentCardIndex];
    if (!currentCard) {
      set({ gameStatus: "survived" });
      return;
    }

    const { stats: newStats, result } = processChoice(
      state.stats,
      currentCard,
      direction
    );

    if (result.status === "dead") {
      set({
        stats: newStats,
        gameStatus: "dead",
        deathReason: result.deathReason,
      });
      return;
    }

    const nextIndex = state.currentCardIndex + 1;
    const endResult = checkGameEnd(newStats, nextIndex, state.cards.length);

    set({
      currentCardIndex: nextIndex,
      stats: newStats,
      gameStatus: endResult.status,
      deathReason: endResult.deathReason,
    });
  },

  restart: () => {
    set({
      currentCardIndex: 0,
      stats: getInitialStats(),
      gameStatus: "playing",
      deathReason: undefined,
    });
  },
}));
