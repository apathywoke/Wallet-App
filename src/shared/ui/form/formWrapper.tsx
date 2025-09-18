import type { FC, ReactNode, FormHTMLAttributes, } from 'react';
import styles from "./formWrapper.module.scss"

interface FormWrapperProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({
  children,
  onSubmit,
  ...props
}) => {
  return (
    <form className={styles.form} {...props} onSubmit={onSubmit}>
      <div className={styles.fields}>{children}</div>
    </form>
  )
}