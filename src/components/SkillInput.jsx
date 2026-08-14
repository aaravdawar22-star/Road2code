import { useState } from 'react'

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Java', 'Node.js', 'SQL']

function SkillInput({ onSubmit }) {
    const [selected, setSelected] = useState([])
    const [goal, setGoal] = useState('')

    const toggleSkill = (skill) => {
        setSelected(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        )
    }

    return (
        <div className="skill-input">
            <h2>What's your goal?</h2>
            <div className="goal-buttons">
                {['Frontend Developer', 'Backend Developer', 'AI/ML Engineer'].map(g => (
                    <button
                        key={g}
                        className={goal === g ? 'goal-btn active' : 'goal-btn'}
                        onClick={() => setGoal(g)}
                    >
                        {g}
                    </button>
                ))}
            </div>

            <h2>What do you already know?</h2>
            <div className="skills-grid">
                {skills.map(skill => (
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