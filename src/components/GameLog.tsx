import { useGameStore } from "../store/gameStore";

export function GameLog() {
    const log = useGameStore((s) => s.log);

    return (
        <section>
            <h2>Log</h2>

            <ul>
                {log.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </section>
    );
}
