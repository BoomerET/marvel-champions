// Track builds: 0001

import { create } from "zustand";
import type { GameState } from "../game/types";
import { createNewGame } from "../game/createGame";

interface GameStore extends GameState {
  drawCards: (count: number) => void;
  playCard: (instanceId: string) => void;
  endTurn: () => void;
  pushLog: (message: string) => void;
  flipIdentity: () => void;
  damageHero: (amount: number) => void;
  damageVillain: (amount: number) => void;
  healHero: (amount: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  ...createNewGame(),

  drawCards: (count) =>
    set((state) => {
      const drawnCards = state.hero.deck.slice(0, count);
      const remainingDeck = state.hero.deck.slice(count);

      return {
        hero: {
          ...state.hero,
          deck: remainingDeck,
          hand: [...state.hero.hand, ...drawnCards],
        },
        log: [...state.log, `Drew ${drawnCards.length} card(s).`],
      };
    }),

  playCard: (instanceId) =>
    set((state) => {
      const card = state.hero.hand.find((c) => c.instanceId === instanceId);

      if (!card) {
        return state;
      }

      const newHand = state.hero.hand.filter(
        (c) => c.instanceId !== instanceId
      );

      const goesToDiscard =
        card.type === "event" || card.type === "resource";

      return {
        hero: {
          ...state.hero,
          hand: newHand,
          discard: goesToDiscard
            ? [...state.hero.discard, card]
            : state.hero.discard,
          playArea: goesToDiscard
            ? state.hero.playArea
            : [...state.hero.playArea, card],
        },
        log: [
          ...state.log,
          goesToDiscard
            ? `Played ${card.name} and discarded it.`
            : `Played ${card.name}.`,
        ],
      };
    }),

  endTurn: () =>
    set((state) => ({
      phase: state.phase === "player" ? "villain" : "player",
      round: state.phase === "villain" ? state.round + 1 : state.round,
      log: [...state.log, "Ended turn."],
    })),

  pushLog: (message) =>
    set((state) => ({
      log: [...state.log, message],
    })),

  flipIdentity: () =>
    set((state) => ({
      hero: {
        ...state.hero,
        form:
          state.hero.form === "hero"
            ? "alterEgo"
            : "hero",
      },
      log: [
        ...state.log,
        `Flipped to ${state.hero.form === "hero"
          ? "Alter-Ego"
          : "Hero"
        }.`,
      ],
    })),
  damageHero: (amount) =>
    set((state) => ({
      hero: {
        ...state.hero,
        hitPoints: Math.max(0, state.hero.hitPoints - amount),
      },
      log: [...state.log, `Hero took ${amount} damage.`],
    })),

  healHero: (amount) =>
    set((state) => ({
      hero: {
        ...state.hero,
        hitPoints: state.hero.hitPoints + amount,
      },
      log: [...state.log, `Hero healed ${amount} damage.`],
    })),

  damageVillain: (amount) =>
    set((state) => ({
      villain: {
        ...state.villain,
        hitPoints: Math.max(0, state.villain.hitPoints - amount),
      },
      log: [...state.log, `Villain took ${amount} damage.`],
    })),
}));

