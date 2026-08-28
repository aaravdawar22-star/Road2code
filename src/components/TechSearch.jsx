import { useState } from 'react'
import { goals, skillOptions } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import ResourceCard from './ResourceCard'

// Flattens the roadmaps object into one plain array — one entry per step,
// tagged with which track it belongs to. This only needs to run once
// (roadmaps never change while the app is running), so it's built as the
// starting value of useState below instead of on every render.
function buildSearchIndex() {
    const index = []
    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i]
        const track = roadmaps[goal.key]
        if (!track) continue

        for (let j = 0; j < track.steps.length; j++) {
            const step = track.steps[j]
            index.push({
                trackKey: goal.key,
                trackLabel: goal.label,
                trackIcon: goal.icon,
                topic: step.topic,
                resources: step.resources,
            })
        }
    }
    return index
}

// A step matches the search query if the query text shows up in the
// topic name, the track name, or any of the step's resource labels.
function stepMatches(step, query) {
    const q = query.toLowerCase()

    if (step.topic.toLowerCase().includes(q)) return true
    if (step.trackLabel.toLowerCase().includes(q)) return true

    for (let i = 0; i < step.resources.length; i++) {
        if (step.resources[i].label.toLowerCase().includes(q)) return true
    }
    return false
}

// Lets a visitor search across every track at once — type "docker" and
// see every stop, in every track, that touches Docker, with links straight
// to the video/docs for it. Handy for someone who already knows what
// technology they want to learn but not which track to follow.
function TechSearch({ onPickGoal }) {
    const [searchIndex] = useState(buildSearchIndex)
    const [query, setQuery] = useState('')

    const trimmedQuery = query.trim()
    const results = trimmedQuery === ''
        ? []
        : searchIndex.filter(step => stepMatches(step, trimmedQuery))

    const handleChipClick = (skill) => {
        setQuery(skill)
    }

    return (
        <div className="tech-search">
            <div className="section-head section-head--tight">
                <p className="eyebrow">Know the tech, not the track?</p>
                <h2>Technology Search</h2>
                <p className="section-head__sub">
                    Search any technology to see which tracks cover it and jump straight to the resources.
                </p>
            </div>

            <div className="tech-search__bar">
                <input
                    type="text"
                    className="tech-search__input"
                    placeholder="Try “React”, “Docker”, “SQL”…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search technologies"
                />
                {query !== '' && (
                    <button className="tech-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                        ✕
                    </button>
                )}
            </div>

            {trimmedQuery === '' ? (
                <div className="tech-search__chips">
                    <p className="tech-search__hint">Or pick a technology to get started:</p>
                    <div className="skills-grid">
                        {skillOptions.map(skill => (
                            <button key={skill} className="skill-btn" onClick={() => handleChipClick(skill)}>
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            ) : results.length === 0 ? (
                <p className="tech-search__empty">
                    No stops match “{trimmedQuery}” yet — try a different spelling, or pick a technology above.
                </p>
            ) : (
                <div className="tech-search__results">
                    <p className="tech-search__count">
                        {results.length} {results.length === 1 ? 'match' : 'matches'} for “{trimmedQuery}”
                    </p>
                    {results.map((step, i) => (
                        <div key={i} className="tech-search__result">
                            <div className="tech-search__result-head">
                                <span className="tech-search__result-track">
                                    {step.trackIcon} {step.trackLabel}
                                </span>
                                <h3>{step.topic}</h3>
                            </div>
                            <div className="step-resources">
                                {step.resources.map((res, j) => (
                                    <ResourceCard key={j} resource={res} />
                                ))}
                            </div>
                            <button className="tech-search__result-cta" onClick={() => onPickGoal(step.trackKey)}>
                                Build the {step.trackLabel} roadmap →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TechSearch
