import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function VillainPanel() {
    const villain = useGameStore((s) => s.villain);
    const damageVillain = useGameStore((s) => s.damageVillain);

    return (
        <section>
            <h2>Villain</h2>

            <CardView
                card={villain.identity}
                size="small"
                face="a"
            />

            <div>HP: {villain.hitPoints}</div>
            <div>Main Scheme Threat: {villain.threat}</div>
            <button onClick={() => damageVillain(1)}>Damage 1</button>
            <button onClick={() => damageVillain(3)}>Damage 3</button>
        </section>
    );
}
