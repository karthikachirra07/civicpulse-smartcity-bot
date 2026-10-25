import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useLocation, useNavigate, Link } from '../../router';
import { complaintService } from '../../services/complaintService';
import { ComplaintCategory, ComplaintPriority } from '../../types';
import { VoiceMic } from '../../components/common/VoiceMic';
import {
  FileText,
  MapPin,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Bot,
  Sparkles,
  Clock,
  Building2,
  User,
  Phone,
  Mail,
  Plus
} from '../../components/common/Icons';

export const NewComplaintPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  const { state } = useLocation();
  const navigate = useNavigate();

  const prefill = state?.prefill;

  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guest details if not logged in
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');

  // Section A: Form Fields
  const [title, setTitle] = useState(prefill?.title || '');
  const [description, setDescription] = useState(prefill?.description || '');
  const [category, setCategory] = useState<ComplaintCategory>(prefill?.category || 'roads');
  const [priority, setPriority] = useState<ComplaintPriority>(prefill?.priority || 'medium');
  const [area, setArea] = useState(prefill?.area || 'Madhapur');
  const [address, setAddress] = useState(prefill?.address || '');
  const [useGps, setUseGps] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);

  // Section B: Attachments
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(prefill?.photoUrl || undefined);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Section C: AI Suggestions
  const [aiSuggestedCat, setAiSuggestedCat] = useState<ComplaintCategory>('roads');
  const [aiSuggestedPrio, setAiSuggestedPrio] = useState<ComplaintPriority>('medium');
  const [aiSuggestedDept, setAiSuggestedDept] = useState('Roads & Public Infrastructure');
  const [aiExplanation, setAiExplanation] = useState('Road surface inspection keywords detected.');

  // Contact & Consent
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'sms'>('phone');
  const [consent, setConsent] = useState(true);

  // Result state & Inline Errors
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const HYDERABAD_AREAS = [
    'Madhapur',
    'Hitec City',
    'Gachibowli',
    'Banjara Hills',
    'Jubilee Hills',
    'Kukatpally',
    'Charminar',
    'Secunderabad',
    'Begumpet',
    'Dilsukhnagar',
    'Mehdipatnam',
    'Kondapur'
  ];

  const SAMPLE_PRESETS = [
    {
      label: '🕳️ Deep Pothole (Madhapur)',
      title: 'Dangerous deep pothole near Cyber Towers flyover',
      category: 'roads' as ComplaintCategory,
      priority: 'high' as ComplaintPriority,
      area: 'Madhapur',
      address: 'Near Cyber Towers 100ft road junction, opposite pillar 12',
      description: 'Severe pothole crater has developed on the left carriageway after heavy rains. Multiple two-wheelers have skidded here creating an immediate traffic accident risk.'
    },
    {
      label: '🚯 Garbage Dump (Banjara Hills)',
      title: 'Commercial garbage pile overflow blocking pedestrian path',
      category: 'garbage' as ComplaintCategory,
      priority: 'medium' as ComplaintPriority,
      area: 'Banjara Hills',
      address: 'Road No. 12, near community temple park corner',
      description: 'Large commercial and domestic waste mound has been uncollected for 3 days. Foul stench spreading across neighborhood with stray animal menace.'
    },
    {
      label: '💧 Pipe Burst (Gachibowli)',
      title: 'Major potable drinking water pipe burst flooding road',
      category: 'water' as ComplaintCategory,
      priority: 'critical' as ComplaintPriority,
      area: 'Gachibowli',
      address: 'Financial District main road, opposite Q-City gate',
      description: 'High pressure drinking water line has ruptured and clean water is continuously gushing onto the road causing localized flooding and complete water pressure loss in surrounding buildings.'
    },
    {
      label: '💡 Streetlights Out (Jubilee Hills)',
      title: 'Continuous stretch of 8 streetlights dark for past week',
      category: 'streetlights' as ComplaintCategory,
      priority: 'medium' as ComplaintPriority,
      area: 'Jubilee Hills',
      address: 'Road No. 36, between checkpost and metro station',
      description: 'An entire block of streetlights has been dark for 7 consecutive nights creating severe safety concerns for pedestrians and night commuters.'
    }
  ];

  const applyPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setPriority(preset.priority);
    setArea(preset.area);
    setAddress(preset.address);
    setDescription(preset.description);
    setErrors({});
  };

  // Auto detect AI suggestions when description changes
  useEffect(() => {
    if (description) {
      const lower = description.toLowerCase();
      let cat: ComplaintCategory = 'other';
      let expl = 'General municipal maintenance required.';

      if (lower.includes('water') || lower.includes('leak') || lower.includes('pipe') || lower.includes('tanker')) {
        cat = 'water';
        expl = 'Water pipeline breakdown detected. Directing to Water Board (HMWSSB).';
      } else if (lower.includes('garbage') || lower.includes('waste') || lower.includes('trash') || lower.includes('bin') || lower.includes('dump')) {
        cat = 'garbage';
        expl = 'Solid waste & doorstep accumulation detected. Directing to Swachh Cell.';
      } else if (lower.includes('pothole') || lower.includes('road') || lower.includes('asphalt') || lower.includes('crater') || lower.includes('flyover')) {
        cat = 'roads';
        expl = 'Road surface damage hazard detected. Directing to Municipal Engineering.';
      } else if (lower.includes('drain') || lower.includes('sewage') || lower.includes('manhole')) {
        cat = 'drainage';
        expl = 'Stormwater or sewage obstruction hazard. Directing to Drainage Maintenance.';
      } else if (lower.includes('light') || lower.includes('pole') || lower.includes('lamp') || lower.includes('dark')) {
        cat = 'streetlights';
        expl = 'Public lighting failure detected. Directing to Electrical Services.';
      } else if (lower.includes('traffic') || lower.includes('signal') || lower.includes('junction')) {
        cat = 'traffic';
        expl = 'Traffic signal outage detected. Directing to Traffic Management.';
      } else if (lower.includes('mosquito') || lower.includes('fogging') || lower.includes('sanitation')) {
        cat = 'sanitation';
        expl = 'Vector control / public health disinfection issue. Directing to Health Department.';
      }

      let prio: ComplaintPriority = 'medium';
      if (lower.includes('burst') || lower.includes('hazard') || lower.includes('open manhole') || lower.includes('shock') || lower.includes('emergency')) {
        prio = 'critical';
      } else if (lower.includes('deep') || lower.includes('severe') || lower.includes('school') || lower.includes('heavy') || lower.includes('accident')) {
        prio = 'high';
      } else if (lower.includes('minor') || lower.includes('small') || lower.includes('clean')) {
        prio = 'low';
      }

      setAiSuggestedCat(cat);
      setAiSuggestedPrio(prio);
      setAiSuggestedDept(complaintService.getDepartmentForCategory(cat));
      setAiExplanation(expl);
    }
  }, [description]);

  const handleApplyAiSuggestions = () => {
    setCategory(aiSuggestedCat);
    setPriority(aiSuggestedPrio);
  };

  const handleSimulateGps = () => {
    setUseGps(true);
    setCoords({ lat: 17.4450 + (Math.random() * 0.02), lng: 78.3750 + (Math.random() * 0.02) });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'File size must be under 5MB.' }));
      return;
    }

    setUploadProgress(20);
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 40;
      });
    }, 150);

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
      setTimeout(() => setUploadProgress(null), 600);
      setErrors(prev => {
        const next = { ...prev };
        delete next.photo;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title.trim() || title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
    }
    if (!description.trim() || description.length < 15) {
      newErrors.description = 'Please provide detailed description (at least 15 characters).';
    }
    if (!address.trim()) {
      newErrors.address = 'Street location or landmark is required.';
    }
    if (!consent) {
      newErrors.consent = 'You must confirm the accuracy of this report.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const citizenId = user ? user.id : `usr-cit-${Date.now().toString().slice(-4)}`;
      const citizenName = user ? user.name : (guestName.trim() || 'Citizen User');
      const citizenPhone = user ? user.phone : (guestPhone.trim() || '+91 98490 12345');
      const citizenEmail = user ? user.email : (guestEmail.trim() || 'citizen@hyderabad.gov.in');

      const newComplaint = complaintService.createComplaint({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        aiSuggestedCategory: aiSuggestedCat,
        aiSuggestedPriority: aiSuggestedPrio,
        aiSuggestedDepartment: aiSuggestedDept,
        address: address.trim(),
        area,
        ward: `Ward in ${area}`,
        coordinates: coords,
        photoUrl,
        citizenId,
        citizenName,
        citizenPhone,
        citizenEmail,
        preferredContact
      });

      setCreatedTicketId(newComplaint.id);
      addNotification(
        `Complaint #${newComplaint.id} Registered`,
        `Your grievance regarding "${newComplaint.title}" has been routed to ${newComplaint.assignedDepartment}. SLA: ${newComplaint.slaHours} hours.`,
        'success',
        newComplaint.id
      );
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrors({ submit: 'Failed to record complaint in database. Please verify all fields and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('roads');
    setPriority('medium');
    setAddress('');
    setPhotoUrl(undefined);
    setCreatedTicketId(null);
    setStep('form');
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Citizen Portal', href: '/citizen/dashboard' },
        { label: 'Register Complaint' }
      ]}
      title="Register Civic Complaint"
      subtitle="Report municipal issues with automated AI department routing and real-time SLA tracking"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Step Progression Bar */}
        <div className="card-base p-4">
          <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-white transition-colors ${
                  step === 'form' ? 'bg-[#142B4A]' : 'bg-[#16865C]'
                }`}
              >
                {step === 'form' ? '1' : '✓'}
              </span>
              <span className={step === 'form' ? 'text-[#142B4A] font-bold' : 'text-[#667085]'}>
                Complaint Details
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-[#E4E7EC] mx-3" />

            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-white transition-colors ${
                  step === 'review'
                    ? 'bg-[#142B4A]'
                    : step === 'success'
                    ? 'bg-[#16865C]'
                    : 'bg-[#98A2B3]'
                }`}
              >
                {step === 'success' ? '✓' : '2'}
              </span>
              <span className={step === 'review' ? 'text-[#142B4A] font-bold' : 'text-[#667085]'}>
                Review &amp; Confirm
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-[#E4E7EC] mx-3" />

            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-white transition-colors ${
                  step === 'success' ? 'bg-[#16865C]' : 'bg-[#98A2B3]'
                }`}
              >
                3
              </span>
              <span className={step === 'success' ? 'text-[#16865C] font-bold' : 'text-[#667085]'}>
                Ticket Issued
              </span>
            </div>
          </div>
        </div>

        {/* User Account Context Banner */}
        {isAuthenticated && user ? (
          <div className="p-3 bg-[#E6F6F5] border border-[#0F9D91]/30 rounded-xl flex items-center justify-between text-xs text-[#142B4A]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0F9D91]" />
              <span>
                Filing as <strong>{user.name}</strong> ({user.email}) — Ticket will appear in your <strong>My Complaints</strong> dashboard.
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#FEF7EC] border border-[#FECDCA] rounded-xl flex items-center justify-between text-xs text-[#B7791F]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
              <span>You are filing as a citizen guest. Sign in to link this report to your permanent profile.</span>
            </div>
            <Link to="/login" className="font-bold underline text-[#142B4A]">
              Sign In
            </Link>
          </div>
        )}

        {/* Global Submit Error if any */}
        {errors.submit && (
          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#FECDCA] text-[#D64545] text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errors.submit}</span>
          </div>
        )}

        {/* STEP 1: FORM SECTIONS */}
        {step === 'form' && (
          <form onSubmit={handleProceedToReview} className="space-y-6">
            {/* Quick 1-Click Fill Preset Buttons */}
            <div className="card-base p-4">
              <span className="text-xs font-bold text-[#142B4A] block mb-2">
                ⚡ Quick Fill Sample Reports (Click to auto-populate form):
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="text-xs py-1.5 px-2.5 rounded-lg border border-[#E4E7EC] bg-[#F5F7FA] hover:bg-[#E6F6F5] hover:border-[#0F9D91] text-[#142B4A] font-medium transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION A — Complaint Details */}
            <div className="card-base p-6 space-y-4">
              <div className="border-b border-[#E4E7EC] pb-3">
                <h3 className="text-sm font-bold text-[#142B4A] uppercase tracking-wider">
                  Section A — Grievance Details
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Describe the civic grievance clearly so field personnel can inspect promptly.
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Complaint Title <span className="text-[#D64545]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Major water pipeline leakage flooding road"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={`input-base text-xs sm:text-sm py-2 px-3 ${
                    errors.title ? 'border-[#D64545] focus:border-[#D64545]' : ''
                  }`}
                  required
                />
                {errors.title && <p className="text-[11px] text-[#D64545] mt-1">{errors.title}</p>}
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1D2939] mb-1">
                    Department Service Category <span className="text-[#D64545]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ComplaintCategory)}
                    className="input-base text-xs sm:text-sm py-2 px-3"
                  >
                    <option value="roads">Road Damage &amp; Potholes</option>
                    <option value="water">Drinking Water Supply (HMWSSB)</option>
                    <option value="garbage">Garbage &amp; Solid Waste</option>
                    <option value="drainage">Drainage &amp; Sewage Overflows</option>
                    <option value="streetlights">Smart LED Streetlights</option>
                    <option value="sanitation">Sanitation &amp; Fogging</option>
                    <option value="traffic">Traffic Signals &amp; Bottlenecks</option>
                    <option value="other">Other Civic Amenities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D2939] mb-1">
                    Severity Priority
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as ComplaintPriority)}
                    className="input-base text-xs sm:text-sm py-2 px-3"
                  >
                    <option value="low">Low (Routine maintenance — 48h SLA)</option>
                    <option value="medium">Medium (Standard attention — 24h SLA)</option>
                    <option value="high">High (Major civic disruption — 12h SLA)</option>
                    <option value="critical">Critical (Emergency safety hazard — 6h SLA)</option>
                  </select>
                </div>
              </div>

              {/* Locality & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1D2939] mb-1">
                    Hyderabad Locality / Zone <span className="text-[#D64545]">*</span>
                  </label>
                  <select
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="input-base text-xs sm:text-sm py-2 px-3"
                  >
                    {HYDERABAD_AREAS.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D2939] mb-1">
                    Street Address &amp; Landmark <span className="text-[#D64545]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Metro Pillar 14, Main Road"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className={`input-base text-xs sm:text-sm py-2 px-3 ${
                      errors.address ? 'border-[#D64545]' : ''
                    }`}
                    required
                  />
                  {errors.address && <p className="text-[11px] text-[#D64545] mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* Geotag GPS Simulation */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleSimulateGps}
                  className="inline-flex items-center gap-1.5 text-xs text-[#0F9D91] hover:text-[#0C8379] font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{coords ? `📍 GPS Coordinates Attached (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})` : 'Click to Auto-Detect GPS Location'}</span>
                </button>
              </div>

              {/* Description & Voice Dictation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#1D2939]">
                    Detailed Description <span className="text-[#D64545]">*</span>
                  </label>
                  <VoiceMic onTranscript={txt => setDescription(prev => prev ? `${prev} ${txt}` : txt)} />
                </div>
                <textarea
                  rows={4}
                  placeholder="Provide complete details including when the issue occurred, extent of damage, and any nearby landmarks..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={`input-base text-xs sm:text-sm py-2 px-3 ${
                    errors.description ? 'border-[#D64545]' : ''
                  }`}
                  required
                />
                {errors.description && <p className="text-[11px] text-[#D64545] mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* SECTION B — Attachments */}
            <div className="card-base p-6 space-y-4">
              <div className="border-b border-[#E4E7EC] pb-3">
                <h3 className="text-sm font-bold text-[#142B4A] uppercase tracking-wider">
                  Section B — Photographic Evidence (Optional)
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Adding a photo assists field officers in dispatching the correct machinery.
                </p>
              </div>

              <div className="border-2 border-dashed border-[#D0D5DD] rounded-xl p-6 text-center hover:border-[#0F9D91] transition-colors">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="photo-upload" className="cursor-pointer block">
                  <UploadCloud className="w-8 h-8 text-[#98A2B3] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#142B4A]">
                    Click to select photo or drag &amp; drop
                  </p>
                  <p className="text-[11px] text-[#667085] mt-1">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </label>
              </div>

              {uploadProgress !== null && (
                <div className="w-full bg-[#E4E7EC] rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-[#0F9D91] h-1.5 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {photoUrl && (
                <div className="mt-3 relative inline-block">
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg border border-[#E4E7EC] shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl(undefined)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[#D64545] text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* SECTION C — AI Auto-Routing Insight */}
            <div className="card-base p-5 bg-[#F0FAF9] border border-[#0F9D91]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0F9D91] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-[#142B4A]">CivicPulse AI Routing Assistant</h4>
                  <p className="text-[#667085] mt-0.5">{aiExplanation}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-[#142B4A]">Assigned Agency:</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-[#0F9D91]/40 font-bold text-[#0F9D91]">
                      {aiSuggestedDept}
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyAiSuggestions}
                      className="text-[#0F9D91] font-bold underline hover:text-[#0C8379] ml-2"
                    >
                      Apply AI Category &amp; Priority
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Consent & Submit */}
            <div className="card-base p-4 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#1D2939]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#D0D5DD] text-[#0F9D91] focus:ring-[#0F9D91]"
                />
                <span>
                  I declare that this complaint represents an authentic civic grievance at the mentioned location.
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-primary text-xs sm:text-sm py-2 px-5"
                >
                  <span>Review &amp; Confirm Complaint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: REVIEW & CONFIRM */}
        {step === 'review' && (
          <div className="card-base p-6 space-y-6">
            <div className="border-b border-[#E4E7EC] pb-3">
              <h3 className="text-sm font-bold text-[#142B4A] uppercase tracking-wider">
                Step 2 — Review Complaint Summary
              </h3>
              <p className="text-xs text-[#667085] mt-0.5">
                Verify the ticket parameters before submitting to the municipal dispatch queue.
              </p>
            </div>

            <div className="bg-[#F5F7FA] border border-[#E4E7EC] rounded-xl p-5 space-y-4 text-xs">
              <div>
                <span className="text-[#667085] block mb-0.5">Title</span>
                <p className="font-bold text-sm text-[#142B4A]">{title}</p>
              </div>

              <div>
                <span className="text-[#667085] block mb-0.5">Description</span>
                <div className="text-[#1D2939] leading-relaxed bg-white p-3 rounded-lg border border-[#E4E7EC]">
                  {description}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <span className="text-[#667085] block">Category</span>
                  <span className="font-bold text-[#142B4A] uppercase">{category}</span>
                </div>
                <div>
                  <span className="text-[#667085] block">Priority</span>
                  <span className="font-bold text-[#142B4A] uppercase">{priority}</span>
                </div>
                <div>
                  <span className="text-[#667085] block">Target SLA</span>
                  <span className="font-bold text-[#0F9D91]">
                    {complaintService.calculateSLAHours(priority)} Hours
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block">Locality</span>
                  <span className="font-bold text-[#142B4A]">{area}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E4E7EC]">
                <span className="text-[#667085] block mb-0.5">Address / Landmark</span>
                <p className="font-medium text-[#1D2939]">{address}</p>
                {coords && (
                  <p className="text-[11px] text-[#0F9D91] font-semibold mt-0.5">
                    📍 Geotag: Lat {coords.lat.toFixed(4)}, Lng {coords.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#E4E7EC]">
                <span className="text-[#667085] block mb-0.5">Assigned Municipal Agency</span>
                <p className="font-bold text-[#142B4A]">{complaintService.getDepartmentForCategory(category)}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="btn-secondary text-xs"
              >
                Back to Edit
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="btn-primary text-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering...' : 'Confirm & Register Complaint'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && createdTicketId && (
          <div className="card-base p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#16865C] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-[#16865C] uppercase tracking-wider bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                Complaint Registered Successfully
              </span>
              <h2 className="text-2xl font-bold text-[#142B4A] mt-3">
                Tracking Reference #{createdTicketId}
              </h2>
              <p className="text-xs sm:text-sm text-[#667085] mt-2 max-w-md mx-auto">
                Your report has been entered into the CivicPulse governance registry and dispatched to{' '}
                <strong>{complaintService.getDepartmentForCategory(category)}</strong>.
              </p>
            </div>

            <div className="bg-[#F5F7FA] border border-[#E4E7EC] rounded-xl p-4 max-w-sm mx-auto text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-[#667085]">Target SLA:</span>
                <span className="font-bold text-[#142B4A]">{complaintService.calculateSLAHours(priority)} Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Filing Citizen:</span>
                <span className="font-bold text-[#142B4A]">{user ? user.name : (guestName || 'Citizen')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Initial Status:</span>
                <span className="font-bold text-[#B7791F]">SUBMITTED (Pending Review)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate(`/track?id=${createdTicketId}`)}
                className="btn-primary w-full sm:w-auto text-xs"
              >
                <span>Track Complaint Status Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/citizen/dashboard')}
                className="btn-secondary w-full sm:w-auto text-xs"
              >
                Go to Citizen Dashboard
              </button>

              <button
                onClick={resetForm}
                className="text-xs text-[#0F9D91] font-semibold underline px-2 py-1"
              >
                Report Another Issue
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
