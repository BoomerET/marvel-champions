import type { CardInstance, GameState } from "../types";

export function resolveEncounterCardEffect(
    state: GameState,
    card: CardInstance
): Partial<GameState> {
    switch (card.type) {
        case "treachery":
            return {
                log: [
                    ...state.log,
                    `${card.name} resolved as a treachery.`,
                ],
            };

        case "minion":
            return {
                log: [
                    ...state.log,
                    `${card.name} entered play as a minion.`,
                ],
            };

        case "sideScheme":
            return {
                log: [
                    ...state.log,
                    `${card.name} entered play as a side scheme.`,
                ],
            };

        default:
            return {
                log: [
                    ...state.log,
                    `No resolver for ${card.type}.`,
                ],
            };
    }
}
