import type {
    GameState,
    HeroState,
    VillainState,
} from "../types";

export function resolveMinionActivations({
    state,
    hero,
    villain,
    log,
}: {
    state: GameState;
    hero: HeroState;
    villain: VillainState;
    log: string[];
}): {
    hero: HeroState;
    villain: VillainState;
    log: string[];
} {
    let nextHero = hero;
    let nextVillain = villain;
    const nextLog = [...log];

    state.minions.forEach((minion) => {
        if (state.hero.form === "hero") {
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

            return;
        }

        const scheme = minion.scheme ?? 0;
        const nextThreat = nextVillain.threat + scheme;

        const threatLimitReached =
            nextThreat >= nextVillain.threatLimit;

        nextVillain = {
            ...nextVillain,
            threat: nextThreat,
        };

        nextLog.push(
            `${minion.name} schemed for ${scheme} threat.`
        );

        if (threatLimitReached) {
            nextLog.push(
                "Main scheme threat limit reached. You lose!"
            );
        }
    });

    return {
        hero: nextHero,
        villain: nextVillain,
        log: nextLog,
    };
}
