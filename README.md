# Road2Code

Pick a career track, tick the skills you already know, and Road2Code turns them into an
ordered learning route: 8 stops per track, each with a video, the docs, practice projects,
your own notes and fresh articles from the DEV community. Progress is saved per account in
the browser.

## Run it

```bash
npm install
npm run dev      # start the dev server, then open the printed localhost URL
npm run build    # production build in dist/
npm run lint     # check the code with oxlint
```

## Features

| Page | Route | What it does |
| --- | --- | --- |
| Home | `/` | Interactive route map that cycles through all 12 tracks, plus a daily challenge loaded with `fetch` |
| Courses | `/courses` | All 12 tracks as a board, with category filters and sorting |
| Generator | `/generator` | Choose a track and the skills you already know |
| Roadmap | `/roadmap/:goalKey` | The route for one track: tick stops, "You are here", notes and live articles per stop |
| Quiz | `/quiz` | Six questions that rank your three best-fit tracks |
| Search | `/search` | Debounced search across all 96 stops, with a track filter, sorting and highlighted matches |
| Prereqs | `/prerequisites` | What to learn before a technology, and what comes next |
| About | `/about` | Why the project exists, with stats worked out from the data |
| My progress | `/progress` | Logged-in users only: progress and next stop on every track |
| 404 | any other URL | Not-found page (also shown for an unknown track) |

Also on every page:

- **Command palette:** press `Ctrl+K` (or `⌘K` on a Mac) to jump to any page or route with the keyboard.
- **Toasts:** short pop-up confirmations for ticks, notes, copying a link, logging in and out.
- **Light and dark themes,** remembered between visits.

Login and signup are a frontend-only demo: accounts live in `localStorage` and
passwords are only Base64-encoded, so this is not real security.

## Folder structure

```
src/
  main.jsx              entry point: fonts, then <App /> inside ToastProvider and AuthProvider
  App.jsx               routes + lifted state shared between pages
  context/              AuthContext/AuthProvider and ToastContext/ToastProvider
  hooks/                useLocalStorage, useTheme, useDebounce, useNotes, useArticles
  components/           Layout, Navbar, Footer, CommandPalette, AuthModal, ProtectedRoute,
                        Hero, DailyChallenge, Roadmap, StepNotes, StepArticles,
                        RouteLine, ProgressBar, ResourceCard, TrackIcon, BrandMark
  pages/                one component per route
  data/                 tracks, roadmap steps, quiz, prerequisites, project ideas, nav links
  utils/storage.js      the localStorage keys for progress and notes
  index.css             colour variables for both themes + global reset
  styles/App.css        component styles
public/
  challenges.json       questions for the daily challenge
```

## React concepts used

| Concept | Where |
| --- | --- |
| Components, props, JSX | every file in `components/` and `pages/` |
| Reusable components | `RouteLine` (hero, courses board, prerequisites), `ProgressBar` (roadmap, progress, quiz) |
| `useState` (incl. lazy initial state) | `QuizPage`, `GeneratorPage`, `StepNotes`, `useLocalStorage` |
| `useEffect` with cleanup | `Layout` (Ctrl+K), `Navbar` (scroll), `AuthModal` (Escape), `Hero` (timer), `ToastProvider` (auto-dismiss), `useDebounce`, `useArticles` (AbortController) |
| `useRef` | `SearchPage` (focus the input), `CommandPalette` (focus + scroll), `ToastProvider` (id counter) |
| `useMemo` | `SearchPage` (filtered and sorted results) |
| `useCallback` | `AuthProvider` (`closeAuth`), `ToastProvider` (`showToast`, `dismiss`) |
| Custom hooks | `useLocalStorage`, `useTheme`, `useDebounce`, `useNotes`, `useArticles`, `useAuth`, `useToast` |
| Context API | `AuthContext` (logged-in user) and `ToastContext` (`showToast` from anywhere) |
| Lifting state up | `App.jsx` (`pickedGoal`, `knownSkills`) |
| Derived state | `CoursesPage` (filter + sort), `QuizPage` (`finished`), `Roadmap` (next stop) |
| Immutable updates of nested data | `useNotes` (add, edit, delete notes inside an object of arrays) |
| Lists and keys, `key` to re-mount | every page; `Hero` and `RoadmapPage` use `key` to reset a component |
| Controlled forms with validation | `AuthModal`, `StepNotes`, `SearchPage` |
| React Router | nested routes + `Outlet`, `NavLink`, `useNavigate`, `useParams`, `useLocation`, protected route, 404 |
| Async data: loading, error, retry, pagination | `DailyChallenge`, `useArticles` + `StepArticles` (DEV.to API) |
| Keyboard events | `CommandPalette` (arrows, Enter, Escape), `Layout` (Ctrl+K) |
