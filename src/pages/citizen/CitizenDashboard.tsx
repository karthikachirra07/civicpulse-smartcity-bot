import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { StatusDonutChart } from '../../components/common/Charts';
import { Link, useNavigate } from '../../router';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Bot,
  Search,
  ArrowRight,
  MapPin,
  Calendar,
  Filter
} from '../../components/common/Icons';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [scope, setScope] = useState<'my' | 'city'>('my');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const allComplaints = complaintService.getComplaints();
  const citizenComplaints = allComplaints.filter(
    c => user ? (c.citizenId === user.id || c.citizenEmail?.toLowerCase() === user.email?.toLowerCase()) : false
  );

  const displayComplaints = scope === 'my' ? citizenComplaints : allComplaints;

  const total = displayComplaints.length;
  const pending = displayComplaints.filter(c => c.status === 'submitted' || c.status === 'under_review').length;
  const inProgress = displayComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length;
  const resolved = displayComplaints.filter(c => c.status === 'resolved').length;

  const filteredComplaints = displayComplaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'pending'
        ? c.status === 'submitted' || c.status === 'under_review'
        : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const chartData = [
    { status: 'Pending', count: pending, color: '#B7791F' },
    { status: 'In Progress', count: inProgress, color: '#0F9D91' },
    { status: 'Resolved', count: resolved, color: '#16865C' },
    {
      status: 'Other',
      count: displayComplaints.filter(c => c.status === 'reopened' || c.status === 'rejected').length,
      color: '#667085'
    }
  ];

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Citizen Portal', href: '/citizen/dashboard' },
        { label: 'Overview' }
      ]}
      title={`Welcome back, ${user ? user.name : 'Citizen'}`}
      subtitle={`Today is ${currentDateFormatted} • Monitor your civic grievances, track municipal SLA compliance, and report new issues.`}
      actionButton={
        <Link
          to="/complaints/new"
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          <span>Register Complaint</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Scope Tabs Toggle */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex bg-[#F5F7FA] p-1 rounded-xl text-xs font-semibold border border-[#E4E7EC]">
            <button
              onClick={() => setScope('my')}
              className={`py-1.5 px-3.5 rounded-lg transition-all ${
                scope === 'my'
                  ? 'bg-white text-[#0F9D91] shadow-xs font-bold border border-[#E4E7EC]'
                  : 'text-[#667085] hover:text-[#1D2939]'
              }`}
            >
              My Filed Complaints ({citizenComplaints.length})
            </button>
            <button
              onClick={() => setScope('city')}
              className={`py-1.5 px-3.5 rounded-lg transition-all ${
                scope === 'city'
                  ? 'bg-white text-[#142B4A] shadow-xs font-bold border border-[#E4E7EC]'
                  : 'text-[#667085] hover:text-[#1D2939]'
              }`}
            >
              All Citywide Complaints ({allComplaints.length})
            </button>
          </div>

          <span className="text-xs text-[#667085]">
            Viewing <strong>{scope === 'my' ? 'Personal Account' : 'Citywide Public'}</strong> Records
          </span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Complaints */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Complaints</span>
              <FileText className="w-4 h-4 text-[#142B4A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#142B4A]">{total}</div>
            <span className="text-[11px] text-[#667085]">
              {scope === 'my' ? 'Under your account' : 'Across Greater Hyderabad'}
            </span>
          </div>

          {/* Pending */}
          <div className="card-base p-5 border-l-4 border-l-[#B7791F]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
              <Clock className="w-4 h-4 text-[#B7791F]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#B7791F]">{pending}</div>
            <span className="text-[11px] text-[#667085]">Awaiting officer review</span>
          </div>

          {/* In Progress */}
          <div className="card-base p-5 border-l-4 border-l-[#0F9D91]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D91] animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0F9D91]">{inProgress}</div>
            <span className="text-[11px] text-[#667085]">Field teams deployed</span>
          </div>

          {/* Resolved */}
          <div className="card-base p-5 border-l-4 border-l-[#16865C]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Resolved</span>
              <CheckCircle2 className="w-4 h-4 text-[#16865C]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#16865C]">{resolved}</div>
            <span className="text-[11px] text-[#667085]">Completed &amp; closed</span>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => navigate('/chatbot')}
            className="p-5 rounded-xl border border-[#E4E7EC] bg-white hover:border-[#0F9D91] shadow-xs hover:shadow-md cursor-pointer transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E6F6F5] text-[#0F9D91] flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#142B4A]">Ask CivicPulse AI</h3>
              <p className="text-xs text-[#667085] mt-1">
                Consult regarding sanitation routes, water schedules, or auto-draft a complaint.
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate('/complaints/new')}
            className="p-5 rounded-xl border border-[#E4E7EC] bg-white hover:border-[#0F9D91] shadow-xs hover:shadow-md cursor-pointer transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EEF2F6] text-[#142B4A] flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#142B4A]">Submit New Complaint</h3>
              <p className="text-xs text-[#667085] mt-1">
                Report road potholes, sewage leak, or faulty streetlights with attachments.
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate('/track')}
            className="p-5 rounded-xl border border-[#E4E7EC] bg-white hover:border-[#0F9D91] shadow-xs hover:shadow-md cursor-pointer transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] text-[#667085] flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#142B4A]">Track by Reference ID</h3>
              <p className="text-xs text-[#667085] mt-1">
                Lookup any active ticket to check SLA countdown and field inspection logs.
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Breakdown & Recent Complaints Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Donut Chart */}
          <div className="lg:col-span-1">
            <StatusDonutChart data={chartData} title={scope === 'my' ? 'My Complaints Status' : 'Citywide Status'} />
          </div>

          {/* Recent Complaints Table */}
          <div className="lg:col-span-2 card-base p-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E4E7EC]">
                <div>
                  <h3 className="text-sm font-bold text-[#142B4A]">
                    {scope === 'my' ? 'My Grievances' : 'Citywide Complaints'}
                  </h3>
                  <p className="text-xs text-[#667085]">Review and manage your civic requests</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search title or ID..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="input-base text-xs py-1.5 px-2.5 w-36 sm:w-44"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="input-base text-xs py-1.5 px-2 w-28 bg-white cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Table / List */}
              {filteredComplaints.length === 0 ? (
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-12 h-12 bg-[#F5F7FA] text-[#667085] rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6 text-[#98A2B3]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1D2939]">
                    {scope === 'my' ? 'No Complaints Registered Under Your Account' : 'No Complaints Match Search'}
                  </h4>
                  <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                    {scope === 'my'
                      ? 'Have a pothole, garbage pile, or water leak in your street? Submit a report now to generate your tracking ticket.'
                      : 'Try clearing your search query or status filter.'}
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Link
                      to="/complaints/new"
                      className="btn-primary text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Register Complaint</span>
                    </Link>
                    {scope === 'my' && (
                      <button
                        onClick={() => setScope('city')}
                        className="btn-secondary text-xs"
                      >
                        View City Reports ({allComplaints.length})
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E4E7EC] text-[#667085] font-semibold">
                        <th className="pb-3 pr-4">Ticket</th>
                        <th className="pb-3 pr-4">Category</th>
                        <th className="pb-3 pr-4">Location</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3 pr-4">SLA</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E7EC]">
                      {filteredComplaints.slice(0, 5).map(c => (
                        <tr
                          key={c.id}
                          className="hover:bg-[#F5F7FA] transition-colors cursor-pointer group"
                          onClick={() => navigate(`/complaints/${c.id}`)}
                        >
                          <td className="py-3 pr-4">
                            <span className="font-bold text-[#142B4A] group-hover:text-[#0F9D91]">
                              #{c.id}
                            </span>
                            <div className="font-medium text-[#1D2939] truncate max-w-[180px] sm:max-w-xs">
                              {c.title}
                            </div>
                          </td>
                          <td className="py-3 pr-4 uppercase text-[11px] font-semibold text-[#667085]">
                            {c.category}
                          </td>
                          <td className="py-3 pr-4 text-[#1D2939]">
                            {c.area}
                          </td>
                          <td className="py-3 pr-4">
                            <StatusBadge status={c.status} size="sm" />
                          </td>
                          <td className="py-3 pr-4 text-[#667085] text-[11px]">
                            {c.slaHours}h target
                          </td>
                          <td className="py-3 text-right">
                            <span className="text-[#0F9D91] font-semibold group-hover:underline">
                              Track →
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E4E7EC] flex items-center justify-between text-xs">
              <span className="text-[#667085]">
                Showing {Math.min(filteredComplaints.length, 5)} of {total} records
              </span>
              <Link
                to="/complaints"
                className="text-[#0F9D91] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Complaints Registry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
