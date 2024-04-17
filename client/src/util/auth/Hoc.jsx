import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../axios';

function withAuth(ComponentToProtect) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      async function checkAuth() {
        try {
          const user = await checkToken();
          if (!user) {
            throw new Error('Not authorized');
          } else {
            setIsAuthenticated(true);
            setIsLoading(false);
            setUser(user);
          }
        } catch (err) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
      checkAuth();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>; // replace with a loading spinner or similar
    } else if (!isAuthenticated) {
      navigate('/login');
      return null;
    } else {
      return <ComponentToProtect {...props} user={user} />;
    }
  }
}

export default withAuth;