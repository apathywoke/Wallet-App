import { useEffect, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import type { ToastMessage } from '../model/useToast';
import styles from './Toast.module.scss';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: FC<ToastProps> = ({ toast, onClose, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Появление с задержкой для анимации
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (isPaused || isExiting) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 50));
        if (newProgress <= 0) {
          // Начинаем анимацию исчезновения
          setIsExiting(true);
          // Удаляем toast после анимации
          setTimeout(() => {
            onClose(toast.id);
          }, 300); // Время анимации исчезновения
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [toast.id, onClose, duration, isPaused, isExiting]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  return (
    <div 
      className={clsx(
        styles.toast, 
        styles[toast.type],
        {
          [styles.visible]: isVisible,
          [styles.exiting]: isExiting
        }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.content}>
        <span className={styles.message}>{toast.message}</span>
        <button 
          className={styles.closeButton}
          onClick={handleClose}
        >
          ×
        </button>
      </div>
      
      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ 
            width: `${progress}%`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        />
      </div>
    </div>
  );
};
