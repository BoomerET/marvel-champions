import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function SideSchemeArea() {
    const sideSchemes = useGameStore(
        (s) => s.sideSchemes
    );

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
                        />
                    ))
                )}
            </div>
        </section>
    );
}
