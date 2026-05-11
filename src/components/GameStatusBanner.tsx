import { useGameStore } from "../store/gameStore";

export function GameStatusBanner() {
    const gameStatus = useGameStore((s) => s.gameStatus);
    const newGame = useGameStore((s) => s.newGame);

    if (gameStatus === "playing") {
        return null;
    }

    return (
        <div className={`game-status-banner game-status-banner--${gameStatus}`}>
            <div>
                {gameStatus === "won" ? "You Win!" : "You Lose!"}
            </div>

            <button onClick={newGame}>
                New Game
            </button>
        </div>
    );
}
