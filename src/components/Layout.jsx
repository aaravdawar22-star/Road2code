import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Layout is the "shell" that stays on screen no matter which page is
// showing — the navbar up top and the footer at the bottom. <Outlet />
// is a react-router placeholder: it renders whichever page component
// matches the current URL (Home, About, Courses, etc).
//
// All the props here (theme, currentUser, ...) just get forwarded down
// to Navbar exactly like before — Layout doesn't use them itself.
function Layout({ theme, onToggleTheme, currentUser, onLogout, onAuthOpen }) {
    return (
        <div className="app">
            <Navbar
                theme={theme}
                onToggleTheme={onToggleTheme}
                currentUser={currentUser}
                onLogout={onLogout}
                onAuthOpen={onAuthOpen}
            />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layout
