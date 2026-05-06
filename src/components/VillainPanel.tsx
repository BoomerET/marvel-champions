import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function VillainPanel() {
    return (
        <section>
            <h2>Villain</h2>
            <div>Rhino</div>
            <div>HP: 14</div>
            <div>Main Scheme Threat: 0</div>
            {/* <CardView card={villain.villain} size="small" /> */}
        </section>

    );
}
