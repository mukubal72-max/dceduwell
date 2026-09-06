import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AppPlatformView,
  Course,
  LiveClass,
  TestSeriesExam,
  TestAttemptResult,
  StudyMaterialItem,
  DoubtItem,
  AssignmentItem,
  LeadItem,
  CertificateItem,
  CartItem,
  UserProfile,
  PlatformNotification,
  Lesson,
  Chapter,
  Question,
  LiveClassAttendanceRecord,
  LiveClassReminder,
  StoreProduct,
  OrderItem,
  InvoiceItem,
  OrderPaymentStatus,
  Coupon,
  CouponValidationResult,
  ComboPackage,
  SubscriptionPlan,
  UserSubscription,
  GlobalSearchCategory,
  GlobalSearchResult,
  WishlistLead,
  RemarketingCampaign,
  PlatformNotificationType,
  AdminVideoItem,
  AdminPdfItem,
  AdminNotesItem,
  AdminAnnouncementItem,
  AdminBlogItem,
  AdminBannerItem,
  AdminFaqItem,
  AcademicBatch,
  BatchStudent,
  BatchFaculty,
  BatchVideo,
  BatchTest,
  BatchStudyMaterial,
  SupportTicket,
  TicketCategory,
  TicketStatus,
  TicketPriority,
  TicketMessage
} from '../types';
import {
  INITIAL_USER,
  COURSES_DATA,
  LIVE_CLASSES_DATA,
  TEST_SERIES_DATA,
  STUDY_MATERIALS_DATA,
  DOUBTS_DATA,
  ASSIGNMENTS_DATA,
  CRM_LEADS_DATA,
  CERTIFICATES_DATA,
  NOTIFICATIONS_DATA,
  ALL_USERS_DATA,
  ATTENDANCE_RECORDS_DATA,
  LIVE_RECORDINGS_DATA,
  LIVE_REMINDERS_DATA,
  QUESTION_BANK_DATA,
  DEFAULT_TEST_RESULTS,
  STORE_PRODUCTS_DATA,
  ORDERS_DATA,
  SAMPLE_INVOICES_DATA,
  COUPONS_DATA,
  COMBO_PACKAGES_DATA,
  SUBSCRIPTION_PLANS_DATA,
  WISHLIST_LEADS_DATA,
  REMARKETING_CAMPAIGNS_DATA,
  DEFAULT_ADMIN_VIDEOS,
  DEFAULT_ADMIN_PDFS,
  DEFAULT_ADMIN_NOTES,
  DEFAULT_ADMIN_ANNOUNCEMENTS,
  DEFAULT_ADMIN_BLOGS,
  DEFAULT_ADMIN_BANNERS,
  DEFAULT_ADMIN_FAQS,
  DEFAULT_ACADEMIC_BATCHES,
  DEFAULT_SUPPORT_TICKETS
} from '../mockData';

interface AppContextType {
  currentView: AppPlatformView;
  setView: (view: AppPlatformView) => void;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  allUsers: UserProfile[];
  switchRoleAndNavigate: (role: UserRole) => void;
  
  // Content States
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  storeProducts: StoreProduct[];
  setStoreProducts: React.Dispatch<React.SetStateAction<StoreProduct[]>>;
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  invoices: { [invoiceNumber: string]: InvoiceItem };
  setInvoices: React.Dispatch<React.SetStateAction<{ [invoiceNumber: string]: InvoiceItem }>>;
  liveClasses: LiveClass[];
  setLiveClasses: React.Dispatch<React.SetStateAction<LiveClass[]>>;
  liveRecordings: LiveClass[];
  setLiveRecordings: React.Dispatch<React.SetStateAction<LiveClass[]>>;
  attendanceRecords: LiveClassAttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<LiveClassAttendanceRecord[]>>;
  liveReminders: LiveClassReminder[];
  setLiveReminders: React.Dispatch<React.SetStateAction<LiveClassReminder[]>>;
  questionBank: Question[];
  setQuestionBank: React.Dispatch<React.SetStateAction<Question[]>>;
  testSeries: TestSeriesExam[];
  setTestSeries: React.Dispatch<React.SetStateAction<TestSeriesExam[]>>;
  testResults: TestAttemptResult[];
  studyMaterials: StudyMaterialItem[];
  setStudyMaterials: React.Dispatch<React.SetStateAction<StudyMaterialItem[]>>;
  uploadStudyMaterial: (material: Omit<StudyMaterialItem, 'id'> | StudyMaterialItem) => void;
  updateStudyMaterial: (material: StudyMaterialItem) => void;
  deleteStudyMaterial: (id: string) => void;
  doubts: DoubtItem[];
  assignments: AssignmentItem[];
  leads: LeadItem[];
  certificates: CertificateItem[];
  notifications: PlatformNotification[];
  cart: CartItem[];

  // 1. Coupon System States & Actions
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  validateCoupon: (code: string, subtotal: number, cartItems?: CartItem[], userEmail?: string) => CouponValidationResult;
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (couponId: string) => void;
  toggleCouponStatus: (couponId: string) => void;

  // 2. Combo Package System States & Actions
  comboPackages: ComboPackage[];
  setComboPackages: React.Dispatch<React.SetStateAction<ComboPackage[]>>;
  addComboPackage: (combo: ComboPackage) => void;
  updateComboPackage: (combo: ComboPackage) => void;
  deleteComboPackage: (comboId: string) => void;

  // 3. Subscription System States & Actions
  subscriptionPlans: SubscriptionPlan[];
  setSubscriptionPlans: React.Dispatch<React.SetStateAction<SubscriptionPlan[]>>;
  subscribeToPlan: (planId: string, paymentMethod?: string) => { order: OrderItem; subscription: UserSubscription };
  cancelSubscription: () => void;

  // 4. Wishlist & Marketing Remarketing States & Actions
  wishlistLeads: WishlistLead[];
  setWishlistLeads: React.Dispatch<React.SetStateAction<WishlistLead[]>>;
  remarketingCampaigns: RemarketingCampaign[];
  setRemarketingCampaigns: React.Dispatch<React.SetStateAction<RemarketingCampaign[]>>;
  toggleWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
  sendRemarketingCampaign: (campaign: Omit<RemarketingCampaign, 'id' | 'sentDate' | 'status' | 'clicksCount' | 'conversionsCount' | 'revenueGenerated'>) => void;

  // Interactive Active View Targets
  selectedCourseForDetail: Course | null;
  setSelectedCourseForDetail: (course: Course | null) => void;
  activeLiveClass: LiveClass | null;
  setActiveLiveClass: (liveClass: LiveClass | null) => void;
  activeTest: TestSeriesExam | null;
  setActiveTest: (test: TestSeriesExam | null) => void;
  activeTestResult: TestAttemptResult | null;
  setActiveTestResult: (res: TestAttemptResult | null) => void;
  activeVideoLesson: { course: Course; lesson: Lesson } | null;
  setActiveVideoLesson: (target: { course: Course; lesson: Lesson } | null) => void;
  selectedInvoice: InvoiceItem | null;
  setSelectedInvoice: (inv: InvoiceItem | null) => void;
  selectedCertificate: CertificateItem | null;
  setSelectedCertificate: (cert: CertificateItem | null) => void;
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: (open: boolean) => void;
  setIsVerifyModalOpen?: (open: boolean) => void;
  
  // Student & E-commerce Actions
  addToCart: (item: Course | StoreProduct, comboUpgrade?: boolean) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  enrollInCourse: (courseId: string) => void;
  completeCheckout: (paymentDetails?: {
    method?: string;
    transactionId?: string;
    couponCode?: string;
    discountPct?: number;
    discountAmount?: number;
    billingAddress?: { street: string; city: string; state: string; pincode: string };
  }) => { order: OrderItem; invoice: InvoiceItem };
  markLessonComplete: (lessonId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderPaymentStatus) => void;
  issueOrderRefund: (orderId: string) => void;
  verifyCertificateCode: (query: string) => CertificateItem | null;
  claimCertificate: (courseId: string, courseTitle: string, grade?: string) => CertificateItem;
  
  // Exam & Learning Actions
  submitTestAttempt: (result: TestAttemptResult) => void;
  submitDoubt: (subject: string, courseTitle: string, questionText: string, imageUrl?: string) => void;
  submitAssignment: (assignmentId: string, fileName: string, notes?: string) => void;
  
  // Question Bank & Test Series Actions
  addQuestionToBank: (question: Question) => void;
  deleteQuestionFromBank: (questionId: string) => void;
  createTestSeries: (test: TestSeriesExam) => void;
  updateTestSeries: (test: TestSeriesExam) => void;
  deleteTestSeries: (testId: string) => void;

  // Assignments Management Actions
  addAssignment: (assignment: AssignmentItem) => void;
  updateAssignment: (assignment: AssignmentItem) => void;
  deleteAssignment: (assignmentId: string) => void;

  // Content Management System (CMS) States & Actions
  adminVideos: AdminVideoItem[];
  setAdminVideos: React.Dispatch<React.SetStateAction<AdminVideoItem[]>>;
  addAdminVideo: (v: AdminVideoItem) => void;
  updateAdminVideo: (v: AdminVideoItem) => void;
  deleteAdminVideo: (id: string) => void;

  adminPdfs: AdminPdfItem[];
  setAdminPdfs: React.Dispatch<React.SetStateAction<AdminPdfItem[]>>;
  addAdminPdf: (p: AdminPdfItem) => void;
  updateAdminPdf: (p: AdminPdfItem) => void;
  deleteAdminPdf: (id: string) => void;

  adminNotes: AdminNotesItem[];
  setAdminNotes: React.Dispatch<React.SetStateAction<AdminNotesItem[]>>;
  addAdminNotes: (n: AdminNotesItem) => void;
  updateAdminNotes: (n: AdminNotesItem) => void;
  deleteAdminNotes: (id: string) => void;

  adminAnnouncements: AdminAnnouncementItem[];
  setAdminAnnouncements: React.Dispatch<React.SetStateAction<AdminAnnouncementItem[]>>;
  addAdminAnnouncement: (a: AdminAnnouncementItem) => void;
  updateAdminAnnouncement: (a: AdminAnnouncementItem) => void;
  deleteAdminAnnouncement: (id: string) => void;

  adminBlogs: AdminBlogItem[];
  setAdminBlogs: React.Dispatch<React.SetStateAction<AdminBlogItem[]>>;
  addAdminBlog: (b: AdminBlogItem) => void;
  updateAdminBlog: (b: AdminBlogItem) => void;
  deleteAdminBlog: (id: string) => void;

  adminBanners: AdminBannerItem[];
  setAdminBanners: React.Dispatch<React.SetStateAction<AdminBannerItem[]>>;
  addAdminBanner: (b: AdminBannerItem) => void;
  updateAdminBanner: (b: AdminBannerItem) => void;
  deleteAdminBanner: (id: string) => void;

  adminFaqs: AdminFaqItem[];
  setAdminFaqs: React.Dispatch<React.SetStateAction<AdminFaqItem[]>>;
  addAdminFaq: (f: AdminFaqItem) => void;
  updateAdminFaq: (f: AdminFaqItem) => void;
  deleteAdminFaq: (id: string) => void;

  // Live Class, Attendance & Recording Actions
  scheduleLiveClass: (liveClass: LiveClass) => void;
  updateLiveClassStatus: (liveClassId: string, status: 'upcoming' | 'live' | 'completed') => void;
  deleteLiveClass: (liveClassId: string) => void;
  publishLiveRecording: (liveClassId: string, recordingUrl?: string) => void;
  recordStudentAttendance: (record: LiveClassAttendanceRecord) => void;
  scheduleLiveReminder: (reminder: LiveClassReminder) => void;
  triggerReminderSimulation: (reminderId: string) => void;

  // Panel Management Actions
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  duplicateCourse: (courseId: string) => void;
  togglePublishCourse: (courseId: string) => void;
  assignFacultyToCourse: (courseId: string, facultyName: string, facultyDesignation?: string) => void;
  assignBatchToCourse: (courseId: string, batchName: string) => void;
  setCoursePricing: (courseId: string, price: number, originalPrice: number) => void;
  setCourseValidity: (courseId: string, validity: string) => void;
  addLessonToCourse: (courseId: string, chapterId: string, lesson: Lesson) => void;
  toggleLessonFreeStatus: (courseId: string, chapterId: string, lessonId: string) => void;
  addLead: (lead: LeadItem) => void;
  updateLeadStage: (leadId: string, newStage: LeadItem['stage'], note?: string) => void;
  updateLeadDetails: (leadId: string, updates: Partial<LeadItem>) => void;
  resolveDoubt: (doubtId: string, replyText: string, formula?: string) => void;
  answerDoubt: (doubtId: string, facultyName: string, facultyAvatar: string, replyText: string, formula?: string) => void;
  gradeAssignment: (assignmentId: string, score: number, feedback: string) => void;

  // Batch Management (Students, Faculty, Schedule, Subjects, Videos, Tests, Study Material)
  batches: AcademicBatch[];
  setBatches: React.Dispatch<React.SetStateAction<AcademicBatch[]>>;
  addBatch: (batch: AcademicBatch) => void;
  updateBatch: (batch: AcademicBatch) => void;
  deleteBatch: (batchId: string) => void;
  addStudentToBatch: (batchId: string, student: BatchStudent) => void;
  removeStudentFromBatch: (batchId: string, studentId: string) => void;
  addFacultyToBatch: (batchId: string, faculty: BatchFaculty) => void;
  removeFacultyFromBatch: (batchId: string, facultyId: string) => void;
  addVideoToBatch: (batchId: string, video: BatchVideo) => void;
  addTestToBatch: (batchId: string, test: BatchTest) => void;
  addMaterialToBatch: (batchId: string, material: BatchStudyMaterial) => void;

  // Support Ticket System (Payment, Course Access, Video Issue, Live Class, Test, Account, Certificate, Other)
  supportTickets: SupportTicket[];
  setSupportTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  createTicket: (ticketData: {
    category: TicketCategory;
    subject: string;
    description: string;
    priority: TicketPriority;
    relatedCourse?: string;
    studentName?: string;
    studentEmail?: string;
    studentPhone?: string;
  }) => SupportTicket;
  updateTicketStatus: (ticketId: string, status: TicketStatus, resolutionNotes?: string) => void;
  replyToTicket: (ticketId: string, message: string, senderRole?: 'student' | 'admin' | 'support', senderName?: string) => void;
  assignTicketAgent: (ticketId: string, agentName: string) => void;
  
  // Notification Actions (12 Categories)
  sendBroadcastNotification: (notif: Omit<PlatformNotification, 'id' | 'time' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (open: boolean) => void;

  // Global Search Engine (Courses, Subjects, Videos, Faculty, Test Series, Study Material, Chapters)
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  performGlobalSearch: (query: string, categoryFilter?: GlobalSearchCategory) => GlobalSearchResult[];
  handleGlobalSearchResultClick: (result: GlobalSearchResult) => void;

  // Modals & UI Toggles
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  registerStudent: (details: Partial<UserProfile> & { password?: string }) => void;
  loginStudent: (identifier: string, method?: 'otp' | 'password' | 'google') => boolean;
  logoutStudent: () => void;
  mobileDevicePlatform: 'android' | 'ios';
  setMobileDevicePlatform: (p: 'android' | 'ios') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Safe JSON parser to prevent white screen crashes in production (e.g. on Vercel/Netlify)
function safeJsonParse<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') {
      return fallback;
    }
    return JSON.parse(saved) as T;
  } catch (e) {
    console.warn(`Safe storage parse fallback for key "${key}":`, e);
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setView] = useState<AppPlatformView>('website');
  const [currentRole, setRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('dcmaxwell_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_USER,
          ...parsed,
          enrolledCourseIds: Array.isArray(parsed.enrolledCourseIds) ? parsed.enrolledCourseIds : INITIAL_USER.enrolledCourseIds,
          completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : INITIAL_USER.completedLessonIds
        };
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USER;
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => safeJsonParse('dcmaxwell_all_users', ALL_USERS_DATA));

  const [courses, setCourses] = useState<Course[]>(() => safeJsonParse('dcmaxwell_courses', COURSES_DATA));
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(() => safeJsonParse('dcmaxwell_live_classes', LIVE_CLASSES_DATA));
  const [liveRecordings, setLiveRecordings] = useState<LiveClass[]>(() => safeJsonParse('dcmaxwell_recordings', LIVE_RECORDINGS_DATA));
  const [attendanceRecords, setAttendanceRecords] = useState<LiveClassAttendanceRecord[]>(() => safeJsonParse('dcmaxwell_attendance', ATTENDANCE_RECORDS_DATA));
  const [liveReminders, setLiveReminders] = useState<LiveClassReminder[]>(() => safeJsonParse('dcmaxwell_reminders', LIVE_REMINDERS_DATA));
  const [questionBank, setQuestionBank] = useState<Question[]>(() => safeJsonParse('dcmaxwell_question_bank', QUESTION_BANK_DATA));
  const [testSeries, setTestSeries] = useState<TestSeriesExam[]>(() => safeJsonParse('dcmaxwell_tests', TEST_SERIES_DATA));
  const [testResults, setTestResults] = useState<TestAttemptResult[]>(() => safeJsonParse('dcmaxwell_test_results', DEFAULT_TEST_RESULTS));
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterialItem[]>(() => safeJsonParse('dcmaxwell_study_materials', STUDY_MATERIALS_DATA));

  const uploadStudyMaterial = (material: Omit<StudyMaterialItem, 'id'> | StudyMaterialItem) => {
    const newMat: StudyMaterialItem = {
      ...material,
      id: ('id' in material && material.id) ? material.id : `mat-${Date.now()}`,
      downloadsCount: ('downloadsCount' in material && material.downloadsCount !== undefined) ? material.downloadsCount : 0,
      viewsCount: ('viewsCount' in material && material.viewsCount !== undefined) ? material.viewsCount : 0,
      updatedDate: ('updatedDate' in material && material.updatedDate) ? material.updatedDate : 'Just now'
    };
    setStudyMaterials(prev => {
      const updated = [newMat, ...prev];
      localStorage.setItem('dcmaxwell_study_materials', JSON.stringify(updated));
      return updated;
    });
  };

  const updateStudyMaterial = (updatedMaterial: StudyMaterialItem) => {
    setStudyMaterials(prev => {
      const updated = prev.map(m => m.id === updatedMaterial.id ? updatedMaterial : m);
      localStorage.setItem('dcmaxwell_study_materials', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem('dcmaxwell_study_materials', JSON.stringify(updated));
      return updated;
    });
  };

  const [doubts, setDoubts] = useState<DoubtItem[]>(() => safeJsonParse('dcmaxwell_doubts', DOUBTS_DATA));
  const [assignments, setAssignments] = useState<AssignmentItem[]>(() => safeJsonParse('dcmaxwell_assignments', ASSIGNMENTS_DATA));
  const [leads, setLeads] = useState<LeadItem[]>(() => safeJsonParse('dcmaxwell_leads', CRM_LEADS_DATA));
  const [batches, setBatches] = useState<AcademicBatch[]>(() => safeJsonParse('dcmaxwell_academic_batches', DEFAULT_ACADEMIC_BATCHES));

  useEffect(() => {
    try {
      localStorage.setItem('dcmaxwell_academic_batches', JSON.stringify(batches));
    } catch (e) {
      console.warn(e);
    }
  }, [batches]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => safeJsonParse('dcmaxwell_support_tickets', DEFAULT_SUPPORT_TICKETS));

  useEffect(() => {
    try {
      localStorage.setItem('dcmaxwell_support_tickets', JSON.stringify(supportTickets));
    } catch (e) {
      console.warn(e);
    }
  }, [supportTickets]);

  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>(() => safeJsonParse('dcmaxwell_store_products', STORE_PRODUCTS_DATA));
  const [orders, setOrders] = useState<OrderItem[]>(() => safeJsonParse('dcmaxwell_orders', ORDERS_DATA));
  const [invoices, setInvoices] = useState<{ [invoiceNumber: string]: InvoiceItem }>(() => safeJsonParse('dcmaxwell_invoices', SAMPLE_INVOICES_DATA));
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => safeJsonParse('dcmaxwell_certificates', CERTIFICATES_DATA));
  const [notifications, setNotifications] = useState<PlatformNotification[]>(() => safeJsonParse('dcmaxwell_notifications', NOTIFICATIONS_DATA));

  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Coupon System State
  const [coupons, setCoupons] = useState<Coupon[]>(() => safeJsonParse('dcmaxwell_coupons', COUPONS_DATA));

  // 2. Combo Package System State
  const [comboPackages, setComboPackages] = useState<ComboPackage[]>(() => safeJsonParse('dcmaxwell_combo_packages', COMBO_PACKAGES_DATA));

  // 3. Subscription Plans System State
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(() => safeJsonParse('dcmaxwell_subscription_plans', SUBSCRIPTION_PLANS_DATA));

  // 4. Wishlist & Remarketing State
  const [wishlistLeads, setWishlistLeads] = useState<WishlistLead[]>(() => safeJsonParse('dcmaxwell_wishlist_leads', WISHLIST_LEADS_DATA));
  const [remarketingCampaigns, setRemarketingCampaigns] = useState<RemarketingCampaign[]>(() => safeJsonParse('dcmaxwell_remarketing_campaigns', REMARKETING_CAMPAIGNS_DATA));

  // 5. Content Management System (CMS) State
  const [adminVideos, setAdminVideos] = useState<AdminVideoItem[]>(() => safeJsonParse('dcmaxwell_cms_videos', DEFAULT_ADMIN_VIDEOS));
  const [adminPdfs, setAdminPdfs] = useState<AdminPdfItem[]>(() => safeJsonParse('dcmaxwell_cms_pdfs', DEFAULT_ADMIN_PDFS));
  const [adminNotes, setAdminNotes] = useState<AdminNotesItem[]>(() => safeJsonParse('dcmaxwell_cms_notes', DEFAULT_ADMIN_NOTES));
  const [adminAnnouncements, setAdminAnnouncements] = useState<AdminAnnouncementItem[]>(() => safeJsonParse('dcmaxwell_cms_announcements', DEFAULT_ADMIN_ANNOUNCEMENTS));
  const [adminBlogs, setAdminBlogs] = useState<AdminBlogItem[]>(() => safeJsonParse('dcmaxwell_cms_blogs', DEFAULT_ADMIN_BLOGS));
  const [adminBanners, setAdminBanners] = useState<AdminBannerItem[]>(() => safeJsonParse('dcmaxwell_cms_banners', DEFAULT_ADMIN_BANNERS));
  const [adminFaqs, setAdminFaqs] = useState<AdminFaqItem[]>(() => safeJsonParse('dcmaxwell_cms_faqs', DEFAULT_ADMIN_FAQS));

  // Navigation targets & Modals
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [activeLiveClass, setActiveLiveClass] = useState<LiveClass | null>(null);
  const [activeTest, setActiveTest] = useState<TestSeriesExam | null>(null);
  const [activeTestResult, setActiveTestResult] = useState<TestAttemptResult | null>(null);
  const [activeVideoLesson, setActiveVideoLesson] = useState<{ course: Course; lesson: Lesson } | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Filters & UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  const [mobileDevicePlatform, setMobileDevicePlatform] = useState<'android' | 'ios'>('android');

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('dcmaxwell_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_wishlist_leads', JSON.stringify(wishlistLeads));
  }, [wishlistLeads]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_remarketing_campaigns', JSON.stringify(remarketingCampaigns));
  }, [remarketingCampaigns]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_store_products', JSON.stringify(storeProducts));
  }, [storeProducts]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_live_classes', JSON.stringify(liveClasses));
  }, [liveClasses]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_recordings', JSON.stringify(liveRecordings));
  }, [liveRecordings]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_reminders', JSON.stringify(liveReminders));
  }, [liveReminders]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_question_bank', JSON.stringify(questionBank));
  }, [questionBank]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_tests', JSON.stringify(testSeries));
  }, [testSeries]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_test_results', JSON.stringify(testResults));
  }, [testResults]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_combo_packages', JSON.stringify(comboPackages));
  }, [comboPackages]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_subscription_plans', JSON.stringify(subscriptionPlans));
  }, [subscriptionPlans]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_videos', JSON.stringify(adminVideos));
  }, [adminVideos]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_pdfs', JSON.stringify(adminPdfs));
  }, [adminPdfs]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_notes', JSON.stringify(adminNotes));
  }, [adminNotes]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_announcements', JSON.stringify(adminAnnouncements));
  }, [adminAnnouncements]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_blogs', JSON.stringify(adminBlogs));
  }, [adminBlogs]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_banners', JSON.stringify(adminBanners));
  }, [adminBanners]);

  useEffect(() => {
    localStorage.setItem('dcmaxwell_cms_faqs', JSON.stringify(adminFaqs));
  }, [adminFaqs]);

  // -------------------------------------------------------------
  // STUDENT REGISTRATION & AUTHENTICATION (Mobile + OTP, Email + Password, Google)
  // -------------------------------------------------------------
  const registerStudent = (details: Partial<UserProfile> & { password?: string }) => {
    const newStudent: UserProfile = {
      id: `std-${Date.now()}`,
      name: details.name || 'Registered Student',
      email: details.email || 'student@dcmaxwell.edu',
      phone: details.phone || '+91 98765 43210',
      role: 'student',
      avatar: details.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      dob: details.dob || '2006-05-15',
      gender: details.gender || 'Male',
      city: details.city || 'Delhi NCR',
      schoolCollege: details.schoolCollege || 'Delhi Public School',
      studentClass: details.studentClass || 'Class 12th',
      targetExam: details.targetExam || 'CA Foundation',
      preferredLanguage: details.preferredLanguage || 'English & Hinglish',
      enrolledCourseIds: ['crs-ca-foundation-package'],
      completedLessonIds: [],
      walletBalance: 500,
      studyStreakDays: 1,
      wishlistCourseIds: []
    };

    setCurrentUser(newStudent);
    setAllUsers(prev => [newStudent, ...prev]);
    setRole('student');
    setView('student_portal');
    setIsAuthModalOpen(false);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: '🎉 Welcome to DC Maxwell Academy!',
        message: `Welcome ${newStudent.name}! Your student registration is confirmed. ₹500 welcome credit has been credited to your wallet.`,
        type: 'registration',
        category: 'registration',
        date: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const loginStudent = (identifier: string, method: 'otp' | 'password' | 'google' = 'otp') => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanDigits = identifier.replace(/\D/g, '');
    const matched = allUsers.find(u => 
      u.email.toLowerCase() === cleanId ||
      (cleanDigits.length >= 10 && u.phone.replace(/\D/g, '').includes(cleanDigits.slice(-10)))
    );

    if (matched) {
      setCurrentUser(matched);
      setRole(matched.role || 'student');
      setView(matched.role === 'student' ? 'student_portal' : 'admin_panel');
      setIsAuthModalOpen(false);
      return true;
    } else {
      const autoUser: UserProfile = {
        ...INITIAL_USER,
        id: `std-${Date.now()}`,
        name: identifier.includes('@') ? identifier.split('@')[0] : (method === 'google' ? 'Google Student' : 'Verified Learner'),
        email: identifier.includes('@') ? identifier : `${cleanDigits || 'student'}@dcmaxwell.edu`,
        phone: identifier.includes('@') ? '+91 98765 43210' : identifier,
        role: 'student',
        walletBalance: 500,
        targetExam: 'CA Foundation'
      };
      setCurrentUser(autoUser);
      setAllUsers(prev => [autoUser, ...prev]);
      setRole('student');
      setView('student_portal');
      setIsAuthModalOpen(false);
      return true;
    }
  };

  const logoutStudent = () => {
    setCurrentUser(INITIAL_USER);
    setView('website');
  };

  // -------------------------------------------------------------
  // 1. COUPON SYSTEM IMPLEMENTATION
  // -------------------------------------------------------------
  const validateCoupon = (
    code: string,
    subtotal: number,
    cartItems: CartItem[] = cart,
    userEmail?: string
  ): CouponValidationResult => {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      return { isValid: false, discountAmount: 0, errorMessage: 'Please enter a coupon code.' };
    }

    const coupon = coupons.find(c => c.code.toUpperCase() === trimmed);
    if (!coupon) {
      return { isValid: false, discountAmount: 0, errorMessage: `Coupon "${trimmed}" does not exist or is invalid.` };
    }

    if (!coupon.isActive) {
      return { isValid: false, discountAmount: 0, errorMessage: `Coupon "${coupon.code}" is currently disabled.` };
    }

    // Check expiry date
    if (coupon.expiryDate) {
      const expiry = new Date(coupon.expiryDate);
      expiry.setHours(23, 59, 59, 999);
      if (new Date() > expiry) {
        return { 
          isValid: false, 
          discountAmount: 0, 
          errorMessage: `Coupon "${coupon.code}" expired on ${new Date(coupon.expiryDate).toLocaleDateString('en-IN')}.` 
        };
      }
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { 
        isValid: false, 
        discountAmount: 0, 
        errorMessage: `Coupon "${coupon.code}" maximum redemption limit (${coupon.usageLimit}) has been reached.` 
      };
    }

    // Check minimum order value
    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      return { 
        isValid: false, 
        discountAmount: 0, 
        errorMessage: `Requires a minimum order value of ₹${coupon.minOrderValue.toLocaleString('en-IN')} (Current: ₹${subtotal.toLocaleString('en-IN')}).` 
      };
    }

    // Check user-specific coupon
    if (coupon.applicableUserEmails && coupon.applicableUserEmails.length > 0) {
      const emailToCheck = (userEmail || currentUser.email || '').toLowerCase().trim();
      const isAllowed = coupon.applicableUserEmails.some(e => e.toLowerCase().trim() === emailToCheck);
      if (!isAllowed) {
        return { 
          isValid: false, 
          discountAmount: 0, 
          errorMessage: `Coupon "${coupon.code}" is exclusively reserved for specified student accounts.` 
        };
      }
    }

    // Check course-specific coupon
    if (coupon.applicableCourseIds && coupon.applicableCourseIds.length > 0) {
      const itemIds = cartItems.map(item => item.product?.id || item.course?.id || '').filter(Boolean);
      const matchesCourse = itemIds.some(id => coupon.applicableCourseIds?.includes(id));
      if (!matchesCourse && cartItems.length > 0) {
        return { 
          isValid: false, 
          discountAmount: 0, 
          errorMessage: `Coupon "${coupon.code}" is applicable only for specific courses/packages.` 
        };
      }
    }

    // Calculate discount
    let calculatedDiscount = 0;
    let pct: number | undefined = undefined;

    if (coupon.discountType === 'percentage') {
      pct = coupon.discountValue;
      calculatedDiscount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscountAmount && calculatedDiscount > coupon.maxDiscountAmount) {
        calculatedDiscount = coupon.maxDiscountAmount;
      }
    } else {
      // Fixed amount discount
      calculatedDiscount = Math.min(coupon.discountValue, subtotal);
    }

    return {
      isValid: true,
      discountAmount: calculatedDiscount,
      discountPercentage: pct,
      appliedCoupon: coupon
    };
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
    const newNotif: PlatformNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Coupon Created 🏷️',
      message: `Coupon code ${coupon.code} (${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`} off) is now active.`,
      type: 'offer',
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateCoupon = (updatedCoupon: Coupon) => {
    setCoupons(prev => prev.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, isActive: !c.isActive } : c));
  };

  // -------------------------------------------------------------
  // 2. COMBO PACKAGE SYSTEM ACTIONS
  // -------------------------------------------------------------
  const addComboPackage = (combo: ComboPackage) => {
    setComboPackages(prev => [combo, ...prev]);
    
    // Also sync to storeProducts if needed for general store display
    const storeItem: StoreProduct = {
      id: combo.id,
      title: combo.title,
      tagline: combo.tagline,
      type: 'combo_package',
      category: combo.category,
      targetExam: combo.targetExam,
      price: combo.price,
      originalPrice: combo.originalPrice,
      discountPercentage: combo.discountPercentage,
      rating: combo.rating,
      reviewsCount: combo.reviewsCount,
      enrolledCount: combo.enrolledCount,
      thumbnail: combo.thumbnail,
      isBestseller: combo.isBestseller,
      features: combo.features,
      validity: combo.validity,
      comboDetails: {
        includesRecorded: combo.inclusions.hasRecordedCourses,
        includesLive: combo.inclusions.hasLiveClasses,
        includesTestSeries: combo.inclusions.hasTestSeries,
        includesStudyMaterial: combo.inclusions.hasStudyMaterial,
        includesDoubtSupport: combo.inclusions.hasDoubtSupport
      }
    };
    setStoreProducts(prev => [storeItem, ...prev.filter(p => p.id !== combo.id)]);
  };

  const updateComboPackage = (combo: ComboPackage) => {
    setComboPackages(prev => prev.map(c => c.id === combo.id ? combo : c));
    setStoreProducts(prev => prev.map(p => p.id === combo.id ? {
      ...p,
      title: combo.title,
      tagline: combo.tagline,
      price: combo.price,
      originalPrice: combo.originalPrice,
      discountPercentage: combo.discountPercentage,
      features: combo.features,
      validity: combo.validity
    } : p));
  };

  const deleteComboPackage = (comboId: string) => {
    setComboPackages(prev => prev.filter(c => c.id !== comboId));
    setStoreProducts(prev => prev.filter(p => p.id !== comboId));
  };

  // -------------------------------------------------------------
  // 3. SUBSCRIPTION SYSTEM ACTIONS
  // -------------------------------------------------------------
  const subscribeToPlan = (planId: string, paymentMethod = 'UPI') => {
    const plan = subscriptionPlans.find(p => p.id === planId) || subscriptionPlans[0];
    const orderId = `ORD-SUB-${Date.now()}`;
    const txId = `TXN-SUB-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const invNum = `INV-SUB-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date();
    const todayStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Calculate expiry date based on period
    const expiry = new Date(today);
    let days = 30;
    if (plan.billingPeriod === 'monthly') {
      expiry.setMonth(expiry.getMonth() + 1);
      days = 30;
    } else if (plan.billingPeriod === 'quarterly') {
      expiry.setMonth(expiry.getMonth() + 3);
      days = 90;
    } else if (plan.billingPeriod === 'annual') {
      expiry.setFullYear(expiry.getFullYear() + 1);
      days = 365;
    } else {
      expiry.setFullYear(expiry.getFullYear() + 2);
      days = 730;
    }
    const expiryStr = expiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newSub: UserSubscription = {
      id: `sub-user-${Date.now()}`,
      planId: plan.id,
      planName: plan.tierName,
      billingPeriod: plan.billingPeriod,
      startDate: todayStr,
      expiryDate: expiryStr,
      status: 'active',
      autoRenew: true,
      pricePaid: plan.price,
      transactionId: txId,
      daysRemaining: days
    };

    const newOrder: OrderItem = {
      id: orderId,
      orderNumber: orderId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone || '+91 98765 43210',
      productTitle: `${plan.tierName} (${plan.billingIntervalText})`,
      productType: 'premium_membership',
      items: [{
        id: plan.id,
        title: plan.tierName,
        type: 'premium_membership',
        price: plan.price,
        quantity: 1
      }],
      totalAmount: plan.price,
      baseAmount: plan.price,
      discountAmount: Math.max(0, plan.originalPrice - plan.price),
      taxAmount: 0,
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod as any,
      transactionId: txId,
      orderDate: todayStr,
      invoiceNumber: invNum
    };

    const newInvoice: InvoiceItem = {
      invoiceNumber: invNum,
      orderId: orderId,
      issueDate: todayStr,
      dueDate: todayStr,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone || '+91 98765 43210',
      studentAddress: '124 Academic Enclave, Knowledge Park III, New Delhi - 110001',
      academyDetails: {
        name: 'DC Maxwell Education Academy Ltd.',
        address: 'Knowledge Tower 4, Sector 62, Noida, Uttar Pradesh 201309',
        gstin: '07AAAAA0000A1Z5',
        cin: 'U80903DL2021PTC384729',
        supportEmail: 'billing@dcmaxwell.academy',
        supportPhone: '+91 1800-833-4882'
      },
      items: [{
        description: `Subscription: ${plan.tierName} - Unlimited Premium Access`,
        hsnCode: '999293',
        quantity: 1,
        unitPrice: plan.price,
        amount: plan.price
      }],
      subtotal: plan.price,
      discount: 0,
      cgst: 0,
      sgst: 0,
      totalAmount: plan.price,
      paymentMethod: paymentMethod as any,
      transactionId: txId,
      paymentStatus: 'Paid',
      authorizedSignatory: 'Dr. Rajiv Malhotra, Director of Finance'
    };

    // Unlock all courses for annual/quarterly/monthly plans
    const allCourseIds = courses.map(c => c.id);

    // Update global state & user
    setOrders(prev => [newOrder, ...prev]);
    setInvoices(prev => ({ ...prev, [invNum]: newInvoice }));
    setCurrentUser(prev => ({
      ...prev,
      subscription: newSub,
      isPremiumMember: true,
      enrolledCourseIds: Array.from(new Set([...prev.enrolledCourseIds, ...allCourseIds])),
      orders: [newOrder, ...(prev.orders || [])]
    }));

    const newNotif: PlatformNotification = {
      id: `notif-${Date.now()}`,
      title: '🌟 DC Maxwell VIP Membership Activated!',
      message: `Welcome to ${plan.tierName}! All premium courses, test series, and study materials are now unlocked.`,
      type: 'achievement',
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return { order: newOrder, subscription: newSub };
  };

  const cancelSubscription = () => {
    setCurrentUser(prev => {
      if (!prev.subscription) return prev;
      return {
        ...prev,
        subscription: {
          ...prev.subscription,
          status: 'cancelled',
          autoRenew: false
        }
      };
    });
  };

  const switchRoleAndNavigate = (newRole: UserRole) => {
    setRole(newRole);
    setCurrentUser(prev => ({ ...prev, role: newRole }));
    
    switch (newRole) {
      case 'student':
        setView('student_portal');
        break;
      case 'super_admin':
      case 'admin':
        setView('admin_panel');
        break;
      case 'faculty':
        setView('faculty_panel');
        break;
      case 'counsellor':
        setView('counsellor_panel');
        break;
      case 'content_manager':
        setView('content_panel');
        break;
      case 'exam_manager':
        setView('exam_panel');
        break;
      default:
        setView('website');
    }
  };

  const addToCart = (item: Course | StoreProduct, comboUpgrade = false) => {
    const isStoreProd = 'type' in item && 'features' in item;
    const itemId = item.id;

    setCart(prev => {
      const exists = prev.find(cartItem => {
        if (cartItem.product && cartItem.product.id === itemId) return true;
        if (cartItem.course && cartItem.course.id === itemId) return true;
        return false;
      });

      if (exists) {
        return prev.map(cartItem => {
          const match = (cartItem.product?.id === itemId) || (cartItem.course?.id === itemId);
          return match ? { ...cartItem, comboUpgrade } : cartItem;
        });
      }

      if (isStoreProd) {
        const storeProd = item as StoreProduct;
        // If it maps to a course, find it
        const linkedCourse = storeProd.courseId ? courses.find(c => c.id === storeProd.courseId) : undefined;
        return [...prev, {
          course: linkedCourse || {
            id: storeProd.id,
            title: storeProd.title,
            instructor: storeProd.instructor || 'DC Maxwell Faculty',
            price: storeProd.price,
            originalPrice: storeProd.originalPrice,
            rating: storeProd.rating,
            ratingCount: storeProd.ratingCount || 120,
            lessonsCount: 24,
            duration: storeProd.validity || '1 Year',
            level: 'All Levels',
            category: storeProd.category,
            thumbnail: storeProd.thumbnail,
            description: storeProd.description,
            isPopular: storeProd.badge ? true : false,
            chapters: []
          },
          product: storeProd,
          comboUpgrade
        }];
      } else {
        return [...prev, { course: item as Course, comboUpgrade }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => {
      if (item.course?.id === itemId) return false;
      if (item.product?.id === itemId) return false;
      return true;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const enrollInCourse = (courseId: string) => {
    setCurrentUser(prev => {
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
      };
    });
  };

  const completeCheckout = (paymentDetails?: {
    method?: string;
    transactionId?: string;
    couponCode?: string;
    discountPct?: number;
    discountAmount?: number;
    billingAddress?: { street: string; city: string; state: string; pincode: string };
  }) => {
    // Extract individual course IDs and bundle course IDs
    const courseIds: string[] = [];
    cart.forEach(item => {
      if (item.course?.id) courseIds.push(item.course.id);
      if (item.product?.courseId) courseIds.push(item.product.courseId);
      if (item.product?.id) courseIds.push(item.product.id);
      // If combo package, link all combo courses
      const combo = comboPackages.find(cp => cp.id === (item.product?.id || item.course?.id));
      if (combo && combo.linkedCourseIds) {
        combo.linkedCourseIds.forEach(id => courseIds.push(id));
      }
    });
    
    // Calculate totals
    const subtotal = cart.reduce((acc, item) => {
      const price = item.comboUpgrade ? (item.course?.price || 0) + 1499 : (item.product?.price ?? item.course?.price ?? 0);
      return acc + price;
    }, 0);
    
    let discount = 0;
    if (paymentDetails?.discountAmount !== undefined) {
      discount = paymentDetails.discountAmount;
    } else if (paymentDetails?.discountPct) {
      discount = Math.round((subtotal * paymentDetails.discountPct) / 100);
    } else if (paymentDetails?.couponCode) {
      const valResult = validateCoupon(paymentDetails.couponCode, subtotal, cart, currentUser.email);
      if (valResult.isValid) {
        discount = valResult.discountAmount;
      }
    }

    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.18); // 18% GST
    const finalTotal = taxable + tax;

    const orderId = `ORD-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const txId = paymentDetails?.transactionId || `TXN-UPI-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const invNum = `INV-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const orderItemsList = cart.map(cItem => ({
      id: cItem.product?.id || cItem.course?.id || `item-${Date.now()}`,
      title: cItem.product?.title || cItem.course?.title || 'Educational Product',
      type: (cItem.product?.type || 'recorded_course') as any,
      price: cItem.comboUpgrade ? (cItem.course?.price || 0) + 1499 : (cItem.product?.price ?? cItem.course?.price ?? 0),
      quantity: 1
    }));

    const newOrder: OrderItem = {
      id: orderId,
      orderNumber: orderId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone || '+91 98765 43210',
      productTitle: orderItemsList.map(i => i.title).join(', '),
      productType: (orderItemsList[0]?.type as any) || 'combo_package',
      items: orderItemsList,
      totalAmount: finalTotal,
      baseAmount: subtotal,
      discountAmount: discount,
      couponCode: paymentDetails?.couponCode,
      taxAmount: tax,
      paymentStatus: 'Paid',
      paymentMethod: (paymentDetails?.method as any) || 'UPI',
      transactionId: txId,
      orderDate: todayStr,
      invoiceNumber: invNum,
      billingAddress: paymentDetails?.billingAddress || {
        street: '124 Academic Enclave, Knowledge Park III',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        country: 'India'
      }
    };

    const newInvoice: InvoiceItem = {
      invoiceNumber: invNum,
      orderId: orderId,
      issueDate: todayStr,
      dueDate: todayStr,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone || '+91 98765 43210',
      studentAddress: `${newOrder.billingAddress?.street}, ${newOrder.billingAddress?.city}, ${newOrder.billingAddress?.state} - ${newOrder.billingAddress?.pincode}`,
      academyDetails: {
        name: 'DC Maxwell Education Academy Ltd.',
        address: 'Knowledge Tower 4, Sector 62, Noida, Uttar Pradesh 201309',
        gstin: '07AAAAA0000A1Z5',
        cin: 'U80903DL2021PTC384729',
        supportEmail: 'billing@dcmaxwell.academy',
        supportPhone: '+91 1800-833-4882'
      },
      items: orderItemsList.map(it => ({
        description: it.title,
        hsnCode: '999293',
        quantity: 1,
        unitPrice: it.price,
        amount: it.price
      })),
      subtotal,
      discount,
      cgst: Math.round(tax / 2),
      sgst: Math.round(tax / 2),
      totalAmount: finalTotal,
      paymentMethod: newOrder.paymentMethod,
      transactionId: txId,
      paymentStatus: 'Paid',
      authorizedSignatory: 'Dr. Rajiv Malhotra, Director of Finance'
    };

    // Increment coupon redemption counter if coupon used
    if (paymentDetails?.couponCode) {
      const codeUpper = paymentDetails.couponCode.trim().toUpperCase();
      setCoupons(prev => prev.map(c => c.code.toUpperCase() === codeUpper ? { ...c, usedCount: c.usedCount + 1 } : c));
    }

    // Check if membership was ordered
    const hasMembership = cart.some(i => i.product?.type === 'premium_membership');

    // Update global state
    setOrders(prev => [newOrder, ...prev]);
    setInvoices(prev => ({ ...prev, [invNum]: newInvoice }));
    
    // Unlock enrollments & update user orders & membership
    setCurrentUser(prev => ({
      ...prev,
      isPremiumMember: prev.isPremiumMember || hasMembership,
      enrolledCourseIds: Array.from(new Set([...prev.enrolledCourseIds, ...courseIds])),
      orders: [newOrder, ...(prev.orders || [])]
    }));

    clearCart();
    setIsCartOpen(false);

    // Create confirmation notification
    const newNotif: PlatformNotification = {
      id: `notif-${Date.now()}`,
      title: 'Order Confirmed & Access Unlocked! 🎉',
      message: `Order #${orderId} for ₹${finalTotal.toLocaleString('en-IN')} paid successfully. Invoice #${invNum} generated.`,
      type: 'system',
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return { order: newOrder, invoice: newInvoice };
  };

  const updateOrderStatus = (orderId: string, status: OrderPaymentStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: status } : o));
    setCurrentUser(prev => ({
      ...prev,
      orders: (prev.orders || []).map(o => o.id === orderId ? { ...o, paymentStatus: status } : o)
    }));

    const target = orders.find(o => o.id === orderId);
    if (target && target.invoiceNumber && invoices[target.invoiceNumber]) {
      setInvoices(prev => ({
        ...prev,
        [target.invoiceNumber!]: { ...prev[target.invoiceNumber!], status }
      }));
    }
  };

  const issueOrderRefund = (orderId: string) => {
    updateOrderStatus(orderId, 'Refunded');
    const newNotif: PlatformNotification = {
      id: `notif-${Date.now()}`,
      title: 'Refund Processed 💳',
      message: `Refund for Order #${orderId} has been credited back to original payment method.`,
      type: 'system',
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const verifyCertificateCode = (query: string): CertificateItem | null => {
    const q = query.trim().toUpperCase();
    if (!q) return null;
    const found = certificates.find(c => 
      c.credentialId.toUpperCase() === q || 
      (c.verificationHash && c.verificationHash.toUpperCase() === q) ||
      (c.qrCodeData && c.qrCodeData.toUpperCase().includes(q))
    );
    return found || null;
  };

  const claimCertificate = (courseId: string, courseTitle: string, grade = 'Outstanding (A+)'): CertificateItem => {
    const credId = `VED-2025-${Math.floor(100000 + Math.random() * 900000)}`;
    const hash = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      studentName: currentUser.name,
      studentId: currentUser.id,
      courseId,
      courseTitle,
      completionDate: today,
      grade,
      credentialId: credId,
      instructorName: 'Academic Board & Senior Mentors',
      academyLogo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
      authorizedSignature: 'Prof. R. C. Verma, Dean of Academics',
      verificationHash: hash,
      qrCodeData: `https://dcmaxwell.academy/verify?cert=${credId}&hash=${hash}`,
      skillsEarned: ['Core Concepts Mastery', 'Advanced Problem Solving', 'Speed Assessment & Accuracy', 'Conceptual Rigor'],
      issuedBy: 'DC Maxwell Academy National Board of Examiners'
    };

    setCertificates(prev => [newCert, ...prev]);
    
    const notif: PlatformNotification = {
      id: `notif-${Date.now()}`,
      title: 'Digital Certificate Issued! 🎓',
      message: `Congratulations! Your certificate for "${courseTitle}" is ready for download & verification.`,
      type: 'achievement',
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);

    return newCert;
  };

  const markLessonComplete = (lessonId: string) => {
    setCurrentUser(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId]
      };
    });
  };

  const submitTestAttempt = (result: TestAttemptResult) => {
    setTestResults(prev => [result, ...prev]);
    setActiveTestResult(result);
    
    // Also trigger certificate check if eligible
    if (result.percentage >= 60) {
      const newCert: CertificateItem = {
        id: `cert-${Date.now()}`,
        studentName: currentUser.name,
        courseTitle: `${result.testTitle} - Benchmark Assessment`,
        completionDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        grade: result.percentage >= 85 ? 'Outstanding (A+)' : 'Proficient (A)',
        credentialId: `VED-${Math.floor(100000 + Math.random() * 900000)}`,
        instructorName: 'Academic Examination Board'
      };
      setCertificates(prev => [newCert, ...prev]);
    }
  };

  const submitDoubt = (subject: string, courseTitle: string, questionText: string, imageUrl?: string) => {
    const newDoubt: DoubtItem = {
      id: `dbt-${Date.now()}`,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      studentId: currentUser.id,
      courseTitle,
      subject,
      questionText,
      imageUrl,
      status: 'unresolved',
      createdAt: 'Just now',
      aiSuggestion: 'Generating step-by-step mathematical derivation...'
    };
    setDoubts(prev => [newDoubt, ...prev]);
  };

  const submitAssignment = (assignmentId: string, fileName: string, notes?: string) => {
    setAssignments(prev => prev.map(asn => {
      if (asn.id === assignmentId) {
        return {
          ...asn,
          submissionStatus: 'submitted',
          studentSubmission: {
            submittedAt: 'Just now',
            fileName,
            fileSize: '1.8 MB',
            notes
          }
        };
      }
      return asn;
    }));
  };

  const addCourse = (course: Course) => {
    setCourses(prev => [course, ...prev]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const duplicateCourse = (courseId: string) => {
    const original = courses.find(c => c.id === courseId);
    if (!original) return;

    const cloned: Course = {
      ...original,
      id: `crs-${Date.now()}`,
      title: `${original.title} (Clone / Batch ${new Date().getFullYear()})`,
      enrolledCount: 0,
      isPublished: false,
      status: 'draft',
      startDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setCourses(prev => [cloned, ...prev]);
  };

  const togglePublishCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const newStatus = c.status === 'draft' ? 'published' : 'draft';
        const isPub = newStatus === 'published';
        return {
          ...c,
          status: newStatus,
          isPublished: isPub
        };
      }
      return c;
    }));
  };

  const assignFacultyToCourse = (courseId: string, facultyName: string, facultyDesignation?: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          facultyName,
          facultyDesignation: facultyDesignation || c.facultyDesignation
        };
      }
      return c;
    }));
  };

  const assignBatchToCourse = (courseId: string, batchName: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, batchName };
      }
      return c;
    }));
  };

  const setCoursePricing = (courseId: string, price: number, originalPrice: number) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
        return {
          ...c,
          price,
          originalPrice,
          discountPercentage: discount
        };
      }
      return c;
    }));
  };

  const setCourseValidity = (courseId: string, validity: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, validity };
      }
      return c;
    }));
  };

  const addLessonToCourse = (courseId: string, chapterId: string, lesson: Lesson) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const chapterExists = c.chapters?.some(ch => ch.id === chapterId);
      
      if (!chapterExists && c.chapters?.length > 0) {
        // Add to first chapter
        return {
          ...c,
          chapters: c.chapters.map((ch, idx) => idx === 0 ? { ...ch, lessons: [...ch.lessons, lesson] } : ch)
        };
      } else if (!chapterExists) {
        // Create new chapter
        const newChap: Chapter = {
          id: chapterId || `chap-${Date.now()}`,
          subject: c.category || 'General',
          title: 'Core Masterclass Lectures',
          lessons: [lesson]
        };
        return {
          ...c,
          chapters: [newChap]
        };
      }

      return {
        ...c,
        chapters: c.chapters.map(ch => ch.id === chapterId ? { ...ch, lessons: [...ch.lessons, lesson] } : ch)
      };
    }));
  };

  const addQuestionToBank = (question: Question) => {
    setQuestionBank(prev => [question, ...prev]);
  };

  const deleteQuestionFromBank = (questionId: string) => {
    setQuestionBank(prev => prev.filter(q => q.id !== questionId));
  };

  const createTestSeries = (test: TestSeriesExam) => {
    setTestSeries(prev => [test, ...prev]);
  };

  const updateTestSeries = (test: TestSeriesExam) => {
    setTestSeries(prev => prev.map(t => t.id === test.id ? test : t));
  };

  const deleteTestSeries = (testId: string) => {
    setTestSeries(prev => prev.filter(t => t.id !== testId));
  };

  // Assignments Handlers
  const addAssignment = (assignment: AssignmentItem) => {
    setAssignments(prev => [assignment, ...prev]);
  };

  const updateAssignment = (assignment: AssignmentItem) => {
    setAssignments(prev => prev.map(a => a.id === assignment.id ? assignment : a));
  };

  const deleteAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
  };

  // Content Management System (CMS) Handlers
  const addAdminVideo = (video: AdminVideoItem) => {
    setAdminVideos(prev => [video, ...prev]);
  };

  const updateAdminVideo = (video: AdminVideoItem) => {
    setAdminVideos(prev => prev.map(v => v.id === video.id ? video : v));
  };

  const deleteAdminVideo = (id: string) => {
    setAdminVideos(prev => prev.filter(v => v.id !== id));
  };

  const addAdminPdf = (pdf: AdminPdfItem) => {
    setAdminPdfs(prev => [pdf, ...prev]);
  };

  const updateAdminPdf = (pdf: AdminPdfItem) => {
    setAdminPdfs(prev => prev.map(p => p.id === pdf.id ? pdf : p));
  };

  const deleteAdminPdf = (id: string) => {
    setAdminPdfs(prev => prev.filter(p => p.id !== id));
  };

  const addAdminNotes = (notes: AdminNotesItem) => {
    setAdminNotes(prev => [notes, ...prev]);
  };

  const updateAdminNotes = (notes: AdminNotesItem) => {
    setAdminNotes(prev => prev.map(n => n.id === notes.id ? notes : n));
  };

  const deleteAdminNotes = (id: string) => {
    setAdminNotes(prev => prev.filter(n => n.id !== id));
  };

  const addAdminAnnouncement = (announcement: AdminAnnouncementItem) => {
    setAdminAnnouncements(prev => [announcement, ...prev]);
  };

  const updateAdminAnnouncement = (announcement: AdminAnnouncementItem) => {
    setAdminAnnouncements(prev => prev.map(a => a.id === announcement.id ? announcement : a));
  };

  const deleteAdminAnnouncement = (id: string) => {
    setAdminAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const addAdminBlog = (blog: AdminBlogItem) => {
    setAdminBlogs(prev => [blog, ...prev]);
  };

  const updateAdminBlog = (blog: AdminBlogItem) => {
    setAdminBlogs(prev => prev.map(b => b.id === blog.id ? blog : b));
  };

  const deleteAdminBlog = (id: string) => {
    setAdminBlogs(prev => prev.filter(b => b.id !== id));
  };

  const addAdminBanner = (banner: AdminBannerItem) => {
    setAdminBanners(prev => [banner, ...prev]);
  };

  const updateAdminBanner = (banner: AdminBannerItem) => {
    setAdminBanners(prev => prev.map(b => b.id === banner.id ? banner : b));
  };

  const deleteAdminBanner = (id: string) => {
    setAdminBanners(prev => prev.filter(b => b.id !== id));
  };

  const addAdminFaq = (faq: AdminFaqItem) => {
    setAdminFaqs(prev => [faq, ...prev]);
  };

  const updateAdminFaq = (faq: AdminFaqItem) => {
    setAdminFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
  };

  const deleteAdminFaq = (id: string) => {
    setAdminFaqs(prev => prev.filter(f => f.id !== id));
  };

  const scheduleLiveClass = (liveClass: LiveClass) => {
    setLiveClasses(prev => [liveClass, ...prev]);
  };

  const updateLiveClassStatus = (liveClassId: string, status: 'upcoming' | 'live' | 'completed') => {
    setLiveClasses(prev => prev.map(lc => {
      if (lc.id === liveClassId) {
        const updated = { ...lc, status };
        if (status === 'completed' && !lc.isRecordingPublished) {
          // Auto-publish or prepare recording
          publishLiveRecording(liveClassId, lc.streamUrl);
        }
        return updated;
      }
      return lc;
    }));
  };

  const deleteLiveClass = (liveClassId: string) => {
    setLiveClasses(prev => prev.filter(lc => lc.id !== liveClassId));
  };

  const publishLiveRecording = (liveClassId: string, recordingUrl?: string) => {
    const targetClass = liveClasses.find(lc => lc.id === liveClassId);
    if (!targetClass) return;

    const recordedItem: LiveClass = {
      ...targetClass,
      status: 'completed',
      recordingUrl: recordingUrl || targetClass.streamUrl,
      recordingDurationMinutes: targetClass.durationMinutes,
      isRecordingPublished: true
    };

    setLiveRecordings(prev => {
      const exists = prev.some(r => r.id === targetClass.id || r.id === `rec-${targetClass.id}`);
      if (exists) {
        return prev.map(r => r.id === targetClass.id ? recordedItem : r);
      }
      return [recordedItem, ...prev];
    });

    setLiveClasses(prev => prev.map(lc => lc.id === liveClassId ? { ...lc, isRecordingPublished: true, status: 'completed' } : lc));
  };

  const recordStudentAttendance = (record: LiveClassAttendanceRecord) => {
    setAttendanceRecords(prev => {
      const existingIdx = prev.findIndex(r => r.liveClassId === record.liveClassId && r.studentId === record.studentId);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = record;
        return copy;
      }
      return [record, ...prev];
    });
  };

  const scheduleLiveReminder = (reminder: LiveClassReminder) => {
    setLiveReminders(prev => [reminder, ...prev]);
  };

  const triggerReminderSimulation = (reminderId: string) => {
    setLiveReminders(prev => prev.map(r => {
      if (r.id === reminderId) {
        return {
          ...r,
          status: 'sent',
          sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
      }
      return r;
    }));
    
    // Add to notifications
    const rem = liveReminders.find(r => r.id === reminderId);
    if (rem) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `🔔 Live Class Alert: ${rem.liveClassTitle}`,
          message: `${rem.messageText} (Dispatched via ${rem.channels.join(', ').toUpperCase()})`,
          type: 'live_class',
          timestamp: 'Just now',
          read: false
        },
        ...prev
      ]);
    }
  };

  const toggleLessonFreeStatus = (courseId: string, chapterId: string, lessonId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        chapters: c.chapters.map(ch => {
          if (ch.id !== chapterId) return ch;
          return {
            ...ch,
            lessons: ch.lessons.map(les => {
              if (les.id !== lessonId) return les;
              return { ...les, isFreePreview: !les.isFreePreview };
            })
          };
        })
      };
    }));
  };

  const addLead = (lead: LeadItem) => {
    setLeads(prev => [lead, ...prev]);
  };

  const updateLeadStage = (leadId: string, newStage: LeadItem['stage'], note?: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          stage: newStage,
          lastFollowUp: 'Just now',
          notes: note ? [note, ...lead.notes] : lead.notes
        };
      }
      return lead;
    }));
  };

  const updateLeadDetails = (leadId: string, updates: Partial<LeadItem>) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          ...updates,
          lastFollowUp: 'Just now'
        };
      }
      return lead;
    }));
  };

  // Academic Batch Management
  const addBatch = (batch: AcademicBatch) => {
    setBatches(prev => [batch, ...prev]);
  };

  const updateBatch = (updated: AcademicBatch) => {
    setBatches(prev => prev.map(b => b.id === updated.id ? updated : b));
  };

  const deleteBatch = (batchId: string) => {
    setBatches(prev => prev.filter(b => b.id !== batchId));
  };

  const addStudentToBatch = (batchId: string, student: BatchStudent) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        if (b.students.some(s => s.id === student.id || s.enrollmentNo === student.enrollmentNo)) {
          return b;
        }
        return {
          ...b,
          students: [student, ...b.students]
        };
      }
      return b;
    }));
  };

  const removeStudentFromBatch = (batchId: string, studentId: string) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          students: b.students.filter(s => s.id !== studentId)
        };
      }
      return b;
    }));
  };

  const addFacultyToBatch = (batchId: string, faculty: BatchFaculty) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        if (b.faculty.some(f => f.id === faculty.id)) return b;
        return {
          ...b,
          faculty: [...b.faculty, faculty]
        };
      }
      return b;
    }));
  };

  const removeFacultyFromBatch = (batchId: string, facultyId: string) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          faculty: b.faculty.filter(f => f.id !== facultyId)
        };
      }
      return b;
    }));
  };

  const addVideoToBatch = (batchId: string, video: BatchVideo) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          videos: [video, ...b.videos]
        };
      }
      return b;
    }));
  };

  const addTestToBatch = (batchId: string, test: BatchTest) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          tests: [test, ...b.tests]
        };
      }
      return b;
    }));
  };

  const addMaterialToBatch = (batchId: string, material: BatchStudyMaterial) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          studyMaterial: [material, ...b.studyMaterial]
        };
      }
      return b;
    }));
  };

  // Support Ticket System
  const createTicket = (ticketData: {
    category: TicketCategory;
    subject: string;
    description: string;
    priority: TicketPriority;
    relatedCourse?: string;
    studentName?: string;
    studentEmail?: string;
    studentPhone?: string;
  }): SupportTicket => {
    const ticketId = `tkt-${Date.now()}`;
    const ticketNum = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentName = ticketData.studentName || currentUser.name || 'Enrolled Student';
    const newTicket: SupportTicket = {
      id: ticketId,
      ticketNumber: ticketNum,
      studentId: currentUser.id || 'usr-student-01',
      studentName,
      studentEmail: ticketData.studentEmail || currentUser.email || 'student@dcmaxwell.edu',
      studentPhone: ticketData.studentPhone || currentUser.phone || '+91 98765 43210',
      category: ticketData.category,
      subject: ticketData.subject,
      description: ticketData.description,
      priority: ticketData.priority,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      relatedCourse: ticketData.relatedCourse,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: studentName,
          senderRole: 'student',
          message: ticketData.description,
          createdAt: new Date().toISOString()
        }
      ]
    };
    setSupportTickets(prev => [newTicket, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `🎫 Support Ticket Created: #${ticketNum}`,
        message: `Your ticket for "${ticketData.category} - ${ticketData.subject.slice(0, 45)}..." has been logged. Our helpdesk team will respond shortly.`,
        type: 'doubt',
        timestamp: 'Just now',
        read: false
      },
      ...prev
    ]);

    return newTicket;
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus, resolutionNotes?: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status,
          resolutionNotes: resolutionNotes !== undefined ? resolutionNotes : t.resolutionNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
  };

  const replyToTicket = (ticketId: string, message: string, senderRole: 'student' | 'admin' | 'support' = 'student', senderName?: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMsg: TicketMessage = {
          id: `msg-${Date.now()}`,
          senderName: senderName || (senderRole === 'student' ? currentUser.name : 'DC Maxwell Support Desk'),
          senderRole,
          message,
          createdAt: new Date().toISOString()
        };
        return {
          ...t,
          updatedAt: new Date().toISOString(),
          status: senderRole === 'student' && t.status === 'Resolved' ? 'In Progress' : t.status,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));
  };

  const assignTicketAgent = (ticketId: string, agentName: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          assignedAgent: agentName,
          status: t.status === 'Open' ? 'In Progress' : t.status,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
  };

  const resolveDoubt = (doubtId: string, replyText: string, formula?: string) => {
    setDoubts(prev => prev.map(dbt => {
      if (dbt.id === doubtId) {
        return {
          ...dbt,
          status: 'answered',
          facultyReply: {
            facultyName: currentUser.name || 'Faculty Member',
            facultyAvatar: currentUser.avatar,
            repliedAt: 'Just now',
            text: replyText,
            formulaOrExplanation: formula
          }
        };
      }
      return dbt;
    }));
  };

  const answerDoubt = (doubtId: string, facultyName: string, facultyAvatar: string, replyText: string, formula?: string) => {
    setDoubts(prev => prev.map(dbt => {
      if (dbt.id === doubtId) {
        return {
          ...dbt,
          status: 'answered',
          facultyReply: {
            facultyName: facultyName || currentUser.name || 'Faculty Member',
            facultyAvatar: facultyAvatar || currentUser.avatar,
            repliedAt: 'Just now',
            text: replyText,
            formulaOrExplanation: formula
          }
        };
      }
      return dbt;
    }));
  };

  const gradeAssignment = (assignmentId: string, score: number, feedback: string) => {
    setAssignments(prev => prev.map(asn => {
      if (asn.id === assignmentId && asn.studentSubmission) {
        return {
          ...asn,
          submissionStatus: 'graded',
          studentSubmission: {
            ...asn.studentSubmission,
            score,
            facultyFeedback: feedback
          }
        };
      }
      return asn;
    }));
  };

  // -------------------------------------------------------------
  // 4. WISHLIST & REMARKETING ENGINE
  // -------------------------------------------------------------
  const isInWishlist = (courseId: string): boolean => {
    return !!(currentUser.wishlistCourseIds && currentUser.wishlistCourseIds.includes(courseId));
  };

  const toggleWishlist = (courseId: string) => {
    const isSaved = isInWishlist(courseId);
    const targetCourse = courses.find(c => c.id === courseId);
    const targetProduct = storeProducts.find(p => p.id === courseId || p.courseId === courseId);
    const targetCombo = comboPackages.find(cb => cb.id === courseId);

    const title = targetCourse?.title || targetProduct?.title || targetCombo?.title || 'Educational Program';
    const price = targetCourse?.price || targetProduct?.price || targetCombo?.bundlePrice || 4999;

    if (isSaved) {
      // Remove from user wishlist
      setCurrentUser(prev => ({
        ...prev,
        wishlistCourseIds: (prev.wishlistCourseIds || []).filter(id => id !== courseId)
      }));

      // Update lead status
      setWishlistLeads(prev => prev.map(lead => {
        if (lead.studentId === currentUser.id && lead.courseId === courseId) {
          return { ...lead, status: 'dropped' };
        }
        return lead;
      }));
    } else {
      // Add to user wishlist
      setCurrentUser(prev => ({
        ...prev,
        wishlistCourseIds: [...(prev.wishlistCourseIds || []), courseId]
      }));

      // Create or reactivate CRM Wishlist Lead for Admin remarketing
      const newLead: WishlistLead = {
        id: `wlead-${Date.now()}`,
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        studentPhone: currentUser.phone || '+91 98765 43210',
        courseId,
        courseTitle: title,
        coursePrice: price,
        addedDate: new Date().toISOString().split('T')[0],
        status: 'active_in_wishlist',
        remarketingCount: 0
      };

      setWishlistLeads(prev => {
        const filtered = prev.filter(l => !(l.studentId === currentUser.id && l.courseId === courseId));
        return [newLead, ...filtered];
      });

      // Send confirmation notification to student
      const notif: PlatformNotification = {
        id: `notif-${Date.now()}`,
        title: '❤️ Added to Your Wishlist',
        message: `"${title}" has been saved to your wishlist. We'll alert you if any special scholarship discount drops!`,
        type: 'offers',
        category: 'offers',
        time: 'Just now',
        read: false,
        actionTarget: 'store'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const sendRemarketingCampaign = (campaignData: Omit<RemarketingCampaign, 'id' | 'sentDate' | 'status' | 'clicksCount' | 'conversionsCount' | 'revenueGenerated'>) => {
    const newCampId = `camp-${Date.now()}`;
    const todayFormatted = new Date().toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newCampaign: RemarketingCampaign = {
      ...campaignData,
      id: newCampId,
      sentDate: todayFormatted,
      status: 'sent',
      clicksCount: Math.round(campaignData.recipientsCount * 0.78),
      conversionsCount: Math.max(1, Math.round(campaignData.recipientsCount * 0.22)),
      revenueGenerated: Math.round(campaignData.recipientsCount * 0.22 * 7500)
    };

    setRemarketingCampaigns(prev => [newCampaign, ...prev]);

    // Update targeted leads status
    setWishlistLeads(prev => prev.map(lead => {
      if (lead.courseId === campaignData.targetCourseId && lead.status === 'active_in_wishlist') {
        return {
          ...lead,
          status: 'remarketed',
          remarketingCount: lead.remarketingCount + 1,
          lastRemarketedDate: new Date().toISOString().split('T')[0],
          lastPromoSent: `${campaignData.couponCode} (${campaignData.discountPercentage}% Off)`
        };
      }
      return lead;
    }));

    // Broadcast push notification to student app if user wishlisted this item
    const isStudentTargeted = currentUser.wishlistCourseIds?.includes(campaignData.targetCourseId);
    if (isStudentTargeted || campaignData.recipientsCount > 0) {
      const blastNotif: PlatformNotification = {
        id: `notif-${Date.now()}`,
        title: `🔥 Exclusive ${campaignData.discountPercentage}% Off on "${campaignData.targetCourseTitle}"!`,
        message: campaignData.customMessage || `Special scholarship voucher ${campaignData.couponCode} is now active for items in your wishlist. Valid for limited hours!`,
        type: 'offers',
        category: 'offers',
        time: 'Just now',
        read: false,
        actionTarget: 'store'
      };
      setNotifications(prev => [blastNotif, ...prev]);
    }
  };

  // -------------------------------------------------------------
  // 5. NOTIFICATION DISPATCH ENGINE (12 Categories)
  // -------------------------------------------------------------
  const sendBroadcastNotification = (notifData: Omit<PlatformNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: PlatformNotification = {
      ...notifData,
      id: `notif-${Date.now()}`,
      time: 'Just now',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // -------------------------------------------------------------
  // 6. GLOBAL SEARCH ENGINE (Courses, Subjects, Videos, Faculty, Test Series, Study Material, Chapters)
  // -------------------------------------------------------------
  const performGlobalSearch = (query: string, categoryFilter: GlobalSearchCategory = 'all'): GlobalSearchResult[] => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return [];

    const results: GlobalSearchResult[] = [];

    // 1. Search Courses
    if (categoryFilter === 'all' || categoryFilter === 'courses') {
      courses.forEach(course => {
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchTagline = course.tagline?.toLowerCase().includes(q);
        const matchCat = course.category.toLowerCase().includes(q);
        const matchExam = course.targetExam?.toLowerCase().includes(q);
        const matchFaculty = course.facultyName?.toLowerCase().includes(q);

        if (matchTitle || matchTagline || matchCat || matchExam || matchFaculty) {
          results.push({
            id: `search-course-${course.id}`,
            title: course.title,
            subtitle: `${course.category} • ${course.facultyName || 'Master Faculty'}`,
            category: 'courses',
            categoryLabel: 'Course',
            description: course.tagline || course.description?.slice(0, 120),
            tag: course.format || 'Full Course',
            rating: course.rating,
            price: course.price,
            thumbnail: course.thumbnail,
            actionType: 'open_course',
            payload: { course }
          });
        }
      });
    }

    // 2. Search Subjects
    if (categoryFilter === 'all' || categoryFilter === 'subjects') {
      const subjectPool = [
        { name: 'Physics & Mechanics', category: 'JEE (Main & Adv)', desc: 'Electrostatics, Optics, Mechanics, Modern Physics & Thermodynamics' },
        { name: 'Physical & Organic Chemistry', category: 'JEE (Main & Adv)', desc: 'Reaction Mechanisms, Equilibrium, Coordination Compounds, GOC' },
        { name: 'Mathematics & Calculus', category: 'JEE (Main & Adv)', desc: 'Vectors, Differential Equations, Matrices, Probability & Trigonometry' },
        { name: 'Botany & Plant Physiology', category: 'NEET Medical', desc: 'Cell Biology, Genetics, Plant Kingdom & Ecology' },
        { name: 'Zoology & Human Physiology', category: 'NEET Medical', desc: 'Human Physiology, Biotechnology, Evolution & Animal Kingdom' },
        { name: 'Financial Accounting', category: 'Commerce & CA', desc: 'Partnership Accounts, Corporate Financial Reporting, AS/Ind AS' },
        { name: 'Corporate & Economic Laws', category: 'Commerce & CA', desc: 'Companies Act 2013, FEMA, SEBI Regulations, Insolvency Code' },
        { name: 'Direct & Indirect Taxation', category: 'Commerce & CA', desc: 'Income Tax Assessment, Capital Gains, GST & Customs Act' },
        { name: 'Cost & Management Accounting', category: 'Commerce & CA', desc: 'Standard Costing, Marginal Costing, Budgetary Control & Activity Based Costing' },
        { name: 'Auditing & Assurance Standards', category: 'Commerce & CA', desc: 'SA Standards on Auditing, Professional Ethics, Internal Audit' },
        { name: 'Quantitative Aptitude & Reasoning', category: 'CUET & General', desc: 'Arithmetic, Logical Reasoning, Data Interpretation & Verbal Ability' }
      ];

      subjectPool.forEach(sub => {
        if (sub.name.toLowerCase().includes(q) || sub.desc.toLowerCase().includes(q) || sub.category.toLowerCase().includes(q)) {
          results.push({
            id: `search-subj-${sub.name}`,
            title: sub.name,
            subtitle: sub.category,
            category: 'subjects',
            categoryLabel: 'Subject',
            description: sub.desc,
            tag: 'Subject Curriculum',
            actionType: 'open_subject',
            payload: { subjectName: sub.name, category: sub.category }
          });
        }
      });
    }

    // 3. Search Videos (individual lessons inside all courses)
    if (categoryFilter === 'all' || categoryFilter === 'videos') {
      courses.forEach(course => {
        course.chapters?.forEach(chap => {
          chap.lessons?.forEach(lesson => {
            const matchLessonTitle = lesson.title.toLowerCase().includes(q);
            const matchChapTitle = chap.title.toLowerCase().includes(q);

            if (matchLessonTitle || matchChapTitle) {
              results.push({
                id: `search-vid-${lesson.id}`,
                title: lesson.title,
                subtitle: `${course.title} › ${chap.title}`,
                category: 'videos',
                categoryLabel: 'Video Lecture',
                description: `${lesson.duration} lecture by ${course.facultyName || 'Master Faculty'}. ${lesson.isFreePreview ? '✨ Free Preview Available' : '🔒 Batch Enrolled'}`,
                tag: lesson.isFreePreview ? 'Free Preview' : 'Recorded Lesson',
                duration: lesson.duration,
                thumbnail: course.thumbnail,
                actionType: 'open_video',
                payload: { course, lesson }
              });
            }
          });
        });
      });
    }

    // 4. Search Faculty
    if (categoryFilter === 'all' || categoryFilter === 'faculty') {
      const facultyList = [
        {
          name: 'Er. Rajeshwar Varma',
          designation: 'Senior Master Faculty - Physics & Mechanics',
          bio: 'IIT Delhi Alumnus, 18+ Yrs Exp in JEE Advanced Physics. Mentored Top 10 AIRs.',
          rating: 4.95,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          subjects: ['Physics', 'Mechanics', 'Electrostatics']
        },
        {
          name: 'Dr. Alok Verma',
          designation: 'Dean of Sciences & Master Chemistry Faculty',
          bio: 'Ph.D Organic Chemistry (BHU), 16+ Yrs Exp. Renowned for visual reaction mechanisms.',
          rating: 4.94,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          subjects: ['Organic Chemistry', 'Physical Chemistry', 'Coordination']
        },
        {
          name: 'Dr. Vandana Swaminathan',
          designation: 'Senior Professor - Botany & Cell Biology',
          bio: 'AIIMS Alumna, 15+ Yrs Exp in NEET Medical coaching. Author of 3 National Ranker Guides.',
          rating: 4.97,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
          subjects: ['Botany', 'Genetics', 'Ecology']
        },
        {
          name: 'CA Rajiv Singhania',
          designation: 'FCA, Senior Partner & Corporate Law Guru',
          bio: 'Ranker Chartered Accountant, 14+ Yrs teaching CA Final & Inter Corporate Laws.',
          rating: 4.92,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          subjects: ['Corporate Law', 'Ind AS', 'Taxation']
        },
        {
          name: 'Prof. Meenakshi Sundaram',
          designation: 'Head of Mathematics & Calculus Division',
          bio: 'Gold Medalist ISI Kolkata, 20+ Yrs Exp. Specialist in Probability, Calculus & Matrices.',
          rating: 4.96,
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
          subjects: ['Calculus', 'Vectors', 'Linear Algebra']
        }
      ];

      facultyList.forEach(fac => {
        if (fac.name.toLowerCase().includes(q) || fac.designation.toLowerCase().includes(q) || fac.bio.toLowerCase().includes(q) || fac.subjects.some(s => s.toLowerCase().includes(q))) {
          results.push({
            id: `search-fac-${fac.name}`,
            title: fac.name,
            subtitle: fac.designation,
            category: 'faculty',
            categoryLabel: 'Faculty Mentor',
            description: fac.bio,
            tag: `${fac.subjects.join(', ')}`,
            rating: fac.rating,
            thumbnail: fac.avatar,
            actionType: 'open_faculty',
            payload: { faculty: fac }
          });
        }
      });
    }

    // 5. Search Test Series
    if (categoryFilter === 'all' || categoryFilter === 'test_series') {
      testSeries.forEach(test => {
        const matchTitle = test.title.toLowerCase().includes(q);
        const matchCat = test.category?.toLowerCase().includes(q);
        const matchSubj = test.subjectName?.toLowerCase().includes(q);
        const matchExam = test.targetExam?.toLowerCase().includes(q);

        if (matchTitle || matchCat || matchSubj || matchExam) {
          results.push({
            id: `search-test-${test.id}`,
            title: test.title,
            subtitle: `${test.category} • ${test.durationMinutes} Mins • ${test.totalMarks} Marks`,
            category: 'test_series',
            categoryLabel: 'CBT Mock Test',
            description: test.syllabusCovered || `${test.attemptsCount || 2400}+ students have attempted this CBT Benchmark Test.`,
            tag: test.isFree ? 'Free Test' : `₹${test.price || 499}`,
            actionType: 'open_test',
            payload: { test }
          });
        }
      });
    }

    // 6. Search Study Material
    if (categoryFilter === 'all' || categoryFilter === 'study_material') {
      studyMaterials.forEach(mat => {
        const matchTitle = mat.title.toLowerCase().includes(q);
        const matchSubj = mat.subject?.toLowerCase().includes(q);
        const matchType = mat.type?.toLowerCase().includes(q);
        const matchAuthor = mat.authorFaculty?.toLowerCase().includes(q);

        if (matchTitle || matchSubj || matchType || matchAuthor) {
          results.push({
            id: `search-mat-${mat.id}`,
            title: mat.title,
            subtitle: `${mat.subject} • ${mat.type} (${mat.pagesCount} Pages, ${mat.fileSize})`,
            category: 'study_material',
            categoryLabel: 'Study Material',
            description: `Authored by ${mat.authorFaculty}. Downloaded ${mat.downloadsCount.toLocaleString('en-IN')} times.`,
            tag: mat.isFree ? 'Free Download' : 'Enrolled Vault',
            actionType: 'open_material',
            payload: { material: mat }
          });
        }
      });
    }

    // 7. Search Chapters
    if (categoryFilter === 'all' || categoryFilter === 'chapters') {
      courses.forEach(course => {
        course.chapters?.forEach((chap, idx) => {
          if (chap.title.toLowerCase().includes(q) || (chap.description && chap.description.toLowerCase().includes(q))) {
            results.push({
              id: `search-chap-${course.id}-${chap.id}`,
              title: chap.title,
              subtitle: `Chapter ${idx + 1} of ${course.title}`,
              category: 'chapters',
              categoryLabel: 'Chapter Syllabus',
              description: `Contains ${chap.lessons.length} video lessons & curated practice DPP sheets.`,
              tag: `${chap.lessons.length} Lessons`,
              thumbnail: course.thumbnail,
              actionType: 'open_chapter',
              payload: { course, chapter: chap }
            });
          }
        });
      });
    }

    return results;
  };

  const handleGlobalSearchResultClick = (result: GlobalSearchResult) => {
    setIsGlobalSearchOpen(false);

    switch (result.actionType) {
      case 'open_course':
        if (result.payload?.course) {
          setSelectedCourseForDetail(result.payload.course);
          setView('student_portal');
        }
        break;
      case 'open_video':
        if (result.payload?.course && result.payload?.lesson) {
          setActiveVideoLesson({ course: result.payload.course, lesson: result.payload.lesson });
          setView('student_portal');
        }
        break;
      case 'open_test':
        if (result.payload?.test) {
          setActiveTest(result.payload.test);
          setView('student_portal');
        }
        break;
      case 'open_material':
        setView('student_portal');
        break;
      case 'open_faculty':
      case 'open_subject':
      case 'open_chapter':
        if (result.payload?.course) {
          setSelectedCourseForDetail(result.payload.course);
        }
        setView('student_portal');
        break;
      default:
        setView('student_portal');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setView,
        currentRole,
        setRole,
        currentUser,
        setCurrentUser,
        allUsers,
        switchRoleAndNavigate,
        courses,
        setCourses,
        storeProducts,
        setStoreProducts,
        orders,
        setOrders,
        invoices,
        setInvoices,
        liveClasses,
        setLiveClasses,
        liveRecordings,
        setLiveRecordings,
        attendanceRecords,
        setAttendanceRecords,
        liveReminders,
        setLiveReminders,
        questionBank,
        setQuestionBank,
        testSeries,
        setTestSeries,
        testResults,
        studyMaterials,
        setStudyMaterials,
        uploadStudyMaterial,
        updateStudyMaterial,
        deleteStudyMaterial,
        doubts,
        assignments,
        leads,
        certificates,
        notifications,
        cart,
        coupons,
        setCoupons,
        validateCoupon,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        toggleCouponStatus,
        comboPackages,
        setComboPackages,
        addComboPackage,
        updateComboPackage,
        deleteComboPackage,
        subscriptionPlans,
        setSubscriptionPlans,
        subscribeToPlan,
        cancelSubscription,
        wishlistLeads,
        setWishlistLeads,
        remarketingCampaigns,
        setRemarketingCampaigns,
        toggleWishlist,
        isInWishlist,
        sendRemarketingCampaign,
        selectedCourseForDetail,
        setSelectedCourseForDetail,
        activeLiveClass,
        setActiveLiveClass,
        activeTest,
        setActiveTest,
        activeTestResult,
        setActiveTestResult,
        activeVideoLesson,
        setActiveVideoLesson,
        selectedInvoice,
        setSelectedInvoice,
        selectedCertificate,
        setSelectedCertificate,
        isVerificationModalOpen,
        setIsVerificationModalOpen,
        setIsVerifyModalOpen: setIsVerificationModalOpen,
        addToCart,
        removeFromCart,
        clearCart,
        enrollInCourse,
        completeCheckout,
        markLessonComplete,
        updateOrderStatus,
        issueOrderRefund,
        verifyCertificateCode,
        claimCertificate,
        submitTestAttempt,
        submitDoubt,
        submitAssignment,
        addCourse,
        updateCourse,
        deleteCourse,
        duplicateCourse,
        togglePublishCourse,
        assignFacultyToCourse,
        assignBatchToCourse,
        setCoursePricing,
        setCourseValidity,
        addLessonToCourse,
        addQuestionToBank,
        deleteQuestionFromBank,
        createTestSeries,
        updateTestSeries,
        deleteTestSeries,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        adminVideos,
        setAdminVideos,
        addAdminVideo,
        updateAdminVideo,
        deleteAdminVideo,
        adminPdfs,
        setAdminPdfs,
        addAdminPdf,
        updateAdminPdf,
        deleteAdminPdf,
        adminNotes,
        setAdminNotes,
        addAdminNotes,
        updateAdminNotes,
        deleteAdminNotes,
        adminAnnouncements,
        setAdminAnnouncements,
        addAdminAnnouncement,
        updateAdminAnnouncement,
        deleteAdminAnnouncement,
        adminBlogs,
        setAdminBlogs,
        addAdminBlog,
        updateAdminBlog,
        deleteAdminBlog,
        adminBanners,
        setAdminBanners,
        addAdminBanner,
        updateAdminBanner,
        deleteAdminBanner,
        adminFaqs,
        setAdminFaqs,
        addAdminFaq,
        updateAdminFaq,
        deleteAdminFaq,
        scheduleLiveClass,
        updateLiveClassStatus,
        deleteLiveClass,
        publishLiveRecording,
        recordStudentAttendance,
        scheduleLiveReminder,
        triggerReminderSimulation,
        toggleLessonFreeStatus,
        addLead,
        updateLeadStage,
        updateLeadDetails,
        batches,
        setBatches,
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
        supportTickets,
        setSupportTickets,
        createTicket,
        updateTicketStatus,
        replyToTicket,
        assignTicketAgent,
        resolveDoubt,
        answerDoubt,
        gradeAssignment,
        sendBroadcastNotification,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        performGlobalSearch,
        handleGlobalSearchResultClick,
        isCartOpen,
        setIsCartOpen,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        registerStudent,
        loginStudent,
        logoutStudent,
        mobileDevicePlatform,
        setMobileDevicePlatform
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
