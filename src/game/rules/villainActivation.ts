import type { GameState } from "../types";
import { appendEvents } from "../../store/gameStore";

export function resolveVillainActivation(
    state: GameState
): Partial<GameState> {
    const attackAmount =
        state.villain.identity.attack ?? 0;

    const schemeAmount =
        state.villain.identity.scheme ?? 0;

    const nextLog = [...state.log];

    if (state.hero.form === "hero") {
        const attackEvent = {
            type: "VILLAIN_ATTACK" as const,
            amount: attackAmount,
        };

        const damageEvent = {
            type: "DAMAGE_DEALT" as const,
            target: "hero" as const,
            amount: attackAmount,
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

        const defense =
            state.hero.isDefending
                ? state.hero.identity.defense ?? 0
                : 0;

        const damageAmount = Math.max(
            0,
            attackAmount - defense
        );

        const nextHero = {
            ...state.hero,

            identity: {
                ...state.hero.identity,
                tough: isTough ? false : state.hero.identity.tough,
            },

            hitPoints: isTough
                ? state.hero.hitPoints
                : Math.max(
                    0,
                    state.hero.hitPoints - damageAmount
                ),

            deck: remainingDeck,
            hand: [...state.hero.hand, ...drawnCards],
            isDefending: false,
        };

        nextLog.push(
            `Rhino attacked for ${damageAmount} damage.`
        );

        if (state.hero.isDefending) {
            nextLog.push(
                `Defense reduced damage by ${defense}.`
            );
        }

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
        amount: schemeAmount,
    };

    nextLog.push(`Rhino schemed for ${schemeAmount} threat.`);

    return {
        villain: {
            ...state.villain,
            threat: state.villain.threat + schemeAmount,
        },
        eventHistory: appendEvents(state.eventHistory, [
            schemeEvent,
        ]),
        log: nextLog,
    };
}
