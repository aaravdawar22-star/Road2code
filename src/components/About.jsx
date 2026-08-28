import { Link } from 'react-router-dom'
import { goals } from '../data/goals'

function AboutStep({ number, title, description }) {
    return (
        <article className="about-step">
            <span className="about-step__number">{number}</span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </article>
    )
}

function AboutFeature({ icon, title, description }) {
    return (
        <article className="about-feature">
            <span className="about-feature__icon" aria-hidden="true">{icon}</span>
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    )
}

function About() {
    return (
        <main className="about-page">
            <header className="about-page__hero">
                <p className="eyebrow">About Road2Code</p>
                <h1>From “Where do I start?” to “I know what to learn next.”</h1>
                <p>
                    Road2Code is a student-built learning roadmap that turns a career goal and
                    the skills you already know into a clearer, step-by-step path.
                </p>
                <Link to="/generator" className="btn btn--primary">Build My Roadmap →</Link>
            </header>

            <section className="about-page__section" aria-labelledby="why-title">
                <div className="section-head section-head--tight">
                    <p className="eyebrow">Why Road2Code?</p>
                    <h2 id="why-title">Learning to code should feel like a route, not a maze.</h2>
                </div>
                <div className="about-page__problem">
                    <p>
                        There are thousands of tutorials, courses and technologies available.
                        For a beginner, the difficult part is often not finding information — it is
                        knowing what to learn first, what can be skipped, and what should come next.
                    </p>
                    <p>
                        Road2Code was created to make that decision easier by connecting goals,
                        existing skills, roadmaps, quizzes, prerequisites and project ideas in one place.
                    </p>
                </div>
            </section>

            <section className="about-page__section" aria-labelledby="how-title">
                <div className="section-head">
                    <p className="eyebrow">How it works</p>
                    <h2 id="how-title">Four simple steps</h2>
                </div>
                <div className="about-page__steps">
                    <AboutStep
                        number="01"
                        title="Choose your goal"
                        description="Pick a career track such as Frontend, Backend, AI/ML, DevOps, Android or DSA."
                    />
                    <AboutStep
                        number="02"
                        title="Tell us what you know"
                        description="Select the technologies and concepts you have already learned."
                    />
                    <AboutStep
                        number="03"
                        title="Generate your roadmap"
                        description="Road2Code creates an ordered learning path while marking known topics."
                    />
                    <AboutStep
                        number="04"
                        title="Learn, practice and build"
                        description="Use resources, quizzes and project suggestions to keep moving forward."
                    />
                </div>
            </section>

            <section className="about-page__section" aria-labelledby="features-title">
                <div className="section-head">
                    <p className="eyebrow">What you can do</p>
                    <h2 id="features-title">Built around practical learning</h2>
                </div>
                <div className="about-page__features">
                    <AboutFeature icon="🎯" title="Personalized Roadmaps" description="Start from your goal and skip topics you already know." />
                    <AboutFeature icon="🧠" title="Interactive Quizzes" description="Test your understanding while exploring different career paths." />
                    <AboutFeature icon="🔎" title="Skill Search" description="Find technologies and learning resources quickly." />
                    <AboutFeature icon="🧩" title="Prerequisite Checker" description="See what concepts you should learn before moving ahead." />
                    <AboutFeature icon="💡" title="Project Suggestions" description="Turn learning into practice with project ideas for roadmap topics." />
                    <AboutFeature icon="📈" title="Progress Tracking" description="Mark roadmap steps complete and keep your progress in the browser." />
                </div>
            </section>

            <section className="about-page__section" aria-labelledby="stats-title">
                <div className="about-page__stats-card">
                    <div>
                        <p className="eyebrow">Road2Code at a glance</p>
                        <h2 id="stats-title">A small project with a clear learning goal.</h2>
                        <p>
                            The current version contains {goals.length} career tracks and combines
                            reusable React components with structured JavaScript data.
                        </p>
                    </div>
                    <div className="about-page__stats">
                        <div>
                            <strong>{goals.length}</strong>
                            <span>career tracks</span>
                        </div>
                        <div>
                            <strong>5</strong>
                            <span>quiz questions</span>
                        </div>
                        <div>
                            <strong>100%</strong>
                            <span>student project</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-page__section" aria-labelledby="tech-title">
                <div className="section-head">
                    <p className="eyebrow">Built with</p>
                    <h2 id="tech-title">The technologies behind the project</h2>
                </div>
                <div className="about-page__tech">
                    <article><strong>HTML5</strong><span>Semantic page structure</span></article>
                    <article><strong>CSS3</strong><span>Responsive styling and animations</span></article>
                    <article><strong>JavaScript</strong><span>Application logic and data handling</span></article>
                    <article><strong>React</strong><span>Reusable functional components and state</span></article>
                    <article><strong>React Router</strong><span>Navigation between application pages</span></article>
                </div>
            </section>

            <section className="about-page__section" aria-labelledby="philosophy-title">
                <div className="about-page__philosophy">
                    <div>
                        <p className="eyebrow">Learning philosophy</p>
                        <h2 id="philosophy-title">Learn → Practice → Build → Repeat</h2>
                    </div>
                    <p>
                        Learning a programming concept is only the beginning. Road2Code encourages
                        a cycle of understanding the concept, practicing it, building something with it,
                        and then moving to the next challenge.
                    </p>
                </div>
            </section>

            <section className="about-page__cta" aria-labelledby="cta-title">
                <p className="eyebrow">Ready to start?</p>
                <h2 id="cta-title">You don't need to know everything. Just know what to learn next.</h2>
                <Link to="/generator" className="btn btn--primary btn--lg">Start Your Roadmap →</Link>
            </section>
        </main>
    )
}

export default About
