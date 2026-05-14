// DebugPanel.tsx
import { useState } from "react";
import { GameLog } from "./GameLog";
import { EventHistory } from "./EventHistory";

export function DebugPanel() {
    const [open, setOpen] = useState(false);

    return (
        <section className="debug-panel">
            <button onClick={() => setOpen((current) => !current)}>
                {open ? "Hide Logs" : "Show Logs"}
            </button>

            {open && (
                <div className="debug-content">
                    <GameLog />
                    <EventHistory />
                </div>
            )}
        </section>
    );
}
