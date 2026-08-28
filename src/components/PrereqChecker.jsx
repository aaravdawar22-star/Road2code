import { useState } from 'react'
import { skillOptions } from '../data/goals'
import { prerequisites, nextStep } from '../data/prerequisites'

// Lets a visitor pick any technology and see what they should already
// know before diving in, plus the single next thing to learn after it.
// All the data is static (prerequisites.js), so this component just
// holds which skill is currently selected.
function PrereqChecker() {
    const [selected, setSelected] = useState(null)

    const prereqList = selected ? prerequisites[selected] : []
    const recommendedNext = selected ? nextStep[selected] : null
    const immediatePrereq = prereqList.length > 0 ? prereqList[prereqList.length - 1] : null

    return (
        <div className="prereq-checker">
            <div className="section-head section-head--tight">
                <p className="eyebrow">Not sure what to learn first?</p>
                <h2>Skill Prerequisite Checker</h2>
                <p className="section-head__sub">
                    Pick a technology and see what you should already know before jumping in.
                </p>
            </div>

            <div className="skills-grid">
                {skillOptions.map(skill => (
                    <button
                        key={skill}
                        className={selected === skill ? 'skill-btn active' : 'skill-btn'}
                        onClick={() => setSelected(skill)}
                    >
                        {skill}
                    </button>
                ))}
            </div>

            {selected && (
                <div className="prereq-result">
                    <div className="prereq-result__skill">{selected}</div>
                    <div className="prereq-result__arrow">↓</div>

                    {prereqList.length === 0 ? (
                        <p className="prereq-result__none">
                            No prerequisites — {selected} is a great place to start.
                        </p>
                    ) : (
                        <>
                            <p className="prereq-result__label">You should know:</p>
                            <ul className="prereq-result__list">
                                {prereqList.map(skill => (
                                    <li key={skill}>
                                        <span className="prereq-result__check">✓</span> {skill}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {(immediatePrereq || recommendedNext) && (
                        <div className="prereq-result__recommended">
                            <p className="prereq-result__label">Recommended:</p>
                            <p className="prereq-result__path">
                                {immediatePrereq && <span>{immediatePrereq} → </span>}
                                <span className="prereq-result__path-current">{selected}</span>
                                {recommendedNext && <span> → {recommendedNext}</span>}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PrereqChecker
