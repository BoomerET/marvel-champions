import { v4 as uuid } from "uuid";
import type { Card, CardInstance } from "../game/types";

export function createCardInstance(card: Card): CardInstance {
  return {
    ...card,
    instanceId: uuid(),
    exhausted: false,
    damage: 0,
  };
}

