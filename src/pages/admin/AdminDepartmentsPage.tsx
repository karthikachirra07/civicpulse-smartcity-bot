import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { departmentService } from '../../services/departmentService';
import { Department } from '../../types';
import { Building2, Phone, Mail, Clock, Check, Users } from '../../components/common/Icons';

export const AdminDepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(() => departmentService.getDepartments());
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [newSlaTarget, setNewSlaTarget] = useState(24);
  const [newHead, setNewHead] = useState('');

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    setNewSlaTarget(dept.slaHoursTarget);
    setNewHead(dept.headName);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;

    const updated = departmentService.updateDepartment(editingDept.id, {
      slaHoursTarget: newSlaTarget,
      headName: newHead
    });

    setDepartments(updated);
    setEditingDept(null);
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'CivicPulse', href: '/' },
        { label: 'Administration', href: '/admin/dashboard' },
        { label: 'Departments & SLA' }
      ]}
      title="Municipal Departments &amp; SLA Benchmarks"
      subtitle="Configure target SLA resolution benchmarks, departmental leadership, and service metrics"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-base p-5">
            <span className="text-[11px] font-semibold uppercase text-[#667085] block mb-1">Active Departments</span>
            <span className="text-2xl font-bold text-[#142B4A]">{departments.length} Units</span>
            <p className="text-xs text-[#667085] mt-1">Covering 7 core civic sectors</p>
          </div>
          <div className="card-base p-5 border-l-4 border-l-[#0F9D91]">
            <span className="text-[11px] font-semibold uppercase text-[#667085] block mb-1">Average SLA Target</span>
            <span className="text-2xl font-bold text-[#0F9D91]">17.1 Hours</span>
            <p className="text-xs text-[#667085] mt-1">Cross-department mean benchmark</p>
          </div>
          <div className="card-base p-5 border-l-4 border-l-[#16865C]">
            <span className="text-[11px] font-semibold uppercase text-[#667085] block mb-1">Mean SLA Compliance</span>
            <span className="text-2xl font-bold text-[#16865C]">93.8%</span>
            <p className="text-xs text-[#667085] mt-1">All units operating above 88% target</p>
          </div>
        </div>

        {/* Departments Table */}
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1D2939]">
              <thead className="bg-[#F5F7FA] text-[11px] uppercase tracking-wider text-[#667085] border-b border-[#E4E7EC]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Department Name</th>
                  <th className="py-3 px-4 font-semibold">Code</th>
                  <th className="py-3 px-4 font-semibold">Supervising Official</th>
                  <th className="py-3 px-4 font-semibold">Active Cases</th>
                  <th className="py-3 px-4 font-semibold">SLA Target</th>
                  <th className="py-3 px-4 font-semibold">Compliance Rate</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {departments.map(d => (
                  <tr key={d.id} className="hover:bg-[#F5F7FA] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#142B4A] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#0F9D91]" />
                      <span>{d.name}</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#667085]">
                      <span className="px-2 py-0.5 rounded bg-[#F5F7FA] border border-[#E4E7EC] text-[10px]">
                        {d.code}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#1D2939] block">{d.headName}</span>
                      <span className="text-[11px] text-[#667085]">{d.phone}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#142B4A]">{d.activeComplaints}</span>
                      <span className="text-[11px] text-[#667085] block">{d.resolvedComplaints} resolved</span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#0F9D91]">
                      {d.slaHoursTarget} Hours
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`font-semibold ${d.slaComplianceRate >= 92 ? 'text-[#16865C]' : 'text-[#B7791F]'}`}>
                        {d.slaComplianceRate}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="btn-secondary text-xs py-1 px-2.5"
                      >
                        Configure SLA →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Department Modal */}
      {editingDept && (
        <div className="fixed inset-0 z-50 bg-[#142B4A]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-modal border border-[#E4E7EC] space-y-4">
            <h3 className="text-base font-bold text-[#142B4A]">Configure {editingDept.name}</h3>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Department Head / Director
                </label>
                <input
                  type="text"
                  value={newHead}
                  onChange={e => setNewHead(e.target.value)}
                  className="input-base text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D2939] mb-1">
                  Target SLA Benchmark (Hours)
                </label>
                <input
                  type="number"
                  min="4"
                  max="72"
                  value={newSlaTarget}
                  onChange={e => setNewSlaTarget(parseInt(e.target.value, 10))}
                  className="input-base text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingDept(null)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
