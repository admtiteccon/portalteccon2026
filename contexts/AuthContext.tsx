
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/authService';
import type { User, LoginCredentials } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const loggedInUser = await apiLogin(credentials);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    logout,
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
