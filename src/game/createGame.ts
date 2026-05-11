import { shuffle } from "../utils/shuffle";
import type { Card, GameState } from "./types";
import { rhinoCards } from "../data/villains/rhino";
import { createCardInstance } from "../utils/createCardInstance";
import { rhinoMainSchemes } from "../data/schemes/rhinoMainScheme";
import { rhinoEncounterCards } from "../data/encounters/rhinoEncounter";

export function createNewGame({
  hero,
  deck,
  villainCards,
  mainSchemes,
  encounterCards,
}: {
  hero: Card;
  deck: Card[];
  villainCards: Card[];
  mainSchemes: Card[];
  encounterCards: Card[];
}): GameState {
  const heroIdentity = createCardInstance(hero);

  return {
    phase: "player",
    round: 1,

    hero: {
      identity: heroIdentity,
      form: "hero",

      deck: shuffle(deck.map(createCardInstance)),

      hand: [],
      discard: [],
      playArea: [],

      hitPoints: hero.hp ?? 10,
      maxHitPoints: hero.hp ?? 10,
      remainingActivations: 1,
      isDefending: false,
    },

    villain: {
      identity: createCardInstance(villainCards[0]),
      hitPoints: villainCards[0].hp ?? 14,
      stage: 1,
    },

    encounterDeck: shuffle(
      encounterCards.map(createCardInstance)
    ),
    encounterDiscard: [],
    encounterArea: [],

    log: [],
    eventHistory: [],
    sideSchemes: [],
    minions: [],
    gameStatus: "playing",
    mainScheme: {
      card: createCardInstance(mainSchemes[0]),
      threat: 0,
      stage: 1,
      threatLimit: mainSchemes[0].threatLimit ?? 7,
    },
  };
}
