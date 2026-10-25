import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { Link, useNavigate } from '../../router';
import { Search, Filter, Plus, MapPin, Calendar, Clock, FileText } from '../../components/common/Icons';

export const CitizenComplaintsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'my' | 'city'>('my');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const allComplaints = complaintService.getComplaints();
  const myComplaints = allComplaints.filter(c => 
    user ? (c.citizenId === user.id || c.citizenEmail?.toLowerCase() === user.email?.toLowerCase()) : false
  );

  const activeList = viewMode === 'my' ? myComplaints : allComplaints;

  const filtered = activeList.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.area.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Citizen Portal', href: '/citizen/dashboard' },
        { label: 'My Complaints' }
      ]}
      title="Civic Complaints Registry"
      subtitle={user ? `Manage your submitted reports or monitor citywide municipal issues (${user.name})` : 'Track submitted civic issues and citywide reports'}
      actionButton={
        <Link
          to="/complaints/new"
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          <span>New Complaint</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* View Scope Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#E4E7EC] pb-3">
          <div className="flex bg-[#F5F7FA] p-1 rounded-xl text-xs font-semibold border border-[#E4E7EC]">
            <button
              onClick={() => setViewMode('my')}
              className={`py-1.5 px-3.5 rounded-lg transition-all ${
                viewMode === 'my'
                  ? 'bg-white text-[#0F9D91] shadow-xs font-bold border border-[#E4E7EC]'
                  : 'text-[#667085] hover:text-[#1D2939]'
              }`}
            >
              My Complaints ({myComplaints.length})
            </button>
            <button
              onClick={() => setViewMode('city')}
              className={`py-1.5 px-3.5 rounded-lg transition-all ${
                viewMode === 'city'
                  ? 'bg-white text-[#142B4A] shadow-xs font-bold border border-[#E4E7EC]'
                  : 'text-[#667085] hover:text-[#1D2939]'
              }`}
            >
              All Citywide Public Reports ({allComplaints.length})
            </button>
          </div>

          <span className="text-xs text-[#667085]">
            Showing <strong>{filtered.length}</strong> {viewMode === 'my' ? 'personal' : 'citywide'} reports
          </span>
        </div>

        {/* Filters & Search Bar */}
        <div className="card-base p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by ID, title, or area..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-base text-xs py-2 pl-9 pr-3"
            />
            <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#667085]">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white"
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

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#667085]">
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="input-base text-xs py-1.5 px-2 bg-white"
              >
                <option value="all">All Categories</option>
                <option value="roads">Road Damage</option>
                <option value="garbage">Garbage / Waste</option>
                <option value="water">Water Supply</option>
                <option value="drainage">Drainage</option>
                <option value="streetlights">Streetlights</option>
                <option value="traffic">Traffic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Listing */}
        {filtered.length === 0 ? (
          <div className="card-base p-12 text-center text-[#667085] space-y-4">
            <FileText className="w-12 h-12 text-[#98A2B3] mx-auto" />
            <h3 className="text-base font-bold text-[#142B4A]">
              {viewMode === 'my' ? 'No Complaints Found for Your Account' : 'No Complaints Match Filters'}
            </h3>
            <p className="text-xs text-[#667085] max-w-md mx-auto leading-relaxed">
              {viewMode === 'my'
                ? user
                  ? `You have not submitted any complaints yet under ${user.email}. Click "New Complaint" to file a civic issue in your area.`
                  : 'You are currently viewing as a guest. Sign in or register to submit and track your complaints.'
                : 'Try adjusting your search query or reset status/category filters to view all city records.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/complaints/new" className="btn-primary text-xs inline-flex">
                <Plus className="w-4 h-4" />
                <span>Register a Complaint</span>
              </Link>
              {viewMode === 'my' && (
                <button
                  onClick={() => setViewMode('city')}
                  className="btn-secondary text-xs"
                >
                  Browse Citywide Reports ({allComplaints.length})
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => navigate(`/complaints/${c.id}`)}
                className="card-base p-5 hover:shadow-hover transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#142B4A] group-hover:text-[#0F9D91] transition-colors">
                      #{c.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={c.status} size="sm" />
                      <PriorityBadge priority={c.priority} size="sm" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1D2939] text-sm line-clamp-1">{c.title}</h3>
                    <p className="text-xs text-[#667085] mt-1 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E4E7EC] space-y-1.5 text-[11px] text-[#667085]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[#1D2939] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#0F9D91]" />
                        <span>{c.area}</span>
                      </span>
                      <span className="text-[#0F9D91] font-semibold">{c.assignedDepartment}</span>
                    </div>

                    <div className="flex items-center justify-between text-[#667085]">
                      <span>Reported: {new Date(c.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>Target SLA: {c.slaHours}h</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4E7EC] flex items-center justify-end text-xs font-semibold text-[#0F9D91] group-hover:underline">
                  View Full Timeline →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
