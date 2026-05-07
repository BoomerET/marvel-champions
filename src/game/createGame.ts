import type { GameState } from "./types";
import { spiderManCards } from "../data/heroes/spiderMan";
import { rhinoCards } from "../data/villains/rhino";
import { createCardInstance } from "../utils/createCardInstance";
import { shuffle } from "../utils/shuffle";

export function createNewGame(): GameState {

  return {
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
    },

    villain: {
      identity: createCardInstance(rhinoCards[0]),
      hitPoints: 14,
      threat: 0,
    },

    encounterArea: [],
    log: [],
  };
}

