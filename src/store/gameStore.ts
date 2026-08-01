import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameStatus, StatKey, Card } from "../game/engine/types";
import {
  getInitialStats,
  getInitialFlags,
  processChoice,
  pickNextCard,
  getFirstCard,
} from "../game/engine/gameEngine";
import { cards as allCards } from "../game/data/cards";

interface GameState {
  currentCardId: string | null;
  stats: Record<StatKey, number>;
  flags: Record<string, boolean>;
  flagSetAt: Record<string, number>;
  gameStatus: GameStatus;
  deathReason?: StatKey;
  cards: Card[];
  cardsPlayedCount: number;
  playedCardIds: Set<string>;
  musicMuted: boolean;

  startRun: () => void;
  makeChoice: (direction: "left" | "right") => void;
  restart: () => void;
  toggleMusic: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentCardId: null,
      stats: getInitialStats(),
      flags: getInitialFlags(),
      flagSetAt: {},
      gameStatus: "playing" as GameStatus,
      deathReason: undefined,
      cards: allCards,
      cardsPlayedCount: 0,
      playedCardIds: new Set<string>(),
      musicMuted: false,

      startRun: () => {
        const { cards } = get();
        const firstCard = getFirstCard(cards, getInitialStats(), {}, {});
        set({
          currentCardId: firstCard?.id ?? null,
          stats: getInitialStats(),
          flags: getInitialFlags(),
          flagSetAt: {},
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

        const { stats: newStats, flags: newFlags, result } = processChoice(
          state.stats,
          state.flags,
          currentCard,
          direction
        );

        if (result.status === "dead") {
          set({
            stats: newStats,
            flags: newFlags,
            gameStatus: "dead",
            deathReason: result.deathReason,
          });
          return;
        }

        const newTurn = state.cardsPlayedCount + 1;
        const flagSetAt = { ...state.flagSetAt };
        for (const [flag, value] of Object.entries(newFlags)) {
          if (state.flags[flag] !== value) {
            flagSetAt[flag] = newTurn;
          }
        }

        const newPlayed = new Set(state.playedCardIds);
        newPlayed.add(currentCard.id);

        const nextCard = pickNextCard(
          state.cards,
          currentCard,
          direction,
          newPlayed,
          newStats,
          newFlags,
          flagSetAt,
          newTurn
        );

        set({
          currentCardId: nextCard?.id ?? null,
          stats: newStats,
          flags: newFlags,
          flagSetAt,
          gameStatus: nextCard ? "playing" : "survived",
          cardsPlayedCount: newTurn,
          playedCardIds: newPlayed,
        });
      },

      restart: () => {
        const { cards } = get();
        const firstCard = getFirstCard(cards, getInitialStats(), {}, {});
        set({
          currentCardId: firstCard?.id ?? null,
          stats: getInitialStats(),
          flags: getInitialFlags(),
          flagSetAt: {},
          gameStatus: firstCard ? "playing" : "survived",
          deathReason: undefined,
          cardsPlayedCount: 0,
          playedCardIds: new Set(),
        });
      },

      toggleMusic: () => {
        set((state) => ({ musicMuted: !state.musicMuted }));
      },
    }),
    {
      name: "yazgi-game-save",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentCardId: state.currentCardId,
        stats: state.stats,
        flags: state.flags,
        flagSetAt: state.flagSetAt,
        gameStatus: state.gameStatus,
        deathReason: state.deathReason,
        cardsPlayedCount: state.cardsPlayedCount,
        playedCardIds: Array.from(state.playedCardIds),
        musicMuted: state.musicMuted,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<GameState> & {
          playedCardIds?: string[];
        };
        return {
          ...current,
          ...p,
          playedCardIds: new Set(p.playedCardIds ?? []),
          flags: p.flags ?? {},
          flagSetAt: p.flagSetAt ?? {},
        };
      },
    }
  )
);
