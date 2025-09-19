import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppLayout from './components/AppLayout';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import Alert from './components/Alert';

// This component listens to the notification context and renders the Alert when needed.
const GlobalAlertManager: React.FC = () => {
    const { notification, hideNotification } = useNotification();
    if (!notification) return null;
    return (
        <Alert
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
        />
    );
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <GlobalAlertManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />} />
      </Routes>
    </NotificationProvider>
  );
};

export default App;
