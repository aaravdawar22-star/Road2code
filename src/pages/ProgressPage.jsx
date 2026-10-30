import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import TrackIcon from '../components/TrackIcon'
import { useAuth } from '../context/AuthContext'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import { progressKey } from '../utils/storage'

// Only reachable when logged in (wrapped in <ProtectedRoute> in App.jsx).
function ProgressPage() {
  const { currentUser } = useAuth()

  // Hooks can't be called inside a loop, so this reads localStorage directly instead of using useLocalStorage.
  const tracks = goals.map(goal => {
    const saved = localStorage.getItem(progressKey(currentUser.email, goal.key))
    const completed = saved ? JSON.parse(saved) : []
    const steps = roadmaps[goal.key].steps
    return {
      goal,
      started: saved !== null,
      done: completed.length,
      total: steps.length,
      filled: steps.map(step => completed.includes(step.id)),
      next: steps.find(step => !completed.includes(step.id)),
    }
  })

  const started = tracks.filter(track => track.started)
  const notStarted = tracks.filter(track => !track.started)
  const totalDone = started.reduce((sum, track) => sum + track.done, 0)

  return (
    <section className="page page--narrow">
      <header className="page-head">
        <h1>Hi {currentUser.name.split(' ')[0]}, here's your progress</h1>
        <p>
          {started.length === 0
            ? "You haven't started a route yet. Pick any track below to begin."
            : `You've finished ${totalDone} stop${totalDone === 1 ? '' : 's'} across ${started.length} track${started.length === 1 ? '' : 's'}.`}
        </p>
      </header>

      <ul className="progress-list">
        {[...started, ...notStarted].map(({ goal, started: isStarted, done, total, filled, next }) => (
          <li key={goal.key} className="progress-row" style={{ '--track': goal.color }}>
            <span className="track-chip"><TrackIcon trackKey={goal.key} /></span>
            <div className="progress-row__body">
              <div className="progress-row__head">
                <h2>{goal.label}</h2>
                <Link to={`/roadmap/${goal.key}`} className="btn btn--sm">{isStarted ? 'Continue' : 'Start'}</Link>
              </div>
              <ProgressBar completed={done} total={total} color={goal.color} filled={filled} />
              <p className="progress-row__next">
                {next ? `Next stop: ${next.topic}` : 'Route complete. Every stop is done.'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProgressPage
