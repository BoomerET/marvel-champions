import type { Card } from "../../game/types";

export const leadershipPlayerCards: Card[] = [
  {
    "code": "01066",
    "name": "Hawkeye",
    "type": "ally",
    "image": "01066",
    "text": [
      "Hawkeye enters play with 4 arrow counters on him.",
      "Response: After a minion enters play, remove 1 arrow counter from Hawkeye → deal 2 damage to that minion."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01067",
    "name": "Maria Hill",
    "type": "ally",
    "image": "01067",
    "text": [
      "Response: After Maria Hill enters play, each player draws 1 card."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01068",
    "name": "Vision",
    "type": "ally",
    "image": "01068",
    "text": [
      "Action: Spend a [energy] resource → choose THW or ATK. Until the end of the phase, Vision gets +2 to the chosen power. (Limit once per round.)"
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01069",
    "name": "Get Ready",
    "type": "event",
    "image": "01069",
    "text": [
      "Action: Ready an ally."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01070",
    "name": "Lead from the Front",
    "type": "event",
    "image": "01070",
    "text": [
      "Hero Action: Choose a player. Each character that player controls gets +1 THW and +1 ATK until the end of the phase."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01071",
    "name": "Make the Call",
    "type": "event",
    "image": "01071",
    "text": [
      "Action: Pay the printed cost of an ally in any player's discard pile → put that ally into play under your control."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01072",
    "name": "The Power of Leadership",
    "type": "resource",
    "image": "01072",
    "text": [
      "Max 2 per deck.",
      "Double the number of resources this card generates while paying for a Leadership (blue) card."
    ],
    "resources": [
      "wild"
    ]
  },
  {
    "code": "01073",
    "name": "The Triskelion",
    "type": "support",
    "image": "01073",
    "text": [
      "Increase your ally limit by 1. (This allows you to control more than 3 allies.)"
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01074",
    "name": "Inspired",
    "type": "upgrade",
    "image": "01074",
    "text": [
      "Attach to an ally. Max 1 per ally.",
      "Attached ally gets +1 THW and +1 ATK."
    ],
    "resources": [
      "physical"
    ]
  }
]
