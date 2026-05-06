import { useGameStore } from "../store/gameStore";

export function DeckPanel() {
    const deckCount = useGameStore((s) => s.hero.deck.length);
    const drawCards = useGameStore((s) => s.drawCards);

    return (
        <section className="zone-panel">
            <h2>Deck</h2>

            <div className="deck-pile">
                <div className="deck-card-back">
                    {deckCount}
                </div>
            </div>

            <button onClick={() => drawCards(1)}>Draw 1</button>
            <button onClick={() => drawCards(5)}>Draw 5</button>
        </section>
    );
}
