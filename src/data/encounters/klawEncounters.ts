import type { Card } from "../../game/types";

export const klawEncounterCards: Card[] = [
    {
        code: "01118",
        name: "Sonic Converter",
        type: "attachment",
        image: "01118",
        boostIcons: 3,
        boostText: [
            "Give the villain +3 ATK for this attack."
        ],
        text: [
            "Klaw stuns attacking hero."
        ],
    },
    {
        code: "01119",
        name: "Solid-Sound Body",
        type: "attachment",
        image: "01119",
        boostIcons: 3,
        boostText: [
            "Give the villain +3 ATK for this attack."
        ],
        text: [
            "Klaw stuns attacking hero."
        ],
    },
    {
        code: "01120",
        name: "Armored Guard",
        type: "minion",
        image: "01120",
        boostIcons: 13,
        boostText: [
            "Give the villain +3 ATK for this attack."
        ],
        text: [
            "Klaw stuns attacking hero."
        ],
    },
    {
        code: "01121",
        name: "Weapons Runner",
        type: "minion",
        image: "01121",
        boostIcons: 1,
        boostText: [
            "Give the villain +3 ATK for this attack."
        ],
        text: [
            "Klaw stuns attacking hero."
        ],
    },
    {
        code: "01122",
        name: "Solid-Sound Body",
        type: "treachery",
        image: "01122",
        boostIcons: 1,
        boostText: [
            "Give the villain +3 ATK for this attack."
        ],
        text: [
            "Klaw stuns attacking hero."
        ],
        whenRevealed: [
            { type: "addThreat", amount: 99 },
        ],
    },
];