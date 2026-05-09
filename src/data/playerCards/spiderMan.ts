import type { Card } from "../../game/types";

export const spiderManPlayerCards: Card[] = [
  {
    "code": "01002",
    "name": "Black Cat",
    "type": "ally",
    "image": "01002",
    "text": [
      "Forced Response: After you play Black Cat, discard the top 2 cards of your deck. Add each card with a printed [mental] resource discarded this way to your hand."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01003",
    "name": "Backflip",
    "type": "event",
    "image": "01003",
    "text": [
      "Interrupt (defense): When you would take any amount of damage from an attack, prevent all of that damage."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01004",
    "name": "Enhanced Spider-Sense",
    "type": "event",
    "image": "01004",
    "text": [
      "Hero Interrupt: When a treachery card is revealed from the encounter deck, cancel its \"When Revealed\" effects."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01005",
    "name": "Swinging Web Kick",
    "type": "event",
    "image": "01005",
    "text": [
      "Hero Action (attack): Deal 8 damage to an enemy."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01006",
    "name": "Aunt May",
    "type": "support",
    "image": "01006",
    "text": [
      "Alter-Ego Action: Exhaust Aunt May → heal 4 damage from Peter Parker."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01007",
    "name": "Spider-Tracer",
    "type": "upgrade",
    "image": "01007",
    "text": [
      "Attach to a minion.",
      "Forced Interrupt: When attached minion is defeated, remove 3 threat from a scheme."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01008",
    "name": "Web-Shooter",
    "type": "upgrade",
    "image": "01008",
    "text": [
      "Uses (3 web counters). (Enters play with 3 counters. When those are gone, discard this card)",
      "Hero Resource: Exhaust Web-Shooter and remove 1 web counter from it → generate a [wild] resource."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01009",
    "name": "Webbed Up",
    "type": "upgrade",
    "image": "01009",
    "text": [
      "Hero form only. Attach to an enemy. Max 1 per enemy.",
      "Forced Interrupt: When attached enemy would attack, discard Webbed Up instead. Then, stun that enemy."
    ],
    "resources": [
      "physical"
    ]
  }
]

