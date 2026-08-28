import { goals } from '../data/goals'

function Courses({ onPickGoal }) {
    return (
        <section id="courses" className="courses">
            <div className="section-head">
                <p className="eyebrow">Six tracks, one format</p>
                <h2>Courses on offer</h2>
                <p className="section-head__sub">
                    Every track below follows the same shape: an ordered set of stops, each with
                    a video and written docs. Pick one to jump straight to the generator.
                </p>
            </div>

            <div className="courses__grid">
                {goals.map(g => (
                    <button key={g.key} className="course-card" onClick={() => onPickGoal(g.key)}>
                        <span className="course-card__icon">{g.icon}</span>
                        <h3>{g.label}</h3>
                        <p>{g.blurb}</p>
                        <span className="course-card__meta">{g.stops} stops</span>
                        <span className="course-card__cta">Build my roadmap →</span>
                    </button>
                ))}
            </div>
        </section>
    )
}

export default Courses
