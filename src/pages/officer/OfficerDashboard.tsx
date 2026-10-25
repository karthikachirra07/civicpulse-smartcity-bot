import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { Link, useNavigate } from '../../router';
import {
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  MapPin,
  ArrowRight,
  User,
  ArrowUpDown
} from '../../components/common/Icons';

export const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'priority'>('newest');

  const allComplaints = complaintService.getComplaints();

  // Filter complaints assigned to this officer's department or officer ID
  const officerDept = user?.department || 'Roads & Public Infrastructure';
  const officerComplaints = allComplaints.filter(
    c =>
      c.assignedDepartment.toLowerCase().includes(officerDept.toLowerCase().split(' ')[0]) ||
      (user && c.assignedOfficerId === user.id)
  );

  const displayList = officerComplaints.length > 0 ? officerComplaints : allComplaints;

  const totalAssigned = displayList.length;
  const criticalCount = displayList.filter(c => c.priority === 'critical' || c.priority === 'high').length;
  const overdueCount = displayList.filter(c => complaintService.isOverdue(c)).length;
  const resolvedCount = displayList.filter(c => c.status === 'resolved').length;

  const priorityWeight: { [key: string]: number } = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  const filtered = displayList
    .filter(c => {
      const matchesSearch =
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.area.toLowerCase().includes(search.toLowerCase()) ||
        c.citizenName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
      const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Municipal Operations', href: '/officer/dashboard' },
        { label: 'Complaint Queue' }
      ]}
      title="Municipal Officer Command Queue"
      subtitle={`Department: ${user?.department || 'Roads & Public Infrastructure'} • Officer: ${user?.name || 'Assigned Officer'}`}
    >
      <div className="space-y-6">
        {/* Officer KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-base p-5">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Queue Workload</span>
              <Shield className="w-4 h-4 text-[#142B4A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#142B4A]">{totalAssigned}</div>
            <span className="text-[11px] text-[#667085]">Assigned in department</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#B7791F]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">High / Critical</span>
              <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#B7791F]">{criticalCount}</div>
            <span className="text-[11px] text-[#667085]">Priority field triage</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#D64545]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Overdue SLA</span>
              <Clock className="w-4 h-4 text-[#D64545]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#D64545]">{overdueCount}</div>
            <span className="text-[11px] text-[#667085]">Breached deadline warning</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#16865C]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Resolved</span>
              <CheckCircle2 className="w-4 h-4 text-[#16865C]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#16865C]">{resolvedCount}</div>
            <span className="text-[11px] text-[#667085]">Verified and signed off</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="card-base p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by ticket ID, citizen, or landmark..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
            />
            <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap text-xs">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-28"
              >
                <option value="all">All</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="reopened">Reopened</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-28"
              >
                <option value="all">All</option>
                <option value="roads">Roads</option>
                <option value="water">Water</option>
                <option value="garbage">Waste</option>
                <option value="drainage">Drainage</option>
                <option value="streetlights">Lighting</option>
                <option value="traffic">Traffic</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Priority:</span>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-28"
              >
                <option value="all">All</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'newest' | 'priority')}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-32"
              >
                <option value="newest">Newest First</option>
                <option value="priority">Highest Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1D2939]">
              <thead className="bg-[#F5F7FA] text-[11px] uppercase tracking-wider text-[#667085] border-b border-[#E4E7EC]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Reference ID</th>
                  <th className="py-3 px-4 font-semibold">Title &amp; Locality</th>
                  <th className="py-3 px-4 font-semibold">Citizen</th>
                  <th className="py-3 px-4 font-semibold">Priority</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">SLA Health</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#667085]">
                      No complaints match the specified filter criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map(c => {
                    const isOverdue = complaintService.isOverdue(c);

                    return (
                      <tr
                        key={c.id}
                        onClick={() => navigate(`/officer/complaints/${c.id}`)}
                        className="hover:bg-[#F5F7FA] transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-bold text-[#142B4A]">
                          #{c.id}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-semibold text-[#1D2939] truncate">{c.title}</p>
                          <p className="text-[11px] text-[#667085] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#0F9D91]" />
                            <span>{c.area}</span>
                          </p>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#1D2939] block">{c.citizenName}</span>
                          <span className="text-[11px] text-[#667085]">{c.citizenPhone}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <PriorityBadge priority={c.priority} size="sm" />
                        </td>

                        <td className="py-3.5 px-4">
                          <StatusBadge status={c.status} size="sm" />
                        </td>

                        <td className="py-3.5 px-4">
                          {c.status === 'resolved' ? (
                            <span className="text-[#16865C] font-semibold">Completed</span>
                          ) : isOverdue ? (
                            <span className="text-[#D64545] font-semibold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Overdue</span>
                            </span>
                          ) : (
                            <span className="text-[#667085] font-medium">
                              {c.slaHours}h Target
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/officer/complaints/${c.id}`);
                            }}
                            className="btn-primary text-xs py-1 px-2.5"
                          >
                            Process →
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
