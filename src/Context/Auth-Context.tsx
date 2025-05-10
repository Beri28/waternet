import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for auth context
type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  updateUser: (userData: User) => void;
  logout: () => void;
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
  _id:string
  userId:string,
  balance:number,
  withdrawalsMade:WithdrawalsMade;
  paymentsMade?:PaymentsMade;
  paymentsReceived:PaymentsMade;
}

export type User = {
  id: string;
  username: string;
  phoneNumber: number;
  isAuthenticated: boolean;
  token: string;
  personalAccount:personalAccount;
  merchantAccount:personalAccount
};

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  
  // Initialize auth state (e.g., check localStorage)
  useEffect(() => {
    let storedUser = localStorage.getItem('njanbiz');
    console.log(storedUser)
    // storedUser=JSON.parse(storedUser || "")
    // console.log(storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    console.log(userData)
    setUser(userData);
    localStorage.setItem('njanbiz', JSON.stringify(userData));
  };
  const updateUser = (userData: User) => {
    console.log(userData)
    setUser(userData);
    localStorage.setItem('njanbiz', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('njanbiz');
  };

  // const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout,updateUser, loading }}>
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