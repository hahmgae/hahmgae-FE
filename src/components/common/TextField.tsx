import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';
import styles from './common.module.css';

type TextFieldProps = Omit<ComponentPropsWithRef<'input'>, 'children'> & {
  label: string;
  hideLabel?: boolean;
  variant?: 'default' | 'login';
  containerClassName?: string;
};

export default function TextField({
  id,
  label,
  hideLabel = false,
  variant = 'default',
  required = false,
  type = 'text',
  className,
  containerClassName,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const fieldClasses = [styles.field, containerClassName].filter(Boolean).join(' ');

  const inputClasses = [styles.input, variant === 'login' ? styles.loginInput : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fieldClasses}>
      <label htmlFor={inputId} className={hideLabel ? styles.srOnly : styles.label}>
        {label}

        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input {...props} id={inputId} type={type} required={required} className={inputClasses} />
    </div>
  );
}
