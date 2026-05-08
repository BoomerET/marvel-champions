import { spiderManPlayerCards } from "../playerCards/spiderMan";
import { basicPlayerCards } from "../playerCards/basic";

export const allPlayerCards = [
    ...spiderManPlayerCards,
    ...basicPlayerCards,
];

export const playerCardByCode = new Map(
    allPlayerCards.map((card) => [card.code, card])
);
