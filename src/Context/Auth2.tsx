import { createContext, useContext, useEffect, useState } from "react";
import { UserRole } from "../pages/App2";

// --- Context for User Authentication and Global State (Mock) ---
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
  currentUserId: string | null;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userRole: 'Field Officer',
    login: () => {},
    logout: () => {},
    isLoading: false,
    currentUserId: null
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate checking for a logged-in user (e.g., from local storage)
    setTimeout(() => {
      // In a real app, you'd check a token or session
      const storedRole = localStorage.getItem('userRole');
      const storedUserId = localStorage.getItem('userId');
      if (storedRole && storedUserId) {
        setIsAuthenticated(true);
        setUserRole(storedRole as UserRole);
        setCurrentUserId(storedUserId);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const login = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setUserRole(role);
      const userId = `user_${Math.random().toString(36).substring(7)}`; // Mock user ID
      setCurrentUserId(userId);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', userId);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setUserRole(null);
      setCurrentUserId(null);
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, isLoading, currentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider