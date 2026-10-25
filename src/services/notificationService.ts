import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    userId: 'usr-cit-001',
    title: 'Complaint SC-2026-0001 Assigned',
    message: 'Your water pipeline complaint at Hitec City has been assigned to Eng. Srinivas (HMWSSB).',
    complaintId: 'SC-2026-0001',
    type: 'info',
    read: false,
    createdAt: '2026-10-12T08:30:00Z'
  },
  {
    id: 'notif-002',
    userId: 'usr-cit-001',
    title: 'Resolution SLA Active: 6 Hours',
    message: 'High priority ticket SC-2026-0001 has entered In-Progress status. Field repair vehicle is on-site.',
    complaintId: 'SC-2026-0001',
    type: 'success',
    read: false,
    createdAt: '2026-10-12T09:15:00Z'
  },
  {
    id: 'notif-003',
    userId: 'usr-off-001',
    title: 'New High Priority Complaint Assigned',
    message: 'Road damage complaint SC-2026-0004 in Jubilee Hills requires immediate officer inspection.',
    complaintId: 'SC-2026-0004',
    type: 'warning',
    read: false,
    createdAt: '2026-10-12T07:45:00Z'
  },
  {
    id: 'notif-004',
    userId: 'usr-adm-001',
    title: 'Daily SLA Compliance Alert',
    message: 'Overall municipal SLA compliance rate reached 94.6% today across 7 departments.',
    type: 'info',
    read: true,
    createdAt: '2026-10-11T18:00:00Z'
  }
];

const NOTIF_STORAGE_KEY = 'smartcity_notifications';

export const notificationService = {
  getNotifications: (userId?: string): NotificationItem[] => {
    try {
      const stored = localStorage.getItem(NOTIF_STORAGE_KEY);
      const list: NotificationItem[] = stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
      if (!stored) {
        localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      }
      if (userId) {
        return list.filter(n => n.userId === userId || n.userId === 'all');
      }
      return list;
    } catch (e) {
      console.error(e);
      return INITIAL_NOTIFICATIONS;
    }
  },

  addNotification: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): NotificationItem => {
    const list = notificationService.getNotifications();
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now().toString().slice(-5)}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newNotif, ...list];
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
    return newNotif;
  },

  markAsRead: (id: string): void => {
    const list = notificationService.getNotifications();
    const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
  },

  markAllAsRead: (userId?: string): void => {
    const list = notificationService.getNotifications();
    const updated = list.map(n => {
      if (!userId || n.userId === userId || n.userId === 'all') {
        return { ...n, read: true };
      }
      return n;
    });
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
  },

  getUnreadCount: (userId?: string): number => {
    const list = notificationService.getNotifications(userId);
    return list.filter(n => !n.read).length;
  }
};
