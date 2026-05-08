export interface MarvelCdbDeck {
    id: number;
    name: string;
    hero_code: string;
    hero_name: string;
    slots: Record<string, number>;
}

export async function fetchMarvelCdbDeck(
    deckId: string
): Promise<MarvelCdbDeck> {
    const response = await fetch(
        `https://marvelcdb.com/api/public/deck/${deckId}.json`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch MarvelCDB deck ${deckId}`
        );
    }

    return response.json();
}
