import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { Link } from '../router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full card-base p-8 shadow-card space-y-4">
          <div className="text-5xl font-bold text-[#142B4A]">404</div>
          <h2 className="text-xl font-bold text-[#142B4A]">Civic Page Not Found</h2>
          <p className="text-xs text-[#667085] leading-relaxed">
            The civic page or service ticket you requested does not exist or may have been archived.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Link
              to="/"
              className="btn-primary flex-1 text-xs"
            >
              Return Home
            </Link>
            <Link
              to="/track"
              className="btn-secondary flex-1 text-xs"
            >
              Track Complaint
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
