import type { Card } from "../../game/types";

export const spiderManCards: Card[] = [
  {
    code: "01001",
    name: "Spider-Man",
    type: "hero",
    text: ["Enhanced Spider-Sense."],
    hp: 10,
    image: "01001.webp",
  },
  {
    code: "01005",
    name: "Swinging Web Kick",
    type: "event",
    cost: 3,
    text: ["Hero Action: Deal 8 damage."],
    image: "01005.webp",
  },
];

