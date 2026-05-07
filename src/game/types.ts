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
}

export interface CardInstance extends Card {
  instanceId: string;
  exhausted?: boolean;
  damage?: number;
}

export interface GameState {
  phase: Phase;
  round: number;
  hero: HeroState;
  villain: VillainState;
  log: string[];
}

export interface HeroState {
  identity: CardInstance;
  form: IdentityForm;
  hand: CardInstance[];
  deck: CardInstance[];
  discard: CardInstance[];
  playArea: CardInstance[];
  hitPoints: number;
}

export interface VillainState {
  identity: CardInstance;
  hitPoints: number;
  threat: number;
}
