import type { GameEvent } from "./events";

export type IdentityForm = "hero" | "alterEgo";

export type Phase =
  | "setup"
  | "player"
  | "villain"
  | "encounter";

export interface Card {
  code: string;
  name: string;
  type: string;
  image?: string;
  text?: string[];
  cost?: number;
  hp?: number;
  attack?: number;
  thwart?: number;
  recover?: number;
  defense?: number;
  boostIcons?: number;
  scheme?: number;
}

export interface CardInstance extends Card {
  instanceId: string;
  exhausted?: boolean;
  damage?: number;
  stunned?: boolean;
  confused?: boolean;
  tough?: boolean;
}

export interface GameState {
  phase: Phase;
  round: number;
  hero: HeroState;
  villain: VillainState;
  log: string[];
  encounterArea: CardInstance[];
  encounterDeck: CardInstance[];
  encounterDiscard: CardInstance[];
  eventHistory: GameEvent[];
}

export interface HeroState {
  hitPoints: number;
  form: IdentityForm;
  maxHitPoints: number;
  hand: CardInstance[];
  deck: CardInstance[];
  identity: CardInstance;
  discard: CardInstance[];
  playArea: CardInstance[];
  remainingActivations: number;
  isDefending: boolean;
}

export interface VillainState {
  identity: CardInstance;
  hitPoints: number;
  threat: number;
}

