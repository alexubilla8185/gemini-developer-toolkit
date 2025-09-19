import React, { createContext, useState, useContext, ReactNode, useCallback, useRef } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationState {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notification: NotificationState | null;
  showNotification: (message: string, type: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const timerRef = useRef<number | null>(null);

  const hideNotification = useCallback(() => {
    if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
    }
    setNotification(null);
  }, []);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    if (timerRef.current) {
        window.clearTimeout(timerRef.current);
    }
    setNotification({ message, type });
    timerRef.current = window.setTimeout(() => {
      setNotification(null);
      timerRef.current = null;
    }, 5000); // Auto-dismiss after 5 seconds
  }, []);
  

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
