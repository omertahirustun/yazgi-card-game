import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameStatus, StatKey, Card } from "../game/engine/types";
import {
  getInitialStats,
  processChoice,
  pickNextCard,
  getFirstCard,
} from "../game/engine/gameEngine";
import { cards as allCards } from "../game/data/cards";

interface GameState {
  currentCardId: string | null;
  stats: Record<StatKey, number>;
  gameStatus: GameStatus;
  deathReason?: StatKey;
  cards: Card[];
  cardsPlayedCount: number;
  playedCardIds: Set<string>;

  startRun: () => void;
  makeChoice: (direction: "left" | "right") => void;
  restart: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentCardId: null,
      stats: getInitialStats(),
      gameStatus: "playing" as GameStatus,
      deathReason: undefined,
      cards: allCards,
      cardsPlayedCount: 0,
      playedCardIds: new Set<string>(),

      startRun: () => {
        const { cards } = get();
        const firstCard = getFirstCard(cards, getInitialStats());
        set({
          currentCardId: firstCard?.id ?? null,
          stats: getInitialStats(),
          gameStatus: firstCard ? "playing" : "survived",
          deathReason: undefined,
          cardsPlayedCount: 0,
          playedCardIds: new Set(),
        });
      },

      makeChoice: (direction: "left" | "right") => {
        const state = get();
        if (state.gameStatus !== "playing") return;
        if (!state.currentCardId) return;

        const currentCard = state.cards.find(
          (c) => c.id === state.currentCardId
        );
        if (!currentCard) return;

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

        const newPlayed = new Set(state.playedCardIds);
        newPlayed.add(currentCard.id);

        const nextCard = pickNextCard(
          state.cards,
          currentCard,
          direction,
          newPlayed,
          newStats
        );

        set({
          currentCardId: nextCard?.id ?? null,
          stats: newStats,
          gameStatus: nextCard ? "playing" : "survived",
          cardsPlayedCount: state.cardsPlayedCount + 1,
          playedCardIds: newPlayed,
        });
      },

      restart: () => {
        const { cards } = get();
        const firstCard = getFirstCard(cards, getInitialStats());
        set({
          currentCardId: firstCard?.id ?? null,
          stats: getInitialStats(),
          gameStatus: firstCard ? "playing" : "survived",
          deathReason: undefined,
          cardsPlayedCount: 0,
          playedCardIds: new Set(),
        });
      },
    }),
    {
      name: "yazgi-game-save",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentCardId: state.currentCardId,
        stats: state.stats,
        gameStatus: state.gameStatus,
        deathReason: state.deathReason,
        cardsPlayedCount: state.cardsPlayedCount,
        playedCardIds: Array.from(state.playedCardIds),
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<GameState> & {
          playedCardIds?: string[];
        };
        return {
          ...current,
          ...p,
          playedCardIds: new Set(p.playedCardIds ?? []),
        };
      },
    }
  )
);
