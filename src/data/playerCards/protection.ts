import type { Card } from "../../game/types";

export const protectionPlayerCards: Card[] = [
  {
    "code": "01075",
    "name": "Black Widow",
    "type": "support",
    "image": "01075",
    "text": [
      "Max 1 per player. Response: After you defeat a minion, exhaust Interrogation Room → remove 1 threat from a scheme."
    ],
    "resources": [
      "energy"
    ],
    "activatedAbility": {
      type: "removeThreat",
      amount: 1,
    },
    "cost": 1,
  },
  {
    "code": "01076",
    "name": "Luke Cage",
    "type": "ally",
    "image": "01076",
    "text": [
      "Toughness. (This character enters play with a tough status card.)"
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01077",
    "name": "Counter-Punch",
    "type": "event",
    "image": "01077",
    "text": [
      "Response (attack): After your hero defends against an enemy attack, deal damage to that enemy equal to your hero's ATK."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01078",
    "name": "Get Behind Me!",
    "type": "event",
    "image": "01078",
    "text": [
      "Hero Interrupt: When a treachery card is revealed from the encounter deck, cancel its \"When Revealed\" effects. The villain attacks you instead."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01079",
    "name": "The Power of Protection",
    "type": "resource",
    "image": "01079",
    "text": [
      "Max 2 per deck.",
      "Double the number of resources this card generates while paying for a Protection (green) card."
    ],
    "resources": [
      "wild"
    ]
  },
  {
    "code": "01080",
    "name": "Med Team",
    "type": "support",
    "image": "01080",
    "text": [
      "Uses (3 medical counters). (Enters play with 3 counters. When those are gone, discard this card.)",
      "Action: Exhaust Med Team and remove 1 medical counter from it → heal 2 damage from a friendly character."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01081",
    "name": "Armored Vest",
    "type": "upgrade",
    "image": "01081",
    "text": [
      "Play under any player's control. Max 1 per player.",
      "Your hero gets +1 DEF."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01082",
    "name": "Indomitable",
    "type": "upgrade",
    "image": "01082",
    "text": [
      "Response: After your hero defends, discard indomitable → ready your hero."
    ],
    "resources": [
      "energy"
    ]
  }
]
