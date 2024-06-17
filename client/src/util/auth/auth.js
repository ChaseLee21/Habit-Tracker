import withAuth from './Hoc'
import Home from '../../views/Home'
import NewHabit from '../../views/NewHabit'

function ProtectedRoute ({ component: Component }) {
    const component = withAuth(Component)
    return component
}

const ProtectedHome = ProtectedRoute({ component: Home })

const ProtectedNewHabit = ProtectedRoute({ component: NewHabit })

export { ProtectedHome, ProtectedNewHabit }
