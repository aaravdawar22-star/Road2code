import SkillInput from '../components/SkillInput'
import Roadmap from '../components/Roadmap'

// Lives at the "/generator" route. This is the same conditional-render
// logic that used to sit inside the <section id="generator"> in
// App.jsx: show the skill picker until a roadmap has been generated,
// then swap to showing that roadmap. All the actual state (currentRoadmap,
// knownSkills, etc.) still lives up in App.jsx and gets passed down here
// as props, the same way it always got passed down to this section.
function GeneratorPage({
    currentRoadmap,
    currentGoalKey,
    knownSkills,
    pickedGoal,
    identity,
    onSubmit,
    onReset,
}) {
    return (
        <section id="generator" className="generator">
            {!currentRoadmap ? (
                <SkillInput onSubmit={onSubmit} initialGoalKey={pickedGoal} />
            ) : (
                <Roadmap
                    roadmap={currentRoadmap}
                    goalKey={currentGoalKey}
                    knownSkills={knownSkills}
                    onReset={onReset}
                    identity={identity}
                />
            )}
        </section>
    )
}

export default GeneratorPage
