import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { complaintService } from '../../services/complaintService';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { useNavigate } from '../../router';
import { Search, Filter, Download, MapPin, AlertTriangle } from '../../components/common/Icons';

export const AdminComplaintsPage: React.FC = () => {
  const navigate = useNavigate();
  const allComplaints = complaintService.getComplaints();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = allComplaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(search.toLowerCase()) ||
      c.area.toLowerCase().includes(search.toLowerCase());

    const matchesDept = deptFilter === 'all' || c.assignedDepartment.toLowerCase().includes(deptFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;

    return matchesSearch && matchesDept && matchesStatus && matchesPriority;
  });

  const handleExportCSV = () => {
    const csv = complaintService.exportToCSV(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `civicpulse_complaints_admin_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Administration', href: '/admin/dashboard' },
        { label: 'Complaints Directory' }
      ]}
      title="All Municipal Complaints Directory"
      subtitle="Complete database of civic incidents across all smart city zones and departments"
      actionButton={
        <button
          onClick={handleExportCSV}
          className="btn-primary text-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export {filtered.length} Records</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="card-base p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by ID, title, citizen, or locality..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-base text-xs sm:text-sm py-2 pl-9 pr-3"
            />
            <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap text-xs">
            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Dept:</span>
              <select
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-36"
              >
                <option value="all">All Departments</option>
                <option value="Roads">Roads &amp; Public Infra</option>
                <option value="Water">Water Supply (HMWSSB)</option>
                <option value="Waste">Solid Waste Management</option>
                <option value="Drainage">Drainage &amp; Sewers</option>
                <option value="Streetlights">Streetlights</option>
                <option value="Traffic">Traffic Signals</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-28"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="reopened">Reopened</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-[#667085]">
              <span>Priority:</span>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white cursor-pointer w-28"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
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
                  <th className="py-3 px-4 font-semibold">Issue Title</th>
                  <th className="py-3 px-4 font-semibold">Citizen</th>
                  <th className="py-3 px-4 font-semibold">Department</th>
                  <th className="py-3 px-4 font-semibold">Priority</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">SLA Health</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#667085]">
                      No complaints match the specified search filters.
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
                          <span className="font-medium text-[#1D2939] block truncate max-w-[140px]">
                            {c.assignedDepartment}
                          </span>
                          <span className="text-[11px] text-[#667085]">
                            {c.assignedOfficerName || 'Unassigned'}
                          </span>
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
                              {c.slaHours}h target
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              navigate(`/officer/complaints/${c.id}`);
                            }}
                            className="btn-secondary text-xs py-1 px-2.5"
                          >
                            Inspect →
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
