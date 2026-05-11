import { useState } from "react";
import { scenarios, type ScenarioId } from "../data/scenarios";
import { useGameStore } from "../store/gameStore";

export function ScenarioSelector() {
    const [scenarioId, setScenarioId] = useState("rhino");
    const newGame = useGameStore((s) => s.newGame);

    return (
        <section className="scenario-selector">
            <label>
                Scenario{" "}
                <select
                    value={scenarioId}
                    onChange={(event) =>
                        setScenarioId(event.target.value as ScenarioId)
                    }
                >
                    {Object.values(scenarios).map((scenario) => (
                        <option key={scenario.id} value={scenario.id}>
                            {scenario.name}
                        </option>
                    ))}
                </select>
            </label>

            <button onClick={() => newGame(scenarioId)}>
                Start Scenario
            </button>
        </section>
    );
}
