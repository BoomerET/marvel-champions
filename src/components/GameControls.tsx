import { useGameStore } from "../store/gameStore";

export function GameControls() {
    const drawCards = useGameStore((s) => s.drawCards);
    const endTurn = useGameStore((s) => s.endTurn);
    const readyAllHeroCards = useGameStore(
        (s) => s.readyAllHeroCards
    );

    return (
        <section className="game-controls">
            <button onClick={endTurn}>
                End Turn
            </button>

            <button onClick={readyAllHeroCards}>
                Ready All
            </button>
        </section>
    );
}