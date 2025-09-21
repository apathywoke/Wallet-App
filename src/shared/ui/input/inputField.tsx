import type { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from "./inputField.module.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder: string;
  type: string;
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export const InputField: FC<InputFieldProps> = ({
  placeHolder,
  type,
  error,
  success,
  loading,
  errorMessage,
  successMessage,
  className,
  ...props
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={clsx(
          styles.input,
          {
            [styles.inputError]: error,
            [styles.inputSuccess]: success,
            [styles.inputLoading]: loading,
          },
          className
        )}
        type={type}
        placeholder={placeHolder}
        {...props}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      {successMessage && <span className={styles.successMessage}>{successMessage}</span>}
    </div>
  );
};