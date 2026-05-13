import type { Card } from "../../game/types";

export const justicePlayerCards: Card[] = [
  {
    "code": "01059",
    "name": "Jessica Jones",
    "type": "ally",
    "image": "01059",
    "text": [
      "Jessica Jones gets +1 THW for each side scheme in play."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01058",
    "name": "Daredevil",
    "type": "ally",
    "image": "01058",
    "text": [
      "Response: After Daredevil thwarts, deal 1 damage to an enemy."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01060",
    "name": "For Justice!",
    "type": "event",
    "image": "01060",
    "text": [
      "Hero Action (thwart): Remove 3 threat from a scheme (4 threat instead if you paid for this card using a [mental] resource)."
    ],
    "resources": [
      "energy"
    ],
    "playEffect": {
      "type": "removeThreat",
      "amount": 3,
    },
    "cost": 2,
  },
  {
    "code": "01061",
    "name": "Great Responsibility",
    "type": "event",
    "image": "01061",
    "text": [
      "Hero Interrupt: When any amount of threat would be placed on a scheme, you take it as damage instead."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01062",
    "name": "The Power of Justice",
    "type": "resource",
    "image": "01062",
    "text": [
      "Max 2 per deck.",
      "Double the number of resources this card generates while paying for a Justice (yellow) card."
    ],
    "resources": [
      "wild"
    ]
  },
  {
    "code": "01063",
    "name": "Interrogation Room",
    "type": "support",
    "image": "01063",
    "text": [
      "Max 1 per player.",
      "Response: After you defeat a minion, exhaust Interrogation Room → remove 1 threat from a scheme."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01064",
    "name": "Surveillance Team",
    "type": "support",
    "image": "01064",
    "text": [
      "Uses (3 snoop counters). (Enters play with 3 counters. When those are gone, discard this card)",
      "Action: Exhaust Surveillance Team and remove 1 snoop counter from it → remove 1 threat from a scheme."
    ],
    "resources": [
      "mental"
    ],
    "cost": 2,
    "uses": 3,
    "activatedAbility": {
      type: "removeThreat",
      amount: 1,
    },
  },
  {
    "code": "01065",
    "name": "Heroic Intuition",
    "type": "upgrade",
    "image": "01065",
    "text": [
      "Play under any player's control. Max 1 per player.",
      "Your hero gets +1 THW."
    ],
    "resources": [
      "energy"
    ]
  }
]
