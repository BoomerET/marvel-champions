import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function EncounterDiscardPanel() {
    const discard = useGameStore((s) => s.encounterDiscard);
    const topCard = discard.at(-1);

    return (
        <section className="zone-panel">
            <h2>Encounter Discard ({discard.length})</h2>

            {topCard ? (
                <CardView card={topCard} size="small" />
            ) : (
                <div className="empty-zone">
                    No encounter cards discarded.
                </div>
            )}
        </section>
    );
}
