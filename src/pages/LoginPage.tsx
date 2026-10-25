import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { Link, useNavigate } from '../router';
import { useAuth } from '../context/AuthContext';
import { authService, DEMO_USERS } from '../services/authService';
import { User, Shield, Users, Eye, EyeOff, Lock, Mail, ArrowRight } from '../components/common/Icons';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillDemoCredentials = (role: 'citizen' | 'officer' | 'admin') => {
    setError(null);
    if (role === 'citizen') {
      setEmail(DEMO_USERS.citizen.email);
      setPassword('password123');
    } else if (role === 'officer') {
      setEmail(DEMO_USERS.officer.email);
      setPassword('officer123');
    } else if (role === 'admin') {
      setEmail(DEMO_USERS.admin.email);
      setPassword('admin123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = login(email, password);
    if (res.success) {
      const currentUser = authService.getCurrentUser();
      if (currentUser?.role === 'officer') {
        navigate('/officer/dashboard');
      } else if (currentUser?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/citizen/dashboard');
      }
    } else {
      setError(res.error || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="card-base p-6 sm:p-8 max-w-md w-full shadow-card">
          <div className="text-center mb-6">
            <div className="inline-block mb-3">
              <Logo size="md" showTagline={false} />
            </div>
            <h1 className="text-xl font-bold text-[#142B4A]">Sign In to CivicPulse</h1>
            <p className="text-xs text-[#667085] mt-1">
              Enter your registered credentials or select a quick demo account
            </p>
          </div>

          {/* Quick Demo Pre-fill Selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#667085] mb-1.5">
              <span>Quick Test Accounts:</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemoCredentials('citizen')}
                className="py-1.5 px-2 rounded-lg border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-[#E6F6F5] hover:border-[#0F9D91] transition-all flex flex-col items-center gap-0.5 text-center"
              >
                <User className="w-3.5 h-3.5 text-[#0F9D91]" />
                <span className="font-bold text-[#142B4A] text-[11px]">Citizen</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoCredentials('officer')}
                className="py-1.5 px-2 rounded-lg border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-[#EFF8FF] hover:border-[#175CD3] transition-all flex flex-col items-center gap-0.5 text-center"
              >
                <Shield className="w-3.5 h-3.5 text-[#175CD3]" />
                <span className="font-bold text-[#142B4A] text-[11px]">Officer</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="py-1.5 px-2 rounded-lg border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-[#F0F4F9] hover:border-[#142B4A] transition-all flex flex-col items-center gap-0.5 text-center"
              >
                <Users className="w-3.5 h-3.5 text-[#142B4A]" />
                <span className="font-bold text-[#142B4A] text-[11px]">Admin</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-xl bg-[#FDE8E8] border border-[#FECDCA] text-[#D64545] text-xs font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1D2939] mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  placeholder="name@example.com"
                  onChange={e => setEmail(e.target.value)}
                  className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
                  required
                />
                <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#1D2939]">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Enter password"
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

            <button
              type="submit"
              className="btn-primary w-full text-xs sm:text-sm py-2.5 mt-2"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E4E7EC] text-center text-xs text-[#667085]">
            New to CivicPulse?{' '}
            <Link to="/register" className="font-semibold text-[#0F9D91] hover:underline">
              Register a New Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
