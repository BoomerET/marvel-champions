import { spiderManHero } from "./spiderMan";
import { captainMarvelHero } from "./captainMarvel";

export const allHeroes = [
    spiderManHero,
    captainMarvelHero,
];

export const heroCardByCode = new Map(
    allHeroes.map((hero) => [hero.code, hero])
);
