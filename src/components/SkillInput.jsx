import { useEffect, useState } from 'react'
import { goals, skillOptions } from '../data/goals'

function SkillInput({ onSubmit, initialGoalKey }) {
    const [selected, setSelected] = useState([])
    const [goal, setGoal] = useState(null)

    useEffect(() => {
        if (initialGoalKey) {
            const match = goals.find(g => g.key === initialGoalKey)
            if (match) setGoal(match)
        }
    }, [initialGoalKey])

    const toggleSkill = (skill) => {
        setSelected(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        )
    }

    return (
        <div className="skill-input">
            <div className="section-head section-head--tight">
                <p className="eyebrow">Step 1 &amp; 2</p>
                <h2>Build your roadmap</h2>
            </div>

            <h3>What's your goal?</h3>
            <div className="goal-buttons">
                {goals.map(g => (
                    <button
                        key={g.key}
                        className={goal?.key === g.key ? 'goal-btn active' : 'goal-btn'}
                        onClick={() => setGoal(g)}
                    >
                        {g.icon} {g.label}
                    </button>
                ))}
            </div>

            <h3>What do you already know?</h3>
            <p className="skill-input__hint">Optional — matched steps get marked as already known.</p>
            <div className="skills-grid">
                {skillOptions.map(skill => (
                    <button
                        key={skill}
                        className={selected.includes(skill) ? 'skill-btn active' : 'skill-btn'}
                        onClick={() => toggleSkill(skill)}
                    >
                        {skill}
                    </button>
                ))}
            </div>

            <button
                className="submit-btn"
                onClick={() => onSubmit(goal, selected)}
                disabled={!goal}
            >
                Generate My Roadmap →
            </button>
        </div>
    )
}

export default SkillInput
