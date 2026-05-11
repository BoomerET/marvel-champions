import type {
    GameState,
    GameStatus,
    HeroState,
    MainSchemeState,
} from "../types";

import { checkMainSchemeAdvance } from "./checkMainSchemeAdvance";

export function resolveMinionActivation({
    state,
    hero,
    mainScheme,
    log,
}: {
    state: GameState;
    hero: HeroState;
    mainScheme: MainSchemeState;
    log: string[];
}): {
    hero: HeroState;
    mainScheme: MainSchemeState;
    log: string[];
    gameStatus: GameStatus;
} {
    let nextHero = hero;
    let nextMainScheme = mainScheme;
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
        const nextThreat = nextMainScheme.threat + scheme;

        nextMainScheme = {
            ...nextMainScheme,
            threat: nextThreat,
        };

        nextLog.push(
            `${minion.name} schemed for ${scheme} threat.`
        );
    });

    const checked = checkMainSchemeAdvance({
        state: {
            ...state,
            gameStatus: nextGameStatus,
        },
        mainScheme: nextMainScheme,
        log: nextLog,
    });

    return {
        hero: nextHero,
        mainScheme: checked.mainScheme,
        log: checked.log,
        gameStatus:
            nextGameStatus === "lost"
                ? "lost"
                : checked.gameStatus,
    };
}
