import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem } from '../types';
import { notificationService } from '../services/notificationService';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (title: string, message: string, type?: NotificationItem['type'], complaintId?: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const userId = user?.id || 'guest-session';

  const refreshNotifications = () => {
    const list = notificationService.getNotifications(userId);
    setNotifications(list);
  };

  useEffect(() => {
    refreshNotifications();
  }, [user?.id, user?.role]);

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info', complaintId?: string) => {
    notificationService.addNotification({
      userId,
      title,
      message,
      type,
      complaintId
    });
    refreshNotifications();
  };

  const markAsRead = (id: string) => {
    notificationService.markAsRead(id);
    refreshNotifications();
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead(userId);
    refreshNotifications();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
