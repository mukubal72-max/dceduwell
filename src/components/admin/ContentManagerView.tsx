import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AdminVideoItem,
  AdminPdfItem,
  AdminNotesItem,
  AdminAnnouncementItem,
  AdminBlogItem,
  AdminBannerItem,
  AdminFaqItem,
  AssignmentItem,
  TestSeriesExam
} from '../../types';
import {
  Video,
  FileText,
  BookOpen,
  ClipboardList,
  FileCheck,
  Bell,
  Newspaper,
  Image as ImageIcon,
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  Download,
  ShieldCheck,
  Lock,
  Unlock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  Share2,
  TrendingUp,
  X,
  Check,
  Flame,
  ThumbsUp,
  Filter,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

type ContentTab = 
  | 'videos' 
  | 'pdfs' 
  | 'notes' 
  | 'assignments' 
  | 'tests' 
  | 'announcements' 
  | 'blogs' 
  | 'banners' 
  | 'faqs';

export const ContentManagerView: React.FC = () => {
  const {
    adminVideos,
    addAdminVideo,
    updateAdminVideo,
    deleteAdminVideo,
    adminPdfs,
    addAdminPdf,
    updateAdminPdf,
    deleteAdminPdf,
    adminNotes,
    addAdminNotes,
    updateAdminNotes,
    deleteAdminNotes,
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    testSeries,
    createTestSeries,
    updateTestSeries,
    deleteTestSeries,
    adminAnnouncements,
    addAdminAnnouncement,
    updateAdminAnnouncement,
    deleteAdminAnnouncement,
    adminBlogs,
    addAdminBlog,
    updateAdminBlog,
    deleteAdminBlog,
    adminBanners,
    addAdminBanner,
    updateAdminBanner,
    deleteAdminBanner,
    adminFaqs,
    addAdminFaq,
    updateAdminFaq,
    deleteAdminFaq,
    courses,
    setActiveTest,
    setView
  } = useApp();

  const [activeTab, setActiveTab] = useState<ContentTab>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Preview Modals
  const [previewVideo, setPreviewVideo] = useState<AdminVideoItem | null>(null);
  const [previewPdf, setPreviewPdf] = useState<AdminPdfItem | null>(null);
  const [previewBlog, setPreviewBlog] = useState<AdminBlogItem | null>(null);
  const [previewBanner, setPreviewBanner] = useState<AdminBannerItem | null>(null);

  // Accordion for FAQs
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Form states for adding/editing items
  const [videoForm, setVideoForm] = useState<Partial<AdminVideoItem>>({
    title: '',
    courseTitle: 'Pinnacle JEE Advanced Comprehensive 2026',
    subject: 'Physics',
    faculty: 'Er. Rajeshwar Varma (ex-IIT Kanpur)',
    duration: '50 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
    resolution: '1080p',
    isFreePreview: false,
    drmProtected: true,
    status: 'published',
    description: ''
  });

  const [pdfForm, setPdfForm] = useState<Partial<AdminPdfItem>>({
    title: '',
    subject: 'Physics',
    category: 'JEE (Main & Adv)',
    fileSize: '5.2 MB',
    pagesCount: 64,
    downloadUrl: '#',
    isFree: true,
    authorFaculty: 'Er. Rajeshwar Varma',
    hasWatermark: true,
    status: 'published',
    targetExam: 'JEE Advanced 2026'
  });

  const [notesForm, setNotesForm] = useState<Partial<AdminNotesItem>>({
    title: '',
    subject: 'Physics',
    chapter: 'Modern Physics & Dual Nature',
    faculty: 'Er. Rajeshwar Varma',
    format: 'Handwritten',
    pagesCount: 32,
    fileSize: '6.4 MB',
    isFree: true,
    downloadUrl: '#',
    contentSummary: 'High-yield revision notes with highlighted formulas, key graphs, and previous 10-year question trends.',
    status: 'published'
  });

  const [assignmentForm, setAssignmentForm] = useState<Partial<AssignmentItem>>({
    title: '',
    courseTitle: 'Pinnacle JEE Advanced Comprehensive 2026',
    subject: 'Physics',
    dueDate: '2026-03-25',
    totalPoints: 100,
    description: 'Solve the attached problems with step-by-step working. Highlight final dimensional units.',
    attachmentName: 'DPP_Physics_Problem_Set_05.pdf',
    assignedFaculty: 'Er. Rajeshwar Varma',
    submissionStatus: 'pending'
  });

  const [testForm, setTestForm] = useState<Partial<TestSeriesExam>>({
    title: '',
    targetExam: 'JEE Main 2026',
    totalQuestions: 30,
    durationMinutes: 60,
    totalMarks: 120,
    isFreeMock: true,
    price: 0,
    status: 'live',
    description: 'Full syllabus simulation with strict NTA CBT marking scheme.'
  });

  const [announcementForm, setAnnouncementForm] = useState<Partial<AdminAnnouncementItem>>({
    title: '',
    message: '',
    category: 'urgent',
    targetAudience: 'All Students',
    priority: 'urgent',
    publishDate: new Date().toISOString().split('T')[0],
    expiresDate: '2026-04-30',
    isActive: true,
    actionText: 'View Details',
    actionUrl: 'view:student_portal'
  });

  const [blogForm, setBlogForm] = useState<Partial<AdminBlogItem>>({
    title: '',
    slug: '',
    category: 'Exam Strategy',
    author: 'Er. Rajeshwar Varma',
    authorRole: 'Senior Physics Mentor & IITian',
    readTime: '5 min read',
    publishDate: new Date().toISOString().split('T')[0],
    summary: 'Essential guidelines and strategic pacing advice for upcoming competitive exam candidates.',
    content: 'Pacing during competitive exams defines rank outcomes. Divide your examination block into 3 structured cycles: First, sweep through all single-step direct questions in 40 minutes...',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tags: ['Exam Strategy', 'Time Management', 'Revision'],
    status: 'published'
  });

  const [bannerForm, setBannerForm] = useState<Partial<AdminBannerItem>>({
    title: '',
    subtitle: '',
    placement: 'homepage_hero',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    backgroundColor: '#1e1b4b',
    ctaText: 'Enroll Now',
    ctaAction: 'view:courses',
    targetAudience: 'all',
    displayOrder: 1,
    isActive: true
  });

  const [faqForm, setFaqForm] = useState<Partial<AdminFaqItem>>({
    question: '',
    answer: '',
    category: 'Admissions & Batches',
    displayOrder: 1,
    isActive: true
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'videos') setVideoForm(item);
    else if (activeTab === 'pdfs') setPdfForm(item);
    else if (activeTab === 'notes') setNotesForm(item);
    else if (activeTab === 'assignments') setAssignmentForm(item);
    else if (activeTab === 'tests') setTestForm(item);
    else if (activeTab === 'announcements') setAnnouncementForm(item);
    else if (activeTab === 'blogs') setBlogForm(item);
    else if (activeTab === 'banners') setBannerForm(item);
    else if (activeTab === 'faqs') setFaqForm(item);
    setIsAddModalOpen(true);
  };

  // Save Item (Create or Update)
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'videos') {
      if (editingItem) {
        updateAdminVideo({ ...editingItem, ...videoForm } as AdminVideoItem);
      } else {
        addAdminVideo({
          ...videoForm,
          id: `vid-${Date.now()}`,
          viewsCount: 0,
          uploadedDate: new Date().toISOString().split('T')[0]
        } as AdminVideoItem);
      }
    } else if (activeTab === 'pdfs') {
      if (editingItem) {
        updateAdminPdf({ ...editingItem, ...pdfForm } as AdminPdfItem);
      } else {
        addAdminPdf({
          ...pdfForm,
          id: `pdf-${Date.now()}`,
          downloadsCount: 0,
          updatedDate: new Date().toISOString().split('T')[0]
        } as AdminPdfItem);
      }
    } else if (activeTab === 'notes') {
      if (editingItem) {
        updateAdminNotes({ ...editingItem, ...notesForm } as AdminNotesItem);
      } else {
        addAdminNotes({
          ...notesForm,
          id: `note-${Date.now()}`,
          updatedDate: new Date().toISOString().split('T')[0]
        } as AdminNotesItem);
      }
    } else if (activeTab === 'assignments') {
      if (editingItem) {
        updateAssignment({ ...editingItem, ...assignmentForm } as AssignmentItem);
      } else {
        addAssignment({
          ...assignmentForm,
          id: `asg-${Date.now()}`,
          courseId: 'crs-jee-pinnacle'
        } as AssignmentItem);
      }
    } else if (activeTab === 'tests') {
      if (editingItem) {
        updateTestSeries({ ...editingItem, ...testForm } as TestSeriesExam);
      } else {
        createTestSeries({
          ...testForm,
          id: `test-${Date.now()}`,
          attemptsCount: 0,
          syllabus: ['Physics', 'Chemistry', 'Mathematics']
        } as TestSeriesExam);
      }
    } else if (activeTab === 'announcements') {
      if (editingItem) {
        updateAdminAnnouncement({ ...editingItem, ...announcementForm } as AdminAnnouncementItem);
      } else {
        addAdminAnnouncement({
          ...announcementForm,
          id: `ann-${Date.now()}`
        } as AdminAnnouncementItem);
      }
    } else if (activeTab === 'blogs') {
      if (editingItem) {
        updateAdminBlog({ ...editingItem, ...blogForm } as AdminBlogItem);
      } else {
        addAdminBlog({
          ...blogForm,
          id: `blog-${Date.now()}`,
          viewsCount: 0,
          likesCount: 0
        } as AdminBlogItem);
      }
    } else if (activeTab === 'banners') {
      if (editingItem) {
        updateAdminBanner({ ...editingItem, ...bannerForm } as AdminBannerItem);
      } else {
        addAdminBanner({
          ...bannerForm,
          id: `ban-${Date.now()}`,
          clickCount: 0
        } as AdminBannerItem);
      }
    } else if (activeTab === 'faqs') {
      if (editingItem) {
        updateAdminFaq({ ...editingItem, ...faqForm } as AdminFaqItem);
      } else {
        addAdminFaq({
          ...faqForm,
          id: `faq-${Date.now()}`,
          helpfulVotes: 0,
          updatedAt: new Date().toISOString().split('T')[0]
        } as AdminFaqItem);
      }
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded border border-indigo-400/30">
              Admin CMS Console
            </span>
            <span className="text-xs text-slate-300 font-mono">Academy Digital Assets</span>
          </div>
          <h2 className="text-2xl font-bold font-serif mt-1">Content Management Hub</h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Author, organize, secure, and publish multi-format academic assets across Videos, PDFs, Revision Notes, Assignments, CBT Tests, Announcements, Blogs, Promotional Banners, and FAQs.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New {activeTab.slice(0, -1).toUpperCase()}</span>
        </button>
      </div>

      {/* 2. CMS Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
        {[
          { id: 'videos', label: `Videos (${adminVideos.length})`, icon: <Video className="w-3.5 h-3.5" /> },
          { id: 'pdfs', label: `PDFs (${adminPdfs.length})`, icon: <FileText className="w-3.5 h-3.5 text-rose-500" /> },
          { id: 'notes', label: `Notes (${adminNotes.length})`, icon: <BookOpen className="w-3.5 h-3.5 text-amber-500" /> },
          { id: 'assignments', label: `Assignments (${assignments.length})`, icon: <ClipboardList className="w-3.5 h-3.5 text-blue-500" /> },
          { id: 'tests', label: `Tests (${testSeries.length})`, icon: <FileCheck className="w-3.5 h-3.5 text-emerald-500" /> },
          { id: 'announcements', label: `Announcements (${adminAnnouncements.length})`, icon: <Bell className="w-3.5 h-3.5 text-purple-500" /> },
          { id: 'blogs', label: `Blogs (${adminBlogs.length})`, icon: <Newspaper className="w-3.5 h-3.5 text-teal-500" /> },
          { id: 'banners', label: `Banners (${adminBanners.length})`, icon: <ImageIcon className="w-3.5 h-3.5 text-indigo-500" /> },
          { id: 'faqs', label: `FAQ (${adminFaqs.length})`, icon: <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as ContentTab);
              setSearchQuery('');
              setFilterCategory('all');
            }}
            className={`px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 font-medium ${
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

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="all">All Records</option>
            {activeTab === 'videos' && (
              <>
                <option value="Physics">Physics</option>
                <option value="Organic Chemistry">Organic Chemistry</option>
                <option value="Zoology">Zoology</option>
                <option value="Indian Polity">Indian Polity</option>
                <option value="free">Free Preview</option>
                <option value="drm">DRM Encrypted</option>
              </>
            )}
            {activeTab === 'pdfs' && (
              <>
                <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                <option value="NEET (Medical)">NEET (Medical)</option>
                <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                <option value="free">Free Download</option>
              </>
            )}
            {activeTab === 'notes' && (
              <>
                <option value="Handwritten">Handwritten</option>
                <option value="Mind Map">Mind Map</option>
                <option value="Typed">Typed</option>
              </>
            )}
            {activeTab === 'tests' && (
              <>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="free">Free Mock</option>
              </>
            )}
            {activeTab === 'announcements' && (
              <>
                <option value="urgent">Urgent</option>
                <option value="exam_alert">Exam Alert</option>
                <option value="batch_update">Batch Update</option>
              </>
            )}
            {activeTab === 'blogs' && (
              <>
                <option value="Exam Strategy">Exam Strategy</option>
                <option value="Topper Secrets">Topper Secrets</option>
                <option value="Subject Mastery">Subject Mastery</option>
              </>
            )}
            {activeTab === 'banners' && (
              <>
                <option value="homepage_hero">Homepage Hero</option>
                <option value="student_portal">Student Portal</option>
                <option value="mobile_app">Mobile App</option>
              </>
            )}
            {activeTab === 'faqs' && (
              <>
                <option value="Courses">Courses</option>
                <option value="Payments">Payments</option>
                <option value="Exams">Exams</option>
                <option value="Refunds">Refunds</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Account Issues">Account Issues</option>
                <option value="Admissions & Batches">Admissions & Batches</option>
                <option value="CBT Test Series">CBT Test Series</option>
                <option value="Study Material & Notes">Study Material & Notes</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. TAB CONTENT RENDERERS */}
      {/* ========================================================= */}

      {/* 4.1 VIDEOS TAB */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminVideos
            .filter(v => {
              const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.subject.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory === 'free') return v.isFreePreview;
              if (filterCategory === 'drm') return v.drmProtected;
              if (filterCategory !== 'all') return v.subject === filterCategory;
              return true;
            })
            .map(vid => (
              <div
                key={vid.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900 group">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setPreviewVideo(vid)}
                        className="w-12 h-12 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono rounded">
                      {vid.duration}
                    </div>

                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                        {vid.resolution}
                      </span>
                      {vid.isFreePreview ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
                          Free Preview
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> Paid
                        </span>
                      )}
                    </div>

                    {vid.drmProtected && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> DRM
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-indigo-600">{vid.subject}</span>
                      <span>{vid.uploadedDate}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{vid.title}</h3>
                    <p className="text-xs text-slate-500">{vid.courseTitle}</p>
                    <p className="text-[11px] text-slate-600 font-medium">Instructor: {vid.faculty}</p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{vid.viewsCount.toLocaleString()} views</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewVideo(vid)}
                      title="Preview Video"
                      className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(vid)}
                      title="Edit Video"
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAdminVideo(vid.id)}
                      title="Delete Video"
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.2 PDFS TAB */}
      {activeTab === 'pdfs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPdfs
            .filter(p => {
              const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.authorFaculty.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory === 'free') return p.isFree;
              if (filterCategory !== 'all') return p.category === filterCategory;
              return true;
            })
            .map(pdf => (
              <div
                key={pdf.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 justify-end">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {pdf.pagesCount} Pages
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {pdf.fileSize}
                      </span>
                      {pdf.hasWatermark && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5" /> Watermarked
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold text-rose-600">{pdf.subject}</span>
                      <span>•</span>
                      <span>{pdf.category}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{pdf.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">Author: {pdf.authorFaculty}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{pdf.downloadsCount.toLocaleString()} downloads</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewPdf(pdf)}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(pdf)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAdminPdf(pdf.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.3 NOTES TAB */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminNotes
            .filter(n => {
              const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.chapter.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory !== 'all') return n.format === filterCategory;
              return true;
            })
            .map(note => (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      note.format === 'Handwritten'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : note.format === 'Mind Map'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {note.format} Notes
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{note.fileSize} • {note.pagesCount}p</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-amber-600">{note.subject}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{note.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{note.contentSummary}</p>
                    <p className="text-[11px] text-slate-500 mt-2">Mentor: {note.faculty}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Updated {note.updatedDate}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(note)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAdminNotes(note.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.4 ASSIGNMENTS TAB */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments
            .filter(a => {
              return a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .map(asg => (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {asg.subject}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {asg.totalPoints} Marks
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{asg.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{asg.courseTitle}</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{asg.description}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="truncate max-w-[170px]">{asg.attachmentName}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-rose-600">Due {asg.dueDate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">Status: {asg.submissionStatus}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(asg)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAssignment(asg.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.5 TESTS TAB */}
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testSeries
            .filter(t => {
              const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.targetExam.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory === 'free') return t.isFreeMock;
              if (filterCategory !== 'all') return t.targetExam.includes(filterCategory);
              return true;
            })
            .map(test => (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {test.targetExam}
                    </span>
                    {test.isFreeMock ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        100% Free Open Mock
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-900">₹{test.price}</span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{test.title}</h3>
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center text-xs mt-3">
                      <div>
                        <p className="text-[10px] text-slate-400">Questions</p>
                        <p className="font-bold text-slate-800">{test.totalQuestions} Qs</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Duration</p>
                        <p className="font-bold text-slate-800">{test.durationMinutes} Mins</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Attempts</p>
                        <p className="font-bold text-emerald-600">{test.attemptsCount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setActiveTest(test);
                      setView('cbt_exam');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" /> Launch CBT
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(test)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTestSeries(test.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.6 ANNOUNCEMENTS TAB */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {adminAnnouncements
            .filter(a => {
              const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.message.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory !== 'all') return a.category === filterCategory;
              return true;
            })
            .map(ann => (
              <div
                key={ann.id}
                className={`p-5 rounded-2xl border transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs ${
                  ann.priority === 'urgent'
                    ? 'bg-rose-50/70 border-rose-200'
                    : ann.priority === 'high'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      ann.priority === 'urgent'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : ann.priority === 'high'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {ann.priority} Alert
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                      Target: {ann.targetAudience}
                    </span>
                    <span className="text-xs text-slate-400">Published: {ann.publishDate}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{ann.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.message}</p>

                  {ann.actionText && (
                    <div className="pt-1">
                      <span className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                        {ann.actionText} <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => updateAdminAnnouncement({ ...ann, isActive: !ann.isActive })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                      ann.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {ann.isActive ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{ann.isActive ? 'Active' : 'Paused'}</span>
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(ann)}
                    className="p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAdminAnnouncement(ann.id)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.7 BLOGS TAB */}
      {activeTab === 'blogs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminBlogs
            .filter(b => {
              const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.summary.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory !== 'all') return b.category === filterCategory;
              return true;
            })
            .map(blog => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                      {blog.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                      {blog.readTime}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>By {blog.author}</span>
                      <span>{blog.publishDate}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{blog.summary}</p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {blog.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{blog.viewsCount.toLocaleString()} reads</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewBlog(blog)}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs transition cursor-pointer"
                    >
                      Read Full
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(blog)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAdminBlog(blog.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.8 BANNERS TAB */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminBanners
            .filter(b => {
              const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.placement.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory !== 'all') return b.placement === filterCategory;
              return true;
            })
            .map(banner => (
              <div
                key={banner.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition space-y-3"
              >
                {/* Visual Banner Preview */}
                <div
                  className="relative p-6 text-white overflow-hidden bg-cover bg-center min-h-[160px] flex flex-col justify-between"
                  style={{
                    backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.7), rgba(10, 15, 30, 0.85)), url(${banner.imageUrl})`,
                    backgroundColor: banner.backgroundColor || '#1e1b4b'
                  }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded border border-white/30">
                      Placement: {banner.placement.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      banner.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                    }`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-1 relative z-10 my-3">
                    <h3 className="text-base font-bold font-serif text-white">{banner.title}</h3>
                    <p className="text-xs text-slate-200 line-clamp-2">{banner.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/20">
                    <span className="text-[11px] font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-lg">
                      {banner.ctaText}
                    </span>
                    <span className="text-[11px] text-slate-300 font-mono">
                      {banner.clickCount.toLocaleString()} Clicks
                    </span>
                  </div>
                </div>

                {/* Banner Metadata & Controls */}
                <div className="p-4 pt-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateAdminBanner({ ...banner, isActive: !banner.isActive })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        banner.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {banner.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => setPreviewBanner(banner)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition cursor-pointer"
                    >
                      Preview Mode
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(banner)}
                      className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAdminBanner(banner.id)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4.9 FAQ TAB */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          {adminFaqs
            .filter(f => {
              const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                f.answer.toLowerCase().includes(searchQuery.toLowerCase());
              if (!matchesSearch) return false;
              if (filterCategory !== 'all') return f.category === filterCategory;
              return true;
            })
            .map(faq => {
              const isOpen = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition"
                >
                  <div
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          {faq.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Order #{faq.displayOrder}</span>
                        {faq.isActive ? (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Visible
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold">Hidden</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1 text-slate-500 text-xs font-mono">
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
                        <span>{faq.helpfulVotes}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 space-y-3 bg-slate-50/50">
                      <p className="leading-relaxed">{faq.answer}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-slate-400">Last updated: {faq.updatedAt}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateAdminFaq({ ...faq, helpfulVotes: faq.helpfulVotes + 1 });
                            }}
                            className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs hover:bg-amber-50 text-slate-700 flex items-center gap-1 cursor-pointer"
                          >
                            <ThumbsUp className="w-3 h-3 text-amber-500" /> +1 Vote
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditModal(faq);
                            }}
                            className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAdminFaq(faq.id);
                            }}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  {editingItem ? `Edit ${activeTab.slice(0, -1).toUpperCase()}` : `Add New ${activeTab.slice(0, -1).toUpperCase()}`}
                </h3>
                <p className="text-xs text-slate-500">Configure parameters, permissions, and media links.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              {/* VIDEO FORM */}
              {activeTab === 'videos' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Video Title *</label>
                    <input
                      type="text"
                      required
                      value={videoForm.title}
                      onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                      placeholder="e.g. Rotational Motion & Torque Derivation"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Subject</label>
                      <input
                        type="text"
                        value={videoForm.subject}
                        onChange={e => setVideoForm({ ...videoForm, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Duration (e.g. 52 mins)</label>
                      <input
                        type="text"
                        value={videoForm.duration}
                        onChange={e => setVideoForm({ ...videoForm, duration: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Faculty Instructor</label>
                      <input
                        type="text"
                        value={videoForm.faculty}
                        onChange={e => setVideoForm({ ...videoForm, faculty: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Resolution</label>
                      <select
                        value={videoForm.resolution}
                        onChange={e => setVideoForm({ ...videoForm, resolution: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="720p">720p HD</option>
                        <option value="1080p">1080p Full HD</option>
                        <option value="4K UHD">4K Ultra HD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Video Stream URL</label>
                    <input
                      type="text"
                      value={videoForm.videoUrl}
                      onChange={e => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Thumbnail URL</label>
                    <input
                      type="text"
                      value={videoForm.thumbnailUrl}
                      onChange={e => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={videoForm.isFreePreview}
                        onChange={e => setVideoForm({ ...videoForm, isFreePreview: e.target.checked })}
                        className="rounded text-indigo-600"
                      />
                      <span>Allow Free Student Preview</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={videoForm.drmProtected}
                        onChange={e => setVideoForm({ ...videoForm, drmProtected: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                      <span>Enforce DRM & Dynamic Watermark</span>
                    </label>
                  </div>
                </>
              )}

              {/* PDF FORM */}
              {activeTab === 'pdfs' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Document Title *</label>
                    <input
                      type="text"
                      required
                      value={pdfForm.title}
                      onChange={e => setPdfForm({ ...pdfForm, title: e.target.value })}
                      placeholder="e.g. Complete JEE Physics Formula Bible"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Subject</label>
                      <input
                        type="text"
                        value={pdfForm.subject}
                        onChange={e => setPdfForm({ ...pdfForm, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Exam Category</label>
                      <select
                        value={pdfForm.category}
                        onChange={e => setPdfForm({ ...pdfForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                        <option value="NEET (Medical)">NEET (Medical)</option>
                        <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                        <option value="Foundation & Olympiad">Foundation & Olympiad</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Pages Count</label>
                      <input
                        type="number"
                        value={pdfForm.pagesCount}
                        onChange={e => setPdfForm({ ...pdfForm, pagesCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">File Size</label>
                      <input
                        type="text"
                        value={pdfForm.fileSize}
                        onChange={e => setPdfForm({ ...pdfForm, fileSize: e.target.value })}
                        placeholder="e.g. 8.4 MB"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Author</label>
                      <input
                        type="text"
                        value={pdfForm.authorFaculty}
                        onChange={e => setPdfForm({ ...pdfForm, authorFaculty: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={pdfForm.isFree}
                        onChange={e => setPdfForm({ ...pdfForm, isFree: e.target.checked })}
                        className="rounded text-indigo-600"
                      />
                      <span>Free Download</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={pdfForm.hasWatermark}
                        onChange={e => setPdfForm({ ...pdfForm, hasWatermark: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                      <span>Apply Security Watermark</span>
                    </label>
                  </div>
                </>
              )}

              {/* NOTES FORM */}
              {activeTab === 'notes' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Notes Title *</label>
                    <input
                      type="text"
                      required
                      value={notesForm.title}
                      onChange={e => setNotesForm({ ...notesForm, title: e.target.value })}
                      placeholder="e.g. Electrodynamics & Maxwell Equations"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Chapter / Unit</label>
                      <input
                        type="text"
                        value={notesForm.chapter}
                        onChange={e => setNotesForm({ ...notesForm, chapter: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Format</label>
                      <select
                        value={notesForm.format}
                        onChange={e => setNotesForm({ ...notesForm, format: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="Handwritten">Handwritten Kota Notes</option>
                        <option value="Mind Map">Visual Mind Map</option>
                        <option value="Typed">Typed Digital Digest</option>
                        <option value="Formula Sheet">Formula Sheet</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Content Summary</label>
                    <textarea
                      rows={3}
                      value={notesForm.contentSummary}
                      onChange={e => setNotesForm({ ...notesForm, contentSummary: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* ASSIGNMENTS FORM */}
              {activeTab === 'assignments' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Assignment Title *</label>
                    <input
                      type="text"
                      required
                      value={assignmentForm.title}
                      onChange={e => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                      placeholder="e.g. DPP #08: Rotational Mechanics 30-Problem Set"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Course</label>
                      <input
                        type="text"
                        value={assignmentForm.courseTitle}
                        onChange={e => setAssignmentForm({ ...assignmentForm, courseTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Subject</label>
                      <input
                        type="text"
                        value={assignmentForm.subject}
                        onChange={e => setAssignmentForm({ ...assignmentForm, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Due Date</label>
                      <input
                        type="date"
                        value={assignmentForm.dueDate}
                        onChange={e => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Total Marks / Points</label>
                      <input
                        type="number"
                        value={assignmentForm.totalPoints}
                        onChange={e => setAssignmentForm({ ...assignmentForm, totalPoints: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Attachment Name</label>
                    <input
                      type="text"
                      value={assignmentForm.attachmentName}
                      onChange={e => setAssignmentForm({ ...assignmentForm, attachmentName: e.target.value })}
                      placeholder="e.g. DPP_Rotational_Mechanics_08.pdf"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Instructions / Notes</label>
                    <textarea
                      rows={2}
                      value={assignmentForm.description}
                      onChange={e => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* TESTS FORM */}
              {activeTab === 'tests' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Test Series Title *</label>
                    <input
                      type="text"
                      required
                      value={testForm.title}
                      onChange={e => setTestForm({ ...testForm, title: e.target.value })}
                      placeholder="e.g. All-India Major Open Mock #05"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Target Exam</label>
                      <input
                        type="text"
                        value={testForm.targetExam}
                        onChange={e => setTestForm({ ...testForm, targetExam: e.target.value })}
                        placeholder="e.g. JEE Main 2026 or NEET UG 2026"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Duration (Minutes)</label>
                      <input
                        type="number"
                        value={testForm.durationMinutes}
                        onChange={e => setTestForm({ ...testForm, durationMinutes: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Total Questions</label>
                      <input
                        type="number"
                        value={testForm.totalQuestions}
                        onChange={e => setTestForm({ ...testForm, totalQuestions: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Price (0 for Free)</label>
                      <input
                        type="number"
                        value={testForm.price}
                        onChange={e => setTestForm({ ...testForm, price: Number(e.target.value), isFreeMock: Number(e.target.value) === 0 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ANNOUNCEMENT FORM */}
              {activeTab === 'announcements' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Headline Title *</label>
                    <input
                      type="text"
                      required
                      value={announcementForm.title}
                      onChange={e => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      placeholder="e.g. NTA JEE Main Session 2 Hall Tickets Released"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Priority Urgency</label>
                      <select
                        value={announcementForm.priority}
                        onChange={e => setAnnouncementForm({ ...announcementForm, priority: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="urgent">Urgent (Red Alert)</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Target Audience</label>
                      <select
                        value={announcementForm.targetAudience}
                        onChange={e => setAnnouncementForm({ ...announcementForm, targetAudience: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="All Students">All Students</option>
                        <option value="JEE Aspirants">JEE Aspirants</option>
                        <option value="NEET Aspirants">NEET Aspirants</option>
                        <option value="UPSC Candidates">UPSC Candidates</option>
                        <option value="Faculty Only">Faculty Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Broadcast Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={announcementForm.message}
                      onChange={e => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                      placeholder="Write your announcement text here..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* BLOG FORM */}
              {activeTab === 'blogs' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Blog Title *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="e.g. How AIR 04 Mastered Organic Chemistry in 60 Days"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Category</label>
                      <select
                        value={blogForm.category}
                        onChange={e => setBlogForm({ ...blogForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="Exam Strategy">Exam Strategy</option>
                        <option value="Topper Secrets">Topper Secrets</option>
                        <option value="Subject Mastery">Subject Mastery</option>
                        <option value="Current Affairs">Current Affairs</option>
                        <option value="Exam Notification">Exam Notification</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Read Time (e.g. 6 min read)</label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Author & Role</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
                      placeholder="Author Name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Summary Excerpt</label>
                    <textarea
                      rows={2}
                      value={blogForm.summary}
                      onChange={e => setBlogForm({ ...blogForm, summary: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Full Article Content</label>
                    <textarea
                      rows={4}
                      value={blogForm.content}
                      onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>
                </>
              )}

              {/* BANNERS FORM */}
              {activeTab === 'banners' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Banner Headline *</label>
                    <input
                      type="text"
                      required
                      value={bannerForm.title}
                      onChange={e => setBannerForm({ ...bannerForm, title: e.target.value })}
                      placeholder="e.g. Crack JEE & NEET 2026 with Kota Pedagogy"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Subtitle / Offer</label>
                    <input
                      type="text"
                      value={bannerForm.subtitle}
                      onChange={e => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                      placeholder="e.g. Flat 40% Off on All Annual Batches"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Placement</label>
                      <select
                        value={bannerForm.placement}
                        onChange={e => setBannerForm({ ...bannerForm, placement: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="homepage_hero">Homepage Hero</option>
                        <option value="student_portal">Student Portal Dashboard</option>
                        <option value="cbt_series">CBT Test Series Screen</option>
                        <option value="mobile_app">Mobile App Simulator</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">CTA Button Label</label>
                      <input
                        type="text"
                        value={bannerForm.ctaText}
                        onChange={e => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                        placeholder="e.g. Enroll Now"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Image Background URL</label>
                    <input
                      type="text"
                      value={bannerForm.imageUrl}
                      onChange={e => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>
                </>
              )}

              {/* FAQS FORM */}
              {activeTab === 'faqs' && (
                <>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Question *</label>
                    <input
                      type="text"
                      required
                      value={faqForm.question}
                      onChange={e => setFaqForm({ ...faqForm, question: e.target.value })}
                      placeholder="e.g. How are the live interactive lectures conducted?"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Category</label>
                      <select
                        value={faqForm.category}
                        onChange={e => setFaqForm({ ...faqForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="Courses">Courses</option>
                        <option value="Payments">Payments</option>
                        <option value="Exams">Exams</option>
                        <option value="Refunds">Refunds</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Account Issues">Account Issues</option>
                        <option value="Admissions & Batches">Admissions & Batches</option>
                        <option value="CBT Test Series">CBT Test Series</option>
                        <option value="Study Material & Notes">Study Material & Notes</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Display Order #</label>
                      <input
                        type="number"
                        value={faqForm.displayOrder}
                        onChange={e => setFaqForm({ ...faqForm, displayOrder: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Answer *</label>
                    <textarea
                      rows={4}
                      required
                      value={faqForm.answer}
                      onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })}
                      placeholder="Write a clear, helpful explanation..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer shadow-md"
                >
                  {editingItem ? 'Save Changes' : 'Create & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. PREVIEW MODALS */}
      {/* ========================================================= */}

      {/* 6.1 Video Player Preview */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-sm font-serif truncate max-w-md">{previewVideo.title}</h3>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={previewVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
              {/* Simulated DRM Watermark Overlay */}
              {previewVideo.drmProtected && (
                <div className="absolute top-4 right-4 pointer-events-none opacity-40 select-none text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-amber-300">
                  DC-MAXWELL-DRM • ID: {previewVideo.id} • ENCRYPTED
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-900 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Instructor: {previewVideo.faculty}</span>
                <span>Resolution: {previewVideo.resolution}</span>
              </div>
              <p className="text-slate-300 text-[11px]">{previewVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6.2 PDF Reader Preview */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 truncate max-w-md">{previewPdf.title}</h3>
              </div>
              <button
                onClick={() => setPreviewPdf(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Reader Mock Screen */}
            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs font-serif leading-relaxed text-slate-800 max-h-72 overflow-y-auto">
              {previewPdf.hasWatermark && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 select-none text-2xl font-bold font-sans rotate-[-25deg] text-slate-900">
                  DC MAXWELL ACADEMY • VERIFIED
                </div>
              )}
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2">Table of Contents & Formula Summary</h4>
              <p>• Chapter 1: Kinematics in 1D & 2D with projectile vector equations</p>
              <p>• Chapter 2: Newton's Laws of Motion, pseudo forces, and friction coefficients</p>
              <p>• Chapter 3: Work, Energy and Power: Conservative force potential wells</p>
              <p>• Chapter 4: System of particles, center of mass, and elastic collisions</p>
              <p>• Chapter 5: Rigid body rotational dynamics, torque tensors, and precession</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>{previewPdf.pagesCount} Pages • {previewPdf.fileSize}</span>
              <button
                onClick={() => {
                  alert(`Starting download for "${previewPdf.title}"...`);
                  setPreviewPdf(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6.3 Blog Reader Preview */}
      {previewBlog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{previewBlog.category}</span>
              <button
                onClick={() => setPreviewBlog(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden">
              <img src={previewBlog.coverImage} alt={previewBlog.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold font-serif text-slate-900">{previewBlog.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{previewBlog.author}</span>
                <span>•</span>
                <span>{previewBlog.authorRole}</span>
                <span>•</span>
                <span>{previewBlog.readTime}</span>
              </div>
            </div>

            <div className="text-xs leading-relaxed text-slate-700 space-y-3 pt-2 border-t border-slate-100">
              <p className="font-medium text-slate-900">{previewBlog.summary}</p>
              <p>{previewBlog.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6.4 Banner Preview */}
      {previewBanner && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Live Banner Simulation</h3>
              <button
                onClick={() => setPreviewBanner(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative p-8 rounded-2xl text-white overflow-hidden bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.75), rgba(10, 15, 30, 0.9)), url(${previewBanner.imageUrl})`,
                backgroundColor: previewBanner.backgroundColor || '#1e1b4b'
              }}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {previewBanner.placement.replace('_', ' ').toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold font-serif text-white mt-2">{previewBanner.title}</h2>
              <p className="text-xs text-slate-200 max-w-lg mt-1">{previewBanner.subtitle}</p>
              <button className="mt-5 px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md">
                {previewBanner.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
