import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function VillainPanel() {
    const villain = useGameStore((s) => s.villain);
    const damageVillain = useGameStore((s) => s.damageVillain);
    const addThreat = useGameStore((s) => s.addThreat);
    const removeThreat = useGameStore((s) => s.removeThreat);

    return (
        <section>
            <h2>Villain</h2>

            <CardView
                card={villain.identity}
                size="small"
                face="a"
            />

            <div>HP: {villain.hitPoints}</div>
            <div>Stage: {villain.stage}</div>

            <button onClick={() => addThreat(1)}>Threat +1</button>
            <button onClick={() => removeThreat(1)}>Threat -1</button>
            <button onClick={() => damageVillain(1)}>Damage 1</button>
            <button onClick={() => damageVillain(3)}>Damage 3</button>
        </section>
    );
}
