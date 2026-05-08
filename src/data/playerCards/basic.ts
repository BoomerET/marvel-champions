import type { Card } from "../../game/types";

export const basicPlayerCards: Card[] = [
    {
        code: "01088",
        name: "Energy",
        type: "resource",
        image: "01088",
        text: ["Max 1 per deck."],
        resources: ["energy"],
    },
    {
        code: "01083",
        name: "Mockingbird",
        type: "ally",
        image: "01083",
        text: ["Response: After Mockingbird enters play, stun an enemy."],
        resources: ["physical"],
    },
    {
        code: "01084",
        name: "Nick Fury",
        type: "ally",
        image: "01084",
        text: ["Forced Response: After Nick Fury enters play, choose one: remove 2 threat from a scheme, draw 3 cards or deal 4 damage to an enemy."],
        resources: ["mental"],
    },
];
