export type UserRole = 'citizen' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department?: string; // For municipal officers
  ward?: string;
  avatar?: string;
  createdAt: string;
}

export type ComplaintCategory =
  | 'roads'
  | 'garbage'
  | 'water'
  | 'drainage'
  | 'streetlights'
  | 'sanitation'
  | 'traffic'
  | 'other';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'critical';

export type ComplaintStatus =
  | 'submitted'
  | 'under_review'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'reopened'
  | 'rejected';

export interface StatusTimelineEntry {
  status: ComplaintStatus;
  timestamp: string;
  updatedBy: string;
  role: UserRole;
  remark: string;
  isInternal?: boolean; // Officer internal note vs citizen-visible remark
}

export interface Complaint {
  id: string; // e.g., "SC-2026-0001"
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  aiSuggestedPriority?: ComplaintPriority;
  aiSuggestedCategory?: ComplaintCategory;
  aiSuggestedDepartment?: string;
  status: ComplaintStatus;
  address: string;
  area: string; // e.g. "Banjara Hills", "Hitec City", "Charminar", "Gachibowli"
  ward: string;
  coordinates?: { lat: number; lng: number };
  photoUrl?: string;
  citizenId: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  preferredContact: 'phone' | 'email' | 'sms';
  assignedDepartment: string;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  createdAt: string;
  updatedAt: string;
  slaHours: number;
  slaDueDate: string;
  resolutionNotes?: string;
  canReopen: boolean;
  reopenCount?: number;
  timeline: StatusTimelineEntry[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  categoryKey: ComplaintCategory;
  headName: string;
  email: string;
  phone: string;
  activeComplaints: number;
  resolvedComplaints: number;
  slaHoursTarget: number;
  slaComplianceRate: number; // percentage
}

export interface NotificationItem {
  id: string;
  userId: string; // or 'all' or 'officer' or 'admin'
  title: string;
  message: string;
  complaintId?: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  intent?: 'service_enquiry' | 'new_complaint' | 'complaint_status' | 'department_info' | 'emergency_guidance' | 'general';
  suggestedComplaint?: Partial<Complaint>;
  suggestedActions?: {
    label: string;
    action: string;
    payload?: any;
  }[];
}

export type LanguageCode = 'en' | 'te' | 'hi';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: ComplaintCategory;
}
