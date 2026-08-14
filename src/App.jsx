import { useState } from 'react'
import SkillInput from './components/SkillInput'
import Roadmap from './components/Roadmap'
import { roadmaps } from './data/roadmaps'
import './App.css'

function App() {
  const [currentRoadmap, setCurrentRoadmap] = useState(null)
  const [knownSkills, setKnownSkills] = useState([])

  const handleSubmit = (goal, skills) => {
    const key = goal === 'Frontend Developer' ? 'frontend'
      : goal === 'Backend Developer' ? 'backend'
        : 'aiml'
    setKnownSkills(skills)
    setCurrentRoadmap(roadmaps[key])
  }

  const handleReset = () => {
    setCurrentRoadmap(null)
    setKnownSkills([])
  }

  return (
    <div className="app">
      <header>
        <h1>Road2Code 🚀</h1>
        <p>Your personalized path to getting hired</p>
      </header>
      <main>
        {!currentRoadmap
          ? <SkillInput onSubmit={handleSubmit} />
          : <Roadmap roadmap={currentRoadmap} knownSkills={knownSkills} onReset={handleReset} />
        }
      </main>
    </div>
  )
}

export default App