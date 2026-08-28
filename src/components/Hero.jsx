import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { goals } from '../data/goals'

const AUTO_ADVANCE_MS = 4200 // how long each slide stays on screen, in milliseconds

function Hero() {
    const [active, setActive] = useState(0) // index of the slide currently showing

    const [isPaused, setIsPaused] = useState(false)
    const [timerVersion, setTimerVersion] = useState(0)

    // The timer is created inside useEffect, so its id stays local to the
    // effect and is automatically cleaned up whenever the effect runs again
    // or the component disappears.
    useEffect(() => {
        if (isPaused) return

        const timerId = setInterval(() => {
            setActive(prev => (prev + 1) % goals.length)
        }, AUTO_ADVANCE_MS)

        return () => clearInterval(timerId)
    }, [isPaused, timerVersion])

    // Jumps to a specific slide and restarts the timer.
    const goTo = (index) => {
        setActive(index)
        setTimerVersion(prev => prev + 1)
    }

    const current = goals[active]

    return (
        <section id="home" className="hero">
            <div className="hero__glow" aria-hidden="true"></div>

            <div className="hero__content">
                <p className="eyebrow">A roadmap site for people who'd rather build than browse</p>
                <h1>
                    Every skill has a route.<br />
                    <span className="hero__accent">Road2Code</span> draws yours.
                </h1>
                <p className="hero__sub">
                    Tell it what you're aiming for and what you already know — it hands back
                    an ordered checklist of stops, each one paired with a video and the docs, so
                    you stop guessing what to learn next.
                </p>
                <div className="hero__cta-row">
                    <Link to="/courses" className="btn btn--primary btn--lg">Pick your track</Link>
                    
                </div>
            </div>

            <div
                className="hero__slider"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="road-map" aria-hidden="true">
                    <svg viewBox="0 0 320 200" className="road-map__svg">
                        <path
                            id="road-path"
                            d="M20,180 C 80,180 60,110 120,100 S 200,40 180,20 S 260,10 300,30"
                            fill="none"
                        />
                        {[0, 1, 2, 3, 4, 5].map(i => {
                            const t = i / 5
                            return <circle key={i} className={`road-map__stop ${i === active % 6 ? 'is-active' : ''}`}
                                r="5" style={{ offsetDistance: `${t * 100}%` }} />
                        })}
                        <circle r="6" className="road-map__runner" />
                    </svg>
                </div>

                <div className="slide-card" key={current.key}>
                    <span className="slide-card__icon">{current.icon}</span>
                    <h3>{current.label}</h3>
                    <p>{current.tagline}</p>
                    <span className="slide-card__count">{current.stops} stops on this route</span>
                </div>

                <div className="slider-dots" role="tablist" aria-label="Featured tracks">
                    {goals.map((g, i) => (
                        <button
                            key={g.key}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={g.label}
                            className={`slider-dots__dot ${i === active ? 'is-active' : ''}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
