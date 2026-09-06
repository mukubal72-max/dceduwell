import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AcademicBatch,
  BatchStudent,
  BatchFaculty,
  BatchVideo,
  BatchTest,
  BatchStudyMaterial
} from '../../types';
import {
  Layers,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Video,
  FileCheck,
  FolderDown,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertCircle,
  X,
  UserPlus,
  Play,
  FileText,
  Percent,
  Radio
} from 'lucide-react';

export const BatchManagerView: React.FC = () => {
  const {
    batches,
    addBatch,
    updateBatch,
    deleteBatch,
    addStudentToBatch,
    removeStudentFromBatch,
    addFacultyToBatch,
    removeFacultyFromBatch,
    addVideoToBatch,
    addTestToBatch,
    addMaterialToBatch,
    courses
  } = useApp();

  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');

  // Active sub-tab inside the selected batch
  const [batchTab, setBatchTab] = useState<
    'schedule' | 'students' | 'faculty' | 'subjects' | 'videos' | 'tests' | 'materials'
  >('schedule');

  // Modals state
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  // New Batch Form State
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchCode, setNewBatchCode] = useState('');
  const [newBatchCourseId, setNewBatchCourseId] = useState(courses[0]?.id || 'crs-jee-pinnacle');
  const [newBatchExam, setNewBatchExam] = useState('JEE Advanced 2026');
  const [newBatchYear, setNewBatchYear] = useState('2025-2026');
  const [newBatchCapacity, setNewBatchCapacity] = useState(60);
  const [newBatchStatus, setNewBatchStatus] = useState<AcademicBatch['status']>('Active');
  const [newBatchDescription, setNewBatchDescription] = useState('');
  const [newBatchDays, setNewBatchDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [newBatchTimeSlot, setNewBatchTimeSlot] = useState('05:30 PM - 08:00 PM');
  const [newBatchStartDate, setNewBatchStartDate] = useState('2026-03-15');
  const [newBatchEndDate, setNewBatchEndDate] = useState('2026-12-31');
  const [newBatchStreamLink, setNewBatchStreamLink] = useState('https://live.dcmaxwell.edu/stream/room-alpha');
  const [newBatchSubjects, setNewBatchSubjects] = useState('Physics, Chemistry, Mathematics');

  // Child Item Forms
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    enrollmentNo: ''
  });

  const [facultyForm, setFacultyForm] = useState({
    name: '',
    subject: 'Physics',
    role: 'Lead Master Faculty',
    email: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    subject: 'Physics',
    faculty: 'Er. Rajeshwar Varma',
    duration: '1h 45m',
    url: 'https://stream.dcmaxwell.edu/vod/lecture-preview'
  });

  const [testForm, setTestForm] = useState({
    title: '',
    subject: 'Physics',
    totalMarks: 100,
    durationMinutes: 60,
    scheduledDate: '2026-03-20',
    status: 'Upcoming' as BatchTest['status']
  });

  const [materialForm, setMaterialForm] = useState({
    title: '',
    subject: 'Physics',
    type: 'DPP' as BatchStudyMaterial['type'],
    fileSize: '12.4 MB',
    pages: 45,
    downloadUrl: 'https://assets.dcmaxwell.edu/pdf/sample_module.pdf'
  });

  const [newSubjectName, setNewSubjectName] = useState('');

  const activeBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const filteredBatches = batches.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.targetExam.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Create Batch
  const handleCreateBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim() || !newBatchCode.trim()) return;

    const matchedCourse = courses.find(c => c.id === newBatchCourseId);
    const subjectsArray = newBatchSubjects.split(',').map(s => s.trim()).filter(Boolean);

    const created: AcademicBatch = {
      id: `batch-${Date.now()}`,
      name: newBatchName.trim(),
      code: newBatchCode.trim().toUpperCase(),
      courseId: newBatchCourseId,
      courseTitle: matchedCourse?.title || newBatchExam,
      targetExam: newBatchExam,
      academicYear: newBatchYear,
      status: newBatchStatus,
      maxCapacity: Number(newBatchCapacity) || 50,
      description: newBatchDescription.trim() || 'High-yield curriculum batch for dedicated aspirants.',
      schedule: {
        days: newBatchDays,
        timeSlot: newBatchTimeSlot,
        startDate: newBatchStartDate,
        endDate: newBatchEndDate,
        roomOrStreamLink: newBatchStreamLink,
        isOnline: true,
        totalClassesScheduled: 120,
        classesCompleted: 0
      },
      subjects: subjectsArray.length > 0 ? subjectsArray : ['Physics', 'Chemistry', 'Mathematics'],
      students: [],
      faculty: [
        {
          id: `fac-${Date.now()}`,
          name: matchedCourse?.faculty || 'Er. Rajeshwar Varma',
          subject: subjectsArray[0] || 'Core Subject',
          role: 'Lead Master Faculty',
          email: 'faculty@dcmaxwell.edu',
          phone: '+91 98111 22334',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      ],
      videos: [],
      tests: [],
      studyMaterial: []
    };

    addBatch(created);
    setSelectedBatchId(created.id);
    setShowCreateBatchModal(false);

    // Reset Form
    setNewBatchName('');
    setNewBatchCode('');
    setNewBatchDescription('');
  };

  // Student Add
  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name.trim() || !activeBatch) return;

    const newStudent: BatchStudent = {
      id: `std-${Date.now()}`,
      name: studentForm.name.trim(),
      email: studentForm.email.trim() || `${studentForm.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone: studentForm.phone.trim() || '+91 98765 00000',
      enrollmentNo: studentForm.enrollmentNo.trim() || `DCM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      enrolledDate: new Date().toISOString().split('T')[0],
      attendancePercent: 100,
      status: 'Active'
    };

    addStudentToBatch(activeBatch.id, newStudent);
    setShowAddStudentModal(false);
    setStudentForm({ name: '', email: '', phone: '', enrollmentNo: '' });
  };

  // Faculty Add
  const handleAddFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyForm.name.trim() || !activeBatch) return;

    const newFac: BatchFaculty = {
      id: `fac-${Date.now()}`,
      name: facultyForm.name.trim(),
      subject: facultyForm.subject,
      role: facultyForm.role,
      email: facultyForm.email.trim() || `${facultyForm.name.toLowerCase().replace(/\s+/g, '')}@dcmaxwell.edu`,
      phone: facultyForm.phone.trim() || '+91 98000 11111',
      avatar: facultyForm.avatar
    };

    addFacultyToBatch(activeBatch.id, newFac);
    setShowAddFacultyModal(false);
    setFacultyForm({
      name: '',
      subject: 'Physics',
      role: 'Lead Master Faculty',
      email: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    });
  };

  // Video Add
  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title.trim() || !activeBatch) return;

    const newVid: BatchVideo = {
      id: `bvid-${Date.now()}`,
      title: videoForm.title.trim(),
      subject: videoForm.subject,
      faculty: videoForm.faculty,
      duration: videoForm.duration,
      url: videoForm.url,
      recordedDate: new Date().toISOString().split('T')[0],
      isLiveRecording: true
    };

    addVideoToBatch(activeBatch.id, newVid);
    setShowAddVideoModal(false);
    setVideoForm({
      title: '',
      subject: activeBatch.subjects[0] || 'Physics',
      faculty: activeBatch.faculty[0]?.name || 'Er. Rajeshwar Varma',
      duration: '1h 45m',
      url: 'https://stream.dcmaxwell.edu/vod/lecture-preview'
    });
  };

  // Test Add
  const handleAddTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.title.trim() || !activeBatch) return;

    const newTst: BatchTest = {
      id: `btst-${Date.now()}`,
      title: testForm.title.trim(),
      subject: testForm.subject,
      totalMarks: Number(testForm.totalMarks) || 100,
      durationMinutes: Number(testForm.durationMinutes) || 60,
      scheduledDate: testForm.scheduledDate,
      status: testForm.status
    };

    addTestToBatch(activeBatch.id, newTst);
    setShowAddTestModal(false);
    setTestForm({
      title: '',
      subject: activeBatch.subjects[0] || 'Physics',
      totalMarks: 100,
      durationMinutes: 60,
      scheduledDate: '2026-03-20',
      status: 'Upcoming'
    });
  };

  // Study Material Add
  const handleAddMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialForm.title.trim() || !activeBatch) return;

    const newMat: BatchStudyMaterial = {
      id: `bmat-${Date.now()}`,
      title: materialForm.title.trim(),
      subject: materialForm.subject,
      type: materialForm.type,
      fileSize: materialForm.fileSize,
      pages: Number(materialForm.pages) || 30,
      downloadUrl: materialForm.downloadUrl,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    addMaterialToBatch(activeBatch.id, newMat);
    setShowAddMaterialModal(false);
    setMaterialForm({
      title: '',
      subject: activeBatch.subjects[0] || 'Physics',
      type: 'DPP',
      fileSize: '12.4 MB',
      pages: 45,
      downloadUrl: 'https://assets.dcmaxwell.edu/pdf/sample_module.pdf'
    });
  };

  // Subject Add
  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim() || !activeBatch) return;
    if (activeBatch.subjects.includes(newSubjectName.trim())) return;

    const updated = {
      ...activeBatch,
      subjects: [...activeBatch.subjects, newSubjectName.trim()]
    };
    updateBatch(updated);
    setNewSubjectName('');
    setShowAddSubjectModal(false);
  };

  const handleRemoveSubject = (sub: string) => {
    if (!activeBatch) return;
    const updated = {
      ...activeBatch,
      subjects: activeBatch.subjects.filter(s => s !== sub)
    };
    updateBatch(updated);
  };

  const toggleDayInNewBatch = (day: string) => {
    if (newBatchDays.includes(day)) {
      setNewBatchDays(newBatchDays.filter(d => d !== day));
    } else {
      setNewBatchDays([...newBatchDays, day]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5">
              <Layers className="w-3 h-3" /> Academic Operations
            </span>
            <span className="text-xs text-slate-400 font-medium">Cohort Lifecycle Management</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white font-sans">
            Academic Batch Management Engine
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Create and administer multi-tier academic cohorts with complete controls for enrolled students, lead faculty, live lecture schedules, subject curricula, recorded video vaults, CBT assessments, and high-yield study materials.
          </p>
        </div>

        <button
          onClick={() => setShowCreateBatchModal(true)}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/25 shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Batch
        </button>
      </div>

      {/* Main Grid: Left Sidebar (Batch List) + Right Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Batch Directory */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" /> Active Batches ({filteredBatches.length})
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Total: {batches.length}</span>
            </div>

            {/* Search & Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by batch name, code or exam..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-bold pb-1">
                {(['All', 'Active', 'Upcoming', 'Completed'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer shrink-0 ${
                      statusFilter === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Batches */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredBatches.map((batch) => {
                const isSelected = activeBatch?.id === batch.id;
                const percentFull = Math.min(100, Math.round((batch.students.length / batch.maxCapacity) * 100));

                return (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatchId(batch.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                          {batch.code}
                        </span>
                        <h4 className="font-extrabold text-xs text-slate-900 mt-1 leading-snug">
                          {batch.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{batch.targetExam} • {batch.academicYear}</p>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        batch.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : batch.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {batch.status}
                      </span>
                    </div>

                    {/* Quick Capacity Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Enrollment: <b>{batch.students.length}</b>/{batch.maxCapacity}</span>
                        <span>{percentFull}% Full</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            percentFull >= 90 ? 'bg-rose-500' : percentFull >= 60 ? 'bg-amber-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${percentFull}%` }}
                        />
                      </div>
                    </div>

                    {/* Mini tags */}
                    <div className="flex items-center gap-3 text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-blue-600" /> {batch.students.length} Students
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-purple-600" /> {batch.faculty.length} Faculty
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-rose-500" /> {batch.videos.length} VODs
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredBatches.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No batches found matching criteria.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Batch Administration Console */}
        <div className="lg:col-span-8 space-y-4">
          {activeBatch ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Batch Header Bar */}
              <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md">
                      {activeBatch.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeBatch.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {activeBatch.status} Batch
                    </span>
                    <span className="text-xs text-slate-300">Target: {activeBatch.targetExam}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{activeBatch.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-1">{activeBatch.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${activeBatch.name}?`)) {
                        deleteBatch(activeBatch.id);
                        setSelectedBatchId(batches.find(b => b.id !== activeBatch.id)?.id || '');
                      }
                    }}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-rose-500/30 text-rose-300 hover:text-white transition cursor-pointer border border-white/10"
                    title="Delete Batch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 7 Dimensional Tabs Navigation */}
              <div className="px-6 border-b border-slate-200 bg-slate-50/70 flex items-center gap-2 overflow-x-auto text-xs font-bold py-2.5">
                {[
                  { id: 'schedule', label: 'Schedule & Timetable', icon: <Calendar className="w-3.5 h-3.5 text-blue-600" /> },
                  { id: 'students', label: `Students (${activeBatch.students.length})`, icon: <Users className="w-3.5 h-3.5 text-emerald-600" /> },
                  { id: 'faculty', label: `Faculty (${activeBatch.faculty.length})`, icon: <GraduationCap className="w-3.5 h-3.5 text-purple-600" /> },
                  { id: 'subjects', label: `Subjects (${activeBatch.subjects.length})`, icon: <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> },
                  { id: 'videos', label: `Videos (${activeBatch.videos.length})`, icon: <Video className="w-3.5 h-3.5 text-rose-500" /> },
                  { id: 'tests', label: `Tests (${activeBatch.tests.length})`, icon: <FileCheck className="w-3.5 h-3.5 text-amber-600" /> },
                  { id: 'materials', label: `Study Material (${activeBatch.studyMaterial.length})`, icon: <FolderDown className="w-3.5 h-3.5 text-cyan-600" /> }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setBatchTab(t.id as any)}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      batchTab === t.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content Panels */}
              <div className="p-6">
                
                {/* 1. SCHEDULE & TIMETABLE TAB */}
                {batchTab === 'schedule' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1">
                        <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Class Days</span>
                        <div className="flex items-center gap-1.5 pt-1">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <span
                              key={day}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                activeBatch.schedule.days.includes(day)
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-200 text-slate-400'
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-1">
                        <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider">Live Time Slot</span>
                        <div className="flex items-center gap-2 pt-1 font-extrabold text-sm text-slate-900">
                          <Clock className="w-4 h-4 text-indigo-600" /> {activeBatch.schedule.timeSlot}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Duration & Completion</span>
                        <p className="text-xs text-slate-700 pt-1 font-semibold">
                          {activeBatch.schedule.startDate} to {activeBatch.schedule.endDate}
                        </p>
                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span>Progress:</span>
                          <b>{activeBatch.schedule.classesCompleted} / {activeBatch.schedule.totalClassesScheduled} Classes</b>
                        </div>
                      </div>
                    </div>

                    {/* Room & Stream Info */}
                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                          <Radio className="w-4 h-4 text-rose-500 animate-pulse" /> Live Classroom Stream URL / Physical Hall
                        </h4>
                        <p className="text-xs font-mono text-blue-700 break-all">{activeBatch.schedule.roomOrStreamLink}</p>
                      </div>

                      <a
                        href={activeBatch.schedule.roomOrStreamLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Test Stream Link
                      </a>
                    </div>
                  </div>
                )}

                {/* 2. STUDENTS TAB */}
                {batchTab === 'students' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Enrolled Students Roster</h4>
                        <p className="text-xs text-slate-500">
                          {activeBatch.students.length} of {activeBatch.maxCapacity} seats filled
                        </p>
                      </div>

                      <button
                        onClick={() => setShowAddStudentModal(true)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <UserPlus className="w-4 h-4" /> Add Student
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                            <th className="py-3 px-4">Enrollment No</th>
                            <th className="py-3 px-4">Student Name</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Enrolled Date</th>
                            <th className="py-3 px-4">Attendance</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {activeBatch.students.map(std => (
                            <tr key={std.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-4 font-mono font-bold text-slate-900">{std.enrollmentNo}</td>
                              <td className="py-3 px-4 font-bold text-slate-900">{std.name}</td>
                              <td className="py-3 px-4 text-slate-600">
                                <div>{std.phone}</div>
                                <div className="text-[11px] text-slate-400">{std.email}</div>
                              </td>
                              <td className="py-3 px-4 text-slate-600">{std.enrolledDate}</td>
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  std.attendancePercent >= 90
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {std.attendancePercent}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => removeStudentFromBatch(activeBatch.id, std.id)}
                                  className="text-rose-600 hover:text-rose-800 p-1 transition cursor-pointer"
                                  title="Remove from batch"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}

                          {activeBatch.students.length === 0 && (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-slate-400">
                                No students added to this batch yet. Click "Add Student" to register aspirants.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. FACULTY TAB */}
                {batchTab === 'faculty' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Assigned Master Mentors & Faculty</h4>
                        <p className="text-xs text-slate-500">Expert educators delivering live lectures and conducting problem clinics</p>
                      </div>

                      <button
                        onClick={() => setShowAddFacultyModal(true)}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Assign Faculty
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeBatch.faculty.map(fac => (
                        <div key={fac.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-start justify-between gap-3 shadow-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={fac.avatar}
                              alt={fac.name}
                              className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                            />
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md">
                                {fac.subject}
                              </span>
                              <h5 className="font-extrabold text-sm text-slate-900 mt-1">{fac.name}</h5>
                              <p className="text-[11px] text-slate-500">{fac.role}</p>
                              <div className="text-[11px] text-slate-400 mt-0.5">{fac.email} • {fac.phone}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFacultyFromBatch(activeBatch.id, fac.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer"
                            title="Unassign Faculty"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      {activeBatch.faculty.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-slate-400 text-xs">
                          No faculty assigned to this batch. Click "Assign Faculty" to add mentors.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. SUBJECTS TAB */}
                {batchTab === 'subjects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Curriculum Subjects</h4>
                        <p className="text-xs text-slate-500">Disciplines covered under this batch timetable</p>
                      </div>

                      <button
                        onClick={() => setShowAddSubjectModal(true)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add Subject
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {activeBatch.subjects.map(sub => (
                        <div
                          key={sub}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{sub}</span>
                          <button
                            onClick={() => handleRemoveSubject(sub)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                            title="Delete subject"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. VIDEOS TAB */}
                {batchTab === 'videos' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Recorded Lecture Vault & VODs</h4>
                        <p className="text-xs text-slate-500">Archived classes and recorded video content for revision</p>
                      </div>

                      <button
                        onClick={() => setShowAddVideoModal(true)}
                        className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add Video Lecture
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {activeBatch.videos.map(vid => (
                        <div
                          key={vid.id}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4 hover:border-slate-300 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                              <Play className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                  {vid.subject}
                                </span>
                                <span className="text-[11px] text-slate-400">Duration: {vid.duration}</span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-900 mt-0.5">{vid.title}</h5>
                              <p className="text-[11px] text-slate-500">Mentor: {vid.faculty} • Recorded: {vid.recordedDate}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={vid.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" /> View VOD
                            </a>
                          </div>
                        </div>
                      ))}

                      {activeBatch.videos.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-xs">
                          No lecture recordings uploaded for this batch yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 6. TESTS TAB */}
                {batchTab === 'tests' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Batch Assessments & CBT Mock Tests</h4>
                        <p className="text-xs text-slate-500">Scheduled diagnostic quizzes, part tests, and full mock drills</p>
                      </div>

                      <button
                        onClick={() => setShowAddTestModal(true)}
                        className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Schedule Assessment
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {activeBatch.tests.map(tst => (
                        <div
                          key={tst.id}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4 hover:border-slate-300 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                              <FileCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                                  {tst.subject}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  tst.status === 'Completed' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {tst.status}
                                </span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-900 mt-0.5">{tst.title}</h5>
                              <p className="text-[11px] text-slate-500">
                                {tst.totalMarks} Marks • {tst.durationMinutes} Minutes • Scheduled: {tst.scheduledDate}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-slate-700">
                            {tst.scheduledDate}
                          </span>
                        </div>
                      ))}

                      {activeBatch.tests.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-xs">
                          No CBT tests scheduled for this batch yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 7. STUDY MATERIAL TAB */}
                {batchTab === 'materials' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">Curated Batch Study Modules & DPPs</h4>
                        <p className="text-xs text-slate-500">Handouts, formula bibles, daily practice problem sheets and question banks</p>
                      </div>

                      <button
                        onClick={() => setShowAddMaterialModal(true)}
                        className="px-3.5 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Upload Study Material
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {activeBatch.studyMaterial.map(mat => (
                        <div
                          key={mat.id}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4 hover:border-slate-300 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                              <FolderDown className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-cyan-100 text-cyan-900 px-2 py-0.5 rounded-md">
                                  {mat.type}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">{mat.subject}</span>
                                <span className="text-[11px] text-slate-400">• {mat.fileSize}</span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-900 mt-0.5">{mat.title}</h5>
                              <p className="text-[11px] text-slate-500">
                                {mat.pages ? `${mat.pages} Pages • ` : ''}Uploaded on: {mat.uploadDate}
                              </p>
                            </div>
                          </div>

                          <a
                            href={mat.downloadUrl || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1"
                          >
                            <FolderDown className="w-3.5 h-3.5" /> PDF
                          </a>
                        </div>
                      ))}

                      {activeBatch.studyMaterial.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-xs">
                          No study materials uploaded for this cohort yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              Select or create a batch to inspect details.
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: CREATE BATCH */}
      {/* ========================================================================= */}
      {showCreateBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" /> Create Academic Batch
                </h3>
                <p className="text-xs text-slate-500">Setup cohort code, timetable schedule, and target curriculum</p>
              </div>
              <button
                onClick={() => setShowCreateBatchModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatchSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Batch Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pinnacle JEE 2026 - Alpha Elite"
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Batch Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PIN-JEE-26-ALPHA"
                    value={newBatchCode}
                    onChange={(e) => setNewBatchCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Exam</label>
                  <select
                    value={newBatchExam}
                    onChange={(e) => setNewBatchExam(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="JEE Advanced 2026">JEE Advanced 2026</option>
                    <option value="JEE Main 2026">JEE Main 2026</option>
                    <option value="NEET UG 2026">NEET UG 2026</option>
                    <option value="UPSC CSE 2026">UPSC CSE 2026</option>
                    <option value="CBSE Class 12th">CBSE Class 12th</option>
                    <option value="Foundation 9-10th">Foundation 9-10th</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Academic Year</label>
                  <input
                    type="text"
                    value={newBatchYear}
                    onChange={(e) => setNewBatchYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Capacity Limit</label>
                  <input
                    type="number"
                    value={newBatchCapacity}
                    onChange={(e) => setNewBatchCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Schedule Days */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lecture Days</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDayInNewBatch(day)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                        newBatchDays.includes(day)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Time Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. 05:30 PM - 08:00 PM"
                    value={newBatchTimeSlot}
                    onChange={(e) => setNewBatchTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    value={newBatchStartDate}
                    onChange={(e) => setNewBatchStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">End Date</label>
                  <input
                    type="date"
                    value={newBatchEndDate}
                    onChange={(e) => setNewBatchEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Subjects (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Physics, Physical Chemistry, Organic Chemistry, Mathematics"
                  value={newBatchSubjects}
                  onChange={(e) => setNewBatchSubjects(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Live Stream URL / Room</label>
                <input
                  type="url"
                  placeholder="https://live.dcmaxwell.edu/stream/batch-room"
                  value={newBatchStreamLink}
                  onChange={(e) => setNewBatchStreamLink(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  placeholder="Cohort goals and pedagogy focus..."
                  value={newBatchDescription}
                  onChange={(e) => setNewBatchDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateBatchModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition cursor-pointer shadow-md"
                >
                  Create Batch Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD STUDENT TO BATCH */}
      {/* ========================================================================= */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" /> Enroll Student in {activeBatch?.code}
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  value={studentForm.name}
                  onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={studentForm.phone}
                  onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={studentForm.email}
                  onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Enrollment ID (optional)</label>
                <input
                  type="text"
                  placeholder="DCM-2026-XXXX"
                  value={studentForm.enrollmentNo}
                  onChange={e => setStudentForm({ ...studentForm, enrollmentNo: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ASSIGN FACULTY */}
      {/* ========================================================================= */}
      {showAddFacultyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-600" /> Assign Faculty Mentor
              </h3>
              <button
                onClick={() => setShowAddFacultyModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFacultySubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Faculty Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Anandita Roy"
                  value={facultyForm.name}
                  onChange={e => setFacultyForm({ ...facultyForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject</label>
                  <select
                    value={facultyForm.subject}
                    onChange={e => setFacultyForm({ ...facultyForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {activeBatch?.subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Role</label>
                  <select
                    value={facultyForm.role}
                    onChange={e => setFacultyForm({ ...facultyForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Lead Master Faculty">Lead Master Faculty</option>
                    <option value="Subject Expert">Subject Expert</option>
                    <option value="Doubt & Problem Specialist">Doubt Specialist</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="faculty@dcmaxwell.edu"
                  value={facultyForm.email}
                  onChange={e => setFacultyForm({ ...facultyForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddFacultyModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Assign to Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD VIDEO TO BATCH */}
      {/* ========================================================================= */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-600" /> Add Video to {activeBatch?.code}
              </h3>
              <button
                onClick={() => setShowAddVideoModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddVideoSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lecture Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electromagnetic Induction: Faraday Law"
                  value={videoForm.title}
                  onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject</label>
                  <select
                    value={videoForm.subject}
                    onChange={e => setVideoForm({ ...videoForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {activeBatch?.subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Duration</label>
                  <input
                    type="text"
                    placeholder="1h 45m"
                    value={videoForm.duration}
                    onChange={e => setVideoForm({ ...videoForm, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Faculty</label>
                <select
                  value={videoForm.faculty}
                  onChange={e => setVideoForm({ ...videoForm, faculty: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {activeBatch?.faculty.map(f => (
                    <option key={f.id} value={f.name}>{f.name} ({f.subject})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Stream / VOD URL</label>
                <input
                  type="url"
                  value={videoForm.url}
                  onChange={e => setVideoForm({ ...videoForm, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Add Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD TEST TO BATCH */}
      {/* ========================================================================= */}
      {showAddTestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-600" /> Schedule Batch Assessment
              </h3>
              <button
                onClick={() => setShowAddTestModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTestSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Test Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBT Part Test 03: Thermodynamics"
                  value={testForm.title}
                  onChange={e => setTestForm({ ...testForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject</label>
                  <select
                    value={testForm.subject}
                    onChange={e => setTestForm({ ...testForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {activeBatch?.subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Scheduled Date</label>
                  <input
                    type="date"
                    value={testForm.scheduledDate}
                    onChange={e => setTestForm({ ...testForm, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Total Marks</label>
                  <input
                    type="number"
                    value={testForm.totalMarks}
                    onChange={e => setTestForm({ ...testForm, totalMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={testForm.durationMinutes}
                    onChange={e => setTestForm({ ...testForm, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTestModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Schedule Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD STUDY MATERIAL */}
      {/* ========================================================================= */}
      {showAddMaterialModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <FolderDown className="w-4 h-4 text-cyan-700" /> Upload Study Material
              </h3>
              <button
                onClick={() => setShowAddMaterialModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMaterialSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Yield Organic Chemistry Reaction Roadmaps"
                  value={materialForm.title}
                  onChange={e => setMaterialForm({ ...materialForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject</label>
                  <select
                    value={materialForm.subject}
                    onChange={e => setMaterialForm({ ...materialForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {activeBatch?.subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Document Type</label>
                  <select
                    value={materialForm.type}
                    onChange={e => setMaterialForm({ ...materialForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="DPP">DPP (Daily Practice)</option>
                    <option value="Notes">Detailed Notes</option>
                    <option value="Formula Sheet">Formula Sheet</option>
                    <option value="Assignment">Assignment</option>
                    <option value="PDF">PDF Module</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">File Size</label>
                  <input
                    type="text"
                    placeholder="14.5 MB"
                    value={materialForm.fileSize}
                    onChange={e => setMaterialForm({ ...materialForm, fileSize: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pages Count</label>
                  <input
                    type="number"
                    value={materialForm.pages}
                    onChange={e => setMaterialForm({ ...materialForm, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMaterialModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Attach to Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD SUBJECT */}
      {/* ========================================================================= */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Add Subject to Batch
              </h3>
              <button
                onClick={() => setShowAddSubjectModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubjectSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Subject Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Physics / Zoology"
                  value={newSubjectName}
                  onChange={e => setNewSubjectName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
