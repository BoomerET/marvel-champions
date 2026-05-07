// Track builds: 0004

import { create } from "zustand";
import type { GameState } from "../game/types";
import { createNewGame } from "../game/createGame";
import { shuffle } from "../utils/shuffle";
import { dispatchGameEvent } from "../game/dispatch";

interface GameStore extends GameState {
  drawCards: (count: number) => void;
  playCard: (instanceId: string) => void;
  endTurn: () => void;
  pushLog: (message: string) => void;
  flipIdentity: () => void;
  damageHero: (amount: number) => void;
  damageVillain: (amount: number) => void;
  healHero: (amount: number) => void;
  addThreat: (amount: number) => void;
  removeThreat: (amount: number) => void;
  toggleExhausted: (instanceId: string) => void;
  readyAllHeroCards: () => void;
  basicAttack: () => void;
  basicThwart: () => void;
  basicRecover: () => void;
  villainAttack: () => void;
  villainScheme: () => void;
  dealEncounterCard: () => void;
  resolveEncounterCard: (instanceId: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  ...createNewGame(),

  villainAttack: () =>
    set((state) => ({
      hero: {
        ...state.hero,
        hitPoints: Math.max(
          0,
          state.hero.hitPoints - 2
        ),
      },

      log: [
        ...state.log,
        "Rhino attacked for 2 damage.",
      ],
    })),

  villainScheme: () =>
    set((state) => ({
      villain: {
        ...state.villain,
        threat: state.villain.threat + 2,
      },

      log: [
        ...state.log,
        "Rhino schemed for 2 threat.",
      ],
    })),

  drawCards: (count) =>
    set((state) => {
      let deck = [...state.hero.deck];
      let discard = [...state.hero.discard];
      const hand = [...state.hero.hand];
      const log = [...state.log];

      for (let i = 0; i < count; i += 1) {
        if (deck.length === 0 && discard.length > 0) {
          deck = shuffle(discard);
          discard = [];
          log.push("Shuffled discard pile into deck.");
        }

        const drawnCard = deck.shift();

        if (!drawnCard) {
          log.push("Tried to draw, but deck and discard were empty.");
          break;
        }

        hand.push(drawnCard);
      }

      return {
        hero: {
          ...state.hero,
          deck,
          discard,
          hand,
        },
        log,
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
    set((state) => {
      let nextPhase: typeof state.phase;
      let nextRound = state.round;

      if (state.phase === "player") {
        nextPhase = "villain";
        if (state.hero.form === "hero") {
          // attack
        } else {
          // scheme
        }
      } else if (state.phase === "villain") {
        nextPhase = "encounter";
      } else {
        nextPhase = "player";
        nextRound += 1;
      }

      return {
        phase: nextPhase,
        round: nextRound,

        log: [
          ...state.log,
          `Phase advanced to ${nextPhase}.`,
        ],
      };
    }),

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

  addThreat: (amount) =>
    set((state) => ({
      villain: {
        ...state.villain,
        threat: state.villain.threat + amount,
      },
      log: [...state.log, `Added ${amount} threat.`],
    })),

  removeThreat: (amount) =>
    set((state) => ({
      villain: {
        ...state.villain,
        threat: Math.max(0, state.villain.threat - amount),
      },
      log: [...state.log, `Removed ${amount} threat.`],
    })),

  toggleExhausted: (instanceId) =>
    set((state) => ({
      hero: {
        ...state.hero,
        playArea: state.hero.playArea.map((card) =>
          card.instanceId === instanceId
            ? { ...card, exhausted: !card.exhausted }
            : card
        ),
        identity:
          state.hero.identity.instanceId === instanceId
            ? {
              ...state.hero.identity,
              exhausted: !state.hero.identity.exhausted,
            }
            : state.hero.identity,
      },
    })),

  readyAllHeroCards: () =>
    set((state) => ({
      hero: {
        ...state.hero,
        identity: {
          ...state.hero.identity,
          exhausted: false,
        },
        playArea: state.hero.playArea.map((card) => ({
          ...card,
          exhausted: false,
        })),
      },
      log: [...state.log, "Readied all hero cards."],
    })),

  basicAttack: () =>
    set((state) => {
      if (state.hero.identity.exhausted) {
        return state;
      }

      const amount = state.hero.identity.attack ?? 0;

      dispatchGameEvent({
        type: "BASIC_ATTACK",
        amount,
      });

      dispatchGameEvent({
        type: "DAMAGE_DEALT",
        target: "villain",
        amount,
      });

      return {
        hero: {
          ...state.hero,
          identity: {
            ...state.hero.identity,
            exhausted: true,
          },
        },

        villain: {
          ...state.villain,
          hitPoints: Math.max(
            0,
            state.villain.hitPoints - amount
          ),
        },

        log: [
          ...state.log,
          `Hero attacked for ${amount}.`,
        ],
      };
    }),

  basicThwart: () =>
    set((state) => {
      if (state.hero.identity.exhausted) {
        return state;
      }

      const amount =
        state.hero.identity.thwart ?? 0;

      return {
        hero: {
          ...state.hero,
          identity: {
            ...state.hero.identity,
            exhausted: true,
          },
        },

        villain: {
          ...state.villain,
          threat: Math.max(
            0,
            state.villain.threat - amount
          ),
        },

        log: [
          ...state.log,
          `Hero thwarted for ${amount}.`,
        ],
      };
    }),

  basicRecover: () =>
    set((state) => {
      if (
        state.hero.identity.exhausted ||
        state.hero.form !== "alterEgo"
      ) {
        return state;
      }

      const amount =
        state.hero.identity.recover ?? 0;

      return {
        hero: {
          ...state.hero,
          identity: {
            ...state.hero.identity,
            exhausted: true,
          },

          hitPoints:
            state.hero.hitPoints + amount,
        },

        log: [
          ...state.log,
          `Hero recovered ${amount} HP.`,
        ],
      };
    }),

  dealEncounterCard: () =>
    set((state) => {
      const [card, ...remainingDeck] = state.encounterDeck;

      if (!card) {
        return {
          log: [
            ...state.log,
            "Tried to deal an encounter card, but the encounter deck is empty.",
          ],
        };
      }

      return {
        encounterDeck: remainingDeck,
        encounterArea: [...state.encounterArea, card],
        log: [
          ...state.log,
          `Dealt encounter card: ${card.name}.`,
        ],
      };
    }),

  resolveEncounterCard: (instanceId) =>
    set((state) => {
      const card = state.encounterArea.find(
        (c) => c.instanceId === instanceId
      );

      if (!card) {
        return state;
      }

      return {
        encounterArea: state.encounterArea.filter(
          (c) => c.instanceId !== instanceId
        ),
        encounterDiscard: [...state.encounterDiscard, card],
        log: [
          ...state.log,
          `Resolved encounter card: ${card.name}.`,
        ],
      };
    }),
}));

