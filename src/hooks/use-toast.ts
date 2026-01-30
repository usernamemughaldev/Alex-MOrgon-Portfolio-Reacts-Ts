import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
    
    return newToast;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
}
