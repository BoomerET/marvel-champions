import type { GameState } from "./types";

export function createNewGame(): GameState {
  return {
    phase: "setup",
    round: 1,
    hero: {
      identity: {
        code: "spider-man",
        name: "Spider-Man",
        type: "hero",
        instanceId: crypto.randomUUID(),
      },
      hand: [],
      deck: [],
      discard: [],
    },
    log: [],
  };
}

