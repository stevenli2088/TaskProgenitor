import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
//import jwtDecode from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface DecodedToken {
  exp: number;
  // Add other token fields as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });
      if (response.ok) {
        const data = await response.json();
        login();
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};