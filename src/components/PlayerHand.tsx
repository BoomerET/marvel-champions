import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function PlayerHand() {
  const hand = useGameStore((s) => s.hero.hand);
  const playCard = useGameStore((s) => s.playCard);

  return (
    <section>
      <h2>Hand ({hand.length})</h2>

      <div className="player-hand">
        {hand.map((card) => (
          <CardView
            key={card.instanceId}
            card={card}
            onClick={() => playCard(card.instanceId)}
          />
        ))}
      </div>
    </section>
  );
}

