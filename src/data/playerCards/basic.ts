import type { Card } from "../../game/types";

export const basicPlayerCards: Card[] = [
  {
    "code": "01083",
    "name": "Mockingbird",
    "type": "ally",
    "image": "01083",
    "text": [
      "Response: After Mockingbird enters play, stun an enemy."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01084",
    "name": "Nick Fury",
    "type": "ally",
    "image": "01084",
    "text": [
      "Forced Response: After Nick Fury enters play, choose one: remove 2 threat from a scheme, draw 3 cards, or deal 4 damage to an enemy. At the end of the round, if Nick Fury is still in play, discard him."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01085",
    "name": "Emergency",
    "type": "event",
    "image": "01085",
    "text": [
      "Interrupt (thwart): When the villain schemes, reduce the amount of threat placed on the scheme by 1."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01086",
    "name": "First Aid",
    "type": "event",
    "image": "01086",
    "text": [
      "Action: Heal 2 damage from any character."
    ],
    "resources": [
      "mental"
    ],
    "playEffect": {
      "type": "healHero",
      "amount": 2,
    },
    "cost": 1,
  },
  {
    "code": "01087",
    "name": "Haymaker",
    "type": "event",
    "image": "01087",
    "text": [
      "Hero Action (attack): Deal 3 damage to an enemy."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01088",
    "name": "Energy",
    "type": "resource",
    "image": "01088",
    "text": [
      "Max 1 per deck."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01089",
    "name": "Genius",
    "type": "resource",
    "image": "01089",
    "text": [
      "Max 1 per deck."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01090",
    "name": "Strength",
    "type": "resource",
    "image": "01090",
    "text": [
      "Max 1 per deck."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01091",
    "name": "Avengers Mansion",
    "type": "support",
    "image": "01091",
    "text": [
      "Max 1 per player.",
      "Action: Exhaust Avengers Mansion → choose a player. That player draws 1 card."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01092",
    "name": "Helicarrier",
    "type": "support",
    "image": "01092",
    "text": [
      "Max 1 per player.",
      "Action: Exhaust Helicarrier → choose a player. Reduce the resource cost of the next card that player plays this phase by 1."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01093",
    "name": "Tenacity",
    "type": "upgrade",
    "image": "01093",
    "text": [
      "Hero Action: Spend a [physical] resource and discard this card → ready your hero."
    ],
    "resources": [
      "energy"
    ]
  }
]

