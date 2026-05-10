import type { GameEvent } from "./events";

export type IdentityForm = "hero" | "alterEgo";

export type Phase =
  | "setup"
  | "player"
  | "villain"
  | "encounter";

export type ResourceType =
  | "mental"
  | "wild"
  | "energy"
  | "physical"


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
  boostText?: string[];
  resources?: ResourceType[];
  threat?: number;
  orientation?: "portrait" | "landscape";
  currentHitPoints?: number;
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
  sideSchemes: CardInstance[];
  minions: CardInstance[];
  selectedAttackTarget?: string;
  gameStatus: GameStatus;
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
  pendingPayment?: {
    cardToPlay: CardInstance;
    paidWith: CardInstance[];
  };
}

export interface VillainState {
  identity: CardInstance;
  hitPoints: number;
  threat: number;
  threatLimit: number;
}

export type GameStatus =
  | "playing"
  | "won"
  | "lost";
