import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LiveClassRoom } from './LiveClassRoom';
import { VideoPlayerView } from './VideoPlayerView';
import { CbtExamEngine } from './CbtExamEngine';
import { StudyMaterialVault } from './StudyMaterialVault';
import { DoubtForum } from './DoubtForum';
import { AssignmentsPortal } from './AssignmentsPortal';
import { CertificatesView } from './CertificatesView';
import { StudentPerformanceAnalytics } from './StudentPerformanceAnalytics';
import { StudentProfileView } from './StudentProfileView';
import { CourseStoreView } from './CourseStoreView';
import { SubscriptionStoreView } from './SubscriptionStoreView';
import { WishlistView } from './WishlistView';
import {
  BookOpen,
  Radio,
  FileCheck,
  HelpCircle,
  Award,
  FolderDown,
  PlayCircle,
  Clock,
  Flame,
  Star,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  User,
  Zap,
  BarChart3,
  ShoppingBag,
  Crown,
  Heart
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    liveClasses,
    testSeries,
    testResults,
    activeLiveClass,
    setActiveLiveClass,
    activeTest,
    setActiveTest,
    activeVideoLesson,
    setActiveVideoLesson,
    setSelectedCourseForDetail,
    setView
  } = useApp();

  const [studentNav, setStudentNav] = useState<
    | 'overview'
    | 'store'
    | 'subscriptions'
    | 'wishlist'
    | 'classes'
    | 'tests'
    | 'analytics'
    | 'materials'
    | 'doubts'
    | 'assignments'
    | 'certificates'
    | 'profile'
  >('overview');

  // Enrolled courses
  const enrolledCourses = courses.filter((c) => currentUser.enrolledCourseIds.includes(c.id));

  // If currently in a live stream
  if (activeLiveClass) {
    return <LiveClassRoom />;
  }

  // If currently watching a lecture
  if (activeVideoLesson) {
    return <VideoPlayerView />;
  }

  // If currently attempting a CBT exam
  if (activeTest) {
    return <CbtExamEngine />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Student Portal Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
        {[
          { id: 'overview', label: 'My Learning Hub', icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: 'store', label: 'Course Store & Packages', icon: <ShoppingBag className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'subscriptions', label: 'VIP Pass & Subscriptions', icon: <Crown className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'wishlist', label: `My Wishlist (${currentUser.wishlistCourseIds?.length || 0})`, icon: <Heart className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'classes', label: 'Live Classes', icon: <Radio className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'tests', label: 'CBT Test Series', icon: <FileCheck className="w-3.5 h-3.5 text-indigo-600" /> },
          { id: 'materials', label: 'Study Materials (8 Types) & PDF Reader', icon: <FolderDown className="w-3.5 h-3.5 text-amber-600" /> },
          { id: 'assignments', label: 'Assignments & DPPs', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'doubts', label: 'Ask Doubt & Faculty Desk', icon: <HelpCircle className="w-3.5 h-3.5 text-purple-600" /> },
          { id: 'analytics', label: 'Performance Analytics', icon: <BarChart3 className="w-3.5 h-3.5 text-cyan-600" /> },
          { id: 'certificates', label: 'Certificates', icon: <Award className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'profile', label: 'Student Profile & Progress', icon: <User className="w-3.5 h-3.5 text-blue-600" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStudentNav(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              studentNav === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* View routing based on studentNav */}
      {studentNav === 'store' ? (
        <CourseStoreView />
      ) : studentNav === 'subscriptions' ? (
        <SubscriptionStoreView />
      ) : studentNav === 'wishlist' ? (
        <WishlistView />
      ) : studentNav === 'profile' ? (
        <StudentProfileView />
      ) : studentNav === 'materials' ? (
        <StudyMaterialVault />
      ) : studentNav === 'doubts' ? (
        <DoubtForum />
      ) : studentNav === 'assignments' ? (
        <AssignmentsPortal />
      ) : studentNav === 'certificates' ? (
        <CertificatesView />
      ) : studentNav === 'analytics' ? (
        <StudentPerformanceAnalytics />
      ) : studentNav === 'tests' ? (
        /* Test Series List */
        <div className="space-y-6">
          <div className="bg-[#1E293B] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200 space-y-2">
            <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-400/20">
              National Examination Engine
            </span>
            <h2 className="text-2xl font-bold font-sans">All-India Computer-Based Test (CBT) Series</h2>
            <p className="text-xs text-slate-300">
              Exact NTA pattern tests with timer, negative marking, instant AIR rank, and video solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testSeries.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                      {test.category || (test as any).targetExam}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {(test as any).deadline || 'Open All India'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{test.title}</h3>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center text-xs">
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Questions</p>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {test.sections
                          ? test.sections.reduce((acc, s) => acc + s.questions.length, 0)
                          : (test as any).totalQuestions || 90}{' '}
                        Qs
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Time</p>
                      <p className="font-bold text-slate-900 mt-0.5">{test.durationMinutes} mins</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Marks</p>
                      <p className="font-bold text-emerald-600 mt-0.5">{test.totalMarks} Marks</p>
                    </div>
                  </div>
                </div>

                <button
                  id={`launch-test-btn-${test.id}`}
                  onClick={() => setActiveTest(test)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200"
                >
                  <FileCheck className="w-4 h-4 text-amber-300" /> Start CBT Test Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : studentNav === 'classes' ? (
        /* Live Classes List */
        <div className="space-y-6">
          <div className="bg-[#1E293B] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200 space-y-2">
            <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-400/20">
              Real-Time Streaming
            </span>
            <h2 className="text-2xl font-bold font-sans">Today's Live Classroom Schedule</h2>
            <p className="text-xs text-slate-300">
              Interactive 2-way doubt clearing, live polls, and whiteboard notes with Master Faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                        cls.status === 'live'
                          ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {cls.status === 'live' ? '🔴 LIVE NOW' : '📅 UPCOMING'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{cls.startTime} - {cls.endTime}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{cls.title}</h3>

                  <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <img
                      src={cls.facultyAvatar}
                      alt={cls.facultyName}
                      className="w-9 h-9 rounded-full object-cover border border-indigo-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{cls.facultyName}</p>
                      <p className="text-[11px] text-slate-400">
                        {cls.subject} • {cls.scheduledDate}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  id={`join-live-btn-${cls.id}`}
                  onClick={() => setActiveLiveClass(cls)}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    cls.status === 'live'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{cls.status === 'live' ? 'Enter Live Classroom' : 'Set Class Reminder'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Bento Grid Hub */
        <div className="space-y-8">
          {/* Main Bento Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Bento Hero Card: Continue Learning (Col span 2, Row span 2) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group min-h-[360px]">
              <div className="relative z-10 space-y-3">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                  Continue Learning • 34. Course Progress (68%)
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900 font-serif">
                  {enrolledCourses[0]?.title || 'CA Foundation Complete Video Course Package'}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md">
                  Target Exam: {currentUser.targetExam || 'CA Foundation May 2026'}. Current Topic: Bank Reconciliation Statement (Accounts: 75%, Law: 54%, Economics: 82%, QA: 61%).
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Overall Curriculum Progress</span>
                  <span className="text-indigo-600 font-extrabold">68% Completed</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full mb-5 overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[68%] rounded-full transition-all duration-500"></div>
                </div>

                <div className="flex items-center gap-3">
                  {enrolledCourses[0]?.chapters?.[0]?.lessons?.[0] && (
                    <button
                      onClick={() => {
                        const firstCourse = enrolledCourses[0];
                        const firstLesson = firstCourse?.chapters?.[0]?.lessons?.[0];
                        if (firstCourse && firstLesson) {
                          setActiveVideoLesson({ course: firstCourse, lesson: firstLesson });
                        }
                      }}
                      className="bg-indigo-600 text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition cursor-pointer flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" /> Resume Lecture
                    </button>
                  )}
                  <button
                    onClick={() => setStudentNav('profile')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    View Subject Progress
                  </button>
                </div>
              </div>

              {/* Bento Decorative Circular Watermark */}
              <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-indigo-50/70 rounded-full flex items-center justify-center pointer-events-none group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-32 h-32 text-indigo-200/50" />
              </div>
            </div>

            {/* 2. Bento Card: Live Sessions */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 bg-[#1E293B] rounded-3xl p-6 text-white shadow-xl shadow-slate-300 flex flex-col justify-between min-h-[360px]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-base">Live Sessions</h3>
                  <span className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-400/20">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE
                  </span>
                </div>

                <div className="space-y-3">
                  {liveClasses.slice(0, 2).map((cls, idx) => (
                    <div
                      key={cls.id}
                      onClick={() => setActiveLiveClass(cls)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition ${
                        cls.status === 'live' || idx === 0
                          ? 'bg-slate-800/90 border border-slate-700 hover:border-indigo-400'
                          : 'bg-slate-800/40 border border-slate-700/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-indigo-400 mb-1">
                        <span>{cls.subject}</span>
                        <span className="text-slate-400">{cls.startTime}</span>
                      </div>
                      <p className="font-bold text-xs text-white line-clamp-1">{cls.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1">Mentor: {cls.facultyName}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => setStudentNav('classes')}
                  className="w-full bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-center text-slate-200 border border-slate-700"
                >
                  View Full Schedule
                </button>
              </div>
            </div>

            {/* 3. Bento Card: Performance & Rank */}
            <div className="col-span-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance & Rank</h3>
                  <button
                    onClick={() => setStudentNav('analytics')}
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-black text-slate-900 font-serif">AIR 18</span>
                    <span className="block text-[11px] font-bold text-emerald-600 mt-0.5">Top 0.5%ile (99.4%tile)</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-12">
                    <div className="w-2.5 bg-emerald-200 h-[50%] rounded-md"></div>
                    <div className="w-2.5 bg-emerald-300 h-[70%] rounded-md"></div>
                    <div className="w-2.5 bg-emerald-400 h-[85%] rounded-md"></div>
                    <div className="w-2.5 bg-emerald-600 h-[95%] rounded-md"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStudentNav('analytics')}
                className="w-full mt-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-indigo-600" /> Subject & Topic Analytics
              </button>
            </div>

            {/* 4. Bento Card: Upcoming CBT Test */}
            <div className="col-span-1 bg-indigo-600 rounded-3xl p-6 text-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                    National CBT Series
                  </span>
                  <Clock className="w-4 h-4 text-indigo-200" />
                </div>
                <h4 className="font-bold text-base font-serif leading-snug">All-India CA Foundation Grand Mock 04</h4>
                <p className="text-xs text-indigo-100 mt-1">90 Qs • 180 Mins • Standard ICAI Pattern</p>
              </div>
              <button
                onClick={() => setStudentNav('tests')}
                className="w-full mt-4 py-2.5 bg-white text-indigo-900 font-bold rounded-xl text-xs hover:bg-indigo-50 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileCheck className="w-3.5 h-3.5 text-indigo-600" /> Enter CBT Exam Hall
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
