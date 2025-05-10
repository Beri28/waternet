import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for auth context
type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};
type WithdrawalsMade = {
  date:Date,
  amount:number;
  receiver:personalAccount;
  phoneNumber:number,
  withdrawalChannel:'mtn'|'orange',
  status:'pending'|'success'|'failed'
}
type PaymentsMade = {
  date:Date,
  amount:number;
  receiver?:personalAccount;
  sender?:personalAccount;
  paymentChannel:'mtn'|'orange',
  status:'pending'|'success'|'failed'
}
type personalAccount ={
  id:string
  userId:string,
  balance:number,
  withdrawalsMade:WithdrawalsMade;
  paymentsMade?:PaymentsMade;
  paymentsReceived:PaymentsMade;
}

type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  personalAccount:personalAccount;
  merchantAccount:personalAccount
};

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state (e.g., check localStorage)
  useEffect(() => {
    let storedUser = localStorage.getItem('njanbiz');
    console.log(storedUser)
    storedUser=JSON.stringify(storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('njanbiz', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('njanbiz');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
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