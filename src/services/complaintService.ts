import { Complaint, ComplaintCategory, ComplaintPriority, ComplaintStatus, StatusTimelineEntry, UserRole } from '../types';

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'SC-2026-0001',
    title: 'Major Water Pipeline Burst near Cyber Towers Junction',
    description: 'Drinking water is gushing out on the main road at Cyber Towers junction, causing heavy traffic congestion and continuous water wastage.',
    category: 'water',
    priority: 'critical',
    aiSuggestedPriority: 'critical',
    aiSuggestedCategory: 'water',
    aiSuggestedDepartment: 'Water Supply & Sewerage Board (HMWSSB)',
    status: 'in_progress',
    address: 'Cyber Towers Junction, Hitec City Main Road',
    area: 'Hitec City',
    ward: 'Ward 2 - Serilingampally Zone',
    coordinates: { lat: 17.4504, lng: 78.3808 },
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    citizenId: 'usr-cit-001',
    citizenName: 'Ananya Sharma',
    citizenPhone: '+91 98490 12345',
    citizenEmail: 'ananya.sharma@example.com',
    preferredContact: 'phone',
    assignedDepartment: 'Water Supply & Sewerage Board (HMWSSB)',
    assignedOfficerId: 'usr-off-002',
    assignedOfficerName: 'Eng. K. Srinivas',
    createdAt: '2026-10-12T06:30:00Z',
    updatedAt: '2026-10-12T08:15:00Z',
    slaHours: 6,
    slaDueDate: '2026-10-12T12:30:00Z',
    resolutionNotes: 'Water main isolated. Heavy excavator replacing 300mm ruptured cast iron pipe section.',
    canReopen: false,
    timeline: [
      {
        status: 'submitted',
        timestamp: '2026-10-12T06:30:00Z',
        updatedBy: 'Ananya Sharma',
        role: 'citizen',
        remark: 'Registered via SmartCity AI Chatbot with emergency priority suggestion.'
      },
      {
        status: 'under_review',
        timestamp: '2026-10-12T07:00:00Z',
        updatedBy: 'Control Room Officer',
        role: 'officer',
        remark: 'Verified by central GIS incident desk. Confirmed arterial supply line breach.'
      },
      {
        status: 'assigned',
        timestamp: '2026-10-12T07:20:00Z',
        updatedBy: 'Dr. Radhika Rao',
        role: 'admin',
        remark: 'Assigned to HMWSSB Emergency Rapid Response Team.'
      },
      {
        status: 'in_progress',
        timestamp: '2026-10-12T08:15:00Z',
        updatedBy: 'Eng. K. Srinivas',
        role: 'officer',
        remark: 'Excavation team on-site. Isolation valves engaged. Pipeline patch underway.'
      }
    ]
  },
  {
    id: 'SC-2026-0002',
    title: 'Commercial Garbage Heap Overflow near Laad Bazaar Arch',
    description: 'Garbage dump has accumulated for 48 hours outside the bazaar gate, attracting stray animals, foul odor, and blocking the pedestrian walkway.',
    category: 'garbage',
    priority: 'medium',
    aiSuggestedPriority: 'medium',
    aiSuggestedCategory: 'garbage',
    aiSuggestedDepartment: 'Solid Waste & Swachh City Cell',
    status: 'assigned',
    address: 'Near Laad Bazaar Arch, Charminar Historical Area',
    area: 'Charminar',
    ward: 'Ward 4 - Charminar Zone',
    coordinates: { lat: 17.3616, lng: 78.4747 },
    photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    citizenId: 'usr-cit-002',
    citizenName: 'Mirza Asad Baig',
    citizenPhone: '+91 98850 54321',
    citizenEmail: 'mirza.asad@example.com',
    preferredContact: 'sms',
    assignedDepartment: 'Solid Waste & Swachh City Cell',
    assignedOfficerId: 'usr-off-003',
    assignedOfficerName: 'Sanitation Officer Md. Qureshi',
    createdAt: '2026-10-11T14:00:00Z',
    updatedAt: '2026-10-11T16:30:00Z',
    slaHours: 24,
    slaDueDate: '2026-10-12T14:00:00Z',
    canReopen: false,
    timeline: [
      {
        status: 'submitted',
        timestamp: '2026-10-11T14:00:00Z',
        updatedBy: 'Mirza Asad Baig',
        role: 'citizen',
        remark: 'Registered with photo attachment of street waste.'
      },
      {
        status: 'under_review',
        timestamp: '2026-10-11T15:10:00Z',
        updatedBy: 'Duty Supervisor',
        role: 'officer',
        remark: 'Waste quantity verified at approx 1.5 metric tonnes.'
      },
      {
        status: 'assigned',
        timestamp: '2026-10-11T16:30:00Z',
        updatedBy: 'Dr. Radhika Rao',
        role: 'admin',
        remark: 'Dispatched to Charminar circle sanitation compactor vehicle.'
      }
    ]
  },
  {
    id: 'SC-2026-0003',
    title: 'Cluster of 14 Dark LED Streetlights on Tank Bund Promenade',
    description: 'Continuous stretch of smart streetlights not illuminating between poles #12 and #26, causing hazardous conditions for night pedestrians and cyclists.',
    category: 'streetlights',
    priority: 'medium',
    aiSuggestedPriority: 'medium',
    aiSuggestedCategory: 'streetlights',
    aiSuggestedDepartment: 'Smart Streetlights & Electrical Services',
    status: 'resolved',
    address: 'Tank Bund Road Promenade, Near Buddha Statue Entry',
    area: 'Tank Bund',
    ward: 'Ward 1 - Khairatabad Zone',
    coordinates: { lat: 17.4239, lng: 78.4738 },
    citizenId: 'usr-cit-003',
    citizenName: 'T. Gayatri',
    citizenPhone: '+91 97001 22334',
    citizenEmail: 'gayatri.t@example.com',
    preferredContact: 'phone',
    assignedDepartment: 'Smart Streetlights & Electrical Services',
    assignedOfficerId: 'usr-off-004',
    assignedOfficerName: 'Eng. M. Narsing Rao',
    createdAt: '2026-10-10T19:30:00Z',
    updatedAt: '2026-10-11T09:45:00Z',
    slaHours: 12,
    slaDueDate: '2026-10-11T07:30:00Z',
    resolutionNotes: 'Replaced faulty circuit breaker and repaired loose optical sensor cable. All 14 poles tested and operational.',
    canReopen: true,
    reopenCount: 0,
    timeline: [
      {
        status: 'submitted',
        timestamp: '2026-10-10T19:30:00Z',
        updatedBy: 'T. Gayatri',
        role: 'citizen',
        remark: 'Registered after dusk walk.'
      },
      {
        status: 'assigned',
        timestamp: '2026-10-10T20:15:00Z',
        updatedBy: 'Eng. Suresh Kumar',
        role: 'officer',
        remark: 'Assigned to night electrical crew.'
      },
      {
        status: 'in_progress',
        timestamp: '2026-10-10T22:30:00Z',
        updatedBy: 'Eng. M. Narsing Rao',
        role: 'officer',
        remark: 'Diagnostic check identified breaker trip at Feeder Pillar 4.'
      },
      {
        status: 'resolved',
        timestamp: '2026-10-11T09:45:00Z',
        updatedBy: 'Eng. M. Narsing Rao',
        role: 'officer',
        remark: 'Repaired feeder breaker. Full lux-level verification completed.'
      }
    ]
  },
  {
    id: 'SC-2026-0004',
    title: 'Severe Deep Pothole and Cavity on Road No. 36 near School Gate',
    description: 'Road cave-in measuring 4 feet wide and 8 inches deep right in front of the school gate. Two two-wheelers skidded this morning.',
    category: 'roads',
    priority: 'high',
    aiSuggestedPriority: 'high',
    aiSuggestedCategory: 'roads',
    aiSuggestedDepartment: 'Roads & Public Infrastructure',
    status: 'under_review',
    address: 'Road No. 36, Near Jubilee Hills Public School',
    area: 'Jubilee Hills',
    ward: 'Ward 1 - Khairatabad Zone',
    coordinates: { lat: 17.4319, lng: 78.4072 },
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    citizenId: 'usr-cit-001',
    citizenName: 'Ananya Sharma',
    citizenPhone: '+91 98490 12345',
    citizenEmail: 'ananya.sharma@example.com',
    preferredContact: 'phone',
    assignedDepartment: 'Roads & Public Infrastructure',
    createdAt: '2026-10-12T07:10:00Z',
    updatedAt: '2026-10-12T07:45:00Z',
    slaHours: 12,
    slaDueDate: '2026-10-12T19:10:00Z',
    canReopen: false,
    timeline: [
      {
        status: 'submitted',
        timestamp: '2026-10-12T07:10:00Z',
        updatedBy: 'Ananya Sharma',
        role: 'citizen',
        remark: 'Reported with school safety risk highlight.'
      },
      {
        status: 'under_review',
        timestamp: '2026-10-12T07:45:00Z',
        updatedBy: 'Eng. Suresh Kumar',
        role: 'officer',
        remark: 'Flagged for urgent cold-mix asphalt patch team dispatch.'
      }
    ]
  },
  {
    id: 'SC-2026-0005',
    title: 'Open Manhole and Overflowing Stormwater Drain near Metro Pillar 114',
    description: 'Heavy sewage overflow and concrete cover broken over storm drain, posing severe fall risk at night and spreading odor.',
    category: 'drainage',
    priority: 'critical',
    aiSuggestedPriority: 'critical',
    aiSuggestedCategory: 'drainage',
    aiSuggestedDepartment: 'Drainage & Stormwater Drainage',
    status: 'in_progress',
    address: 'Near Metro Pillar 114, Ameerpet Main Road',
    area: 'Ameerpet',
    ward: 'Ward 6 - Secunderabad Zone',
    coordinates: { lat: 17.4375, lng: 78.4482 },
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    citizenId: 'usr-cit-004',
    citizenName: 'K. Rajeshwar Rao',
    citizenPhone: '+91 98491 55667',
    citizenEmail: 'rajeshwar.k@example.com',
    preferredContact: 'phone',
    assignedDepartment: 'Drainage & Stormwater Drainage',
    assignedOfficerId: 'usr-off-001',
    assignedOfficerName: 'Eng. Suresh Kumar',
    createdAt: '2026-10-11T11:00:00Z',
    updatedAt: '2026-10-11T13:30:00Z',
    slaHours: 6,
    slaDueDate: '2026-10-11T17:00:00Z',
    resolutionNotes: 'Temporary warning barricade placed. Precast concrete slab delivered on site for installation.',
    canReopen: false,
    timeline: [
      {
        status: 'submitted',
        timestamp: '2026-10-11T11:00:00Z',
        updatedBy: 'K. Rajeshwar Rao',
        role: 'citizen',
        remark: 'Citizen called attention to busy pedestrian footpath danger.'
      },
      {
        status: 'under_review',
        timestamp: '2026-10-11T11:45:00Z',
        updatedBy: 'Control Room Officer',
        role: 'officer',
        remark: 'Assessed as hazard level critical.'
      },
      {
        status: 'assigned',
        timestamp: '2026-10-11T12:00:00Z',
        updatedBy: 'Dr. Radhika Rao',
        role: 'admin',
        remark: 'Assigned to Ward 6 drainage maintenance truck.'
      },
      {
        status: 'in_progress',
        timestamp: '2026-10-11T13:30:00Z',
        updatedBy: 'Eng. Suresh Kumar',
        role: 'officer',
        remark: 'Safety barricade erected. Jetting machine clearing obstruction before slab replacement.'
      }
    ]
  },
  {
    id: 'SC-2026-0006',
    title: 'Traffic Signal Controller Blackout at Wipro Circle Junction',
    description: 'Signal lights completely blank during peak rush hour at Wipro Circle, creating severe four-way deadlock.',
    category: 'traffic',
    priority: 'high',
    aiSuggestedPriority: 'high',
    aiSuggestedCategory: 'traffic',
    aiSuggestedDepartment: 'Smart Traffic & Transit Signals',
    status: 'resolved',
    address: 'Wipro Circle Junction, Financial District',
    area: 'Gachibowli',
    ward: 'Ward 9 - Serilingampally Zone',
    coordinates: { lat: 17.4208, lng: 78.3378 },
    citizenId: 'usr-cit-005',
    citizenName: 'Sanjay Varma',
    citizenPhone: '+91 99887 66554',
    citizenEmail: 'sanjay.varma@example.com',
    preferredContact: 'phone',
    assignedDepartment: 'Smart Traffic & Transit Signals',
    assignedOfficerId: 'usr-off-005',
    assignedOfficerName: 'Sri P. Sudhakar',
    createdAt: '2026-10-10T08:00:00Z',
    updatedAt: '2026-10-10T09:40:00Z',
    slaHours: 12,
    slaDueDate: '2026-10-10T20:00:00Z',
    resolutionNotes: 'UPS backup battery circuit rebooted and synchronized with central traffic control room.',
    canReopen: false,
    timeline: [
      {
        status: 'submitted',
        timestamp: '2026-10-10T08:00:00Z',
        updatedBy: 'Sanjay Varma',
        role: 'citizen',
        remark: 'Logged with traffic stall report.'
      },
      {
        status: 'assigned',
        timestamp: '2026-10-10T08:20:00Z',
        updatedBy: 'Dr. Radhika Rao',
        role: 'admin',
        remark: 'Dispatched traffic technical unit.'
      },
      {
        status: 'resolved',
        timestamp: '2026-10-10T09:40:00Z',
        updatedBy: 'Sri P. Sudhakar',
        role: 'officer',
        remark: 'Microcontroller power cycle completed. Automated sequencing operational.'
      }
    ]
  }
];

const COMPLAINT_STORAGE_KEY = 'smartcity_complaints';

export const complaintService = {
  getComplaints: (): Complaint[] => {
    try {
      const stored = localStorage.getItem(COMPLAINT_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load complaints from localStorage', e);
    }
    localStorage.setItem(COMPLAINT_STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
    return INITIAL_COMPLAINTS;
  },

  getComplaintById: (id: string): Complaint | undefined => {
    const cleaned = id.trim().toUpperCase();
    const list = complaintService.getComplaints();
    return list.find(c => c.id.toUpperCase() === cleaned);
  },

  getComplaintsByCitizen: (citizenId: string): Complaint[] => {
    const list = complaintService.getComplaints();
    return list.filter(c => c.citizenId === citizenId);
  },

  calculateSLAHours: (priority: ComplaintPriority): number => {
    switch (priority) {
      case 'critical': return 6;
      case 'high': return 12;
      case 'medium': return 24;
      case 'low': return 48;
      default: return 24;
    }
  },

  getDepartmentForCategory: (category: ComplaintCategory): string => {
    switch (category) {
      case 'water': return 'Water Supply & Sewerage Board (HMWSSB)';
      case 'garbage': return 'Solid Waste & Swachh City Cell';
      case 'roads': return 'Roads & Public Infrastructure';
      case 'drainage': return 'Drainage & Stormwater Drainage';
      case 'streetlights': return 'Smart Streetlights & Electrical Services';
      case 'sanitation': return 'Sanitation & Public Health Inspection';
      case 'traffic': return 'Smart Traffic & Transit Signals';
      default: return 'General Municipal Administration';
    }
  },

  generateUniqueId: (existingList: Complaint[]): string => {
    const year = new Date().getFullYear();
    const numbers = existingList.map(c => {
      const match = c.id.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
    const nextNum = (maxNum + 1).toString().padStart(4, '0');
    return `SC-${year}-${nextNum}`;
  },

  createComplaint: (data: {
    title: string;
    description: string;
    category: ComplaintCategory;
    priority: ComplaintPriority;
    aiSuggestedPriority?: ComplaintPriority;
    aiSuggestedCategory?: ComplaintCategory;
    aiSuggestedDepartment?: string;
    address: string;
    area: string;
    ward?: string;
    coordinates?: { lat: number; lng: number };
    photoUrl?: string;
    citizenId: string;
    citizenName: string;
    citizenPhone: string;
    citizenEmail: string;
    preferredContact?: 'phone' | 'email' | 'sms';
  }): Complaint => {
    const currentList = complaintService.getComplaints();
    const newId = complaintService.generateUniqueId(currentList);
    const now = new Date().toISOString();
    const slaHours = complaintService.calculateSLAHours(data.priority);
    const dueDate = new Date(Date.now() + slaHours * 3600 * 1000).toISOString();
    const assignedDepartment = data.aiSuggestedDepartment || complaintService.getDepartmentForCategory(data.category);

    const initialTimeline: StatusTimelineEntry = {
      status: 'submitted',
      timestamp: now,
      updatedBy: data.citizenName || 'Citizen User',
      role: 'citizen',
      remark: 'Complaint submitted via SmartCity AI portal.'
    };

    const newComplaint: Complaint = {
      ...data,
      id: newId,
      ward: data.ward || `Ward in ${data.area}`,
      preferredContact: data.preferredContact || 'phone',
      status: 'submitted',
      assignedDepartment,
      createdAt: now,
      updatedAt: now,
      slaHours,
      slaDueDate: dueDate,
      canReopen: false,
      timeline: [initialTimeline]
    };

    const updatedList = [newComplaint, ...currentList];
    localStorage.setItem(COMPLAINT_STORAGE_KEY, JSON.stringify(updatedList));
    return newComplaint;
  },

  updateComplaintStatus: (
    id: string,
    newStatus: ComplaintStatus,
    remark: string,
    user: { name: string; role: UserRole; id: string },
    options?: {
      assignedOfficerId?: string;
      assignedOfficerName?: string;
      resolutionNotes?: string;
      isInternal?: boolean;
    }
  ): { success: boolean; complaint?: Complaint; error?: string } => {
    const currentList = complaintService.getComplaints();
    const index = currentList.findIndex(c => c.id.toUpperCase() === id.toUpperCase());

    if (index === -1) {
      return { success: false, error: 'Complaint not found.' };
    }

    const complaint = currentList[index];

    // Status transition validation
    const valid = complaintService.isValidStatusTransition(complaint.status, newStatus, user.role);
    if (!valid.allowed) {
      return { success: false, error: valid.reason };
    }

    const now = new Date().toISOString();
    const newTimelineEntry: StatusTimelineEntry = {
      status: newStatus,
      timestamp: now,
      updatedBy: user.name,
      role: user.role,
      remark: remark || `Status changed to ${newStatus.replace('_', ' ').toUpperCase()}`,
      isInternal: options?.isInternal || false
    };

    const updatedComplaint: Complaint = {
      ...complaint,
      status: newStatus,
      updatedAt: now,
      assignedOfficerId: options?.assignedOfficerId || complaint.assignedOfficerId,
      assignedOfficerName: options?.assignedOfficerName || complaint.assignedOfficerName,
      resolutionNotes: options?.resolutionNotes || complaint.resolutionNotes,
      canReopen: newStatus === 'resolved',
      reopenCount: newStatus === 'reopened' ? (complaint.reopenCount || 0) + 1 : complaint.reopenCount,
      timeline: [...complaint.timeline, newTimelineEntry]
    };

    currentList[index] = updatedComplaint;
    localStorage.setItem(COMPLAINT_STORAGE_KEY, JSON.stringify(currentList));
    return { success: true, complaint: updatedComplaint };
  },

  isValidStatusTransition: (
    currentStatus: ComplaintStatus,
    newStatus: ComplaintStatus,
    role: UserRole
  ): { allowed: boolean; reason?: string } => {
    if (currentStatus === newStatus) {
      return { allowed: true };
    }

    // Citizen can only request reopen if resolved
    if (role === 'citizen') {
      if (currentStatus === 'resolved' && newStatus === 'reopened') {
        return { allowed: true };
      }
      return { allowed: false, reason: 'Citizens can only request reopening on resolved complaints.' };
    }

    // Officer & Admin transitions
    if (currentStatus === 'submitted') {
      if (['under_review', 'assigned', 'rejected'].includes(newStatus)) return { allowed: true };
    } else if (currentStatus === 'under_review') {
      if (['assigned', 'in_progress', 'rejected'].includes(newStatus)) return { allowed: true };
    } else if (currentStatus === 'assigned') {
      if (['in_progress', 'under_review'].includes(newStatus)) return { allowed: true };
    } else if (currentStatus === 'in_progress') {
      if (['resolved', 'assigned'].includes(newStatus)) return { allowed: true };
    } else if (currentStatus === 'reopened') {
      if (['under_review', 'assigned', 'in_progress'].includes(newStatus)) return { allowed: true };
    } else if (currentStatus === 'resolved') {
      if (['reopened'].includes(newStatus)) return { allowed: true };
    }

    return { allowed: true }; // Admin override allowed in prototype
  },

  isOverdue: (complaint: Complaint): boolean => {
    if (complaint.status === 'resolved' || complaint.status === 'rejected') {
      return false;
    }
    const dueTime = new Date(complaint.slaDueDate).getTime();
    return Date.now() > dueTime;
  },

  exportToCSV: (complaintsList: Complaint[]): string => {
    const headers = [
      'Complaint ID',
      'Title',
      'Category',
      'Priority',
      'Status',
      'Area',
      'Ward',
      'Citizen Name',
      'Citizen Phone',
      'Assigned Department',
      'Assigned Officer',
      'Created Date',
      'SLA Hours',
      'Overdue'
    ];

    const rows = complaintsList.map(c => [
      `"${c.id}"`,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.category}"`,
      `"${c.priority}"`,
      `"${c.status}"`,
      `"${c.area}"`,
      `"${c.ward}"`,
      `"${c.citizenName}"`,
      `"${c.citizenPhone}"`,
      `"${c.assignedDepartment}"`,
      `"${c.assignedOfficerName || 'Unassigned'}"`,
      `"${new Date(c.createdAt).toLocaleDateString()}"`,
      c.slaHours,
      complaintService.isOverdue(c) ? 'YES' : 'NO'
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  },

  resetDemoData: (): void => {
    localStorage.setItem(COMPLAINT_STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
  }
};
