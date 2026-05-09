import type { Card } from "../../game/types";

export const ironManHero: Card = {
    code: "01029",
    name: "Iron Man",
    type: "hero",
    image: "01029",
    hp: 9,
    attack: 1,
    thwart: 2,
    defense: 1,
    recover: 3,
    text: [
        "Futurist — Action: Look at the top 3 cards of your deck. Add 1 to your hand and discard the others. (Limit once per round.)"
    ],
};