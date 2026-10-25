import React from 'react';
import { Router, Routes, Route, ProtectedRoute } from './router';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { NewComplaintPage } from './pages/citizen/NewComplaintPage';
import { CitizenComplaintsPage } from './pages/citizen/CitizenComplaintsPage';
import { ComplaintDetailPage } from './pages/citizen/ComplaintDetailPage';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { OfficerComplaintDetailPage } from './pages/officer/OfficerComplaintDetailPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminComplaintsPage } from './pages/admin/AdminComplaintsPage';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/track" element={<TrackComplaintPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/complaints/new" element={<NewComplaintPage />} />
              <Route path="/complaints" element={<CitizenComplaintsPage />} />
              <Route path="/citizen/complaints" element={<CitizenComplaintsPage />} />
              <Route path="/complaints/:id" element={<ComplaintDetailPage />} />

              {/* Citizen Dashboard Routes */}
              <Route
                path="/citizen/dashboard"
                element={<ProtectedRoute allowedRoles={['citizen', 'admin']} element={<CitizenDashboard />} />}
              />

              {/* Officer Routes */}
              <Route
                path="/officer/dashboard"
                element={<ProtectedRoute allowedRoles={['officer', 'admin']} element={<OfficerDashboard />} />}
              />
              <Route
                path="/officer/complaints/:id"
                element={<ProtectedRoute allowedRoles={['officer', 'admin']} element={<OfficerComplaintDetailPage />} />}
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={<ProtectedRoute allowedRoles={['admin']} element={<AdminDashboard />} />}
              />
              <Route
                path="/admin/complaints"
                element={<ProtectedRoute allowedRoles={['admin']} element={<AdminComplaintsPage />} />}
              />
              <Route
                path="/admin/departments"
                element={<ProtectedRoute allowedRoles={['admin']} element={<AdminDepartmentsPage />} />}
              />
              <Route
                path="/admin/users"
                element={<ProtectedRoute allowedRoles={['admin']} element={<AdminUsersPage />} />}
              />

              {/* Common Authenticated Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};
