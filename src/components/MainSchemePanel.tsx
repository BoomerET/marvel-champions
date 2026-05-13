import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function MainSchemePanel() {
    const mainScheme = useGameStore((s) => s.mainScheme);

    return (
        <section>
            <h2>Main Scheme</h2>

            <CardView
                card={mainScheme.card}
                size="small"
                face="b"
                hideThreat
            />

            <div>
                Threat: {mainScheme.threat} / {mainScheme.threatLimit}
            </div>
        </section>
    );
}
