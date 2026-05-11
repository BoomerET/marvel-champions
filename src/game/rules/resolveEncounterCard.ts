import type { CardInstance, GameState } from "../types";

export function resolveEncounterCardEffect(
    state: GameState,
    card: CardInstance
): Partial<GameState> {
    if (card.type === "minion") {
        return {
            minions: [
                ...state.minions,
                {
                    ...card,
                    currentHitPoints: card.hp ?? 0,
                },
            ],
            log: [
                ...state.log,
                `${card.name} engaged as a minion.`,
            ],
        };
    }

    if (card.type === "sideScheme") {
        return {
            sideSchemes: [
                ...state.sideSchemes,
                card,
            ],
            log: [
                ...state.log,
                `${card.name} entered play as a side scheme.`,
            ],
        };
    }

    if (card.type === "treachery") {
        return {
            encounterDiscard: [
                ...state.encounterDiscard,
                card,
            ],
            log: [
                ...state.log,
                `Resolved treachery: ${card.name}.`,
            ],
        };
    }

    return {
        encounterDiscard: [
            ...state.encounterDiscard,
            card,
        ],
        log: [
            ...state.log,
            `${card.name} resolved and discarded.`,
        ],
    };
}
