import { shuffle } from "../utils/shuffle";
import type { Card, GameState } from "./types";
import { rhinoCards } from "../data/villains/rhino";
import { createCardInstance } from "../utils/createCardInstance";
import { rhinoMainSchemes } from "../data/schemes/rhinoMainScheme";
import { rhinoEncounterCards } from "../data/encounters/rhinoEncounter";

export function createNewGame({
  hero,
  deck,
}: {
  hero: Card;
  deck: Card[];
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
      identity: createCardInstance(rhinoCards[0]),
      hitPoints: rhinoCards[0].hp ?? 14,
      stage: 1,
    },

    encounterDeck: shuffle(
      rhinoEncounterCards.map(createCardInstance)
    ),
    encounterDiscard: [],
    encounterArea: [],

    log: [],
    eventHistory: [],
    sideSchemes: [],
    minions: [],
    gameStatus: "playing",
    mainScheme: {
      card: createCardInstance(rhinoMainSchemes[0]),
      threat: 0,
      stage: 1,
      threatLimit: rhinoMainSchemes[0].threatLimit ?? 7,
    },
  };
}
