import type { ComponentPropsWithRef } from 'react';
import styles from './common.module.css';

type IconButtonProps = Omit<ComponentPropsWithRef<'button'>, 'children' | 'aria-label'> & {
    src: string;
    label: string;
    variant?: 'default' | 'round';
};

export default function IconButton({
    src,
    label,
    variant = 'default',
    type = 'button',
    className,
    ...props
}: IconButtonProps) {
    const classes = [styles.iconButton, variant === 'round' ? styles.round : '', className]
        .filter(Boolean)
        .join(' ');

    return (
        <button {...props} type={type} className={classes} aria-label={label}>
            <img src={src} alt="" aria-hidden="true" draggable={false} />
        </button>
    );
}
