// Track builds: 0005

import { create } from "zustand";
import { shuffle } from "../utils/shuffle";
import type { GameState } from "../game/types";
import type { GameEvent } from "../game/events";
import { createNewGame } from "../game/createGame";
import { dispatchGameEvent } from "../game/dispatch";
import { resolveVillainActivation } from "../game/rules/villainActivation";

export function appendEvents(
  existingEvents: GameState["eventHistory"],
  events: GameState["eventHistory"]
) {
  events.forEach(dispatchGameEvent);

  return [...existingEvents, ...events];
}

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
  recordEvent: (event: GameEvent) => void;
  toggleHeroStunned: () => void;
  toggleHeroConfused: () => void;
  toggleHeroTough: () => void;
}

export const useGameStore = create<GameStore>((set) => ({

  ...createNewGame(),

  villainAttack: () =>
    set((state) => {
      const amount = 2;

      const attackEvent = {
        type: "VILLAIN_ATTACK" as const,
        amount,
      };

      const damageEvent = {
        type: "DAMAGE_DEALT" as const,
        target: "hero" as const,
        amount,
      };

      const shouldTriggerSpiderSense =
        state.hero.identity.name === "Spider-Man" &&
        state.hero.form === "hero";

      const drawnCards = shouldTriggerSpiderSense
        ? state.hero.deck.slice(0, 1)
        : [];

      const remainingDeck = shouldTriggerSpiderSense
        ? state.hero.deck.slice(1)
        : state.hero.deck;

      return {
        hero: {
          ...state.hero,
          hitPoints: Math.max(0, state.hero.hitPoints - amount),
          deck: remainingDeck,
          hand: [...state.hero.hand, ...drawnCards],
        },

        eventHistory: appendEvents(state.eventHistory, [
          attackEvent,
          damageEvent,
        ]),

        log: [
          ...state.log,
          `Rhino attacked for ${amount} damage.`,
          ...(shouldTriggerSpiderSense
            ? ["Spider-Sense triggered. Drew 1 card."]
            : []),
        ],
      };
    }),

  villainScheme: () =>
    set((state) => {
      const amount = 2;

      const schemeEvent = {
        type: "VILLAIN_SCHEME" as const,
        amount,
      };

      return {
        villain: {
          ...state.villain,
          threat: state.villain.threat + amount,
        },

        eventHistory: appendEvents(state.eventHistory, [
          schemeEvent,
        ]),

        log: [...state.log, `Rhino schemed for ${amount} threat.`],
      };
    }),

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

      let nextHero = state.hero;
      let nextVillain = state.villain;
      let nextEventHistory = state.eventHistory;
      const nextLog = [...state.log];

      if (state.phase === "player") {
        nextPhase = "villain";

        const villainActivation = resolveVillainActivation(state);

        nextHero = villainActivation.hero ?? nextHero;
        nextVillain = villainActivation.villain ?? nextVillain;
        nextEventHistory =
          villainActivation.eventHistory ?? nextEventHistory;

        nextLog.splice(
          0,
          nextLog.length,
          ...(villainActivation.log ?? nextLog)
        );
      } else if (state.phase === "villain") {
        nextPhase = "encounter";
      } else {
        nextPhase = "player";
        nextRound += 1;
      }

      nextLog.push(`Phase advanced to ${nextPhase}.`);

      return {
        phase: nextPhase,
        round: nextRound,
        hero: nextHero,
        villain: nextVillain,
        eventHistory: nextEventHistory,
        log: nextLog,
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
    set((state) => {
      const damageEvent = {
        type: "DAMAGE_DEALT" as const,
        target: "villain" as const,
        amount,
      };

      return {
        villain: {
          ...state.villain,
          hitPoints: Math.max(0, state.villain.hitPoints - amount),
        },

        eventHistory: appendEvents(state.eventHistory, [
          damageEvent,
        ]),

        log: [...state.log, `Villain took ${amount} damage.`],
      };
    }),

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
      if (state.hero.identity.stunned) {
        return {
          hero: {
            ...state.hero,
            identity: {
              ...state.hero.identity,
              stunned: false,
            },
          },

          log: [
            ...state.log,
            "Attack canceled by STUNNED. Removed stunned status.",
          ],
        };
      }
      if (state.hero.identity.exhausted) {
        return {
          log: [
            ...state.log,
            "Cannot basic attack while exhausted.",
          ]
        };
      }

      if (state.hero.form === "alterEgo") {
        return {
          log: [
            ...state.log,
            "Cannot basic attack while in alter-ego form.",
          ],
        };
      }

      const amount = state.hero.identity.attack ?? 0;

      const basicAttackEvent = {
        type: "BASIC_ATTACK" as const,
        amount,
      };

      const damageEvent = {
        type: "DAMAGE_DEALT" as const,
        target: "villain" as const,
        amount,
      };

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

        eventHistory: appendEvents(state.eventHistory, [
          basicAttackEvent,
          damageEvent,
        ]),

        log: [
          ...state.log,
          `Hero attacked for ${amount}.`,
        ],
      };
    }),

  basicThwart: () =>
    set((state) => {
      if (state.hero.identity.confused) {
        return {
          hero: {
            ...state.hero,
            identity: {
              ...state.hero.identity,
              confused: false,
            },
          },

          log: [
            ...state.log,
            "Thwart canceled by CONFUSED. Removed confused status.",
          ],
        };
      }
      if (state.hero.identity.exhausted) {
        return {
          log: [
            ...state.log,
            "Cannot thwart while exhausted.",
          ],
        };
      }

      if (state.hero.form === "alterEgo") {
        return {
          log: [
            ...state.log,
            "Cannot thwart while in alter-ego form.",
          ],
        };
      }

      const amount =
        state.hero.identity.thwart ?? 0;

      const basicThwartEvent = {
        type: "BASIC_THWART" as const,
        amount,
      };

      const threatRemovedEvent = {
        type: "THREAT_REMOVED" as const,
        amount,
      };

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

        eventHistory: appendEvents(state.eventHistory, [
          basicThwartEvent,
          threatRemovedEvent,
        ]),

        log: [
          ...state.log,
          `Hero thwarted for ${amount}.`,
        ],
      };
    }),

  basicRecover: () =>
    set((state) => {
      if (state.hero.identity.exhausted) {
        return {
          log: [
            ...state.log,
            "Cannot recover while exhausted.",
          ],
        };
      }

      if (state.hero.form !== "alterEgo") {
        return {
          log: [
            ...state.log,
            "Cannot recover while in hero form.",
          ],
        };
      }

      const amount = state.hero.identity.recover ?? 0;

      const recoverEvent = {
        type: "BASIC_RECOVER" as const,
        amount,
      };

      const healingEvent = {
        type: "HEALING_DONE" as const,
        target: "hero" as const,
        amount,
      };

      return {
        hero: {
          ...state.hero,
          identity: {
            ...state.hero.identity,
            exhausted: true,
          },
          hitPoints: state.hero.hitPoints + amount,
        },

        eventHistory: appendEvents(state.eventHistory, [
          recoverEvent,
          healingEvent,
        ]),

        log: [
          ...state.log,
          `Hero recovered ${amount} HP.`,
        ],
      };
    }),

  dealEncounterCard: () =>
    set((state) => {
      let encounterDeck = [...state.encounterDeck];
      let encounterDiscard = [...state.encounterDiscard];
      const nextLog = [...state.log];

      if (encounterDeck.length === 0 && encounterDiscard.length > 0) {
        encounterDeck = shuffle(encounterDiscard);
        encounterDiscard = [];
        nextLog.push("Shuffled encounter discard into encounter deck.");
      }

      const card = encounterDeck.shift();

      if (!card) {
        return {
          log: [
            ...nextLog,
            "Tried to deal an encounter card, but the encounter deck is empty.",
          ],
        };
      }

      return {
        encounterDeck,
        encounterDiscard,
        encounterArea: [...state.encounterArea, card],
        log: [
          ...nextLog,
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

  recordEvent: (event) =>
    set((state) => ({
      eventHistory: [...state.eventHistory, event],
    })),

  toggleHeroStunned: () =>
    set((state) => ({
      hero: {
        ...state.hero,
        identity: {
          ...state.hero.identity,
          stunned: !state.hero.identity.stunned,
        },
      },

      log: [
        ...state.log,
        `Hero stunned set to ${!state.hero.identity.stunned}.`,
      ],
    })),

  toggleHeroConfused: () =>
    set((state) => ({
      hero: {
        ...state.hero,
        identity: {
          ...state.hero.identity,
          confused: !state.hero.identity.confused,
        },
      },

      log: [
        ...state.log,
        `Hero confused set to ${!state.hero.identity.confused}.`,
      ],
    })),

  toggleHeroTough: () =>
    set((state) => ({
      hero: {
        ...state.hero,
        identity: {
          ...state.hero.identity,
          tough: !state.hero.identity.tough,
        },
      },

      log: [
        ...state.log,
        `Hero tough set to ${!state.hero.identity.tough}.`,
      ],
    })),

}));

