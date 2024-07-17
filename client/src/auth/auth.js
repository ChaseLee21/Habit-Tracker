import withAuth from './Hoc'
import Home from '../components/screens/Home/Home'
import NewHabit from '../components/screens/New Habit/NewHabit'
import Profile from '../components/screens/Profile/Profile'
import Progress from '../components/screens/Progress/Progress'

function ProtectedRoute ({ component: Component }) {
    const component = withAuth(Component)
    return component
}

const ProtectedHome = ProtectedRoute({ component: Home })

const ProtectedNewHabit = ProtectedRoute({ component: NewHabit })

const ProtectedProfile = ProtectedRoute({ component: Profile })

const ProtectedProgress = ProtectedRoute({ component: Progress })

export { ProtectedHome, ProtectedNewHabit, ProtectedProfile, ProtectedProgress }
