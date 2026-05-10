import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function MinionArea() {
    const minions = useGameStore(
        (s) => s.minions
    );

    const selectedAttackTarget = useGameStore(
        (s) => s.selectedAttackTarget
    );

    const selectAttackTarget = useGameStore(
        (s) => s.selectAttackTarget
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
                            isSelected={
                                selectedAttackTarget === card.instanceId
                            }
                            onClick={() =>
                                selectAttackTarget(
                                    selectedAttackTarget === card.instanceId
                                        ? undefined
                                        : card.instanceId
                                )
                            }
                        />
                    ))
                )}
            </div>
        </section>
    );
}
