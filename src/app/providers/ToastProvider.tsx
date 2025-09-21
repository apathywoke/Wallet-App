import { FC, ReactNode, createContext, useContext } from 'react';
import { useToast } from '@/shared/ui/toast';
import { ToastContainer } from '@/shared/ui/toast';
import type { ToastMessage } from '@/shared/ui/toast';

interface ToastContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const { toasts, removeToast, showError, showSuccess, showWarning, showInfo } = useToast();

  return (
    <ToastContext.Provider value={{ showError, showSuccess, showWarning, showInfo }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
