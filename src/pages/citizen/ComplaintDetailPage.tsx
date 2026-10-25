import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useParams, useNavigate, Link } from '../../router';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText
} from '../../components/common/Icons';

export const ComplaintDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(() => {
    return complaintService.getComplaintById(id || 'SC-2026-0001');
  });

  const [reopenNote, setReopenNote] = useState('');
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!complaint) {
    return (
      <DashboardLayout title="Complaint Details">
        <div className="card-base p-12 text-center text-[#667085] space-y-4">
          <FileText className="w-12 h-12 text-[#98A2B3] mx-auto" />
          <h2 className="text-lg font-bold text-[#142B4A]">Complaint Not Found</h2>
          <p className="text-xs text-[#667085]">
            No record found matching #{id}. Please verify the reference ID.
          </p>
          <Link to="/complaints" className="btn-primary text-xs inline-flex">
            Back to Complaints
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleReopen = () => {
    if (!reopenNote.trim()) return;
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
      alert(`Ticket #${complaint.id} has been marked as Reopened.`);
    }
  };

  const handleFeedback = (stars: number) => {
    setFeedbackRating(stars);
    setFeedbackSubmitted(true);
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Citizen Portal', href: '/citizen/dashboard' },
        { label: 'My Complaints', href: '/complaints' },
        { label: `#${complaint.id}` }
      ]}
      title={`Complaint #${complaint.id}`}
      subtitle={`Detailed tracking view • ${complaint.assignedDepartment}`}
      actionButton={
        <Link
          to="/complaints"
          className="btn-secondary text-xs"
        >
          ← Back to List
        </Link>
      }
    >
      <div className="max-w-4xl space-y-6">
        {/* Main Status Banner */}
        <div className="card-base p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EC] pb-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-bold text-lg text-[#142B4A]">#{complaint.id}</span>
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>

            <div className="text-xs text-[#667085] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#667085]" />
              <span>Target SLA: <strong className="text-[#0F9D91]">{complaint.slaHours} Hours</strong></span>
            </div>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#142B4A]">{complaint.title}</h2>
            <div className="text-xs sm:text-sm text-[#1D2939] mt-2.5 leading-relaxed bg-[#F5F7FA] p-4 rounded-xl border border-[#E4E7EC]">
              {complaint.description}
            </div>
          </div>

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
              <span className="font-semibold text-[#142B4A]">{complaint.assignedOfficerName || 'Under Review'}</span>
            </div>
            <div>
              <span className="text-[#667085] block mb-0.5">Submission Date</span>
              <span className="font-medium text-[#1D2939]">
                {new Date(complaint.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-between flex-wrap gap-2 text-xs text-[#667085]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0F9D91]" />
              <span>{complaint.address}, <strong>{complaint.area}</strong></span>
              {complaint.coordinates && (
                <span className="text-[11px] text-[#0F9D91] font-semibold ml-2">
                  (📍 {complaint.coordinates.lat.toFixed(4)}, {complaint.coordinates.lng.toFixed(4)})
                </span>
              )}
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

        {/* Evidence Photo */}
        {complaint.photoUrl && (
          <div className="card-base p-5 space-y-2">
            <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              Photographic Evidence
            </h4>
            <div className="rounded-xl overflow-hidden border border-[#E4E7EC] max-w-sm">
              <img src={complaint.photoUrl} alt="Complaint preview" className="w-full h-48 object-cover" />
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
              {complaint.timeline.length} Recorded Steps
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
                    Action recorded by: <strong>{entry.updatedBy}</strong> ({entry.role.toUpperCase()})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Citizen Satisfaction Feedback Rating */}
        {complaint.status === 'resolved' && (
          <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-2xl p-6 text-center space-y-3">
            <h4 className="text-sm font-bold text-[#16865C]">
              Citizen Resolution Feedback
            </h4>
            <p className="text-xs text-[#667085] max-w-md mx-auto">
              How satisfied are you with the municipal response time and quality of work completed?
            </p>
            {feedbackSubmitted ? (
              <div className="text-xs font-semibold text-[#16865C] bg-white inline-block px-4 py-2 rounded-xl border border-[#C8E6C9]">
                ★ Thank you! You rated {feedbackRating} / 5 stars. Feedback logged to municipal CSAT metrics.
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleFeedback(star)}
                    className="w-9 h-9 rounded-xl bg-white border border-[#C8E6C9] hover:bg-[#16865C] hover:text-white font-bold text-[#16865C] transition-colors shadow-xs text-sm"
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reopen Modal */}
      {showReopenModal && (
        <div className="fixed inset-0 z-50 bg-[#142B4A]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-modal border border-[#E4E7EC] space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Request Reopening Ticket</h3>
            <p className="text-xs text-[#667085]">
              Provide specific observations why the issue was not adequately resolved:
            </p>
            <textarea
              rows={3}
              placeholder="State reasons for reopening..."
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
                onClick={handleReopen}
                disabled={!reopenNote.trim()}
                className="btn-primary text-xs"
              >
                Confirm Reopen
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
