import type { FC, ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "sign";
  size?: "small" | "medium" | "large";
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.loading]: loading },
        className
      )}
      disabled={disabled || loading}
      {...props}
      type="submit"
    >
      {children}
    </button>
  );
};
