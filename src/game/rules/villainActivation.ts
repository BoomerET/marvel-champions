import type { GameState } from "../types";
import { appendEvents } from "../../store/gameStore";

export function resolveVillainActivation(state: GameState): Partial<GameState> {
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

        const nextHero = {
            ...state.hero,
            hitPoints: Math.max(0, state.hero.hitPoints - amount),
            deck: shouldTriggerSpiderSense
                ? state.hero.deck.slice(1)
                : state.hero.deck,
            hand: [...state.hero.hand, ...drawnCards],
        };

        nextLog.push(`Rhino attacked for ${amount} damage.`);

        if (shouldTriggerSpiderSense) {
            nextLog.push("Spider-Sense triggered. Drew 1 card.");
        }

        return {
            hero: nextHero,
            eventHistory: appendEvents(state.eventHistory, [
                attackEvent,
                damageEvent,
            ]),
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
