import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import styles from "../../style.css?inline";

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider: preact.FunctionalComponent = ({ children }) => {
  const [toasts, setToasts] = useState<{ message: string; duration: number }[]>([]);

  const showToast = (message: string, duration: number = 3000) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { message, duration }
    ]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, toasts[0].duration);

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <style>{styles}</style>
      {children}

      {toasts.map((toast, index) => (
        <div key={index} className="toast toast-center z-10">
          <div className='alert alert-success text-white'>
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;