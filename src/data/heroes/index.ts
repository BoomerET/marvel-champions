import { spiderManPlayerCards } from "../playerCards/spiderMan";
import { basicPlayerCards } from "../playerCards/basic";
import { aggressionPlayerCards } from "../playerCards/aggression";
import { justicePlayerCards } from "../playerCards/justice";
import { leadershipPlayerCards } from "../playerCards/leadership";
import { protectionPlayerCards } from "../playerCards/protection";

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
