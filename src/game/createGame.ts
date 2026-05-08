import type { GameState } from "./types";
import { shuffle } from "../utils/shuffle";
import { rhinoCards } from "../data/villains/rhino";
import { spiderManCards } from "../data/heroes/spiderMan";
import { createCardInstance } from "../utils/createCardInstance";
import { rhinoEncounterCards } from "../data/encounters/rhinoEncounter";

export function createNewGame(): GameState {

  return {
    encounterDeck: rhinoEncounterCards.map(createCardInstance),
    encounterDiscard: [],
    encounterArea: [],
    phase: "player",
    round: 1,

    hero: {
      identity: createCardInstance(spiderManCards[0]),
      form: "hero",

      deck: shuffle(
        spiderManCards
          .slice(1)
          .map(createCardInstance)
      ),

      hand: [],
      discard: [],
      playArea: [],

      hitPoints: 10,
      remainingActivations: 1,
      maxHitPoints: 10,
      isDefending: false,
    },

    villain: {
      identity: createCardInstance(rhinoCards[0]),
      hitPoints: 14,
      threat: 0,
    },
    log: [],
    eventHistory: [],
  };
}

