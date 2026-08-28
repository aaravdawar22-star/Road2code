import { useNavigate } from 'react-router-dom'
import Courses from '../components/Courses'

// Lives at the "/courses" route. Clicking a track card used to scroll
// down the same page to the generator section — now it navigates to
// the separate "/generator" page instead, and passes along which goal
// was picked using route "state" so the Generator page can pre-select it.
function CoursesPage({ onPickGoal }) {
    const navigate = useNavigate()

    const handlePickGoal = (goalKey) => {
        onPickGoal(goalKey)
        navigate('/generator')
    }

    return <Courses onPickGoal={handlePickGoal} />
}

export default CoursesPage
