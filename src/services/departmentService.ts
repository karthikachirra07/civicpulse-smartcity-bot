import { Department } from '../types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-roads',
    name: 'Roads & Public Infrastructure',
    code: 'RBD',
    categoryKey: 'roads',
    headName: 'Sri N. Venkateshwarlu (Chief Engineer)',
    email: 'roads.dept@smartcity.gov.in',
    phone: '+91 040-23451001',
    activeComplaints: 28,
    resolvedComplaints: 342,
    slaHoursTarget: 24,
    slaComplianceRate: 94.2
  },
  {
    id: 'dept-garbage',
    name: 'Solid Waste & Swachh City Cell',
    code: 'SWM',
    categoryKey: 'garbage',
    headName: 'Smt. K. Anitha (Additional Commissioner)',
    email: 'waste.management@smartcity.gov.in',
    phone: '+91 040-23451002',
    activeComplaints: 34,
    resolvedComplaints: 489,
    slaHoursTarget: 24,
    slaComplianceRate: 91.5
  },
  {
    id: 'dept-water',
    name: 'Water Supply & Sewerage Board (HMWSSB)',
    code: 'HMWSSB',
    categoryKey: 'water',
    headName: 'Eng. K. Srinivas (Executive Director)',
    email: 'watersupply@smartcity.gov.in',
    phone: '+91 040-23451003',
    activeComplaints: 19,
    resolvedComplaints: 280,
    slaHoursTarget: 12,
    slaComplianceRate: 96.0
  },
  {
    id: 'dept-drainage',
    name: 'Drainage & Stormwater Drainage',
    code: 'SWD',
    categoryKey: 'drainage',
    headName: 'Sri B. Ravi Kumar (Superintending Engineer)',
    email: 'drainage@smartcity.gov.in',
    phone: '+91 040-23451004',
    activeComplaints: 15,
    resolvedComplaints: 195,
    slaHoursTarget: 18,
    slaComplianceRate: 88.4
  },
  {
    id: 'dept-electrical',
    name: 'Smart Streetlights & Electrical Services',
    code: 'ELEC',
    categoryKey: 'streetlights',
    headName: 'Eng. M. Narsing Rao (Divisional Engineer)',
    email: 'streetlights@smartcity.gov.in',
    phone: '+91 040-23451005',
    activeComplaints: 12,
    resolvedComplaints: 310,
    slaHoursTarget: 12,
    slaComplianceRate: 97.8
  },
  {
    id: 'dept-sanitation',
    name: 'Sanitation & Public Health Inspection',
    code: 'HLTH',
    categoryKey: 'sanitation',
    headName: 'Dr. Swathi Reddy (Chief Health Officer)',
    email: 'sanitation@smartcity.gov.in',
    phone: '+91 040-23451006',
    activeComplaints: 22,
    resolvedComplaints: 260,
    slaHoursTarget: 24,
    slaComplianceRate: 93.0
  },
  {
    id: 'dept-traffic',
    name: 'Smart Traffic & Transit Signals',
    code: 'TRF',
    categoryKey: 'traffic',
    headName: 'Sri P. Sudhakar (Deputy Commissioner Traffic)',
    email: 'traffic.signals@smartcity.gov.in',
    phone: '+91 040-23451007',
    activeComplaints: 8,
    resolvedComplaints: 145,
    slaHoursTarget: 12,
    slaComplianceRate: 95.5
  }
];

const DEPT_STORAGE_KEY = 'smartcity_departments';

export const departmentService = {
  getDepartments: (): Department[] => {
    try {
      const stored = localStorage.getItem(DEPT_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(DEPT_STORAGE_KEY, JSON.stringify(INITIAL_DEPARTMENTS));
    return INITIAL_DEPARTMENTS;
  },

  getDepartmentByName: (name: string): Department | undefined => {
    const list = departmentService.getDepartments();
    return list.find(d => d.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(d.code.toLowerCase()));
  },

  updateDepartment: (id: string, updates: Partial<Department>): Department[] => {
    const list = departmentService.getDepartments();
    const updated = list.map(d => d.id === id ? { ...d, ...updates } : d);
    localStorage.setItem(DEPT_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
