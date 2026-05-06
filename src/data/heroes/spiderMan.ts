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
    code: "01006",
    name: "Swinging Web Kick",
    type: "event",
    image: "01006",
    cost: 3,
    text: ["Hero Action: Deal 8 damage."],
  },

  {
    code: "01007",
    name: "Backflip",
    type: "event",
    image: "01007",
    cost: 0,
    text: ["Prevent all damage from an attack."],
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
    code: "01009",
    name: "Black Cat",
    type: "ally",
    image: "01009",
    cost: 2,
    hp: 2,
    text: ["Does not take consequential damage."],
  },

  {
    code: "01010",
    name: "Aunt May",
    type: "support",
    image: "01010",
    cost: 1,
    text: ["Heal 4 damage."],
  },

  {
    code: "01011",
    name: "Energy",
    type: "resource",
    image: "01011",
    text: ["Double resource."],
  },

  {
    code: "01012",
    name: "Genius",
    type: "resource",
    image: "01012",
    text: ["Double resource."],
  },

  {
    code: "01013",
    name: "Strength",
    type: "resource",
    image: "01013",
    text: ["Double resource."],
  },
];
