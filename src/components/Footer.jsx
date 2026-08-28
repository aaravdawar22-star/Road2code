import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <span className="footer__brand">Road2Code</span>
                <p>Built as a student project — HTML, CSS, JavaScript &amp; React, no backend required.</p>
                <nav className="footer__links" aria-label="Footer">
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/quiz">Quiz</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/prerequisites">Prereqs</Link>
                    <Link to="/about">About</Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
