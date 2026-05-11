import { useGameStore } from "../store/gameStore";

export function GameControls() {
    const endTurn = useGameStore((s) => s.endTurn);
    //const gameStatus = useGameStore((s) => s.gameStatus);
    const dealEncounterCard = useGameStore((s) => s.dealEncounterCard);
    const readyAllHeroCards = useGameStore(
        (s) => s.readyAllHeroCards
    );

    const pendingPayment = useGameStore((s) => s.hero.pendingPayment);
    const confirmPlayCard = useGameStore((s) => s.confirmPlayCard);
    const cancelPayment = useGameStore((s) => s.cancelPayment);

    return (
        <section className="game-controls">
            <button onClick={endTurn}>
                End Turn
            </button>

            <button onClick={readyAllHeroCards}>
                Ready All
            </button>

            <button onClick={dealEncounterCard}>
                Deal Encounter
            </button>

            {pendingPayment && (
                <>
                    <button onClick={confirmPlayCard}>
                        Confirm Play
                    </button>

                    <button onClick={cancelPayment}>
                        Cancel Payment
                    </button>
                </>
            )}
        </section>
    );
}