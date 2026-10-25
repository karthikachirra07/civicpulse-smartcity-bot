import { User, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, User> = {
  citizen: {
    id: 'usr-cit-001',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98490 12345',
    role: 'citizen',
    ward: 'Ward 2 - Hitec City & Madhapur',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-01-15T08:00:00Z'
  },
  officer: {
    id: 'usr-off-001',
    name: 'Eng. Suresh Kumar',
    email: 'suresh.ghmc@smartcity.gov.in',
    phone: '+91 98490 88776',
    role: 'officer',
    department: 'Roads & Bridges Department',
    ward: 'Ward 2 - Serilingampally Zone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-11-10T09:30:00Z'
  },
  admin: {
    id: 'usr-adm-001',
    name: 'Dr. Radhika Rao',
    email: 'admin@smartcity.gov.in',
    phone: '+91 040-21111111',
    role: 'admin',
    department: 'Central Municipal Administration',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-06-01T10:00:00Z'
  }
};

interface AccountRecord {
  user: User;
  password: string;
}

const AUTH_STORAGE_KEY = 'smartcity_auth_user';
const ACCOUNTS_STORAGE_KEY = 'smartcity_user_accounts';

const SEEDED_ACCOUNTS: AccountRecord[] = [
  { user: DEMO_USERS.citizen, password: 'password123' },
  { user: DEMO_USERS.officer, password: 'officer123' },
  { user: DEMO_USERS.admin, password: 'admin123' }
];

export const authService = {
  getAccounts: (): AccountRecord[] => {
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load accounts from localStorage', e);
    }
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(SEEDED_ACCOUNTS));
    return SEEDED_ACCOUNTS;
  },

  saveAccounts: (accounts: AccountRecord[]): void => {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  },

  getCurrentUser: (): User | null => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read auth user from localStorage', e);
    }
    return null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  login: (
    email: string,
    password: string,
    role?: UserRole
  ): { success: boolean; user?: User; error?: string } => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Fast-path demo role button login
    if (role && DEMO_USERS[role] && !email) {
      const demoUser = DEMO_USERS[role];
      authService.setCurrentUser(demoUser);
      return { success: true, user: demoUser };
    }

    if (!normalizedEmail) {
      return { success: false, error: 'Email address is required.' };
    }

    if (!cleanPassword) {
      return { success: false, error: 'Password is required.' };
    }

    const accounts = authService.getAccounts();
    const account = accounts.find(
      a => a.user.email.toLowerCase() === normalizedEmail
    );

    if (!account) {
      return {
        success: false,
        error: `No account registered with ${email}. Please check your email or click Register.`
      };
    }

    if (account.password !== cleanPassword) {
      return {
        success: false,
        error: 'Incorrect password. Please verify and try again.'
      };
    }

    authService.setCurrentUser(account.user);
    return { success: true, user: account.user };
  },

  register: (
    name: string,
    email: string,
    phone: string,
    password: string,
    ward?: string,
    role: UserRole = 'citizen'
  ): { success: boolean; user?: User; error?: string } => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    if (!cleanName) return { success: false, error: 'Full name is required.' };
    if (!cleanEmail || !cleanEmail.includes('@')) return { success: false, error: 'A valid email address is required.' };
    if (!cleanPhone || cleanPhone.length < 10) return { success: false, error: 'A valid 10-digit mobile number is required.' };
    if (!cleanPassword || cleanPassword.length < 6) return { success: false, error: 'Password must be at least 6 characters long.' };

    const accounts = authService.getAccounts();
    const existing = accounts.find(a => a.user.email.toLowerCase() === cleanEmail);

    if (existing) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.'
      };
    }

    const newUser: User = {
      id: `usr-${role.slice(0, 3)}-${Date.now().toString().slice(-5)}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role,
      ward: ward || 'Ward 2 - Serilingampally / Hitec City Zone',
      department: role === 'officer' ? 'General Municipal Services' : undefined,
      createdAt: new Date().toISOString()
    };

    const updatedAccounts = [...accounts, { user: newUser, password: cleanPassword }];
    authService.saveAccounts(updatedAccounts);
    authService.setCurrentUser(newUser);

    return { success: true, user: newUser };
  },

  logout: (): void => {
    authService.setCurrentUser(null);
  },

  switchDemoRole: (role: UserRole): User => {
    const user = DEMO_USERS[role];
    authService.setCurrentUser(user);
    return user;
  },

  updateProfile: (updatedData: Partial<User>): User | null => {
    const current = authService.getCurrentUser();
    if (!current) return null;

    const updated: User = { ...current, ...updatedData };
    authService.setCurrentUser(updated);

    const accounts = authService.getAccounts();
    const idx = accounts.findIndex(a => a.user.id === updated.id);
    if (idx >= 0) {
      accounts[idx].user = updated;
      authService.saveAccounts(accounts);
    }

    return updated;
  },

  getAllUsers: (): User[] => {
    const accounts = authService.getAccounts();
    return accounts.map(a => a.user);
  }
};
