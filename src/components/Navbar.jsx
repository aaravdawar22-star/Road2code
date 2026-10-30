import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LogOut, Menu, Moon, Search, Sun, X } from 'lucide-react'
import BrandMark from './BrandMark'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../hooks/useTheme'
import { navLinks } from '../data/navLinks'

const isMac = typeof navigator !== 'undefined' && navigator.userAgent.includes('Mac')

function Navbar({ onOpenPalette }) {
  const { currentUser, logout, openAuth } = useAuth()
  const showToast = useToast()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Adds a border once the page is scrolled. The cleanup removes the listener on unmount.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  const handleLogout = () => {
    logout()
    closeMenu()
    showToast('Logged out')
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          <BrandMark />
          <span>Road2Code</span>
        </NavLink>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="navbar__mobile-actions">
            {currentUser ? (
              <>
                <NavLink to="/progress" className="btn" onClick={closeMenu}>My progress</NavLink>
                <button className="btn" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <button className="btn btn--primary" onClick={() => { openAuth('login'); closeMenu() }}>
                Log in
              </button>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          <button className="palette-trigger" onClick={onOpenPalette} aria-label="Open command palette">
            <Search size={15} aria-hidden="true" />
            <span className="palette-trigger__text">Search</span>
            <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {currentUser ? (
            <div className="navbar__user">
              <NavLink to="/progress" className="user-chip" title="My progress">
                <span className="avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                <span className="user-chip__name">{currentUser.name.split(' ')[0]}</span>
              </NavLink>
              <button className="icon-btn" onClick={handleLogout} aria-label="Log out" title="Log out">
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <button className="btn btn--primary btn--sm navbar__login" onClick={() => openAuth('login')}>
              Log in
            </button>
          )}

          <button
            className="icon-btn hamburger"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
