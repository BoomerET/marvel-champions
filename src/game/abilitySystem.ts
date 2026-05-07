import type { GameEvent } from "./events";

export function handleTriggeredAbilities(event: GameEvent) {
    switch (event.type) {
        case "BASIC_ATTACK":
            console.log(
                "Ability system saw BASIC_ATTACK:",
                event
            );
            break;

        case "DAMAGE_DEALT":
            console.log(
                "Ability system saw DAMAGE_DEALT:",
                event
            );
            break;

        default:
            break;
    }
}
