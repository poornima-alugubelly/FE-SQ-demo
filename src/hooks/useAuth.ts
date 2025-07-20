import { useState, useEffect } from 'react';
import { User } from '../types/User';

// Issue: Inconsistent return type and state shape
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate loading user from localStorage
    const stored = localStorage.getItem('authUser');
    if (stored) {
      setUser(JSON.parse(stored));
      setIsAuthenticated(true);
    }
  }, []);

  // Issue: Expose a function that is not used consistently elsewhere
  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  // Issue: Expose a logout function that does not clear all state
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
    // Does not clear token
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };
}
