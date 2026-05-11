import type { GameState, MainSchemeState } from "../types";
import { rhinoMainSchemes } from "../../data/schemes/rhinoMainScheme";
import { createCardInstance } from "../../utils/createCardInstance";

export function checkMainSchemeAdvance({
    state,
    mainScheme,
    log,
}: {
    state: GameState;
    mainScheme: MainSchemeState;
    log: string[];
}): {
    mainScheme: MainSchemeState;
    gameStatus: GameState["gameStatus"];
    log: string[];
} {
    if (mainScheme.threat < mainScheme.threatLimit) {
        return {
            mainScheme,
            gameStatus: state.gameStatus,
            log,
        };
    }

    const nextStage = mainScheme.stage + 1;
    const nextSchemeCard = rhinoMainSchemes[nextStage - 1];

    if (!nextSchemeCard) {
        return {
            mainScheme,
            gameStatus: "lost",
            log: [
                ...log,
                "Main scheme threat limit reached. You lose!",
            ],
        };
    }

    return {
        mainScheme: {
            card: createCardInstance(nextSchemeCard),
            stage: nextStage,
            threat: 0,
            threatLimit: nextSchemeCard.threatLimit ?? mainScheme.threatLimit,
        },
        gameStatus: state.gameStatus,
        log: [
            ...log,
            `Main scheme advanced to stage ${nextStage}: ${nextSchemeCard.name}.`,
        ],
    };
}
