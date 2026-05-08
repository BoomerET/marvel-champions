import type { GameState } from "../types";
import { appendEvents } from "../../store/gameStore";

export function resolveVillainActivation(
    state: GameState
): Partial<GameState> {
    const amount = 2;
    const nextLog = [...state.log];

    if (state.hero.form === "hero") {
        const attackEvent = {
            type: "VILLAIN_ATTACK" as const,
            amount,
        };

        const damageEvent = {
            type: "DAMAGE_DEALT" as const,
            target: "hero" as const,
            amount,
        };

        const shouldTriggerSpiderSense =
            state.hero.identity.name === "Spider-Man";

        const drawnCards = shouldTriggerSpiderSense
            ? state.hero.deck.slice(0, 1)
            : [];

        const remainingDeck = shouldTriggerSpiderSense
            ? state.hero.deck.slice(1)
            : state.hero.deck;

        const isTough = state.hero.identity.tough;

        const nextHero = {
            ...state.hero,

            identity: {
                ...state.hero.identity,
                tough: isTough ? false : state.hero.identity.tough,
            },

            hitPoints: isTough
                ? state.hero.hitPoints
                : Math.max(0, state.hero.hitPoints - amount),

            deck: remainingDeck,
            hand: [...state.hero.hand, ...drawnCards],
        };

        nextLog.push(`Rhino attacked for ${amount} damage.`);

        if (shouldTriggerSpiderSense) {
            nextLog.push("Spider-Sense triggered. Drew 1 card.");
        }

        if (isTough) {
            nextLog.push("Damage prevented by TOUGH. Removed tough status.");
        }

        return {
            hero: nextHero,
            eventHistory: appendEvents(
                state.eventHistory,
                isTough
                    ? [attackEvent]
                    : [attackEvent, damageEvent]
            ),
            log: nextLog,
        };
    }

    const schemeEvent = {
        type: "VILLAIN_SCHEME" as const,
        amount,
    };

    nextLog.push(`Rhino schemed for ${amount} threat.`);

    return {
        villain: {
            ...state.villain,
            threat: state.villain.threat + amount,
        },
        eventHistory: appendEvents(state.eventHistory, [
            schemeEvent,
        ]),
        log: nextLog,
    };
}
