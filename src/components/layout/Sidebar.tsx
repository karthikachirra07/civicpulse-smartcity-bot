import React from 'react';
import { NavLink } from '../../router';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Building2,
  FileText,
  Search,
  Bot,
  Bell,
  User,
  Shield,
  Users,
  Activity,
  Plus
} from '../common/Icons';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { role, user } = useAuth();
  const { unreadCount } = useNotifications();

  const getOverviewPath = () => {
    if (role === 'officer') return '/officer/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/citizen/dashboard';
  };

  return (
    <aside
      className="w-[250px] shrink-0 bg-white border-r border-[#E4E7EC] min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sticky top-16"
      style={{ zIndex: 30 }}
    >
      <div className="space-y-5">
        {/* User Card */}
        <div className="p-3 rounded-xl bg-[#F5F7FA] border border-[#E4E7EC]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0"
              style={{ backgroundColor: '#142B4A' }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#1D2939] truncate">{user?.name || 'Guest Citizen'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      role === 'citizen' ? '#0F9D91' : role === 'officer' ? '#175CD3' : '#7F56D9'
                  }}
                />
                <span className="text-[10px] font-medium text-[#667085] uppercase tracking-wider">
                  {user ? `${role} Account` : 'Guest Mode'}
                </span>
              </div>
            </div>
          </div>
          {user.ward && (
            <div className="mt-2 text-[11px] text-[#667085] truncate border-t border-[#E4E7EC] pt-1.5 flex items-center gap-1">
              <span className="text-[#0F9D91]">📍</span> {user.ward}
            </div>
          )}
        </div>

        {/* Primary Action Button (Citizen only or all) */}
        {role === 'citizen' && (
          <NavLink
            to="/complaints/new"
            onClick={onCloseMobile}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3.5 rounded-xl text-white text-xs font-semibold shadow-xs transition-colors"
            style={{ backgroundColor: '#0F9D91' }}
          >
            <Plus className="w-4 h-4" />
            <span>Register Complaint</span>
          </NavLink>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-2">
            Workspace
          </p>

          {/* Overview */}
          <NavLink
            to={getOverviewPath()}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                  : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
              }`
            }
          >
            <Activity className="w-4 h-4" />
            <span>Overview</span>
          </NavLink>

          {/* AI Assistant */}
          <NavLink
            to="/chatbot"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                  : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
              }`
            }
          >
            <Bot className="w-4 h-4 text-[#0F9D91]" />
            <span>AI Assistant</span>
          </NavLink>

          {/* Citizen-Specific Navigation */}
          {role === 'citizen' && (
            <>
              <NavLink
                to="/complaints/new"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                      : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <Plus className="w-4 h-4" />
                <span>Register Complaint</span>
              </NavLink>

              <NavLink
                to="/citizen/complaints"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                      : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <FileText className="w-4 h-4" />
                <span>My Complaints</span>
              </NavLink>
            </>
          )}

          {/* Officer-Specific Navigation */}
          {role === 'officer' && (
            <>
              <p className="px-3 text-[10px] font-bold text-[#667085] uppercase tracking-wider mt-4 mb-2">
                Officer Operations
              </p>
              <NavLink
                to="/officer/dashboard"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                      : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <Shield className="w-4 h-4 text-[#175CD3]" />
                <span>Complaint Queue</span>
              </NavLink>
            </>
          )}

          {/* Admin-Specific Navigation */}
          {role === 'admin' && (
            <>
              <p className="px-3 text-[10px] font-bold text-[#667085] uppercase tracking-wider mt-4 mb-2">
                Administration
              </p>
              <NavLink
                to="/admin/complaints"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                      : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <FileText className="w-4 h-4" />
                <span>All Complaints</span>
              </NavLink>

              <NavLink
                to="/admin/departments"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                      : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <Building2 className="w-4 h-4" />
                <span>Departments & SLA</span>
              </NavLink>

              <NavLink
                to="/admin/users"
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                      : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                  }`
                }
              >
                <Users className="w-4 h-4" />
                <span>User Directory</span>
              </NavLink>
            </>
          )}

          <p className="px-3 text-[10px] font-bold text-[#667085] uppercase tracking-wider mt-4 mb-2">
            Public Services
          </p>

          {/* Track Complaint */}
          <NavLink
            to="/track"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                  : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
              }`
            }
          >
            <Search className="w-4 h-4" />
            <span>Track Complaint</span>
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="/notifications"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                  : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span
                className="px-1.5 py-0.2 rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: '#0F9D91' }}
              >
                {unreadCount}
              </span>
            )}
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#E6F6F5] text-[#0F9D91] font-semibold border-l-4 border-[#0F9D91]'
                  : 'text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]'
              }`
            }
          >
            <User className="w-4 h-4" />
            <span>Profile Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#E4E7EC] text-[11px] text-[#667085]">
        <p className="font-semibold text-[#1D2939]">CivicPulse v2.4</p>
        <p className="mt-0.5">Hyderabad Smart City Unit</p>
      </div>
    </aside>
  );
};
