import type { GameEvent } from "./events";
import { handleTriggeredAbilities } from "./abilitySystem";

export function dispatchGameEvent(event: GameEvent) {
    console.log("EVENT", event);

    handleTriggeredAbilities(event);
}