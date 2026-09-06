import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DoubtItem,
  LiveClass,
  AssignmentItem,
  StudyMaterialItem,
  StudyMaterialType,
  DoubtStatus,
  Question,
  QuestionType,
  DifficultyLevel,
  TestSeriesExam
} from '../../types';
import { FacultyStudentsAttendanceTab } from './FacultyStudentsAttendanceTab';
import { FacultyPerformanceTab } from './FacultyPerformanceTab';
import { StudyMaterialManagerView } from '../admin/StudyMaterialManagerView';
import {
  Users,
  Radio,
  HelpCircle,
  Video,
  Plus,
  Send,
  Sparkles,
  BookOpen,
  Eye,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Share2,
  Lock,
  ShieldCheck,
  FileText,
  Upload,
  UserCheck,
  Award,
  Filter,
  CheckSquare,
  MessageSquareQuote,
  Paperclip,
  Download,
  Flame,
  CheckCircle,
  XCircle,
  FileCheck,
  Database,
  TrendingUp,
  BarChart3,
  Layers,
  Check
} from 'lucide-react';

export const FacultyPanel: React.FC = () => {
  const {
    courses,
    addLessonToCourse,
    doubts,
    answerDoubt,
    updateDoubtStatus,
    liveClasses,
    setLiveClasses,
    scheduleLiveClass,
    setActiveLiveClass,
    assignments,
    createAssignment,
    gradeAssignment,
    studyMaterials,
    uploadStudyMaterial,
    questionBank,
    addQuestionToBank,
    testSeries,
    createTestSeries,
    currentUser
  } = useApp();

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'assigned_courses' | 'students' | 'live' | 'videos' | 'tests' | 'assignments' | 'doubts' | 'performance' | 'study_materials'
  >('dashboard');

  // ==========================================
  // MODAL STATES FOR THE 8 FACULTY FUNCTIONS
  // ==========================================
  // 1. Upload Video Modal State
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false);
  const [vidCourseId, setVidCourseId] = useState(courses[0]?.id || '');
  const [vidChapterTitle, setVidChapterTitle] = useState('Chapter 1: Foundational Masterclass');
  const [vidLessonTitle, setVidLessonTitle] = useState('');
  const [vidDuration, setVidDuration] = useState(45);
  const [vidUrl, setVidUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [vidIsFree, setVidIsFree] = useState(false);
  const [vidNotesPdf, setVidNotesPdf] = useState('Lecture_Notes_Class.pdf');
  const [vidSummary, setVidSummary] = useState('');

  // 2. Upload Notes Modal State (8 Types)
  const [showUploadMaterialModal, setShowUploadMaterialModal] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState('Physics');
  const [matCategory, setMatCategory] = useState('JEE (Main & Adv)');
  const [matType, setMatType] = useState<StudyMaterialType>('PDF');
  const [matPages, setMatPages] = useState(16);
  const [matFileSize, setMatFileSize] = useState('4.2 MB');
  const [matRestrictedDownload, setMatRestrictedDownload] = useState(false);
  const [matHasWatermark, setMatHasWatermark] = useState(true);

  // 3. Schedule Live Class Modal State
  const [showScheduleLiveModal, setShowScheduleLiveModal] = useState(false);
  const [liveTitle, setLiveTitle] = useState('');
  const [liveCourseId, setLiveCourseId] = useState(courses[0]?.id || '');
  const [liveBatchName, setLiveBatchName] = useState('Pinnacle Morning Star Batch');
  const [liveSubject, setLiveSubject] = useState('Physics');
  const [liveDate, setLiveDate] = useState('2026-09-02');
  const [liveTime, setLiveTime] = useState('18:00');
  const [liveDuration, setLiveDuration] = useState(90);
  const [liveTopics, setLiveTopics] = useState('High-Yield Concept Derivation & Numerical Drill');

  // 4. Create Assignment Modal State
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [asgnTitle, setAsgnTitle] = useState('');
  const [asgnDesc, setAsgnDesc] = useState('');
  const [asgnSubject, setAsgnSubject] = useState('Physics');
  const [asgnCourseTitle, setAsgnCourseTitle] = useState(courses[0]?.title || 'Comprehensive Live Batch');
  const [asgnDueDate, setAsgnDueDate] = useState('2026-09-10');
  const [asgnTotalPoints, setAsgnTotalPoints] = useState(50);
  const [asgnAttachment, setAsgnAttachment] = useState('DPP_Set_04_Problems.pdf');

  // 5. Create Questions Modal State (7 Types)
  const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false);
  const [qSubject, setQSubject] = useState('Physics');
  const [qChapter, setQChapter] = useState('Rotational Dynamics');
  const [qTopic, setQTopic] = useState('Moment of Inertia');
  const [qType, setQType] = useState<QuestionType>('single_correct');
  const [qDifficulty, setQDifficulty] = useState<DifficultyLevel>('Medium');
  const [qText, setQText] = useState('');
  const [qMarks, setQMarks] = useState(4);
  const [qNegativeMarks, setQNegativeMarks] = useState(1);
  const [qExplanation, setQExplanation] = useState('');
  const [qOptions, setQOptions] = useState<string[]>(['', '', '', '']);
  const [qCorrectSingle, setQCorrectSingle] = useState<number>(0);
  const [qCorrectMulti, setQCorrectMulti] = useState<number[]>([]);
  const [qCorrectTf, setQCorrectTf] = useState<boolean>(true);
  const [qCorrectText, setQCorrectText] = useState<string>('');

  // 6. Conduct Tests Modal State
  const [showConductTestModal, setShowConductTestModal] = useState(false);
  const [testTitle, setTestTitle] = useState('');
  const [testSubject, setTestSubject] = useState('Physics');
  const [testCategory, setTestCategory] = useState('JEE Advanced');
  const [testDuration, setTestDuration] = useState(180);
  const [testTotalMarks, setTestTotalMarks] = useState(300);
  const [testPassingScore, setTestPassingScore] = useState(120);

  // 7. Doubt Reply State
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [formulaText, setFormulaText] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [facultyUploadImg, setFacultyUploadImg] = useState('');

  // 8. Grade Assignment State
  const [selectedGradingAsn, setSelectedGradingAsn] = useState<AssignmentItem | null>(null);
  const [awardedScore, setAwardedScore] = useState(45);
  const [facultyFeedbackText, setFacultyFeedbackText] = useState('');

  // ==========================================
  // HANDLERS
  // ==========================================
  // 1. Submit Upload Video
  const handleUploadVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidLessonTitle.trim() || !vidCourseId) return;

    addLessonToCourse(vidCourseId, vidChapterTitle, {
      title: vidLessonTitle,
      durationMinutes: Number(vidDuration),
      videoUrl: vidUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      isFreePreview: vidIsFree,
      notesPdfTitle: vidNotesPdf,
      summary: vidSummary || 'Comprehensive high-yield video lecture with problem derivations.'
    });

    setShowUploadVideoModal(false);
    setVidLessonTitle('');
    setVidSummary('');
    alert(`Video lecture "${vidLessonTitle}" uploaded to course repository successfully!`);
  };

  // 2. Submit Upload Notes
  const handleUploadMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;

    uploadStudyMaterial({
      title: matTitle,
      subject: matSubject,
      category: matCategory,
      type: matType,
      authorFaculty: currentUser.name || 'Master Faculty',
      pagesCount: Number(matPages),
      fileSize: matFileSize,
      downloadsCount: 0,
      viewsCount: 0,
      updatedDate: 'Just Now',
      restrictedDownload: matRestrictedDownload,
      hasWatermark: matHasWatermark
    });

    setShowUploadMaterialModal(false);
    setMatTitle('');
    alert(`Study resource "${matTitle}" uploaded to the Vault!`);
  };

  // 3. Submit Schedule Live Class
  const handleScheduleLiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle.trim()) return;

    const newClass: LiveClass = {
      id: `live-${Date.now()}`,
      courseId: liveCourseId || courses[0]?.id || 'crs-jee',
      courseTitle: courses.find(c => c.id === liveCourseId)?.title || 'Comprehensive Live Batch',
      title: liveTitle,
      subject: liveSubject,
      facultyName: currentUser.name || 'Er. Rajeshwar Varma',
      facultyAvatar: currentUser.avatar,
      scheduledTime: `${liveDate} • ${liveTime}`,
      date: liveDate,
      startTime: liveTime,
      endTime: '19:30',
      durationMinutes: Number(liveDuration),
      status: 'upcoming',
      attendeesCount: 0,
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      topicsCovered: liveTopics.split(',').map(t => t.trim()),
      isFree: false
    };

    setLiveClasses((prev) => [newClass, ...prev]);
    setShowScheduleLiveModal(false);
    setLiveTitle('');
    alert('Live class scheduled and notification dispatched to students!');
  };

  // 4. Submit Create Assignment
  const handleCreateAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgnTitle.trim()) return;

    createAssignment({
      title: asgnTitle,
      description: asgnDesc,
      subject: asgnSubject,
      courseTitle: asgnCourseTitle,
      dueDate: asgnDueDate,
      totalPoints: Number(asgnTotalPoints),
      attachmentName: asgnAttachment,
      submissionStatus: 'pending'
    });

    setShowCreateAssignmentModal(false);
    setAsgnTitle('');
    setAsgnDesc('');
    alert('Assignment created successfully! Students have been notified.');
  };

  // 5. Submit Create Question (7 Types)
  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;

    let answerValue: any = qCorrectSingle;
    if (qType === 'multiple_correct') {
      answerValue = qCorrectMulti;
    } else if (qType === 'true_false') {
      answerValue = qCorrectTf ? 'True' : 'False';
    } else if (['fill_in_blank', 'numerical'].includes(qType)) {
      answerValue = qCorrectText;
    }

    const newQ: Question = {
      id: `q-${Date.now()}`,
      subject: qSubject,
      chapter: qChapter,
      topic: qTopic,
      type: qType,
      difficulty: qDifficulty,
      questionText: qText,
      marks: Number(qMarks),
      negativeMarks: Number(qNegativeMarks),
      explanation: qExplanation || 'Detailed step-by-step mathematical proof and explanation.',
      options: ['single_correct', 'multiple_correct'].includes(qType) ? qOptions : undefined,
      correctAnswer: answerValue
    };

    addQuestionToBank(newQ);
    setShowCreateQuestionModal(false);
    setQText('');
    setQExplanation('');
    alert('Question added to centralized question bank successfully!');
  };

  // 6. Submit Conduct Test
  const handleConductTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;

    const newTest: TestSeriesExam = {
      id: `test-${Date.now()}`,
      title: testTitle,
      category: testCategory as any,
      subjectName: testSubject,
      targetExam: testSubject,
      durationMinutes: Number(testDuration),
      totalMarks: Number(testTotalMarks),
      passingMarks: Number(testPassingScore),
      totalQuestions: questionBank.length || 30,
      attemptsCount: 0,
      isFree: false,
      sections: [
        {
          name: 'Section A - Single Correct MCQs',
          questions: questionBank.slice(0, 15)
        },
        {
          name: 'Section B - Numerical Value Questions',
          questions: questionBank.slice(15, 25)
        }
      ]
    };

    createTestSeries(newTest);
    setShowConductTestModal(false);
    setTestTitle('');
    alert(`Test series "${testTitle}" launched and published for candidates!`);
  };

  // 7. Submit Answer Doubt
  const handleSendReply = (doubtId: string) => {
    if (!replyText.trim()) return;

    answerDoubt(
      doubtId,
      replyText,
      formulaText || undefined,
      videoUrlInput ? 'https://www.w3schools.com/html/mov_bbb.mp4' : undefined,
      facultyUploadImg || undefined
    );

    setSelectedDoubtId(null);
    setReplyText('');
    setFormulaText('');
    setVideoUrlInput('');
    setFacultyUploadImg('');
    alert('Doubt answered and resolution notification delivered to student!');
  };

  // 8. Submit Grade Assignment
  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGradingAsn) return;

    gradeAssignment(selectedGradingAsn.id, Number(awardedScore), facultyFeedbackText);
    setSelectedGradingAsn(null);
    setFacultyFeedbackText('');
    alert('Student submission graded and scorecard published!');
  };

  // Pre-calculated metrics for faculty
  const assignedCourses = courses.filter(c =>
    c.facultyName.toLowerCase().includes('rajeshwar') ||
    c.facultyName.toLowerCase().includes('nitin') ||
    c.facultyName.toLowerCase().includes('faculty') ||
    courses.length <= 4
  );

  const pendingDoubtsCount = doubts.filter(d => d.status === 'pending' || d.status === 'unresolved').length;
  const directAskTeacherCount = doubts.filter(d => d.isDirectAskTeacher).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Top Faculty Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            alt="Faculty Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/20">
                Senior Master Faculty Portal
              </span>
              <span className="text-xs text-slate-400">Department of Physics & Advanced Mechanics</span>
            </div>
            <h1 className="text-2xl font-bold font-sans mt-1">Er. Rajeshwar Varma (IIT Delhi, 18+ Yrs Exp)</h1>
            <p className="text-xs text-slate-300">
              Assigned to <strong>{assignedCourses.length} Active Batches</strong> • Mentoring <strong>{assignedCourses.reduce((a, c) => a + c.enrolledCount, 0).toLocaleString()} Enrolled Aspirants</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={() => setShowScheduleLiveModal(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Radio className="w-4 h-4 animate-pulse" /> Schedule Live
          </button>
          <button
            onClick={() => setShowUploadVideoModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Video className="w-4 h-4" /> Upload Video
          </button>
        </div>
      </div>

      {/* QUICK FUNCTION ACTION BAR (8 CORE FACULTY FUNCTIONS) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Faculty Quick Command Bar (8 Functions)
          </span>
          <span className="text-[10px] text-indigo-600 font-bold">1-Click Fast Actions</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
          {/* 1. Upload Video */}
          <button
            onClick={() => setShowUploadVideoModal(true)}
            className="p-2.5 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 border border-indigo-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <Video className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] leading-tight">Upload Video</span>
          </button>

          {/* 2. Upload Notes */}
          <button
            onClick={() => setShowUploadMaterialModal(true)}
            className="p-2.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100 text-amber-900 border border-amber-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] leading-tight">Upload Notes</span>
          </button>

          {/* 3. Schedule Live */}
          <button
            onClick={() => setShowScheduleLiveModal(true)}
            className="p-2.5 rounded-2xl bg-rose-50/70 hover:bg-rose-100 text-rose-900 border border-rose-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <Radio className="w-4 h-4 text-rose-600" />
            <span className="text-[10px] leading-tight">Schedule Live</span>
          </button>

          {/* 4. Create Assignment */}
          <button
            onClick={() => setShowCreateAssignmentModal(true)}
            className="p-2.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 border border-emerald-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] leading-tight">Create Asgn</span>
          </button>

          {/* 5. Create Questions */}
          <button
            onClick={() => setShowCreateQuestionModal(true)}
            className="p-2.5 rounded-2xl bg-purple-50/70 hover:bg-purple-100 text-purple-900 border border-purple-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <Database className="w-4 h-4 text-purple-600" />
            <span className="text-[10px] leading-tight">Create Questions</span>
          </button>

          {/* 6. Conduct Tests */}
          <button
            onClick={() => setShowConductTestModal(true)}
            className="p-2.5 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 border border-indigo-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-indigo-700" />
            <span className="text-[10px] leading-tight">Conduct Tests</span>
          </button>

          {/* 7. Answer Doubts */}
          <button
            onClick={() => setActiveTab('doubts')}
            className="p-2.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100 text-amber-900 border border-amber-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] leading-tight">Answer Doubts</span>
          </button>

          {/* 8. View Performance */}
          <button
            onClick={() => setActiveTab('performance')}
            className="p-2.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 border border-emerald-100 font-bold flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] leading-tight">View Perf</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
        {[
          { id: 'dashboard', label: 'Faculty Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: 'assigned_courses', label: `Assigned Courses (${assignedCourses.length})`, icon: <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> },
          { id: 'students', label: 'Students & Attendance', icon: <Users className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'live', label: `Live Classes (${liveClasses.length})`, icon: <Radio className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'videos', label: 'Recorded Videos & DRM', icon: <Video className="w-3.5 h-3.5 text-indigo-600" /> },
          { id: 'tests', label: `Tests & Question Bank (${testSeries.length})`, icon: <FileCheck className="w-3.5 h-3.5 text-purple-600" /> },
          { id: 'assignments', label: `Assignments (${assignments.length})`, icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> },
          { id: 'doubts', label: `Doubt Inquiries (${pendingDoubtsCount} Pending)`, icon: <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'performance', label: 'Student Performance', icon: <TrendingUp className="w-3.5 h-3.5 text-purple-600" /> },
          { id: 'study_materials', label: `Study Notes (${studyMaterials.length})`, icon: <BookOpen className="w-3.5 h-3.5 text-slate-600" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
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

      {/* ========================================================================= */}
      {/* TAB 1: FACULTY DASHBOARD OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 text-xs">
          {/* Top 8 Metric KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div
              onClick={() => setActiveTab('assigned_courses')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Assigned Batches</span>
              <p className="text-xl font-black text-slate-900">{assignedCourses.length}</p>
              <span className="text-[10px] text-indigo-600 font-semibold">Active Cohorts</span>
            </div>

            <div
              onClick={() => setActiveTab('students')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-emerald-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Students</span>
              <p className="text-xl font-black text-emerald-700">
                {assignedCourses.reduce((a, c) => a + c.enrolledCount, 0).toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-700 font-semibold">Enrolled</span>
            </div>

            <div
              onClick={() => setActiveTab('live')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-rose-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Live Classes</span>
              <p className="text-xl font-black text-rose-700">{liveClasses.length}</p>
              <span className="text-[10px] text-rose-700 font-semibold">Scheduled</span>
            </div>

            <div
              onClick={() => setActiveTab('videos')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Videos</span>
              <p className="text-xl font-black text-indigo-900">48</p>
              <span className="text-[10px] text-indigo-700 font-semibold">DRM Ready</span>
            </div>

            <div
              onClick={() => setActiveTab('tests')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-purple-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Tests</span>
              <p className="text-xl font-black text-purple-900">{testSeries.length}</p>
              <span className="text-[10px] text-purple-700 font-semibold">CBT Exams</span>
            </div>

            <div
              onClick={() => setActiveTab('assignments')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-emerald-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Assignments</span>
              <p className="text-xl font-black text-emerald-700">{assignments.length}</p>
              <span className="text-[10px] text-emerald-700 font-semibold">DPPs Active</span>
            </div>

            <div
              onClick={() => setActiveTab('doubts')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-amber-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Doubts</span>
              <p className="text-xl font-black text-amber-800">{pendingDoubtsCount}</p>
              <span className="text-[10px] text-amber-800 font-semibold">Pending Reply</span>
            </div>

            <div
              onClick={() => setActiveTab('students')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 hover:border-indigo-400 cursor-pointer transition"
            >
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Attendance</span>
              <p className="text-xl font-black text-indigo-950">92.4%</p>
              <span className="text-[10px] text-indigo-700 font-semibold">Average Turnout</span>
            </div>
          </div>

          {/* Assigned Courses Spotlight */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-sans">Assigned Academic Batches</h3>
                <p className="text-slate-500 text-[11px]">Courses allocated by admin to your teaching workload.</p>
              </div>
              <button
                onClick={() => setActiveTab('assigned_courses')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                View All Batches →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assignedCourses.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                      {c.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">{c.enrolledCount} Students</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{c.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Batch: {c.batchName || 'Pinnacle Alpha'}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setVidCourseId(c.id);
                        setShowUploadVideoModal(true);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-900 font-bold rounded-lg text-[10px] cursor-pointer shadow-2xs"
                    >
                      + Add Lesson
                    </button>
                    <button
                      onClick={() => {
                        setLiveCourseId(c.id);
                        setShowScheduleLiveModal(true);
                      }}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-[10px] cursor-pointer"
                    >
                      + Schedule Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ASSIGNED COURSES */}
      {/* ========================================================================= */}
      {activeTab === 'assigned_courses' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Assigned Courses & Lecture Syllabi ({assignedCourses.length})
            </h3>
            <button
              onClick={() => setShowUploadVideoModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <Video className="w-3.5 h-3.5" /> Upload Video Lecture
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {assignedCourses.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded">
                      {c.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">Batch: {c.batchName || 'Pinnacle Alpha'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Enrolled</span>
                    <span className="font-bold text-indigo-900 text-xs">{c.enrolledCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Chapters</span>
                    <span className="font-bold text-slate-900 text-xs">{c.chapters?.length || 1}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Validity</span>
                    <span className="font-bold text-amber-800 text-xs">{c.validity || '12 Mo'}</span>
                  </div>
                </div>

                {/* Chapter List */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block text-[11px]">Course Chapters & Video Lectures:</span>
                  {c.chapters?.map((ch) => (
                    <div key={ch.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{ch.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{ch.lessons?.length || 0} Lessons</span>
                      </div>

                      <div className="space-y-1">
                        {ch.lessons?.map((les) => (
                          <div
                            key={les.id}
                            className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Play className="w-3 h-3 text-indigo-600 shrink-0" />
                              <span className="font-medium text-slate-800">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{les.durationMinutes}m</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setVidCourseId(c.id);
                      setShowUploadVideoModal(true);
                    }}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Upload Video
                  </button>
                  <button
                    onClick={() => {
                      setLiveCourseId(c.id);
                      setShowScheduleLiveModal(true);
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Radio className="w-3.5 h-3.5" /> Schedule Live
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STUDENTS & ATTENDANCE */}
      {/* ========================================================================= */}
      {activeTab === 'students' && (
        <FacultyStudentsAttendanceTab />
      )}

      {/* ========================================================================= */}
      {/* TAB 4: LIVE BROADCASTS */}
      {/* ========================================================================= */}
      {activeTab === 'live' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Faculty Live Class Schedule ({liveClasses.length})
            </h3>
            <button
              onClick={() => setShowScheduleLiveModal(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Schedule Live Class
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveClasses.map((cls) => (
              <div key={cls.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                      {cls.status === 'live' ? '🔴 Live Now' : 'Upcoming Session'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">{cls.durationMinutes} Mins</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 font-sans line-clamp-2">{cls.title}</h4>
                  <p className="text-[11px] text-slate-500">{cls.courseTitle}</p>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cls.date} • {cls.startTime} - {cls.endTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{cls.attendeesCount} Registered</span>
                  <button
                    onClick={() => {
                      if (setActiveLiveClass) setActiveLiveClass(cls);
                      alert(`Joining live broadcast room for "${cls.title}"!`);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" /> Start Broadcast
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: VIDEOS & DRM */}
      {/* ========================================================================= */}
      {activeTab === 'videos' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recorded Video Vault & Hardware DRM Matrix
            </h3>
            <button
              onClick={() => setShowUploadVideoModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Video className="w-3.5 h-3.5" /> Upload Video Lecture
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.flatMap(c => (c.chapters || []).flatMap(ch => (ch.lessons || []).map(les => ({ ...les, courseTitle: c.title, chapterTitle: ch.title })))).slice(0, 9).map((les, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    les.isFreePreview ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {les.isFreePreview ? 'Free Demo' : 'DRM Locked'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{les.durationMinutes} mins</span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 line-clamp-2">{les.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{les.courseTitle}</p>

                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                  <span>Attachment: {les.notesPdfTitle || 'Class_Notes.pdf'}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-emerald-700 font-bold">Widevine L1 Active</span>
                  <button
                    onClick={() => alert(`Previewing secure stream for ${les.title}`)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg cursor-pointer"
                  >
                    Play Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TESTS & QUESTION BANK */}
      {/* ========================================================================= */}
      {activeTab === 'tests' && (
        <div className="space-y-6 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Examination Console & Question Authoring ({testSeries.length} Tests)
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreateQuestionModal(true)}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Database className="w-3.5 h-3.5" /> + Create Question
              </button>
              <button
                onClick={() => setShowConductTestModal(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <FileCheck className="w-3.5 h-3.5" /> + Conduct New Test
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testSeries.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-purple-50 text-purple-900 px-2 py-0.5 rounded border border-purple-200">
                      {t.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{t.durationMinutes} mins</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 font-sans line-clamp-2">{t.title}</h4>
                  <p className="text-[11px] text-slate-500">Subject: {t.subject}</p>

                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center font-semibold">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Max Marks</span>
                      <span className="text-slate-900 font-bold">{t.totalMarks}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Questions</span>
                      <span className="text-purple-900 font-bold">{t.questionsCount}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t.attemptsCount} Candidates</span>
                  <button
                    onClick={() => alert(`Opening test grading console for "${t.title}"`)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold rounded-xl transition cursor-pointer"
                  >
                    View Scorecards
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ASSIGNMENTS & DPPs */}
      {/* ========================================================================= */}
      {activeTab === 'assignments' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Daily Practice Problems & Assignment Submissions ({assignments.length})
            </h3>
            <button
              onClick={() => setShowCreateAssignmentModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> + Create Assignment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((asg) => (
              <div key={asg.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      {asg.subject}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-700">{asg.totalPoints} Marks</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 font-sans line-clamp-2">{asg.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{asg.description}</p>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-mono">Attachment: {asg.attachmentName}</span>
                    <span className="text-[10px] text-slate-600 font-semibold">Due: {asg.dueDate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    asg.submissionStatus === 'graded' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {asg.submissionStatus || 'Pending Review'}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedGradingAsn(asg);
                      setAwardedScore(asg.totalPoints - 5);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer"
                  >
                    Grade Submission
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: DOUBT QUEUE & ANSWER DOUBTS */}
      {/* ========================================================================= */}
      {activeTab === 'doubts' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Student Doubt Inquiries Queue ({doubts.length})
            </h3>
            <span className="text-slate-500">Status: Pending ➔ Assigned ➔ Answered ➔ Closed</span>
          </div>

          <div className="space-y-4">
            {doubts.map((dbt) => {
              const currentStatus: DoubtStatus = dbt.status || 'answered';
              return (
                <div
                  key={dbt.id}
                  className={`bg-white p-5 rounded-3xl border shadow-xs space-y-3 transition ${
                    currentStatus === 'pending' || currentStatus === 'unresolved'
                      ? 'border-amber-300 ring-1 ring-amber-200'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={dbt.studentAvatar}
                        alt={dbt.studentName}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900">{dbt.studentName}</span>
                        <p className="text-[10px] text-slate-400">
                          {dbt.subject} • {dbt.courseTitle} • {dbt.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={currentStatus}
                        onChange={(e) => updateDoubtStatus(dbt.id, e.target.value as DoubtStatus)}
                        className="text-xs font-bold p-1.5 bg-slate-50 border rounded-xl"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="assigned">📌 Assigned</option>
                        <option value="answered">✅ Answered</option>
                        <option value="closed">🔒 Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-800 space-y-2">
                    <p className="font-medium">{dbt.questionText}</p>
                    {dbt.imageUrl && (
                      <img src={dbt.imageUrl} alt="Query diagram" className="w-48 h-28 object-cover rounded-xl border" />
                    )}
                  </div>

                  {dbt.facultyReply && (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1">
                      <p className="font-bold text-emerald-950">Faculty Solution:</p>
                      <p className="text-slate-700">{dbt.facultyReply.text}</p>
                      {dbt.facultyReply.formulaOrExplanation && (
                        <div className="p-2 bg-white rounded-lg border border-emerald-300 font-mono text-[11px] text-indigo-950 font-bold">
                          {dbt.facultyReply.formulaOrExplanation}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedDoubtId === dbt.id ? (
                    <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-3 text-xs">
                      <h5 className="font-bold text-indigo-950">Provide Rigorous Faculty Proof / Explanation</h5>
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Explain the physical principle, derivation, or formula..."
                        className="w-full p-2.5 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={formulaText}
                        onChange={(e) => setFormulaText(e.target.value)}
                        placeholder="LaTeX Formula / Mathematical Derivation (e.g. I = \frac{1}{2} M R^2)"
                        className="w-full p-2 bg-white rounded-xl border border-slate-200 font-mono text-xs"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedDoubtId(null)}
                          className="px-3 py-1.5 bg-white text-slate-700 font-bold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSendReply(dbt.id)}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                        >
                          Publish Resolution
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setSelectedDoubtId(dbt.id)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer"
                      >
                        {dbt.facultyReply ? 'Edit Solution' : 'Answer Doubt'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 9: STUDENT PERFORMANCE */}
      {/* ========================================================================= */}
      {activeTab === 'performance' && (
        <FacultyPerformanceTab />
      )}

      {/* ========================================================================= */}
      {/* TAB 10: 28. STUDY MATERIAL MANAGEMENT (8 TYPES: PDF, Notes, Books, Assignments, Question Banks, PYQs, Revision, Practice Papers) */}
      {/* ========================================================================= */}
      {activeTab === 'study_materials' && (
        <StudyMaterialManagerView />
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: UPLOAD VIDEO */}
      {/* ========================================================================= */}
      {showUploadVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-600" /> Upload Video Lecture to Course
              </h3>
              <button onClick={() => setShowUploadVideoModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>

            <form onSubmit={handleUploadVideoSubmit} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Course *</label>
                <select
                  value={vidCourseId}
                  onChange={(e) => setVidCourseId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chapter Name *</label>
                  <input
                    type="text"
                    required
                    value={vidChapterTitle}
                    onChange={(e) => setVidChapterTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lecture Title *</label>
                  <input
                    type="text"
                    required
                    value={vidLessonTitle}
                    onChange={(e) => setVidLessonTitle(e.target.value)}
                    placeholder="e.g. Masterclass Lecture 4: Center of Mass"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Minutes) *</label>
                  <input
                    type="number"
                    required
                    value={vidDuration}
                    onChange={(e) => setVidDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Attached Notes PDF</label>
                  <input
                    type="text"
                    value={vidNotesPdf}
                    onChange={(e) => setVidNotesPdf(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Video Stream URL (HLS / MP4)</label>
                <input
                  type="text"
                  value={vidUrl}
                  onChange={(e) => setVidUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Free Demo Preview</span>
                  <span className="text-[10px] text-slate-500">Allow students to watch without payment</span>
                </div>
                <input
                  type="checkbox"
                  checked={vidIsFree}
                  onChange={(e) => setVidIsFree(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadVideoModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Upload Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UPLOAD NOTES (8 TYPES) */}
      {/* ========================================================================= */}
      {showUploadMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" /> Upload Study Material & Notes
              </h3>
              <button onClick={() => setShowUploadMaterialModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>

            <form onSubmit={handleUploadMaterialSubmit} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="e.g. Rotational Dynamics Comprehensive Formula & Mind Map"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Resource Type (8 Types) *</label>
                  <select
                    value={matType}
                    onChange={(e) => setMatType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    <option value="PDF">PDF Class Notes</option>
                    <option value="DPP">Daily Practice Problem (DPP)</option>
                    <option value="MindMap">Mind Map / Flowchart</option>
                    <option value="FormulaSheet">Formula Cheat Sheet</option>
                    <option value="Handwritten">Faculty Handwritten Notes</option>
                    <option value="PYQ">Previous Years Questions (PYQ)</option>
                    <option value="MockPaper">Mock Exam Paper</option>
                    <option value="Flashcards">High-Yield Flashcards</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Subject *</label>
                  <input
                    type="text"
                    required
                    value={matSubject}
                    onChange={(e) => setMatSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pages Count</label>
                  <input
                    type="number"
                    value={matPages}
                    onChange={(e) => setMatPages(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">File Size</label>
                  <input
                    type="text"
                    value={matFileSize}
                    onChange={(e) => setMatFileSize(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadMaterialModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SCHEDULE LIVE CLASS */}
      {/* ========================================================================= */}
      {showScheduleLiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-600" /> Schedule Live Masterclass
              </h3>
              <button onClick={() => setShowScheduleLiveModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>

            <form onSubmit={handleScheduleLiveSubmit} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Title *</label>
                <input
                  type="text"
                  required
                  value={liveTitle}
                  onChange={(e) => setLiveTitle(e.target.value)}
                  placeholder="e.g. Advanced Problem Solving on Rotational Dynamics"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={liveDate}
                    onChange={(e) => setLiveDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Time *</label>
                  <input
                    type="time"
                    required
                    value={liveTime}
                    onChange={(e) => setLiveTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Topics Covered (Comma separated)</label>
                <input
                  type="text"
                  value={liveTopics}
                  onChange={(e) => setLiveTopics(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleLiveModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Schedule Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CREATE ASSIGNMENT */}
      {/* ========================================================================= */}
      {showCreateAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Create Assignment / DPP
              </h3>
              <button onClick={() => setShowCreateAssignmentModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>

            <form onSubmit={handleCreateAssignmentSubmit} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={asgnTitle}
                  onChange={(e) => setAsgnTitle(e.target.value)}
                  placeholder="e.g. DPP-04: Rigid Body Equilibrium Problems"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Instructions *</label>
                <textarea
                  rows={3}
                  required
                  value={asgnDesc}
                  onChange={(e) => setAsgnDesc(e.target.value)}
                  placeholder="Provide problem breakdown and required derivation steps..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={asgnDueDate}
                    onChange={(e) => setAsgnDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Points *</label>
                  <input
                    type="number"
                    required
                    value={asgnTotalPoints}
                    onChange={(e) => setAsgnTotalPoints(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateAssignmentModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CREATE QUESTIONS (7 TYPES) */}
      {/* ========================================================================= */}
      {showCreateQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" /> Create Question (7 Question Types)
              </h3>
              <button onClick={() => setShowCreateQuestionModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>

            <form onSubmit={handleCreateQuestionSubmit} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={qSubject}
                    onChange={(e) => setQSubject(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chapter *</label>
                  <input
                    type="text"
                    required
                    value={qChapter}
                    onChange={(e) => setQChapter(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Topic *</label>
                  <input
                    type="text"
                    required
                    value={qTopic}
                    onChange={(e) => setQTopic(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Question Type *</label>
                  <select
                    value={qType}
                    onChange={(e) => setQType(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white font-bold text-purple-900"
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
                  <label className="block font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={qDifficulty}
                    onChange={(e) => setQDifficulty(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard / Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Question Formulation *</label>
                <textarea
                  rows={3}
                  required
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Type problem statement, formulas, or scenario..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateQuestionModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: CONDUCT TESTS */}
      {/* ========================================================================= */}
      {showConductTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" /> Conduct & Launch CBT Test
              </h3>
              <button onClick={() => setShowConductTestModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>

            <form onSubmit={handleConductTestSubmit} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Test Title *</label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="e.g. All-India Mock Test 06 (JEE Advanced Full Syllabus)"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={testCategory}
                    onChange={(e) => setTestCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={testSubject}
                    onChange={(e) => setTestSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Min)</label>
                  <input
                    type="number"
                    value={testDuration}
                    onChange={(e) => setTestDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={testTotalMarks}
                    onChange={(e) => setTestTotalMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passing Mark</label>
                  <input
                    type="number"
                    value={testPassingScore}
                    onChange={(e) => setTestPassingScore(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConductTestModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Launch Test Series
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: GRADE ASSIGNMENT */}
      {/* ========================================================================= */}
      {selectedGradingAsn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" /> Grade Student Assignment
              </h4>
              <button onClick={() => setSelectedGradingAsn(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <p className="text-slate-600">Assignment: <strong>{selectedGradingAsn.title}</strong></p>

            <form onSubmit={handleGradeSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Awarded Score (out of {selectedGradingAsn.totalPoints}) *
                </label>
                <input
                  type="number"
                  max={selectedGradingAsn.totalPoints}
                  min={0}
                  required
                  value={awardedScore}
                  onChange={(e) => setAwardedScore(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Faculty Evaluation & Remarks</label>
                <textarea
                  rows={3}
                  value={facultyFeedbackText}
                  onChange={(e) => setFacultyFeedbackText(e.target.value)}
                  placeholder="Excellent derivation! Pay attention to sign convention in Step 3."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGradingAsn(null)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Publish Scorecard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
