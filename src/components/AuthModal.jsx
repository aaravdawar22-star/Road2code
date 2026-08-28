import { useEffect, useState } from 'react'

// A controlled form: every input's value is stored in useState, and every
function AuthModal({ mode, onModeChange, onClose, onLogin, onSignup }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isSignup = mode === 'signup'

  
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        const result = isSignup ? onSignup(name, email, password) : onLogin(email, password)
        if (!result.ok) {
            setError(result.error)
            return
        }
        onClose()
    }

    return (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
                <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

                <h2 id="auth-title">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
                <p className="modal__sub">
                    {isSignup
                        ? 'Save your roadmap progress across visits.'
                        : 'Log in to pick up your roadmap where you left off.'}
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {isSignup && (
                        <label>
                            Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ada Lovelace"
                                autoComplete="name"
                                required
                                autoFocus={isSignup}
                            />
                        </label>
                    )}
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            autoFocus={!isSignup}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete={isSignup ? 'new-password' : 'current-password'}
                            minLength={4}
                            required
                        />
                    </label>

                    {error && <p className="auth-form__error">{error}</p>}

                    <button type="submit" className="btn btn--primary btn--block">
                        {isSignup ? 'Create account' : 'Log in'}
                    </button>
                </form>

                <p className="modal__switch">
                    {isSignup ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                    <button type="button" onClick={() => onModeChange(isSignup ? 'login' : 'signup')}>
                        {isSignup ? 'Log in' : 'Sign up'}
                    </button>
                </p>

                <p className="modal__note">
                    Demo project — accounts are stored only in this browser's local storage.
                </p>
            </div>
        </div>
    )
}

export default AuthModal
