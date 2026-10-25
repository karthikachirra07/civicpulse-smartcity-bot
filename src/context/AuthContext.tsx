import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';
import { authService, DEMO_USERS } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => { success: boolean; error?: string };
  register: (name: string, email: string, phone: string, password: string, ward?: string, role?: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = authService.getCurrentUser();
    if (saved) return saved;
    // Pre-populate with citizen account on first load for easy inspection
    authService.setCurrentUser(DEMO_USERS.citizen);
    return DEMO_USERS.citizen;
  });

  const login = (email: string, password: string, role?: UserRole) => {
    const res = authService.login(email, password, role);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Login failed' };
  };

  const register = (
    name: string,
    email: string,
    phone: string,
    password: string,
    ward?: string,
    role: UserRole = 'citizen'
  ) => {
    const res = authService.register(name, email, phone, password, ward, role);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed' };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    const newUser = authService.switchDemoRole(role);
    setUser(newUser);
  };

  const updateProfile = (data: Partial<User>) => {
    const updated = authService.updateProfile(data);
    if (updated) {
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'citizen',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
