import type { GameState } from "../types";
import { appendEvents } from "../../store/gameStore";
import { resolveMinionActivation } from "./resolveMinionActivation";

export function resolveVillainActivation(
    state: GameState
): Partial<GameState> {
    const boostCard = state.encounterDeck[0];
    const remainingEncounterDeck = state.encounterDeck.slice(1);
    const boostAmount = boostCard?.boostIcons ?? 0;

    const attackAmount =
        (state.villain.identity.attack ?? 0) + boostAmount;

    const schemeAmount =
        (state.villain.identity.scheme ?? 0) + boostAmount;

    const nextLog = [...state.log];

    if (boostCard) {
        nextLog.push(`Boost card: ${boostCard.name} (+${boostAmount}).`);

        boostCard.boostText?.forEach((text) => {
            nextLog.push(`BOOST: ${text}`);
        });
    } else {
        nextLog.push("No boost card available.");
    }

    if (state.hero.form === "hero") {
        const attackEvent = {
            type: "VILLAIN_ATTACK" as const,
            amount: attackAmount,
        };

        const isTough = state.hero.identity.tough;

        const defense = state.hero.isDefending
            ? state.hero.identity.defense ?? 0
            : 0;

        const damageAmount = Math.max(0, attackAmount - defense);

        const damageEvent = {
            type: "DAMAGE_DEALT" as const,
            target: "hero" as const,
            amount: damageAmount,
        };

        const shouldTriggerSpiderSense =
            state.hero.identity.name === "Spider-Man";

        const drawnCards = shouldTriggerSpiderSense
            ? state.hero.deck.slice(0, 1)
            : [];

        const remainingDeck = shouldTriggerSpiderSense
            ? state.hero.deck.slice(1)
            : state.hero.deck;

        const nextHero = {
            ...state.hero,
            identity: {
                ...state.hero.identity,
                tough: isTough ? false : state.hero.identity.tough,
            },
            hitPoints: isTough
                ? state.hero.hitPoints
                : Math.max(0, state.hero.hitPoints - damageAmount),
            deck: remainingDeck,
            hand: [...state.hero.hand, ...drawnCards],
            isDefending: false,
        };

        nextLog.push(`Rhino attacked for ${damageAmount} damage.`);

        if (state.hero.isDefending) {
            nextLog.push(`Defense reduced damage by ${defense}.`);
        }

        if (shouldTriggerSpiderSense) {
            nextLog.push("Spider-Sense triggered. Drew 1 card.");
        }

        if (isTough) {
            nextLog.push("Damage prevented by TOUGH. Removed tough status.");
        }

        const minionActivation = resolveMinionActivation({
            state,
            hero: nextHero,
            villain: state.villain,
            log: nextLog,
        });

        return {
            hero: minionActivation.hero,
            villain: minionActivation.villain,
            eventHistory: appendEvents(
                state.eventHistory,
                isTough || damageAmount === 0
                    ? [attackEvent]
                    : [attackEvent, damageEvent]
            ),
            encounterDeck: remainingEncounterDeck,
            encounterDiscard: boostCard
                ? [...state.encounterDiscard, boostCard]
                : state.encounterDiscard,
            log: minionActivation.log,
        };
    }

    const schemeEvent = {
        type: "VILLAIN_SCHEME" as const,
        amount: schemeAmount,
    };

    const nextThreat = state.villain.threat + schemeAmount;

    const nextVillain = {
        ...state.villain,
        threat: nextThreat,
    };

    nextLog.push(`Rhino schemed for ${schemeAmount} threat.`);

    if (nextThreat >= state.villain.threatLimit) {
        nextLog.push("Main scheme threat limit reached. You lose!");
    }

    const minionActivation = resolveMinionActivation({
        state,
        hero: state.hero,
        villain: nextVillain,
        log: nextLog,
    });

    return {
        hero: minionActivation.hero,
        villain: minionActivation.villain,
        eventHistory: appendEvents(state.eventHistory, [schemeEvent]),
        encounterDeck: remainingEncounterDeck,
        encounterDiscard: boostCard
            ? [...state.encounterDiscard, boostCard]
            : state.encounterDiscard,
        log: minionActivation.log,
    };
}