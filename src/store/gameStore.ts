// Track builds: 0010

import { create } from "zustand";
import { shuffle } from "../utils/shuffle";
import type { GameState } from "../game/types";
import type { GameEvent } from "../game/events";
import { createNewGame } from "../game/createGame";
import { dispatchGameEvent } from "../game/dispatch";
import { resolveVillainActivation } from "../game/rules/villainActivation";
import { buildPlayerDeckFromMarvelCdb } from "../game/buildDeckFromMarvelCdb";
//import marvelDeck from "../data/decks/spiderMan.json";
import { defaultMarvelCdbDeckId } from "../data/defaultDeck";
import { spiderManHero } from "../data/heroes/spiderMan";
import { heroCardByCode } from "../data/heroes";
import { fetchMarvelCdbDeck } from "../api/marvelCdb";

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
  defend: () => void;
  beginPlayCard: (instanceId: string) => void;
  togglePaymentCard: (instanceId: string) => void;
  confirmPlayCard: () => void;
  cancelPayment: () => void;
  loadMarvelCdbDeck: (deckId: string) => Promise<void>;
}

const defaultHero = spiderManHero;

const defaultDeck = buildPlayerDeckFromMarvelCdb({
  hero_code: "01001a",
  hero_name: "Spider-Man",
  slots: {
    "01002": 1,
    "01003": 2,
    "01004": 2,
    "01005": 3,
    "01006": 1,
    "01007": 2,
    "01008": 2,
    "01009": 2,
    "01058": 1,
    "01059": 1,
    "01060": 2,
    "01061": 2,
    "01062": 2,
    "01063": 2,
    "01064": 2,
    "01065": 2,
    "01083": 1,
    "01084": 1,
    "01085": 1,
    "01086": 1,
    "01087": 1,
    "01088": 1,
    "01089": 1,
    "01090": 1,
    "01091": 1,
    "01092": 1,
    "01093": 1,
  },
});

//const heroCode = defaultDeck.hero_code.replace(
//  /[ab]$/,
//  ""
//);

//const hero = heroCardByCode.get(heroCode);

//if (!hero) {
//  throw new Error(
//    `Hero not found for code ${heroCode}`
//  );
//}

//const deck = buildPlayerDeckFromMarvelCdb(
//  marvelDeck
//);

export const useGameStore = create<GameStore>((set) => ({

  ...createNewGame({
    hero: defaultHero,
    deck: defaultDeck,
  }),

  villainAttack: () =>
    set((state) => {
      const amount = 2;

      const attackEvent = {
        type: "VILLAIN_ATTACK" as const,
        amount,
      };

      if (state.hero.identity.tough) {
        return {
          hero: {
            ...state.hero,
            identity: {
              ...state.hero.identity,
              tough: false,
            },
          },

          eventHistory: appendEvents(state.eventHistory, [
            attackEvent,
          ]),

          log: [
            ...state.log,
            `Rhino attacked for ${amount} damage.`,
            "Damage prevented by TOUGH. Removed tough status.",
          ],
        };
      }

      const damageEvent = {
        type: "DAMAGE_DEALT" as const,
        target: "hero" as const,
        amount,
      };

      return {
        hero: {
          ...state.hero,
          hitPoints: Math.max(
            0,
            state.hero.hitPoints - amount
          ),
        },

        eventHistory: appendEvents(state.eventHistory, [
          attackEvent,
          damageEvent,
        ]),

        log: [
          ...state.log,
          `Rhino attacked for ${amount} damage.`,
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
      let nextEncounterDeck = state.encounterDeck;
      let nextEncounterDiscard = state.encounterDiscard;
      let nextPhase: typeof state.phase;
      let nextRound = state.round;

      let nextHero = state.hero;
      let nextVillain = state.villain;
      let nextEventHistory = state.eventHistory;
      const nextLog = [...state.log];

      if (state.phase === "player") {
        nextPhase = "villain";

        const villainActivation = resolveVillainActivation(state);
        nextEncounterDeck =
          villainActivation.encounterDeck ?? nextEncounterDeck;

        nextEncounterDiscard =
          villainActivation.encounterDiscard ?? nextEncounterDiscard;

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
        encounterDeck: nextEncounterDeck,
        encounterDiscard: nextEncounterDiscard,
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
    set((state) => {
      if (state.hero.identity.tough) {
        return {
          hero: {
            ...state.hero,
            identity: {
              ...state.hero.identity,
              tough: false,
            },
          },

          log: [
            ...state.log,
            "Damage prevented by TOUGH. Removed tough status.",
          ],
        };
      }

      const damageEvent = {
        type: "DAMAGE_DEALT" as const,
        target: "hero" as const,
        amount,
      };

      return {
        hero: {
          ...state.hero,
          hitPoints: Math.max(
            0,
            state.hero.hitPoints - amount
          ),
        },

        eventHistory: appendEvents(state.eventHistory, [
          damageEvent,
        ]),

        log: [
          ...state.log,
          `Hero took ${amount} damage.`,
        ],
      };
    }),

  healHero: (amount) =>

    set((state) => ({

      hero: {
        ...state.hero,
        hitPoints: Math.min(
          state.hero.maxHitPoints,
          state.hero.hitPoints + amount
        ),
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
          hitPoints: Math.min(
            state.hero.maxHitPoints,
            state.hero.hitPoints + amount
          ),
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

  defend: () =>
    set((state) => {
      if (state.hero.form !== "hero") {
        return {
          log: [...state.log, "Cannot defend while in alter-ego form."],
        };
      }

      if (state.hero.identity.exhausted) {
        return {
          log: [...state.log, "Cannot defend while exhausted."],
        };
      }

      return {
        hero: {
          ...state.hero,
          isDefending: true,
          identity: {
            ...state.hero.identity,
            exhausted: true,
          },
        },
        log: [...state.log, "Hero is defending."],
      };
    }),

  beginPlayCard: (instanceId) =>
    set((state) => {
      const card = state.hero.hand.find(
        (c) => c.instanceId === instanceId
      );

      if (!card) {
        return state;
      }

      return {
        hero: {
          ...state.hero,
          pendingPayment: {
            cardToPlay: card,
            paidWith: [],
          },
        },

        log: [
          ...state.log,
          `Started paying for ${card.name}.`,
        ],
      };
    }),

  togglePaymentCard: (instanceId) =>
    set((state) => {
      if (!state.hero.pendingPayment) {
        return state;
      }

      const paymentCard = state.hero.hand.find(
        (c) => c.instanceId === instanceId
      );

      if (!paymentCard) {
        return state;
      }

      if (
        paymentCard.instanceId ===
        state.hero.pendingPayment.cardToPlay.instanceId
      ) {
        return {
          log: [
            ...state.log,
            "A card cannot pay for itself.",
          ],
        };
      }

      const cardIsAlreadyPaid =
        state.hero.pendingPayment.paidWith.some(
          (c) => c.instanceId === instanceId
        );

      if (cardIsAlreadyPaid) {
        return {
          hero: {
            ...state.hero,
            pendingPayment: {
              ...state.hero.pendingPayment,
              paidWith: state.hero.pendingPayment.paidWith.filter(
                (c) => c.instanceId !== instanceId
              ),
            },
          },
          log: [
            ...state.log,
            `Unpaid ${paymentCard.name}.`,
          ],
        };
      } else {
        return {
          hero: {
            ...state.hero,
            pendingPayment: {
              ...state.hero.pendingPayment,
              paidWith: [...state.hero.pendingPayment.paidWith, paymentCard],
            },
          },
          log: [
            ...state.log,
            `Paid ${paymentCard.name} toward ${state.hero.pendingPayment.cardToPlay.name}.`,
          ],
        };
      }
    }),

  confirmPlayCard: () =>
    set((state) => {
      const pendingPayment = state.hero.pendingPayment;

      if (!pendingPayment) {
        return state;
      }

      const { cardToPlay, paidWith } = pendingPayment;

      const totalCost = cardToPlay.cost ?? 0;

      const paidResources = paidWith.flatMap(
        (card) => card.resources ?? ["wild"]
      );

      const totalResources = paidResources.length;

      if (totalResources < totalCost) {
        return {
          log: [
            ...state.log,
            `Not enough resources paid for ${cardToPlay.name} (${totalResources}/${totalCost}).`,
          ],
        };
      }

      const paymentIds = new Set(
        paidWith.map((card) => card.instanceId)
      );

      const newHand = state.hero.hand.filter(
        (card) =>
          card.instanceId !== cardToPlay.instanceId &&
          !paymentIds.has(card.instanceId)
      );

      const goesToDiscard =
        cardToPlay.type === "event" ||
        cardToPlay.type === "resource";

      return {
        hero: {
          ...state.hero,
          hand: newHand,
          pendingPayment: undefined,

          discard: goesToDiscard
            ? [...state.hero.discard, ...paidWith, cardToPlay]
            : [...state.hero.discard, ...paidWith],

          playArea: goesToDiscard
            ? state.hero.playArea
            : [...state.hero.playArea, cardToPlay],
        },

        log: [
          ...state.log,
          `Paid ${paidResources} resource(s) for ${cardToPlay.name}.`,
          goesToDiscard
            ? `Played ${cardToPlay.name} and discarded it.`
            : `Played ${cardToPlay.name}.`,
        ],
      };
    }),

  cancelPayment: () =>
    set((state) => {
      const pendingPayment = state.hero.pendingPayment;

      if (!pendingPayment) {
        return state;
      }

      return {
        hero: {
          ...state.hero,
          pendingPayment: undefined,
        },

        log: [
          ...state.log,
          `Cancelled playing ${pendingPayment.cardToPlay.name}.`,
        ],
      };
    }),

  loadMarvelCdbDeck: async (deckId) => {
    const marvelDeck = await fetchMarvelCdbDeck(deckId);

    const heroCode = marvelDeck.hero_code.replace(/[ab]$/, "");
    const hero = heroCardByCode.get(heroCode);

    if (!hero) {
      throw new Error(`Hero not found for code ${heroCode}`);
    }

    const deck = buildPlayerDeckFromMarvelCdb(marvelDeck);

    set(
      createNewGame({
        hero,
        deck,
      })
    );
  },

}));

