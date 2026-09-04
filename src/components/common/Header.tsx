import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, AppPlatformView } from '../../types';
import {
  GraduationCap,
  BookOpen,
  MonitorPlay,
  Smartphone,
  ShieldAlert,
  UserCheck,
  Headphones,
  FileEdit,
  Award,
  ShoppingCart,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Menu,
  X,
  Heart
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setView,
    currentRole,
    switchRoleAndNavigate,
    currentUser,
    cart,
    setIsCartOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    searchQuery,
    setSearchQuery,
    setIsEnquiryModalOpen,
    setIsVerificationModalOpen,
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    setIsNotificationModalOpen,
    setSelectedCategory
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const wishlistCount = currentUser.wishlistCourseIds?.length || 0;

  const roleOptions: { role: UserRole; label: string; view: AppPlatformView; icon: React.ReactNode; desc: string }[] = [
    { role: 'student', label: 'Student Web Portal', view: 'student_portal', icon: <GraduationCap className="w-4 h-4 text-emerald-600" />, desc: 'Classes, Tests, Doubts & Materials' },
    { role: 'super_admin', label: 'Super Admin / Admin', view: 'admin_panel', icon: <ShieldAlert className="w-4 h-4 text-purple-600" />, desc: 'Analytics, Users, Revenue & Batches' },
    { role: 'faculty', label: 'Faculty / Teacher Panel', view: 'faculty_panel', icon: <UserCheck className="w-4 h-4 text-blue-600" />, desc: 'Schedule Live, Grade & Clear Doubts' },
    { role: 'counsellor', label: 'Counsellor / CRM Panel', view: 'counsellor_panel', icon: <Headphones className="w-4 h-4 text-amber-600" />, desc: 'Lead Pipeline, Calls & Admissions' },
    { role: 'content_manager', label: 'Content Manager Panel', view: 'content_panel', icon: <FileEdit className="w-4 h-4 text-rose-600" />, desc: 'Manage Videos, PDFs & Syllabi' },
    { role: 'exam_manager', label: 'Exam Manager Panel', view: 'exam_panel', icon: <Award className="w-4 h-4 text-indigo-600" />, desc: 'Question Bank & Test Series' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md bg-white/95">
      {/* Top Notification / Role Switcher Strip */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-medium px-2 py-0.5 rounded-full text-[11px] border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" /> Admissions Open 2026-27
            </span>
            <span className="hidden md:inline text-slate-300">
              Flat 50% Off with code <strong className="text-amber-300 font-bold tracking-wider">MAXWELL50</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="top-verify-cert-btn"
              onClick={() => setIsVerificationModalOpen(true)}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer text-indigo-300 hover:text-indigo-200 font-medium"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify Certificate</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              id="top-enquiry-btn"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="hover:text-white transition flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-amber-300"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk to Counsellor: <strong>1800-889-VEDA</strong></span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            {/* Quick Mode Switcher Indicator */}
            <div className="relative">
              <button
                id="role-switcher-btn"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 px-2.5 py-0.5 rounded border border-slate-700 transition cursor-pointer font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Role: <span className="capitalize text-emerald-300 font-semibold">{currentRole.replace('_', ' ')}</span></span>
                <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 text-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Switch Platform Role & View</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.role}
                        id={`switch-role-${opt.role}`}
                        onClick={() => switchRoleAndNavigate(opt.role)}
                        className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 hover:bg-slate-50 transition cursor-pointer ${currentRole === opt.role ? 'bg-emerald-50/60' : ''}`}
                      >
                        <div className="p-1.5 bg-slate-100 rounded-lg mt-0.5">
                          {opt.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-slate-900">{opt.label}</p>
                            {currentRole === opt.role && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand matching Bento Grid theme */}
          <div className="flex items-center gap-6">
            <button
              id="brand-logo-btn"
              onClick={() => setView('website')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-tighter shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
                DC
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  DC MAXWELL <span className="text-indigo-600">ACADEMY</span>
                </span>
              </div>
            </button>

            {/* View Tabs with Bento Theme Navbar styling */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                id="nav-website-tab"
                onClick={() => setView('website')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  currentView === 'website'
                    ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                Public Website
              </button>

              <button
                id="nav-student-portal-tab"
                onClick={() => setView('student_portal')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  currentView === 'student_portal'
                    ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                Dashboard
              </button>

              <button
                id="nav-mobile-app-tab"
                onClick={() => setView('mobile_app')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  currentView === 'mobile_app'
                    ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                Mobile App
              </button>

              <div className="h-4 w-px bg-slate-300 mx-1"></div>

              <button
                id="nav-admin-panel-tab"
                onClick={() => switchRoleAndNavigate('super_admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  currentView === 'admin_panel'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                Admin
              </button>

              <button
                id="nav-faculty-panel-tab"
                onClick={() => switchRoleAndNavigate('faculty')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  currentView === 'faculty_panel'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                Faculty
              </button>

              <button
                id="nav-counsellor-panel-tab"
                onClick={() => switchRoleAndNavigate('counsellor')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  currentView === 'counsellor_panel'
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-amber-600" />
                Counsellor
              </button>
            </nav>
          </div>

          {/* Right Actions: Global Spotlight Search, Wishlist, Cart, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Spotlight Search Button */}
            <button
              id="header-global-spotlight-btn"
              onClick={() => setIsGlobalSearchOpen(true)}
              className="relative flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-xs px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer group"
              title="Search Courses, Subjects, Videos, Faculty, Tests, Materials & Chapters (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline font-medium">Search anything...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Student Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => setView('student_portal')}
              className="relative p-2.5 rounded-xl text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer border border-slate-200"
              title="Saved Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer border border-slate-200"
              title="View Cart & Packages"
            >
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                id="notifications-toggle-btn"
                onClick={() => setIsNotificationModalOpen(true)}
                className="relative p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer border border-slate-200"
                title="Open Notification Center"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
            </div>

            {/* Profile Avatar with Welcome back text */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Welcome back,</p>
                <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
              </div>
              <button
                id="student-portal-quick-btn"
                onClick={() => setView('student_portal')}
                className="w-10 h-10 bg-slate-200 rounded-full border-2 border-indigo-100 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-indigo-500 transition cursor-pointer"
                title="Student Dashboard"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-2 animate-in slide-in-from-top duration-150">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setView('website'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'website' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' : 'bg-slate-50 text-slate-700'}`}
              >
                🌐 Public Website
              </button>
              <button
                onClick={() => { setView('student_portal'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'student_portal' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' : 'bg-slate-50 text-slate-700'}`}
              >
                🎓 Student Portal
              </button>
              <button
                onClick={() => { setView('mobile_app'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'mobile_app' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' : 'bg-slate-50 text-slate-700'}`}
              >
                📱 Mobile App Simulator
              </button>
              <button
                onClick={() => { switchRoleAndNavigate('super_admin'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'admin_panel' ? 'bg-purple-50 text-purple-900 border border-purple-200' : 'bg-slate-50 text-slate-700'}`}
              >
                🛡️ Admin Dashboard
              </button>
              <button
                onClick={() => { switchRoleAndNavigate('faculty'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'faculty_panel' ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-slate-50 text-slate-700'}`}
              >
                👨‍🏫 Faculty Panel
              </button>
              <button
                onClick={() => { switchRoleAndNavigate('counsellor'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'counsellor_panel' ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-slate-50 text-slate-700'}`}
              >
                🎧 CRM / Counsellor
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
