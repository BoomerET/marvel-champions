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
}

export interface CardInstance extends Card {
  instanceId: string;
  exhausted?: boolean;
  damage?: number;
}

export interface HeroState {
  identity: CardInstance;
  hand: CardInstance[];
  deck: CardInstance[];
  discard: CardInstance[];
}

export interface GameState {
  phase: Phase;
  round: number;
  hero: HeroState;
  log: string[];
}

export type IdentityForm = "hero" | "alterEgo";

export interface HeroState {
  identity: CardInstance;
  form: IdentityForm;

  hand: CardInstance[];
  deck: CardInstance[];
  discard: CardInstance[];
  playArea: CardInstance[];

  hitPoints: number;
}

