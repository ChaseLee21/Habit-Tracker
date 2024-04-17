import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function withAuth(ComponentToProtect) {
  return function ProtectedRoute(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      fetch('/api/checkToken') // replace with your API endpoint
        .then(res => {
          if (res.status === 200) setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
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