import { useCallback, useEffect, useRef, useState } from 'react';

type ToastState = {
  id: number;
  message: string;
  duration: number;
};

export default function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, duration = 2500) => {
    if (!message.trim()) {
      return;
    }

    nextId.current += 1;

    setToast({
      id: nextId.current,
      message,
      duration,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast || toast.duration <= 0) {
      return;
    }

    const currentId = toast.id;

    const timer = window.setTimeout(() => {
      setToast((current) => (current?.id === currentId ? null : current));
    }, toast.duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast]);

  return {
    toast,
    showToast,
    hideToast,
  };
}
