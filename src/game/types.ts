export type Phase =
  | "setup"
  | "player"
  | "villain"
  | "encounter";

export interface Card {
  code: string;
  name: string;
  type: string;
  text?: string[];
}

export interface CardInstance extends Card {
  instanceId: string;
  exhausted?: boolean;
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

