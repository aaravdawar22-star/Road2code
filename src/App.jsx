import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AuthModal from './components/AuthModal'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import QuizPage from './pages/QuizPage'
import SearchPage from './pages/SearchPage'
import PrereqPage from './pages/PrereqPage'
import AboutPage from './pages/AboutPage'
import GeneratorPage from './pages/GeneratorPage'
import RoadmapPage from './pages/RoadmapPage'
import ProgressPage from './pages/ProgressPage'
import NotFoundPage from './pages/NotFoundPage'
import { useAuth } from './context/AuthContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import './styles/App.css'

function App() {
  const { authMode } = useAuth()

  // Lifted state: these are set on one page and read on another,
  // so they live here in the closest common parent.
  const [pickedGoal, setPickedGoal] = useState(null)
  const [knownSkills, setKnownSkills] = useLocalStorage('road2code_known_skills', [])

  const handleStartOver = () => {
    setPickedGoal(null)
    setKnownSkills([])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage onPickGoal={setPickedGoal} />} />
          <Route path="quiz" element={<QuizPage onPickGoal={setPickedGoal} />} />
          <Route path="search" element={<SearchPage onPickGoal={setPickedGoal} />} />
          <Route path="prerequisites" element={<PrereqPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="generator"
            element={<GeneratorPage pickedGoal={pickedGoal} onGenerate={setKnownSkills} />}
          />
          <Route
            path="roadmap/:goalKey"
            element={<RoadmapPage knownSkills={knownSkills} onStartOver={handleStartOver} />}
          />
          <Route
            path="progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {authMode && <AuthModal />}
    </BrowserRouter>
  )
}

export default App
