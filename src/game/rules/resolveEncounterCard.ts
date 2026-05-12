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
        let nextHero = state.hero;
        let nextMainScheme = state.mainScheme;
        const nextLog = [...state.log];

        if (card.whenRevealed === "dealDamage") {
            nextHero = {
                ...nextHero,
                hitPoints: Math.max(
                    0,
                    nextHero.hitPoints - 2
                ),
            };

            nextLog.push(
                `${card.name} dealt 2 damage.`
            );
        }

        if (card.whenRevealed === "addThreat") {
            nextMainScheme = {
                ...nextMainScheme,
                threat: nextMainScheme.threat + 2,
            };

            nextLog.push(
                `${card.name} added 2 threat.`
            );
        }

        return {
            hero: nextHero,
            mainScheme: nextMainScheme,

            encounterDiscard: [
                ...state.encounterDiscard,
                card,
            ],

            log: [
                ...nextLog,
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
