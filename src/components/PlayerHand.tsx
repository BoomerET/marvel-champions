import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function PlayerHand() {
  const hand = useGameStore((s) => s.hero.hand);
  const pendingPayment = useGameStore((s) => s.hero.pendingPayment);
  const beginPlayCard = useGameStore((s) => s.beginPlayCard);
  const togglePaymentCard = useGameStore((s) => s.togglePaymentCard);

  return (
    <section>
      <h2>Player Hand ({hand.length})</h2>

      <div className="player-hand">
        {hand.map((card) => (
          <CardView
            key={card.instanceId}
            card={card}
            onClick={() =>
              pendingPayment
                ? togglePaymentCard(card.instanceId)
                : beginPlayCard(card.instanceId)
            }
          />
        ))}
      </div>
    </section>
  );
}
