import type {
    GameState,
    GameStatus,
    HeroState,
    VillainState,
} from "../types";

export function resolveMinionActivation({
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
    gameStatus: GameStatus;
} {
    let nextHero = hero;
    let nextVillain = villain;
    const nextLog = [...log];
    let nextGameStatus = state.gameStatus;

    state.minions.forEach((minion) => {
        if (state.hero.form === "hero") {
            const attack = minion.attack ?? 0;

            const nextHitPoints = Math.max(
                0,
                nextHero.hitPoints - attack
            );

            nextHero = {
                ...nextHero,
                hitPoints: nextHitPoints,
            };

            nextLog.push(
                `${minion.name} attacked for ${attack} damage.`
            );

            if (nextHitPoints <= 0) {
                nextGameStatus = "lost";
                nextLog.push("Hero defeated. You lose!");
            }

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
            nextGameStatus = "lost";
            nextLog.push(
                "Main scheme threat limit reached. You lose!"
            );
        }
    });

    return {
        hero: nextHero,
        villain: nextVillain,
        log: nextLog,
        gameStatus: nextGameStatus,
    };
}
