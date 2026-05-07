import { useGameStore } from "../store/gameStore";
import { getDeckBackImage } from "../utils/deckBackImages";

export function EncounterDeckPanel() {
    const encounterDeckCount = useGameStore(
        (s) => s.encounterDeck.length
    );

    const dealEncounterCard = useGameStore(
        (s) => s.dealEncounterCard
    );

    const backImage = getDeckBackImage(
        "encounter-back.webp"
    );

    return (
        <section className="zone-panel">
            <h2>Encounter Deck</h2>

            <div className="deck-pile">
                <img
                    src={backImage}
                    alt="Encounter Deck"
                    className="deck-back-image"
                />

                <div className="deck-count">
                    {encounterDeckCount}
                </div>
            </div>

            <button onClick={dealEncounterCard}>
                Deal Encounter
            </button>
        </section>
    );
}
