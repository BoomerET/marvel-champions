import type { Card } from "../../game/types";

export const spiderManPlayerCards: Card[] = [
    {
        code: "01005",
        name: "Swinging Web Kick",
        type: "event",
        image: "01005",
        cost: 3,
        text: ["Hero Action: Deal 8 damage."],
    },
    {
        code: "01003",
        name: "Backflip",
        type: "event",
        image: "01003",
        cost: 0,
        text: ["Interrupt (defense): When you would take any amount of damage from an attack, prevent all of that damage."],
    },
];
