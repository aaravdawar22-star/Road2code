import { useNavigate } from 'react-router-dom'
import TechSearch from '../components/TechSearch'

// Lives at the "/search" route. Picking a track from a search result
// pre-selects that goal and navigates to the generator, same as Courses
// and the Quiz do.
function SearchPage({ onPickGoal }) {
    const navigate = useNavigate()

    const handlePickGoal = (goalKey) => {
        onPickGoal(goalKey)
        navigate('/generator')
    }

    return <TechSearch onPickGoal={handlePickGoal} />
}

export default SearchPage
