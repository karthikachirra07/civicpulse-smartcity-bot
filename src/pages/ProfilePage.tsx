import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Building2, Shield, Check } from '../components/common/Icons';

export const ProfilePage: React.FC = () => {
  const { user, role, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [ward, setWard] = useState(user?.ward || 'Ward 2 - Hitec City & Madhapur');
  const [department, setDepartment] = useState(user?.department || 'Roads & Bridges Department');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) {
    return (
      <DashboardLayout title="Profile Settings">
        <div className="card-base p-12 text-center text-[#667085] space-y-4">
          <User className="w-12 h-12 text-[#98A2B3] mx-auto" />
          <h2 className="text-lg font-bold text-[#142B4A]">Sign In Required</h2>
          <p className="text-xs text-[#667085]">
            Please sign in to view and update your citizen profile.
          </p>
          <a href="/login" className="btn-primary text-xs inline-flex">
            Sign In to Account
          </a>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      ward,
      department
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Profile Settings' }
      ]}
      title="User Profile &amp; Preferences"
      subtitle="Manage your personal details, municipal ward zone, and communication alerts"
    >
      <div className="max-w-3xl space-y-6">
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#16865C] text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-[#16865C]" />
            <span>Profile settings updated successfully in local storage demo session.</span>
          </div>
        )}

        {/* Role Overview Card */}
        <div className="card-base p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full text-white font-extrabold text-2xl flex items-center justify-center shadow-xs"
                style={{ backgroundColor: '#142B4A' }}
              >
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#142B4A]">{user.name}</h2>
                <p className="text-xs text-[#667085]">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5F7FA] text-[#142B4A] border border-[#E4E7EC]">
                    Role: {role.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#16865C] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9] font-semibold">
                    Verified Identity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card-base p-6">
          <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-4 border-b border-[#E4E7EC] pb-3">
            Contact &amp; Jurisdictional Details
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-base text-xs sm:text-sm py-2 px-3"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-base text-xs sm:text-sm py-2 px-3"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D2939] mb-1">
                Assigned Municipal Ward / Zone
              </label>
              <input
                type="text"
                value={ward}
                onChange={e => setWard(e.target.value)}
                className="input-base text-xs sm:text-sm py-2 px-3"
              />
            </div>

            {role === 'officer' && (
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Department Affiliation
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="input-base text-xs sm:text-sm py-2 px-3"
                />
              </div>
            )}

            <div className="pt-3 border-t border-[#E4E7EC] flex justify-end">
              <button
                type="submit"
                className="btn-primary text-xs"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};
