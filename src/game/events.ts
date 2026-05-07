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
    }
    | {
        type: "BASIC_THWART";
        amount: number;
    }
    | {
        type: "BASIC_RECOVER";
        amount: number;
    }
    | {
        type: "HEALING_DONE";
        target: "hero";
        amount: number;
    };
