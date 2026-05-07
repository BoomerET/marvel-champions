import type { GameEvent } from "./events";

export function dispatchGameEvent(
    event: GameEvent
) {
    console.log("EVENT", event);
}
