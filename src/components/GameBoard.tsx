import { GameLog } from "./GameLog";
import { PlayArea } from "./PlayArea";
import { HeroPanel } from "./HeroPanel";
import { DeckPanel } from "./DeckPanel";
import { PlayerHand } from "./PlayerHand";
import { VillainPanel } from "./VillainPanel";
import { DiscardPanel } from "./DiscardPanel";
import { GameControls } from "./GameControls";
import { EncounterArea } from "./EncounterArea";
import { useGameStore } from "../store/gameStore";
import { EncounterDiscardPanel } from "./EncounterDiscardPanel";

export function GameBoard() {
  const phase = useGameStore((s) => s.phase);
  const round = useGameStore((s) => s.round);

  return (
    <main>
      <h1>Marvel Champions</h1>

      <section>
        <div>Round: {round}</div>
        <h2>Phase: {phase}</h2>
      </section>

      <div className="table-top">
        <VillainPanel />
        <HeroPanel />
      </div>

      <EncounterArea />

      <GameControls />

      <div className="table-zones">
        <DeckPanel />
        <DiscardPanel />
        <EncounterDiscardPanel />
      </div>

      <PlayArea />

      <PlayerHand />

      <GameLog />
    </main>
  );
}

