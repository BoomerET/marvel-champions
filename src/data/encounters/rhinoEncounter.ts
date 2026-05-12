import type { Card } from "../../game/types";

export const rhinoEncounterCards: Card[] = [
    {
        code: "01099",
        name: "Charge",
        type: "treachery",
        image: "01099",
        boostIcons: 2,
        boostText: [
            "Give the villain +3 ATK for this attack."
        ],
        text: [
            "Rhino gets +3 ATK for this attack."
        ],
    },
    {
        code: "01104",
        name: "Hard to Keep Down",
        type: "treachery",
        image: "01104",
        boostIcons: 1,
        text: ["Heal damage from Rhino."],
    },
    {
        code: "01107",
        name: "Breaking & Taking",
        type: "sideScheme",
        image: "01107",
        boostIcons: 2,
        threat: 2,
    },
    {
        code: "01101",
        name: "Hydra Mercenary",
        type: "minion",
        image: "01101",
        boostIcons: 1,
        orientation: "landscape",
        hp: 3,
        attack: 1,
        scheme: 0,
    },
    {
        code: "01187",
        name: "Assault",
        type: "treachery",
        image: "01187",
        boostIcons: 1,
        whenRevealed: [
            { type: "damageHero", amount: 2 },
        ],
    },
    {
        code: "01186",
        name: "Advance",
        type: "treachery",
        image: "01186",
        boostIcons: 1,
        //whenRevealed: [
        //    { type: "addThreat", amount: 2 },
        //],
        whenRevealed: [
            { type: "addThreat", amount: 99 },
        ],
    },
    {
        code: "11111",
        name: "Dave's Treachery",
        type: "treachery",
        image: "11111",
        boostIcons: 1,
        surge: true,
    },
];