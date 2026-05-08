import { spiderManPlayerCards } from "./spiderMan";
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
];

export const playerCardByCode = new Map(
    allPlayerCards.map((card) => [card.code, card])
);
