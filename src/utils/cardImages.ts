export const cardImages = import.meta.glob(
  "../assets/images/**/*.webp",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

interface ImageOptions {
  face?: "a" | "b";
}

export function getCardImage(
  image?: string,
  options?: ImageOptions
): string | undefined {
  if (!image) {
    return undefined;
  }

  const faceSuffix = options?.face ?? "";

  //const doubleSidedPath =
  //  `../assets/images/${image}${faceSuffix}.webp`;

  //const singleSidedPath =
  //  `../assets/images/${image}.webp`;

  const matchingPath = Object.keys(cardImages).find(
    (path) =>
      path.endsWith(`/${image}${faceSuffix}.webp`) ||
      path.endsWith(`/${image}.webp`)
  );

  //return (
  //  cardImages[doubleSidedPath] ??
  //  cardImages[singleSidedPath]
  //);
  return matchingPath
    ? cardImages[matchingPath]
    : undefined;
}
