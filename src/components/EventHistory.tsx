import { useGameStore } from "../store/gameStore";

export function EventHistory() {
    const eventHistory = useGameStore(
        (s) => s.eventHistory
    );

    return (
        <section>
            <h2>
                Event History ({eventHistory.length})
            </h2>

            <div className="event-history">
                {eventHistory.length === 0 ? (
                    <div className="empty-zone">
                        No events recorded.
                    </div>
                ) : (
                    eventHistory
                        .slice()
                        .reverse()
                        .map((event, index) => (
                            <pre key={index}>
                                {JSON.stringify(event, null, 2)}
                            </pre>
                        ))
                )}
            </div>
        </section>
    );
}
