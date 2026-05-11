import { GameLog } from "./GameLog";
import { PlayArea } from "./PlayArea";
import { HeroPanel } from "./HeroPanel";
import { DeckPanel } from "./DeckPanel";
import { PlayerHand } from "./PlayerHand";
import { DeckLoader } from "./DeckLoader";
import { MinionArea } from "./MinionArea";
import { VillainPanel } from "./VillainPanel";
import { DiscardPanel } from "./DiscardPanel";
import { EventHistory } from "./EventHistory";
import { GameControls } from "./GameControls";
import { EncounterArea } from "./EncounterArea";
import { SideSchemeArea } from "./SideSchemeArea";
import { useGameStore } from "../store/gameStore";
import { MainSchemePanel } from "./MainSchemePanel";
import { GameStatusBanner } from "./GameStatusBanner";
import { ScenarioSelector } from "./ScenarioSelector";
import { EncounterDeckPanel } from "./EncounterDeckPanel";
import { EncounterDiscardPanel } from "./EncounterDiscardPanel";

export function GameBoard() {
  const phase = useGameStore((s) => s.phase);
  const round = useGameStore((s) => s.round);

  return (
    <main>
      <h1>Marvel Champions</h1>
      <GameStatusBanner />

      <DeckLoader />

      <ScenarioSelector />

      <section>
        <div>Round: {round}</div>
        <h2>Phase: {phase}</h2>
      </section>

      <div className="table-top">
        <VillainPanel />
        <MainSchemePanel />
        <HeroPanel />
      </div>


      <EncounterArea />

      <MinionArea />
      <SideSchemeArea />

      <GameControls />

      <div className="table-zones">
        <DeckPanel />
        <DiscardPanel />
        <EncounterDeckPanel />
        <EncounterDiscardPanel />
      </div>

      <PlayArea />

      <PlayerHand />

      <GameLog />

      <EventHistory />
    </main>
  );
}

