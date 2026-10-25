import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { Link } from '../router';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from '../components/common/Icons';

export const UnauthorizedPage: React.FC = () => {
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full card-base p-8 shadow-card space-y-4">
          <div className="w-12 h-12 bg-[#FEF7EC] text-[#B7791F] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            <AlertTriangle className="w-6 h-6 text-[#B7791F]" />
          </div>
          <h2 className="text-xl font-bold text-[#142B4A]">403 • Unauthorized Access</h2>
          <p className="text-xs text-[#667085] leading-relaxed">
            Your current account role (<strong>{role.toUpperCase()}</strong>) does not have sufficient permission to view this administrative resource.
          </p>

          <div className="pt-4 flex flex-col gap-2">
            <Link
              to={role === 'citizen' ? '/citizen/dashboard' : role === 'officer' ? '/officer/dashboard' : '/admin/dashboard'}
              className="btn-primary text-xs"
            >
              Go to Your Role Dashboard
            </Link>
            <Link
              to="/"
              className="btn-secondary text-xs"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
