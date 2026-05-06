export const cardImages = import.meta.glob(
  "../assets/images/*.webp",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

export function getCardImage(filename?: string): string | undefined {
  if (!filename) {
    return undefined;
  }

  const path = `../assets/images/${filename}`;

  return cardImages[path];
}

