import { useEffect, useState } from "react";
import type { CardInstance } from "../game/types";
import { getCardImage } from "../utils/cardImages";

interface Props {
  card: CardInstance;
  onClick?: () => void;
  size?: "normal" | "small";
  face?: "a" | "b";
}

export function CardView({
  card,
  onClick,
  size = "normal",
  face,
}: Props) {
  const [previewFace, setPreviewFace] = useState<"a" | "b" | undefined>(face);

  useEffect(() => {
    setPreviewFace(face);
  }, [face]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey || event.key.toLowerCase() !== "f") {
        return;
      }

      setPreviewFace((currentFace) =>
        currentFace === "a" ? "b" : "a"
      );
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const imageSrc = getCardImage(card.image, {
    face: previewFace,
  });

  return (
    <div
      className={`card card--${size}`}
      onClick={onClick}
      title="Hold Shift to zoom. Press F while holding Shift to flip preview."
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={card.name}
          className="card-image"
        />
      ) : (
        <>
          <h3>{card.name}</h3>
          <div>{card.type}</div>
        </>
      )}
    </div>
  );
}
