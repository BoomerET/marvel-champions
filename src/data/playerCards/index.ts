import { spiderManPlayerCards } from "./spiderMan";
import { captainMarvelPlayerCards } from "./captainMarvel";
import { blackPantherPlayerCards } from "./blackPanther";
import { sheHulkPlayerCards } from "./sheHulk";
import { ironManPlayerCards } from "./ironMan";
import { basicPlayerCards } from "./basic";
import { aggressionPlayerCards } from "./aggression";
import { justicePlayerCards } from "./justice";
import { leadershipPlayerCards } from "./leadership";
import { protectionPlayerCards } from "./protection";

export const allPlayerCards = [
    ...spiderManPlayerCards,
    ...basicPlayerCards,
    ...aggressionPlayerCards,
    ...justicePlayerCards,
    ...leadershipPlayerCards,
    ...protectionPlayerCards,
    ...captainMarvelPlayerCards,
    ...blackPantherPlayerCards,
    ...sheHulkPlayerCards,
    ...ironManPlayerCards,
];

export const playerCardByCode = new Map(
    allPlayerCards.map((card) => [card.code, card])
);
