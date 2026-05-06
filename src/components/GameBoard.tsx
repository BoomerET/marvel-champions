import { useGameStore } from "../store/gameStore";
import { PlayerHand } from "./PlayerHand";
import { PlayArea } from "./PlayArea";
import { HeroPanel } from "./HeroPanel";
import { GameLog } from "./GameLog";
import { VillainPanel } from "./VillainPanel";
import { DeckPanel } from "./DeckPanel";
import { DiscardPanel } from "./DiscardPanel";
import { GameControls } from "./GameControls";

export function GameBoard() {
  const phase = useGameStore((s) => s.phase);
  const round = useGameStore((s) => s.round);

  return (
    <main>
      <h1>Marvel Champions</h1>

      <section>
        <div>Round: {round}</div>
        <div>Phase: {phase}</div>
      </section>

      <GameControls />

      <div className="table-top">
        <VillainPanel />
        <HeroPanel />
      </div>
      <div className="table-zones">
        <DeckPanel />
        <DiscardPanel />
      </div>

      <PlayArea />

      <PlayerHand />

      <GameLog />
    </main>
  );
}

