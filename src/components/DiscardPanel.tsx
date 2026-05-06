import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function DiscardPanel() {
    const discard = useGameStore((s) => s.hero.discard);
    const topCard = discard.at(-1);

    return (
        <section className="zone-panel">
            <h2>Discard ({discard.length})</h2>

            {topCard ? (
                <CardView card={topCard} size="small" />
            ) : (
                <div className="empty-zone">
                    No cards in discard.
                </div>
            )}
        </section>
    );
}
