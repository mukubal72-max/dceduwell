import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PublicWebsite } from './components/website/PublicWebsite';
import { AboutUs } from './components/website/AboutUs';
import { CourseDetailModal } from './components/website/CourseDetailModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FacultyPanel } from './components/faculty/FacultyPanel';
import { CounsellorPanel } from './components/counsellor/CounsellorPanel';
import { MobileAppSimulator } from './components/mobile/MobileAppSimulator';
import { CartCheckoutModal } from './components/student/CartCheckoutModal';
import { EnquiryModal } from './components/common/EnquiryModal';
import { InvoiceModal } from './components/common/InvoiceModal';
import { CertificateVerificationModal } from './components/common/CertificateVerificationModal';
import { GlobalSearchModal } from './components/student/GlobalSearchModal';
import { NotificationCenterModal } from './components/common/NotificationCenterModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-[#1E293B] selection:bg-indigo-500 selection:text-white">
      {/* Universal Sticky Header */}
      <Header />

      {/* Main Viewport Router */}
      <main className="flex-1 py-6 sm:py-8">
        {currentView === 'website' && <PublicWebsite />}
        {currentView === 'about_us' && <AboutUs />}
        {currentView === 'student_portal' && <StudentDashboard />}
        {currentView === 'admin_panel' && <AdminDashboard />}
        {currentView === 'faculty_panel' && <FacultyPanel />}
        {currentView === 'counsellor_panel' && <CounsellorPanel />}
        {currentView === 'mobile_app' && <MobileAppSimulator />}
      </main>

      {/* Global Modals */}
      <CourseDetailModal />
      <CartCheckoutModal />
      <EnquiryModal />
      <InvoiceModal />
      <CertificateVerificationModal />
      <GlobalSearchModal />
      <NotificationCenterModal />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
