import { useNavigate } from 'react-router-dom'
import Quiz from '../components/Quiz'

// Lives at the "/quiz" route. When the quiz recommends a track, this
// pre-selects that goal (via the same onPickGoal flow Courses uses) and
// navigates to the generator page so the roadmap can be built right away.
function QuizPage({ onPickGoal }) {
    const navigate = useNavigate()

    const handlePickGoal = (goalKey) => {
        onPickGoal(goalKey)
        navigate('/generator')
    }

    return <Quiz onPickGoal={handlePickGoal} />
}

export default QuizPage
