import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { authService } from '../../services/authService';
import { User } from '../../types';
import { Users, User as UserIcon, Shield, Search } from '../../components/common/Icons';

export const AdminUsersPage: React.FC = () => {
  const users = authService.getAllUsers();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.ward && u.ward.toLowerCase().includes(search.toLowerCase()));

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Administration', href: '/admin/dashboard' },
        { label: 'User Directory' }
      ]}
      title="User &amp; Officer Directory"
      subtitle="Authorized identity accounts for citizens, municipal officers, and central administrators"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="card-base p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search user name, email, or ward..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
            />
            <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span>Filter Role:</span>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="input-base text-xs py-1.5 px-2.5 bg-white cursor-pointer w-32"
            >
              <option value="all">All Roles</option>
              <option value="citizen">Citizens</option>
              <option value="officer">Municipal Officers</option>
              <option value="admin">Administrators</option>
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(u => (
            <div
              key={u.id}
              className="card-base p-5 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-sm"
                      style={{ backgroundColor: '#142B4A' }}
                    >
                      {u.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[#142B4A] text-sm">{u.name}</h3>
                    <p className="text-[11px] text-[#667085] truncate max-w-[170px]">{u.email}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    u.role === 'admin'
                      ? 'bg-[#EEF2F6] text-[#142B4A] border-[#D0D5DD]'
                      : u.role === 'officer'
                      ? 'bg-[#EFF8FF] text-[#175CD3] border-[#D1E9FF]'
                      : 'bg-[#E6F6F5] text-[#0F9D91] border-[#B8EBE6]'
                  }`}
                >
                  {u.role}
                </span>
              </div>

              <div className="text-xs text-[#1D2939] space-y-1 pt-2 border-t border-[#E4E7EC]">
                <p>Phone: <strong className="text-[#142B4A]">{u.phone}</strong></p>
                {u.ward && <p>Jurisdiction: <strong>{u.ward}</strong></p>}
                {u.department && <p>Department: <strong>{u.department}</strong></p>}
              </div>

              <div className="pt-2 text-[10px] text-[#667085] border-t border-[#E4E7EC]">
                Account Created: {new Date(u.createdAt).toLocaleDateString([], { month: 'short', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
