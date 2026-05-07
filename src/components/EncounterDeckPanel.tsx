import { useGameStore } from "../store/gameStore";

export function EncounterDeckPanel() {
    const encounterDeckCount = useGameStore(
        (s) => s.encounterDeck.length
    );
    const dealEncounterCard = useGameStore(
        (s) => s.dealEncounterCard
    );

    return (
        <section className="zone-panel">
            <h2>Encounter Deck</h2>

            <div className="deck-pile">
                <div className="encounter-deck-card-back">
                    {encounterDeckCount}
                </div>
            </div>

            <button onClick={dealEncounterCard}>
                Deal Encounter
            </button>
        </section>
    );
}
