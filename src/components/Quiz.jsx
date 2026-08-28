import { useState } from 'react'
import { goals } from '../data/goals'
import { quizQuestions } from '../data/quiz'
import ProgressBar from './ProgressBar'

// Builds the starting scoreboard: one entry per track, all starting at 0.
// e.g. { frontend: 0, backend: 0, aiml: 0, devops: 0, android: 0, dsa: 0 }
function buildInitialScores() {
    const scores = {}
    for (let i = 0; i < goals.length; i++) {
        scores[goals[i].key] = 0
    }
    return scores
}

function pickWinner(scores) {
    let winnerKey = goals[0].key
    let winnerScore = -1
    for (let i = 0; i < goals.length; i++) {
        const key = goals[i].key
        if (scores[key] > winnerScore) {
            winnerScore = scores[key]
            winnerKey = key
        }
    }
    return winnerKey
}

// A short multiple-choice quiz: five questions, six options each (one per
// track). Every option answered adds one point to that track's score.
// Once every question is answered, whichever track scored highest is
// shown as the recommendation.
function Quiz({ onPickGoal }) {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [scores, setScores] = useState(buildInitialScores)
    const [finished, setFinished] = useState(false)

    const totalQuestions = quizQuestions.length
    const currentQuestion = quizQuestions[questionIndex]

    const handleAnswer = (goalKey) => {
        const nextScores = { ...scores, [goalKey]: scores[goalKey] + 1 }
        setScores(nextScores)

        if (questionIndex + 1 < totalQuestions) {
            setQuestionIndex(questionIndex + 1)
        } else {
            setFinished(true)
        }
    }

    const handleRetake = () => {
        setQuestionIndex(0)
        setScores(buildInitialScores())
        setFinished(false)
    }

    if (finished) {
        const winnerKey = pickWinner(scores)
        const winner = goals.find(g => g.key === winnerKey)

        return (
            <div className="quiz">
                <div className="quiz-result">
                    <p className="eyebrow">Your best-fit track</p>
                    <span className="quiz-result__icon">{winner.icon}</span>
                    <h2>{winner.label}</h2>
                    <p className="quiz-result__tagline">{winner.tagline}</p>
                    <p className="quiz-result__blurb">{winner.blurb}</p>

                    <div className="quiz-result__actions">
                        <button className="btn btn--primary btn--lg" onClick={() => onPickGoal(winner.key)}>
                            Build my roadmap →
                        </button>
                        <button className="btn btn--ghost" onClick={handleRetake}>
                            Retake quiz
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="quiz">
            <div className="section-head section-head--tight">
                <p className="eyebrow">Not sure which track fits?</p>
                <h2>Career Recommendation Quiz</h2>
                <p className="section-head__sub">
                    Answer five quick questions and we'll point you at the track that fits best.
                </p>
            </div>

            <ProgressBar completed={questionIndex} total={totalQuestions} />

            <div className="quiz-question">
                <span className="quiz-question__count">Question {questionIndex + 1} of {totalQuestions}</span>
                <h3>{currentQuestion.prompt}</h3>
                <div className="quiz-options">
                    {currentQuestion.options.map((option, i) => (
                        <button
                            key={i}
                            className="goal-btn quiz-option"
                            onClick={() => handleAnswer(option.goalKey)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Quiz
