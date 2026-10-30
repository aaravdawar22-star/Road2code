import { Link } from 'react-router-dom'
import { Command, Compass, ListChecks, Newspaper, Search, StickyNote } from 'lucide-react'
import { goals } from '../data/goals'
import { roadmaps } from '../data/roadmaps'
import { quizQuestions } from '../data/quiz'

const features = [
  { icon: Compass, title: 'Routes for 12 careers', text: 'Ordered stops from your first topic to a job-ready skill set, with known topics ticked for you.' },
  { icon: ListChecks, title: 'Progress that sticks', text: 'Tick stops as you finish them. Progress is saved per account, so it survives a refresh.' },
  { icon: StickyNote, title: 'Notes on every stop', text: 'Write down what clicked or what to revise. Add, edit and delete notes right on the route.' },
  { icon: Newspaper, title: 'Fresh articles', text: 'Each stop pulls popular posts from the DEV community, so you see how people use it today.' },
  { icon: Search, title: 'Search across tracks', text: 'Search all stops at once, filter by track and sort the results.' },
  { icon: Command, title: 'Keyboard shortcuts', text: 'Press Ctrl+K (or ⌘K on a Mac) to jump to any page or route without the mouse.' },
]

const techStack = [
  { name: 'React 19', use: 'Components, hooks and Context' },
  { name: 'React Router 7', use: 'Pages, URL parameters and protected routes' },
  { name: 'Vite', use: 'Dev server and production build' },
  { name: 'CSS', use: 'Hand-written styles with variables for both themes' },
  { name: 'DEV.to API', use: 'Live articles for every stop' },
]

const totalStops = Object.values(roadmaps).reduce((sum, track) => sum + track.steps.length, 0)

function Feature({ icon: Icon, title, text }) {
  return (
    <li className="feature">
      <Icon size={20} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  )
}

function AboutPage() {
  return (
    <section className="page">
      <header className="page-head page-head--wide">
        <h1>Why we built Road2Code</h1>
        <p>
          There are thousands of tutorials and nobody tells you the order. Beginners lose weeks
          deciding what to learn next. Road2Code turns a career goal and the skills you already
          have into one ordered route, so the next step is always clear.
        </p>
      </header>

      <dl className="stats">
        <div><dt>Career tracks</dt><dd>{goals.length}</dd></div>
        <div><dt>Stops to learn</dt><dd>{totalStops}</dd></div>
        <div><dt>Quiz questions</dt><dd>{quizQuestions.length}</dd></div>
      </dl>

      <h2 className="section-title">What you can do</h2>
      <ul className="features">
        {features.map(feature => (
          <Feature key={feature.title} {...feature} />
        ))}
      </ul>

      <h2 className="section-title">Built with</h2>
      <ul className="stack">
        {techStack.map(tech => (
          <li key={tech.name}>
            <strong>{tech.name}</strong>
            <span>{tech.use}</span>
          </li>
        ))}
      </ul>

      <div className="cta">
        <p>You don't need to know everything. Just the next stop.</p>
        <Link to="/generator" className="btn btn--primary btn--lg">Plan my route</Link>
      </div>
    </section>
  )
}

export default AboutPage
