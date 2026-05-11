import { useGameStore } from "../store/gameStore";

export function GameStatusBanner() {
    const gameStatus = useGameStore((s) => s.gameStatus);

    if (gameStatus === "playing") {
        return null;
    }

    return (
        <div className={`game-status-banner game-status-banner--${gameStatus}`}>
            {gameStatus === "won" ? "You Win!" : "You Lose!"}
        </div>
    );
}
