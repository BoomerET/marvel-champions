import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function PlayArea() {
  const playArea = useGameStore((s) => s.hero.playArea);
  const toggleExhausted = useGameStore((s) => s.toggleExhausted);

  return (
    <section>
      <h2>Play Area ({playArea.length})</h2>

      <div className="play-area">
        {playArea.map((card) => (
          <CardView key={card.instanceId} card={card} />
        ))}
      </div>
      <CardView
        key={card.instanceId}
        card={card}
        onClick={() => toggleExhausted(card.instanceId)}
      />
    </section>
  );
}

