/**
 * Toast notification management hook
 * 
 * Features:
 * - Manages toast messages state
 * - Provides typed toast creation methods
 * - Auto-generates unique IDs
 * - Supports multiple toast types
 */

import { useState, useCallback } from 'react';

export interface ToastMessage {
  id: string;                                    // Unique identifier
  message: string;                               // Toast content
  type: 'success' | 'error' | 'warning' | 'info'; // Toast type for styling
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Generic toast creator
  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString(); // Simple ID generation
    const newToast: ToastMessage = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  // Remove specific toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,                    // Current toast messages array
    showToast,                 // Generic toast creator
    removeToast,               // Toast remover
    showError: (message: string) => showToast(message, 'error'),     // Error toast
    showSuccess: (message: string) => showToast(message, 'success'), // Success toast
    showWarning: (message: string) => showToast(message, 'warning'), // Warning toast
    showInfo: (message: string) => showToast(message, 'info'),       // Info toast
  };
};
