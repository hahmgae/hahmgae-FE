import { createPortal } from 'react-dom';
import styles from './common.module.css';

type ToastProps = {
    message: string | null;
    messageId?: number;
};

export default function Toast({ message, messageId }: ToastProps) {
    if (typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <div className={styles.toastViewport} role="status" aria-live="polite" aria-atomic="true">
            {message && (
                <p key={messageId} className={styles.toast}>
                    {message}
                </p>
            )}
        </div>,
        document.body,
    );
}
