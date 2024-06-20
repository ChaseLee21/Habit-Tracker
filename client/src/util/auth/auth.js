import withAuth from './Hoc'
import Home from '../../views/Home'
import NewHabit from '../../views/NewHabit'
import Profile from '../../views/Profile'

function ProtectedRoute ({ component: Component }) {
    const component = withAuth(Component)
    return component
}

const ProtectedHome = ProtectedRoute({ component: Home })

const ProtectedNewHabit = ProtectedRoute({ component: NewHabit })

const ProtectedProfile = ProtectedRoute({ component: Profile })

export { ProtectedHome, ProtectedNewHabit, ProtectedProfile }
