import { spiderManHero } from "./spiderMan";
import { captainMarvelHero } from "./captainMarvel";
import { blackPantherHero } from "./blackPanther";
import { sheHulkHero } from "./sheHulk";
import { ironManHero } from "./ironMan";

export const allHeroes = [
    spiderManHero,
    captainMarvelHero,
    blackPantherHero,
    sheHulkHero,
    ironManHero,
];

export const heroCardByCode = new Map(
    allHeroes.map((hero) => [hero.code, hero])
);
