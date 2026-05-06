import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function PlayerHand() {
  const hand = useGameStore((s) => s.hero.hand);
  const playCard = useGameStore((s) => s.playCard);

  return (
    <section>
      <h2>Player Hand ({hand.length})</h2>

      <div className="player-hand">
        {hand.length === 0 ? (
          <div className="empty-zone">No cards in hand. Draw some cards.</div>
        ) : (
          hand.map((card) => (
            <CardView
              key={card.instanceId}
              card={card}
              onClick={() => playCard(card.instanceId)}
            />
          ))
        )}
      </div>
    </section>
  );
}

