import { useGameStore } from "../store/gameStore";

export function GameControls() {
    const drawCards = useGameStore((s) => s.drawCards);
    const endTurn = useGameStore((s) => s.endTurn);
    const readyAllHeroCards = useGameStore(
        (s) => s.readyAllHeroCards
    );

    return (
        <section className="game-controls">
            <button onClick={() => drawCards(1)}>
                Draw 1
            </button>

            <button onClick={() => drawCards(5)}>
                Draw 5
            </button>

            <button onClick={endTurn}>
                End Turn
            </button>

            <button onClick={readyAllHeroCards}>
                Ready All
            </button>
        </section>
    );
}