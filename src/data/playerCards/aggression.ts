import type { Card } from "../../game/types";

export const basicPlayerCards: Card[] = [
  {
    "code": "01050",
    "name": "Hulk",
    "type": "ally",
    "image": "01050",
    "text": [
      "Forced Response: After Hulk attacks, discard the top card of your deck. If that card's printed resource has:",
      "[physical] - Deal 2 damage to an enemy.",
      "[energy] - Deal 1 damage to each character.",
      "[mental] - Discard Hulk.",
      "[wild] - All of the above."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01051",
    "name": "Tigra",
    "type": "ally",
    "image": "01051",
    "text": [
      "Response: After Tigra attacks and defeats a minion, heal 1 damage from her."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01052",
    "name": "Chase Them Down",
    "type": "event",
    "image": "01052",
    "text": [
      "Response (thwart): After your hero attacks and defeats an enemy, remove 2 threat from a scheme."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01053",
    "name": "Relentless Assault",
    "type": "event",
    "image": "01053",
    "text": [
      "Hero Action (attack): Deal 5 damage to a minion. If you paid for this card using a [physical] resource, this attack gains overkill. (Excess damage from this attack is dealt to the villain.)"
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01054",
    "name": "Uppercut",
    "type": "event",
    "image": "01054",
    "text": [
      "Hero Action (attack): Deal 5 damage to an enemy."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01055",
    "name": "The Power of Aggression",
    "type": "resource",
    "image": "01055",
    "text": [
      "Max 2 per deck.",
      "Double the number of resources this card generates while paying for a Aggression (red) card."
    ],
    "resources": [
      "wild"
    ]
  },
  {
    "code": "01056",
    "name": "Tac Team",
    "type": "support",
    "image": "01056",
    "text": [
      "Uses (3 attack counters). (Enters play with 3 counters. When those are gone, discard this card)",
      "Action: Exhaust Tac Team and remove 1 attack counter from it → deal 2 damage to an enemy."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01057",
    "name": "Combat Training",
    "type": "upgrade",
    "image": "01057",
    "text": [
      "Play under any player's control. Max 1 per player.",
      "Your hero gets +1 ATK."
    ],
    "resources": [
      "physical"
    ]
  }
]
