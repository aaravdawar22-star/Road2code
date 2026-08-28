import Hero from '../components/Hero'
import DailyChallenge from '../components/DailyChallenge'

// The homepage combines the original hero with one small practice feature.
function Home() {
    return (
        <>
            <Hero />
            <DailyChallenge />
        </>
    )
}

export default Home
