import type { Card } from "../../game/types";

export const spiderManCards: Card[] = [
  {
    code: "01001",
    name: "Spider-Man",
    type: "hero",
    image: "01001",
    hp: 10,
    text: ["Enhanced Spider-Sense."],
  },

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

  {
    code: "01008",
    name: "Web-Shooter",
    type: "upgrade",
    image: "01008",
    cost: 1,
    text: ["Resource generation."],
  },

  {
    code: "01002",
    name: "Black Cat",
    type: "ally",
    image: "01002",
    cost: 2,
    hp: 2,
    text: ["Forced Response: After you play Black Cat, discard the top 2 cards of your deck."],
  },

  {
    code: "01006",
    name: "Aunt May",
    type: "support",
    image: "01006",
    cost: 1,
    text: ["Heal 4 damage."],
  },

  {
    code: "01088",
    name: "Energy",
    type: "resource",
    image: "01088",
    text: ["Max 1 per deck."],
  },

  {
    code: "01087",
    name: "Genius",
    type: "resource",
    image: "01087",
    text: ["Max 1 per deck."],
  },

  {
    code: "01090",
    name: "Strength",
    type: "resource",
    image: "01090",
    text: ["Max 1 per deck."],
  },
];
