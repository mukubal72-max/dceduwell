import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, TestSeriesExam, UserProfile, LeadItem, LiveClass, Question, LiveClassReminder, LiveClassAttendanceRecord } from '../../types';
import { OrdersManagerView } from './OrdersManagerView';
import { CouponsManagerView } from './CouponsManagerView';
import { CombosManagerView } from './CombosManagerView';
import { SubscriptionsManagerView } from './SubscriptionsManagerView';
import { WishlistMarketingView } from './WishlistMarketingView';
import { NotificationBroadcastView } from './NotificationBroadcastView';
import { CourseAdministrationView } from './CourseAdministrationView';
import { ContentManagerView } from './ContentManagerView';
import {
  Users,
  DollarSign,
  BookOpen,
  Award,
  Plus,
  Trash2,
  TrendingUp,
  Tag,
  FileCheck,
  Star,
  Sparkles,
  Percent,
  Radio,
  ShieldCheck,
  Lock,
  Eye,
  Calendar,
  Clock,
  Play,
  CheckCircle2,
  Video,
  AlertTriangle,
  Layers,
  FileText,
  Database,
  Bell,
  CheckSquare,
  Hash,
  Send,
  Download,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  UserCheck,
  Filter,
  Search,
  Check,
  X,
  ShoppingBag,
  Crown,
  Heart
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    courses,
    setCourses,
    testSeries,
    setTestSeries,
    allUsers,
    leads,
    orders,
    doubts,
    liveClasses,
    scheduleLiveClass,
    updateLiveClassStatus,
    deleteLiveClass,
    toggleLessonFreeStatus,
    setActiveLiveClass,
    questionBank,
    addQuestionToBank,
    deleteQuestionFromBank,
    createTestSeries,
    deleteTestSeries,
    liveReminders,
    scheduleLiveReminder,
    triggerReminderSimulation,
    attendanceRecords,
    liveRecordings,
    publishLiveRecording
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'cms' | 'courses' | 'combos' | 'subscriptions' | 'coupons' | 'orders' | 'wishlist_crm' | 'notification_broadcast' | 'live_classes' | 'question_bank' | 'tests' | 'content_security' | 'students' | 'crm'
  >('analytics');

  // Course batch creation modal state
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('JEE (Main & Adv)');
  const [newCoursePrice, setNewCoursePrice] = useState(14999);
  const [newCourseOriginalPrice, setNewCourseOriginalPrice] = useState(24999);
  const [newCourseDiscount, setNewCourseDiscount] = useState(40);
  const [newCourseRating, setNewCourseRating] = useState(4.9);
  const [newCourseReviews, setNewCourseReviews] = useState(180);
  const [newCourseFaculty, setNewCourseFaculty] = useState('Er. Rajeshwar Varma');

  // Live class scheduling modal state
  const [showScheduleLiveModal, setShowScheduleLiveModal] = useState(false);
  const [liveCourseId, setLiveCourseId] = useState(courses[0]?.id || '');
  const [liveBatchName, setLiveBatchName] = useState('Pinnacle Morning Star Batch');
  const [liveSubject, setLiveSubject] = useState('Physics');
  const [liveFaculty, setLiveFaculty] = useState('Er. Rajeshwar Varma');
  const [liveDate, setLiveDate] = useState('2026-08-28');
  const [liveStartTime, setLiveStartTime] = useState('18:00');
  const [liveEndTime, setLiveEndTime] = useState('19:30');
  const [liveTopic, setLiveTopic] = useState('');
  const [liveDescription, setLiveDescription] = useState('');
  const [liveIsFree, setLiveIsFree] = useState(false);

  // Live sub-tabs
  const [liveSubTab, setLiveSubTab] = useState<'schedule' | 'attendance' | 'reminders' | 'recordings'>('schedule');

  // Question Bank management state
  const [qbSearch, setQbSearch] = useState('');
  const [qbSubjectFilter, setQbSubjectFilter] = useState('All');
  const [qbTypeFilter, setQbTypeFilter] = useState('All');
  const [qbDifficultyFilter, setQbDifficultyFilter] = useState('All');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  // New Question Form state
  const [newQSubject, setNewQSubject] = useState('Physics');
  const [newQChapter, setNewQChapter] = useState('Rotational Dynamics');
  const [newQTopic, setNewQTopic] = useState('Moment of Inertia');
  const [newQDifficulty, setNewQDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newQType, setNewQType] = useState<Question['type']>('single_correct');
  const [newQText, setNewQText] = useState('');
  const [newQMarks, setNewQMarks] = useState(4);
  const [newQNegMarks, setNewQNegMarks] = useState(1);
  const [newQExplanation, setNewQExplanation] = useState('');
  // MCQ Options
  const [newQOptions, setNewQOptions] = useState(['', '', '', '']);
  const [newQCorrectSingle, setNewQCorrectSingle] = useState(0);
  const [newQCorrectMulti, setNewQCorrectMulti] = useState<number[]>([0]);
  // True/False
  const [newQCorrectTf, setNewQCorrectTf] = useState<boolean>(true);
  // Fill in blank / Numerical
  const [newQCorrectText, setNewQCorrectText] = useState('');
  const [newQTolerance, setNewQTolerance] = useState(0.05);
  // Match the following
  const [newQMatchPairs, setNewQMatchPairs] = useState([
    { left: 'Column I Item A', right: 'Column II Match 1' },
    { left: 'Column I Item B', right: 'Column II Match 2' },
  ]);
  // Subjective
  const [newQModelAnswer, setNewQModelAnswer] = useState('');

  // Test Series creation state
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestCategory, setNewTestCategory] = useState('JEE (Main & Adv)');
  const [newTestType, setNewTestType] = useState<'chapter_test' | 'subject_wise' | 'revision_test' | 'mock_test' | 'full_syllabus'>('mock_test');
  const [newTestDuration, setNewTestDuration] = useState(180);
  const [newTestPassingMarks, setNewTestPassingMarks] = useState(120);

  // Metrics calculations
  const totalRevenue = courses.reduce((acc, c) => acc + (c.enrolledCount * c.price), 0);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const price = Number(newCoursePrice) || 0;
    const origPrice = Number(newCourseOriginalPrice) || Math.round(price * 1.5);
    const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : Number(newCourseDiscount) || 0;

    const created: Course = {
      id: `crs-${Date.now()}`,
      title: newCourseTitle,
      tagline: 'Comprehensive structured curriculum with live classes, study notes and test series.',
      category: newCourseCategory as any,
      format: 'Comprehensive Live',
      targetExam: newCourseCategory,
      language: 'English & Hinglish',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
      price: price,
      originalPrice: origPrice,
      discountPercentage: discount,
      rating: Number(newCourseRating) || 4.9,
      reviewsCount: Number(newCourseReviews) || 120,
      enrolledCount: 1,
      facultyName: newCourseFaculty,
      facultyDesignation: 'Master Faculty & Department Lead',
      facultyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      facultyBio: 'Renowned senior academician & mentor.',
      validity: '12 Months Access',
      startDate: 'Immediate Access',
      isFeatured: false,
      isPopular: true,
      includesTestSeries: true,
      includesHardcopyBooks: true,
      certificateProvided: true,
      features: ['Live Interactive Sessions', 'Comprehensive DPP Sets', 'All-India Test Series'],
      chapters: [
        {
          id: `ch-1`,
          title: 'Foundation & Core Concepts',
          subject: 'Core Science',
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: 'Introductory Lecture & Formula Blueprint',
              durationMinutes: 45,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              summary: 'Essential ground rules and problem-solving strategy.',
              isFreePreview: true,
              timestamps: []
            }
          ]
        }
      ]
    };

    setCourses(prev => [created, ...prev]);
    setShowAddCourseModal(false);
    setNewCourseTitle('');
  };

  const handleScheduleLiveClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTopic.trim()) return;

    const matchedCourse = courses.find(c => c.id === liveCourseId) || courses[0];

    const newClass: LiveClass = {
      id: `live-cls-${Date.now()}`,
      title: `${liveIsFree ? '🌟 [FREE MASTERCLASS]' : '🔴 [BATCH LIVE]'} ${liveTopic}`,
      courseId: matchedCourse.id,
      courseTitle: matchedCourse.title,
      batchName: liveBatchName,
      subject: liveSubject,
      facultyName: liveFaculty,
      facultyAvatar: matchedCourse.facultyAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      status: 'upcoming',
      scheduledTime: `${liveDate} at ${liveStartTime}`,
      date: liveDate,
      startTime: liveStartTime,
      endTime: liveEndTime,
      durationMinutes: 90,
      attendeesCount: 0,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      topic: liveTopic,
      description: liveDescription || `Live interactive session on ${liveTopic} with doubt resolution and whiteboard diagrams.`,
      topicsCovered: [
        `${liveTopic} - Core Concept Analysis`,
        'Advanced Problem Solving & Tricky Corner Cases',
        'Live Q&A and Whiteboard Formula Derivation'
      ],
      isFree: liveIsFree
    };

    scheduleLiveClass(newClass);
    setShowScheduleLiveModal(false);
    setLiveTopic('');
    setLiveDescription('');
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim()) return;

    let finalCorrectAnswer: any = newQCorrectSingle;
    if (newQType === 'multiple_correct') finalCorrectAnswer = newQCorrectMulti;
    else if (newQType === 'true_false') finalCorrectAnswer = newQCorrectTf;
    else if (newQType === 'fill_in_blank' || newQType === 'numerical') finalCorrectAnswer = newQCorrectText;
    else if (newQType === 'subjective') finalCorrectAnswer = 'Subjective / Evaluated against model rubric';
    else if (newQType === 'match_following') finalCorrectAnswer = newQMatchPairs;

    const question: Question = {
      id: `q-bank-${Date.now()}`,
      subject: newQSubject,
      chapter: newQChapter,
      topic: newQTopic,
      difficulty: newQDifficulty,
      type: newQType,
      questionText: newQText,
      marks: Number(newQMarks),
      negativeMarks: Number(newQNegMarks),
      explanation: newQExplanation || 'Verified step-by-step mathematical logic and conceptual proof by expert academic faculty.',
      correctAnswer: finalCorrectAnswer,
      options: ['single_correct', 'multiple_correct'].includes(newQType) ? newQOptions.filter(o => o.trim() !== '') : undefined,
      matchPairs: newQType === 'match_following' ? newQMatchPairs : undefined,
      numericalTolerance: newQType === 'numerical' ? Number(newQTolerance) : undefined,
      subjectiveModelAnswer: newQType === 'subjective' ? newQModelAnswer : undefined
    };

    addQuestionToBank(question);
    setShowAddQuestionModal(false);
    setNewQText('');
    setNewQExplanation('');
  };

  const handleCreateTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;

    const relevantQuestions = questionBank.filter(q => q.subject.toLowerCase() === 'physics' || q.subject.toLowerCase() === 'mathematics').slice(0, 5);
    const testQuestions = relevantQuestions.length > 0 ? relevantQuestions : questionBank.slice(0, 4);
    const totalMarks = testQuestions.reduce((acc, q) => acc + q.marks, 0);

    const newExam: TestSeriesExam = {
      id: `test-${Date.now()}`,
      title: newTestTitle,
      category: newTestCategory as any,
      testType: newTestType as any,
      type: newTestType,
      totalQuestions: testQuestions.length,
      isFree: false,
      durationMinutes: Number(newTestDuration),
      totalMarks: totalMarks || 100,
      passingMarks: Number(newTestPassingMarks),
      negativeMarkingRatio: '1/4 Negative Marking',
      syllabusCovered: 'Comprehensive syllabus covering all essential core units, advanced derivations, and conceptual problems.',
      attemptsCount: 0,
      sections: [
        {
          name: 'Section A: Analytical & Objective Framework',
          questions: testQuestions
        }
      ]
    };

    createTestSeries(newExam);
    setShowCreateTestModal(false);
    setNewTestTitle('');
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to deactivate this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  // Filter questions in Question Bank
  const filteredQuestions = questionBank.filter((q) => {
    const matchesSearch = q.questionText.toLowerCase().includes(qbSearch.toLowerCase()) || q.topic.toLowerCase().includes(qbSearch.toLowerCase()) || q.chapter.toLowerCase().includes(qbSearch.toLowerCase());
    const matchesSubject = qbSubjectFilter === 'All' || q.subject === qbSubjectFilter;
    const matchesType = qbTypeFilter === 'All' || q.type === qbTypeFilter;
    const matchesDifficulty = qbDifficultyFilter === 'All' || q.difficulty === qbDifficultyFilter;
    return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#1E293B] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/20">
              Super Admin & Academic Operations
            </span>
            <span className="text-xs text-slate-400 font-mono">v4.8 Enterprise</span>
          </div>
          <h1 className="text-2xl font-bold font-sans mt-2">Master Academy Control Center</h1>
          <p className="text-xs text-slate-300 mt-1">
            Institutional governance: curricula packages, live classrooms, centralized question bank (7 types), automated reminders, attendance, video security DRM, and CBT test series.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowScheduleLiveModal(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Radio className="w-4 h-4" /> Schedule Live Class
          </button>
          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Database className="w-4 h-4" /> Add Question
          </button>
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Create Course Batch
          </button>
        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
        {[
          { id: 'analytics', label: 'Executive Analytics', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { id: 'cms', label: 'Content Management (CMS)', icon: <FileText className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'courses', label: 'Course Batches', icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: 'combos', label: 'Combo Packages & Bundles', icon: <Layers className="w-3.5 h-3.5 text-indigo-600" /> },
          { id: 'subscriptions', label: 'VIP Subscriptions & Plans', icon: <Crown className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'coupons', label: 'Discount Coupons & Offers', icon: <Tag className="w-3.5 h-3.5 text-amber-600" /> },
          { id: 'orders', label: 'Order & Revenue Management', icon: <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'wishlist_crm', label: 'Wishlist CRM & Remarketing', icon: <Heart className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'notification_broadcast', label: 'Omnichannel Notifications', icon: <Bell className="w-3.5 h-3.5 text-indigo-600" /> },
          { id: 'live_classes', label: 'Live Classroom, Reminders & Attendance', icon: <Radio className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'question_bank', label: `Question Bank (${questionBank.length})`, icon: <Database className="w-3.5 h-3.5 text-purple-600" /> },
          { id: 'tests', label: `Test Series Engine (${testSeries.length})`, icon: <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'content_security', label: 'Free/Paid & Video DRM Security', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'students', label: 'Student Directory & KYC', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'crm', label: 'Admissions & CRM Funnel', icon: <DollarSign className="w-3.5 h-3.5" /> }
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

      {/* 1. EXECUTIVE ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Header Overview Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  Live Operations Center
                </span>
                <span className="text-xs text-slate-300 font-mono">Academic & Revenue Hub</span>
              </div>
              <h2 className="text-xl font-bold font-sans mt-1">Admin Executive Overview</h2>
              <p className="text-xs text-slate-300 max-w-2xl">
                Real-time visibility across admissions, faculty performance, course revenue, live classes, student doubt resolution, and CBT examination operations.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-300">Quick Switch:</span>
              <button
                onClick={() => setActiveTab('cms')}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Content CMS
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Course Admin
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Orders & CRM
              </button>
            </div>
          </div>

          {/* 11 METRICS KPI GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 text-xs">
            {/* 1. Total Students */}
            <div
              onClick={() => setActiveTab('students')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Total Students</span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-sans">
                {allUsers?.length ? allUsers.length.toLocaleString() : '5,420'}
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Registered User Base</p>
            </div>

            {/* 2. Active Students */}
            <div
              onClick={() => setActiveTab('students')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Active Students</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 font-sans">
                {courses.reduce((a, c) => a + c.enrolledCount, 0).toLocaleString()}
              </div>
              <p className="text-[10px] text-emerald-700 font-medium">Enrolled in Batches</p>
            </div>

            {/* 3. Total Faculty */}
            <div
              onClick={() => setActiveTab('courses')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Total Faculty</span>
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-900 font-sans">18</div>
              <p className="text-[10px] text-purple-900 font-medium">Master & Senior Educators</p>
            </div>

            {/* 4. Total Courses */}
            <div
              onClick={() => setActiveTab('courses')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Total Courses</span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-sans">{courses.length}</div>
              <p className="text-[10px] text-indigo-900 font-medium">Active & Staged Batches</p>
            </div>

            {/* 5. Total Orders */}
            <div
              onClick={() => setActiveTab('orders')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-emerald-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-sans">
                {orders?.length ? orders.length.toLocaleString() : '1,420'}
              </div>
              <p className="text-[10px] text-emerald-700 font-medium">Processed Transactions</p>
            </div>

            {/* 6. Today's Revenue */}
            <div
              onClick={() => setActiveTab('orders')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-emerald-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Today's Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 font-sans">₹84,500</div>
              <p className="text-[10px] text-emerald-700 font-medium">Daily Net Realized</p>
            </div>

            {/* 7. Monthly Revenue */}
            <div
              onClick={() => setActiveTab('orders')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-emerald-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Monthly Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 font-sans">₹21,40,000</div>
              <p className="text-[10px] text-emerald-700 font-medium">+18.4% vs prev month</p>
            </div>

            {/* 8. Live Classes */}
            <div
              onClick={() => setActiveTab('live_classes')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-rose-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Live Classes</span>
                <Radio className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700 font-sans">{liveClasses.length}</div>
              <p className="text-[10px] text-rose-700 font-medium">
                {liveClasses.filter(l => l.status === 'live').length} Streaming Right Now
              </p>
            </div>

            {/* 9. Tests */}
            <div
              onClick={() => setActiveTab('tests')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-purple-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Tests & Exams</span>
                <FileCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-purple-900 font-sans">{testSeries.length}</div>
              <p className="text-[10px] text-purple-900 font-medium">CBT Pattern Mock Tests</p>
            </div>

            {/* 10. Pending Doubts */}
            <div
              onClick={() => setActiveTab('students')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-amber-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Pending Doubts</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-800 font-sans">
                {doubts?.filter(d => d.status === 'pending' || d.status === 'unresolved').length || 14}
              </div>
              <p className="text-[10px] text-amber-800 font-medium">Awaiting Faculty Reply</p>
            </div>

            {/* 11. New Leads */}
            <div
              onClick={() => setActiveTab('crm')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>New Leads</span>
                <UserCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-indigo-950 font-sans">{leads?.length || 38}</div>
              <p className="text-[10px] text-indigo-900 font-medium">Admissions Pipeline</p>
            </div>

            {/* 12. Question Bank */}
            <div
              onClick={() => setActiveTab('question_bank')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-purple-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Question Bank</span>
                <Database className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-sans">{questionBank.length}</div>
              <p className="text-[10px] text-purple-900 font-medium">7 Type Multi-Discipline Bank</p>
            </div>

            {/* 13. Content Assets (CMS) */}
            <div
              onClick={() => setActiveTab('cms')}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-amber-400 cursor-pointer transition"
            >
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <span>Content Assets (CMS)</span>
                <FileText className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-sans">9 Modules</div>
              <p className="text-[10px] text-amber-800 font-medium">Videos, PDFs, Notes, Banners, FAQs</p>
            </div>
          </div>

          {/* Top Batches Performance Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 font-sans">Top Performing Batches & Revenue Realization</h3>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1"
              >
                Manage All Batches <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Course Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Batch Name</th>
                    <th className="pb-3">Lead Faculty</th>
                    <th className="pb-3">Enrolled</th>
                    <th className="pb-3">Validity</th>
                    <th className="pb-3">Gross Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-900">{c.title}</td>
                      <td className="py-3 text-slate-600">{c.category}</td>
                      <td className="py-3 font-bold text-indigo-900">{c.batchName || 'General Cohort'}</td>
                      <td className="py-3 text-slate-700">{c.facultyName}</td>
                      <td className="py-3 font-bold text-indigo-600">{c.enrolledCount.toLocaleString()}</td>
                      <td className="py-3 text-slate-500 font-mono text-[11px]">{c.validity || '12 Months'}</td>
                      <td className="py-3 font-bold text-emerald-600">₹{(c.enrolledCount * c.price).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ORDER & REVENUE MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <OrdersManagerView />
      )}

      {/* WISHLIST MARKETING & CRM TAB */}
      {activeTab === 'wishlist_crm' && (
        <WishlistMarketingView />
      )}

      {/* OMNICHANNEL NOTIFICATION BROADCAST TAB */}
      {activeTab === 'notification_broadcast' && (
        <NotificationBroadcastView />
      )}

      {/* 2. LIVE CLASSROOM, RECORDINGS, REMINDERS & ATTENDANCE HUB */}
      {activeTab === 'live_classes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
                Live Classroom Operations, Recordings, Reminders & Attendance Hub
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage live broadcasts, dispatch 24h/1h/15m push/SMS/email reminders, track student attendance ledgers, and publish DRM recordings.
              </p>
            </div>
            
            <button
              onClick={() => setShowScheduleLiveModal(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" /> Schedule New Session
            </button>
          </div>

          {/* Sub-Tabs for Live Operations */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit text-xs font-bold">
            <button
              onClick={() => setLiveSubTab('schedule')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                liveSubTab === 'schedule' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-rose-600" />
              <span>Live Sessions ({liveClasses.length})</span>
            </button>
            <button
              onClick={() => setLiveSubTab('attendance')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                liveSubTab === 'attendance' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Attendance Ledger ({attendanceRecords.length})</span>
            </button>
            <button
              onClick={() => setLiveSubTab('reminders')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                liveSubTab === 'reminders' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Automated Reminders ({liveReminders.length})</span>
            </button>
            <button
              onClick={() => setLiveSubTab('recordings')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                liveSubTab === 'recordings' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-emerald-600" />
              <span>Class Recordings ({liveRecordings.length})</span>
            </button>
          </div>

          {/* Sub-tab 1: Schedule */}
          {liveSubTab === 'schedule' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveClasses.map((lc) => (
                <div key={lc.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-indigo-300 transition">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        lc.status === 'live'
                          ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                          : lc.status === 'completed'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                      }`}>
                        {lc.status === 'live' ? '🔴 Live Streaming Now' : lc.status === 'completed' ? 'Archived Video' : 'Upcoming'}
                      </span>

                      {lc.isFree ? (
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                          🌟 Free Demo Access
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                          🔒 Enrolled Batch
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 font-sans line-clamp-2">{lc.title}</h4>
                    
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs border border-slate-100">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Course:</span>
                        <span className="font-semibold text-slate-900 line-clamp-1">{lc.courseTitle}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Batch:</span>
                        <span className="font-semibold text-slate-900">{lc.batchName || 'Main Batch'}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Faculty:</span>
                        <span className="font-semibold text-slate-900">{lc.facultyName}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Time:</span>
                        <span className="font-semibold text-indigo-700">{lc.date || 'Today'} • {lc.startTime || '19:30'} - {lc.endTime || '21:00'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{lc.attendeesCount} Students Enrolled</span>
                      <button
                        onClick={() => deleteLiveClass(lc.id)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded transition cursor-pointer"
                        title="Cancel Class"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {lc.status !== 'live' ? (
                        <button
                          onClick={() => {
                            updateLiveClassStatus(lc.id, 'live');
                            setActiveLiveClass(lc);
                          }}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Radio className="w-3.5 h-3.5" /> Start Live Stream
                        </button>
                      ) : (
                        <button
                          onClick={() => updateLiveClassStatus(lc.id, 'completed')}
                          className="flex-1 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> End & Archive Recording
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sub-tab 2: Attendance Management */}
          {liveSubTab === 'attendance' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">Live Attendance Ledger & Analytics</h4>
                  <p className="text-xs text-slate-500">Track total students, present vs absent count, joining and leaving timestamps, and total attended duration.</p>
                </div>

                <button
                  onClick={() => alert('Attendance report exported to CSV successfully!')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-300"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" /> Export Attendance CSV
                </button>
              </div>

              {/* Attendance Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-800">Total Enrolled in Batch</span>
                  <p className="text-xl font-black text-indigo-950">50 Students</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-800">Present (Active)</span>
                  <p className="text-xl font-black text-emerald-700">{attendanceRecords.filter(a => a.status === 'present').length} Students</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-800">Absent / Missed</span>
                  <p className="text-xl font-black text-rose-700">{attendanceRecords.filter(a => a.status === 'absent').length} Students</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800">Average Attendance Rate</span>
                  <p className="text-xl font-black text-amber-900">87.5%</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Student Name & Roll No</th>
                      <th className="pb-3">Class Session</th>
                      <th className="pb-3">Joining Time</th>
                      <th className="pb-3">Leaving Time</th>
                      <th className="pb-3">Duration Attended</th>
                      <th className="pb-3">Attendance %</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attendanceRecords.map(rec => (
                      <tr key={rec.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900">{rec.studentName}</td>
                        <td className="py-3 text-slate-600 line-clamp-1">{rec.liveClassTitle}</td>
                        <td className="py-3 text-slate-700 font-mono">{rec.joiningTime}</td>
                        <td className="py-3 text-slate-700 font-mono">{rec.leavingTime || 'In Session...'}</td>
                        <td className="py-3 font-semibold text-indigo-900">{rec.totalDurationMinutes} mins</td>
                        <td className="py-3 font-bold text-emerald-700">{rec.attendancePercentage}%</td>
                        <td className="py-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                            rec.status === 'present'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : rec.status === 'late'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-tab 3: Automated Live Class Reminders */}
          {liveSubTab === 'reminders' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">Automated Multi-Channel Reminders System</h4>
                  <p className="text-xs text-slate-500">
                    Automated notification dispatches: 24 hours before, 1 hour before, 15 minutes before, and Class Starting Now via Push, Email, SMS & WhatsApp.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveReminders.map((rem) => (
                  <div key={rem.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          rem.status === 'sent'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rem.status === 'sent' ? '✓ Dispatched' : '⏳ Scheduled to Fire'}
                        </span>

                        <span className="text-[10px] font-bold text-slate-500 uppercase">{rem.interval}</span>
                      </div>

                      <h5 className="font-bold text-xs text-slate-900">{rem.liveClassTitle}</h5>
                      <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 font-mono">
                        "{rem.messageTemplate}"
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] font-semibold text-slate-400">Delivery Channels:</span>
                        {rem.deliveryChannels.map((ch, idx) => (
                          <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 uppercase">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Target Time: {rem.scheduledTriggerTime}</span>
                      <button
                        onClick={() => triggerReminderSimulation(rem.id)}
                        className="px-3 py-1 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Send className="w-3 h-3 text-amber-400" /> Simulate Dispatch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-tab 4: Lecture Recordings Workflow */}
          {liveSubTab === 'recordings' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">Live Class Recording & Auto-Publishing Workflow</h4>
                  <p className="text-xs text-slate-500">Live Class Ends → Automatically/Manually Published → Linked to Course/Batch → Protected by Hardware DRM.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveRecordings.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          rec.recordingPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {rec.recordingPublished ? '✓ Published to Students' : 'Draft / Processing'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">{rec.durationMinutes} Mins Recorded</span>
                      </div>

                      <h5 className="font-bold text-xs text-slate-900">{rec.title}</h5>
                      <p className="text-xs text-slate-600">Linked Course: <strong>{rec.courseTitle}</strong></p>
                      
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Security DRM:</span>
                          <span className="font-bold text-emerald-700">AES-128 Encrypted HLS</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Watermarking:</span>
                          <span className="font-bold text-emerald-700">Dynamic Moving User ID</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Downloads:</span>
                          <span className="font-bold text-rose-700">Strictly Restricted</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{rec.scheduledTime}</span>
                      <button
                        onClick={() => publishLiveRecording(rec.id)}
                        className={`px-3 py-1 font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1 ${
                          rec.recordingPublished
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {rec.recordingPublished ? 'Republish / Update' : 'Publish to Students'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. CENTRALIZED QUESTION BANK TAB (7 TYPES) */}
      {activeTab === 'question_bank' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" />
                Centralized Academic Question Bank Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Support for 7 Question Types: Single Correct MCQ, Multiple Correct MCQ, True/False, Fill in Blank, Match Column, Numerical, and Subjective (Descriptive).
              </p>
            </div>

            <button
              onClick={() => setShowAddQuestionModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" /> Add New Question
            </button>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={qbSearch}
                onChange={(e) => setQbSearch(e.target.value)}
                placeholder="Search questions by topic, chapter, keyword..."
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={qbSubjectFilter}
                onChange={(e) => setQbSubjectFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
              >
                <option value="All">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Accounting">Accounting (CA)</option>
                <option value="Business Law">Business Law (CA)</option>
                <option value="Biology">Biology</option>
              </select>

              <select
                value={qbTypeFilter}
                onChange={(e) => setQbTypeFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
              >
                <option value="All">All 7 Question Types</option>
                <option value="single_correct">Single Correct MCQ</option>
                <option value="multiple_correct">Multiple Correct MCQ</option>
                <option value="true_false">True / False</option>
                <option value="fill_in_blank">Fill in the Blank</option>
                <option value="match_following">Match the Following</option>
                <option value="numerical">Numerical Value</option>
                <option value="subjective">Subjective / Descriptive</option>
              </select>

              <select
                value={qbDifficultyFilter}
                onChange={(e) => setQbDifficultyFilter(e.target.value)}
                className="p-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard / Advanced</option>
              </select>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
                No questions found matching your filter criteria.
              </div>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-xs">Q{idx + 1}.</span>
                      <span className="text-[10px] font-bold uppercase bg-purple-50 text-purple-900 px-2 py-0.5 rounded border border-purple-200">
                        {q.type.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded">
                        {q.subject} • {q.chapter}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">({q.topic})</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="text-emerald-700">+{q.marks} Marks</span>
                      <span className="text-rose-600">-{q.negativeMarks} Neg</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-800' : q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
                      }`}>
                        {q.difficulty}
                      </span>
                      <button
                        onClick={() => deleteQuestionFromBank(q.id)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded transition cursor-pointer"
                        title="Delete from Question Bank"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-900 font-medium leading-relaxed">{q.questionText}</p>

                  {/* Options display */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(oIdx) : q.correctAnswer === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-xl border ${
                              isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + oIdx)}) {opt}</span>
                            {isCorrect && <span className="text-[10px] text-emerald-700 font-black ml-2">✓ (Key)</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'match_following' && q.matchPairs && (
                    <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-700">Column I & Column II Matches:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.matchPairs.map((p, pIdx) => (
                          <div key={pIdx} className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{p.left}</span>
                            <span className="font-bold text-indigo-700">→ {p.right}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {q.type === 'numerical' && (
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center gap-4">
                      <span>Correct Numerical Value: <strong className="font-mono text-emerald-700">{q.correctAnswer}</strong></span>
                      {q.numericalTolerance !== undefined && <span className="text-slate-500">Tolerance: ±{q.numericalTolerance}</span>}
                    </div>
                  )}

                  {q.type === 'subjective' && q.subjectiveModelAnswer && (
                    <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-1">
                      <span className="font-bold text-indigo-900">Faculty Model Answer Rubric:</span>
                      <p className="text-slate-700 whitespace-pre-line">{q.subjectiveModelAnswer}</p>
                    </div>
                  )}

                  {/* Step-by-Step Proof */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Explanation & Proof:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. TEST SERIES PLATFORM & CBT ENGINE TAB */}
      {activeTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                Online Test Series & Examination Platform Manager
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure Chapter Tests, Subject-wise Tests, Revision Tests, Mock Tests, and Full Syllabus Tests with NTA Percentile and All-India Rank (AIR) generation.
              </p>
            </div>

            <button
              onClick={() => setShowCreateTestModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" /> Create Test Series
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testSeries.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-emerald-300 transition">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 capitalize">
                      {t.type?.replace('_', ' ') || 'Mock Test'}
                    </span>
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded">
                      {t.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 font-sans line-clamp-2 leading-snug">{t.title}</h4>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs border border-slate-100">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Duration:</span>
                      <strong className="text-slate-900">{t.durationMinutes} Minutes</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Total Marks:</span>
                      <strong className="text-indigo-700">{t.totalMarks} Marks</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Negative Marking:</span>
                      <span className="text-rose-600 font-semibold">{t.negativeMarkingRatio}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Questions:</span>
                      <span className="font-semibold text-slate-800">
                        {t.sections.reduce((acc, sec) => acc + sec.questions.length, 0)} Questions
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2">{t.syllabusCovered}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t.attemptsCount.toLocaleString()} Candidates Attempted</span>
                  <button
                    onClick={() => deleteTestSeries(t.id)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded transition cursor-pointer"
                    title="Delete Test"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CONTENT SECURITY TAB */}
      {activeTab === 'content_security' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    Video Security Engine Active
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Widevine L1 / FairPlay Ready</span>
                </div>
                <h3 className="text-lg font-bold font-serif mt-1">Anti-Piracy, DRM & Access Permissions Matrix</h3>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Configure free demo previews vs paid locks on chapters and lectures. Video streams are automatically wrapped in hardware-bound DRM and forensic moving watermarks.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1 text-xs shrink-0">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" /> 1-Device Strict Lock
                </div>
                <p className="text-[10px] text-slate-300">Signed URL Token Exp: 4 Hours</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-slate-800">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Stream Protocol</span>
                <span className="font-bold text-white">AES-128 Encrypted HLS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Forensic Watermarking</span>
                <span className="font-bold text-emerald-400">Dynamic Bouncing Tag</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Screen Capture Defense</span>
                <span className="font-bold text-white">Tab Blur & Dimming</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Download Restrictions</span>
                <span className="font-bold text-amber-400">Context Menu Disabled</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 font-serif">Granular Content Permissions (Free Demo vs Paid Enrolled)</h4>
            <div className="space-y-4">
              {courses.map((c) => (
                <div key={c.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <h5 className="font-bold text-xs text-slate-900 mt-0.5">{c.title}</h5>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">₹{c.price.toLocaleString('en-IN')} MRP</span>
                  </div>

                  {c.chapters?.map((ch) => (
                    <div key={ch.id} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800">
                        Chapter: {ch.title} ({ch.subject})
                      </span>
                      <div className="space-y-1.5">
                        {ch.lessons?.map((les) => (
                          <div
                            key={les.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <Video className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span className="font-medium text-slate-800">{les.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({les.durationMinutes}m)</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {les.isFreePreview ? (
                                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> Free Demo
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded flex items-center gap-1">
                                  <Lock className="w-3 h-3" /> Paid Lock
                                </span>
                              )}

                              <button
                                onClick={() => toggleLessonFreeStatus(c.id, ch.id, les.id)}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-700 cursor-pointer transition shadow-2xs"
                              >
                                Switch to {les.isFreePreview ? 'Paid Only' : 'Free Demo'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT MANAGEMENT SYSTEM (CMS) TAB */}
      {activeTab === 'cms' && (
        <ContentManagerView />
      )}

      {/* 6. COURSES & BATCHES ADMINISTRATION TAB */}
      {activeTab === 'courses' && (
        <CourseAdministrationView />
      )}

      {/* 7. STUDENTS TAB */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 font-serif">Registered Student Directory</h3>
            <span className="text-xs text-slate-500">{allUsers?.length || 0} Total Users</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Email / Phone</th>
                  <th className="pb-3">Target Exam</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Enrolled Batches</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(allUsers || []).map(user => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-900 flex items-center gap-2">
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                      {user.name}
                    </td>
                    <td className="py-3 text-slate-600">{user.email}</td>
                    <td className="py-3 font-semibold text-slate-700">{user.targetExam || 'General'}</td>
                    <td className="py-3 capitalize text-indigo-900 font-bold">{user.role}</td>
                    <td className="py-3 text-slate-600">{user.enrolledCourseIds?.length || 0} Batches</td>
                    <td className="py-3">
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. CRM TAB */}
      {activeTab === 'crm' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 font-serif">Incoming Student Enquiry & Admissions Pipeline</h3>
            <span className="text-xs text-slate-500 font-medium">{leads?.length || 0} Leads in Funnel</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Target Exam</th>
                  <th className="pb-3">Stage</th>
                  <th className="pb-3">Counsellor</th>
                  <th className="pb-3">Deal Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-900">{lead.studentName}</td>
                    <td className="py-3 text-slate-600">{lead.phone} • {lead.city}</td>
                    <td className="py-3 font-semibold text-indigo-950">{lead.targetCourse}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-900">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600">{lead.counsellorName}</td>
                    <td className="py-3 text-emerald-700 font-bold">₹{lead.dealValue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMBO PACKAGES TAB */}
      {activeTab === 'combos' && (
        <CombosManagerView />
      )}

      {/* VIP SUBSCRIPTIONS TAB */}
      {activeTab === 'subscriptions' && (
        <SubscriptionsManagerView />
      )}

      {/* COUPONS TAB */}
      {activeTab === 'coupons' && (
        <CouponsManagerView />
      )}

      {/* ADD QUESTION MODAL (7 TYPES) */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-600" /> Add Question to Centralized Bank
              </h3>
              <button onClick={() => setShowAddQuestionModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddQuestionSubmit} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={newQSubject}
                    onChange={(e) => setNewQSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chapter *</label>
                  <input
                    type="text"
                    required
                    value={newQChapter}
                    onChange={(e) => setNewQChapter(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic *</label>
                  <input
                    type="text"
                    required
                    value={newQTopic}
                    onChange={(e) => setNewQTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Question Type *</label>
                  <select
                    value={newQType}
                    onChange={(e) => setNewQType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 bg-white font-semibold text-purple-900"
                  >
                    <option value="single_correct">Single Correct MCQ</option>
                    <option value="multiple_correct">Multiple Correct MCQ</option>
                    <option value="true_false">True / False</option>
                    <option value="fill_in_blank">Fill in the Blank</option>
                    <option value="match_following">Match the Following</option>
                    <option value="numerical">Numerical Value Type</option>
                    <option value="subjective">Subjective (Descriptive)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newQDifficulty}
                    onChange={(e) => setNewQDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard / Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question Statement / Problem *</label>
                <textarea
                  rows={3}
                  required
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Type full question formulation, mathematical expressions, or scenario..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Dynamic Type Config Area */}
              {['single_correct', 'multiple_correct'].includes(newQType) && (
                <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                  <span className="font-bold text-purple-950 block">4 Options & Correct Answer:</span>
                  {newQOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="font-bold text-purple-900 w-5">{String.fromCharCode(65 + idx)})</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const copy = [...newQOptions];
                          copy[idx] = e.target.value;
                          setNewQOptions(copy);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                        className="flex-1 p-2 bg-white rounded-lg border border-slate-200 text-xs"
                      />
                      {newQType === 'single_correct' ? (
                        <label className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <input
                            type="radio"
                            name="correctOptRadio"
                            checked={newQCorrectSingle === idx}
                            onChange={() => setNewQCorrectSingle(idx)}
                          />
                          Correct
                        </label>
                      ) : (
                        <label className="flex items-center gap-1 text-[11px] font-bold text-purple-700">
                          <input
                            type="checkbox"
                            checked={newQCorrectMulti.includes(idx)}
                            onChange={(e) => {
                              if (e.target.checked) setNewQCorrectMulti([...newQCorrectMulti, idx]);
                              else setNewQCorrectMulti(newQCorrectMulti.filter(i => i !== idx));
                            }}
                          />
                          Correct
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {newQType === 'true_false' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
                  <span className="font-bold text-slate-800">Correct Answer:</span>
                  <label className="flex items-center gap-1 font-bold text-emerald-700 cursor-pointer">
                    <input
                      type="radio"
                      name="tfRadio"
                      checked={newQCorrectTf === true}
                      onChange={() => setNewQCorrectTf(true)}
                    />
                    TRUE
                  </label>
                  <label className="flex items-center gap-1 font-bold text-rose-700 cursor-pointer">
                    <input
                      type="radio"
                      name="tfRadio"
                      checked={newQCorrectTf === false}
                      onChange={() => setNewQCorrectTf(false)}
                    />
                    FALSE
                  </label>
                </div>
              )}

              {newQType === 'fill_in_blank' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correct Keyword / Exact String *</label>
                  <input
                    type="text"
                    required
                    value={newQCorrectText}
                    onChange={(e) => setNewQCorrectText(e.target.value)}
                    placeholder="e.g. conservation of angular momentum"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              )}

              {newQType === 'numerical' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Correct Numerical Value *</label>
                    <input
                      type="text"
                      required
                      value={newQCorrectText}
                      onChange={(e) => setNewQCorrectText(e.target.value)}
                      placeholder="e.g. 2.5 or 12"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Accepted Range Tolerance (±)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newQTolerance}
                      onChange={(e) => setNewQTolerance(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              )}

              {newQType === 'subjective' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Model Answer & Scoring Rubric *</label>
                  <textarea
                    rows={3}
                    value={newQModelAnswer}
                    onChange={(e) => setNewQModelAnswer(e.target.value)}
                    placeholder="Point-by-point derivation, essential formulas, and step-wise mark distribution..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Positive Marks (+)</label>
                  <input
                    type="number"
                    value={newQMarks}
                    onChange={(e) => setNewQMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Negative Marks (-)</label>
                  <input
                    type="number"
                    value={newQNegMarks}
                    onChange={(e) => setNewQNegMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty Step-by-Step Explanation & Proof</label>
                <textarea
                  rows={2}
                  value={newQExplanation}
                  onChange={(e) => setNewQExplanation(e.target.value)}
                  placeholder="Detailed rationale, fundamental laws applied, and calculation steps..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md"
                >
                  Save to Question Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TEST SERIES MODAL */}
      {showCreateTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Create New CBT Test Series</h3>
            
            <form onSubmit={handleCreateTestSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Test Title *</label>
                <input
                  type="text"
                  required
                  value={newTestTitle}
                  onChange={(e) => setNewTestTitle(e.target.value)}
                  placeholder="e.g. JEE Advanced Full Syllabus Mock Exam - 03"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTestCategory}
                    onChange={(e) => setNewTestCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                    <option value="NEET (Medical)">NEET (Medical)</option>
                    <option value="CA & Commerce (Foundation/Inter)">CA & Commerce (Foundation/Inter)</option>
                    <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Test Type *</label>
                  <select
                    value={newTestType}
                    onChange={(e) => setNewTestType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-emerald-900"
                  >
                    <option value="chapter_test">Chapter Test</option>
                    <option value="subject_wise">Subject-wise Test</option>
                    <option value="revision_test">Revision Test</option>
                    <option value="mock_test">Mock Test</option>
                    <option value="full_syllabus">Full Syllabus Test</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={newTestDuration}
                    onChange={(e) => setNewTestDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Passing Marks Benchmark</label>
                  <input
                    type="number"
                    value={newTestPassingMarks}
                    onChange={(e) => setNewTestPassingMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <span className="font-bold block">Automated Question Allocation:</span>
                <p>Questions from the centralized Question Bank will be dynamically bundled and formatted with live timer, scientific calculator, question palette, and AIR rank card.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateTestModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-md"
                >
                  Publish Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE LIVE CLASS MODAL */}
      {showScheduleLiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-600" /> Schedule Live Interactive Session
              </h3>
              <button
                onClick={() => setShowScheduleLiveModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleLiveClassSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Course *</label>
                <select
                  value={liveCourseId}
                  onChange={(e) => setLiveCourseId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Batch Name *</label>
                  <input
                    type="text"
                    required
                    value={liveBatchName}
                    onChange={(e) => setLiveBatchName(e.target.value)}
                    placeholder="e.g. Star Super-50 Morning"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={liveSubject}
                    onChange={(e) => setLiveSubject(e.target.value)}
                    placeholder="e.g. Physics, Accounting"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Faculty *</label>
                  <input
                    type="text"
                    required
                    value={liveFaculty}
                    onChange={(e) => setLiveFaculty(e.target.value)}
                    placeholder="e.g. Er. Rajeshwar Varma"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={liveDate}
                    onChange={(e) => setLiveDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Time *</label>
                  <input
                    type="time"
                    required
                    value={liveStartTime}
                    onChange={(e) => setLiveStartTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Time *</label>
                  <input
                    type="time"
                    required
                    value={liveEndTime}
                    onChange={(e) => setLiveEndTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lecture Topic / Title *</label>
                <input
                  type="text"
                  required
                  value={liveTopic}
                  onChange={(e) => setLiveTopic(e.target.value)}
                  placeholder="e.g. Rotational Dynamics: Center of Mass Velocity & Symmetries"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Session Description & Prerequisites</label>
                <textarea
                  rows={2}
                  value={liveDescription}
                  onChange={(e) => setLiveDescription(e.target.value)}
                  placeholder="Topics covered, formulas to revise before entering the class..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Free vs Paid Access Selector */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Access Tier:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="liveTier"
                      checked={!liveIsFree}
                      onChange={() => setLiveIsFree(false)}
                      className="text-indigo-600"
                    />
                    <span>Paid (Enrolled Batch Only)</span>
                  </label>
                  <label className="flex items-center gap-1.5 font-semibold text-emerald-700 cursor-pointer">
                    <input
                      type="radio"
                      name="liveTier"
                      checked={liveIsFree}
                      onChange={() => setLiveIsFree(true)}
                      className="text-emerald-600"
                    />
                    <span>Free Open Masterclass</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleLiveModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-md"
                >
                  Publish Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COURSE BATCH MODAL */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Create New Course Batch</h3>
            
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Batch Title *</label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Masterstroke NEET 2026 Crash Revision"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newCoursePrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setNewCoursePrice(val);
                      if (newCourseOriginalPrice > val && val > 0) {
                        setNewCourseDiscount(Math.round(((newCourseOriginalPrice - val) / newCourseOriginalPrice) * 100));
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newCourseOriginalPrice}
                    onChange={(e) => {
                      const orig = Number(e.target.value);
                      setNewCourseOriginalPrice(orig);
                      if (orig > newCoursePrice && newCoursePrice > 0) {
                        setNewCourseDiscount(Math.round(((orig - newCoursePrice) / orig) * 100));
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount %</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={newCourseDiscount}
                      onChange={(e) => setNewCourseDiscount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 pr-7"
                    />
                    <Percent className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Category</label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                    <option value="NEET (Medical)">NEET (Medical)</option>
                    <option value="CA & Commerce (Foundation/Inter)">CA & Commerce (Foundation/Inter)</option>
                    <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                    <option value="Foundation (9-10th)">Foundation (Class 9-10)</option>
                    <option value="Tech & Data Science">Tech & Data Science</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Lead Faculty</label>
                  <select
                    value={newCourseFaculty}
                    onChange={(e) => setNewCourseFaculty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Er. Rajeshwar Varma">Er. Rajeshwar Varma (Ex-IIT Bombay, Physics)</option>
                    <option value="Dr. Ananya Mukherjee">Dr. Ananya Mukherjee (AIIMS Gold Medalist, Biology)</option>
                    <option value="CA CS Nitin Sharma">CA CS Nitin Sharma (AIR 3 Rankholder Faculty)</option>
                    <option value="Prof. Hemant K. Gupta">Prof. Hemant K. Gupta (Ex-UPSC Invigilator)</option>
                    <option value="Dr. Vivek Sachdeva">Dr. Vivek Sachdeva (Organic Chem Specialist)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-950 text-white font-bold rounded-xl hover:bg-indigo-900 shadow-md"
                >
                  Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
