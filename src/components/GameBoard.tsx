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
    <main className="game-board">
      <header className="game-header">
        <h1>Marvel Champions</h1>

        <div className="round-phase">
          <div>Round {round}</div>
          <div>Phase: {phase}</div>
        </div>
      </header>

      <GameStatusBanner />

      <section className="setup-row">
        <DeckLoader />
        <ScenarioSelector />
      </section>

      <GameControls />

      <section className="villain-row">
        <VillainPanel />
        <MainSchemePanel />
        <SideSchemeArea />
      </section>

      <section className="encounter-row">
        <EncounterDeckPanel />
        <EncounterArea />
        <MinionArea />
        <EncounterDiscardPanel />
      </section>

      <section className="player-row">
        <HeroPanel />
        <PlayArea />
      </section>

      <DeckPanel />
      <DiscardPanel />

      <section className="player-deck-row">

        <PlayerHand />
      </section>

      <section className="log-row">
        <GameLog />
        <EventHistory />
      </section>
    </main>
  );
}
