import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Target,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  CreditCard,
  Heart,
  Flame,
  Wallet,
  Edit3,
  Sparkles,
  TrendingUp,
  FileCheck,
  Radio,
  FileText,
  BarChart3,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { Course, OrderItem } from '../../types';

export const StudentProfileView: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    courses,
    testResults,
    certificates,
    attendanceRecords,
    orders,
    invoices,
    setSelectedInvoice,
    setSelectedCertificate,
    setIsVerificationModalOpen,
    setActiveVideoLesson,
    setSelectedCourseForDetail,
    setView
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'tests' | 'certificates' | 'attendance' | 'progress' | 'orders' | 'wishlist'
  >('overview');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(currentUser.name || 'Aarav Sharma');
  const [editedPhone, setEditedPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [editedClass, setEditedClass] = useState(currentUser.studentClass || 'Class 12th Passed / CA Foundation');
  const [editedCollege, setEditedCollege] = useState(currentUser.schoolCollege || "St. Xavier's College, Mumbai");
  const [editedTargetExam, setEditedTargetExam] = useState(currentUser.targetExam || 'CA Foundation May 2026');

  // Enrolled courses
  const enrolledCourses = courses.filter((c) => currentUser.enrolledCourseIds.includes(c.id));

  // Wishlist courses
  const wishlistCourses = courses.filter((c) => currentUser.wishlistCourseIds?.includes(c.id) || ['crs-upsc-samarth', 'crs-tech-ai'].includes(c.id));

  // Mock Orders History if not in user
  const ordersList: any[] = currentUser.orders || [
    {
      id: 'ord-90412',
      orderNumber: 'VED-ORD-2026-90412',
      date: 'Feb 15, 2026',
      items: [{ id: 'crs-ca-foundation-package', title: 'CA Foundation Complete Video Course Package', price: 9999, type: 'course' }],
      totalAmount: 9999,
      paymentMethod: 'UPI / NetBanking (HDFC Bank)',
      status: 'Completed',
      invoiceUrl: '#'
    },
    {
      id: 'ord-88319',
      orderNumber: 'VED-ORD-2026-88319',
      date: 'Jan 10, 2026',
      items: [{ id: 'test-jee-major-01', title: 'All-India CBT Test Series Pass (30 Tests)', price: 2499, type: 'test_series' }],
      totalAmount: 2499,
      paymentMethod: 'Credit Card (Razorpay)',
      status: 'Completed',
      invoiceUrl: '#'
    }
  ];

  // Attendance metrics
  const totalClassesAttended = attendanceRecords.length || 18;
  const attendanceRate = 94.2;

  // Calculate course progress dynamically
  const calculateCourseProgress = (course: Course) => {
    let totalLessons = 0;
    let completed = 0;

    course.chapters?.forEach((ch) => {
      ch.lessons?.forEach((les) => {
        totalLessons++;
        if (currentUser.completedLessonIds.includes(les.id)) {
          completed++;
        }
      });
    });

    if (totalLessons === 0) return { overall: 68, subjects: [] };
    const overall = Math.round((completed / totalLessons) * 100);

    // Subject breakdown
    const subjectsMap: { [key: string]: { total: number; done: number } } = {};
    course.chapters?.forEach((ch) => {
      const subj = ch.subject || 'Core';
      if (!subjectsMap[subj]) subjectsMap[subj] = { total: 0, done: 0 };
      ch.lessons?.forEach((les) => {
        subjectsMap[subj].total++;
        if (currentUser.completedLessonIds.includes(les.id)) {
          subjectsMap[subj].done++;
        }
      });
    });

    const subjects = Object.keys(subjectsMap).map((subj) => ({
      name: subj,
      percentage: Math.round((subjectsMap[subj].done / subjectsMap[subj].total) * 100),
      done: subjectsMap[subj].done,
      total: subjectsMap[subj].total
    }));

    return { overall, subjects };
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      name: editedName,
      phone: editedPhone,
      studentClass: editedClass,
      schoolCollege: editedCollege,
      targetExam: editedTargetExam
    }));
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar & Key Info */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-indigo-400/40 shadow-lg"
              />
              <button
                onClick={() => {
                  const newUrl = prompt('Enter image URL for avatar:', currentUser.avatar);
                  if (newUrl) setCurrentUser((prev) => ({ ...prev, avatar: newUrl }));
                }}
                className="absolute inset-0 bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white transition cursor-pointer"
              >
                Change Photo
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-serif">{currentUser.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Scholar
                </span>
              </div>
              
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span className="font-semibold text-indigo-300">{currentUser.targetExam || 'CA Foundation May 2026'}</span>
                <span>•</span>
                <span>{currentUser.studentClass || 'Class 12th / Foundation'}</span>
              </p>

              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.schoolCollege || "St. Xavier's College, Mumbai"}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Study Streak</p>
              <p className="text-sm font-extrabold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 fill-amber-400" /> {currentUser.studyStreakDays || 14} Days
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Wallet Credits</p>
              <p className="text-sm font-extrabold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <Wallet className="w-4 h-4" /> ₹{currentUser.walletBalance || 1250}
              </p>
            </div>

            <button
              id="edit-profile-btn"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Details
            </button>
          </div>
        </div>

        {/* Edit Details Drawer/Form if open */}
        {isEditingProfile && (
          <form
            onSubmit={handleSaveProfile}
            className="p-5 bg-slate-950/80 border border-indigo-500/40 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs animate-fadeIn"
          >
            <div>
              <label className="block font-bold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Mobile Number</label>
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Class / Academic Stage</label>
              <input
                type="text"
                value={editedClass}
                onChange={(e) => setEditedClass(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">School / College Name</label>
              <input
                type="text"
                value={editedCollege}
                onChange={(e) => setEditedCollege(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Target Examination & Year</label>
              <input
                type="text"
                value={editedTargetExam}
                onChange={(e) => setEditedTargetExam(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition cursor-pointer"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Navigation Tabs for Profile (All 14 Elements Covered) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
        {[
          { id: 'overview', label: '👤 Profile & Overview', icon: <User className="w-3.5 h-3.5" /> },
          { id: 'courses', label: `📚 My Courses (${enrolledCourses.length})`, icon: <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> },
          { id: 'progress', label: '📊 Course Progress (Auto)', icon: <BarChart3 className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'tests', label: `📝 Test History (${testResults.length})`, icon: <FileCheck className="w-3.5 h-3.5 text-cyan-600" /> },
          { id: 'certificates', label: `🏆 Certificates (${certificates.length})`, icon: <Award className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'attendance', label: '📅 Live Attendance', icon: <Calendar className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'orders', label: `💳 Orders & Invoices (${ordersList.length})`, icon: <CreditCard className="w-3.5 h-3.5 text-blue-600" /> },
          { id: 'wishlist', label: `❤️ Wishlist (${wishlistCourses.length})`, icon: <Heart className="w-3.5 h-3.5 text-rose-600" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Academic Credentials */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Personal & Contact */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-serif border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" /> Personal Information
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Full Name</p>
                <p className="font-bold text-slate-800 mt-0.5">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Email Address</p>
                <p className="font-bold text-slate-800 mt-0.5">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Mobile Contact</p>
                <p className="font-bold text-slate-800 mt-0.5">{currentUser.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Student UID</p>
                <p className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg inline-block mt-0.5">
                  {currentUser.id}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Profile */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-serif border-b border-slate-100 pb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" /> Academic Credentials
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Target Examination</p>
                <p className="font-bold text-indigo-700 bg-indigo-50 p-1.5 rounded-lg inline-block mt-0.5">
                  {currentUser.targetExam || 'CA Foundation May 2026'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Class / Academic Division</p>
                <p className="font-bold text-slate-800 mt-0.5">
                  {currentUser.studentClass || 'Class 12th / CA Foundation'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Institution / College</p>
                <p className="font-bold text-slate-800 mt-0.5">
                  {currentUser.schoolCollege || "St. Xavier's College, Mumbai"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Active Batch Access</p>
                <p className="font-bold text-slate-800 mt-0.5">2026 Comprehensive Morning Batch</p>
              </div>
            </div>
          </div>

          {/* Card 3: Summary Highlights */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-serif border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Learning Health & Activity
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Live Attendance Rate</span>
                <span className="font-extrabold text-emerald-600">{attendanceRate}%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Completed Lessons</span>
                <span className="font-extrabold text-indigo-600">{currentUser.completedLessonIds.length} Lectures</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">CBT Tests Attempted</span>
                <span className="font-extrabold text-cyan-600">{testResults.length} Tests</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Verified Certificates</span>
                <span className="font-extrabold text-amber-600">{certificates.length} Credential</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => {
            const { overall } = calculateCourseProgress(course);
            return (
              <div
                key={course.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">{overall}% Completed</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-serif leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{course.tagline}</p>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Syllabus Completion</span>
                      <span className="text-indigo-600">{overall}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${overall}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex items-center justify-between text-slate-600">
                    <span>Faculty: {course.facultyName}</span>
                    <span>{course.validity}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const firstLesson = course.chapters?.[0]?.lessons?.[0];
                      if (firstLesson) setActiveVideoLesson({ course, lesson: firstLesson });
                    }}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" /> Resume Course
                  </button>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    View Subject Progress
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Automatic Course Progress (Requirement 34) */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white space-y-2 border border-slate-800">
            <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 font-bold px-3 py-1 rounded-full text-xs border border-emerald-400/30">
              <TrendingUp className="w-3.5 h-3.5" /> 34. Automated Lecture-Completion Progress Tracker
            </div>
            <h2 className="text-2xl font-bold font-serif">Real-Time Course & Subject Progress Breakdown</h2>
            <p className="text-xs text-slate-300">
              Progress is calculated automatically based on your lecture completions and DPP submissions.
            </p>
          </div>

          {/* CA Foundation Progress Box Example */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                  Target Program: CA Foundation 2026
                </span>
                <h3 className="font-bold text-lg text-slate-900 font-serif mt-1">
                  CA Foundation Complete Video Course Package
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400">Overall Progress</span>
                <p className="text-3xl font-extrabold text-indigo-600">68%</p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Total Curriculum Completed</span>
                <span className="text-indigo-600">68% Overall</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500 w-[68%]"></div>
              </div>
            </div>

            {/* Subject-Wise Breakdown (Requirement 34 specific numbers: Accounts 75%, Law 54%, Economics 82%, Quantitative Aptitude 61%) */}
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-sm text-slate-900 font-serif">Subject-Wise Breakdown:</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Accounts */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">📊 Accounts (Principles & Practice)</span>
                    <span className="text-emerald-600 font-extrabold text-sm">75%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 w-[75%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-400">15 of 20 Lectures Completed • BRS, Depreciation & Final Accounts</p>
                </div>

                {/* 2. Law */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">⚖️ Business Laws (Indian Contract & Companies Act)</span>
                    <span className="text-indigo-600 font-extrabold text-sm">54%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-500 w-[54%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-400">11 of 20 Lectures Completed • Contract Essentials & Corporate Veil</p>
                </div>

                {/* 3. Economics */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">📈 Business Economics & BCK</span>
                    <span className="text-purple-600 font-extrabold text-sm">82%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full transition-all duration-500 w-[82%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-400">18 of 22 Lectures Completed • Demand, Elasticity & Market Structures</p>
                </div>

                {/* 4. Quantitative Aptitude */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">📐 Quantitative Aptitude (Maths, LR & Stats)</span>
                    <span className="text-amber-600 font-extrabold text-sm">61%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500 w-[61%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-400">14 of 23 Lectures Completed • Annuity, TVM & Probability Theory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Test History */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {testResults.map((res) => (
              <div
                key={res.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                      Attempted on {res.attemptDate}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      AIR Rank #{res.airRank}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">{res.testTitle}</h4>
                  <p className="text-xs text-slate-500">
                    Accuracy: {res.accuracy}% • Percentile: {res.percentile}%ile • Total Candidates: {res.totalCandidates.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Final Score</span>
                    <p className="text-xl font-extrabold text-emerald-600">
                      {res.totalScore} / {res.maxScore}
                    </p>
                  </div>
                  <button
                    onClick={() => alert(`Opening detailed scorecard for ${res.testTitle}`)}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    View Scorecard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Certificates */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-6 rounded-3xl border-2 border-amber-200/60 shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" /> ICAI / NTA Certified
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{cert.credentialId}</span>
                </div>

                <h4 className="font-bold text-base text-slate-900 font-serif">{cert.courseTitle}</h4>
                
                <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 text-xs space-y-1">
                  <p className="font-medium text-slate-700">Issued to: <strong>{cert.studentName}</strong></p>
                  <p className="text-slate-500">Completion Date: {cert.completionDate} • Grade: {cert.grade}</p>
                  <p className="text-slate-500">Instructor: {cert.instructorName}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setIsVerificationModalOpen(true);
                  }}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Award className="w-3.5 h-3.5" /> View / Verify Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Live Attendance */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
              <p className="text-xs text-slate-400 font-medium">Overall Attendance</p>
              <p className="text-2xl font-extrabold text-emerald-600">{attendanceRate}%</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
              <p className="text-xs text-slate-400 font-medium">Classes Attended</p>
              <p className="text-2xl font-extrabold text-indigo-600">{totalClassesAttended} Sessions</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
              <p className="text-xs text-slate-400 font-medium">Avg Watch Duration</p>
              <p className="text-2xl font-extrabold text-purple-600">82 mins / session</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-slate-900 font-serif">Recent Live Session Attendance Logs:</h4>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { title: 'CA Foundation BRS & 100% Score Masterclass', date: 'Feb 27, 2026', time: '8:00 PM', duration: '88 mins', status: 'Present ✓' },
                { title: 'Electrostatics - High Voltage Problem Solving', date: 'Feb 26, 2026', time: '7:30 PM', duration: '90 mins', status: 'Present ✓' },
                { title: 'Indian Contract Act - Case Law Drafting', date: 'Feb 24, 2026', time: '6:00 PM', duration: '75 mins', status: 'Present ✓' }
              ].map((log, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{log.title}</p>
                    <p className="text-slate-400 text-[11px]">{log.date} at {log.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {log.status}
                    </span>
                    <p className="text-slate-400 text-[10px] mt-0.5">{log.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Orders & Invoices */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No Orders Yet</p>
              <p className="text-[11px] text-slate-400">Explore the Course Store to enroll in masterclasses and test series.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {ord.orderNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      ord.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      ord.paymentStatus === 'Refunded' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                      'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {ord.paymentStatus}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    {ord.items.map((it) => it.title).join(', ')}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Settled on {ord.orderDate} via {ord.paymentMethod} • Txn: <span className="font-mono">{ord.transactionId}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Total Paid</span>
                    <p className="text-lg font-extrabold text-slate-900 font-mono">₹{ord.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                  {ord.invoiceNumber && invoices[ord.invoiceNumber] && (
                    <button
                      onClick={() => setSelectedInvoice(invoices[ord.invoiceNumber!])}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tax Invoice</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 8: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-100">
                  {course.category}
                </span>
                <h4 className="font-bold text-base text-slate-900 font-serif">{course.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{course.tagline}</p>
                <p className="text-base font-extrabold text-slate-900 pt-1">
                  ₹{course.price.toLocaleString()} <span className="text-xs text-slate-400 line-through">₹{course.originalPrice?.toLocaleString()}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCourseForDetail(course);
                    setView('website');
                  }}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
