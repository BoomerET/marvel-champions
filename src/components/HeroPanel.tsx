import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function HeroPanel() {
    const hero = useGameStore((s) => s.hero);
    const flipIdentity = useGameStore((s) => s.flipIdentity);
    const damageHero = useGameStore((s) => s.damageHero);
    const healHero = useGameStore((s) => s.healHero);
    const toggleExhausted = useGameStore((s) => s.toggleExhausted);
    const basicAttack = useGameStore((s) => s.basicAttack);
    const basicThwart = useGameStore((s) => s.basicThwart);
    const basicRecover = useGameStore((s) => s.basicRecover);

    return (
        <section>
            <h2>Hero</h2>
            <div className="identity-card-slot">
                <CardView
                    card={hero.identity}
                    size="small"
                    face={
                        hero.form === "hero"
                            ? "a"
                            : "b"
                    }
                    identityForm={hero.form}
                />
            </div>

            <div>Form: {hero.form}</div>
            <div>HP: {hero.hitPoints}</div>
            <button onClick={() => damageHero(1)}>Damage 1</button>
            <button onClick={() => healHero(1)}>Heal 1</button>
            <button onClick={flipIdentity}>
                Flip Identity
            </button>
            <button onClick={() => toggleExhausted(hero.identity.instanceId)}>
                Exhaust / Ready
            </button>
            <button onClick={basicAttack}>
                Attack
            </button>

            <button onClick={basicThwart}>
                Thwart
            </button>

            <button onClick={basicRecover}>
                Recover
            </button>
        </section>
    );
}
