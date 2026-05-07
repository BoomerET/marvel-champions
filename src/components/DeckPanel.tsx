import { useGameStore } from "../store/gameStore";
import { getDeckBackImage } from "../utils/deckBackImages";

export function DeckPanel() {
    const deckCount = useGameStore((s) => s.hero.deck.length);
    const drawCards = useGameStore((s) => s.drawCards);

    const backImage = getDeckBackImage(
        "player-back.webp"
    );

    return (
        <section className="zone-panel">
            <h2>Deck</h2>

            <div className="deck-pile">
                <img
                    src={backImage}
                    alt="Player Deck"
                    className="deck-back-image"
                />

                <div className="deck-count">
                    {deckCount}
                </div>
            </div>

            <button onClick={() => drawCards(1)}>
                Draw 1
            </button>

            <button onClick={() => drawCards(5)}>
                Draw 5
            </button>
        </section>
    );
}
