import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";
import { useState } from "react";

export function PlayerHand() {
  const [open, setOpen] = useState(true);
  const hand = useGameStore((s) => s.hero.hand);
  const pendingPayment = useGameStore((s) => s.hero.pendingPayment);
  const beginPlayCard = useGameStore((s) => s.beginPlayCard);
  const togglePaymentCard = useGameStore((s) => s.togglePaymentCard);

  return (
    <section>
      <h2>
        Player Hand ({hand.length}){" "}
        <button onClick={() => setOpen((current) => !current)}>
          {open ? "Hide" : "Show"}
        </button>
      </h2>



      {open && (
        <div className="player-hand">
          {hand.map((card) => {
            const isPaymentCard =
              pendingPayment?.paidWith.some(
                (c) => c.instanceId === card.instanceId
              ) ?? false;

            const isCardBeingPlayed =
              pendingPayment?.cardToPlay.instanceId === card.instanceId;

            return (
              <CardView
                key={card.instanceId}
                card={card}
                size="small"
                isSelected={isPaymentCard}
                isPendingPlay={isCardBeingPlayed}
                onClick={() =>
                  pendingPayment
                    ? togglePaymentCard(card.instanceId)
                    : beginPlayCard(card.instanceId)
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
