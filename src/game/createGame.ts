import type { Card, GameState } from "./types";
import { rhinoEncounterCards } from "../data/encounters/rhinoEncounter";
import { rhinoCards } from "../data/villains/rhino";
import { createCardInstance } from "../utils/createCardInstance";
import { shuffle } from "../utils/shuffle";

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
      threat: 0,
    },

    encounterDeck: shuffle(
      rhinoEncounterCards.map(createCardInstance)
    ),
    encounterDiscard: [],
    encounterArea: [],

    log: [],
    eventHistory: [],
    sideScheme: [],
    minions: [],
  };
}
