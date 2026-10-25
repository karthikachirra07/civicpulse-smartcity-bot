import React from 'react';
import { Logo } from '../common/Logo';
import { Link } from '../../router';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142B4A] text-[#E4E7EC] text-xs py-12 border-t border-[#1C3B65]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About */}
          <div className="space-y-3">
            <Logo size="md" light={true} showTagline={true} />
            <p className="text-[#98A2B3] text-xs leading-relaxed mt-2">
              CivicPulse is an AI-powered citizen service assistance and complaint registration platform.
              Report civic issues, get reliable service guidance, and track complaints transparently.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-[#0D1E35] text-[11px] text-[#0F9D91] font-semibold border border-[#1C3B65]">
              Academic EDP Project Prototype
            </div>
          </div>

          {/* Col 2: Civic Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Civic Services
            </h4>
            <ul className="space-y-2 text-[#98A2B3]">
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Roads and Potholes</Link></li>
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Water Supply &amp; Pipelines</Link></li>
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Waste Management &amp; Sanitation</Link></li>
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Streetlights &amp; Lighting Grid</Link></li>
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Drainage and Sewage Overflow</Link></li>
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Public Infrastructure</Link></li>
            </ul>
          </div>

          {/* Col 3: Portal Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-[#98A2B3]">
              <li><Link to="/" className="hover:text-[#0F9D91] transition-colors">Home Portal</Link></li>
              <li><Link to="/chatbot" className="hover:text-[#0F9D91] transition-colors">Ask CivicPulse AI</Link></li>
              <li><Link to="/complaints/new" className="hover:text-[#0F9D91] transition-colors">Register Complaint</Link></li>
              <li><Link to="/track" className="hover:text-[#0F9D91] transition-colors">Track Complaint Progress</Link></li>
              <li><Link to="/login" className="hover:text-[#0F9D91] transition-colors">Citizen &amp; Officer Sign In</Link></li>
            </ul>
          </div>

          {/* Col 4: Urgent & Emergency Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Emergency Guidance
            </h4>
            <div className="space-y-2 text-[#E4E7EC]">
              <div className="p-2.5 rounded-lg bg-[#0D1E35] border border-[#1C3B65]">
                <span className="text-[11px] text-[#98A2B3] block">Municipal Control Line:</span>
                <span className="font-bold text-white text-sm">040-21111111</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0D1E35] border border-[#1C3B65]">
                <span className="text-[11px] text-[#98A2B3] block">Police / Fire / Medical Emergency:</span>
                <span className="font-bold text-[#FECDCA] text-sm">Dial 112 (National Helpline)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Privacy, Terms & Attribution */}
        <div className="pt-6 border-t border-[#1C3B65] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#98A2B3] text-[11px]">
          <p>© {new Date().getFullYear()} CivicPulse. Academic EDP Project Prototype. Not an official government portal.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Citizen Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
