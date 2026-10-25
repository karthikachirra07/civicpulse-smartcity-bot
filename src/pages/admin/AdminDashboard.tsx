import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { complaintService } from '../../services/complaintService';
import { departmentService } from '../../services/departmentService';
import { authService } from '../../services/authService';
import {
  CategoryBarChart,
  MonthlyTrendChart,
  StatusDonutChart,
  AreaVolumeChart
} from '../../components/common/Charts';
import { Link } from '../../router';
import {
  Activity,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Building2,
  Users
} from '../../components/common/Icons';

export const AdminDashboard: React.FC = () => {
  const allComplaints = complaintService.getComplaints();
  const departments = departmentService.getDepartments();
  const allUsers = authService.getAllUsers();

  const total = allComplaints.length;
  const openComplaints = allComplaints.filter(c => c.status !== 'resolved' && c.status !== 'rejected').length;
  const pending = allComplaints.filter(c => c.status === 'submitted' || c.status === 'under_review').length;
  const inProgress = allComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length;
  const resolved = allComplaints.filter(c => c.status === 'resolved').length;
  const overdue = allComplaints.filter(c => complaintService.isOverdue(c)).length;

  const handleExportCSV = () => {
    const csvContent = complaintService.exportToCSV(allComplaints);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `civicpulse_complaints_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Category counts
  const categoryData = [
    { category: 'Roads & Potholes', count: allComplaints.filter(c => c.category === 'roads').length, color: '#142B4A' },
    { category: 'Water Supply', count: allComplaints.filter(c => c.category === 'water').length, color: '#0F9D91' },
    { category: 'Waste Management', count: allComplaints.filter(c => c.category === 'garbage').length, color: '#B7791F' },
    { category: 'Drainage & Sewage', count: allComplaints.filter(c => c.category === 'drainage').length, color: '#175CD3' },
    { category: 'Streetlights', count: allComplaints.filter(c => c.category === 'streetlights').length, color: '#16865C' },
    { category: 'Traffic Signals', count: allComplaints.filter(c => c.category === 'traffic').length, color: '#D64545' }
  ];

  // Status Donut
  const statusData = [
    { status: 'Pending Review', count: pending, color: '#B7791F' },
    { status: 'In Progress', count: inProgress, color: '#0F9D91' },
    { status: 'Resolved', count: resolved, color: '#16865C' },
    { status: 'Overdue SLA', count: overdue, color: '#D64545' }
  ];

  // Area volume
  const areaData = [
    { area: 'Hitec City', count: allComplaints.filter(c => c.area === 'Hitec City').length },
    { area: 'Jubilee Hills', count: allComplaints.filter(c => c.area === 'Jubilee Hills').length },
    { area: 'Charminar', count: allComplaints.filter(c => c.area === 'Charminar').length },
    { area: 'Tank Bund', count: allComplaints.filter(c => c.area === 'Tank Bund').length },
    { area: 'Gachibowli', count: allComplaints.filter(c => c.area === 'Gachibowli').length },
    { area: 'Ameerpet', count: allComplaints.filter(c => c.area === 'Ameerpet').length }
  ];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Administration', href: '/admin/dashboard' },
        { label: 'Executive Analytics' }
      ]}
      title="Municipal Command &amp; Executive Analytics"
      subtitle="City-wide civic governance oversight, SLA compliance metrics, and automated department dispatch"
      actionButton={
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="btn-primary text-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card-base p-5">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Total Grievances</span>
              <FileText className="w-4 h-4 text-[#142B4A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#142B4A]">{total}</div>
            <span className="text-[11px] text-[#667085]">Recorded across city</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#B7791F]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Open / Active</span>
              <Clock className="w-4 h-4 text-[#B7791F]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#B7791F]">{openComplaints}</div>
            <span className="text-[11px] text-[#667085]">In queue or field</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#0F9D91]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">In Progress</span>
              <Activity className="w-4 h-4 text-[#0F9D91]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0F9D91]">{inProgress}</div>
            <span className="text-[11px] text-[#667085]">Work actively underway</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#16865C]">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Resolved</span>
              <CheckCircle2 className="w-4 h-4 text-[#16865C]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#16865C]">{resolved}</div>
            <span className="text-[11px] text-[#667085]">Verified and audited</span>
          </div>

          <div className="card-base p-5 border-l-4 border-l-[#142B4A] col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-[#667085] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Registered Users</span>
              <Users className="w-4 h-4 text-[#142B4A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#142B4A]">{allUsers.length}</div>
            <span className="text-[11px] text-[#667085]">Citizens &amp; officers</span>
          </div>
        </div>

        {/* Interactive Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBarChart data={categoryData} title="Complaint Volume by Category" />
          <MonthlyTrendChart title="Monthly Intake &amp; Resolution Trends (2026)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusDonutChart data={statusData} title="City-wide Resolution Status Breakdown" />
          <AreaVolumeChart data={areaData} title="Ward Volume &amp; Incident Density" />
        </div>

        {/* Quick Admin Management Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Link
            to="/admin/complaints"
            className="p-5 card-base hover:border-[#0F9D91] hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-bold text-[#142B4A] block">All Complaints Database</span>
              <span className="text-[11px] text-[#667085]">{total} Total Tickets • Filter, Triage &amp; Export</span>
            </div>
            <FileText className="w-5 h-5 text-[#0F9D91] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/departments"
            className="p-5 card-base hover:border-[#0F9D91] hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-bold text-[#142B4A] block">Municipal Departments</span>
              <span className="text-[11px] text-[#667085]">{departments.length} Units • Configure SLA Hours</span>
            </div>
            <Building2 className="w-5 h-5 text-[#0F9D91] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/users"
            className="p-5 card-base hover:border-[#0F9D91] hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-bold text-[#142B4A] block">User Directory</span>
              <span className="text-[11px] text-[#667085]">{allUsers.length} Citizen &amp; Official Accounts</span>
            </div>
            <Users className="w-5 h-5 text-[#0F9D91] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
