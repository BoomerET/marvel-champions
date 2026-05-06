import type { CardInstance } from "../game/types";
import { getCardImage } from "../utils/cardImages";

interface Props {
  card: CardInstance;
  onClick?: () => void;
}

export function CardView({ card, onClick }: Props) {
  const imageSrc = getCardImage(card.image);

  return (
    <div
      className="card"
      onClick={onClick}
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

