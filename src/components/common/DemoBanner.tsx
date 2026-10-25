import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { useNavigate } from '../../router';
import { User, Shield, Users, RefreshCw, ChevronDown } from './Icons';

export const DemoBanner: React.FC = () => {
  const { user, role, switchRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleRoleSwitch = (newRole: 'citizen' | 'officer' | 'admin') => {
    switchRole(newRole);
    if (newRole === 'citizen') navigate('/citizen/dashboard');
    else if (newRole === 'officer') navigate('/officer/dashboard');
    else if (newRole === 'admin') navigate('/admin/dashboard');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all civic complaints and notifications back to initial state?')) {
      complaintService.resetDemoData();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 700);
    }
  };

  if (isMinimized) {
    return (
      <div className="bg-[#142B4A] text-[#98A2B3] text-[11px] py-1 px-4 border-b border-[#1C3B65] flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D91]" />
          GHMC Smart Governance Portal • Hyderabad
        </span>
        <button
          onClick={() => setIsMinimized(false)}
          className="text-white hover:text-[#0F9D91] transition-colors font-medium text-[11px]"
        >
          Show Quick Role Switcher ↓
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Official Municipal Portal Header" className="bg-[#142B4A] text-[#E4E7EC] border-b border-[#1C3B65] text-xs py-1.5 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Official Civic Badge */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0F9D91] animate-pulse" />
          <span className="text-white font-medium text-xs">
            Government of Telangana • Greater Hyderabad Municipal Corporation (GHMC)
          </span>
          <span className="hidden md:inline text-[#98A2B3] text-[11px]">
            | Official Citizen Portal
          </span>
        </div>

        {/* Evaluation / Quick Persona Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#98A2B3] font-medium text-[11px] hidden sm:inline">
            {isAuthenticated && user ? `Logged in: ${user.name}` : 'Role View:'}
          </span>
          
          <button
            onClick={() => handleRoleSwitch('citizen')}
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-medium transition-all text-[11px] ${
              role === 'citizen'
                ? 'bg-[#0F9D91] text-white font-bold shadow-xs'
                : 'bg-[#1C3B65] text-[#D0D5DD] hover:bg-[#2D476D]'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Citizen</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('officer')}
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-medium transition-all text-[11px] ${
              role === 'officer'
                ? 'bg-[#175CD3] text-white font-bold shadow-xs'
                : 'bg-[#1C3B65] text-[#D0D5DD] hover:bg-[#2D476D]'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Officer</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('admin')}
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-medium transition-all text-[11px] ${
              role === 'admin'
                ? 'bg-[#0D1E35] border border-[#0F9D91] text-white font-bold shadow-xs'
                : 'bg-[#1C3B65] text-[#D0D5DD] hover:bg-[#2D476D]'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Admin</span>
          </button>

          <button
            onClick={handleResetData}
            title="Reset complaints database to default state"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1C3B65] hover:bg-[#2D476D] text-[#98A2B3] hover:text-white transition-colors text-[11px]"
          >
            <RefreshCw className={`w-3 h-3 ${resetSuccess ? 'animate-spin' : ''}`} />
            <span>{resetSuccess ? 'Resetting...' : 'Reset Data'}</span>
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            title="Hide this top utility bar"
            className="text-[#98A2B3] hover:text-white p-1 transition-colors text-[11px]"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
};
