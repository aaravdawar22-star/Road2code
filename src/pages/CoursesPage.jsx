import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RouteLine from '../components/RouteLine'
import TrackIcon from '../components/TrackIcon'
import { categories, goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'

const sortLabels = { recommended: 'Recommended', shortest: 'Shortest first', name: 'Name (A to Z)' }

function CoursesPage({ onPickGoal }) {
  const navigate = useNavigate()
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('recommended')

  // Worked out from state on every render, so the list can never go out of sync with the filters.
  const filtered = goals.filter(goal => category === 'All' || goal.category === category)
  const visible = [...filtered].sort((a, b) => {
    if (sortBy === 'shortest') return a.weeks - b.weeks
    if (sortBy === 'name') return a.label.localeCompare(b.label)
    return 0 // "recommended" keeps the original order
  })

  const handlePick = (goalKey) => {
    onPickGoal(goalKey)
    navigate('/generator')
  }

  return (
    <section className="page">
      <header className="page-head">
        <h1>Courses</h1>
        <p>{goals.length} tracks, each an ordered route of 8 stops. Pick one and we'll plan it around what you already know.</p>
      </header>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by category">
          {['All', ...categories].map(name => (
            <button
              key={name}
              className={`chip ${category === name ? 'is-on' : ''}`}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
              <span className="chip__count">
                {name === 'All' ? goals.length : goals.filter(goal => goal.category === name).length}
              </span>
            </button>
          ))}
        </div>
        <label className="select">
          <span>Sort</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      <ul className="board">
        {visible.map(goal => {
          const steps = roadmaps[goal.key].steps
          return (
            <li key={goal.key} className="board__row" style={{ '--track': goal.color }}>
              <span className="track-chip"><TrackIcon trackKey={goal.key} /></span>
              <div className="board__name">
                <h2>{goal.label}</h2>
                <p>From {steps[0].topic} to {steps[steps.length - 1].topic}</p>
              </div>
              <div className="board__line">
                <RouteLine compact stops={steps.map(step => step.topic)} color={goal.color} />
              </div>
              <dl className="board__facts">
                <div><dt>Stops</dt><dd>{steps.length}</dd></div>
                <div><dt>Pace</dt><dd>{goal.weeks} weeks</dd></div>
                <div><dt>Level</dt><dd>{goal.level}</dd></div>
              </dl>
              <button className="btn btn--sm" onClick={() => handlePick(goal.key)}>Plan route</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CoursesPage
