import PrereqChecker from '../components/PrereqChecker'

// Lives at the "/prerequisites" route. This one's fully self-contained —
// no shared state to lift up to App.jsx, so the page is just a thin
// wrapper around the component (same shape as Home.jsx).
function PrereqPage() {
    return <PrereqChecker />
}

export default PrereqPage
