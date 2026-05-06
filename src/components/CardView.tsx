import type { CardInstance } from "../game/types";
import { getCardImage } from "../utils/cardImages";

interface Props {
  card: CardInstance;
  onClick?: () => void;
  size?: "normal" | "small";
}

export function CardView({ card, onClick, size = "normal" }: Props) {
  const imageSrc = getCardImage(card.image);

  return (
    <div
      className={`card card--${size}`}
      onClick={onClick}
      title="Hold Shift and hover to zoom"
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
