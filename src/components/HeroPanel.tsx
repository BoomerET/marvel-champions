import { useGameStore } from "../store/gameStore";

export function HeroPanel() {
    const hero = useGameStore((s) => s.hero);
    const flipIdentity = useGameStore((s) => s.flipIdentity);

    return (
        <section>
            <h2>{hero.identity.name}</h2>

            <div>Form: {hero.form}</div>

            <div>
                HP: {hero.hitPoints}
            </div>

            <button onClick={flipIdentity}>
                Flip Identity
            </button>
        </section>
    );
}