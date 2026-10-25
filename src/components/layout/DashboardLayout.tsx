import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { DemoBanner } from '../common/DemoBanner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actionButton?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  actionButton
}) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {/* Breadcrumbs / Page Header */}
          {(title || actionButton || breadcrumbs) && (
            <div className="mb-6 pb-4 border-b border-[#E4E7EC]">
              {breadcrumbs && (
                <div className="flex items-center gap-2 text-xs text-[#667085] mb-2 font-medium">
                  {breadcrumbs.map((bc, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span>/</span>}
                      {bc.href ? (
                        <a href={bc.href} className="hover:text-[#1D2939] transition-colors">
                          {bc.label}
                        </a>
                      ) : (
                        <span className="text-[#1D2939] font-semibold">{bc.label}</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {title && (
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#142B4A]">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-[#667085] mt-1 font-normal">
                      {subtitle}
                    </p>
                  )}
                </div>
                {actionButton && <div className="shrink-0">{actionButton}</div>}
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};
