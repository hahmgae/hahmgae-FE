import type { ComponentPropsWithRef } from 'react';
import styles from './common.module.css';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'walk' | 'link';
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  fullWidth = true,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    variant === 'walk' ? styles.walk : '',
    variant === 'link' ? styles.link : '',
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {children}
    </button>
  );
}
