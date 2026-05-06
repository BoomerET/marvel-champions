import { create } from "zustand";
import type { GameState } from "../game/types";
import { createNewGame } from "../game/createGame";

interface GameStore extends GameState {
  nextPhase: () => void;
  pushLog: (message: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  ...createNewGame(),

  nextPhase: () =>
    set((state) => ({
      phase:
        state.phase === "player"
          ? "villain"
          : "player",
    })),

  pushLog: (message) =>
    set((state) => ({
      log: [...state.log, message],
    })),
}));

