import { useEffect, useState } from 'react'
import ResourceCard from './ResourceCard'
import ProgressBar from './ProgressBar'
import { projectSuggestions } from '../data/projectSuggestions'


function Roadmap({ roadmap, goalKey, knownSkills, onReset, identity }) {
  
    const storageKey = `road2code_progress_${identity}_${goalKey}`

    const [completed, setCompleted] = useState(() => {
        const stored = window.localStorage.getItem(storageKey)
        if (stored !== null) {
            return JSON.parse(stored)
        }


        const knownIds = []
        for (let i = 0; i < roadmap.steps.length; i++) {
            const step = roadmap.steps[i]
            const matchesKnownSkill = knownSkills.some(s => step.topic.toLowerCase().includes(s.toLowerCase()))
            if (matchesKnownSkill) {
                knownIds.push(step.id)
            }
        }
        return knownIds
    })


    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(completed))
    }, [completed])

    const toggleComplete = (stepId) => {
        if (completed.includes(stepId)) {
            setCompleted(completed.filter(id => id !== stepId))
        } else {
            setCompleted([...completed, stepId])
        }
    }

    return (
        <div className="roadmap">
            <div className="roadmap-header">
                <div>
                    <h2>Your Roadmap: {roadmap.title}</h2>
                    <p className="roadmap-header__sub">
                        {identity === 'guest'
                            ? 'Saved to this browser. Sign in to keep it tied to your account.'
                            : 'Progress is saved to your account.'}
                    </p>
                </div>
                <button className="reset-btn" onClick={onReset}>← Start Over</button>
            </div>

            <ProgressBar completed={completed.length} total={roadmap.steps.length} />

            <div className="steps">
                {/* .map() turns the array of step objects into an array of
                    JSX elements — one card per step, in order. */}
                {roadmap.steps.map((step, index) => {
                    const isKnown = knownSkills.some(s =>
                        step.topic.toLowerCase().includes(s.toLowerCase())
                    )
                    const isDone = completed.includes(step.id)
                    return (
                        <div key={step.id} className={`step ${isDone ? 'is-done' : ''} ${isKnown ? 'known' : ''}`}>
                            <div className="step-header">
                                <button
                                    className={`step-check ${isDone ? 'is-checked' : ''}`}
                                    onClick={() => toggleComplete(step.id)}
                                    aria-pressed={isDone}
                                    aria-label={isDone ? 'Mark step incomplete' : 'Mark step complete'}
                                >
                                    {isDone ? '✓' : index + 1}
                                </button>
                                <span className="step-topic">{step.topic}</span>
                                {isKnown && <span className="known-badge">✓ You know this</span>}
                            </div>
                            <div className="step-resources">
                                {step.resources.map((res, i) => (
                                    <ResourceCard key={i} resource={res} />
                                ))}
                            </div>
                            {projectSuggestions[step.topic] && (
                                <div className="step-projects">
                                    <span className="step-projects__arrow">↓</span>
                                    <p className="step-projects__label">Try building:</p>
                                    <ul className="step-projects__list">
                                        {projectSuggestions[step.topic].map((idea, i) => (
                                            <li key={i}>{idea}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Roadmap
