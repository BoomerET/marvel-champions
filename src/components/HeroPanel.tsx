import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function HeroPanel() {
    const hero = useGameStore((s) => s.hero);
    const flipIdentity = useGameStore((s) => s.flipIdentity);

    return (
        <section>
            <h2>Hero</h2>

            <CardView
                card={hero.identity}
                size="small"
                face={
                    hero.form === "hero"
                        ? "a"
                        : "b"
                }
            />

            <div>Form: {hero.form}</div>
            <div>HP: {hero.hitPoints}</div>

            <button onClick={flipIdentity}>
                Flip Identity
            </button>
        </section>
    );
}
