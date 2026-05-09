import { useEffect, useState } from "react";
import type { CardInstance } from "../game/types";
import { getCardImage } from "../utils/cardImages";

interface Props {
  card: CardInstance;
  onClick?: () => void;
  size?: "normal" | "small";
  face?: "a" | "b";
  identityForm?: "hero" | "alterEgo";
  isSelected?: boolean;
  isPendingPlay?: boolean;
  orientation?: "portrait" | "landscape";
}

export function CardView({
  card,
  onClick,
  size = "normal",
  face,
  identityForm,
  isSelected = false,
  isPendingPlay = false,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [flippedPreview, setFlippedPreview] = useState(false);

  const previewFace =
    face === undefined
      ? undefined
      : flippedPreview
        ? face === "a"
          ? "b"
          : "a"
        : face;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isHovered) {
        return;
      }

      if (!event.shiftKey || event.key.toLowerCase() !== "f") {
        return;
      }

      setFlippedPreview((current) => !current);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isHovered]);

  const imageSrc = getCardImage(card.image, {
    face: previewFace,
  });

  const className = [
    "card",
    `card--${size}`,
    card.exhausted ? "card--exhausted" : "",
    isSelected ? "card--selected" : "",
    isPendingPlay ? "card--pending-play" : "",
    card.orientation === "landscape" ? "card--landscape" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setFlippedPreview(false);
      }}
      title="Hold Shift to zoom. Press F while holding Shift to flip preview."
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={card.name}
            className="card-image"
          />

          <div className="card-stat-overlay">
            {card.attack !== undefined && identityForm === "hero" && (
              <span>ATK {card.attack}</span>
            )}

            {card.thwart !== undefined && identityForm === "hero" && (
              <span>THW {card.thwart}</span>
            )}

            {card.defense !== undefined && identityForm === "hero" && (
              <span>DEF {card.defense}</span>
            )}

            {card.recover !== undefined && identityForm === "alterEgo" && (
              <span>REC {card.recover}</span>
            )}

            {card.hp !== undefined && (
              <span>HP {card.hp}</span>
            )}
          </div>

          <div className="card-status-overlay">
            {card.stunned && <span>STUN</span>}
            {card.confused && <span>CONF</span>}
            {card.tough && <span>TOUGH</span>}
          </div>
        </>
      ) : (
        <>
          <h3>{card.name}</h3>
          <div>{card.type}</div>
        </>
      )}
    </div>
  );
}
