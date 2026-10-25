import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { Link, useNavigate } from '../router';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { User, Phone, Mail, Eye, EyeOff, Lock, ArrowRight, Building2, MapPin } from '../components/common/Icons';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [ward, setWard] = useState('Ward 2 - Hitec City & Madhapur');
  const [role, setRole] = useState<UserRole>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const HYDERABAD_ZONES = [
    'Ward 1 - Gachibowli & Financial District',
    'Ward 2 - Hitec City & Madhapur',
    'Ward 3 - Banjara Hills & Jubilee Hills',
    'Ward 4 - Charminar & Old City Zone',
    'Ward 5 - Kukatpally & KPHB Colony',
    'Ward 6 - Secunderabad & Marredpally',
    'Ward 7 - Begumpet & Somajiguda',
    'Ward 8 - Dilsukhnagar & LB Nagar'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError('Please agree to the municipal data terms & citizen charter.');
      return;
    }

    const res = register(name, email, phone, password, ward, role);
    if (res.success) {
      if (role === 'officer') navigate('/officer/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/citizen/dashboard');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="card-base p-6 sm:p-8 max-w-lg w-full shadow-card">
          <div className="text-center mb-6">
            <div className="inline-block mb-3">
              <Logo size="md" showTagline={false} />
            </div>
            <h1 className="text-xl font-bold text-[#142B4A]">Create Your CivicPulse Account</h1>
            <p className="text-xs text-[#667085] mt-1">
              Register to submit complaints, track real-time SLAs, and receive municipal updates
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-xl bg-[#FDE8E8] border border-[#FECDCA] text-[#D64545] text-xs font-medium">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1D2939] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
                  required
                />
                <User className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
                    required
                  />
                  <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="e.g. 9849012345"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
                    required
                  />
                  <Phone className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Hyderabad Municipal Ward / Zone
                </label>
                <div className="relative">
                  <select
                    value={ward}
                    onChange={e => setWard(e.target.value)}
                    className="input-base text-xs py-2 pl-9 pr-3"
                  >
                    {HYDERABAD_ZONES.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Account Type
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as UserRole)}
                    className="input-base text-xs py-2 pl-9 pr-3"
                  >
                    <option value="citizen">Citizen (Public User)</option>
                    <option value="officer">Municipal Officer (Field Staff)</option>
                    <option value="admin">Administrator (GHMC Authority)</option>
                  </select>
                  <Building2 className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D2939] mb-1">
                Account Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-base text-xs sm:text-sm py-2 pl-9 pr-10"
                  required
                />
                <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#667085] hover:text-[#1D2939]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#667085]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#D0D5DD] text-[#0F9D91] focus:ring-[#0F9D91]"
                />
                <span>
                  I agree to receive SMS/Email notifications on my civic complaints under the Telangana Citizen Charter.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-xs sm:text-sm py-2.5 mt-2"
            >
              <span>Create Account &amp; Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E4E7EC] text-center text-xs text-[#667085]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#0F9D91] hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
