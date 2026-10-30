import { useState } from 'react'
import { Check, Copy, MapPin, Newspaper, RotateCcw, StickyNote } from 'lucide-react'
import ProgressBar from './ProgressBar'
import ResourceCard from './ResourceCard'
import StepArticles from './StepArticles'
import StepNotes from './StepNotes'
import TrackIcon from './TrackIcon'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNotes } from '../hooks/useNotes'
import { useToast } from '../context/ToastContext'
import { projectSuggestions } from '../data/projectSuggestions'

// Splits text into lowercase words: "Node.js Basics" -> ["node.js", "basics"]
const toWords = (text) => text.toLowerCase().split(/[^a-z0-9+#.]+/).filter(Boolean)

// Splits a topic into its parts: "HTML, CSS & JavaScript" -> ["HTML", "CSS", "JavaScript"]
const toParts = (topic) => topic.split(/\s+or\s+|[&,/()]/).map(part => part.trim()).filter(Boolean)

// A stop counts as known when one of its parts starts with a skill the user picked.
// So "CSS" ticks "HTML & CSS" but not "Tailwind CSS", and "Java" never ticks "JavaScript".
function knowsTopic(topic, skills) {
  const parts = toParts(topic).map(toWords)
  return skills.some(skill => {
    const skillWords = toWords(skill)
    return parts.some(part => skillWords.every((word, i) => part[i] === word))
  })
}

function Roadmap({ goal, roadmap, storageKey, notesStorageKey, isGuest, knownSkills, onStartOver }) {
  const showToast = useToast()

  // Ids of completed steps, e.g. [1, 3]. On the first visit, steps the user already knows start ticked.
  const [completed, setCompleted] = useLocalStorage(storageKey, () =>
    roadmap.steps.filter(step => knowsTopic(step.topic, knownSkills)).map(step => step.id)
  )
  const { notesFor, addNote, updateNote, deleteNote } = useNotes(notesStorageKey)
  const [openPanel, setOpenPanel] = useState(null) // e.g. "notes-3" or "articles-3"; only one open at a time

  const nextStop = roadmap.steps.find(step => !completed.includes(step.id))

  const toggleComplete = (step) => {
    if (completed.includes(step.id)) {
      setCompleted(completed.filter(id => id !== step.id))
      showToast(`Reopened ${step.topic}`)
    } else {
      setCompleted([...completed, step.id])
      showToast(`Marked ${step.topic} as done`)
    }
  }

  const togglePanel = (panel) => setOpenPanel(current => (current === panel ? null : panel))

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Link copied')
    } catch {
      showToast("Couldn't copy the link. Copy it from the address bar instead.", 'error')
    }
  }

  return (
    <article className="roadmap" style={{ '--track': goal.color }}>
      <header className="roadmap__head">
        <div className="roadmap__title">
          <span className="track-chip track-chip--lg"><TrackIcon trackKey={goal.key} size={22} /></span>
          <div>
            <h1>{roadmap.title} route</h1>
            <p>
              {isGuest
                ? 'Saved in this browser. Log in to keep it under your account.'
                : 'Saved under your account in this browser.'}
            </p>
          </div>
        </div>
        <div className="roadmap__actions">
          <button className="btn btn--sm" onClick={copyLink}>
            <Copy size={15} aria-hidden="true" /> Copy link
          </button>
          <button className="btn btn--sm" onClick={onStartOver}>
            <RotateCcw size={15} aria-hidden="true" /> Start over
          </button>
        </div>
        <ProgressBar
          completed={completed.length}
          total={roadmap.steps.length}
          color={goal.color}
          filled={roadmap.steps.map(step => completed.includes(step.id))}
        />
      </header>

      <ol className="stations">
        {roadmap.steps.map((step, index) => {
          const isDone = completed.includes(step.id)
          const isKnown = knowsTopic(step.topic, knownSkills)
          const isNext = nextStop?.id === step.id
          const ideas = projectSuggestions[step.topic]
          const notes = notesFor(step.id)
          const notesPanel = `notes-${step.id}`
          const articlesPanel = `articles-${step.id}`

          return (
            <li key={step.id} className={`station ${isDone ? 'is-done' : ''} ${isNext ? 'is-next' : ''}`}>
              <button
                className="station__marker"
                onClick={() => toggleComplete(step)}
                aria-pressed={isDone}
                aria-label={isDone ? `Mark ${step.topic} as not done` : `Mark ${step.topic} as done`}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : index + 1}
              </button>

              <div className="station__body">
                <div className="station__head">
                  <h2>{step.topic}</h2>
                  {isNext && (
                    <span className="badge badge--here">
                      <MapPin size={13} aria-hidden="true" /> You are here
                    </span>
                  )}
                  {isKnown && <span className="badge">You know this</span>}
                </div>

                <div className="station__resources">
                  {step.resources.map(resource => (
                    <ResourceCard key={resource.url} resource={resource} />
                  ))}
                </div>

                {ideas && (
                  <div className="station__ideas">
                    <h3>Practice projects</h3>
                    <ul>
                      {ideas.map(idea => <li key={idea}>{idea}</li>)}
                    </ul>
                  </div>
                )}

                <div className="station__tools">
                  <button
                    className={`tool-btn ${openPanel === notesPanel ? 'is-open' : ''}`}
                    onClick={() => togglePanel(notesPanel)}
                    aria-expanded={openPanel === notesPanel}
                  >
                    <StickyNote size={15} aria-hidden="true" /> Notes
                    {notes.length > 0 && <span className="tool-btn__count">{notes.length}</span>}
                  </button>
                  <button
                    className={`tool-btn ${openPanel === articlesPanel ? 'is-open' : ''}`}
                    onClick={() => togglePanel(articlesPanel)}
                    aria-expanded={openPanel === articlesPanel}
                  >
                    <Newspaper size={15} aria-hidden="true" /> Articles
                  </button>
                </div>

                {openPanel === notesPanel && (
                  <StepNotes
                    notes={notes}
                    onAdd={(text) => addNote(step.id, text)}
                    onUpdate={(noteId, text) => updateNote(step.id, noteId, text)}
                    onDelete={(noteId) => deleteNote(step.id, noteId)}
                  />
                )}
                {openPanel === articlesPanel && <StepArticles tag={step.tag} />}
              </div>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default Roadmap
