import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useNotifications } from '../context/NotificationContext';
import { useNavigate } from '../router';
import { Bell, Check, Clock, FileText } from '../components/common/Icons';

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (id: string, complaintId?: string) => {
    markAsRead(id);
    if (complaintId) {
      navigate(`/complaints/${complaintId}`);
    }
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Notifications' }
      ]}
      title="In-App Notification Center"
      subtitle="Real-time alerts on complaint assignments, status updates, and municipal notices"
      actionButton={
        unreadCount > 0 ? (
          <button
            onClick={markAllAsRead}
            className="btn-secondary text-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        ) : null
      }
    >
      <div className="max-w-4xl space-y-4">
        {notifications.length === 0 ? (
          <div className="card-base p-12 text-center text-[#667085]">
            <Bell className="w-10 h-10 text-[#98A2B3] mx-auto mb-3" />
            <h3 className="font-bold text-[#142B4A] text-base">No Notifications Yet</h3>
            <p className="text-xs text-[#667085] mt-1">
              You will receive simulated status alerts when complaints are updated or field teams are dispatched.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n.id, n.complaintId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  n.read
                    ? 'bg-white border-[#E4E7EC] hover:bg-[#F5F7FA]'
                    : 'bg-[#E6F6F5] border-[#B8EBE6] hover:bg-[#DDF2F0] shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                      n.type === 'success'
                        ? 'bg-[#E8F5E9] text-[#16865C]'
                        : n.type === 'warning'
                        ? 'bg-[#FEF7EC] text-[#B7791F]'
                        : n.type === 'alert'
                        ? 'bg-[#FDE8E8] text-[#D64545]'
                        : 'bg-[#EEF2F6] text-[#142B4A]'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#142B4A]">{n.title}</h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#0F9D91]" />
                      )}
                    </div>
                    <p className="text-xs text-[#1D2939] leading-relaxed">{n.message}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#667085] pt-0.5">
                      <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {n.complaintId && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-[#0F9D91]">View Ticket #{n.complaintId} →</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    markAsRead(n.id);
                  }}
                  className="text-[11px] text-[#667085] hover:text-[#142B4A] font-semibold shrink-0"
                >
                  {n.read ? 'Read' : 'Mark Read'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
