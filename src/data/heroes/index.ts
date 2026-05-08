import { spiderManHero } from "./spiderMan";

export const allHeroes = [
    spiderManHero,
];

export const heroCardByCode = new Map(
    allHeroes.map((hero) => [hero.code, hero])
);
