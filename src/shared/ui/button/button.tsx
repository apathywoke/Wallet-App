/**
 * Simple button component
 * 
 * Supports different variants, sizes, and loading states
 */

import type { FC, ButtonHTMLAttributes, ComponentProps } from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.scss";
import clsx from "clsx";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "sign";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface ButtonAsLinkProps extends BaseButtonProps, ComponentProps<typeof Link> {
  as: "a" | typeof Link;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  className,
  as = "button",
  ...props
}) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    { [styles.loading]: loading },
    className
  );

  // Render as link if specified
  if (as === "a" || as === Link) {
    const linkProps = props as ComponentProps<typeof Link>;
    return (
      <Link
        className={buttonClasses}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading} // Disable when loading
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...buttonProps}
      type="submit"
    >
      {loading && <span className="sr-only">Loading...</span>}
      {children}
    </button>
  );
};
