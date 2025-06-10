import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for auth context
type AuthContextType = {
  isAuthenticated: boolean;
  userRole: 'guest' | 'field_officer' | 'planner' | 'ngo';
  login: (role: 'field_officer' | 'planner' | 'ngo') => void;
  logout: () => void;
  // user: User | null;
  // login: (userData: User) => void;
  // updateUser: (userData: User) => void;
  // logout: () => void;
  // loading: boolean;
};

// export type User = {
//   id: string;
//   username: string;
//   phoneNumber: number;
//   isAuthenticated: boolean;
//   token: string;
//   personalAccount:personalAccount;
//   merchantAccount:personalAccount
// };

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'guest' | 'field_officer' | 'planner' | 'ngo'>('planner');
  
    const login = (role: 'field_officer' | 'planner' | 'ngo') => {
      setIsAuthenticated(true);
      setUserRole(role);
      // In a real app, this would involve API calls, token storage etc.
      // Simulating localStorage for persistence
      localStorage.setItem('userRole', role);
      localStorage.setItem('isAuthenticated', 'true');
    };
  
    const logout = () => {
      setIsAuthenticated(false);
      setUserRole('guest');
      // In a real app, this would clear tokens etc.
      localStorage.removeItem('userRole');
      localStorage.removeItem('isAuthenticated');
    };
  
    useEffect(() => {
      // Check local storage on mount for simulated persistence
      const storedRole = localStorage.getItem('userRole') as 'field_officer' | 'planner' | 'ngo' | null;
      const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
      if (storedAuth && storedRole) {
        setIsAuthenticated(true);
        setUserRole(storedRole);
      }
    }, []);

  // const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider