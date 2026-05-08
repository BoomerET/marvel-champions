import type { Card } from "./types";
import { playerCardByCode } from "../data/playerCards";

interface MarvelCdbDeck {
    hero_code: string;
    hero_name: string;
    slots: Record<string, number>;
}

export function buildPlayerDeckFromMarvelCdb(
    marvelDeck: MarvelCdbDeck
): Card[] {
    return Object.entries(marvelDeck.slots).flatMap(
        ([code, quantity]) => {
            const card = playerCardByCode.get(code);

            if (!card) {
                console.warn(`Missing card code: ${code}`);
                return [];
            }

            return Array.from({ length: quantity }, () => card);
        }
    );
}
