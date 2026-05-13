import type { GameState, VillainState } from "../types";
import { createCardInstance } from "../../utils/createCardInstance";

export function checkVillainDefeat({
    state,
    villain,
    log,
}: {
    state: GameState;
    villain: VillainState;
    log: string[];
}): {
    villain: VillainState;
    gameStatus: GameState["gameStatus"];
    log: string[];
} {
    if (villain.hitPoints > 0) {
        return {
            villain,
            gameStatus: state.gameStatus,
            log,
        };
    }

    const nextStage = villain.stage + 1;

    const nextVillainCard = state.villainCards.find(
        (card) => card.stage === nextStage
    );

    if (!nextVillainCard) {
        return {
            villain: {
                ...villain,
                hitPoints: 0,
            },
            gameStatus: "won",
            log: [
                ...log,
                "Villain defeated. You win!",
            ],
        };
    }

    return {
        villain: {
            identity: createCardInstance(nextVillainCard),
            stage: nextStage,
            hitPoints: nextVillainCard.hp ?? 0,
        },
        gameStatus: state.gameStatus,
        log: [
            ...log,
            `Villain advanced to stage ${nextStage}.`,
        ],
    };
}
