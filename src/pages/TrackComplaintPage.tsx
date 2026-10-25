import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { FloatingChatbot } from '../components/chatbot/FloatingChatbot';
import { complaintService } from '../services/complaintService';
import { Complaint } from '../types';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../router';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  AlertTriangle,
  ArrowRight,
  Shield,
  Building2
} from '../components/common/Icons';

export const TrackComplaintPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getTargetId = () => {
    const params = new URLSearchParams(window.location.search);
    return location.state?.complaintId || params.get('id') || '';
  };

  const [query, setQuery] = useState(() => getTargetId());
  const [complaint, setComplaint] = useState<Complaint | null>(() => {
    const initialId = getTargetId();
    if (initialId) {
      const found = complaintService.getComplaintById(initialId);
      if (found) return found;
    }
    return complaintService.getComplaintById('SC-2026-0001') || null;
  });
  const [searched, setSearched] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [reopenNote, setReopenNote] = useState('');
  const [showReopenModal, setShowReopenModal] = useState(false);

  useEffect(() => {
    const targetId = getTargetId();
    if (targetId) {
      setQuery(targetId);
      const found = complaintService.getComplaintById(targetId);
      if (found) {
        setComplaint(found);
        setNotFound(false);
      } else {
        setComplaint(null);
        setNotFound(true);
      }
    }
  }, [location.pathname, location.search, location.state]);

  const handleSearch = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const idToSearch = customId || query;
    if (!idToSearch.trim()) return;

    setSearched(true);
    const found = complaintService.getComplaintById(idToSearch.trim());
    if (found) {
      setComplaint(found);
      setNotFound(false);
    } else {
      setComplaint(null);
      setNotFound(true);
    }
  };

  const handleReopenSubmit = () => {
    if (!complaint || !reopenNote.trim()) return;
    const res = complaintService.updateComplaintStatus(
      complaint.id,
      'reopened',
      reopenNote.trim(),
      { name: user?.name || 'Citizen User', role: user?.role || 'citizen', id: user?.id || 'usr-guest' }
    );
    if (res.success && res.complaint) {
      setComplaint(res.complaint);
      setShowReopenModal(false);
      setReopenNote('');
      alert(`Complaint #${complaint.id} has been marked as REOPENED for officer re-inspection.`);
    }
  };

  // Determine stage in standard lifecycle: Submitted -> Acknowledged -> In Progress -> Resolved
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'submitted':
        return 0;
      case 'under_review':
      case 'assigned':
        return 1;
      case 'in_progress':
        return 2;
      case 'resolved':
        return 3;
      case 'reopened':
        return 2;
      case 'rejected':
        return 1;
      default:
        return 0;
    }
  };

  const activeStage = complaint ? getStageIndex(complaint.status) : 0;
  const stages = [
    { title: 'Submitted', desc: 'Complaint logged in portal' },
    { title: 'Acknowledged', desc: 'Department & officer assigned' },
    { title: 'In Progress', desc: 'Field crew dispatched' },
    { title: 'Resolved', desc: 'Work verified & closed' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F9D91] bg-[#E6F6F5] px-3 py-1 rounded-full">
            Citizen Transparency Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#142B4A] mt-2.5">
            Track Your Complaint
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Follow the real-time progress and official resolution history of your civic complaints.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="card-base p-5 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Complaint Reference ID (e.g. SC-2026-0001)..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="input-base text-xs sm:text-sm py-2.5 pl-10 pr-4"
              />
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              className="btn-primary shrink-0"
            >
              <span>Search Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo ID chips */}
          <div className="flex items-center gap-2 flex-wrap mt-4 text-xs text-[#667085] pt-3 border-t border-[#E4E7EC]">
            <span className="font-semibold text-[#1D2939]">Example Reference IDs:</span>
            {['SC-2026-0001', 'SC-2026-0002', 'SC-2026-0003', 'SC-2026-0004'].map(id => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setQuery(id);
                  handleSearch(undefined, id);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F5F7FA] hover:bg-[#E6F6F5] text-[#1D2939] hover:text-[#0F9D91] border border-[#E4E7EC] text-[11px] font-semibold transition-colors"
              >
                #{id}
              </button>
            ))}
          </div>
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="card-base p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-[#FDE8E8] text-[#D64545] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✕
            </div>
            <h3 className="font-bold text-[#142B4A] text-base">No Complaint Found for "{query}"</h3>
            <p className="text-xs text-[#667085] max-w-md mx-auto">
              Please double check the reference ID format (SC-2026-XXXX) or click one of the example test buttons above.
            </p>
          </div>
        )}

        {/* Complaint Found Result */}
        {complaint && (
          <div className="space-y-6">
            {/* Progress Stepper Tracker: Horizontal on Desktop, Vertical on Mobile */}
            <div className="card-base p-6">
              <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-6">
                Resolution Lifecycle Progress
              </h3>

              {/* Desktop Stepper */}
              <div className="hidden sm:grid sm:grid-cols-4 gap-4 relative">
                {stages.map((stage, idx) => {
                  const isDone = idx <= activeStage;
                  const isCurrent = idx === activeStage;
                  return (
                    <div key={idx} className="relative text-center space-y-2">
                      {/* Connector Line */}
                      {idx < stages.length - 1 && (
                        <div
                          className={`absolute top-4 left-1/2 w-full h-0.5 ${
                            idx < activeStage ? 'bg-[#0F9D91]' : 'bg-[#E4E7EC]'
                          }`}
                          style={{ zIndex: 1 }}
                        />
                      )}

                      {/* Step Circle */}
                      <div
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mx-auto transition-colors ${
                          isDone
                            ? 'bg-[#0F9D91] text-white shadow-xs'
                            : 'bg-white border-2 border-[#E4E7EC] text-[#667085]'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div className="space-y-0.5">
                        <p
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-[#0F9D91]'
                              : isDone
                              ? 'text-[#142B4A]'
                              : 'text-[#667085]'
                          }`}
                        >
                          {stage.title}
                        </p>
                        <p className="text-[11px] text-[#667085] leading-tight">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Stepper */}
              <div className="sm:hidden space-y-4 relative pl-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E7EC]">
                {stages.map((stage, idx) => {
                  const isDone = idx <= activeStage;
                  return (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone ? 'bg-[#0F9D91] text-white' : 'bg-white border-2 border-[#E4E7EC] text-[#667085]'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isDone ? 'text-[#142B4A]' : 'text-[#667085]'}`}>
                          {stage.title}
                        </p>
                        <p className="text-[11px] text-[#667085]">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Complaint Details Card */}
            <div className="card-base p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EC] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#142B4A]">
                    #{complaint.id}
                  </span>
                  <StatusBadge status={complaint.status} />
                  <PriorityBadge priority={complaint.priority} />
                </div>

                <div className="text-xs text-[#667085] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#667085]" />
                  <span>
                    Reported on {new Date(complaint.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#142B4A]">{complaint.title}</h2>
                <div className="text-xs sm:text-sm text-[#1D2939] mt-2.5 leading-relaxed bg-[#F5F7FA] p-4 rounded-xl border border-[#E4E7EC]">
                  {complaint.description}
                </div>
              </div>

              {/* Grid Info Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 text-xs">
                <div>
                  <span className="text-[#667085] block mb-0.5">Category</span>
                  <span className="font-semibold text-[#142B4A] uppercase">{complaint.category}</span>
                </div>
                <div>
                  <span className="text-[#667085] block mb-0.5">Assigned Department</span>
                  <span className="font-semibold text-[#142B4A]">{complaint.assignedDepartment}</span>
                </div>
                <div>
                  <span className="text-[#667085] block mb-0.5">Officer in Charge</span>
                  <span className="font-semibold text-[#142B4A]">{complaint.assignedOfficerName || 'Under Assignment'}</span>
                </div>
                <div>
                  <span className="text-[#667085] block mb-0.5">SLA Target</span>
                  <span className="font-semibold text-[#0F9D91]">{complaint.slaHours} Hours</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between flex-wrap gap-2 text-xs text-[#667085]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0F9D91]" />
                  <span>{complaint.address}, <strong>{complaint.area}</strong></span>
                </div>

                {complaint.status === 'resolved' && (
                  <button
                    onClick={() => setShowReopenModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-[#FCE7C5] bg-[#FEF7EC] hover:bg-[#FDE68A] text-[#B7791F] font-semibold text-xs transition-colors"
                  >
                    Request Review / Reopen Ticket
                  </button>
                )}
              </div>
            </div>

            {/* Photo Evidence Preview if available */}
            {complaint.photoUrl && (
              <div className="card-base p-5 space-y-2">
                <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                  Attached Photographic Evidence
                </h4>
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC] max-w-sm">
                  <img src={complaint.photoUrl} alt="Complaint evidence" className="w-full h-48 object-cover" />
                </div>
              </div>
            )}

            {/* Chronological Audit Timeline */}
            <div className="card-base p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
                <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                  Chronological Status &amp; Audit Timeline
                </h3>
                <span className="text-xs text-[#667085] font-medium">
                  {complaint.timeline.length} Status Events
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E7EC]">
                {complaint.timeline.map((entry, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-[#0F9D91] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                      ✓
                    </div>

                    <div className="bg-[#F5F7FA] border border-[#E4E7EC] rounded-xl p-4 text-xs space-y-1.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-[#142B4A] uppercase tracking-wide">
                          {entry.status.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] text-[#667085]">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <p className="text-[#1D2939] leading-relaxed font-normal">
                        {entry.remark}
                      </p>

                      <div className="text-[11px] text-[#667085] font-medium pt-1 border-t border-[#E4E7EC]">
                        Recorded by: <strong>{entry.updatedBy}</strong> ({entry.role.toUpperCase()})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Reopen Modal */}
      {showReopenModal && (
        <div className="fixed inset-0 z-50 bg-[#142B4A]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-modal border border-[#E4E7EC] space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Request Reopening Ticket</h3>
            <p className="text-xs text-[#667085]">
              If the completed work was unsatisfactory or the civic issue persists, provide a detailed description for municipal review:
            </p>
            <textarea
              rows={3}
              placeholder="State reason for reopening ticket..."
              value={reopenNote}
              onChange={e => setReopenNote(e.target.value)}
              className="input-base text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowReopenModal(false)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleReopenSubmit}
                disabled={!reopenNote.trim()}
                className="btn-primary text-xs"
              >
                Submit Reopen Request
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingChatbot />
    </div>
  );
};
