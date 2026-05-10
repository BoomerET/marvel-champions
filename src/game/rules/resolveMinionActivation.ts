import type { GameState, HeroState } from "../types";

export function resolveMinionActivations({
    state,
    hero,
    log,
}: {
    state: GameState;
    hero: HeroState;
    log: string[];
}): {
    hero: HeroState;
    log: string[];
} {
    let nextHero = hero;
    const nextLog = [...log];

    state.minions.forEach((minion) => {
        const attack = minion.attack ?? 0;

        nextHero = {
            ...nextHero,
            hitPoints: Math.max(0, nextHero.hitPoints - attack),
        };

        nextLog.push(`${minion.name} attacked for ${attack} damage.`);
    });

    return {
        hero: nextHero,
        log: nextLog,
    };
}
