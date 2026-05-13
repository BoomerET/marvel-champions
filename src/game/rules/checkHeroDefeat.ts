import type { GameState, HeroState } from "../types";

export function checkHeroDefeat({
    state,
    hero,
    log,
}: {
    state: GameState;
    hero: HeroState;
    log: string[];
}): {
    hero: HeroState;
    gameStatus: GameState["gameStatus"];
    log: string[];
} {
    if (hero.hitPoints > 0) {
        return {
            hero,
            gameStatus: state.gameStatus,
            log,
        };
    }

    return {
        hero: {
            ...hero,
            hitPoints: 0,
        },
        gameStatus: "lost",
        log: [
            ...log,
            "Hero defeated. You lose!",
        ],
    };
}
