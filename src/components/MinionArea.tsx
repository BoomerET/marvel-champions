import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function MinionArea() {
    const minions = useGameStore(
        (s) => s.minions
    );

    return (
        <section>
            <h2>
                Minions ({minions.length})
            </h2>

            <div className="minion-area">
                {minions.length === 0 ? (
                    <div className="empty-zone">
                        No minions engaged.
                    </div>
                ) : (
                    minions.map((card) => (
                        <CardView
                            key={card.instanceId}
                            card={card}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
