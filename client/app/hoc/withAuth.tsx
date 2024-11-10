'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        router.push('/login');
      } else {
        setIsAuthenticated(true); // Mark as authenticated if token exists
      }
    }, []);

    // Show nothing or a loading indicator while checking authentication status
    if (isAuthenticated === null) return null; // Or use a loading spinner here

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
