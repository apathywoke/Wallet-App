import type { FC, InputHTMLAttributes } from 'react';
import styles from "./inputField.module.scss"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder: string;
  type: string;
}

export const InputField: FC<InputFieldProps> = ({
  placeHolder,
  type,
  value,
  onChange,
  ...props

}) => {
  return(
    <input
      className={styles.input}
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      {...props} />
  )
}