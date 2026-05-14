import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function SideSchemeArea() {
    const sideSchemes = useGameStore(
        (s) => s.sideSchemes
    );

    const selectedTarget = useGameStore((s) => s.selectedTarget);
    const selectTarget = useGameStore((s) => s.selectTarget);

    return (
        <section>
            <h2>
                Side Schemes ({sideSchemes.length})
            </h2>

            <div className="side-scheme-area">
                {sideSchemes.length === 0 ? (
                    <div className="empty-zone">
                        No side schemes in play.
                    </div>
                ) : (
                    sideSchemes.map((card) => (
                        <CardView
                            key={card.instanceId}
                            card={card}
                            size="small"
                            isSelected={selectedTarget === card.instanceId}
                            onClick={() =>
                                selectTarget(
                                    selectedTarget === card.instanceId
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
