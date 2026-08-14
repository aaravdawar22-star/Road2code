import { useState } from 'react'

const skillOptions = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
    'Python', 'Java', 'Kotlin', 'C', 'C++', 'Node.js',
    'SQL', 'MongoDB', 'Docker', 'Git', 'Linux', 'AWS',
    'NumPy', 'Pandas', 'PyTorch', 'TensorFlow', 'Firebase', 'REST APIs'
]

const goals = [
    { label: 'Frontend Developer', key: 'frontend', icon: '🎨' },
    { label: 'Backend Developer', key: 'backend', icon: '⚙️' },
    { label: 'AI/ML Engineer', key: 'aiml', icon: '🤖' },
    { label: 'DevOps Engineer', key: 'devops', icon: '🚀' },
    { label: 'Android Developer', key: 'android', icon: '📱' },
    { label: 'DSA & Competitive', key: 'dsa', icon: '🧠' },
]

function SkillInput({ onSubmit }) {
    const [selected, setSelected] = useState([])
    const [goal, setGoal] = useState(null)

    const toggleSkill = (skill) => {
        setSelected(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        )
    }

    return (
        <div className="skill-input">
            <h2>What's your goal?</h2>
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

            <h2>What do you already know?</h2>
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