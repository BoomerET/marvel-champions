import { useGameStore } from "../store/gameStore";
import { PlayerHand } from "./PlayerHand";

export function GameBoard() {
  const phase = useGameStore((s) => s.phase);
  const round = useGameStore((s) => s.round);
  const drawCards = useGameStore((s) => s.drawCards);
  const endTurn = useGameStore((s) => s.endTurn);

  return (
    <main>
      <h1>Marvel Champions</h1>

      <section>
        <div>Round: {round}</div>
        <div>Phase: {phase}</div>
      </section>

      <section>
        <button onClick={() => drawCards(1)}>Draw 1</button>
        <button onClick={() => drawCards(5)}>Draw 5</button>
        <button onClick={endTurn}>End Turn</button>
      </section>

      <PlayerHand />
    </main>
  );
}

