import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { checkToken } from '../utils/axios';

function withAuth(ComponentToProtect) {
  return function ProtectedRoute(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      async function checkAuth() {
        try {
          const user = await checkToken();
          if (!user) {
            throw new Error('Not authorized');
          } else {
            setIsAuthenticated(true);
            setIsLoading(false);
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
      return <Redirect to="/login" />;
    } else {
      return <ComponentToProtect {...props} />;
    }
  }
}

export default withAuth;