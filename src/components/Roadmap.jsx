import ResourceCard from './ResourceCard'

function Roadmap({ roadmap, knownSkills, onReset }) {
    return (
        <div className="roadmap">
            <div className="roadmap-header">
                <h2>Your Roadmap: {roadmap.title}</h2>
                <button className="reset-btn" onClick={onReset}>← Start Over</button>
            </div>

            <div className="steps">
                {roadmap.steps.map((step, index) => {
                    const isKnown = knownSkills.some(s =>
                        step.topic.toLowerCase().includes(s.toLowerCase())
                    )
                    return (
                        <div key={step.id} className={`step ${isKnown ? 'known' : ''}`}>
                            <div className="step-header">
                                <span className="step-number">{index + 1}</span>
                                <span className="step-topic">{step.topic}</span>
                                {isKnown && <span className="known-badge">✓ You know this</span>}
                            </div>
                            <div className="step-resources">
                                {step.resources.map((res, i) => (
                                    <ResourceCard key={i} resource={res} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Roadmap