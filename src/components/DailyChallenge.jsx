import { useState } from 'react'

const challenge = {
    question: 'What does JavaScript Array.map() return?',
    options: [
        'A new array',
        'Only the first item',
        'A CSS class',
        'Nothing',
    ],
    answer: 0,
}

function DailyChallenge() {
    const [selected, setSelected] = useState(null)
    const [checked, setChecked] = useState(false)

    const checkAnswer = () => {
        if (selected !== null) {
            setChecked(true)
        }
    }

    const resetChallenge = () => {
        setSelected(null)
        setChecked(false)
    }

    return (
        <section className="challenge" aria-labelledby="challenge-title">
            <div className="section-head">
                <p className="eyebrow">Practice a little every day</p>
                <h2 id="challenge-title">Daily Coding Challenge</h2>
                <p className="section-head__sub">
                    Test one small JavaScript concept before you continue your learning journey.
                </p>
            </div>

            <div className="challenge__card">
                <p className="challenge__label">JavaScript • Beginner</p>
                <h3>{challenge.question}</h3>

                <div className="challenge__options" role="group" aria-label="Answer choices">
                    {challenge.options.map((option, index) => {
                        const isSelected = selected === index
                        const isCorrect = checked && index === challenge.answer
                        const isWrong = checked && isSelected && index !== challenge.answer

                        return (
                            <button
                                key={option}
                                type="button"
                                className={`challenge__option ${isSelected ? 'is-selected' : ''} ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                                onClick={() => {
                                    if (!checked) setSelected(index)
                                }}
                                aria-pressed={isSelected}
                            >
                                <span>{String.fromCharCode(65 + index)}</span>
                                {option}
                            </button>
                        )
                    })}
                </div>

                {checked && (
                    <p className={`challenge__result ${selected === challenge.answer ? 'is-correct' : 'is-wrong'}`}>
                        {selected === challenge.answer
                            ? 'Correct! map() creates and returns a new array.'
                            : 'Not quite. map() creates and returns a new array.'}
                    </p>
                )}

                <div className="challenge__actions">
                    {!checked ? (
                        <button className="btn btn--primary" onClick={checkAnswer} disabled={selected === null}>
                            Check Answer
                        </button>
                    ) : (
                        <button className="btn btn--ghost" onClick={resetChallenge}>
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default DailyChallenge
