import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { FloatingChatbot } from '../components/chatbot/FloatingChatbot';
import { Link, useNavigate } from '../router';
import { Complaint, ComplaintCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { complaintService } from '../services/complaintService';
import {
  Bot,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  Activity,
  ArrowRight,
  AlertTriangle,
  ChevronDown,
  Building2,
  MapPin,
  Sparkles,
  Check,
  Copy
} from '../components/common/Icons';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Quick Complaint Intake states
  const [quickCategory, setQuickCategory] = useState<ComplaintCategory>('roads');
  const [quickArea, setQuickArea] = useState('Madhapur');
  const [quickDesc, setQuickDesc] = useState('');
  const [quickPhone, setQuickPhone] = useState(user?.phone || '');
  const [quickSubmitted, setQuickSubmitted] = useState<Complaint | null>(null);
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);
  const [quickError, setQuickError] = useState('');

  const QUICK_PRESETS: Record<string, string[]> = {
    roads: ['Deep pothole near junction', 'Broken road divider', 'Uneven road crater'],
    water: ['Water pipeline burst on road', 'Low pressure supply', 'Water contamination'],
    garbage: ['Overflowing garbage bin', 'Roadside waste dumping', 'Waste not cleared'],
    streetlights: ['Streetlights dark at night', 'Flickering pole light', 'Damaged electric box'],
    drainage: ['Open manhole cover risk', 'Sewage spilling on street', 'Blocked drain flooding']
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickDesc.trim()) {
      setQuickError('Please enter a description or pick one of the common issues above.');
      return;
    }
    setQuickError('');
    setQuickLoading(true);

    try {
      const created = complaintService.createComplaint({
        title: quickDesc.trim().slice(0, 60) + (quickDesc.trim().length > 60 ? '...' : ''),
        description: quickDesc.trim(),
        category: quickCategory,
        priority: quickCategory === 'water' || quickCategory === 'drainage' ? 'high' : 'medium',
        address: `${quickArea} Ward Sector, Hyderabad`,
        area: quickArea,
        ward: `Ward in ${quickArea} Zone`,
        citizenId: user ? user.id : 'usr-guest-' + Date.now().toString().slice(-4),
        citizenName: user ? user.name : 'Citizen Resident',
        citizenPhone: quickPhone || user?.phone || '+91 98490 12345',
        citizenEmail: user ? user.email : 'citizen.hyd@smartcity.gov.in',
        preferredContact: 'phone'
      });

      addNotification(
        'Complaint Registered Successfully',
        `Your grievance #${created.id} has been logged in ${quickArea}.`,
        'success',
        created.id
      );

      setQuickSubmitted(created);
    } catch (err: any) {
      setQuickError(err.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setQuickLoading(false);
    }
  };

  const handleCopyTicket = (id: string) => {
    navigator.clipboard.writeText(id);
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2000);
  };

  const SERVICES = [
    {
      category: 'roads' as ComplaintCategory,
      title: 'Roads and Potholes',
      desc: 'Report road damage, dangerous potholes, uneven road resurfacing, and pedestrian pavement cracks.',
      icon: '🛣️'
    },
    {
      category: 'water' as ComplaintCategory,
      title: 'Water Supply',
      desc: 'Pipeline leaks, drinking water contamination, disrupted supply cycles, and emergency water tanker support.',
      icon: '💧'
    },
    {
      category: 'garbage' as ComplaintCategory,
      title: 'Waste Management',
      desc: 'Doorstep waste collection delays, overflowing garbage bins, illegal community dumping, and litter clearance.',
      icon: '🗑️'
    },
    {
      category: 'streetlights' as ComplaintCategory,
      title: 'Streetlights',
      desc: 'Non-functional streetlights, faulty timers, damaged electrical poles, and low-light public safety hazards.',
      icon: '💡'
    },
    {
      category: 'drainage' as ComplaintCategory,
      title: 'Drainage and Sewage',
      desc: 'Blocked stormwater drains, sewage overflow onto streets, missing manhole covers, and monsoon waterlogging.',
      icon: '🌊'
    },
    {
      category: 'other' as ComplaintCategory,
      title: 'Public Infrastructure',
      desc: 'Public park upkeep, damaged dividers, missing safety railings, civic signages, and property tax assistance.',
      icon: '🏛️'
    }
  ];

  const FAQS = [
    {
      q: 'How does CivicPulse assist citizens with complaints?',
      a: 'CivicPulse provides an interactive AI assistant available 24/7. Citizens can describe any municipal problem in natural text or voice (in English, Telugu, or Hindi). The system categorizes the complaint, assesses the urgency level, guides required details, and generates a structured grievance ticket with a unique tracking ID.'
    },
    {
      q: 'How do I track the status of my reported issue?',
      a: 'Every registered issue receives a unique complaint reference code (e.g., SC-2026-0001). You can visit the "Track Complaint" page and enter your reference ID to view real-time progress, assigned department details, officer inspection logs, and estimated resolution timelines.'
    },
    {
      q: 'Can I use CivicPulse without creating an account?',
      a: 'You can explore civic guidelines, chat with the AI assistant, and track public complaints without logging in. To file formal complaints and receive personalized SMS or dashboard notifications, you can quickly sign in as a citizen.'
    },
    {
      q: 'Is CivicPulse an emergency response hotline?',
      a: 'No. CivicPulse is designed for non-emergency municipal maintenance and service grievance management. In life-threatening emergencies, fires, or medical crises, citizens should immediately dial 112 (National Emergency), 108 (Ambulance), or 101 (Fire).'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#142B4A] text-white py-16 lg:py-24 border-b border-[#1C3B65]">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#0F9D91 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F9D91]/20 border border-[#0F9D91]/40 text-[#5DE2D6] text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#0F9D91] animate-pulse" />
                <span>Smart City Citizen Service Portal</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Your City. Your Voice. <br />
                <span className="text-[#0F9D91]">Better Services.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D0D5DD] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Report civic issues, get reliable service guidance, and track your complaints through one intelligent citizen-service platform.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to="/complaints/new"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-white font-semibold text-sm shadow-md transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: '#0F9D91' }}
                >
                  <FileText className="w-4 h-4" />
                  <span>Report an Issue</span>
                </Link>

                <Link
                  to="/chatbot"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#142B4A] font-semibold text-sm shadow-sm transition-all hover:bg-slate-100 active:scale-95 border border-[#E4E7EC]"
                >
                  <Bot className="w-4 h-4 text-[#0F9D91]" />
                  <span>Ask CivicPulse AI</span>
                </Link>

                <Link
                  to="/track"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[#E4E7EC] hover:text-white font-medium text-sm transition-colors border border-[#2D476D] bg-[#142B4A]/50 hover:bg-[#1C3B65]"
                >
                  <Search className="w-4 h-4 text-[#98A2B3]" />
                  <span>Track Status</span>
                </Link>
              </div>

              {/* Verified Features */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#1C3B65] max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-[#98A2B3]">AI Citizen Help</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0F9D91]">Trilingual</div>
                  <div className="text-xs text-[#98A2B3]">EN • TE • HI</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FDE8E8]">Direct SLA</div>
                  <div className="text-xs text-[#98A2B3]">Real-time Tracking</div>
                </div>
              </div>
            </div>

            {/* Right: Quick Issue Intake Widget / Celebration View */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-[#E4E7EC] text-[#1D2939]">
                {quickSubmitted ? (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] text-[#16865C] flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#16865C]">
                        <span className="w-2 h-2 rounded-full bg-[#16865C] animate-pulse" />
                        Grievance Registered with GHMC
                      </span>
                      <h3 className="text-xl font-bold text-[#142B4A] mt-2">Complaint Confirmed</h3>
                      <p className="text-xs text-[#667085] mt-1">
                        Dispatched to {quickSubmitted.assignedDepartment}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E7EC] flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[#667085]">
                          Reference Tracking ID
                        </div>
                        <div className="text-base font-extrabold text-[#142B4A]">
                          #{quickSubmitted.id}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyTicket(quickSubmitted.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#E4E7EC] text-[#142B4A] hover:bg-slate-50 transition-colors"
                        title="Copy Reference ID"
                      >
                        {quickCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#667085]" />}
                        <span>{quickCopied ? 'Copied!' : 'Copy ID'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-50 p-3 rounded-xl border border-[#E4E7EC]">
                      <div>
                        <span className="text-[#667085] block text-[11px]">Area &amp; Ward:</span>
                        <span className="font-semibold text-[#142B4A]">{quickSubmitted.area}</span>
                      </div>
                      <div>
                        <span className="text-[#667085] block text-[11px]">SLA Response:</span>
                        <span className="font-semibold text-[#B7791F]">{quickSubmitted.slaHours} Hours</span>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        onClick={() => navigate('/track', { state: { complaintId: quickSubmitted.id } })}
                        className="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-white shadow-sm transition-all hover:brightness-110"
                        style={{ backgroundColor: '#0F9D91' }}
                      >
                        Track Status on Live Timeline →
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate('/complaints')}
                          className="flex-1 py-2 px-3 rounded-xl text-center text-xs font-semibold text-[#142B4A] bg-[#F5F7FA] hover:bg-[#EEF2F6] border border-[#E4E7EC] transition-colors"
                        >
                          View My Complaints
                        </button>
                        <button
                          onClick={() => {
                            setQuickSubmitted(null);
                            setQuickDesc('');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl text-center text-xs font-semibold text-[#667085] hover:text-[#142B4A] border border-transparent hover:border-[#E4E7EC] transition-colors"
                        >
                          + File Another
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D91] animate-pulse" />
                          <h3 className="text-sm font-bold text-[#142B4A]">
                            Quick Grievance Intake
                          </h3>
                        </div>
                        <p className="text-[11px] text-[#667085] mt-0.5">
                          Instant registration with Greater Hyderabad Municipal Corp
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F9D91] bg-[#E6F6F5] px-2 py-0.5 rounded-full">
                        Live System
                      </span>
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#475467] mb-1.5">
                        Select Category
                      </label>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[
                          { id: 'roads', label: 'Roads', icon: '🛣️' },
                          { id: 'water', label: 'Water', icon: '💧' },
                          { id: 'garbage', label: 'Waste', icon: '🗑️' },
                          { id: 'streetlights', label: 'Lights', icon: '💡' },
                          { id: 'drainage', label: 'Drain', icon: '🌊' }
                        ].map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setQuickCategory(c.id as ComplaintCategory)}
                            className={`p-2 rounded-xl text-center border transition-all ${
                              quickCategory === c.id
                                ? 'bg-[#0F9D91]/10 border-[#0F9D91] text-[#0F9D91] font-bold shadow-xs'
                                : 'bg-white border-[#E4E7EC] text-[#667085] hover:bg-slate-50'
                            }`}
                          >
                            <span className="block text-base leading-none mb-1">{c.icon}</span>
                            <span className="block text-[10px] leading-tight truncate">{c.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Area Dropdown */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#475467] mb-1">
                        Hyderabad Locality / Ward
                      </label>
                      <select
                        value={quickArea}
                        onChange={e => setQuickArea(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-[#D0D5DD] bg-white text-[#1D2939] focus:outline-none focus:ring-2 focus:ring-[#0F9D91]"
                      >
                        <option value="Madhapur">Madhapur (Ward 105 - Serilingampally)</option>
                        <option value="Hitec City">Hitec City (Ward 104 - Cyberabad)</option>
                        <option value="Gachibowli">Gachibowli (Ward 106 - Financial District)</option>
                        <option value="Banjara Hills">Banjara Hills (Ward 93 - Khairatabad)</option>
                        <option value="Jubilee Hills">Jubilee Hills (Ward 94 - Jubilee Hills)</option>
                        <option value="Kukatpally">Kukatpally (Ward 120 - Kukatpally)</option>
                        <option value="Charminar">Charminar (Ward 4 - Charminar Old City)</option>
                        <option value="Secunderabad">Secunderabad (Ward 147 - Clock Tower)</option>
                        <option value="Ameerpet">Ameerpet (Ward 100 - Central)</option>
                        <option value="Begumpet">Begumpet (Ward 149 - Begumpet)</option>
                        <option value="Kondapur">Kondapur (Ward 103 - Serilingampally)</option>
                      </select>
                    </div>

                    {/* Common Issue Quick Chips */}
                    <div>
                      <span className="block text-[11px] font-semibold text-[#475467] mb-1">
                        Common Issues (Click to fill)
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_PRESETS[quickCategory]?.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setQuickDesc(preset)}
                            className="text-[10px] px-2 py-1 rounded-lg bg-[#F5F7FA] hover:bg-[#E6F6F5] border border-[#E4E7EC] hover:border-[#0F9D91] text-[#475467] hover:text-[#0F9D91] transition-colors truncate max-w-[200px]"
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Issue Description Input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#475467] mb-1">
                        Problem Description
                      </label>
                      <textarea
                        rows={2}
                        value={quickDesc}
                        onChange={e => {
                          setQuickDesc(e.target.value);
                          if (quickError) setQuickError('');
                        }}
                        placeholder="e.g., Deep pothole near junction causing danger, water leakage..."
                        className="w-full text-xs px-3 py-2 rounded-xl border border-[#D0D5DD] bg-white text-[#1D2939] focus:outline-none focus:ring-2 focus:ring-[#0F9D91] resize-none"
                      />
                    </div>

                    {quickError && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#D64545] bg-[#FEF3F2] p-2 rounded-lg border border-[#FECDCA]">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{quickError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={quickLoading}
                      className="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#142B4A' }}
                    >
                      {quickLoading ? (
                        <span>Logging Grievance...</span>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 text-[#0F9D91]" />
                          <span>Submit Complaint Instantly</span>
                        </>
                      )}
                    </button>

                    {/* Detailed Form Link */}
                    <div className="text-center pt-1 border-t border-[#E4E7EC]">
                      <button
                        type="button"
                        onClick={() => navigate('/complaints/new')}
                        className="text-[11px] font-medium text-[#0F9D91] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Need photo upload, GPS map pin or full form? Click here</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F9D91] bg-[#E6F6F5] px-2.5 py-1 rounded-full">
              Municipal Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142B4A] mt-3">
              Comprehensive Civic Assistance
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              Select any civic category below to register a complaint or consult with CivicPulse AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(svc => (
              <div
                key={svc.category}
                onClick={() => navigate('/complaints/new', { state: { prefill: { category: svc.category } } })}
                className="bg-white rounded-xl p-6 border border-[#E4E7EC] hover:border-[#0F9D91] shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] border border-[#E4E7EC] flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
                    {svc.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#142B4A] mb-2 group-hover:text-[#0F9D91] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E4E7EC] flex items-center justify-between text-xs font-semibold text-[#0F9D91]">
                  <span>Report this issue</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-[#F5F7FA] border-y border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#142B4A] bg-[#EEF2F6] px-2.5 py-1 rounded-full">
              Simple Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142B4A] mt-3">
              How CivicPulse Works
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              Three transparent steps to take your issue from report to resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 border border-[#E4E7EC] text-center shadow-xs">
              <div
                className="w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold text-base mx-auto mb-4"
                style={{ backgroundColor: '#142B4A' }}
              >
                1
              </div>
              <h3 className="text-base font-bold text-[#142B4A] mb-2">Describe Your Issue</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Explain the grievance using text or voice in English, Telugu, or Hindi. The AI guides you on location and details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 border border-[#E4E7EC] text-center shadow-xs">
              <div
                className="w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold text-base mx-auto mb-4"
                style={{ backgroundColor: '#0F9D91' }}
              >
                2
              </div>
              <h3 className="text-base font-bold text-[#142B4A] mb-2">Receive Reference Number</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Confirm AI suggestions for category, priority, and department to generate your unique reference ID (e.g. SC-2026-0001).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 border border-[#E4E7EC] text-center shadow-xs">
              <div
                className="w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold text-base mx-auto mb-4"
                style={{ backgroundColor: '#16865C' }}
              >
                3
              </div>
              <h3 className="text-base font-bold text-[#142B4A] mb-2">Track Progress &amp; Resolution</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Follow real-time status changes, inspection notes, and municipal officer actions until resolution is confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Introduction Banner */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 border border-[#E4E7EC] bg-gradient-to-r from-[#F5F7FA] to-[#E6F6F5] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="p-3.5 rounded-xl text-white shrink-0"
                style={{ backgroundColor: '#0F9D91' }}
              >
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#142B4A]">
                  CivicPulse Intelligent Assistant
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] mt-1 max-w-xl leading-relaxed">
                  Have questions about water schedules, property tax procedures, or need to register a complaint hands-free? Chat directly with our civic assistant.
                </p>
              </div>
            </div>

            <Link
              to="/chatbot"
              className="shrink-0 px-5 py-3 rounded-xl text-white font-semibold text-xs shadow-xs transition-colors hover:brightness-110"
              style={{ backgroundColor: '#0F9D91' }}
            >
              Start Conversation →
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Guidance Disclaimer */}
      <section className="py-10 bg-[#FFF7F7] border-y border-[#FECDCA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-[#D64545] shrink-0 mt-0.5" />
            <div className="text-xs text-[#1D2939] space-y-1">
              <p className="font-bold text-[#D64545]">
                Emergency Protocol Notice
              </p>
              <p className="text-[#667085] leading-relaxed">
                CivicPulse is designed for non-emergency municipal service grievances. In case of active electrical hazards, severe fires, structural collapse, or medical crises, please dial <strong>112 (National Emergency)</strong> or <strong>108 (Ambulance)</strong> immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142B4A]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              Clear answers regarding complaint submission, tracking, and municipal workflow.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E4E7EC] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1D2939] hover:text-[#0F9D91] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#667085] transition-transform duration-200 ${
                      openFaq === idx ? 'transform rotate-180 text-[#0F9D91]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#667085] leading-relaxed border-t border-[#E4E7EC] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChatbot />
    </div>
  );
};
