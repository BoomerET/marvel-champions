export type GameEvent =
    | {
        type: "BASIC_ATTACK";
        amount: number;
    }
    | {
        type: "DAMAGE_DEALT";
        target: "hero" | "villain";
        amount: number;
    }
    | {
        type: "THREAT_REMOVED";
        amount: number;
    };
