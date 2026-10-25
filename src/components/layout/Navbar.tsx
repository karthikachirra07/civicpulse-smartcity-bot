import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Link, NavLink, useNavigate } from '../../router';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Bell,
  Globe,
  User,
  LogOut,
  Bot,
  FileText,
  Search,
  Building2,
  ChevronDown,
  Plus
} from '../common/Icons';

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardPath = () => {
    switch (role) {
      case 'citizen': return '/citizen/dashboard';
      case 'officer': return '/officer/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/citizen/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E7EC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size="md" showTagline={false} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[#667085]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-[#0F9D91] bg-[#E6F6F5] font-semibold' : 'hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                }`
              }
            >
              {t.navHome || 'Home'}
            </NavLink>

            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-[#0F9D91] bg-[#E6F6F5] font-semibold' : 'hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <Bot className="w-4 h-4 text-[#0F9D91]" />
              <span>{t.navChat || 'AI Assistant'}</span>
            </NavLink>

            <NavLink
              to="/complaints/new"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-[#0F9D91] bg-[#E6F6F5] font-semibold' : 'hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <FileText className="w-4 h-4 text-[#667085]" />
              <span>{t.registerComplaint || 'Register Complaint'}</span>
            </NavLink>

            <NavLink
              to="/track"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-[#0F9D91] bg-[#E6F6F5] font-semibold' : 'hover:text-[#1D2939] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <Search className="w-4 h-4 text-[#667085]" />
              <span>{t.trackTicket || 'Track Complaint'}</span>
            </NavLink>

            {/* Role-Specific Dashboard Shortcut */}
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors font-semibold ${
                  isActive
                    ? 'text-[#142B4A] bg-[#F0F4F9] border border-[#D0D5DD]'
                    : 'text-[#142B4A] hover:bg-[#F5F7FA]'
                }`
              }
            >
              <Building2 className="w-4 h-4 text-[#142B4A]" />
              <span>
                {role === 'citizen' ? 'Citizen Dashboard' : role === 'officer' ? 'Officer Queue' : 'Admin Operations'}
              </span>
            </NavLink>
          </nav>

          {/* Right Action Icons & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setIsUserMenuOpen(false); }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E4E7EC] text-xs font-semibold text-[#1D2939] hover:bg-[#F5F7FA] transition-colors"
                title="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-[#667085]" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#667085]" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-[#E4E7EC] rounded-xl shadow-lg py-1.5 z-50 text-xs animate-fade-in">
                  <button
                    onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F5F7FA] ${language === 'en' ? 'font-bold text-[#0F9D91]' : 'text-[#1D2939]'}`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-[#0F9D91]">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setIsLangMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F5F7FA] ${language === 'te' ? 'font-bold text-[#0F9D91]' : 'text-[#1D2939]'}`}
                  >
                    <span>తెలుగు (Telugu)</span>
                    {language === 'te' && <span className="text-[#0F9D91]">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setIsLangMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F5F7FA] ${language === 'hi' ? 'font-bold text-[#0F9D91]' : 'text-[#1D2939]'}`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {language === 'hi' && <span className="text-[#0F9D91]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Report Issue CTA Button */}
            <Link
              to="/complaints/new"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0F9D91] hover:bg-[#0C8379] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report Issue</span>
            </Link>

            {/* In-app Notifications Bell */}
            {user && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-lg text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA] transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#0F9D91' }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Profile Dropdown or Guest Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setIsUserMenuOpen(!isUserMenuOpen); setIsLangMenuOpen(false); }}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-[#E4E7EC] hover:bg-[#F5F7FA] transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full text-white flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#142B4A' }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden lg:block text-left text-xs">
                    <div className="font-semibold text-[#1D2939] leading-tight">{user.name}</div>
                    <div className="text-[10px] text-[#667085] uppercase tracking-wide font-medium">{user.role}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#667085] hidden sm:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4E7EC] rounded-xl shadow-lg py-2 z-50 text-xs animate-fade-in">
                    <div className="px-3 py-2 border-b border-[#E4E7EC] mb-1">
                      <p className="font-bold text-[#1D2939] text-sm">{user.name}</p>
                      <p className="text-[#667085] text-[11px] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F5F7FA] text-[#142B4A] border border-[#E4E7EC]">
                        Role: {user.role}
                      </span>
                    </div>

                    <Link
                      to={getDashboardPath()}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-3 py-2 text-[#1D2939] hover:bg-[#F5F7FA] hover:text-[#0F9D91] font-medium"
                    >
                      Go to Dashboard
                    </Link>

                    <Link
                      to="/complaints"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-3 py-2 text-[#1D2939] hover:bg-[#F5F7FA] hover:text-[#0F9D91] font-medium"
                    >
                      My Complaints
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-3 py-2 text-[#1D2939] hover:bg-[#F5F7FA] hover:text-[#0F9D91] font-medium"
                    >
                      Profile &amp; Settings
                    </Link>

                    <Link
                      to="/notifications"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-3 py-2 text-[#1D2939] hover:bg-[#F5F7FA] hover:text-[#0F9D91] font-medium"
                    >
                      Notification Center ({unreadCount} unread)
                    </Link>

                    <div className="border-t border-[#E4E7EC] mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-3 py-2 text-[#D64545] hover:bg-red-50 font-medium flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg border border-[#E4E7EC] text-xs font-semibold text-[#142B4A] hover:bg-[#F5F7FA] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 rounded-lg bg-[#0F9D91] text-white text-xs font-semibold hover:bg-[#0C8379] shadow-xs transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#667085] hover:text-[#1D2939] hover:bg-[#F5F7FA]"
              aria-label="Toggle Navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E4E7EC] py-3 space-y-1 text-xs bg-white">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-[#1D2939] hover:bg-[#F5F7FA]"
            >
              Home
            </Link>
            <Link
              to="/chatbot"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-[#1D2939] hover:bg-[#F5F7FA]"
            >
              AI Assistant
            </Link>
            <Link
              to="/complaints/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-[#1D2939] hover:bg-[#F5F7FA]"
            >
              Register Complaint
            </Link>
            <Link
              to="/track"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-medium text-[#1D2939] hover:bg-[#F5F7FA]"
            >
              Track Complaint
            </Link>
            <Link
              to={getDashboardPath()}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-bold text-[#0F9D91] bg-[#E6F6F5]"
            >
              {role === 'citizen' ? 'Citizen Dashboard' : role === 'officer' ? 'Officer Queue' : 'Admin Panel'}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
