export const deckBackImages = import.meta.glob(
    "../assets/images/card-backs/*.webp",
    {
        eager: true,
        import: "default",
    }
) as Record<string, string>;

export function getDeckBackImage(
    filename: string
): string | undefined {
    return deckBackImages[
        `../assets/images/card-backs/${filename}`
    ];
}
