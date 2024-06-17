import { useEffect, useState, React } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkToken } from '../axios'

function withAuth (ComponentToProtect) {
  const ProtectedComponent = function (props) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
      async function checkAuth () {
        try {
          const user = await checkToken()
          if (!user) {
            throw new Error('Not authorized')
          } else {
            console.log(user)
            setIsAuthenticated(true)
            setIsLoading(false)
            setUser(user)
          }
        } catch (err) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
      }
      checkAuth()
    }, [])

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/login')
      }
    }, [isLoading, isAuthenticated, navigate])

    if (isLoading) {
      return <div>Loading...</div> // replace with a loading spinner or similar
    } else if (!isAuthenticated) {
      return null
    } else {
      return <ComponentToProtect {...props} user={user} />
    }
  }

  ProtectedComponent.displayName = `WithAuth(${getDisplayName(ComponentToProtect)})`

  return ProtectedComponent
}

// Helper function to get the display name of a component
function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component'
}

export default withAuth
