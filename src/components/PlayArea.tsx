import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function PlayArea() {
  const playArea = useGameStore((s) => s.hero.playArea);
  const toggleExhausted = useGameStore((s) => s.toggleExhausted);
  const allyAttack = useGameStore(
    (s) => s.allyAttack
  );

  const allyThwart = useGameStore(
    (s) => s.allyThwart
  );

  return (
    <section>
      <h2>Player Play Area ({playArea.length})</h2>

      <div className="play-area">
        {playArea.length === 0 ? (
          <div className="empty-zone">No cards in play.</div>
        ) : (
          playArea.map((card) => (
            <div
              key={card.instanceId}
              className="play-area-card"
            >
              <CardView
                card={card}
                size="small"
                onClick={() =>
                  toggleExhausted(card.instanceId)
                }
              />

              {card.type === "ally" && (
                <div className="ally-actions">
                  <button
                    onClick={() =>
                      allyAttack(card.instanceId)
                    }
                  >
                    Attack
                  </button>

                  <button
                    onClick={() =>
                      allyThwart(card.instanceId)
                    }
                  >
                    Thwart
                  </button>
                </div>
              )}
              {card.activatedAbility && (
                <button
                  onClick={() =>
                    console.log("Activating ability:", card)
                  }
                >
                  Use Ability
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
