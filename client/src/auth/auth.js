import withAuth from './Hoc'
import Home from '../views/Home'
import NewHabit from '../views/NewHabit'
import Profile from '../views/Profile'
import Progress from '../views/Progress'

function ProtectedRoute ({ component: Component }) {
    const component = withAuth(Component)
    return component
}

const ProtectedHome = ProtectedRoute({ component: Home })

const ProtectedNewHabit = ProtectedRoute({ component: NewHabit })

const ProtectedProfile = ProtectedRoute({ component: Profile })

const ProtectedProgress = ProtectedRoute({ component: Progress })

export { ProtectedHome, ProtectedNewHabit, ProtectedProfile, ProtectedProgress }
