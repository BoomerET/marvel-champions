import type { CardInstance, GameState } from "../types";

export function resolveEncounterCardEffect(
    state: GameState,
    card: CardInstance
): Partial<GameState> {
    if (card.type === "minion") {
        return {
            minions: [...state.minions, card],
            log: [...state.log, `${card.name} engaged as a minion.`],
        };
    }

    if (card.type === "sideScheme") {
        return {
            sideSchemes: [...state.sideSchemes, card],
            log: [...state.log, `${card.name} entered play as a side scheme.`],
        };
    }

    return {
        encounterDiscard: [...state.encounterDiscard, card],
        log: [...state.log, `${card.name} resolved and discarded.`],
    };
}
