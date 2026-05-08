import { useState } from "react";
import { useGameStore } from "../store/gameStore";

export function DeckLoader() {
    const [deckId, setDeckId] = useState("");
    const [error, setError] = useState<string | null>(null);

    const loadMarvelCdbDeck = useGameStore(
        (s) => s.loadMarvelCdbDeck
    );

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        try {
            await loadMarvelCdbDeck(deckId.trim());
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load deck."
            );
        }
    }

    return (
        <section className="deck-loader">
            <form onSubmit={handleSubmit}>
                <label>
                    MarvelCDB Deck ID{" "}
                    <input
                        value={deckId}
                        onChange={(event) => setDeckId(event.target.value)}
                        placeholder="1170315"
                    />
                </label>

                <button type="submit">
                    Load Deck
                </button>
            </form>

            {error && <div className="error">{error}</div>}
        </section>
    );
}
