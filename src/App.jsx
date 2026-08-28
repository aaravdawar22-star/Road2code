import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CoursesPage from './pages/CoursesPage'
import AboutPage from './pages/AboutPage'
import GeneratorPage from './pages/GeneratorPage'
import QuizPage from './pages/QuizPage'
import SearchPage from './pages/SearchPage'
import PrereqPage from './pages/PrereqPage'
import AuthModal from './components/AuthModal'
import { roadmaps } from './data/roadmaps'
import './styles/App.css'

// App.jsx is the "parent" component. Almost all of the app's important
// data (theme, logged-in user, which roadmap is showing) lives here in
// useState variables, and gets passed DOWN to child components as props.
// This is called "lifting state up" — when two or more components need to
// share the same data, you keep that data in their closest shared parent.

// Turns a plain password into a scrambled string before saving it.
// This is a frontend-only project with no server, so "accounts" live
// entirely in the browser's localStorage. That's fine for a demo, but it
// is NOT real security — never reuse this pattern with real passwords.
function encode(text) {
  return btoa(unescape(encodeURIComponent(text)))
}

function App() {
  // ================= THEME (dark / light) =================
  // useState's starting value is a function here so we only read
  // localStorage once, when the app first loads (not on every re-render).
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem('road2code_theme')
    return stored !== null ? JSON.parse(stored) : 'dark'
  })

  // Every time `theme` changes, this runs and does two things:
  // 1) sets a data-theme="dark"/"light" attribute on the <html> tag, which
  //    is what index.css uses to pick the right set of colors.
  // 2) saves the choice to localStorage so it's remembered on the next visit.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('road2code_theme', JSON.stringify(theme))
  }, [theme])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  // ================= AUTH (demo accounts saved in the browser) =================
  // `users` is an object that looks like: { "ada@x.com": { name, email, password }, ... }
  const [users, setUsers] = useState(() => {
    const stored = window.localStorage.getItem('road2code_users')
    return stored !== null ? JSON.parse(stored) : {}
  })

  // `session` just stores the email of whoever is currently logged in
  // (or null if nobody is logged in).
  const [session, setSession] = useState(() => {
    const stored = window.localStorage.getItem('road2code_session')
    return stored !== null ? JSON.parse(stored) : null
  })

  // Keep localStorage in sync any time the list of users changes.
  useEffect(() => {
    window.localStorage.setItem('road2code_users', JSON.stringify(users))
  }, [users])

  // Keep localStorage in sync any time who's logged in changes.
  useEffect(() => {
    window.localStorage.setItem('road2code_session', JSON.stringify(session))
  }, [session])

  // Look up the full user record for whoever is logged in right now.
  const currentUser = session && users[session] ? users[session] : null

  // Creates a brand new account and logs that person in straight away.
  const signup = (name, email, password) => {
    const key = email.trim().toLowerCase()

    if (!name.trim() || !key || !password) {
      return { ok: false, error: 'Fill in every field to continue.' }
    }
    if (users[key]) {
      return { ok: false, error: 'An account with that email already exists.' }
    }

    // Spread (...users) copies every existing user, then we add the new one.
    // We never mutate `users` directly — we always build a new object.
    const newUser = { name: name.trim(), email: key, password: encode(password) }
    const nextUsers = { ...users, [key]: newUser }

    setUsers(nextUsers)
    setSession(key)
    return { ok: true }
  }

  // Checks the email + password against the saved accounts.
  const login = (email, password) => {
    const key = email.trim().toLowerCase()
    const user = users[key]

    if (!user || user.password !== encode(password)) {
      return { ok: false, error: 'Email or password is incorrect.' }
    }

    setSession(key)
    return { ok: true }
  }

  const logout = () => setSession(null)

  // ================= ROADMAP GENERATOR FLOW =================
  const [currentRoadmap, setCurrentRoadmap] = useState(null) // the roadmap object being shown, or null
  const [currentGoalKey, setCurrentGoalKey] = useState(null) // e.g. 'frontend', 'backend'
  const [knownSkills, setKnownSkills] = useState([])         // skills the user already ticked off
  const [pickedGoal, setPickedGoal] = useState(null)         // goal clicked from the Courses section
  const [authMode, setAuthMode] = useState(null)             // null | 'login' | 'signup'

  // Guests all share one "guest" bucket of saved progress; logged-in users
  // get their own bucket keyed by email, so switching accounts doesn't mix
  // up progress.
  const identity = currentUser?.email || 'guest'

  const handleSubmit = (goal, skills) => {
    setKnownSkills(skills)
    setCurrentGoalKey(goal.key)
    setCurrentRoadmap(roadmaps[goal.key])
  }

  const handleReset = () => {
    setCurrentRoadmap(null)
    setCurrentGoalKey(null)
    setKnownSkills([])
    setPickedGoal(null)
  }

  // Called when someone clicks a track card in the Courses page —
  // pre-selects that goal. Navigating to the Generator page itself
  // now happens inside CoursesPage.jsx (via react-router's navigate()).
  const handlePickGoal = (goalKey) => {
    setPickedGoal(goalKey)
    setCurrentRoadmap(null)
  }

  return (
    // BrowserRouter turns on client-side routing for the whole app.
    // Routes/Route below say: "for this URL path, render this page
    // component inside the Layout's <Outlet />".
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              theme={theme}
              onToggleTheme={toggleTheme}
              currentUser={currentUser}
              onLogout={logout}
              onAuthOpen={setAuthMode}
            />
          }
        >
          {/* Nested routes render inside Layout's <Outlet />, so every
              page below still gets the same Navbar + Footer around it. */}
          <Route index element={<Home />} />
          <Route path="courses" element={<CoursesPage onPickGoal={handlePickGoal} />} />
          <Route path="quiz" element={<QuizPage onPickGoal={handlePickGoal} />} />
          <Route path="search" element={<SearchPage onPickGoal={handlePickGoal} />} />
          <Route path="prerequisites" element={<PrereqPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="generator"
            element={
              <GeneratorPage
                currentRoadmap={currentRoadmap}
                currentGoalKey={currentGoalKey}
                knownSkills={knownSkills}
                pickedGoal={pickedGoal}
                identity={identity}
                onSubmit={handleSubmit}
                onReset={handleReset}
              />
            }
          />
        </Route>
      </Routes>

      {/* The login/signup popup only renders while authMode is set.
          It sits outside <Routes> so it can pop up over any page. */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={() => setAuthMode(null)}
          onLogin={login}
          onSignup={signup}
        />
      )}
    </BrowserRouter>
  )
}

export default App
