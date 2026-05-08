import { useGameStore } from "../store/gameStore";
import { CardView } from "./CardView";

export function HeroPanel() {
    const hero = useGameStore((s) => s.hero);
    const flipIdentity = useGameStore((s) => s.flipIdentity);
    const damageHero = useGameStore((s) => s.damageHero);
    const healHero = useGameStore((s) => s.healHero);
    const defend = useGameStore((s) => s.defend);
    const toggleExhausted = useGameStore((s) => s.toggleExhausted);
    const basicAttack = useGameStore((s) => s.basicAttack);
    const basicThwart = useGameStore((s) => s.basicThwart);
    const basicRecover = useGameStore((s) => s.basicRecover);
    const toggleHeroStunned = useGameStore((s) => s.toggleHeroStunned);
    const toggleHeroConfused = useGameStore((s) => s.toggleHeroConfused);
    const toggleHeroTough = useGameStore((s) => s.toggleHeroTough);

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

            <button onClick={toggleHeroStunned}>
                Toggle Stunned
            </button>

            <button onClick={toggleHeroConfused}>
                Toggle Confused
            </button>

            <button onClick={toggleHeroTough}>
                Toggle Tough
            </button>

            <button onClick={defend}>
                Defend
            </button>
        </section>
    );
}
