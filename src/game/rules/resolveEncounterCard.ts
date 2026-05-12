import type { CardInstance, GameState } from "../types";
import { checkMainSchemeAdvance } from "./checkMainSchemeAdvance";

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

        card.whenRevealed?.forEach((effect) => {
            if (effect.type === "damageHero") {
                nextHero = {
                    ...nextHero,
                    hitPoints: Math.max(
                        0,
                        nextHero.hitPoints - effect.amount
                    ),
                };

                nextLog.push(
                    `${card.name} dealt ${effect.amount} damage.`
                );
            }

            if (effect.type === "addThreat") {
                nextMainScheme = {
                    ...nextMainScheme,
                    threat: nextMainScheme.threat + effect.amount,
                };

                nextLog.push(
                    `${card.name} added ${effect.amount} threat.`
                );
            }
        });

        const checked = checkMainSchemeAdvance({
            state,
            mainScheme: nextMainScheme,
            log: nextLog,
        });

        return {
            hero: nextHero,
            mainScheme: checked.mainScheme,
            gameStatus: checked.gameStatus,

            encounterDiscard: [
                ...state.encounterDiscard,
                card,
            ],

            log: [
                ...checked.log,
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
