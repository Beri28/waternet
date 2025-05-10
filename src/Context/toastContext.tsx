import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a type for the ToastContext
interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

// Define props for the provider
interface ToastProviderProps {
  children: ReactNode;
  containerProps?: ToastContainerProps; // Optional props for customizing the ToastContainer
}

// Create the Toast Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook for using the context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Create the Toast Provider
export const ToastProvider: React.FC<ToastProviderProps> = ({ children, containerProps }) => {
  // The `showToast` function provides access to the toast function globally
  const showToast = (message: string, options?: ToastOptions) => {
    toast(message, options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render the ToastContainer with customizable props */}
      <ToastContainer {...containerProps}/>
    </ToastContext.Provider>
  );
};
