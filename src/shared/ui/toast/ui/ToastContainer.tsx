import type { FC } from 'react';
import { Toast } from './Toast';
import type { ToastMessage } from '../model/useToast';
import styles from './ToastContainer.module.scss';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast, index) => (
        <div 
          key={toast.id} 
          className={styles.toastWrapper}
          style={{ top: `${20 + index * 80}px` }}
        >
          <Toast toast={toast} onClose={onRemove} />
        </div>
      ))}
    </div>
  );
};
