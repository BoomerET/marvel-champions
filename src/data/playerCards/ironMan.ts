import type { Card } from "../../game/types";

export const ironManPlayerCards: Card[] = [
  {
    "code": "01030",
    "name": "War Machine",
    "type": "ally",
    "image": "01030",
    "text": [
      "Action: Exhaust War Machine and deal 2 damage to him → deal 1 damage to each enemy."
    ],
    "resources": [
      "wild"
    ]
  },
  {
    "code": "01031",
    "name": "Repulsor Blast",
    "type": "event",
    "image": "01031",
    "text": [
      "Hero Action (attack): Deal 1 damage to an enemy and discard the top 5 cards of your deck. For each printed [energy] resource discarded this way, deal 2 additional damage to that enemy."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01032",
    "name": "Supersonic Punch",
    "type": "event",
    "image": "01032",
    "text": [
      "Hero Action (attack): Deal 4 damage to an enemy (8 damage instead if you have the [[Aerial]] trait)."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01033",
    "name": "Pepper Potts",
    "type": "support",
    "image": "01033",
    "text": [
      "Resource: Exhaust Pepper Potts → generate the resources of the top card in your discard pile."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01034",
    "name": "Stark Tower",
    "type": "support",
    "image": "01034",
    "text": [
      "Alter-Ego Action: Exhaust Stark Tower → choose a player. That player returns the topmost [[Tech]] upgrade in their discard pile to their hand."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01035",
    "name": "Arc Reactor",
    "type": "upgrade",
    "image": "01035",
    "text": [
      "Hero Action: Exhaust Arc Reactor → ready Iron Man."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01036",
    "name": "Mark V Armor",
    "type": "upgrade",
    "image": "01036",
    "text": [
      "You get +6 hit points."
    ],
    "resources": [
      "mental"
    ]
  },
  {
    "code": "01037",
    "name": "Mark V Helmet",
    "type": "upgrade",
    "image": "01037",
    "text": [
      "Hero Action (thwart): Exhaust Mark V Helmet → remove 1 threat from a scheme (from each scheme instead if you have the [[Aerial]] trait)."
    ],
    "resources": [
      "physical"
    ]
  },
  {
    "code": "01038",
    "name": "Powered Gauntlets",
    "type": "upgrade",
    "image": "01038",
    "text": [
      "Hero Action (attack): Exhaust Powered Gauntlets → deal 1 damage to an enemy (2 damage instead if you have the [[Aerial]] trait)."
    ],
    "resources": [
      "energy"
    ]
  },
  {
    "code": "01039",
    "name": "Rocket Boots",
    "type": "upgrade",
    "image": "01039",
    "text": [
      "You get +1 hit point.",
      "Hero Action: Exhaust Rocket Boots and spend a [mental] resource → gain the [[Aerial]] trait until the end of the phase."
    ],
    "resources": [
      "mental"
    ]
  }
]
