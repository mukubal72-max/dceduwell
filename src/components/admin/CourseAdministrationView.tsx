import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseCategory, CourseFormat, Chapter, Lesson } from '../../types';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Copy,
  CheckCircle2,
  XCircle,
  UserCheck,
  Calendar,
  Clock,
  Tag,
  DollarSign,
  Search,
  Filter,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Award,
  Video,
  ShieldCheck,
  Check,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export const CourseAdministrationView: React.FC = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    duplicateCourse,
    togglePublishCourse,
    assignFacultyToCourse,
    assignBatchToCourse,
    setCoursePricing,
    setCourseValidity
  } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Create / Edit Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<Course | null>(null);

  // Quick Action Modals
  const [facultyModalCourse, setFacultyModalCourse] = useState<Course | null>(null);
  const [selectedFacultyName, setSelectedFacultyName] = useState('');
  const [selectedFacultyDesignation, setSelectedFacultyDesignation] = useState('');

  const [batchModalCourse, setBatchModalCourse] = useState<Course | null>(null);
  const [selectedBatchName, setSelectedBatchName] = useState('');

  const [pricingModalCourse, setPricingModalCourse] = useState<Course | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number>(0);

  const [validityModalCourse, setValidityModalCourse] = useState<Course | null>(null);
  const [newValidity, setNewValidity] = useState<string>('12 Months Access');

  // Form State for Create/Edit Course
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    tagline: '',
    category: 'JEE (Main & Adv)',
    format: 'Comprehensive Live Batch',
    targetExam: 'JEE Advanced 2026',
    language: 'Hinglish & English',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    price: 14999,
    originalPrice: 24999,
    discountPercentage: 40,
    facultyName: 'Er. Rajeshwar Varma (IIT Delhi, 18+ Yrs Exp)',
    facultyDesignation: 'Senior Master Faculty - Physics',
    facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    facultyBio: 'Mentored 45+ Top 100 AIRs in JEE Advanced.',
    validity: '12 Months Access (Till Exam)',
    startDate: 'March 1, 2026',
    batchName: 'Pinnacle Alpha Morning Batch 2026',
    isPublished: true,
    status: 'published',
    isFeatured: true,
    includesTestSeries: true,
    includesHardcopyBooks: true,
    certificateProvided: true,
    features: [
      '600+ Hours Live Interactive Interactive Masterclasses',
      'Daily Practice Problem (DPP) with Video Solutions',
      '30 All India Mock Tests (NTA CBT Pattern)',
      '1-on-1 Personalized Mentorship & Live Doubt Rooms'
    ]
  });

  // Pre-configured Faculty Directory
  const facultyDirectory = [
    {
      name: 'Er. Rajeshwar Varma (IIT Delhi, 18+ Yrs Exp)',
      designation: 'Senior Master Faculty - Physics & Mechanics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'CA CS Nitin Sharma (AIR 3 ICAI)',
      designation: 'HOD - Financial Accounting & Corporate Law',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Dr. Ananya Mukherjee (AIIMS Gold Medalist)',
      designation: 'Lead Faculty - Human Physiology & Botany',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Prof. S. K. Rastogi (Ex-IAS Officer)',
      designation: 'Chief Academician - General Studies & Ethics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Er. Aman Khandelwal (IIT Bombay)',
      designation: 'Master Faculty - Physical & Organic Chemistry',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  ];

  // Pre-configured Batch List
  const standardBatches = [
    'Alpha Morning Star Batch (07:00 AM - 10:30 AM)',
    'Pinnacle Regular Day Batch (11:00 AM - 03:00 PM)',
    'Super 30 Target Evening Batch (05:00 PM - 09:00 PM)',
    'Weekend Intensive Fastrack Batch (Sat & Sun Full Day)',
    'Repeater / Dropper Target 2026 Cohort'
  ];

  // Validity Options
  const standardValidities = [
    '3 Months Intensive Access',
    '6 Months Semester Access',
    '12 Months Access (Till Exam 2026)',
    '24 Months Foundation Access (Till 2027)',
    'Till Exam Date (Dec 2026)',
    'Lifetime Unlimited Access'
  ];

  // Filtered Courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.batchName && course.batchName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

    const isPub = course.isPublished !== false && course.status !== 'draft';
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && isPub) ||
      (statusFilter === 'draft' && !isPub);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle Open Create Modal
  const handleOpenCreateModal = () => {
    setFormData({
      title: '',
      tagline: '',
      category: 'JEE (Main & Adv)',
      format: 'Comprehensive Live Batch',
      targetExam: 'JEE Advanced 2026',
      language: 'Hinglish & English',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      price: 14999,
      originalPrice: 24999,
      discountPercentage: 40,
      facultyName: facultyDirectory[0].name,
      facultyDesignation: facultyDirectory[0].designation,
      facultyAvatar: facultyDirectory[0].avatar,
      facultyBio: 'Top rated subject specialist.',
      validity: '12 Months Access (Till Exam)',
      startDate: 'March 1, 2026',
      batchName: 'Pinnacle Alpha Batch 2026',
      isPublished: true,
      status: 'published',
      isFeatured: true,
      includesTestSeries: true,
      includesHardcopyBooks: true,
      certificateProvided: true,
      features: [
        '600+ Hours Live Interactive Masterclasses',
        'Daily Practice Problem (DPP) with Video Solutions',
        '30 All India Mock Tests (NTA CBT Pattern)',
        '1-on-1 Personalized Mentorship & Live Doubt Rooms'
      ]
    });
    setIsCreateModalOpen(true);
  };

  // Handle Open Edit Modal
  const handleOpenEditModal = (course: Course) => {
    setSelectedCourseForEdit(course);
    setFormData({ ...course });
    setIsEditModalOpen(true);
  };

  // Submit Create Course
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    const discount = formData.originalPrice && formData.price && formData.originalPrice > formData.price
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      : 0;

    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title: formData.title || 'New Batch',
      tagline: formData.tagline || 'Comprehensive Preparation Program',
      category: (formData.category as CourseCategory) || 'JEE (Main & Adv)',
      format: (formData.format as CourseFormat) || 'Comprehensive Live',
      targetExam: formData.targetExam || 'Competitive Exam 2026',
      language: formData.language || 'Hinglish & English',
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
      bannerImage: formData.bannerImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      price: Number(formData.price) || 9999,
      originalPrice: Number(formData.originalPrice) || 19999,
      discountPercentage: discount,
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 0,
      facultyName: formData.facultyName || 'Senior Master Faculty',
      facultyDesignation: formData.facultyDesignation || 'Department Head',
      facultyAvatar: formData.facultyAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      facultyBio: formData.facultyBio || 'Academic mentor with 10+ years of teaching excellence.',
      validity: formData.validity || '12 Months Access',
      startDate: formData.startDate || 'March 1, 2026',
      batchName: formData.batchName || 'Main Cohort 2026',
      isPublished: formData.isPublished !== false,
      status: formData.status || 'published',
      isFeatured: formData.isFeatured || false,
      includesTestSeries: formData.includesTestSeries || true,
      includesHardcopyBooks: formData.includesHardcopyBooks || true,
      certificateProvided: formData.certificateProvided || true,
      features: formData.features || [
        'Live Interactive Masterclasses',
        'Daily Practice Problem (DPP) Sheets',
        'CBT Pattern Test Series'
      ],
      chapters: [
        {
          id: `chap-${Date.now()}-1`,
          subject: (formData.category as string) || 'Core Subject',
          title: 'Foundational Masterclass Module 1',
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              title: 'Module Overview & High-Yield Blueprint',
              durationMinutes: 60,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              isFreePreview: true,
              notesPdfTitle: 'Lecture_1_Comprehensive_Notes.pdf',
              summary: 'Complete introductory fundamentals and roadmap.',
              timestamps: [
                { time: '00:00', label: 'Intro & Syllabus Blueprint' },
                { time: '15:30', label: 'Core Principle Derivation' },
                { time: '40:00', label: 'Practice Numerical Drill' }
              ]
            }
          ]
        }
      ]
    };

    addCourse(newCourse);
    setIsCreateModalOpen(false);
  };

  // Submit Edit Course
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForEdit || !formData.title?.trim()) return;

    const discount = formData.originalPrice && formData.price && formData.originalPrice > formData.price
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      : 0;

    const updated: Course = {
      ...selectedCourseForEdit,
      ...formData,
      title: formData.title || selectedCourseForEdit.title,
      price: Number(formData.price) || selectedCourseForEdit.price,
      originalPrice: Number(formData.originalPrice) || selectedCourseForEdit.originalPrice,
      discountPercentage: discount,
      validity: formData.validity || selectedCourseForEdit.validity,
      batchName: formData.batchName || selectedCourseForEdit.batchName,
      facultyName: formData.facultyName || selectedCourseForEdit.facultyName,
      facultyDesignation: formData.facultyDesignation || selectedCourseForEdit.facultyDesignation,
      isPublished: formData.isPublished !== false,
      status: formData.status || selectedCourseForEdit.status || 'published'
    };

    updateCourse(updated);
    setIsEditModalOpen(false);
    setSelectedCourseForEdit(null);
  };

  // Assign Faculty Action
  const handleSaveFacultyAssignment = () => {
    if (!facultyModalCourse || !selectedFacultyName) return;
    assignFacultyToCourse(facultyModalCourse.id, selectedFacultyName, selectedFacultyDesignation);
    setFacultyModalCourse(null);
  };

  // Assign Batch Action
  const handleSaveBatchAssignment = () => {
    if (!batchModalCourse || !selectedBatchName) return;
    assignBatchToCourse(batchModalCourse.id, selectedBatchName);
    setBatchModalCourse(null);
  };

  // Set Pricing Action
  const handleSavePricing = () => {
    if (!pricingModalCourse || newPrice <= 0) return;
    setCoursePricing(pricingModalCourse.id, newPrice, newOriginalPrice || newPrice);
    setPricingModalCourse(null);
  };

  // Set Validity Action
  const handleSaveValidity = () => {
    if (!validityModalCourse || !newValidity) return;
    setCourseValidity(validityModalCourse.id, newValidity);
    setValidityModalCourse(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-900 px-2.5 py-0.5 rounded border border-indigo-200">
              Module 52 • Academic Administration
            </span>
            <span className="text-xs text-slate-500 font-medium">Enterprise Batch & Course Lifecycle Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-sans mt-1">Course & Batch Administration</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full administrative control: Create, Edit, Delete, Publish/Unpublish, Duplicate, Assign Faculty, Assign Batch Schedules, Set Dynamic Pricing & Configure Validity Periods.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Course / Batch
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            <span>Total Batches</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{courses.length}</p>
          <span className="text-[11px] text-slate-500">Across all categories</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            <span>Published Live</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            {courses.filter(c => c.isPublished !== false && c.status !== 'draft').length}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">Active in Store & App</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            <span>Draft / Unpublished</span>
            <EyeOff className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-800">
            {courses.filter(c => c.isPublished === false || c.status === 'draft').length}
          </p>
          <span className="text-[11px] text-amber-800 font-semibold">Staging / Hidden</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            <span>Total Enrolled</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-900">
            {courses.reduce((acc, c) => acc + c.enrolledCount, 0).toLocaleString()}
          </p>
          <span className="text-[11px] text-purple-900 font-semibold">Active Student Base</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by course title, faculty, batch name, exam..."
            className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
          >
            <option value="all">All Exam Categories</option>
            <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
            <option value="NEET (UG)">NEET (UG)</option>
            <option value="CA / CS / Commerce">CA / CS / Commerce</option>
            <option value="UPSC CSE / State PCS">UPSC CSE / State PCS</option>
            <option value="Class 11 & 12 Foundation">Class 11 & 12 Foundation</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
          >
            <option value="all">All Statuses (Published & Draft)</option>
            <option value="published">Published Only</option>
            <option value="draft">Draft / Unpublished Only</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Course Listing */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No courses match your filter criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setStatusFilter('all'); }}
            className="px-4 py-2 bg-indigo-50 text-indigo-900 font-bold rounded-xl text-xs hover:bg-indigo-100 transition cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => {
            const isPub = course.isPublished !== false && course.status !== 'draft';
            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-indigo-300 transition duration-200"
              >
                <div>
                  {/* Card Thumbnail & Status Overlay */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 ${
                          isPub
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        {isPub ? <CheckCircle2 className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {isPub ? 'Published' : 'Draft'}
                      </span>

                      <span className="text-[10px] font-bold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {course.category}
                      </span>
                    </div>

                    {/* Discount Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                        {course.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Title in image bottom */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <p className="text-[11px] font-medium text-slate-200 font-mono">
                        Batch: {course.batchName || 'General Morning Batch'}
                      </p>
                      <h4 className="font-bold text-xs line-clamp-1">{course.title}</h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 text-xs">
                    {/* Faculty Section with Quick Assign */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={course.facultyAvatar}
                          alt={course.facultyName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Assigned Faculty</span>
                          <p className="font-bold text-slate-900 truncate text-[11px]">{course.facultyName}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setFacultyModalCourse(course);
                          setSelectedFacultyName(course.facultyName);
                          setSelectedFacultyDesignation(course.facultyDesignation);
                        }}
                        className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-[10px] shrink-0 cursor-pointer shadow-2xs"
                        title="Change / Assign Faculty"
                      >
                        Change
                      </button>
                    </div>

                    {/* Batch & Validity Quick Info */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-0.5">
                        <div className="flex items-center justify-between text-indigo-900">
                          <span className="font-bold text-[10px] uppercase">Batch Info</span>
                          <button
                            onClick={() => {
                              setBatchModalCourse(course);
                              setSelectedBatchName(course.batchName || '');
                            }}
                            className="text-[10px] font-bold text-indigo-700 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="font-semibold text-indigo-950 truncate">{course.batchName || 'Alpha Batch'}</p>
                      </div>

                      <div className="p-2 bg-amber-50/60 rounded-xl border border-amber-100 space-y-0.5">
                        <div className="flex items-center justify-between text-amber-900">
                          <span className="font-bold text-[10px] uppercase">Validity</span>
                          <button
                            onClick={() => {
                              setValidityModalCourse(course);
                              setNewValidity(course.validity || '12 Months Access');
                            }}
                            className="text-[10px] font-bold text-amber-700 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="font-semibold text-amber-950 truncate">{course.validity || '12 Months'}</p>
                      </div>
                    </div>

                    {/* Pricing & Deliverables */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Pricing</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-slate-900">₹{course.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setPricingModalCourse(course);
                          setNewPrice(course.price);
                          setNewOriginalPrice(course.originalPrice);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-[10px] cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3 text-emerald-600" /> Set Price
                      </button>
                    </div>

                    {/* Enrolled & Features */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>{course.enrolledCount} Active Students Enrolled</span>
                      <span>{course.chapters?.length || 0} Chapters Included</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar: Publish/Unpublish, Edit, Duplicate, Delete */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1.5 text-xs">
                  {/* Publish / Unpublish Toggle */}
                  <button
                    onClick={() => togglePublishCourse(course.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      isPub
                        ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                    }`}
                    title={isPub ? 'Unpublish from store (Set Draft)' : 'Publish to store'}
                  >
                    {isPub ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isPub ? 'Unpublish' : 'Publish'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {/* Duplicate */}
                    <button
                      onClick={() => duplicateCourse(course.id)}
                      className="p-2 text-slate-700 hover:bg-slate-200 bg-white border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                      title="Duplicate Course / Clone Batch"
                    >
                      <Copy className="w-3.5 h-3.5 text-indigo-600" />
                    </button>

                    {/* Edit Full Course */}
                    <button
                      onClick={() => handleOpenEditModal(course)}
                      className="p-2 text-slate-700 hover:bg-slate-200 bg-white border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                      title="Edit Course Details"
                    >
                      <Edit className="w-3.5 h-3.5 text-slate-700" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to permanently delete "${course.title}"?`)) {
                          deleteCourse(course.id);
                        }
                      }}
                      className="p-2 text-rose-600 hover:bg-rose-50 bg-white border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Course & Batch</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Assigned Faculty</th>
                  <th className="p-4">Price & Validity</th>
                  <th className="p-4">Enrolled</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((course) => {
                  const isPub = course.isPublished !== false && course.status !== 'draft';
                  return (
                    <tr key={course.id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate">{course.title}</span>
                            <span className="text-[11px] text-indigo-700 font-semibold">{course.batchName || 'Alpha Batch'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">{course.category}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={course.facultyAvatar}
                            alt={course.facultyName}
                            className="w-6 h-6 rounded-full object-cover border shrink-0"
                          />
                          <span className="font-semibold text-slate-800 text-[11px]">{course.facultyName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="font-black text-slate-900">₹{course.price.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-400 block">{course.validity}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-indigo-600">{course.enrolledCount}</td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            isPub ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isPub ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => togglePublishCourse(course.id)}
                            className={`p-1.5 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                              isPub ? 'bg-amber-50 text-amber-800 hover:bg-amber-100' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                            title={isPub ? 'Unpublish' : 'Publish'}
                          >
                            {isPub ? 'Unpublish' : 'Publish'}
                          </button>

                          <button
                            onClick={() => duplicateCourse(course.id)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(course)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete course "${course.title}"?`)) deleteCourse(course.id);
                            }}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE COURSE MODAL */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-5 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-600" /> Create New Course Batch
                </h3>
                <p className="text-xs text-slate-500">Configure new academic batch, assign faculty, set pricing & validity.</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-base p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. JEE Advanced 2026 Rank Booster Comprehensive Batch"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                    <option value="NEET (UG)">NEET (UG)</option>
                    <option value="CA / CS / Commerce">CA / CS / Commerce</option>
                    <option value="UPSC CSE / State PCS">UPSC CSE / State PCS</option>
                    <option value="Class 11 & 12 Foundation">Class 11 & 12 Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Format *</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Comprehensive Live Batch">Comprehensive Live Batch</option>
                    <option value="Fastrack Crash Course">Fastrack Crash Course</option>
                    <option value="Recorded Video Package">Recorded Video Package</option>
                    <option value="Test Series Only">Test Series Only</option>
                  </select>
                </div>

                {/* Batch Name & Faculty */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Batch Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.batchName}
                    onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                    placeholder="e.g. Pinnacle Morning Star Batch 2026"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Lead Faculty *</label>
                  <select
                    value={formData.facultyName}
                    onChange={(e) => {
                      const fac = facultyDirectory.find(f => f.name === e.target.value);
                      if (fac) {
                        setFormData({
                          ...formData,
                          facultyName: fac.name,
                          facultyDesignation: fac.designation,
                          facultyAvatar: fac.avatar
                        });
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {facultyDirectory.map((f, idx) => (
                      <option key={idx} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>

                {/* Pricing & Validity */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Set Validity Period *</label>
                  <select
                    value={formData.validity}
                    onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {standardValidities.map((val, idx) => (
                      <option key={idx} value={val}>{val}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publishing Status *</label>
                  <select
                    value={formData.isPublished ? 'published' : 'draft'}
                    onChange={(e) => {
                      const isPub = e.target.value === 'published';
                      setFormData({ ...formData, isPublished: isPub, status: isPub ? 'published' : 'draft' });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white font-bold"
                  >
                    <option value="published">🚀 Published (Active in Student Store)</option>
                    <option value="draft">🔒 Draft / Unpublished (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" /> Create & Launch Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT COURSE MODAL */}
      {/* ========================================================================= */}
      {isEditModalOpen && selectedCourseForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-slate-200 shadow-2xl space-y-5 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                  <Edit className="w-5 h-5 text-indigo-600" /> Edit Course Batch: {selectedCourseForEdit.title}
                </h3>
                <p className="text-xs text-slate-500">Update course details, faculty assignment, batch name, pricing & validity.</p>
              </div>
              <button
                onClick={() => { setIsEditModalOpen(false); setSelectedCourseForEdit(null); }}
                className="text-slate-400 hover:text-slate-700 font-bold text-base p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                    <option value="NEET (UG)">NEET (UG)</option>
                    <option value="CA / CS / Commerce">CA / CS / Commerce</option>
                    <option value="UPSC CSE / State PCS">UPSC CSE / State PCS</option>
                    <option value="Class 11 & 12 Foundation">Class 11 & 12 Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Batch Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.batchName}
                    onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Faculty *</label>
                  <select
                    value={formData.facultyName}
                    onChange={(e) => {
                      const fac = facultyDirectory.find(f => f.name === e.target.value);
                      if (fac) {
                        setFormData({
                          ...formData,
                          facultyName: fac.name,
                          facultyDesignation: fac.designation,
                          facultyAvatar: fac.avatar
                        });
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {facultyDirectory.map((f, idx) => (
                      <option key={idx} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Set Validity *</label>
                  <select
                    value={formData.validity}
                    onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {standardValidities.map((val, idx) => (
                      <option key={idx} value={val}>{val}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publishing Status *</label>
                  <select
                    value={formData.isPublished !== false ? 'published' : 'draft'}
                    onChange={(e) => {
                      const isPub = e.target.value === 'published';
                      setFormData({ ...formData, isPublished: isPub, status: isPub ? 'published' : 'draft' });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white font-bold"
                  >
                    <option value="published">🚀 Published (Active in Student Store)</option>
                    <option value="draft">🔒 Draft / Unpublished (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setSelectedCourseForEdit(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK MODAL: ASSIGN FACULTY */}
      {/* ========================================================================= */}
      {facultyModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" /> Assign Faculty to Batch
              </h4>
              <button onClick={() => setFacultyModalCourse(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <p className="text-slate-600">Select faculty for <strong>{facultyModalCourse.title}</strong>:</p>

            <div className="space-y-2">
              {facultyDirectory.map((f, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedFacultyName(f.name);
                    setSelectedFacultyDesignation(f.designation);
                  }}
                  className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                    selectedFacultyName === f.name ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover border" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-slate-900 truncate">{f.name}</h5>
                    <p className="text-[10px] text-slate-500 truncate">{f.designation}</p>
                  </div>
                  {selectedFacultyName === f.name && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setFacultyModalCourse(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFacultyAssignment}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
              >
                Save Faculty Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK MODAL: ASSIGN BATCH */}
      {/* ========================================================================= */}
      {batchModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" /> Assign Batch & Schedule
              </h4>
              <button onClick={() => setBatchModalCourse(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Batch Name / Code</label>
              <input
                type="text"
                value={selectedBatchName}
                onChange={(e) => setSelectedBatchName(e.target.value)}
                placeholder="e.g. Pinnacle Alpha Morning Star Batch"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <span className="block font-bold text-slate-700 mb-1">Or Pick Standard Batch Template:</span>
              <div className="space-y-1.5">
                {standardBatches.map((b, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedBatchName(b)}
                    className={`p-2 rounded-xl border text-[11px] font-semibold cursor-pointer transition ${
                      selectedBatchName === b ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setBatchModalCourse(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBatchAssignment}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
              >
                Assign Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK MODAL: SET PRICING */}
      {/* ========================================================================= */}
      {pricingModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" /> Set Course Pricing & Discount
              </h4>
              <button onClick={() => setPricingModalCourse(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <p className="text-slate-600">Course: <strong>{pricingModalCourse.title}</strong></p>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-bold text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Original MRP Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={newOriginalPrice}
                  onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-bold text-sm text-slate-900"
                />
              </div>

              {newOriginalPrice > newPrice && (
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-bold flex items-center justify-between">
                  <span>Calculated Discount:</span>
                  <span className="text-sm">{Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100)}% OFF</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setPricingModalCourse(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePricing}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
              >
                Update Pricing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK MODAL: SET VALIDITY */}
      {/* ========================================================================= */}
      {validityModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Set Course Access Validity
              </h4>
              <button onClick={() => setValidityModalCourse(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <p className="text-slate-600">Course: <strong>{validityModalCourse.title}</strong></p>

            <div className="space-y-1.5">
              {standardValidities.map((val, idx) => (
                <div
                  key={idx}
                  onClick={() => setNewValidity(val)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    newValidity === val ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{val}</span>
                  {newValidity === val && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setValidityModalCourse(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveValidity}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-xs"
              >
                Save Validity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
