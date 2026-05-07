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

        case "BASIC_THWART":
            console.log(
                "Ability system saw BASIC_THWART:",
                event
            );
            break;

        case "THREAT_REMOVED":
            console.log(
                "Ability system saw THREAT_REMOVED:",
                event
            );
            break;

        case "BASIC_RECOVER":
            console.log(
                "Ability system saw BASIC_RECOVER:",
                event
            );
            break;

        case "HEALING_DONE":
            console.log(
                "Ability system saw HEALING_DONE:",
                event
            );
            break;

        case "VILLAIN_ATTACK":
            console.log(
                "Ability system saw VILLAIN_ATTACK:",
                event
            );
            break;

        case "VILLAIN_SCHEME":
            console.log(
                "Ability system saw VILLAIN_SCHEME:",
                event
            );
            break;

        default:
            break;
    }
}
