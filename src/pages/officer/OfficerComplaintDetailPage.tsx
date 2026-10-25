import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useParams, useNavigate, Link } from '../../router';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { ComplaintStatus, StatusTimelineEntry } from '../../types';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import {
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  Mail,
  MapPin,
  FileText
} from '../../components/common/Icons';

export const OfficerComplaintDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(() => {
    return complaintService.getComplaintById(id || 'SC-2026-0001');
  });

  const [newStatus, setNewStatus] = useState<ComplaintStatus>(complaint?.status || 'in_progress');
  const [remark, setRemark] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState(complaint?.resolutionNotes || '');
  const [isInternal, setIsInternal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!complaint) {
    return (
      <DashboardLayout title="Officer Complaint Processing">
        <div className="card-base p-12 text-center text-[#667085]">
          <FileText className="w-12 h-12 text-[#98A2B3] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#142B4A]">Complaint #{id} Not Found</h2>
          <Link to="/officer/dashboard" className="text-[#0F9D91] underline text-xs font-semibold mt-2 inline-block">
            ← Return to Officer Queue
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = complaintService.updateComplaintStatus(
      complaint.id,
      newStatus,
      remark || `Officer action: Status updated to ${newStatus.replace('_', ' ').toUpperCase()}`,
      { name: user?.name || 'Officer', role: user?.role || 'officer', id: user?.id || 'usr-off-001' },
      {
        assignedOfficerId: user?.id || 'usr-off-001',
        assignedOfficerName: user?.name || 'Officer',
        resolutionNotes: newStatus === 'resolved' ? resolutionNotes : complaint.resolutionNotes,
        isInternal
      }
    );

    if (res.success && res.complaint) {
      setComplaint(res.complaint);
      setActionSuccess(true);
      setRemark('');
      setTimeout(() => setActionSuccess(false), 3000);
    } else {
      setErrorMsg(res.error || 'Status transition rejected.');
    }
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Officer Queue', href: '/officer/dashboard' },
        { label: `#${complaint.id}` }
      ]}
      title={`Process Ticket #${complaint.id}`}
      subtitle={`Officer Workflow Console • Department: ${complaint.assignedDepartment}`}
      actionButton={
        <Link
          to="/officer/dashboard"
          className="btn-secondary text-xs"
        >
          ← Return to Queue
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Audit Trail */}
        <div className="lg:col-span-2 space-y-6">
          {actionSuccess && (
            <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#16865C] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Status updated to {newStatus.toUpperCase().replace('_', ' ')}. Audit entry logged.</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#FECDCA] text-[#D64545] text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Primary Details Card */}
          <div className="card-base p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#142B4A]">#{complaint.id}</span>
                <StatusBadge status={complaint.status} />
                <PriorityBadge priority={complaint.priority} />
              </div>

              <span className="text-xs text-[#667085] font-medium">
                SLA: {complaint.slaHours}h Target
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#142B4A]">{complaint.title}</h2>
              <div className="text-xs text-[#1D2939] mt-2 leading-relaxed bg-[#F5F7FA] p-4 rounded-xl border border-[#E4E7EC]">
                {complaint.description}
              </div>
            </div>

            {/* Citizen Details (Authorized View) */}
            <div className="bg-[#F5F7FA] border border-[#E4E7EC] rounded-xl p-4 text-xs space-y-2">
              <div className="font-semibold text-[#142B4A] uppercase tracking-wider text-[11px] mb-1">
                Citizen Contact Verification (Authorized Access)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-1.5 text-[#1D2939]">
                  <User className="w-3.5 h-3.5 text-[#667085]" />
                  <span>{complaint.citizenName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1D2939]">
                  <Phone className="w-3.5 h-3.5 text-[#667085]" />
                  <span>{complaint.citizenPhone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1D2939]">
                  <Mail className="w-3.5 h-3.5 text-[#667085]" />
                  <span>{complaint.citizenEmail}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#667085] pt-2">
              <MapPin className="w-4 h-4 text-[#0F9D91]" />
              <span>Location: <strong>{complaint.address}</strong>, {complaint.area} ({complaint.ward})</span>
            </div>
          </div>

          {/* Photo Evidence */}
          {complaint.photoUrl && (
            <div className="card-base p-5 space-y-2">
              <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                Photo Evidence Attached by Citizen
              </h4>
              <div className="rounded-xl overflow-hidden border border-[#E4E7EC] max-w-sm">
                <img src={complaint.photoUrl} alt="Complaint preview" className="w-full h-44 object-cover" />
              </div>
            </div>
          )}

          {/* Audit Trail */}
          <div className="card-base p-6 space-y-4">
            <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider border-b border-[#E4E7EC] pb-2">
              Timeline Audit Log
            </h3>
            <div className="space-y-3">
              {complaint.timeline.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#F5F7FA] border border-[#E4E7EC] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#142B4A] uppercase">{item.status.replace('_', ' ')}</span>
                    <span className="text-[#667085]">{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-[#1D2939]">{item.remark}</p>
                  <p className="text-[10px] text-[#667085]">
                    Recorded by: <strong>{item.updatedBy}</strong> ({item.role.toUpperCase()}){' '}
                    {item.isInternal && <span className="text-[#B7791F] font-bold">[INTERNAL NOTE]</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Officer Action Form */}
        <div className="space-y-6">
          <div className="card-base p-6 space-y-4">
            <div className="border-b border-[#E4E7EC] pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F9D91]">Action Console</span>
              <h3 className="text-sm font-bold text-[#142B4A]">Update Status &amp; Dispatch</h3>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ComplaintStatus)}
                  className="input-base text-xs font-semibold py-2 px-3 bg-white cursor-pointer"
                >
                  <option value="under_review">Under Review</option>
                  <option value="assigned">Assigned to Field Team</option>
                  <option value="in_progress">In Progress (Work Underway)</option>
                  <option value="resolved">Resolved (Completed &amp; Verified)</option>
                  <option value="rejected">Rejected (Invalid / Duplicate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Officer Remark / Action Note *
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Field inspection completed. Excavator engaged for repair."
                  value={remark}
                  onChange={e => setRemark(e.target.value)}
                  className="input-base text-xs py-2 px-3"
                  required
                />
              </div>

              {newStatus === 'resolved' && (
                <div>
                  <label className="block text-xs font-bold text-[#1D2939] mb-1">
                    Formal Resolution Summary (Visible to Citizen) *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe completed work e.g. Ruptured pipe section replaced and pressure tested."
                    value={resolutionNotes}
                    onChange={e => setResolutionNotes(e.target.value)}
                    className="input-base text-xs py-2 px-3"
                    required
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="internalNote"
                  checked={isInternal}
                  onChange={e => setIsInternal(e.target.checked)}
                  className="rounded text-[#0F9D91] focus:ring-[#0F9D91]"
                />
                <label htmlFor="internalNote" className="text-xs text-[#667085]">
                  Mark as Internal Municipal Note (Not sent in citizen SMS)
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-xs py-2.5"
              >
                Publish Officer Action &amp; Notify
              </button>
            </form>
          </div>

          {/* Assigned Officer Badge */}
          <div className="p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E7EC] text-xs space-y-2">
            <span className="font-semibold text-[#142B4A] block text-[11px] uppercase tracking-wide">
              Authenticated Officer Profile
            </span>
            <p className="text-[#667085]">Officer: <strong className="text-[#1D2939]">{user.name}</strong></p>
            <p className="text-[#667085]">Department: <strong className="text-[#1D2939]">{user.department || 'Roads & Works'}</strong></p>
            <p className="text-[10px] text-[#667085] pt-1 border-t border-[#E4E7EC]">
              All status changes and notes are logged with permanent audit timestamps.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
