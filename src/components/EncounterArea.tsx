import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function EncounterArea() {
    const encounterArea = useGameStore((s) => s.encounterArea);
    const resolveEncounterCard = useGameStore(
        (s) => s.resolveEncounterCard
    );

    return (
        <section>
            <h2>Encounter Area ({encounterArea.length})</h2>

            <div className="encounter-area">
                {encounterArea.length === 0 ? (
                    <div className="empty-zone">
                        No encounter cards dealt.
                    </div>
                ) : (
                    encounterArea.map((card) => (
                        <CardView
                            key={card.instanceId}
                            card={card}
                            size="small"
                            onClick={() => resolveEncounterCard(card.instanceId)}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
