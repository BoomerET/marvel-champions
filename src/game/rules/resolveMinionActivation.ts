import type { GameState } from "../types";

export function resolveMinionActivations(
    state: GameState
): Partial<GameState> {
    let nextHero = state.hero;
    const nextLog = [...state.log];

    state.minions.forEach((minion) => {
        const attack = minion.attack ?? 0;

        nextHero = {
            ...nextHero,
            hitPoints: Math.max(
                0,
                nextHero.hitPoints - attack
            ),
        };

        nextLog.push(
            `${minion.name} attacked for ${attack} damage.`
        );
    });

    return {
        hero: nextHero,
        log: nextLog,
    };
}
