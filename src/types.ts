export type UserRole = 
  | 'student' 
  | 'super_admin' 
  | 'admin' 
  | 'content_manager' 
  | 'exam_manager' 
  | 'faculty' 
  | 'counsellor';

export type AppPlatformView = 
  | 'website' 
  | 'student_portal' 
  | 'mobile_app' 
  | 'admin_panel' 
  | 'faculty_panel' 
  | 'counsellor_panel' 
  | 'content_panel' 
  | 'exam_panel';

export type CourseCategory = 
  | 'JEE (Main & Adv)' 
  | 'NEET (Medical)' 
  | 'UPSC & Civil Services' 
  | 'CA & Commerce (Foundation/Inter)'
  | 'Class 11-12 Boards' 
  | 'Foundation (9-10th)' 
  | 'Tech & Data Science';

export type CourseFormat = 'Comprehensive Live' | 'Recorded Mastery' | 'Test Series Only' | 'Combo Pack' | 'Free Crash Course' | 'Video Course Package';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  duration?: string;
  videoUrl: string;
  videoThumbnail?: string;
  isFreePreview: boolean;
  notesPdfUrl?: string;
  notesPdfTitle?: string;
  summary: string;
  timestamps: { time: string; label: string }[];
  hlsStreamToken?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  subject: string;
  lessons: Lesson[];
}

export interface CoursePackageDeliverables {
  subjects: string[];
  recordedLecturesCount: number;
  testSeriesCount: number;
  studyNotesCount: number;
  doubtSupport: boolean;
  hardcopyDelivery: boolean;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: CourseCategory;
  format: CourseFormat;
  targetExam: string;
  language: string;
  thumbnail: string;
  bannerImage: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  facultyName: string;
  facultyDesignation: string;
  facultyAvatar: string;
  facultyBio: string;
  validity: string;
  startDate: string;
  endDate?: string;
  batchName?: string;
  isPublished?: boolean;
  status?: 'published' | 'draft' | 'archived';
  isFeatured?: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
  features: string[];
  description?: string;
  chapters: Chapter[];
  includesTestSeries: boolean;
  includesHardcopyBooks: boolean;
  certificateProvided: boolean;
  packageSubjects?: string[];
  packageDeliverables?: CoursePackageDeliverables;
  hasFreeDemo?: boolean;
}

export interface LiveClass {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  batchName?: string;
  subject: string;
  facultyName: string;
  facultyAvatar: string;
  status: 'upcoming' | 'live' | 'completed';
  scheduledTime: string;
  scheduledDate?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  attendeesCount: number;
  streamUrl: string;
  currentSlideUrl?: string;
  topic?: string;
  description?: string;
  topicsCovered: string[];
  isFree?: boolean;
  isRecording?: boolean;
  recordingUrl?: string;
  recordingDurationMinutes?: number;
  isRecordingPublished?: boolean;
  classNotesPdfUrl?: string;
  classNotesPdfTitle?: string;
  attendanceStats?: {
    totalEnrolled: number;
    presentCount: number;
    absentCount: number;
    avgDurationMinutes: number;
  };
  remindersScheduled?: {
    timeOffset: string;
    channels: ('push' | 'email' | 'whatsapp')[];
    sent: boolean;
  }[];
}

export type QuestionType =
  | 'single_choice'
  | 'single_correct'
  | 'multiple_choice'
  | 'multiple_correct'
  | 'true_false'
  | 'fill_blank'
  | 'fill_in_blank'
  | 'match_following'
  | 'numerical'
  | 'subjective'
  | 'subjective_descriptive';

export interface MatchPair {
  leftKey?: string;
  leftText?: string;
  rightKey?: string;
  rightText?: string;
  left?: string;
  right?: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  subject: string;
  chapter?: string;
  topic: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  marks: number;
  negativeMarks: number;
  questionText: string;
  options?: string[];
  correctAnswer?: any; // number (index), number[] (multi-mcq), string ('True'/'False' or numerical/blank text), or Record<string, string> for match
  explanation: string;
  hint?: string;
  matchPairs?: MatchPair[];
  numericalTolerance?: number;
  numericalUnits?: string;
  subjectiveModelAnswer?: string;
  subjectiveKeywords?: string[];
  maxWords?: number;
  usedInTests?: string[];
  videoSolutionUrl?: string;
  videoSolutionDuration?: string;
  videoSolutionTeacher?: string;
  pdfSolutionUrl?: string;
  pdfSolutionTitle?: string;
}

export type TestSeriesType =
  | 'chapter_test'
  | 'subject_test'
  | 'subject_wise'
  | 'revision_test'
  | 'mock_test'
  | 'full_syllabus'
  | 'full_syllabus_test';

export interface TestSeriesExam {
  id: string;
  title: string;
  category: CourseCategory;
  testType?: TestSeriesType;
  type?: string;
  targetExam?: string;
  subjectName?: string;
  chapterName?: string;
  courseId?: string;
  totalQuestions?: number;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  negativeMarking?: boolean;
  negativeMarkingRatio?: string;
  syllabusCovered?: string;
  sections: {
    name: string;
    questions: Question[];
  }[];
  attemptsCount: number;
  isFree?: boolean;
  price?: number;
  deadline?: string;
  instructions?: string[];
}

export interface LiveClassAttendanceRecord {
  id: string;
  liveClassId: string;
  liveClassTitle: string;
  courseTitle: string;
  batchName: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  studentPhone: string;
  joinTime: string;
  leaveTime?: string;
  durationMinutes: number;
  status: 'present' | 'late' | 'absent';
  date: string;
  engagementScore?: number;
}

export interface LiveClassReminder {
  id: string;
  liveClassId: string;
  liveClassTitle: string;
  batchName: string;
  facultyName: string;
  scheduledTime: string;
  reminderType: '24_hours' | '1_hour' | '15_minutes' | 'class_starting';
  channels: ('push' | 'email' | 'whatsapp')[];
  status: 'scheduled' | 'sent';
  messageText: string;
  sentAt?: string;
}

export interface LiveQaItem {
  id: string;
  studentId?: string;
  studentName: string;
  studentAvatar: string;
  questionText?: string;
  question?: string;
  timestamp: string;
  upvotes: number;
  isAnsweredLive?: boolean;
  answered?: boolean;
  facultyAnswer?: string;
  answer?: string;
  answeredBy?: string;
  hasUserUpvoted?: boolean;
  hasUpvoted?: boolean;
}

export interface LivePollItem {
  id: string;
  question: string;
  options: { text: string; votes: number; voteCount?: number }[];
  active: boolean;
  timerSeconds: number;
  createdBy: string;
  userVotedOption?: number;
  userVotedOptionId?: string;
  totalVotes?: number;
}

export interface LiveHandRaiseItem {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  raisedAt: string;
  status: 'waiting' | 'speaking' | 'lowered';
}

export interface TestAttemptResult {
  id: string;
  testId: string;
  testTitle: string;
  attemptDate: string;
  timeSpentSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  percentile: number;
  airRank: number;
  totalCandidates: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  unattemptedCount: number;
  accuracy: number;
  sectionWiseScore: {
    sectionName: string;
    score: number;
    maxScore: number;
    accuracy: number;
  }[];
  userAnswers: { [questionId: string]: any };
}

export type StudyMaterialType =
  | 'PDF'
  | 'Notes'
  | 'Books'
  | 'Assignments'
  | 'Question Banks'
  | 'Previous Year Papers'
  | 'Revision Material'
  | 'Practice Papers'
  | 'PDF Formula Sheet'
  | 'Handwritten Notes'
  | 'Previous Year Question (PYQ)'
  | 'Mind Map'
  | 'Assignment Sheet';

export interface StudyMaterialItem {
  id: string;
  title: string;
  subject: string;
  category: CourseCategory;
  type: StudyMaterialType;
  fileSize: string;
  pagesCount: number;
  downloadUrl: string;
  pdfViewerUrl?: string;
  isFree: boolean;
  restrictedDownload?: boolean;
  hasWatermark?: boolean;
  downloadsCount: number;
  viewsCount?: number;
  authorFaculty: string;
  updatedDate: string;
  targetExam?: string;
  description?: string;
  contentPages?: string[];
}

export type DoubtStatus = 'pending' | 'assigned' | 'answered' | 'closed' | 'unresolved';

export interface DoubtItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentId: string;
  courseTitle: string;
  subject: string;
  questionText: string;
  imageUrl?: string;
  pdfUrl?: string;
  pdfName?: string;
  audioUrl?: string;
  audioDuration?: string;
  submissionType?: 'text' | 'image' | 'pdf' | 'audio';
  assignedFacultyName?: string;
  assignedFacultyAvatar?: string;
  isDirectAskTeacher?: boolean;
  status: DoubtStatus;
  createdAt: string;
  facultyReply?: {
    facultyName: string;
    facultyAvatar: string;
    repliedAt: string;
    text: string;
    formulaOrExplanation?: string;
    imageUrl?: string;
    pdfUrl?: string;
    pdfName?: string;
    videoAnswerUrl?: string;
    videoDuration?: string;
  };
  aiSuggestion?: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  subject: string;
  dueDate: string;
  totalPoints: number;
  description: string;
  attachmentName: string;
  attachments?: string[];
  assignedFaculty?: string;
  submissionStatus: 'pending' | 'submitted' | 'graded';
  studentSubmission?: {
    submittedAt: string;
    fileName: string;
    fileSize: string;
    fileUrl?: string;
    fileType?: string;
    notes?: string;
    score?: number;
    facultyFeedback?: string;
  };
}

export type ProductType = 
  | 'recorded_course' 
  | 'live_course' 
  | 'test_series' 
  | 'study_material' 
  | 'mock_tests' 
  | 'combo_package' 
  | 'premium_membership';

export interface StoreProduct {
  id: string;
  title: string;
  tagline?: string;
  type: ProductType;
  category: CourseCategory | string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount?: number;
  enrolledCount?: number;
  thumbnail: string;
  bannerImage?: string;
  badge?: string;
  features: string[];
  validity: string;
  targetExam?: string;
  deliverables?: string[];
  courseIdRef?: string;
  courseId?: string;
  instructor?: string;
  ratingCount?: number;
  description?: string;
  tags?: string[];
  image?: string;
  testSeriesIdRef?: string;
  materialIdRef?: string;
  isBestseller?: boolean;
  isPopular?: boolean;
  comboDetails?: any;
}

export type OrderPaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Cancelled' | 'Refunded';

export type PaymentMethodType = 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Wallets';

export interface OrderItem {
  id: string;
  orderNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  productTitle: string;
  productType: ProductType;
  items: {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    type: ProductType | 'course' | 'test_series' | 'material';
    thumbnail?: string;
    quantity?: number;
  }[];
  baseAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode?: string;
  paymentStatus: OrderPaymentStatus;
  paymentMethod: PaymentMethodType | string;
  orderDate: string;
  date?: string;
  status?: string;
  transactionId: string;
  invoiceNumber: string;
  invoiceUrl?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
}

export interface InvoiceItem {
  invoiceNumber: string;
  orderId: string;
  orderDate?: string;
  issueDate: string;
  dueDate?: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  studentAddress?: string;
  studentDetails?: {
    name: string;
    email: string;
    phone: string;
    studentId: string;
    address: string;
    state: string;
  };
  academyDetails: {
    name: string;
    brandTagline?: string;
    gstin: string;
    pan?: string;
    cin: string;
    address: string;
    supportEmail: string;
    supportPhone: string;
  };
  items: {
    id?: string;
    title?: string;
    description?: string;
    hsnSacCode?: string;
    hsnCode?: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    taxableAmount?: number;
    amount?: number;
    total?: number;
  }[];
  subtotal: number;
  couponCode?: string;
  discount?: number;
  discountTotal?: number;
  taxableAmount?: number;
  cgst: number;
  sgst: number;
  igst?: number;
  totalAmount: number;
  amountInWords?: string;
  paymentMethod: string;
  transactionId?: string;
  paymentStatus?: 'PAID' | 'PENDING' | 'REFUNDED' | 'Paid';
  authorizedSignatory?: string;
  qrVerificationCode?: string;
}

export type LeadSource =
  | 'Website'
  | 'App'
  | 'Facebook'
  | 'Instagram'
  | 'Google'
  | 'WhatsApp'
  | 'Referral'
  | 'Offline';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Demo Scheduled'
  | 'Follow Up'
  | 'Enrolled'
  | 'Lost'
  | 'New Enquiry'
  | 'Cold';

export interface LeadItem {
  id: string;
  studentName: string;
  phone: string;
  email: string;
  city: string;
  targetCourse: string;
  source?: LeadSource;
  counsellorName: string;
  followUpDate?: string;
  remarks?: string;
  stage: LeadStatus;
  createdAt: string;
  lastFollowUp: string;
  notes: string[];
  dealValue: number;
}

export interface CertificateItem {
  id: string;
  studentName: string;
  studentId?: string;
  courseTitle: string;
  courseId?: string;
  completionDate: string;
  grade: string;
  scorePercentage?: number;
  credentialId: string;
  instructorName: string;
  directorName?: string;
  academyLogo?: string;
  qrCodeUrl?: string;
  qrCodeData?: string;
  authorizedSignature?: string;
  skillsEarned?: string[];
  issuedBy?: string;
  verificationHash?: string;
  isVerified?: boolean;
  issuedAtTimestamp?: string;
}

export interface CartItem {
  id?: string;
  product?: StoreProduct;
  course?: Course;
  productId?: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  thumbnail?: string;
  type?: ProductType | 'course';
  comboUpgrade?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  studentClass?: string;
  schoolCollege?: string;
  targetExam: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  walletBalance: number;
  studyStreakDays: number;
  wishlistCourseIds?: string[];
  orders?: OrderItem[];
  subscription?: UserSubscription;
  isPremiumMember?: boolean;
  isSubscribed?: boolean;
  membershipTier?: string;
  subscriptionEndDate?: string;
}

export type PlatformNotificationType =
  | 'registration'
  | 'course_purchase'
  | 'course_activation'
  | 'new_video'
  | 'live_class'
  | 'test'
  | 'result'
  | 'assignment'
  | 'doubt_response'
  | 'certificate'
  | 'offers'
  | 'announcements'
  | 'live'
  | 'exam'
  | 'offer'
  | 'system'
  | 'achievement';

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  type: PlatformNotificationType;
  category?: 'registration' | 'course_purchase' | 'course_activation' | 'new_video' | 'live_class' | 'test' | 'result' | 'assignment' | 'doubt_response' | 'certificate' | 'offers' | 'announcements';
  time: string;
  timestamp?: string;
  read: boolean;
  linkAction?: string;
  actionTarget?: 'course_detail' | 'video_player' | 'live_class' | 'cbt_test' | 'test_result' | 'doubt_forum' | 'assignments' | 'certificate' | 'store' | 'subscription';
  actionPayload?: any;
  targetAudience?: 'all' | 'enrolled' | 'wishlist' | 'vip' | string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  createdAt?: string;
}

export type GlobalSearchCategory = 
  | 'all' 
  | 'courses' 
  | 'subjects' 
  | 'videos' 
  | 'faculty' 
  | 'test_series' 
  | 'study_material' 
  | 'chapters';

export interface GlobalSearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category: GlobalSearchCategory;
  categoryLabel: string;
  description?: string;
  tag?: string;
  rating?: number;
  price?: number;
  duration?: string;
  thumbnail?: string;
  metaInfo?: string;
  actionType: 'open_course' | 'open_video' | 'open_test' | 'open_material' | 'open_faculty' | 'open_subject' | 'open_chapter';
  payload?: any;
}

export interface WishlistLead {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  addedDate: string;
  status: 'active_in_wishlist' | 'remarketed' | 'converted_purchased' | 'dropped';
  remarketingCount: number;
  lastRemarketedDate?: string;
  lastPromoSent?: string;
}

export interface RemarketingCampaign {
  id: string;
  campaignTitle: string;
  targetCourseId: string;
  targetCourseTitle: string;
  couponCode: string;
  discountPercentage: number;
  recipientsCount: number;
  channels: ('in_app' | 'email' | 'whatsapp' | 'push')[];
  status: 'sent' | 'scheduled' | 'draft';
  sentDate: string;
  clicksCount: number;
  conversionsCount: number;
  revenueGenerated: number;
  customMessage: string;
}

// -------------------------------------------------------------
// 1. COUPON SYSTEM TYPES
// -------------------------------------------------------------
export type CouponDiscountType = 'percentage' | 'fixed';
export type DiscountType = CouponDiscountType;

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: CouponDiscountType;
  discountValue: number; // e.g. 50 (%) or 1500 (₹)
  minOrderValue?: number; // Minimum order subtotal required to apply
  minOrderAmount?: number; // Alias for minOrderValue
  maxDiscountAmount?: number; // Maximum discount cap (especially for percentage)
  expiryDate: string; // e.g. '2026-12-31'
  usageLimit?: number; // Total max redemptions permitted
  usedCount: number; // Current redemptions count
  isActive: boolean;
  applicableCourseIds?: string[]; // Empty/undefined = Applicable to All Courses
  applicableUserEmails?: string[]; // Empty/undefined = Applicable to All Users
  applicableCategories?: CourseCategory[]; // Applicable categories
  createdDate?: string;
  createdAt?: string;
}

export interface CouponValidationResult {
  isValid: boolean;
  discountAmount: number;
  discountPercentage?: number;
  appliedCoupon?: Coupon;
  errorMessage?: string;
}

// -------------------------------------------------------------
// 2. COMBO PACKAGE SYSTEM TYPES
// -------------------------------------------------------------
export interface ComboInclusions {
  hasRecordedCourses: boolean;
  recordedCourseTitles?: string[];
  recordedCoursesCount?: number;
  hasLiveClasses: boolean;
  liveClassesDetail?: string;
  hasTestSeries: boolean;
  testSeriesCount?: number;
  testSeriesTitles?: string[];
  hasStudyMaterial: boolean;
  studyMaterialType?: 'digital_pdf' | 'hardcopy_books' | 'both';
  studyMaterialDetails?: string;
  hasDoubtSupport: boolean;
  doubtSupportType?: '24x7_faculty' | '1on1_mentor' | 'ai_live';
  doubtSupportDetails?: string;
  hasCertificate: boolean;
}

export interface ComboPackage {
  id: string;
  title: string;
  tagline?: string;
  category: CourseCategory | string;
  targetExam?: string;
  price: number;
  bundlePrice?: number;
  originalPrice: number;
  originalTotalValue?: number;
  discountPercentage: number;
  coursesIncluded?: string[];
  thumbnail?: string;
  bannerImage?: string;
  badge?: string;
  inclusions?: ComboInclusions;
  description?: string;
  includedItems?: string[];
  hasRecordedVideos?: boolean;
  hasLiveClasses?: boolean;
  hasTestSeries?: boolean;
  hasStudyMaterial?: boolean;
  hasDoubtSupport?: boolean;
  hasMentorship?: boolean;
  isActive?: boolean;
  validity: string;
  rating?: number;
  reviewsCount?: number;
  enrolledCount?: number;
  isBestseller?: boolean;
  isPopular?: boolean;
  features?: string[];
  linkedCourseIds: string[];
  linkedLiveClassIds?: string[];
  linkedTestSeriesIds?: string[];
  linkedStudyMaterialIds?: string[];
}

// -------------------------------------------------------------
// 3. SUBSCRIPTION SYSTEM TYPES
// -------------------------------------------------------------
export type SubscriptionBillingPeriod = 'monthly' | 'quarterly' | 'annual' | 'lifetime';
export type SubscriptionInterval = SubscriptionBillingPeriod;

export interface SubscriptionPlan {
  id: string;
  name?: string;
  tierName?: string; // e.g. 'DC Maxwell Pro Monthly', 'DC Maxwell Scholar Quarterly', 'DC Maxwell All-Access Annual VIP'
  interval?: SubscriptionInterval;
  billingPeriod?: SubscriptionBillingPeriod;
  durationDays?: number;
  billingIntervalText?: string; // '/ month', '/ 3 months', '/ year', 'one-time'
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  description?: string;
  badge?: string;
  badgeText?: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  isActive?: boolean;
  enrolledSubscribersCount?: number;
  colorTheme?: 'blue' | 'indigo' | 'purple' | 'amber' | 'emerald';
  benefits?: {
    premiumCoursesAccess: 'all' | 'curated' | 'none';
    testSeriesUnlimited: boolean;
    studyMaterialVault: boolean;
    liveClassesAccess: 'unlimited' | 'selected_weekly' | 'none';
    doubtSupport: 'priority_1on1' | 'standard_desk' | 'none';
    exclusiveMasterclasses: boolean;
    hardcopyDelivery: boolean;
    verifiedCertificates: boolean;
  };
  highlightFeatures?: string[];
  features?: string[];
}

export interface UserSubscription {
  id: string;
  planId: string;
  planName: string;
  billingPeriod: SubscriptionBillingPeriod;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
  pricePaid: number;
  transactionId: string;
  daysRemaining: number;
}

// ==========================================
// CONTENT MANAGEMENT SYSTEM (CMS) INTERFACES
// ==========================================

export interface AdminVideoItem {
  id: string;
  title: string;
  courseTitle: string;
  courseId?: string;
  subject: string;
  faculty: string;
  duration: string; // e.g. "52 mins"
  videoUrl: string;
  thumbnailUrl?: string;
  resolution: '720p' | '1080p' | '4K UHD';
  isFreePreview: boolean;
  drmProtected: boolean;
  viewsCount: number;
  uploadedDate: string;
  status: 'published' | 'draft' | 'archived';
  description?: string;
}

export interface AdminPdfItem {
  id: string;
  title: string;
  subject: string;
  category: CourseCategory | string;
  fileSize: string;
  pagesCount: number;
  downloadUrl: string;
  isFree: boolean;
  downloadsCount: number;
  authorFaculty: string;
  updatedDate: string;
  hasWatermark: boolean;
  status: 'published' | 'draft';
  targetExam?: string;
}

export interface AdminNotesItem {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  faculty: string;
  format: 'Handwritten' | 'Typed' | 'Mind Map' | 'Formula Sheet';
  pagesCount: number;
  fileSize: string;
  isFree: boolean;
  downloadUrl: string;
  contentSummary: string;
  updatedDate: string;
  status: 'published' | 'draft';
}

export interface AdminAnnouncementItem {
  id: string;
  title: string;
  message: string;
  category: 'urgent' | 'exam_alert' | 'batch_update' | 'holiday' | 'general';
  targetAudience: 'All Students' | 'JEE Aspirants' | 'NEET Aspirants' | 'UPSC Candidates' | 'Class 11-12' | 'Faculty Only';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  publishDate: string;
  expiresDate?: string;
  isActive: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface AdminBlogItem {
  id: string;
  title: string;
  slug: string;
  category: 'Exam Strategy' | 'Topper Secrets' | 'Subject Mastery' | 'Current Affairs' | 'Exam Notification';
  author: string;
  authorRole: string;
  readTime: string;
  publishDate: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags: string[];
  viewsCount: number;
  likesCount: number;
  status: 'published' | 'draft' | 'scheduled';
}

export interface AdminBannerItem {
  id: string;
  title: string;
  subtitle?: string;
  placement: 'homepage_hero' | 'student_portal' | 'cbt_series' | 'mobile_app' | 'top_ticker';
  imageUrl: string;
  backgroundColor?: string;
  ctaText: string;
  ctaAction: string;
  targetAudience: 'all' | 'new_visitors' | 'enrolled_students' | 'subscribers';
  displayOrder: number;
  isActive: boolean;
  clickCount: number;
  startDate?: string;
  endDate?: string;
}

export type FaqCategory =
  | 'Courses'
  | 'Payments'
  | 'Exams'
  | 'Refunds'
  | 'Technical Support'
  | 'Account Issues'
  | 'Admissions & Batches'
  | 'CBT Test Series'
  | 'Study Material & Notes';

export interface AdminFaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  displayOrder: number;
  isActive: boolean;
  helpfulVotes: number;
  updatedAt: string;
}

// ==========================================
// BATCH MANAGEMENT INTERFACES
// ==========================================
export interface BatchStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentNo: string;
  enrolledDate: string;
  attendancePercent: number;
  status: 'Active' | 'On Leave' | 'Completed' | 'Defaulter';
}

export interface BatchFaculty {
  id: string;
  name: string;
  subject: string;
  role: 'Lead Master Faculty' | 'Subject Expert' | 'Doubt Mentor' | 'Lab Assistant';
  email: string;
  phone?: string;
  avatar?: string;
}

export interface BatchSchedule {
  days: string[]; // e.g. ['Mon', 'Wed', 'Fri']
  timeSlot: string; // e.g. '05:30 PM - 07:30 PM'
  startDate: string;
  endDate: string;
  roomOrStreamLink?: string;
  isOnline: boolean;
  totalClassesScheduled: number;
  classesCompleted: number;
}

export interface BatchVideo {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  duration: string;
  url?: string;
  recordedDate: string;
  isLiveRecording?: boolean;
}

export interface BatchTest {
  id: string;
  title: string;
  subject: string;
  totalMarks: number;
  durationMinutes: number;
  scheduledDate: string;
  status: 'Upcoming' | 'Live' | 'Completed';
}

export interface BatchStudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'PDF' | 'Notes' | 'Formula Sheet' | 'Assignment' | 'DPP';
  fileSize: string;
  pages?: number;
  downloadUrl?: string;
  uploadDate: string;
}

export interface AcademicBatch {
  id: string;
  name: string;
  code: string; // e.g. 'PIN-JEE-26-A'
  courseId: string;
  courseTitle: string;
  targetExam: string;
  academicYear: string;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Suspended';
  maxCapacity: number;
  description?: string;
  
  // Required dimensions:
  students: BatchStudent[];
  faculty: BatchFaculty[];
  schedule: BatchSchedule;
  subjects: string[];
  videos: BatchVideo[];
  tests: BatchTest[];
  studyMaterial: BatchStudyMaterial[];
}

// ==========================================
// SUPPORT TICKET SYSTEM INTERFACES
// ==========================================
export type TicketCategory =
  | 'Payment'
  | 'Course Access'
  | 'Video Issue'
  | 'Live Class'
  | 'Test'
  | 'Account'
  | 'Certificate'
  | 'Other';

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: 'student' | 'admin' | 'support';
  message: string;
  createdAt: string;
  attachments?: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. 'TKT-8402'
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  category: TicketCategory;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedAgent?: string;
  relatedCourse?: string;
  resolutionNotes?: string;
  messages: TicketMessage[];
}




