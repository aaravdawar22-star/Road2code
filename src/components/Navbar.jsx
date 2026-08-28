import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

// This component receives everything it needs (theme, currentUser, etc.)
// as PROPS from App.jsx instead of holding that data itself. Navbar only
// keeps its own local UI state: whether the mobile menu is open, and
// whether the page has been scrolled.
//
// NavLink works like a normal link (it changes the URL and swaps the
// page) but it also knows when its own "to" matches the current URL, so
// we can highlight whichever page is active — see the className function
// below.
const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/courses', label: 'Courses' },
    { to: '/quiz', label: 'Quiz' },
    { to: '/search', label: 'Search' },
    { to: '/prerequisites', label: 'Prereqs' },
    { to: '/about', label: 'About' },
]

function Navbar({ theme, onToggleTheme, currentUser, onLogout, onAuthOpen }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Listens for scroll events on the whole window and flips `scrolled`
    // to true once the page has scrolled down more than 12px — this is
    // what makes the navbar shrink/elevate itself via CSS.
    // The cleanup function (return ...) removes the listener when this
    // component unmounts, so it doesn't keep running forever.
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLinkClick = () => setMenuOpen(false)

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                <NavLink to="/" className="navbar__brand" onClick={handleLinkClick}>
                    <span className="navbar__mark" aria-hidden="true">R2C</span>
                    Road2Code
                </NavLink>

                <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
                    {links.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={handleLinkClick}
                            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="navbar__mobile-actions">
                        {currentUser ? (
                            <button className="btn btn--ghost" onClick={() => { onLogout(); handleLinkClick() }}>
                                Log out
                            </button>
                        ) : (
                            <button className="btn btn--primary" onClick={() => { onAuthOpen('login'); handleLinkClick() }}>
                                Log in / Sign up
                            </button>
                        )}
                    </div>
                </nav>

                <div className="navbar__actions">
                    <button
                        className="theme-toggle"
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        <span className="theme-toggle__icon">{theme === 'dark' ? '☾' : '☀'}</span>
                    </button>

                    {currentUser ? (
                        <div className="navbar__user">
                            <span className="navbar__avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                            <span className="navbar__username">{currentUser.name.split(' ')[0]}</span>
                            <button className="btn btn--ghost btn--sm" onClick={onLogout}>Log out</button>
                        </div>
                    ) : (
                        <button className="btn btn--primary btn--sm" onClick={() => onAuthOpen('login')}>
                            Log in / Sign up
                        </button>
                    )}

                    <button
                        className={`hamburger ${menuOpen ? 'is-open' : ''}`}
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
