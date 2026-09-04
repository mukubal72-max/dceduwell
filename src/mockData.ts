import {
  Course,
  LiveClass,
  TestSeriesExam,
  StudyMaterialItem,
  DoubtItem,
  AssignmentItem,
  LeadItem,
  CertificateItem,
  PlatformNotification,
  UserProfile,
  LiveClassAttendanceRecord,
  LiveClassReminder,
  Question,
  TestAttemptResult,
  StoreProduct,
  OrderItem,
  InvoiceItem,
  Coupon,
  ComboPackage,
  SubscriptionPlan,
  WishlistLead,
  RemarketingCampaign,
  AdminVideoItem,
  AdminPdfItem,
  AdminNotesItem,
  AdminAnnouncementItem,
  AdminBlogItem,
  AdminBannerItem,
  AdminFaqItem,
  AcademicBatch,
  SupportTicket
} from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-student-01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@dcmaxwell.edu',
  phone: '+91 98765 43210',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  enrolledCourseIds: ['crs-jee-pinnacle', 'crs-neet-vision'],
  completedLessonIds: ['les-1', 'les-2', 'les-5'],
  targetExam: 'JEE Advanced 2026',
  walletBalance: 1250,
  studyStreakDays: 14,
  wishlistCourseIds: ['crs-ca-foundation', 'crs-cbse-12']
};

export const COURSES_DATA: Course[] = [
  {
    id: 'crs-jee-pinnacle',
    title: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch',
    tagline: 'Complete 2-Year Rigorous Program for Top 100 AIR in JEE Advanced with daily live problem solving.',
    category: 'JEE (Main & Adv)',
    format: 'Comprehensive Live',
    targetExam: 'JEE Main & Advanced 2026',
    language: 'Hinglish & English',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    price: 14999,
    originalPrice: 29999,
    discountPercentage: 50,
    rating: 4.95,
    reviewsCount: 1420,
    enrolledCount: 3840,
    facultyName: 'Er. Rajeshwar Varma (IIT Delhi, 18+ Yrs Exp)',
    facultyDesignation: 'Senior Master Faculty - Physics & Mechanics',
    facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    facultyBio: 'Mentored over 45+ Top 100 AIRs in JEE Advanced. Former Head of Physics at top Kota institutes.',
    validity: '24 Months Access (Till Exam)',
    startDate: 'March 1, 2026 (New Batch)',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    includesTestSeries: true,
    includesHardcopyBooks: true,
    certificateProvided: true,
    features: [
      '600+ Hours Live Interactive Classes',
      'Daily Practice Problem (DPP) with Video Solutions',
      '30 All India Mock Tests (NTA CBT Pattern)',
      '1-on-1 Personalized Mentorship & Live Doubt Rooms',
      'Curated Hardcopy Study Modules Shipped to Home',
      'Unlimited 24/7 Recorded Class Replays in HD'
    ],
    chapters: [
      {
        id: 'ch-phy-1',
        subject: 'Physics',
        title: 'Electrostatics & Coulomb Law Mastery',
        lessons: [
          {
            id: 'les-1',
            title: 'Electric Charges, Field Intensity & Dipoles in Uniform Fields',
            durationMinutes: 75,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            notesPdfUrl: '#',
            notesPdfTitle: 'Electrostatics_Field_Summary_Handwritten.pdf',
            summary: 'Deep dive into Coulomb inverse square law, superposition principle, continuous charge distributions, and dipole torque dynamics.',
            timestamps: [
              { time: '00:00', label: 'Introduction & Charge Properties' },
              { time: '14:20', label: 'Continuous Charge Distributions' },
              { time: '38:45', label: 'Dipole Torque & Potential Energy' },
              { time: '62:10', label: 'JEE Advanced Numerical Solving' }
            ]
          },
          {
            id: 'les-2',
            title: 'Gauss Law, Flux Calculus & Conducting Shells',
            durationMinutes: 90,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            notesPdfUrl: '#',
            notesPdfTitle: 'Gauss_Law_Advanced_Applications.pdf',
            summary: 'Surface integrals, Gaussian cylindrical & planar symmetries, cavity electrostatic shielding, and induced charges.',
            timestamps: [
              { time: '00:00', label: 'Electric Flux Definition' },
              { time: '22:15', label: 'Gaussian Symmetry Cases' },
              { time: '55:30', label: 'Cavity & Induced Charges' },
              { time: '78:40', label: 'Previous 10 Years PYQ Analysis' }
            ]
          },
          {
            id: 'les-3',
            title: 'Capacitance, Dielectric Polarization & Energy Density',
            durationMinutes: 80,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: false,
            notesPdfUrl: '#',
            notesPdfTitle: 'Capacitors_Circuit_Reductions.pdf',
            summary: 'Parallel and cylindrical capacitor combinations, work done during dielectric insertion, Kirchhoff rules in RC circuits.',
            timestamps: [
              { time: '00:00', label: 'Capacitance Fundamentals' },
              { time: '30:00', label: 'Dielectric Boundaries' },
              { time: '60:00', label: 'RC Circuit Transients' }
            ]
          }
        ]
      },
      {
        id: 'ch-chem-1',
        subject: 'Chemistry',
        title: 'Chemical Thermodynamics & Thermochemistry',
        lessons: [
          {
            id: 'les-4',
            title: 'First Law of Thermodynamics & PV Work Calculations',
            durationMinutes: 65,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isFreePreview: false,
            summary: 'State vs path functions, reversible isothermal vs adiabatic expansions, enthalpy changes.',
            timestamps: [
              { time: '00:00', label: 'System & Surroundings' },
              { time: '25:00', label: 'Isothermal & Adiabatic Work' }
            ]
          }
        ]
      },
      {
        id: 'ch-math-1',
        subject: 'Mathematics',
        title: 'Definite Integrals & Area Under Curves',
        lessons: [
          {
            id: 'les-5',
            title: 'King & Queen Properties of Definite Integrals',
            durationMinutes: 85,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isFreePreview: true,
            summary: 'Leibniz integral rule, symmetry reductions, and piecewise integrations with absolute value bounds.',
            timestamps: [
              { time: '00:00', label: 'Integral Properties Review' },
              { time: '40:00', label: 'Special Function Integrals' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-neet-vision',
    title: 'Dr. Visionary NEET UG 2026 Complete Medical Batch',
    tagline: 'NCERT Line-by-Line Mastery in Biology with High-Yield Physics & Chemistry for 700+ Score.',
    category: 'NEET (Medical)',
    format: 'Comprehensive Live',
    targetExam: 'NEET UG 2026',
    language: 'Hinglish & English',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
    price: 11999,
    originalPrice: 24999,
    discountPercentage: 52,
    rating: 4.98,
    reviewsCount: 2310,
    enrolledCount: 5290,
    facultyName: 'Dr. Ananya Mukherjee (AIIMS New Delhi, MD)',
    facultyDesignation: 'Chief Academic Director - Biology & Human Physiology',
    facultyAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    facultyBio: 'Author of bestselling NEET Biology Guidebook. 12+ years mentoring state rankers.',
    validity: '18 Months Access',
    startDate: 'Feb 20, 2026',
    isFeatured: true,
    isPopular: true,
    includesTestSeries: true,
    includesHardcopyBooks: true,
    certificateProvided: true,
    features: [
      '100% NCERT Word-to-Word Dissection',
      '3D Anatomy & Botanical Microscopic Visualizers',
      '40 Full Syllabus NEET CBT Mock Tests with OMR Sync',
      'Daily 200 Question Speed Drills',
      'Complete Printed NCERT Booster Formula Kit'
    ],
    chapters: [
      {
        id: 'ch-bio-1',
        subject: 'Botany',
        title: 'Cell Biology & Plant Physiology',
        lessons: [
          {
            id: 'les-6',
            title: 'Cell: The Unit of Life - Organelles & Membrane Transport',
            durationMinutes: 70,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            isFreePreview: true,
            summary: 'Fluid mosaic model, Endomembrane system, Chloroplast & Mitochondria genome specifics.',
            timestamps: [
              { time: '00:00', label: 'Cell Theory & Modern Concepts' },
              { time: '35:00', label: 'Organelle Ultrastructure' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-upsc-samarth',
    title: 'Samarth IAS - UPSC Prelims & Mains 2026 Integrated Foundation',
    tagline: 'Comprehensive GS Paper I-IV, CSAT, Essay, Daily Current Affairs, and Answer Writing Program.',
    category: 'UPSC & Civil Services',
    format: 'Comprehensive Live',
    targetExam: 'UPSC CSE 2026/27',
    language: 'English & Hindi',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    price: 21999,
    originalPrice: 45000,
    discountPercentage: 51,
    rating: 4.92,
    reviewsCount: 880,
    enrolledCount: 1940,
    facultyName: 'S. Vikramaditya (Ex-Civil Servant, IAS Mentor)',
    facultyDesignation: 'Dean of UPSC & Policy Studies',
    facultyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    facultyBio: 'Guided 80+ selected civil servants in IAS, IPS, and IFS cadres over 15 years.',
    validity: '36 Months Access',
    startDate: 'March 15, 2026',
    isFeatured: true,
    isPopular: false,
    includesTestSeries: true,
    includesHardcopyBooks: true,
    certificateProvided: true,
    features: [
      'Daily 2-Hour Mains Answer Evaluation with Model Answers',
      'Monthly Yojana & Kurukshetra Dossiers',
      'Prelims Test Series (35 Tests with Detailed Logic)',
      '1-on-1 Interview Guidance with Retired Bureaucrats'
    ],
    chapters: [
      {
        id: 'ch-polity-1',
        subject: 'Indian Polity',
        title: 'Constitutional Framework & Fundamental Rights',
        lessons: [
          {
            id: 'les-7',
            title: 'Preamble, Basic Structure Doctrine & Judicial Review',
            durationMinutes: 90,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            isFreePreview: true,
            summary: 'Kesavananda Bharati case timeline, Minerva Mills, Article 13 & 368 interaction.',
            timestamps: [
              { time: '00:00', label: 'Historical Constitutional Evolution' },
              { time: '45:00', label: 'Basic Structure Landmark Rulings' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-board-12th',
    title: 'Class 12th Board Booster 2026 (CBSE & State Boards)',
    tagline: 'Target 98%+ in Class 12 Boards with complete NCERT solutions, case study drills, and sample papers.',
    category: 'Class 11-12 Boards',
    format: 'Recorded Mastery',
    targetExam: 'CBSE / ICSE Class 12 2026',
    language: 'English & Hinglish',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    price: 4999,
    originalPrice: 9999,
    discountPercentage: 50,
    rating: 4.88,
    reviewsCount: 940,
    enrolledCount: 3100,
    facultyName: 'Prof. Neha Singhal (M.Sc Gold Medalist, B.Ed)',
    facultyDesignation: 'Head of Senior Secondary Academics',
    facultyAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    facultyBio: '20+ years of board examination evaluation expertise. Author of 12th Exemplar solutions.',
    validity: '12 Months Access',
    startDate: 'Instant On-Demand Access',
    isFeatured: false,
    isPopular: true,
    includesTestSeries: true,
    includesHardcopyBooks: false,
    certificateProvided: true,
    features: [
      'Chapter-wise Case Study & Assertion-Reason Questions',
      'Step-by-Step Board Presentation Tactics for Full Marks',
      '20 Full Length CBSE Model Sample Papers with Marking Scheme',
      'Instant Doubt Clearing via AI & Faculty'
    ],
    chapters: []
  },
  {
    id: 'crs-foundation-olympiad',
    title: 'Junior Prodigy: Class 9-10th Foundation & Olympiad (NTSE / NSEJS)',
    tagline: 'Build early analytical mastery in STEM to dominate JEE/NEET/KVPY and Science Olympiads.',
    category: 'Foundation (9-10th)',
    format: 'Comprehensive Live',
    targetExam: 'NTSE, NSEJS, PRMO & School Toppers',
    language: 'English',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    price: 6999,
    originalPrice: 14999,
    discountPercentage: 53,
    rating: 4.93,
    reviewsCount: 650,
    enrolledCount: 2200,
    facultyName: 'Er. Alok Srivastava (IIT Roorkee, NTSE Scholar)',
    facultyDesignation: 'Lead Olympiad Math & Physics Trainer',
    facultyAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    facultyBio: 'Trained over 150+ students who cleared IOQM, RMO, and qualified for International Science Olympiad.',
    validity: '12 Months Access',
    startDate: 'April 5, 2026',
    isFeatured: false,
    isPopular: false,
    includesTestSeries: true,
    includesHardcopyBooks: true,
    certificateProvided: true,
    features: [
      'Deep Concept Builder for Class 9 & 10 Advanced Math & Science',
      'PRMO / IOQM Number Theory & Combinatorics Workshop',
      'Mental Aptitude & Reasoning Drills',
      'Weekly Olympiad Mock Tests with All India Percentile'
    ],
    chapters: []
  },
  {
    id: 'crs-ca-foundation-package',
    title: 'CA Foundation Complete Video Course Package (All 4 Papers + Test Series)',
    tagline: 'Comprehensive ICAI Syllabus Mastery: Accounts, Business Law, Quantitative Aptitude & Economics with Top All India Ranker Mentors.',
    category: 'CA & Commerce (Foundation/Inter)',
    format: 'Video Course Package',
    targetExam: 'ICAI CA Foundation Exam 2026',
    language: 'English & Hinglish',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    price: 9999,
    originalPrice: 19999,
    discountPercentage: 50,
    rating: 4.97,
    reviewsCount: 1840,
    enrolledCount: 4210,
    facultyName: 'CA CS Nitin Sharma & CA Pooja Agarwal',
    facultyDesignation: 'Rankholder CA Faculty & ICAI Paper Reviewers',
    facultyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    facultyBio: 'AIR 3 in CA Foundation & AIR 7 in CA Final. Over 14 years teaching accounts, corporate laws, and quantitative analysis.',
    validity: '12 Months Access (Till Exam)',
    startDate: 'Instant On-Demand Access',
    endDate: 'Nov 2026 Examination',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    includesTestSeries: true,
    includesHardcopyBooks: true,
    certificateProvided: true,
    hasFreeDemo: true,
    packageSubjects: [
      'Paper 1: Accounting (Principles & Practice)',
      'Paper 2: Business Laws & Business Correspondence (BCR)',
      'Paper 3: Quantitative Aptitude (Maths, LR & Statistics)',
      'Paper 4: Business Economics & BCK',
      'Study Material: ICAI Summary Compendium & Handwritten Formula Charts',
      'Test Series: 20 Full-Length Mock Exams with Evaluated Answer Sheets'
    ],
    packageDeliverables: {
      subjects: [
        'Accounting',
        'Business Laws',
        'Quantitative Aptitude',
        'Business Economics',
        'Study Material Modules',
        'All-India Test Series'
      ],
      recordedLecturesCount: 240,
      testSeriesCount: 20,
      studyNotesCount: 85,
      doubtSupport: true,
      hardcopyDelivery: true
    },
    features: [
      'Full Syllabus 240+ High-Definition Recorded Video Lectures',
      'Covers All 4 Papers: Accounts, Law, Maths/Stats, Economics',
      'ICAI Study Material Line-by-Line Breakdown & Past 10 Years RTPs/MTPs',
      '20 Full Mock Test Papers with Certified Step-Wise Evaluation',
      'Comprehensive Printed Color-Coded Summary Modules Shipped to Doorstep',
      'Unlimited Video Views with Anti-Piracy Watermarking & 1.25x-2x Speed'
    ],
    chapters: [
      {
        id: 'ch-ca-acc-1',
        subject: 'Accounting',
        title: 'Accounting Process, Bank Reconciliation & Depreciation',
        lessons: [
          {
            id: 'les-ca-1',
            title: 'Bank Reconciliation Statement (BRS) - Passbook & Cashbook Dynamics',
            durationMinutes: 68,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            notesPdfUrl: '#',
            notesPdfTitle: 'CA_Foundation_BRS_Summary_Handwritten.pdf',
            summary: 'Comprehensive treatment of timing differences, errors in cash book vs pass book, and adjusted cash book approach for exam full marks.',
            timestamps: [
              { time: '00:00', label: 'BRS Core Concept & Logic' },
              { time: '20:15', label: 'Timing & Clerical Errors' },
              { time: '42:30', label: 'Adjusted Cashbook Method' },
              { time: '58:00', label: 'ICAI Exam Practical Problem Solving' }
            ]
          },
          {
            id: 'les-ca-2',
            title: 'Depreciation Accounting - SLM, WDV & Change in Method',
            durationMinutes: 75,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: false,
            notesPdfUrl: '#',
            notesPdfTitle: 'Depreciation_Accounting_Standard_10.pdf',
            summary: 'Straight line method vs diminishing balance, asset disposal account, retrospective adjustment according to AS-10.',
            timestamps: [
              { time: '00:00', label: 'AS-10 Property Plant Equipment' },
              { time: '30:00', label: 'Provision for Depreciation' },
              { time: '55:00', label: 'Disposal Account Master Illustration' }
            ]
          }
        ]
      },
      {
        id: 'ch-ca-law-1',
        subject: 'Business Laws',
        title: 'The Indian Contract Act 1872 - General Principles',
        lessons: [
          {
            id: 'les-ca-3',
            title: 'Essential Elements of a Valid Contract & Case Law Writing Style',
            durationMinutes: 60,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: true,
            notesPdfUrl: '#',
            notesPdfTitle: 'Indian_Contract_Act_CaseLaws_Summary.pdf',
            summary: 'Offer, Acceptance, Consideration (Quid Pro Quo), Capacity to Contract, and how to write 6-mark case law answers.',
            timestamps: [
              { time: '00:00', label: 'Section 10 Essentials' },
              { time: '25:00', label: 'Doctrine of Privity of Contract' },
              { time: '45:00', label: 'Mains Style Answer Blueprint' }
            ]
          }
        ]
      },
      {
        id: 'ch-ca-math-1',
        subject: 'Quantitative Aptitude',
        title: 'Mathematics of Finance: Simple & Compound Interest, Annuity',
        lessons: [
          {
            id: 'les-ca-4',
            title: 'Time Value of Money & Future Value of Annuity Regular',
            durationMinutes: 55,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isFreePreview: false,
            summary: 'Calculator shortcut techniques for effective rate of interest, sinking fund, and loan amortization schedules.',
            timestamps: [
              { time: '00:00', label: 'Effective Rate Formula Shortcuts' },
              { time: '28:00', label: 'Annuity Due vs Regular Annuity' }
            ]
          }
        ]
      },
      {
        id: 'ch-ca-eco-1',
        subject: 'Business Economics',
        title: 'Theory of Demand & Supply and Consumer Behaviour',
        lessons: [
          {
            id: 'les-ca-5',
            title: 'Elasticity of Demand & Indifference Curve Analysis',
            durationMinutes: 50,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isFreePreview: false,
            summary: 'Price, income, and cross elasticity. Marginal rate of substitution and consumer equilibrium axioms.',
            timestamps: [
              { time: '00:00', label: 'Elasticity Measurement Methods' },
              { time: '26:00', label: 'Budget Line & Indifference Map' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-tech-ai',
    title: 'Full Stack & Applied Generative AI Masterclass 2026',
    tagline: 'Modern Industry Tech Stack: Python, TypeScript, React, Cloud Architecture & LLM Engineering.',
    category: 'Tech & Data Science',
    format: 'Recorded Mastery',
    targetExam: 'Tech Placements & Industry Certification',
    language: 'English',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    price: 8499,
    originalPrice: 18999,
    discountPercentage: 55,
    rating: 4.96,
    reviewsCount: 1100,
    enrolledCount: 3400,
    facultyName: 'Devansh K. (Ex-Google AI Engineer, Architect)',
    facultyDesignation: 'Senior Lead Instructor - Systems & AI',
    facultyAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    facultyBio: '10+ years engineering scalable cloud systems & machine learning models at tier-1 tech firms.',
    validity: 'Lifetime Access',
    startDate: 'Instant On-Demand Access',
    isFeatured: true,
    isPopular: true,
    includesTestSeries: true,
    includesHardcopyBooks: false,
    certificateProvided: true,
    features: [
      'Build 8 Industry-Ready Production Projects',
      'Prompt Engineering & Agentic Workflow Systems',
      'Git, CI/CD, Containerization & Cloud Deployment',
      'Resume Review & Mock Tech Coding Interviews'
    ],
    chapters: []
  }
];

export const LIVE_CLASSES_DATA: LiveClass[] = [
  {
    id: 'live-cls-1',
    title: '🔴 LIVE: Electrostatics - High Voltage Problem Solving & JEE Advanced Trick Workshop',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Morning Batch',
    subject: 'Physics',
    facultyName: 'Er. Rajeshwar Varma',
    facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'live',
    scheduledTime: 'Today at 7:30 PM (In Progress)',
    date: '2026-08-27',
    startTime: '19:30',
    endTime: '21:00',
    durationMinutes: 90,
    attendeesCount: 1428,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    topic: 'Conductor Potentials & Dielectric Symmetries',
    description: 'High-yield masterclass on multi-sphere charge redistribution, cavity shielding, and shortcut pressure calculations.',
    topicsCovered: [
      'Symmetric Conductor Potentials',
      'Dielectric Boundary Boundary Conditions',
      'Multi-Sphere Charge Redistribution',
      'Shortcut Formula for Conductor Pressures'
    ],
    isFree: false,
    isRecording: true,
    recordingDurationMinutes: 48,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'Live_Notes_Electrostatics_Conductors_27Aug.pdf',
    attendanceStats: {
      totalEnrolled: 1600,
      presentCount: 1428,
      absentCount: 172,
      avgDurationMinutes: 78
    },
    remindersScheduled: [
      { timeOffset: '24 Hours Before', channels: ['push', 'email'], sent: true },
      { timeOffset: '1 Hour Before', channels: ['push', 'whatsapp'], sent: true },
      { timeOffset: '15 Minutes Before', channels: ['push', 'whatsapp', 'email'], sent: true },
      { timeOffset: 'Class Starting Now', channels: ['push', 'whatsapp'], sent: true }
    ]
  },
  {
    id: 'live-cls-ca-demo',
    title: '🌟 FREE Open Masterclass: CA Foundation BRS & 100% Score Strategy for Paper 1',
    courseId: 'crs-ca-foundation-package',
    courseTitle: 'CA Foundation Complete Video Course Package',
    batchName: 'National Open Commerce Masterclass',
    subject: 'Accounting',
    facultyName: 'CA CS Nitin Sharma',
    facultyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    status: 'live',
    scheduledTime: 'Today at 8:00 PM (Free Open Access)',
    date: '2026-08-27',
    startTime: '20:00',
    endTime: '21:15',
    durationMinutes: 75,
    attendeesCount: 2150,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    topic: 'BRS Adjusted Cashbook Method & Past ICAI Traps',
    description: 'Open to all commerce aspirants! Learn how to solve 10-mark BRS questions in under 7 minutes without making sign errors.',
    topicsCovered: [
      'Cashbook vs Passbook Reconciliation Logic',
      'Overdraft Treatment Shortcuts',
      'Uncollected vs Unpresented Cheque Nuances',
      'ICAI Step-Wise Marking Analysis'
    ],
    isFree: true,
    isRecording: true,
    recordingDurationMinutes: 32,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'CA_BRS_Live_Masterclass_Summary.pdf',
    attendanceStats: {
      totalEnrolled: 2500,
      presentCount: 2150,
      absentCount: 350,
      avgDurationMinutes: 62
    },
    remindersScheduled: [
      { timeOffset: '24 Hours Before', channels: ['push', 'email'], sent: true },
      { timeOffset: '1 Hour Before', channels: ['push', 'whatsapp'], sent: true },
      { timeOffset: '15 Minutes Before', channels: ['push', 'whatsapp'], sent: true },
      { timeOffset: 'Class Starting Now', channels: ['push'], sent: true }
    ]
  },
  {
    id: 'live-cls-2',
    title: 'Dr. Visionary: Human Circulatory System & Cardiac Cycle 3D Mechanism',
    courseId: 'crs-neet-vision',
    courseTitle: 'Dr. Visionary NEET UG 2026',
    batchName: 'AIIMS Star Batch',
    subject: 'Zoology',
    facultyName: 'Dr. Ananya Mukherjee',
    facultyAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    status: 'upcoming',
    scheduledTime: 'Tomorrow at 6:00 PM',
    date: '2026-08-28',
    startTime: '18:00',
    endTime: '19:15',
    durationMinutes: 75,
    attendeesCount: 980,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    topic: 'Cardiac Cycle & Electrocardiogram (ECG) Waves',
    description: '3D animated lecture detailing atrial systole, ventricular systole, isovolumetric relaxation, and pathological ECG rhythms.',
    topicsCovered: [
      'Pacemaker Action Potential',
      'ECG Waves Interpretation',
      'Cardiac Output Equations'
    ],
    isFree: false,
    isRecording: false,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'Cardiac_Cycle_3D_Diagrams_Notes.pdf',
    attendanceStats: {
      totalEnrolled: 1100,
      presentCount: 0,
      absentCount: 1100,
      avgDurationMinutes: 0
    },
    remindersScheduled: [
      { timeOffset: '24 Hours Before', channels: ['push', 'email'], sent: true },
      { timeOffset: '1 Hour Before', channels: ['push', 'whatsapp'], sent: false },
      { timeOffset: '15 Minutes Before', channels: ['push', 'whatsapp'], sent: false },
      { timeOffset: 'Class Starting Now', channels: ['push', 'whatsapp', 'email'], sent: false }
    ]
  },
  {
    id: 'live-cls-3',
    title: 'UPSC Samarth: Ethics Case Studies & Governance Accountability Analysis',
    courseId: 'crs-upsc-samarth',
    courseTitle: 'Samarth IAS - UPSC Prelims & Mains 2026',
    batchName: 'GS Mains Intensive Batch',
    subject: 'General Studies IV (Ethics)',
    facultyName: 'S. Vikramaditya',
    facultyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'upcoming',
    scheduledTime: 'Friday at 5:00 PM',
    date: '2026-08-29',
    startTime: '17:00',
    endTime: '19:00',
    durationMinutes: 120,
    attendeesCount: 650,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    topic: 'Administrative Ethics & Conflict of Interest Resolution',
    description: 'Structural breakdown of 20-mark Mains ethics case studies with ethical frameworks, constitutional principles, and stakeholders map.',
    topicsCovered: [
      'Civil Service Core Values',
      'Crisis Management in District Administration',
      'Framework for 20-Mark Case Studies'
    ],
    isFree: false,
    isRecording: false,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'UPSC_Ethics_Case_Study_Templates.pdf',
    attendanceStats: {
      totalEnrolled: 720,
      presentCount: 0,
      absentCount: 720,
      avgDurationMinutes: 0
    },
    remindersScheduled: [
      { timeOffset: '24 Hours Before', channels: ['push', 'email'], sent: false },
      { timeOffset: '1 Hour Before', channels: ['push', 'whatsapp'], sent: false },
      { timeOffset: '15 Minutes Before', channels: ['push', 'whatsapp'], sent: false },
      { timeOffset: 'Class Starting Now', channels: ['push', 'whatsapp'], sent: false }
    ]
  }
];

export const ATTENDANCE_RECORDS_DATA: LiveClassAttendanceRecord[] = [
  {
    id: 'att-1',
    liveClassId: 'live-cls-1',
    liveClassTitle: '🔴 LIVE: Electrostatics - High Voltage Problem Solving',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Morning Batch',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    joinTime: '19:30:14',
    leaveTime: '21:00:02',
    durationMinutes: 89,
    status: 'present',
    date: '2026-08-27',
    engagementScore: 96
  },
  {
    id: 'att-2',
    liveClassId: 'live-cls-1',
    liveClassTitle: '🔴 LIVE: Electrostatics - High Voltage Problem Solving',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Morning Batch',
    studentId: 'usr-student-02',
    studentName: 'Tanvi Nair',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    studentEmail: 'tanvi.nair@dcmaxwell.edu',
    studentPhone: '+91 98111 22334',
    joinTime: '19:31:05',
    leaveTime: '20:58:30',
    durationMinutes: 87,
    status: 'present',
    date: '2026-08-27',
    engagementScore: 98
  },
  {
    id: 'att-3',
    liveClassId: 'live-cls-1',
    liveClassTitle: '🔴 LIVE: Electrostatics - High Voltage Problem Solving',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Morning Batch',
    studentId: 'usr-student-03',
    studentName: 'Devansh Kulkarni',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    studentEmail: 'devansh.k@dcmaxwell.edu',
    studentPhone: '+91 97234 56789',
    joinTime: '19:48:22',
    leaveTime: '21:00:00',
    durationMinutes: 71,
    status: 'late',
    date: '2026-08-27',
    engagementScore: 82
  },
  {
    id: 'att-4',
    liveClassId: 'live-cls-1',
    liveClassTitle: '🔴 LIVE: Electrostatics - High Voltage Problem Solving',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Morning Batch',
    studentId: 'usr-student-04',
    studentName: 'Ishaan Verma',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    studentEmail: 'ishaan.v@dcmaxwell.edu',
    studentPhone: '+91 99887 66554',
    joinTime: '-',
    leaveTime: '-',
    durationMinutes: 0,
    status: 'absent',
    date: '2026-08-27',
    engagementScore: 0
  },
  {
    id: 'att-5',
    liveClassId: 'live-cls-ca-demo',
    liveClassTitle: '🌟 FREE Open Masterclass: CA Foundation BRS',
    courseTitle: 'CA Foundation Complete Video Course Package',
    batchName: 'National Open Commerce Masterclass',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    joinTime: '20:01:10',
    leaveTime: '21:14:45',
    durationMinutes: 73,
    status: 'present',
    date: '2026-08-27',
    engagementScore: 94
  }
];

export const LIVE_RECORDINGS_DATA: LiveClass[] = [
  {
    id: 'rec-1',
    title: 'Rotational Dynamics: Moment of Inertia of Complex Symmetrical Rigid Bodies',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Batch',
    subject: 'Physics',
    facultyName: 'Er. Rajeshwar Varma',
    facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'completed',
    scheduledTime: 'Broadcasted on Aug 25, 2026',
    date: '2026-08-25',
    startTime: '19:30',
    endTime: '21:00',
    durationMinutes: 90,
    attendeesCount: 1540,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    recordingDurationMinutes: 89,
    isRecordingPublished: true,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'Rotational_Dynamics_Lecture_Notes_25Aug.pdf',
    topic: 'Moment of Inertia Theorems & Cutout Problems',
    description: 'Parallel and perpendicular axis theorems applied to triangular laminas, hollow cones, and sector discs with cavity subtractions.',
    topicsCovered: [
      'Parallel Axis Theorem Generalization',
      'Cavity Method for Mass Distribution',
      'Calculus Derivation for Conical Shells'
    ],
    isFree: false
  },
  {
    id: 'rec-2',
    title: 'The Indian Contract Act 1872: Offer, Acceptance & Revocation Case Laws',
    courseId: 'crs-ca-foundation-package',
    courseTitle: 'CA Foundation Complete Video Course Package',
    batchName: 'National Rankers Batch',
    subject: 'Business Laws',
    facultyName: 'CA CS Nitin Sharma',
    facultyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    status: 'completed',
    scheduledTime: 'Broadcasted on Aug 24, 2026',
    date: '2026-08-24',
    startTime: '18:00',
    endTime: '19:20',
    durationMinutes: 80,
    attendeesCount: 2210,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    recordingDurationMinutes: 79,
    isRecordingPublished: true,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'Contract_Act_Offer_Acceptance_Case_Briefs.pdf',
    topic: 'Carlill vs Carbolic Smoke Ball Co. & Harvey vs Facey Principles',
    description: 'Master practical case law presentation structure for ICAI descriptive questions, rules of valid acceptance, and postal rule exceptions.',
    topicsCovered: [
      'General vs Specific Offer Distinction',
      'Postal Rule of Acceptance Timing',
      'Communication of Revocation Rules'
    ],
    isFree: true
  },
  {
    id: 'rec-3',
    title: 'Electrochemistry: Nernst Equation, Galvanic Cells & Concentration Cells',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    batchName: 'Pinnacle Super-50 Batch',
    subject: 'Chemistry',
    facultyName: 'Dr. Vivek Mehra',
    facultyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'completed',
    scheduledTime: 'Broadcasted on Aug 23, 2026',
    date: '2026-08-23',
    startTime: '17:00',
    endTime: '18:30',
    durationMinutes: 90,
    attendeesCount: 1380,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    recordingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    recordingDurationMinutes: 88,
    isRecordingPublished: true,
    classNotesPdfUrl: '#',
    classNotesPdfTitle: 'Nernst_Equation_Advanced_Numericals.pdf',
    topic: 'EMF vs pH Calculations & Solubility Product Titrations',
    description: 'Determination of equilibrium constant K_eq, Gibbs free energy relationship with cell EMF, and concentration cell boundary dynamics.',
    topicsCovered: [
      'Nernst Equation Standard Reductions',
      'Ksp Calculation via Potentiometric Cell',
      'Concentration Overpotentials'
    ],
    isFree: false
  }
];

export const LIVE_REMINDERS_DATA: LiveClassReminder[] = [
  {
    id: 'rem-1',
    liveClassId: 'live-cls-1',
    liveClassTitle: 'Electrostatics - High Voltage Problem Solving',
    batchName: 'Pinnacle Super-50 Morning Batch',
    facultyName: 'Er. Rajeshwar Varma',
    scheduledTime: 'Today at 7:30 PM',
    reminderType: '15_minutes',
    channels: ['push', 'whatsapp', 'email'],
    status: 'sent',
    messageText: '🔔 Reminder: Live Class on Electrostatics starts in 15 minutes! Please have your formula notebook and calculator ready.',
    sentAt: '19:15:00'
  },
  {
    id: 'rem-2',
    liveClassId: 'live-cls-ca-demo',
    liveClassTitle: 'CA Foundation BRS & 100% Score Strategy',
    batchName: 'National Open Commerce Masterclass',
    facultyName: 'CA CS Nitin Sharma',
    scheduledTime: 'Today at 8:00 PM',
    reminderType: '1_hour',
    channels: ['push', 'whatsapp'],
    status: 'sent',
    messageText: '🌟 CA Foundation Open Masterclass starts at 8:00 PM. Tap to join the live broadcast room for free!',
    sentAt: '19:00:00'
  },
  {
    id: 'rem-3',
    liveClassId: 'live-cls-2',
    liveClassTitle: 'Human Circulatory System & Cardiac Cycle 3D Mechanism',
    batchName: 'AIIMS Star Batch',
    facultyName: 'Dr. Ananya Mukherjee',
    scheduledTime: 'Tomorrow at 6:00 PM',
    reminderType: '24_hours',
    channels: ['push', 'email'],
    status: 'scheduled',
    messageText: 'Dr. Visionary NEET: Cardiac Cycle 3D Mechanism scheduled for tomorrow at 6:00 PM.'
  }
];

export const QUESTION_BANK_DATA: Question[] = [
  // 1. Single Choice MCQ (Physics)
  {
    id: 'qb-phy-01',
    subject: 'Physics',
    chapter: 'Electrostatics',
    topic: 'Conductor Potentials',
    type: 'single_choice',
    difficulty: 'Medium',
    marks: 4,
    negativeMarks: 1,
    questionText: 'A point charge +Q is positioned at the center of an uncharged conducting spherical shell of inner radius R1 and outer radius R2. What is the electric field intensity at distance r where R1 < r < R2 in the bulk conductor?',
    options: [
      'Zero (Due to electrostatic shielding in the bulk of the conductor)',
      'kQ / r²',
      'kQ / R1²',
      'kQ / (R2 - R1)²'
    ],
    correctAnswer: 0,
    explanation: 'Inside a conducting material in electrostatic equilibrium, free electrons redistribute on the surfaces such that the net electric field everywhere inside the conductor bulk (R1 < r < R2) is identically zero.',
    hint: 'Recall that inside the bulk metal of any conductor in equilibrium, E = 0.',
    usedInTests: ['DC Maxwell All-India Major Mock Test 01', 'JEE Physics Mechanics & Electrostatics Chapter Test']
  },

  // 2. Multiple Correct MCQ (Accounting)
  {
    id: 'qb-acc-01',
    subject: 'Accounting',
    chapter: 'Bank Reconciliation Statement',
    topic: 'Adjusted Cashbook & Differences',
    type: 'multiple_choice',
    difficulty: 'Medium',
    marks: 4,
    negativeMarks: 1,
    questionText: 'Which of the following items require an adjustment in the Cash Book BEFORE preparing the final Bank Reconciliation Statement (BRS)? (Select ALL correct options)',
    options: [
      'Bank charges directly debited by bank not yet recorded in Cash Book',
      'Dividend directly collected and credited by the bank',
      'Cheques issued to suppliers but not yet presented for payment',
      'Direct payment made by a customer into the bank account'
    ],
    correctAnswer: [0, 1, 3],
    explanation: 'Under the Adjusted Cash Book method, all transactions already processed by the bank that are authentic but not yet recorded in the entity cash book (bank charges, direct collections, direct customer deposits) must first be updated in the cash book. Cheques issued but not presented (Option C) are timing differences that belong solely in the BRS.',
    hint: 'Differentiate between unrecorded genuine bank transactions vs external timing transit differences.',
    usedInTests: ['CA Foundation Accounts Paper 1 Full Syllabus Mock', 'BRS & Depreciation Chapter Test']
  },

  // 3. True / False (Business Laws)
  {
    id: 'qb-law-01',
    subject: 'Business Laws',
    chapter: 'The Indian Contract Act, 1872',
    topic: 'Consideration & Privity of Contract',
    type: 'true_false',
    difficulty: 'Easy',
    marks: 2,
    negativeMarks: 0.5,
    questionText: 'Under the Indian Contract Act 1872, consideration for a promise may move from the promisee OR any other third person (Stranger to Consideration).',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'TRUE: In Indian law (unlike English Common Law), as per Section 2(d) of the Indian Contract Act 1872, consideration may proceed from the promisee or any other person (Chinnaya v. Ramayya). Hence, a stranger to consideration can enforce the promise if they are a party to the contract.',
    hint: 'Consider Section 2(d) and the landmark Chinnaya v. Ramayya case.',
    usedInTests: ['CA Foundation Law Fastrack Revision Test']
  },

  // 4. Fill in the Blank (Chemistry)
  {
    id: 'qb-chem-01',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    topic: 'Gibbs Free Energy & Spontaneity',
    type: 'fill_blank',
    difficulty: 'Easy',
    marks: 3,
    negativeMarks: 0,
    questionText: 'At constant temperature and pressure, a chemical reaction is thermodynamically spontaneous when the change in Gibbs Free Energy (ΔG) is _______ (positive / negative / zero).',
    correctAnswer: 'negative',
    explanation: 'For any spontaneous natural process occurring at constant T and P, the Gibbs free energy change must be negative (ΔG < 0), signifying a decrease in free energy.',
    hint: 'ΔG = ΔH - TΔS < 0 for spontaneity.',
    usedInTests: ['JEE Chemistry Thermodynamics Chapter Test']
  },

  // 5. Match the Following (Mathematics / Calculus)
  {
    id: 'qb-math-01',
    subject: 'Mathematics',
    chapter: 'Integral Calculus & Standard Forms',
    topic: 'Standard Integrals',
    type: 'match_following',
    difficulty: 'Hard',
    marks: 4,
    negativeMarks: 1,
    questionText: 'Match each standard calculus indefinite integral in Column A with its exact analytical evaluated form in Column B:',
    matchPairs: [
      { leftKey: '1', leftText: '∫ 1 / (a² + x²) dx', rightKey: 'A', rightText: '(1/a) · arctan(x/a) + C' },
      { leftKey: '2', leftText: '∫ 1 / √(a² - x²) dx', rightKey: 'B', rightText: 'arcsin(x/a) + C' },
      { leftKey: '3', leftText: '∫ 1 / (x² - a²) dx', rightKey: 'C', rightText: '(1/2a) · ln|(x-a)/(x+a)| + C' },
      { leftKey: '4', leftText: '∫ √(a² - x²) dx', rightKey: 'D', rightText: '(x/2)√(a²-x²) + (a²/2)arcsin(x/a) + C' }
    ],
    correctAnswer: { '1': 'A', '2': 'B', '3': 'C', '4': 'D' },
    explanation: 'Standard integration formulas derived via trigonometric substitutions: x = a·tan(θ), x = a·sin(θ), and partial fraction decomposition.',
    hint: 'Use standard inverse trigonometric substitution identities.',
    usedInTests: ['DC Maxwell All-India Major Mock Test 01', 'JEE Advanced Mathematics Full Syllabus Test']
  },

  // 6. Numerical Answer (Physics)
  {
    id: 'qb-phy-02',
    subject: 'Physics',
    chapter: 'Mechanics & Gravitation',
    topic: 'Conservative Forces & Potential Energy',
    type: 'numerical',
    difficulty: 'Medium',
    marks: 4,
    negativeMarks: 0,
    questionText: 'A particle of mass 2 kg moves along the x-axis under the conservative potential energy function U(x) = 3x² - 12x + 15 (in Joules). Calculate the equilibrium coordinate position x (in meters).',
    correctAnswer: '2',
    numericalTolerance: 0.05,
    numericalUnits: 'meters',
    explanation: 'At equilibrium, conservative force F = -dU/dx = 0. dU/dx = 6x - 12 = 0 => 6x = 12 => x = 2 meters. Since d²U/dx² = 6 > 0, this corresponds to a point of stable equilibrium.',
    hint: 'Set the first spatial derivative of the potential energy to zero.',
    usedInTests: ['DC Maxwell All-India Major Mock Test 01']
  },

  // 7. Subjective / Descriptive Answer (CA Foundation Business Laws / Accounts)
  {
    id: 'qb-sub-01',
    subject: 'Business Laws',
    chapter: 'The Companies Act, 2013',
    topic: 'Corporate Veil Doctrine',
    type: 'subjective_descriptive',
    difficulty: 'Hard',
    marks: 6,
    negativeMarks: 0,
    maxWords: 250,
    correctAnswer: 'Descriptive Model Answer based on Salomon Case & Lifting Exceptions',
    questionText: 'Explain the doctrine of "Lifting the Corporate Veil" under the Companies Act, 2013. State any THREE exceptional circumstances where courts disregard the separate legal entity principle.',
    subjectiveModelAnswer: `1. Principle: A company is a separate legal entity distinct from its members (Salomon v. Salomon & Co. Ltd). However, when this corporate facade is misused for fraudulent or improper purposes, courts look behind the entity to hold real individuals liable.\n\n2. Key Exceptional Grounds for Lifting the Veil:\n- Protection of Revenue (Sir Dinshaw Maneckjee Petit Case): When a company is formed solely to evade taxes or defraud the exchequer.\n- Prevention of Fraud or Improper Conduct (Gilford Motor Co. v. Horne): Where the company is a mere sham or cloak to violate non-compete agreements.\n- Determination of Enemy Character (Daimler Co. Ltd. v. Continental Tyre & Rubber Co.): During wartime, to check if controlling shareholders reside in enemy territory.\n- Avoidance of Welfare Legislation: When companies are created to siphon profits and reduce statutory bonus liabilities.`,
    subjectiveKeywords: [
      'Salomon v. Salomon',
      'Separate Legal Entity',
      'Protection of Revenue',
      'Prevention of Fraud',
      'Enemy Character',
      'Sham or Cloak'
    ],
    explanation: 'The doctrine balances the statutory benefit of limited liability with judicial equity to prevent corporate disguise of illegal acts.',
    hint: 'Mention landmark Salomon case and list grounds: Tax Evasion, Fraud, Enemy Character.',
    usedInTests: ['CA Foundation Law & Business Communication Full Subject Test']
  },

  // 8. Single Choice MCQ (Biology / NEET)
  {
    id: 'qb-bio-01',
    subject: 'Biology',
    chapter: 'Human Physiology',
    topic: 'Circulatory System',
    type: 'single_choice',
    difficulty: 'Easy',
    marks: 4,
    negativeMarks: 1,
    questionText: 'Which electrical event in a standard human Electrocardiogram (ECG) corresponds to the depolarization of the ventricles?',
    options: [
      'QRS Complex',
      'P Wave',
      'T Wave',
      'P-R Interval'
    ],
    correctAnswer: 0,
    explanation: 'The QRS complex represents ventricular depolarization, which initiates ventricular contraction. The P wave represents atrial depolarization, and the T wave represents ventricular repolarization.',
    hint: 'Look for the sharpest, highest amplitude spike in the ECG.',
    usedInTests: ['DC Maxwell All-India NEET Speed Booster Mock 01']
  },

  // 9. Single Choice MCQ (Quantitative Aptitude / CA Foundation)
  {
    id: 'qb-math-ca-01',
    subject: 'Mathematics',
    chapter: 'Time Value of Money',
    topic: 'Compound Interest & Annuities',
    type: 'single_choice',
    difficulty: 'Medium',
    marks: 4,
    negativeMarks: 1,
    questionText: 'What is the effective annual rate of interest corresponding to a nominal rate of 8% per annum compounded quarterly?',
    options: [
      '8.24%',
      '8.16%',
      '8.00%',
      '8.32%'
    ],
    correctAnswer: 0,
    explanation: 'Effective Rate E = (1 + r/m)^m - 1 = (1 + 0.08/4)^4 - 1 = (1.02)^4 - 1 = 1.082432 - 1 = 8.24%.',
    hint: 'Use the effective rate formula E = (1 + i)^n - 1 where i = 0.08/4 = 0.02 and n = 4.',
    usedInTests: ['CA Foundation Quantitative Aptitude Subject Test']
  }
];

export const TEST_SERIES_DATA: TestSeriesExam[] = [
  // Test Series Type 1: Chapter Test (CA Foundation)
  {
    id: 'test-ca-chapter-01',
    title: 'CA Foundation Accounts: Bank Reconciliation Statement (BRS) Chapter Test',
    category: 'CA & Commerce (Foundation/Inter)',
    testType: 'chapter_test',
    targetExam: 'CA Foundation Paper 1',
    subjectName: 'Accounting',
    chapterName: 'Bank Reconciliation Statement',
    totalQuestions: 5,
    durationMinutes: 30,
    totalMarks: 20,
    passingMarks: 8,
    negativeMarking: true,
    attemptsCount: 3140,
    isFree: true,
    deadline: 'Always Available (Self-Paced)',
    instructions: [
      'Focuses strictly on ICAI BRS mechanics and adjusted cashbook techniques.',
      '+4 Marks for correct answer, -1 Mark for incorrect answer in MCQs.',
      'Review detailed step-wise explanations upon test submission.'
    ],
    sections: [
      {
        name: 'BRS Concepts & Practical Problem Solving',
        questions: [
          QUESTION_BANK_DATA[1], // multiple choice MCQ
          {
            id: 'q-ca-brs-single',
            subject: 'Accounting',
            chapter: 'Bank Reconciliation Statement',
            topic: 'Overdraft Balance',
            type: 'single_choice',
            difficulty: 'Easy',
            marks: 4,
            negativeMarks: 1,
            questionText: 'When preparing a BRS starting with an overdraft as per Cash Book, cheques deposited into bank but not yet collected by bank should be:',
            options: [
              'Added to the overdraft balance',
              'Deducted from the overdraft balance',
              'Ignored completely',
              'Credited to customer ledger'
            ],
            correctAnswer: 0,
            explanation: 'When cheques are deposited, the cash book assumes money is received (reducing the overdraft). Since the bank has not collected it yet, the bank passbook overdraft is higher. To reconcile, we must ADD it to the cash book overdraft balance.',
            hint: 'Think about how the passbook balance compares to the cashbook.'
          },
          {
            id: 'q-ca-brs-tf',
            subject: 'Accounting',
            chapter: 'Bank Reconciliation Statement',
            topic: 'Nature of BRS',
            type: 'true_false',
            difficulty: 'Easy',
            marks: 2,
            negativeMarks: 0.5,
            questionText: 'A Bank Reconciliation Statement is a ledger account that forms part of the double-entry bookkeeping system.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            explanation: 'FALSE: A BRS is merely an explanatory memorandum statement prepared periodically to reconcile balances, and is NOT a ledger account in double entry books.',
            hint: 'Is BRS an account or a memorandum statement?'
          },
          {
            id: 'q-ca-brs-num',
            subject: 'Accounting',
            chapter: 'Bank Reconciliation Statement',
            topic: 'BRS Calculation',
            type: 'numerical',
            difficulty: 'Medium',
            marks: 4,
            negativeMarks: 0,
            questionText: 'Balance as per Cash Book is ₹10,000. Cheques issued for ₹3,000 were not presented. Cheques deposited for ₹2,000 were not credited. Direct bank interest credited is ₹500. Calculate the final balance as per Pass Book (in Rupees).',
            correctAnswer: '11500',
            numericalTolerance: 0,
            numericalUnits: 'Rupees',
            explanation: 'Pass Book Balance = 10,000 (Cash Book) + 3,000 (Unpresented Cheques) - 2,000 (Uncredited Cheques) + 500 (Bank Interest) = ₹11,500.',
            hint: '10000 + 3000 - 2000 + 500'
          },
          {
            id: 'q-ca-brs-fill',
            subject: 'Accounting',
            chapter: 'Bank Reconciliation Statement',
            topic: 'Passbook Overdraft',
            type: 'fill_blank',
            difficulty: 'Easy',
            marks: 2,
            negativeMarks: 0,
            questionText: 'An overdraft balance in the Bank Pass Book indicates a _______ (debit / credit) balance from the account holder perspective.',
            correctAnswer: 'debit',
            explanation: 'In the bank passbook, an overdraft is represented as a Debit balance (as the bank has given an advance to the customer).',
            hint: 'From the bank books, customer owes money.'
          }
        ]
      }
    ]
  },

  // Test Series Type 2: Subject Test (CA Foundation Paper 2)
  {
    id: 'test-ca-subject-01',
    title: 'CA Foundation Business Laws & Communication Full Subject Test (100 Marks Simulation)',
    category: 'CA & Commerce (Foundation/Inter)',
    testType: 'subject_test',
    targetExam: 'CA Foundation Paper 2',
    subjectName: 'Business Laws & Business Correspondence',
    totalQuestions: 6,
    durationMinutes: 60,
    totalMarks: 50,
    passingMarks: 20,
    negativeMarking: true,
    attemptsCount: 2890,
    isFree: true,
    deadline: 'Open Till Nov 2026',
    instructions: [
      'Comprehensive coverage of Indian Contract Act, Sale of Goods Act, Partnership Act, and Companies Act.',
      'Includes both Objective and Subjective Case Law analysis questions.'
    ],
    sections: [
      {
        name: 'Section A: Objective Legal Principles',
        questions: [
          QUESTION_BANK_DATA[2], // True/False Contract Act
          {
            id: 'q-law-soga',
            subject: 'Business Laws',
            chapter: 'Sale of Goods Act, 1930',
            topic: 'Conditions & Warranties',
            type: 'single_choice',
            difficulty: 'Medium',
            marks: 4,
            negativeMarks: 1,
            questionText: 'Under the Sale of Goods Act 1930, a breach of condition entitles the aggrieved buyer to:',
            options: [
              'Repudiate the entire contract and claim damages',
              'Claim damages only, without rejecting the goods',
              'File a criminal complaint',
              'Demand double compensation'
            ],
            correctAnswer: 0,
            explanation: 'A condition is a stipulation essential to the main purpose of the contract. Its breach gives the aggrieved party the right to treat the contract as repudiated and also recover damages.',
            hint: 'Compare remedy for breach of condition vs breach of warranty.'
          },
          {
            id: 'q-law-match',
            subject: 'Business Laws',
            chapter: 'General Legal Doctrines',
            topic: 'Landmark Legal Maxims',
            type: 'match_following',
            difficulty: 'Hard',
            marks: 4,
            negativeMarks: 1,
            questionText: 'Match each Latin legal maxim in Column A with its exact statutory meaning in Column B:',
            matchPairs: [
              { leftKey: '1', leftText: 'Caveat Emptor', rightKey: 'A', rightText: 'Let the buyer beware' },
              { leftKey: '2', leftText: 'Nemo Dat Quod Non Habet', rightKey: 'B', rightText: 'No one can transfer a better title than he himself has' },
              { leftKey: '3', leftText: 'Quid Pro Quo', rightKey: 'C', rightText: 'Something in return (Consideration)' },
              { leftKey: '4', leftText: 'Consensus Ad Idem', rightKey: 'D', rightText: 'Meeting of minds upon the same thing in the same sense' }
            ],
            correctAnswer: { '1': 'A', '2': 'B', '3': 'C', '4': 'D' },
            explanation: 'Foundational statutory maxims under Contract Act and Sale of Goods Act.',
            hint: 'Caveat Emptor = Buyer Beware.'
          }
        ]
      },
      {
        name: 'Section B: Subjective Case Law Analysis',
        questions: [
          QUESTION_BANK_DATA[6] // Subjective lifting corporate veil
        ]
      }
    ]
  },

  // Test Series Type 3: Revision Test (JEE Formula Speed Booster)
  {
    id: 'test-jee-revision-01',
    title: 'Pinnacle JEE: Mid-Term Fastrack Formula Revision Test (Physics + Chem + Maths)',
    category: 'JEE (Main & Adv)',
    testType: 'revision_test',
    targetExam: 'JEE Main 2026',
    totalQuestions: 6,
    durationMinutes: 45,
    totalMarks: 24,
    passingMarks: 10,
    negativeMarking: true,
    attemptsCount: 5420,
    isFree: true,
    deadline: 'Weekly Revision Drill',
    instructions: [
      'Rapid-fire concept recall test across 11th & 12th standard high-weightage formulas.',
      'Timer: 45 Minutes. Target: 100% accuracy.'
    ],
    sections: [
      {
        name: 'Physics & Chemistry Revision',
        questions: [
          QUESTION_BANK_DATA[0], // Physics Single Choice
          QUESTION_BANK_DATA[3], // Chemistry Fill in the Blank
          QUESTION_BANK_DATA[5]  // Physics Numerical Answer
        ]
      },
      {
        name: 'Mathematics Revision',
        questions: [
          QUESTION_BANK_DATA[4], // Match the Following Integrals
          {
            id: 'q-math-rev-num',
            subject: 'Mathematics',
            chapter: 'Vector Algebra',
            topic: 'Perpendicular Vectors',
            type: 'numerical',
            difficulty: 'Easy',
            marks: 4,
            negativeMarks: 0,
            questionText: 'If vectors a = 2i + 3j - k and b = pi - 2j + 4k are perpendicular, find the value of scalar p.',
            correctAnswer: '5',
            numericalTolerance: 0,
            explanation: 'a · b = 0 => 2p - 6 - 4 = 0 => 2p = 10 => p = 5.',
            hint: 'Dot product of orthogonal vectors is zero.'
          }
        ]
      }
    ]
  },

  // Test Series Type 4: Mock Test (NEET All India Speed Booster)
  {
    id: 'test-neet-mock-01',
    title: 'DC Maxwell All-India Open Mock Test #03 - NEET Full Syllabus Speed Booster',
    category: 'NEET (Medical)',
    testType: 'mock_test',
    targetExam: 'NEET UG 2026',
    totalQuestions: 8,
    durationMinutes: 45,
    totalMarks: 32,
    passingMarks: 12,
    negativeMarking: true,
    attemptsCount: 6890,
    isFree: true,
    deadline: 'All-India Live Ranking Active',
    instructions: [
      'NCERT Line-by-Line Biology, Chemistry Reactions, and Physics numericals.',
      'Instant All-India Percentile & AIR calculation upon submission.'
    ],
    sections: [
      {
        name: 'Biology (Botany & Zoology)',
        questions: [
          QUESTION_BANK_DATA[7], // Biology Single Choice
          {
            id: 'q-neet-genetics',
            subject: 'Biology',
            chapter: 'Genetics & Evolution',
            topic: 'Mendelian Cross',
            type: 'single_choice',
            difficulty: 'Easy',
            marks: 4,
            negativeMarks: 1,
            questionText: 'In a classic Mendelian dihybrid cross, what is the expected phenotypic ratio in the F2 generation assuming independent assortment of genes?',
            options: [
              '9 : 3 : 3 : 1',
              '1 : 2 : 1',
              '9 : 7',
              '12 : 3 : 1'
            ],
            correctAnswer: 0,
            explanation: 'Under Mendel Law of Independent Assortment, the dihybrid F2 phenotypic ratio for two unlinked traits is 9:3:3:1.',
            hint: 'Standard Mendelian dihybrid ratio.'
          },
          {
            id: 'q-neet-tf-1',
            subject: 'Biology',
            chapter: 'Human Physiology',
            topic: 'Respiration',
            type: 'true_false',
            difficulty: 'Easy',
            marks: 2,
            negativeMarks: 0.5,
            questionText: 'In human respiration, the primary pacemaker for normal quiet breathing rhythm is located in the Medulla Oblongata of the brain.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            explanation: 'TRUE: The respiratory rhythm center is situated in the medulla region of the brain, which is primarily responsible for basic autonomic breathing rhythm regulation.',
            hint: 'Location of respiratory rhythm center.'
          }
        ]
      }
    ]
  },

  // Test Series Type 5: Full Syllabus Test (JEE Advanced Mega Simulation)
  {
    id: 'test-jee-major-01',
    title: 'DC Maxwell All-India Major Mock Test 01 - JEE Advanced Full Syllabus Simulation',
    category: 'JEE (Main & Adv)',
    testType: 'full_syllabus_test',
    targetExam: 'JEE Advanced 2026',
    totalQuestions: 6,
    durationMinutes: 60,
    totalMarks: 24,
    passingMarks: 10,
    negativeMarking: true,
    attemptsCount: 4120,
    isFree: true,
    deadline: 'Open Till March 30, 2026',
    instructions: [
      'Comprehensive Full Syllabus Paper 1 Simulation.',
      'Combines Single Choice, Multiple Choice, Match the Following, and Numerical response questions.'
    ],
    sections: [
      {
        name: 'Physics Section',
        questions: [
          QUESTION_BANK_DATA[0],
          QUESTION_BANK_DATA[5]
        ]
      },
      {
        name: 'Chemistry Section',
        questions: [
          QUESTION_BANK_DATA[3],
          {
            id: 'q-chem-iodo',
            subject: 'Chemistry',
            chapter: 'Organic Chemistry',
            topic: 'Functional Group Tests',
            type: 'single_choice',
            difficulty: 'Medium',
            marks: 4,
            negativeMarks: 1,
            questionText: 'Which of the following organic compounds yields a positive Iodoform test (yellow precipitate of CHI3 with I2/NaOH)?',
            options: [
              'Acetophenone (C6H5COCH3)',
              'Benzophenone (C6H5COC6H5)',
              'Methanol (CH3OH)',
              '3-Pentanone (CH3CH2COCH2CH3)'
            ],
            correctAnswer: 0,
            explanation: 'The Iodoform test is given by compounds possessing a CH3-C=O (methyl ketone) or CH3-CH(OH)- group. Acetophenone contains a methyl ketone group attached to the benzene ring.',
            hint: 'Look for a methyl carbonyl group.'
          }
        ]
      },
      {
        name: 'Mathematics Section',
        questions: [
          QUESTION_BANK_DATA[4],
          {
            id: 'q-math-calculus-king',
            subject: 'Mathematics',
            chapter: 'Integral Calculus',
            topic: 'Definite Integrals',
            type: 'single_choice',
            difficulty: 'Hard',
            marks: 4,
            negativeMarks: 1,
            questionText: 'Evaluate the definite integral: I = ∫[0 to π/2] (sin³(x) / (sin³(x) + cos³(x))) dx',
            options: [
              'π / 4',
              'π / 2',
              '1',
              'π / 8'
            ],
            correctAnswer: 0,
            explanation: 'Applying King property f(x) -> f(a+b-x) gives 2I = ∫[0 to π/2] 1 dx = π/2 => I = π/4.',
            hint: 'Use the King property symmetry.'
          }
        ]
      }
    ]
  }
];

export const STUDY_MATERIALS_DATA: StudyMaterialItem[] = [
  {
    id: 'mat-1',
    title: 'Formula Bible: Complete Physics for JEE Advanced (Mechanics to Modern)',
    subject: 'Physics',
    category: 'JEE (Main & Adv)',
    type: 'PDF Formula Sheet',
    fileSize: '4.8 MB',
    pagesCount: 64,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 18450,
    authorFaculty: 'Er. Rajeshwar Varma',
    updatedDate: 'Feb 2026'
  },
  {
    id: 'mat-2',
    title: 'NCERT Microscopic Flashcards & High-Yield Diagrams (Botany + Zoology)',
    subject: 'Biology',
    category: 'NEET (Medical)',
    type: 'Handwritten Notes',
    fileSize: '12.2 MB',
    pagesCount: 112,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 29800,
    authorFaculty: 'Dr. Ananya Mukherjee',
    updatedDate: 'Jan 2026'
  },
  {
    id: 'mat-3',
    title: 'Organic Chemistry Reaction Roadmap & Named Reactions with Mechanism',
    subject: 'Chemistry',
    category: 'JEE (Main & Adv)',
    type: 'Mind Map',
    fileSize: '3.4 MB',
    pagesCount: 28,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 22100,
    authorFaculty: 'Prof. Neha Singhal',
    updatedDate: 'Feb 2026'
  },
  {
    id: 'mat-4',
    title: 'UPSC 10-Year Topic-Wise Solved Mains GS Paper II & Polity Archive',
    subject: 'Indian Polity & Governance',
    category: 'UPSC & Civil Services',
    type: 'Previous Year Question (PYQ)',
    fileSize: '18.5 MB',
    pagesCount: 180,
    downloadUrl: '#',
    isFree: false,
    downloadsCount: 9400,
    authorFaculty: 'S. Vikramaditya',
    updatedDate: 'Jan 2026'
  },
  {
    id: 'mat-5',
    title: 'Calculus 500 Toughest Problems with Rigorous Step Solutions',
    subject: 'Mathematics',
    category: 'JEE (Main & Adv)',
    type: 'Assignment Sheet',
    fileSize: '8.1 MB',
    pagesCount: 95,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 14200,
    authorFaculty: 'Er. Alok Srivastava',
    updatedDate: 'Feb 2026'
  }
];

export const DOUBTS_DATA: DoubtItem[] = [
  {
    id: 'dbt-1',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    studentId: 'usr-student-01',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026',
    subject: 'Physics',
    questionText: 'Why is the electric field inside an irregular hollow conductor with a cavity always zero when there are no charges inside the cavity?',
    status: 'answered',
    createdAt: '2 hours ago',
    facultyReply: {
      facultyName: 'Er. Rajeshwar Varma',
      facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      repliedAt: '1 hour ago',
      text: 'Great question, Aarav! By Gauss law, if you take any closed Gaussian surface enclosing the empty cavity within the conductor metal, E = 0 everywhere on that surface. Hence flux = 0, implying q_enclosed = 0. Furthermore, since the entire inner surface of the conductor is an equipotential surface (V = const), there can be no potential gradient inside, meaning E = -∇V = 0 everywhere inside the empty cavity.',
      formulaOrExplanation: 'V_inner_surface = V_cavity = Constant ⟹ E = -∇V = 0'
    },
    aiSuggestion: 'Key Concept: Faraday Cage Effect / Electrostatic Shielding.'
  },
  {
    id: 'dbt-2',
    studentName: 'Pooja Verma',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    studentId: 'usr-student-02',
    courseTitle: 'Dr. Visionary NEET UG 2026',
    subject: 'Biology',
    questionText: 'In Human Physiology, what triggers the opening of the Semilunar valves during the cardiac ventricular cycle?',
    status: 'unresolved',
    createdAt: '30 mins ago',
    aiSuggestion: 'During ventricular systole, when the intraventricular pressure exceeds the aortic pressure (~80 mmHg in left ventricle / ~10 mmHg in right ventricle), the semilunar valves are forced open.'
  }
];

export const ASSIGNMENTS_DATA: AssignmentItem[] = [
  {
    id: 'asn-1',
    title: 'DPP-04: Advanced Gauss Law & Boundary Condition Equations',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced 2026',
    subject: 'Physics',
    dueDate: 'Tomorrow at 11:59 PM',
    totalPoints: 100,
    description: 'Solve the attached 10 subjective problems with detailed free-body diagrams and electric field vector integrals.',
    attachmentName: 'DPP_04_Gauss_Law_Problems.pdf',
    submissionStatus: 'submitted',
    studentSubmission: {
      submittedAt: 'Today at 3:15 PM',
      fileName: 'Aarav_Sharma_DPP04_Solution.pdf',
      fileSize: '2.4 MB',
      notes: 'Solved all 10 problems with step-by-step vector proofs.'
    }
  },
  {
    id: 'asn-2',
    title: 'Weekly Answer Writing: Essay on "Ethical Dilemmas in AI Governance"',
    courseId: 'crs-upsc-samarth',
    courseTitle: 'Samarth IAS Foundation 2026',
    subject: 'Ethics & Essay',
    dueDate: 'March 2, 2026',
    totalPoints: 250,
    description: 'Write a structured 1200-word essay incorporating Kantian ethics, utilitarianism, and Indian constitutional morals.',
    attachmentName: 'Essay_Brief_AI_Ethics.pdf',
    submissionStatus: 'pending'
  }
];

export const CRM_LEADS_DATA: LeadItem[] = [
  {
    id: 'lead-1',
    studentName: 'Rohan Gupta',
    phone: '+91 98112 34567',
    email: 'rohan.gupta99@gmail.com',
    city: 'Jaipur, Rajasthan',
    targetCourse: 'Pinnacle JEE Advanced 2026',
    source: 'Google',
    stage: 'Demo Scheduled',
    counsellorName: 'Priya Mehra',
    followUpDate: '2026-03-05',
    remarks: 'Attended physics demo with Er. Rajeshwar Varma; highly enthusiastic. Callback scheduled for fee payment option.',
    createdAt: 'Feb 24, 2026',
    lastFollowUp: 'Today at 11:00 AM',
    notes: [
      'Student currently in Class 11 moving to 12.',
      'Interested in scholarship test discount.',
      'Attended physics demo lecture with Er. Rajeshwar Varma; expressed high satisfaction.'
    ],
    dealValue: 14999
  },
  {
    id: 'lead-2',
    studentName: 'Dr. Sneha Reddy (Parent)',
    phone: '+91 98450 12345',
    email: 'sneha.reddy.md@yahoo.com',
    city: 'Hyderabad, Telangana',
    targetCourse: 'Dr. Visionary NEET UG 2026',
    source: 'Website',
    stage: 'New Enquiry',
    counsellorName: 'Vikram Joshi',
    followUpDate: '2026-03-04',
    remarks: 'Inquired on website chat about hardcopy study modules and test series timetable.',
    createdAt: 'Feb 26, 2026',
    lastFollowUp: 'Yesterday',
    notes: [
      'Parent inquiring about printed hardcopy books and daily test series timetable for their daughter.'
    ],
    dealValue: 11999
  },
  {
    id: 'lead-3',
    studentName: 'Kunal Deshmukh',
    phone: '+91 97234 56789',
    email: 'kunal.deshmukh@outlook.com',
    city: 'Pune, Maharashtra',
    targetCourse: 'Samarth IAS - UPSC 2026',
    source: 'Referral',
    stage: 'Enrolled',
    counsellorName: 'Priya Mehra',
    followUpDate: '2026-03-10',
    remarks: 'Referred by AIR 48 alumni Kunal Kulkarni. Paid annual tuition via UPI. Onboarding batch allocated.',
    createdAt: 'Feb 20, 2026',
    lastFollowUp: 'Feb 25, 2026',
    notes: [
      'Payment verified via NetBanking.',
      'Batch access granted with hardcopy books dispatch initiated.'
    ],
    dealValue: 21999
  },
  {
    id: 'lead-4',
    studentName: 'Ananya Sen',
    phone: '+91 98301 23456',
    email: 'ananya.sen.kolkata@gmail.com',
    city: 'Kolkata, West Bengal',
    targetCourse: 'Pinnacle JEE Advanced 2026',
    source: 'Instagram',
    stage: 'Interested',
    counsellorName: 'Priya Mehra',
    followUpDate: '2026-03-04',
    remarks: 'Clicked Instagram reel on Rotation shortcut trick. Requested syllabus PDF and scholarship exam slot.',
    createdAt: 'Feb 27, 2026',
    lastFollowUp: 'Today at 09:30 AM',
    notes: [
      'Saw Instagram reels by faculty on mechanics problem solving.',
      'Requested scholarship test registration link.'
    ],
    dealValue: 14999
  },
  {
    id: 'lead-5',
    studentName: 'Tanvi Bhatnagar',
    phone: '+91 99100 88234',
    email: 'tanvi.bhatnagar@gmail.com',
    city: 'New Delhi',
    targetCourse: 'Dr. Visionary NEET UG 2026',
    source: 'WhatsApp',
    stage: 'Contacted',
    counsellorName: 'Vikram Joshi',
    followUpDate: '2026-03-06',
    remarks: 'Inbound message from WhatsApp helpline. Sent brochure and fee plan structure.',
    createdAt: 'Feb 28, 2026',
    lastFollowUp: 'Yesterday at 04:15 PM',
    notes: [
      'WhatsApp enquiry for repeater NEET batch with daily biology doubt mentor.'
    ],
    dealValue: 11999
  },
  {
    id: 'lead-6',
    studentName: 'Manish Rawat',
    phone: '+91 94120 77312',
    email: 'manish.rawat.kotdwara@gmail.com',
    city: 'Dehradun, Uttarakhand',
    targetCourse: 'Pinnacle JEE Advanced 2026',
    source: 'Facebook',
    stage: 'Follow Up',
    counsellorName: 'Priya Mehra',
    followUpDate: '2026-03-05',
    remarks: 'Discussed installment EMI options. Parent requested callback after bank discussion.',
    createdAt: 'Feb 22, 2026',
    lastFollowUp: 'Feb 26, 2026',
    notes: [
      'Requested 3-month zero-cost EMI option.'
    ],
    dealValue: 14999
  },
  {
    id: 'lead-7',
    studentName: 'Devansh Pandey',
    phone: '+91 91612 99801',
    email: 'devansh.pandey@gmail.com',
    city: 'Lucknow, Uttar Pradesh',
    targetCourse: 'Samarth IAS - UPSC 2026',
    source: 'App',
    stage: 'New',
    counsellorName: 'Vikram Joshi',
    followUpDate: '2026-03-03',
    remarks: 'Downloaded Android App and attempted Free GS Diagnostic test. Scored 68%. Direct app inbound lead.',
    createdAt: 'Mar 1, 2026',
    lastFollowUp: 'Just now',
    notes: [
      'Took in-app free diagnostic evaluation test.'
    ],
    dealValue: 21999
  },
  {
    id: 'lead-8',
    studentName: 'Prateek Singhal',
    phone: '+91 98290 44556',
    email: 'singhal.prateek99@gmail.com',
    city: 'Kota, Rajasthan',
    targetCourse: 'Pinnacle JEE Advanced 2026',
    source: 'Offline',
    stage: 'Contacted',
    counsellorName: 'Priya Mehra',
    followUpDate: '2026-03-07',
    remarks: 'Walk-in enquiry at DC Maxwell Kota Learning Center. Collected printed prospectus.',
    createdAt: 'Feb 25, 2026',
    lastFollowUp: 'Feb 27, 2026',
    notes: [
      'Visited campus with parents. Desires hybrid classroom + digital VIP pass.'
    ],
    dealValue: 18999
  }
];

export const TOPPER_RESULTS = [
  {
    name: 'Tanmay Agrawal',
    rank: 'AIR 01',
    exam: 'JEE Advanced 2025',
    score: '348 / 360',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    quote: 'DC Maxwell Academy’s CBT test series and Er. Rajeshwar Sir’s Physics problem sheets were the single biggest game changer for my rank!',
    college: 'IIT Bombay - Computer Science'
  },
  {
    name: 'Suhani Dixit',
    rank: 'AIR 14',
    exam: 'NEET UG 2025',
    score: '715 / 720',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    quote: 'The NCERT line-by-line breakdown by Dr. Ananya Mukherjee gave me 100% accuracy in Biology and Organic Chemistry.',
    college: 'AIIMS New Delhi'
  },
  {
    name: 'Aditya Mathur',
    rank: 'AIR 32',
    exam: 'UPSC CSE 2024',
    score: 'Top GS Score',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    quote: 'The daily mains answer writing feedback and personal guidance from Vikramaditya Sir was sharper than any Delhi offline coaching.',
    college: 'IAS - AGMUT Cadre'
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-1',
    studentName: 'Aarav Sharma',
    studentId: 'usr-student-01',
    courseTitle: 'Pinnacle JEE Advanced & Main: Mechanics & Electrostatics Mastery',
    courseId: 'crs-jee-pinnacle',
    completionDate: 'February 15, 2026',
    grade: 'A+ (Score: 94.5%)',
    scorePercentage: 94.5,
    credentialId: 'VED-2026-PHY-889410',
    instructorName: 'Er. Rajeshwar Varma',
    directorName: 'Dr. Anand Raman (Academic Director)',
    academyLogo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&q=80',
    verificationHash: '0x8f4c2e7b91a3d5e688410dcmaxwell2026cert',
    isVerified: true,
    issuedAtTimestamp: '2026-02-15T14:30:00Z'
  },
  {
    id: 'cert-2',
    studentName: 'Aarav Sharma',
    studentId: 'usr-student-01',
    courseTitle: 'CA Foundation Complete Video Course Package (All 4 Subjects)',
    courseId: 'crs-ca-foundation-package',
    completionDate: 'August 10, 2026',
    grade: 'Distinction (Score: 91.2%)',
    scorePercentage: 91.2,
    credentialId: 'VED-2026-COM-992144',
    instructorName: 'CA Sneha Kothari & Master Faculty',
    directorName: 'Dr. Anand Raman (Academic Director)',
    academyLogo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&q=80',
    verificationHash: '0x3a9d7e1c8b5f4092144dcmaxwell2026ca',
    isVerified: true,
    issuedAtTimestamp: '2026-08-10T11:15:00Z'
  },
  {
    id: 'cert-3',
    studentName: 'Ananya Deshmukh',
    studentId: 'usr-student-02',
    courseTitle: 'NEET 2026 Vision 700+ Score Mastery & High-Yield Biology',
    courseId: 'crs-neet-vision',
    completionDate: 'January 28, 2026',
    grade: 'A+ (Score: 96.0%)',
    scorePercentage: 96.0,
    credentialId: 'VED-2026-MED-774102',
    instructorName: 'Dr. Shalini Mukhopadhyay (AIIMS New Delhi)',
    directorName: 'Dr. Anand Raman (Academic Director)',
    verificationHash: '0x774102neetaiimsdcmaxwell2026verified',
    isVerified: true,
    issuedAtTimestamp: '2026-01-28T16:45:00Z'
  }
];

export const STORE_PRODUCTS_DATA: StoreProduct[] = [
  // 1. Recorded Courses
  {
    id: 'prod-rec-01',
    title: 'CA Foundation Complete Recorded Video Mastery (All 4 Subjects)',
    tagline: 'Comprehensive chapter-wise studio HD recordings, indexed notes, formula sheet and solved illustrations.',
    type: 'recorded_course',
    category: 'CA & Commerce (Foundation/Inter)',
    price: 6999,
    originalPrice: 13999,
    discountPercentage: 50,
    rating: 4.92,
    reviewsCount: 840,
    enrolledCount: 2450,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Value Package',
    courseIdRef: 'crs-ca-foundation-package',
    features: [
      '280+ Hours Structured HD Recorded Video Lectures',
      'All 4 Subjects: Accounts, Business Law, Economics & Quantitative Aptitude',
      'Detailed Subjective DPPs with Model Answers',
      'Full Offline Download support in App',
      '1 Year Unlimited Playback Validity'
    ],
    validity: '12 Months Unlimited Access',
    deliverables: ['Video Access', 'PDF Notes', 'DPP Sheets', 'Model Answers'],
    isBestseller: true,
    isPopular: true
  },
  {
    id: 'prod-rec-02',
    title: 'JEE Advanced Mechanics & Electrostatics Deep-Dive Recorded Masterclass',
    tagline: 'Step-by-step conceptual rigor and multi-concept Olympiad level problem solving by Er. Rajeshwar Varma.',
    type: 'recorded_course',
    category: 'JEE (Main & Adv)',
    price: 4499,
    originalPrice: 8999,
    discountPercentage: 50,
    rating: 4.96,
    reviewsCount: 620,
    enrolledCount: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
    badge: 'Faculty Special',
    courseIdRef: 'crs-jee-pinnacle',
    features: [
      '120+ Hours Concept Derivations & Advanced Tricks',
      '500+ JEE Advanced PYQs with Step Video Solutions',
      'Handwritten Colored PDF Class Notes',
      'Topic-wise Benchmark Quiz with AI Ranking'
    ],
    validity: '18 Months Access',
    deliverables: ['Recorded Lectures', 'Handwritten Notes', 'PYQ Solutions']
  },
  {
    id: 'prod-rec-03',
    title: 'NEET High-Yield Organic & Inorganic Chemistry Recorded Package',
    tagline: '100% NCERT line-by-line decoding, reaction mechanism mind maps and named reaction flashcards.',
    type: 'recorded_course',
    category: 'NEET (Medical)',
    price: 3999,
    originalPrice: 7999,
    discountPercentage: 50,
    rating: 4.88,
    reviewsCount: 510,
    enrolledCount: 1620,
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    courseIdRef: 'crs-neet-vision',
    features: [
      '95+ Hours NCERT Decoded Lectures',
      'Named Reaction Flashcards & Roadmaps (PDF)',
      '1,200 NCERT Exemplar & NEET Question Drill',
      'Includes Doubt Resolution Forum Access'
    ],
    validity: '12 Months Access',
    deliverables: ['HD Video Lectures', 'Mind Maps', 'Reaction Roadmaps']
  },

  // 2. Live Courses
  {
    id: 'prod-live-01',
    title: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch (Live + Mentorship)',
    tagline: 'Interactive 2-way live teaching, instant in-class doubt clearing, live polls and daily guided homework.',
    type: 'live_course',
    category: 'JEE (Main & Adv)',
    price: 14999,
    originalPrice: 29999,
    discountPercentage: 50,
    rating: 4.95,
    reviewsCount: 1420,
    enrolledCount: 3840,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending Batch',
    courseIdRef: 'crs-jee-pinnacle',
    features: [
      '600+ Hours Interactive Live Streaming Classes',
      'Master Faculty Team (IIT Delhi & Kota Super-Star Mentors)',
      '30 All-India CBT Mock Exams (NTA Interface)',
      '1-on-1 Faculty Desk & 24/7 Doubt Assistance',
      'Printed Study Modules Shipped to Address'
    ],
    validity: '24 Months (Till JEE Advanced 2026)',
    deliverables: ['Live Classes', 'Recorded Replays', 'Hardcopy Books', 'CBT Test Series', 'Mentorship'],
    isBestseller: true,
    isPopular: true
  },
  {
    id: 'prod-live-02',
    title: 'Target Top 100 AIR CA Foundation 2026 Live Intensive Batch',
    tagline: 'Comprehensive live coaching for Accounts, Law, Economics and Quant with weekly live case study clinics.',
    type: 'live_course',
    category: 'CA & Commerce (Foundation/Inter)',
    price: 9999,
    originalPrice: 19999,
    discountPercentage: 50,
    rating: 4.94,
    reviewsCount: 780,
    enrolledCount: 2190,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    badge: 'Live Interactive',
    courseIdRef: 'crs-ca-foundation-package',
    features: [
      '400+ Hours Live Interactive Masterclasses',
      'ICAI Suggested Answers & Step-Marking Strategies',
      'Subjective Answer Copy Evaluation by CAs',
      'Live Polls, Weekly Mocks & Grand Marathon Revisions'
    ],
    validity: '12 Months Access',
    deliverables: ['Live Classes', 'Evaluated Test Papers', 'Faculty Doubts', 'Hardcopy Notes']
  },

  // 3. Test Series
  {
    id: 'prod-test-01',
    title: 'All-India National CBT Test Series 2026 (35 Full-Length NTA Replica Tests)',
    tagline: 'Exact official testing simulator with countdown timer, negative marking, instant AIR rank, and video solutions.',
    type: 'test_series',
    category: 'JEE (Main & Adv)',
    price: 2499,
    originalPrice: 4999,
    discountPercentage: 50,
    rating: 4.93,
    reviewsCount: 1120,
    enrolledCount: 5400,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    badge: 'AIR Booster',
    testSeriesIdRef: 'test-jee-major-01',
    features: [
      '35 All-India Tests (15 Part Syllabus + 20 Full Syllabus)',
      '10,000+ Aspirants competing across India for realistic AIR percentile',
      'In-depth AI Performance Analytics & Time-Management heatmaps',
      'Video Explanations by Senior Kota Faculty for every question'
    ],
    validity: '12 Months Valid',
    deliverables: ['35 CBT Mock Tests', 'AIR Analytics', 'Video Solutions'],
    isBestseller: true
  },
  {
    id: 'prod-test-02',
    title: 'CA Foundation ICAI Exam Simulator Test Series (16 Mocks with Copy Evaluation)',
    tagline: 'Simulated 3-hour pen-paper + CBT hybrid test papers with manual line-by-line faculty evaluation and feedback.',
    type: 'test_series',
    category: 'CA & Commerce (Foundation/Inter)',
    price: 1999,
    originalPrice: 3999,
    discountPercentage: 50,
    rating: 4.89,
    reviewsCount: 460,
    enrolledCount: 1980,
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
    testSeriesIdRef: 'test-ca-found-01',
    features: [
      '16 Full Length Papers strictly on ICAI Blueprint',
      'Individual Answer Copy Evaluation within 48 Hours',
      'Topper Comparison Matrix & Common Mistake Reports',
      'Includes Law & Accounts Subjective Evaluator feedback'
    ],
    validity: '6 Months Valid',
    deliverables: ['16 Test Papers', 'Faculty Grading', 'Rank Card']
  },

  // 4. Study Material
  {
    id: 'prod-mat-01',
    title: 'DC Maxwell 8-Module Hardcopy Master Theory & Formula Vault (Delivered to Doorstep)',
    tagline: 'Premium multi-color printed textbooks, comprehensive theory summaries, 10,000+ solved drills and formula cards.',
    type: 'study_material',
    category: 'JEE (Main & Adv)',
    price: 2999,
    originalPrice: 5999,
    discountPercentage: 50,
    rating: 4.97,
    reviewsCount: 890,
    enrolledCount: 3100,
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    badge: 'Doorstep Courier',
    materialIdRef: 'mat-phy-formula-01',
    features: [
      '8 Comprehensive Spiral-Bound Hardcopy Volumes Shipped via Express Courier',
      'Includes Digital Access with In-App Smart PDF Reader & Watermark Protection',
      '10,000+ Graded Problems (Level 1, Level 2, Advanced Olympiad)',
      'Laminated Quick Revision Pocket Formula Charts included Free'
    ],
    validity: 'Lifetime Physical Ownership + 2 Yr Digital Access',
    deliverables: ['8 Printed Books', 'Express Shipping', 'Digital PDF Vault']
  },
  {
    id: 'prod-mat-02',
    title: 'CA Foundation Master Question Bank & Scanner (5,000+ Questions with Solutions)',
    tagline: 'Last 15 Years Past Exam Questions, RTPs, MTPs and Model Test Papers classified chapter-wise with detailed steps.',
    type: 'study_material',
    category: 'CA & Commerce (Foundation/Inter)',
    price: 1499,
    originalPrice: 2999,
    discountPercentage: 50,
    rating: 4.87,
    reviewsCount: 390,
    enrolledCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    materialIdRef: 'mat-ca-accounts-01',
    features: [
      'Chapter-wise compilation of past 25 ICAI Exam cycles',
      'Detailed Working Notes & Step-by-Step Accounting Treatments',
      'Legal Maxims and Case Law Repository for Business Law',
      'Downloadable PDF with High-Speed Search & Bookmark tools'
    ],
    validity: '12 Months Digital Access',
    deliverables: ['Digital Question Bank', '15 Years PYQ Scanner']
  },

  // 5. Mock Tests
  {
    id: 'prod-mock-01',
    title: 'JEE Advanced Top 10 Super-Challenger Mock Exam Simulator',
    tagline: 'Designed for 99+ percentile aspirants seeking high-difficulty multi-correct, matrix-match and paragraph questions.',
    type: 'mock_tests',
    category: 'JEE (Main & Adv)',
    price: 999,
    originalPrice: 1999,
    discountPercentage: 50,
    rating: 4.91,
    reviewsCount: 340,
    enrolledCount: 1750,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    features: [
      '10 Full-Length High Difficulty Simulated Tests',
      'Instant All-India Percentile & Accuracy Analysis',
      'Step-by-step Video proofs and alternate short-cut methods',
      'Detailed subject & topic error heatmap'
    ],
    validity: '6 Months Valid',
    deliverables: ['10 Challenger Mock Tests', 'Video Proofs']
  },
  {
    id: 'prod-mock-02',
    title: 'NEET 2026 Rapid-Fire 20 Speed & Accuracy Mock Package',
    tagline: 'Timed 200-minute medical mock test suite with NCERT question tags and instant answer key comparison.',
    type: 'mock_tests',
    category: 'NEET (Medical)',
    price: 799,
    originalPrice: 1599,
    discountPercentage: 50,
    rating: 4.85,
    reviewsCount: 290,
    enrolledCount: 1280,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    features: [
      '20 Full Syllabus Mock Papers strictly matching NEET 2026 pattern',
      'NCERT page citation for all 200 questions',
      'Negative marking avoidance coaching',
      'Instant detailed scorecard with AIR estimation'
    ],
    validity: '6 Months Valid',
    deliverables: ['20 Speed Tests', 'NCERT Tagged Keys']
  },

  // 6. Combo Packages
  {
    id: 'prod-combo-01',
    title: 'Mega Super Combo: CA Foundation 2026 (Live + Recorded + 35 CBT Tests + Printed Books)',
    tagline: 'The ultimate all-in-one preparation suite for guaranteed first-attempt success with 1-on-1 CA mentorship.',
    type: 'combo_package',
    category: 'CA & Commerce (Foundation/Inter)',
    price: 11999,
    originalPrice: 24999,
    discountPercentage: 52,
    rating: 4.98,
    reviewsCount: 1350,
    enrolledCount: 3950,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    badge: 'Most Popular Combo',
    courseIdRef: 'crs-ca-foundation-package',
    features: [
      'Full Access to Live Interactive Classes + HD Recorded Video Vault',
      'Complete Set of 8 Hardcopy Subject Textbooks delivered to home',
      '35 All-India ICAI Mock Tests with human faculty evaluation',
      'Dedicated 1-on-1 CA Mentor for study planning & doubt solving',
      'Official Graduation Certificate upon completion'
    ],
    validity: '18 Months Full Access',
    deliverables: ['Live & Recorded Courses', 'Printed Book Set', 'Mock Test Series', 'CA Mentorship', 'Certificate'],
    isBestseller: true,
    isPopular: true
  },
  {
    id: 'prod-combo-02',
    title: 'Pinnacle JEE 2-Year Ultimate Super Combo (Classes + 60 Mocks + Modules + Doubts)',
    tagline: 'Zero-compromise complete roadmap from Class 11 basics to JEE Advanced Top 100 Rank qualification.',
    type: 'combo_package',
    category: 'JEE (Main & Adv)',
    price: 19999,
    originalPrice: 39999,
    discountPercentage: 50,
    rating: 4.96,
    reviewsCount: 920,
    enrolledCount: 2840,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    badge: 'Super Achiever Combo',
    courseIdRef: 'crs-jee-pinnacle',
    features: [
      '2 Years Complete Live + Recorded Coaching by Kota Super-Team',
      'Complete 16-Volume Printed Study Material shipped to address',
      '60 All-India CBT NTA Mock Tests with Video Explanations',
      'Unlimited 24/7 1-on-1 Live Doubt Clearing Audio/Video Desk',
      'Verified Academic Completion Certificate'
    ],
    validity: '24 Months Access',
    deliverables: ['Live & Recorded Batch', '16 Hardcopy Books', '60 CBT Tests', '24/7 Doubt Desk', 'Certificate'],
    isBestseller: true
  },

  // 7. Premium Memberships
  {
    id: 'prod-mem-01',
    title: 'DC Maxwell Academy All-Access Annual Pro Pass (Unlimited Everything)',
    tagline: 'One master subscription unlocking every live batch, recorded course, test series, study vault, and faculty desk for 1 year.',
    type: 'premium_membership',
    category: 'JEE (Main & Adv)',
    price: 29999,
    originalPrice: 59999,
    discountPercentage: 50,
    rating: 4.99,
    reviewsCount: 420,
    enrolledCount: 1150,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    badge: 'VIP All-Access Pass',
    features: [
      'Unlimited Access to ALL Courses across JEE, NEET, CA & Foundation',
      'Entry to ALL Live Interactive Batches & Masterclasses',
      'Unrestricted Access to all 100+ All-India CBT Test Series',
      'Priority 1-on-1 Faculty Query Resolution within 15 Minutes',
      'Free Home Delivery of all Printed Reference Modules',
      'Complimentary Certificate of Academic Excellence upon course completions'
    ],
    validity: '365 Days Unrestricted Access',
    deliverables: ['All Live Batches', 'All Recorded Courses', 'All Test Series', 'All Study Materials', 'VIP Mentorship', 'Certificates'],
    isBestseller: true
  },
  {
    id: 'prod-mem-02',
    title: 'DC Maxwell Prime Scholar 6-Month Semester Pass',
    tagline: 'High-flexibility semester membership giving unlimited course streaming and test series access.',
    type: 'premium_membership',
    category: 'CA & Commerce (Foundation/Inter)',
    price: 16999,
    originalPrice: 32999,
    discountPercentage: 48,
    rating: 4.89,
    reviewsCount: 230,
    enrolledCount: 890,
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    features: [
      'Unlimited Access to chosen stream live & recorded lectures',
      'All Chapter-wise and Grand Mock Tests with instant AIR ranking',
      'Direct Question Submissions to Faculty Desk',
      'High-Speed In-App PDF Reader Access with offline sync'
    ],
    validity: '180 Days Access',
    deliverables: ['Stream Courses', 'CBT Test Series', 'Study Vault', 'Faculty Desk']
  }
];

export const ORDERS_DATA: OrderItem[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-VED-2026-8891',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    productTitle: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch',
    productType: 'live_course',
    items: [
      {
        id: 'crs-jee-pinnacle',
        title: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch',
        price: 14999,
        originalPrice: 29999,
        type: 'course',
        thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 14999,
    discountAmount: 7499,
    taxAmount: 1350,
    totalAmount: 8850,
    couponCode: 'MAXWELL50',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (Google Pay)',
    orderDate: '2026-08-20 14:23',
    transactionId: 'TXN-UPI-984729188',
    invoiceNumber: 'INV-2026-08-8891',
    billingAddress: {
      street: '42 Orchid Heights, Sector 18',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001'
    }
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-VED-2026-8892',
    studentId: 'usr-student-02',
    studentName: 'Ananya Deshmukh',
    studentEmail: 'ananya.deshmukh@gmail.com',
    studentPhone: '+91 98234 56789',
    productTitle: 'All-India National CBT Test Series 2026 (35 Full Tests)',
    productType: 'test_series',
    items: [
      {
        id: 'prod-test-01',
        title: 'All-India National CBT Test Series 2026 (35 Full Tests)',
        price: 2499,
        originalPrice: 4999,
        type: 'test_series',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 2499,
    discountAmount: 1249,
    taxAmount: 225,
    totalAmount: 1475,
    couponCode: 'MAXWELL50',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card (HDFC Visa)',
    orderDate: '2026-08-22 10:15',
    transactionId: 'TXN-CC-874291823',
    invoiceNumber: 'INV-2026-08-8892',
    billingAddress: {
      street: 'Flat 402, Shivam Residency',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411038'
    }
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-VED-2026-8893',
    studentId: 'usr-student-03',
    studentName: 'Rohan Gupta',
    studentEmail: 'rohan.gupta@outlook.com',
    studentPhone: '+91 97112 34567',
    productTitle: 'Mega Super Combo: CA Foundation 2026 (Live + Recorded + Books + Mocks)',
    productType: 'combo_package',
    items: [
      {
        id: 'prod-combo-01',
        title: 'Mega Super Combo: CA Foundation 2026 (Live + Recorded + Books + Mocks)',
        price: 11999,
        originalPrice: 24999,
        type: 'combo_package',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 11999,
    discountAmount: 5999,
    taxAmount: 1080,
    totalAmount: 7080,
    couponCode: 'MAXWELL50',
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking (SBI)',
    orderDate: '2026-08-24 16:45',
    transactionId: 'TXN-NB-552918471',
    invoiceNumber: 'INV-2026-08-8893',
    billingAddress: {
      street: '12-B Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006'
    }
  },
  {
    id: 'ord-104',
    orderNumber: 'ORD-VED-2026-8894',
    studentId: 'usr-student-04',
    studentName: 'Kavita Verma',
    studentEmail: 'kavita.verma@gmail.com',
    studentPhone: '+91 99887 65432',
    productTitle: 'DC Maxwell 8-Module Hardcopy Master Theory & Formula Vault',
    productType: 'study_material',
    items: [
      {
        id: 'prod-mat-01',
        title: 'DC Maxwell 8-Module Hardcopy Master Theory & Formula Vault',
        price: 2999,
        originalPrice: 5999,
        type: 'study_material',
        thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 2999,
    discountAmount: 0,
    taxAmount: 540,
    totalAmount: 3539,
    couponCode: undefined,
    paymentStatus: 'Pending',
    paymentMethod: 'Debit Card (ICICI)',
    orderDate: '2026-08-26 09:30',
    transactionId: 'TXN-DC-119284710',
    invoiceNumber: 'INV-2026-08-8894',
    billingAddress: {
      street: '88 Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    }
  },
  {
    id: 'ord-105',
    orderNumber: 'ORD-VED-2026-8895',
    studentId: 'usr-student-05',
    studentName: 'Vikramjit Singh',
    studentEmail: 'vikram.singh@yahoo.in',
    studentPhone: '+91 98123 45678',
    productTitle: 'DC Maxwell Academy All-Access Annual Pro Pass (Unlimited)',
    productType: 'premium_membership',
    items: [
      {
        id: 'prod-mem-01',
        title: 'DC Maxwell Academy All-Access Annual Pro Pass (Unlimited)',
        price: 29999,
        originalPrice: 59999,
        type: 'premium_membership',
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 29999,
    discountAmount: 14999,
    taxAmount: 2700,
    totalAmount: 17700,
    couponCode: 'MAXWELL50',
    paymentStatus: 'Paid',
    paymentMethod: 'Wallets (Paytm)',
    orderDate: '2026-08-27 11:20',
    transactionId: 'TXN-WLT-992817462',
    invoiceNumber: 'INV-2026-08-8895',
    billingAddress: {
      street: 'Plot 55, Model Town',
      city: 'Chandigarh',
      state: 'Punjab',
      pincode: '160002'
    }
  },
  {
    id: 'ord-106',
    orderNumber: 'ORD-VED-2026-8896',
    studentId: 'usr-student-06',
    studentName: 'Meera Iyer',
    studentEmail: 'meera.iyer@gmail.com',
    studentPhone: '+91 94455 66778',
    productTitle: 'JEE Advanced Top 10 Super-Challenger Mock Exam Simulator',
    productType: 'mock_tests',
    items: [
      {
        id: 'prod-mock-01',
        title: 'JEE Advanced Top 10 Super-Challenger Mock Exam Simulator',
        price: 999,
        originalPrice: 1999,
        type: 'mock_tests',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 999,
    discountAmount: 200,
    taxAmount: 144,
    totalAmount: 943,
    couponCode: 'TOPPER20',
    paymentStatus: 'Failed',
    paymentMethod: 'UPI (PhonePe)',
    orderDate: '2026-08-27 18:05',
    transactionId: 'TXN-UPI-FAIL-44819',
    invoiceNumber: 'INV-2026-08-8896',
    billingAddress: {
      street: '15 Anna Nagar 2nd Avenue',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600040'
    }
  },
  {
    id: 'ord-107',
    orderNumber: 'ORD-VED-2026-8897',
    studentId: 'usr-student-07',
    studentName: 'Tanvi Agarwal',
    studentEmail: 'tanvi.agarwal@gmail.com',
    studentPhone: '+91 99112 23344',
    productTitle: 'CA Foundation Complete Recorded Video Mastery',
    productType: 'recorded_course',
    items: [
      {
        id: 'prod-rec-01',
        title: 'CA Foundation Complete Recorded Video Mastery',
        price: 6999,
        originalPrice: 13999,
        type: 'recorded_course',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 6999,
    discountAmount: 3499,
    taxAmount: 630,
    totalAmount: 4130,
    couponCode: 'MAXWELL50',
    paymentStatus: 'Refunded',
    paymentMethod: 'Credit Card (Axis Bank)',
    orderDate: '2026-08-18 12:40',
    transactionId: 'TXN-CC-REF-109284',
    invoiceNumber: 'INV-2026-08-8897',
    billingAddress: {
      street: 'B-44 Salt Lake Sector 1',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700064'
    }
  },
  {
    id: 'ord-108',
    orderNumber: 'ORD-VED-2026-8898',
    studentId: 'usr-student-08',
    studentName: 'Siddharth Rao',
    studentEmail: 'siddharth.rao@gmail.com',
    studentPhone: '+91 98450 12345',
    productTitle: 'NEET 2026 Rapid-Fire 20 Speed & Accuracy Mock Package',
    productType: 'mock_tests',
    items: [
      {
        id: 'prod-mock-02',
        title: 'NEET 2026 Rapid-Fire 20 Speed & Accuracy Mock Package',
        price: 799,
        originalPrice: 1599,
        type: 'mock_tests',
        thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80'
      }
    ],
    baseAmount: 799,
    discountAmount: 0,
    taxAmount: 144,
    totalAmount: 943,
    paymentStatus: 'Cancelled',
    paymentMethod: 'UPI (BHIM)',
    orderDate: '2026-08-28 08:12',
    transactionId: 'TXN-CAN-982104',
    invoiceNumber: 'INV-2026-08-8898',
    billingAddress: {
      street: '22 Banjara Hills Road No. 3',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    }
  }
];

export const SAMPLE_INVOICES_DATA: { [invoiceNum: string]: InvoiceItem } = {
  'INV-2026-08-8891': {
    invoiceNumber: 'INV-2026-08-8891',
    orderId: 'ORD-VED-2026-8891',
    orderDate: '2026-08-20',
    issueDate: 'August 20, 2026',
    studentDetails: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@dcmaxwell.edu',
      phone: '+91 98765 43210',
      studentId: 'usr-student-01',
      address: '42 Orchid Heights, Sector 18, Gurugram, Haryana - 122001',
      state: 'Haryana (Code: 06)'
    },
    academyDetails: {
      name: 'DC Maxwell Academy of Higher Sciences Pvt. Ltd.',
      brandTagline: 'Empowering India’s Top Academic Rankers with Digital Excellence',
      gstin: '07AAECV9842K1Z9',
      pan: 'AAECV9842K',
      cin: 'U80903DL2024PTC392810',
      address: 'Plot 14, Institutional Knowledge Park, Phase III, New Delhi - 110092',
      supportEmail: 'billing@dcmaxwell.edu',
      supportPhone: '1800-889-MAXW (8334)'
    },
    items: [
      {
        id: 'item-1',
        title: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch (24 Months Online Access)',
        hsnSacCode: '999293 (Educational Support Services)',
        quantity: 1,
        unitPrice: 14999,
        discount: 7499,
        taxableAmount: 7500,
        total: 8850
      }
    ],
    subtotal: 14999,
    couponCode: 'MAXWELL50 (50% Off Scholarship)',
    discountTotal: 7499,
    taxableAmount: 7500,
    cgst: 675,
    sgst: 675,
    igst: 0,
    totalAmount: 8850,
    amountInWords: 'INR Eight Thousand Eight Hundred Fifty Only',
    paymentMethod: 'UPI / Google Pay (Ref: 984729188)',
    transactionId: 'TXN-UPI-984729188',
    paymentStatus: 'PAID',
    authorizedSignatory: 'CA N. K. Singhania (Head of Finance & Compliance)',
    qrVerificationCode: 'VERIFY-INV-VED-2026-8891-GST-PAID'
  }
};


export const NOTIFICATIONS_DATA: PlatformNotification[] = [
  {
    id: 'notif-reg-01',
    title: '🎉 Welcome to DC Maxwell Academy!',
    message: 'Your student account is successfully registered. Enjoy complimentary access to sample video lectures and formula sheets in your hub.',
    type: 'registration',
    category: 'registration',
    time: '3 days ago',
    read: true,
    actionTarget: 'store'
  },
  {
    id: 'notif-purch-01',
    title: '💳 Course Purchase Confirmed: #ORD-VED-2026-8891',
    message: 'Payment of ₹8,850 received successfully. Your official GST Tax Invoice has been generated and emailed.',
    type: 'course_purchase',
    category: 'course_purchase',
    time: '2 days ago',
    read: true,
    actionTarget: 'course_detail',
    actionPayload: { orderId: 'ORD-VED-2026-8891' }
  },
  {
    id: 'notif-act-01',
    title: '🚀 Course Activated: Pinnacle JEE Advanced 2026',
    message: 'Full batch access unlocked! All live classes, recorded lecture vaults, CBT test series, and PDF notes are now live.',
    type: 'course_activation',
    category: 'course_activation',
    time: '2 days ago',
    read: false,
    actionTarget: 'course_detail',
    actionPayload: { courseId: 'crs-jee-pinnacle' }
  },
  {
    id: 'notif-vid-01',
    title: '🎥 New Lecture Uploaded: Rotational Motion (Part 3)',
    message: 'Er. Rajeshwar Varma uploaded a new 45-min masterclass with solved JEE Advanced PYQs in Physics Chapter 3.',
    type: 'new_video',
    category: 'new_video',
    time: '4 hours ago',
    read: false,
    actionTarget: 'video_player',
    actionPayload: { courseId: 'crs-jee-pinnacle', lessonId: 'les-2' }
  },
  {
    id: 'notif-live-01',
    title: '🔴 Live Class Alert: Electrostatics Problem Solving',
    message: 'Live stream starts in 15 minutes with Dr. Alok Verma. Keep your notebook and doubts ready!',
    type: 'live_class',
    category: 'live_class',
    time: '15 mins ago',
    read: false,
    actionTarget: 'live_class',
    actionPayload: { liveClassId: 'live-01' }
  },
  {
    id: 'notif-test-01',
    title: '📝 CBT Mock Test Open: JEE Main National Mock 01',
    message: 'The online test window is now active. Complete your 3-hour test before Sunday midnight to get an All-India Rank.',
    type: 'test',
    category: 'test',
    time: '1 day ago',
    read: false,
    actionTarget: 'cbt_test',
    actionPayload: { testId: 'test-jee-01' }
  },
  {
    id: 'notif-res-01',
    title: '🏆 Test Result Published: Score 268/300 (AIR 14)',
    message: 'Your detailed analytics, chapter-wise accuracy graph, and video solutions for Physics Mock Test 02 are ready.',
    type: 'result',
    category: 'result',
    time: 'Yesterday',
    read: true,
    actionTarget: 'test_result'
  },
  {
    id: 'notif-asn-01',
    title: '📋 Assignment Graded: DPP-04 Physics (19/20)',
    message: 'Faculty feedback: "Excellent rigor on rotational mechanics problem #4. Keep it up!"',
    type: 'assignment',
    category: 'assignment',
    time: 'Yesterday',
    read: true,
    actionTarget: 'assignments'
  },
  {
    id: 'notif-dbt-01',
    title: '💡 Doubt Answered by Prof. Meenakshi Sundaram',
    message: 'Your doubt on "Gauss Law Cylindrical Symmetry" has been solved with handwritten step-by-step notes.',
    type: 'doubt_response',
    category: 'doubt_response',
    time: '3 hours ago',
    read: false,
    actionTarget: 'doubt_forum'
  },
  {
    id: 'notif-cert-01',
    title: '🎓 Digital Certificate Ready for Download',
    message: 'Congratulations! Your Course Completion & Mastery Certificate for "Mechanics & Thermodynamics Benchmark" is issued.',
    type: 'certificate',
    category: 'certificate',
    time: '2 days ago',
    read: true,
    actionTarget: 'certificate'
  },
  {
    id: 'notif-off-01',
    title: '🏷️ Flash Sale: Flat 50% Scholarship Coupon',
    message: 'Use promo code MAXWELL50 to get 50% off on all Combo Packages & Test Series this festive weekend!',
    type: 'offers',
    category: 'offers',
    time: '5 hours ago',
    read: false,
    actionTarget: 'store'
  },
  {
    id: 'notif-ann-01',
    title: '📢 Urgent Schedule Announcement: Sunday Marathon',
    message: 'The 6-hour Organic Chemistry Revision Marathon will take place this Sunday at 10:00 AM IST. Please download the prerequisite PDF notes.',
    type: 'announcements',
    category: 'announcements',
    time: '6 hours ago',
    read: false,
    actionTarget: 'live_class'
  }
];

export const WISHLIST_LEADS_DATA: WishlistLead[] = [
  {
    id: 'wlead-01',
    studentId: 'usr-student-02',
    studentName: 'Ananya Deshmukh',
    studentEmail: 'ananya.deshmukh@gmail.com',
    studentPhone: '+91 98234 56789',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch',
    coursePrice: 14999,
    addedDate: '2026-08-28',
    status: 'active_in_wishlist',
    remarketingCount: 1,
    lastRemarketedDate: '2026-08-29',
    lastPromoSent: 'MAXWELL50 (50% Off)'
  },
  {
    id: 'wlead-02',
    studentId: 'usr-student-03',
    studentName: 'Rohan Mukherjee',
    studentEmail: 'rohan.mukherjee@gmail.com',
    studentPhone: '+91 97112 34567',
    courseId: 'crs-neet-vision',
    courseTitle: 'Vision NEET UG 2026 Intensive Live & Test Series Batch',
    coursePrice: 12999,
    addedDate: '2026-08-27',
    status: 'active_in_wishlist',
    remarketingCount: 2,
    lastRemarketedDate: '2026-08-30',
    lastPromoSent: 'NEETVIP40 (40% Off)'
  },
  {
    id: 'wlead-03',
    studentId: 'usr-student-04',
    studentName: 'Priyanka Iyer',
    studentEmail: 'priyanka.iyer@gmail.com',
    studentPhone: '+91 98334 11223',
    courseId: 'crs-ca-foundation',
    courseTitle: 'CA Foundation Complete 4-Paper Toppers Batch 2026',
    coursePrice: 9999,
    addedDate: '2026-08-29',
    status: 'active_in_wishlist',
    remarketingCount: 0
  },
  {
    id: 'wlead-04',
    studentId: 'usr-student-05',
    studentName: 'Vikramjit Singh',
    studentEmail: 'vikram.singh@yahoo.in',
    studentPhone: '+91 98123 45678',
    courseId: 'combo-01',
    courseTitle: 'CA Inter Both Groups Super Combo (All 6 Subjects + Mock Tests)',
    coursePrice: 24999,
    addedDate: '2026-08-25',
    status: 'converted_purchased',
    remarketingCount: 2,
    lastRemarketedDate: '2026-08-26',
    lastPromoSent: 'CAFOUNDATION (55% Off)'
  },
  {
    id: 'wlead-05',
    studentId: 'usr-student-06',
    studentName: 'Meera Nambiar',
    studentEmail: 'meera.nambiar@gmail.com',
    studentPhone: '+91 99456 78901',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch',
    coursePrice: 14999,
    addedDate: '2026-08-30',
    status: 'active_in_wishlist',
    remarketingCount: 0
  }
];

export const REMARKETING_CAMPAIGNS_DATA: RemarketingCampaign[] = [
  {
    id: 'camp-01',
    campaignTitle: 'JEE Advanced Wishlisters Flash 50% Push Blast',
    targetCourseId: 'crs-jee-pinnacle',
    targetCourseTitle: 'Pinnacle JEE Advanced & Main 2026 Comprehensive Batch',
    couponCode: 'MAXWELL50',
    discountPercentage: 50,
    recipientsCount: 48,
    channels: ['in_app', 'email', 'push'],
    status: 'sent',
    sentDate: '2026-08-29 14:00',
    clicksCount: 39,
    conversionsCount: 11,
    revenueGenerated: 164989,
    customMessage: 'Your saved course "Pinnacle JEE 2026" now has a 50% scholarship coupon code valid for 24 hours only!'
  },
  {
    id: 'camp-02',
    campaignTitle: 'CA Inter Combo High Intent Students Outreach',
    targetCourseId: 'combo-01',
    targetCourseTitle: 'CA Inter Both Groups Super Combo',
    couponCode: 'CAFOUNDATION',
    discountPercentage: 55,
    recipientsCount: 32,
    channels: ['in_app', 'whatsapp', 'email'],
    status: 'sent',
    sentDate: '2026-08-26 11:30',
    clicksCount: 28,
    conversionsCount: 9,
    revenueGenerated: 224991,
    customMessage: 'Seats filling fast! Claim 55% Ranker Discount on CA Inter Both Groups Combo today.'
  }
];

export const ALL_USERS_DATA: UserProfile[] = [
  INITIAL_USER,
  {
    id: 'usr-student-02',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@gmail.com',
    phone: '+91 98234 56789',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    enrolledCourseIds: ['crs-jee-pinnacle'],
    completedLessonIds: ['les-1', 'les-2'],
    targetExam: 'JEE Advanced 2026',
    walletBalance: 800,
    studyStreakDays: 21
  },
  {
    id: 'usr-student-03',
    name: 'Rohan Mukherjee',
    email: 'rohan.mukherjee@gmail.com',
    phone: '+91 97112 34567',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    enrolledCourseIds: ['crs-neet-vision'],
    completedLessonIds: ['les-1'],
    targetExam: 'NEET UG 2026',
    walletBalance: 450,
    studyStreakDays: 9
  },
  {
    id: 'usr-student-04',
    name: 'Priyanka Iyer',
    email: 'priyanka.iyer@gmail.com',
    phone: '+91 98334 11223',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    enrolledCourseIds: ['crs-jee-pinnacle', 'crs-cbse-12'],
    completedLessonIds: ['les-1', 'les-2', 'les-3'],
    targetExam: 'JEE Main 2026',
    walletBalance: 1500,
    studyStreakDays: 30
  },
  {
    id: 'usr-faculty-01',
    name: 'Er. Rajeshwar Varma',
    email: 'rajeshwar.varma@dcmaxwell.edu',
    phone: '+91 98111 22334',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    enrolledCourseIds: [],
    completedLessonIds: [],
    targetExam: 'Physics Lead Faculty',
    walletBalance: 0,
    studyStreakDays: 0
  }
];

export const DEFAULT_TEST_RESULTS: TestAttemptResult[] = [
  {
    id: 'res-default-01',
    testId: 'test-ca-chapter-01',
    testTitle: 'CA Foundation Accounts: Bank Reconciliation Statement (BRS) Chapter Test',
    attemptDate: 'Feb 25, 2026',
    timeSpentSeconds: 1420, // 23 mins 40 secs
    totalScore: 18,
    maxScore: 20,
    percentage: 90,
    percentile: 98.6,
    airRank: 42,
    totalCandidates: 3140,
    correctAnswersCount: 4,
    incorrectAnswersCount: 1,
    unattemptedCount: 0,
    accuracy: 80,
    sectionWiseScore: [
      {
        sectionName: 'BRS Concepts & Practical Problem Solving',
        score: 18,
        maxScore: 20,
        accuracy: 80
      }
    ],
    userAnswers: {
      'qb-acc-01': [0, 1, 3],
      'q-ca-brs-single': 0,
      'q-ca-brs-tf': 'False',
      'q-ca-brs-num': '11500',
      'q-ca-brs-fill': 'credit' // intentionally 1 mistake for realistic analytics
    }
  },
  {
    id: 'res-default-02',
    testId: 'test-ca-subject-01',
    testTitle: 'CA Foundation Business Laws & Communication Full Subject Test',
    attemptDate: 'Feb 20, 2026',
    timeSpentSeconds: 3100, // 51 mins 40 secs
    totalScore: 42,
    maxScore: 50,
    percentage: 84,
    percentile: 97.2,
    airRank: 78,
    totalCandidates: 2890,
    correctAnswersCount: 5,
    incorrectAnswersCount: 1,
    unattemptedCount: 0,
    accuracy: 83.3,
    sectionWiseScore: [
      {
        sectionName: 'Section A: Indian Contract Act & Objective Analysis',
        score: 36,
        maxScore: 44,
        accuracy: 85
      },
      {
        sectionName: 'Section B: Subjective Case Law Analysis',
        score: 6,
        maxScore: 6,
        accuracy: 100
      }
    ],
    userAnswers: {
      'qb-law-01': 'True',
      'q-ca-law-single': 0,
      'q-ca-law-mcq': [0, 1, 2],
      'q-ca-law-tf': 'False',
      'q-ca-law-match': { '1': 'A', '2': 'B', '3': 'C', '4': 'D' },
      'qb-sub-01': 'Corporate veil doctrine establishes the separate legal entity of a company as held in Salomon vs Salomon. The veil is lifted in cases of fraud, tax evasion, enemy character, or avoidance of welfare statutes.'
    }
  },
  {
    id: 'res-default-03',
    testId: 'test-jee-major-01',
    testTitle: 'DC Maxwell All-India Major Mock Test 01 - JEE Advanced Full Syllabus Simulation',
    attemptDate: 'Feb 15, 2026',
    timeSpentSeconds: 3340, // 55 mins 40 secs
    totalScore: 21,
    maxScore: 24,
    percentage: 87.5,
    percentile: 99.4,
    airRank: 18,
    totalCandidates: 4120,
    correctAnswersCount: 5,
    incorrectAnswersCount: 1,
    unattemptedCount: 0,
    accuracy: 83.3,
    sectionWiseScore: [
      {
        sectionName: 'Physics Section',
        score: 8,
        maxScore: 8,
        accuracy: 100
      },
      {
        sectionName: 'Chemistry Section',
        score: 7,
        maxScore: 8,
        accuracy: 87.5
      },
      {
        sectionName: 'Mathematics Section',
        score: 6,
        maxScore: 8,
        accuracy: 75
      }
    ],
    userAnswers: {
      'qb-phy-01': 0,
      'qb-phy-02': '2',
      'qb-chem-01': 'negative',
      'q-chem-iodo': 0,
      'qb-math-01': { '1': 'A', '2': 'B', '3': 'C', '4': 'D' },
      'q-math-calculus-king': 0
    }
  }
];

// -------------------------------------------------------------
// 1. COUPONS DATA (Rich validation rules & limits)
// -------------------------------------------------------------
export const COUPONS_DATA: Coupon[] = [
  {
    id: 'cpn-welcome50',
    code: 'WELCOME50',
    description: 'New Student Welcome Offer: Flat 50% discount on all courses and packages',
    discountType: 'percentage',
    discountValue: 50,
    minOrderValue: 499,
    maxDiscountAmount: 3000,
    expiryDate: '2026-12-31',
    usageLimit: 2000,
    usedCount: 284,
    isActive: true,
    createdDate: '2026-01-01'
  },
  {
    id: 'cpn-maxwell50',
    code: 'MAXWELL50',
    description: 'All-India National Merit Scholarship: 50% Off (Capped at ₹7,500)',
    discountType: 'percentage',
    discountValue: 50,
    minOrderValue: 999,
    maxDiscountAmount: 7500,
    expiryDate: '2026-12-31',
    usageLimit: 5000,
    usedCount: 1842,
    isActive: true,
    createdDate: '2026-01-01'
  },
  {
    id: 'cpn-cafoundation',
    code: 'CAFOUNDATION',
    description: 'Commerce Rankers Exclusive: Flat ₹3,000 Off on CA Foundation Packages',
    discountType: 'fixed',
    discountValue: 3000,
    minOrderValue: 6000,
    expiryDate: '2026-11-30',
    usageLimit: 300,
    usedCount: 84,
    isActive: true,
    applicableCategories: ['CA & Commerce (Foundation/Inter)'],
    createdDate: '2026-02-01'
  },
  {
    id: 'cpn-topper60',
    code: 'TOPPER60',
    description: 'Super-Toppers Club: 60% Mega Discount for Outstanding Academic Performers',
    discountType: 'percentage',
    discountValue: 60,
    minOrderValue: 1999,
    maxDiscountAmount: 10000,
    expiryDate: '2026-10-31',
    usageLimit: 150,
    usedCount: 39,
    isActive: true,
    createdDate: '2026-02-15'
  },
  {
    id: 'cpn-flat1000',
    code: 'FLAT1000',
    description: 'Instant ₹1,000 Cash Voucher on orders above ₹2,999',
    discountType: 'fixed',
    discountValue: 1000,
    minOrderValue: 2999,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usedCount: 196,
    isActive: true,
    createdDate: '2026-01-10'
  },
  {
    id: 'cpn-jeeexclusive',
    code: 'JEEEXCLUSIVE',
    description: 'IIT-JEE Aspirants Special: 45% Off on Pinnacle JEE Batches & Combos',
    discountType: 'percentage',
    discountValue: 45,
    minOrderValue: 4999,
    maxDiscountAmount: 6000,
    expiryDate: '2026-09-30',
    usageLimit: 400,
    usedCount: 112,
    isActive: true,
    applicableCourseIds: ['crs-jee-pinnacle', 'prod-combo-02', 'combo-jee-pinnacle'],
    applicableCategories: ['JEE (Main & Adv)'],
    createdDate: '2026-02-20'
  },
  {
    id: 'cpn-aaravvip',
    code: 'AARAVVIP',
    description: 'Personalized VIP Loyalty Coupon: Flat ₹2,000 Off for Aarav Sharma',
    discountType: 'fixed',
    discountValue: 2000,
    minOrderValue: 3000,
    expiryDate: '2026-12-31',
    usageLimit: 1,
    usedCount: 0,
    isActive: true,
    applicableUserEmails: ['aarav.sharma@dcmaxwell.edu'],
    createdDate: '2026-02-25'
  },
  {
    id: 'cpn-expired-sample',
    code: 'EARLYEXPIRED',
    description: 'Early Season Promo (Expired) - 70% Discount',
    discountType: 'percentage',
    discountValue: 70,
    minOrderValue: 500,
    expiryDate: '2025-01-01',
    usageLimit: 50,
    usedCount: 50,
    isActive: false,
    createdDate: '2024-12-01'
  }
];

// -------------------------------------------------------------
// 2. COMBO PACKAGES DATA (Complete all-in-one bundles)
// -------------------------------------------------------------
export const COMBO_PACKAGES_DATA: ComboPackage[] = [
  {
    id: 'combo-ca-foundation',
    title: 'CA Foundation Complete All-in-One Super Package',
    tagline: 'The definitive end-to-end preparation bundle covering all 4 subjects with live classes, video library, 35 CBT mocks, printed books, and 1-on-1 CA mentorship.',
    category: 'CA & Commerce (Foundation/Inter)',
    targetExam: 'CA Foundation (ICAI May / Nov 2026)',
    price: 11999,
    originalPrice: 24999,
    discountPercentage: 52,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Flagship Combo • 52% Off',
    inclusions: {
      hasRecordedCourses: true,
      recordedCourseTitles: [
        'Principles and Practice of Accounting (120+ Hours)',
        'Business Laws & Business Correspondence (90+ Hours)',
        'Business Mathematics & Logical Reasoning (85+ Hours)',
        'Business Economics & Commercial Knowledge (60+ Hours)'
      ],
      recordedCoursesCount: 4,
      hasLiveClasses: true,
      liveClassesDetail: 'Daily Evening Interactive Live Batches with Live Chat & Instant Polls',
      hasTestSeries: true,
      testSeriesCount: 35,
      testSeriesTitles: ['Chapter-wise Tests', 'Subject Revision Mocks', 'ICAI Simulator Grand Mock Tests'],
      hasStudyMaterial: true,
      studyMaterialType: 'both',
      studyMaterialDetails: '8 Hardcopy Printed Theory & Practical Books shipped to home + In-App Digital PDF Scanner',
      hasDoubtSupport: true,
      doubtSupportType: '1on1_mentor',
      doubtSupportDetails: 'Dedicated Chartered Accountant 1-on-1 Faculty Desk with Audio/Video query solving within 30 mins',
      hasCertificate: true
    },
    validity: '18 Months Full Access',
    rating: 4.98,
    reviewsCount: 1350,
    enrolledCount: 3950,
    isBestseller: true,
    isPopular: true,
    features: [
      'Comprehensive 4-Subject HD Recorded Video Vault',
      'Daily Interactive Live Batch Sessions & Faculty Q&A',
      '35 All-India CBT Test Series with Sectional & AIR Analytics',
      '8 Physical Printed Books Delivered to your Doorstep',
      '24/7 Dedicated 1-on-1 CA Mentor for Doubt Solving',
      'Official Completion Certificate Verified with QR'
    ],
    linkedCourseIds: ['crs-ca-foundation-package'],
    linkedLiveClassIds: ['live-ca-inter-01'],
    linkedTestSeriesIds: ['test-ca-chapter-01', 'test-ca-subject-01'],
    linkedStudyMaterialIds: ['mat-ca-accounts-01']
  },
  {
    id: 'combo-jee-pinnacle',
    title: 'Pinnacle JEE 2-Year Ultimate Super Combo',
    tagline: 'Zero-compromise complete roadmap from Class 11 fundamentals to Top 100 AIR in JEE Advanced with Kota star faculty.',
    category: 'JEE (Main & Adv)',
    targetExam: 'JEE Main & JEE Advanced 2026',
    price: 19999,
    originalPrice: 39999,
    discountPercentage: 50,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
    badge: 'Super Achiever Bundle',
    inclusions: {
      hasRecordedCourses: true,
      recordedCourseTitles: ['Physics Advanced Core', 'Inorganic & Organic Chemistry Vault', 'Calculus & Algebra Mastery'],
      recordedCoursesCount: 3,
      hasLiveClasses: true,
      liveClassesDetail: 'Daily 3-Hour Interactive Live Kota Lectures with Real-Time Doubt Windows',
      hasTestSeries: true,
      testSeriesCount: 60,
      testSeriesTitles: ['NTA Pattern CBT Mocks', 'JEE Advanced High-Difficulty Challenger Series', 'Previous 15 Yrs PYQ Tests'],
      hasStudyMaterial: true,
      studyMaterialType: 'both',
      studyMaterialDetails: '16-Volume Kota Theory Modules, Mindmaps & Formula Handbook set shipped via courier',
      hasDoubtSupport: true,
      doubtSupportType: '24x7_faculty',
      doubtSupportDetails: 'Direct IITian Faculty Live Doubt Clearing Sessions + Instant AI Derivation Engine',
      hasCertificate: true
    },
    validity: '24 Months Access (Till Exam)',
    rating: 4.96,
    reviewsCount: 920,
    enrolledCount: 2840,
    isBestseller: true,
    features: [
      '2 Years Complete Live + 600+ Hrs Recorded Masterclasses',
      '16 Physical Hardcopy Study Modules Shipped to Home',
      '60 All-India CBT Test Series with Video Solutions',
      'Kota Super-Team Live Interactive Streams',
      'Unlimited 24/7 Live Doubt Resolution Desk',
      'Personalized Academic Mentorship & Target Tracker'
    ],
    linkedCourseIds: ['crs-jee-pinnacle'],
    linkedLiveClassIds: ['live-jee-adv-01'],
    linkedTestSeriesIds: ['test-jee-major-01'],
    linkedStudyMaterialIds: ['mat-jee-formula-01']
  },
  {
    id: 'combo-neet-vision',
    title: 'NEET Vision Supreme Medical Grand Combo 2026',
    tagline: 'Target 700+ in NEET UG with 3D Biology visual modules, daily NCERT line-by-line interactive drills, 50 CBT mocks, and Doctor faculty guidance.',
    category: 'NEET (Medical)',
    targetExam: 'NEET UG 2026',
    price: 14999,
    originalPrice: 29999,
    discountPercentage: 50,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
    badge: 'Medical Aspirants Choice',
    inclusions: {
      hasRecordedCourses: true,
      recordedCourseTitles: ['Botany & Zoology 3D Visualizer', 'Physical & Organic Chemistry', 'Physics for NEET Rankers'],
      recordedCoursesCount: 3,
      hasLiveClasses: true,
      liveClassesDetail: 'Daily NCERT Word-to-Word Analysis & Live Rapid-Fire Quizzes',
      hasTestSeries: true,
      testSeriesCount: 50,
      testSeriesTitles: ['200-Min Exact NEET Simulator Mocks', 'Chapter-wise NCERT Extract Tests'],
      hasStudyMaterial: true,
      studyMaterialType: 'both',
      studyMaterialDetails: '12-Module NCERT Booster Books, High-Yield Flashcards & Diagram Posters Shipped',
      hasDoubtSupport: true,
      doubtSupportType: '1on1_mentor',
      doubtSupportDetails: 'Senior Medical Faculty & MBBS Mentors Available for 1-on-1 audio/video doubts',
      hasCertificate: true
    },
    validity: '18 Months Full Access',
    rating: 4.93,
    reviewsCount: 810,
    enrolledCount: 2310,
    features: [
      '3D Visual Biology, Chemistry & Physics Lecture Vault',
      'Daily NCERT Line-by-Line Interactive Live Sessions',
      '50 Full Syllabus Medical Mock Exams (NCERT Tagged)',
      'Complete Printed Material Set Shipped to Home',
      'Doctor & MBBS Senior Mentors for Doubt Solving',
      'Digital Certificate of Medical Academic Excellence'
    ],
    linkedCourseIds: ['crs-neet-vision'],
    linkedLiveClassIds: ['live-neet-bio-01'],
    linkedTestSeriesIds: [],
    linkedStudyMaterialIds: []
  },
  {
    id: 'combo-commerce-360',
    title: 'Class 11 + 12 Commerce & CA Foundation Integrated Combo',
    tagline: 'Dual-advantage integrated curriculum preparing students simultaneously for 95%+ in CBSE Board exams and 1st-attempt CA Foundation clearance.',
    category: 'CA & Commerce (Foundation/Inter)',
    targetExam: 'CBSE 12th Commerce & CA Foundation',
    price: 16499,
    originalPrice: 34999,
    discountPercentage: 53,
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    badge: 'Integrated Board + CA Combo',
    inclusions: {
      hasRecordedCourses: true,
      recordedCourseTitles: ['Class 11/12 Accounts & Economics', 'Business Studies Mastery', 'CA Foundation 4 Subjects'],
      recordedCoursesCount: 5,
      hasLiveClasses: true,
      liveClassesDetail: 'Weekend Special Conceptual Live Classes & Board Answer Writing Workshops',
      hasTestSeries: true,
      testSeriesCount: 40,
      testSeriesTitles: ['CBSE Board Sample Papers', 'CA Foundation ICAI Mocks'],
      hasStudyMaterial: true,
      studyMaterialType: 'both',
      studyMaterialDetails: 'Complete Commerce Compendium + ICAI Scanner Books + Digital PDF Vault',
      hasDoubtSupport: true,
      doubtSupportType: '24x7_faculty',
      doubtSupportDetails: 'Dedicated Subject Matter Experts for Board & Professional exam guidance',
      hasCertificate: true
    },
    validity: '24 Months Full Access',
    rating: 4.90,
    reviewsCount: 460,
    enrolledCount: 1620,
    features: [
      'Dual Syllabus Alignment (Board + CA Foundation)',
      'Subjective Answer Presentation Coaching for Accounts',
      '40 Comprehensive Mocks with Human Evaluation',
      'Full Physical Book Delivery + Digital Vault Access',
      'Continuous Doubt Solving and Faculty Support'
    ],
    linkedCourseIds: ['crs-ca-foundation-package', 'crs-cbse-12'],
    linkedLiveClassIds: [],
    linkedTestSeriesIds: ['test-ca-chapter-01'],
    linkedStudyMaterialIds: ['mat-ca-accounts-01']
  }
];

// -------------------------------------------------------------
// 3. SUBSCRIPTION PLANS (Future-Ready Recurring Membership)
// -------------------------------------------------------------
export const SUBSCRIPTION_PLANS_DATA: SubscriptionPlan[] = [
  {
    id: 'sub-monthly',
    tierName: 'DC Maxwell Pro Monthly',
    billingPeriod: 'monthly',
    billingIntervalText: '/ month',
    price: 1999,
    originalPrice: 3499,
    discountPercentage: 43,
    description: 'High-flexibility monthly pass unlocking all recorded courses and the comprehensive study material vault.',
    colorTheme: 'blue',
    benefits: {
      premiumCoursesAccess: 'curated',
      testSeriesUnlimited: true,
      studyMaterialVault: true,
      liveClassesAccess: 'selected_weekly',
      doubtSupport: 'standard_desk',
      exclusiveMasterclasses: false,
      hardcopyDelivery: false,
      verifiedCertificates: true
    },
    highlightFeatures: [
      'Access to 50+ Recorded Courses & Video Lessons',
      'Unlimited Chapter-wise & Subject CBT Tests',
      'Complete Digital PDF Vault & Study Modules',
      'Standard In-App Faculty Doubt Desk',
      'Cancel Anytime with Zero Cancellation Fees'
    ]
  },
  {
    id: 'sub-quarterly',
    tierName: 'DC Maxwell Scholar Quarterly',
    billingPeriod: 'quarterly',
    billingIntervalText: '/ 3 months',
    price: 4999,
    originalPrice: 9999,
    discountPercentage: 50,
    description: 'Optimized 3-month semester pass with live classes, unlimited mock tests, and faculty doubt resolution.',
    badge: 'Popular for Exam Sprints',
    colorTheme: 'indigo',
    benefits: {
      premiumCoursesAccess: 'all',
      testSeriesUnlimited: true,
      studyMaterialVault: true,
      liveClassesAccess: 'selected_weekly',
      doubtSupport: 'standard_desk',
      exclusiveMasterclasses: true,
      hardcopyDelivery: false,
      verifiedCertificates: true
    },
    highlightFeatures: [
      'Unlimited Access to All Stream Courses & Video Vaults',
      'Access to Selected Weekly Live Batches & Masterclasses',
      'All 100+ All-India CBT Test Series with Instant AIR',
      'High-Speed PDF Reader with Offline Download Sync',
      'Save 17% compared to monthly billing'
    ]
  },
  {
    id: 'sub-annual',
    tierName: 'DC Maxwell All-Access Annual VIP',
    billingPeriod: 'annual',
    billingIntervalText: '/ year (₹1,249/mo)',
    price: 14999,
    originalPrice: 29999,
    discountPercentage: 50,
    description: 'The ultimate unlimited pass: complete access to all live batches, video vaults, test series, hardcopy books, and 1-on-1 mentorship for 365 days.',
    badge: 'Best Value • 78% Aspirants Choose This',
    isPopular: true,
    isRecommended: true,
    colorTheme: 'purple',
    benefits: {
      premiumCoursesAccess: 'all',
      testSeriesUnlimited: true,
      studyMaterialVault: true,
      liveClassesAccess: 'unlimited',
      doubtSupport: 'priority_1on1',
      exclusiveMasterclasses: true,
      hardcopyDelivery: true,
      verifiedCertificates: true
    },
    highlightFeatures: [
      'Unlimited Entry to ALL Live Interactive Batches (JEE, NEET, CA, UPSC)',
      'Full Unrestricted Access to 1,000+ Hours Recorded Lectures',
      'All 100+ All-India Mock Test Series with Video Solutions',
      'Free Home Delivery of Printed Hardcopy Study Modules',
      'Priority 1-on-1 Faculty Mentorship & Doubt Resolution',
      'Verified Academic Completion Certificates with QR Verification'
    ]
  },
  {
    id: 'sub-lifetime',
    tierName: 'DC Maxwell 2-Year Ultimate Ranker Pass',
    billingPeriod: 'lifetime',
    billingIntervalText: 'for 24 months (₹1,041/mo)',
    price: 24999,
    originalPrice: 49999,
    discountPercentage: 50,
    description: 'Complete 2-year uninterrupted academic sponsorship for serious long-term competitive exam rankers.',
    badge: '2-Year Full Career Pass',
    colorTheme: 'emerald',
    benefits: {
      premiumCoursesAccess: 'all',
      testSeriesUnlimited: true,
      studyMaterialVault: true,
      liveClassesAccess: 'unlimited',
      doubtSupport: 'priority_1on1',
      exclusiveMasterclasses: true,
      hardcopyDelivery: true,
      verifiedCertificates: true
    },
    highlightFeatures: [
      '24 Months VIP All-Inclusive Academic Access Across All Domains',
      'Complete Sets of Printed Study Materials for 2 Academic Years',
      'Unlimited 1-on-1 Faculty Counseling & Target Strategy Calls',
      'Exclusive Access to Closed-Door Top Ranker Masterclasses',
      'VIP Fast-Track Doubt Resolution (<15 Min SLA)'
    ]
  }
];

// ==========================================
// CMS DEFAULT DATA SEEDING
// ==========================================

export const DEFAULT_ADMIN_VIDEOS: AdminVideoItem[] = [
  {
    id: 'vid-101',
    title: 'Rotational Dynamics & Torque In-Depth Masterclass',
    courseTitle: 'Pinnacle JEE Advanced Comprehensive 2026',
    courseId: 'crs-jee-pinnacle',
    subject: 'Physics',
    faculty: 'Er. Rajeshwar Varma (ex-IIT Kanpur)',
    duration: '54 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
    resolution: '1080p',
    isFreePreview: true,
    drmProtected: true,
    viewsCount: 14280,
    uploadedDate: '2026-02-18',
    status: 'published',
    description: 'Full derivation of moment of inertia tensors, rolling without slipping, and previous 10-year JEE Advanced questions.'
  },
  {
    id: 'vid-102',
    title: 'Reaction Mechanisms: Aldehydes, Ketones & Carboxylic Acids',
    courseTitle: 'Pinnacle JEE Advanced Comprehensive 2026',
    courseId: 'crs-jee-pinnacle',
    subject: 'Organic Chemistry',
    faculty: 'Prof. Neha Singhal (Kota Star Faculty)',
    duration: '62 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    resolution: '4K UHD',
    isFreePreview: false,
    drmProtected: true,
    viewsCount: 9840,
    uploadedDate: '2026-02-22',
    status: 'published',
    description: 'Nucleophilic additions, Cannizzaro reactions, Aldol condensations with stereochemical mechanisms.'
  },
  {
    id: 'vid-103',
    title: 'Human Cardiac Cycle & ECG Waveform Interpretation',
    courseTitle: 'Vision NEET-UG Intensive Clinical Biology Batch',
    courseId: 'crs-neet-vision',
    subject: 'Zoology',
    faculty: 'Dr. Ananya Mukherjee (AIIMS New Delhi)',
    duration: '48 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    resolution: '1080p',
    isFreePreview: true,
    drmProtected: true,
    viewsCount: 22400,
    uploadedDate: '2026-02-10',
    status: 'published',
    description: '3D cardiac chamber animations, ventricular systole/diastole pressure gradients and NEET MCQs.'
  },
  {
    id: 'vid-104',
    title: 'Indian Constitution: Preamble, Fundamental Rights & Judicial Review',
    courseTitle: 'Sankalp UPSC CSE Prelims + Mains Foundation 2026',
    courseId: 'crs-upsc-sankalp',
    subject: 'Indian Polity',
    faculty: 'S. Vikramaditya (ex-Civil Servant)',
    duration: '75 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    resolution: '1080p',
    isFreePreview: false,
    drmProtected: true,
    viewsCount: 8120,
    uploadedDate: '2026-02-25',
    status: 'published',
    description: 'Landmark Supreme Court cases, Basic Structure Doctrine, and Art. 21 right to privacy expansions.'
  },
  {
    id: 'vid-105',
    title: 'Calculus: Definite Integration & Area Under Curves',
    courseTitle: 'Pinnacle JEE Advanced Comprehensive 2026',
    courseId: 'crs-jee-pinnacle',
    subject: 'Mathematics',
    faculty: 'K. Ramanathan (Gold Medalist ISI)',
    duration: '58 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    resolution: '720p',
    isFreePreview: true,
    drmProtected: false,
    viewsCount: 16900,
    uploadedDate: '2026-02-28',
    status: 'draft',
    description: 'Leibnitz integral rule, symmetry properties, and bounding functional equations.'
  }
];

export const DEFAULT_ADMIN_PDFS: AdminPdfItem[] = [
  {
    id: 'pdf-201',
    title: 'Complete JEE Advanced Physics Formula & Derivations Handbook',
    subject: 'Physics',
    category: 'JEE (Main & Adv)',
    fileSize: '8.4 MB',
    pagesCount: 84,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 34100,
    authorFaculty: 'Er. Rajeshwar Varma',
    updatedDate: '2026-02-15',
    hasWatermark: true,
    status: 'published',
    targetExam: 'JEE Advanced 2026'
  },
  {
    id: 'pdf-202',
    title: 'NEET 2026 High-Yield Biology Diagram Compendium with NCERT Citations',
    subject: 'Biology',
    category: 'NEET (Medical)',
    fileSize: '16.2 MB',
    pagesCount: 120,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 42800,
    authorFaculty: 'Dr. Ananya Mukherjee',
    updatedDate: '2026-02-20',
    hasWatermark: true,
    status: 'published',
    targetExam: 'NEET UG 2026'
  },
  {
    id: 'pdf-203',
    title: 'UPSC GS Paper II 15-Year Mains Model Answers & Mind Maps',
    subject: 'Governance & Polity',
    category: 'UPSC & Civil Services',
    fileSize: '24.5 MB',
    pagesCount: 210,
    downloadUrl: '#',
    isFree: false,
    downloadsCount: 11900,
    authorFaculty: 'S. Vikramaditya',
    updatedDate: '2026-01-28',
    hasWatermark: true,
    status: 'published',
    targetExam: 'UPSC CSE 2026'
  },
  {
    id: 'pdf-204',
    title: 'Physical Chemistry Quick Equation Sheet & Dimensional Constants',
    subject: 'Chemistry',
    category: 'JEE (Main & Adv)',
    fileSize: '3.6 MB',
    pagesCount: 32,
    downloadUrl: '#',
    isFree: true,
    downloadsCount: 19500,
    authorFaculty: 'Prof. Neha Singhal',
    updatedDate: '2026-02-24',
    hasWatermark: false,
    status: 'published',
    targetExam: 'JEE Main 2026'
  }
];

export const DEFAULT_ADMIN_NOTES: AdminNotesItem[] = [
  {
    id: 'note-301',
    title: 'Electrodynamics & Maxwell Equations: Handwritten Kota Class Notes',
    subject: 'Physics',
    chapter: 'Electromagnetic Waves & Optics',
    faculty: 'Er. Rajeshwar Varma',
    format: 'Handwritten',
    pagesCount: 48,
    fileSize: '9.2 MB',
    isFree: true,
    downloadUrl: '#',
    contentSummary: 'Original classroom chalkboard notes covering displacement current, Poynting vectors, and wave propagation in dielectric media.',
    updatedDate: '2026-02-14',
    status: 'published'
  },
  {
    id: 'note-302',
    title: 'Genetics & Molecular Basis of Inheritance Master Mind Map',
    subject: 'Zoology & Genetics',
    chapter: 'Molecular Biology',
    faculty: 'Dr. Ananya Mukherjee',
    format: 'Mind Map',
    pagesCount: 16,
    fileSize: '4.8 MB',
    isFree: true,
    downloadUrl: '#',
    contentSummary: 'Visual color-coded synthesis diagrams for DNA replication, Lac Operon transcription regulation, and Mendelian pedigree analysis.',
    updatedDate: '2026-02-22',
    status: 'published'
  },
  {
    id: 'note-303',
    title: 'Inorganic Coordination Compounds & Crystal Field Theory Revision Digest',
    subject: 'Inorganic Chemistry',
    chapter: 'Coordination Chemistry',
    faculty: 'Prof. Neha Singhal',
    format: 'Typed',
    pagesCount: 36,
    fileSize: '5.1 MB',
    isFree: false,
    downloadUrl: '#',
    contentSummary: 'Complete CFT splitting diagrams, Jahn-Teller distortion cases, isomerism classification, and IUPAC nomenclature cheat sheet.',
    updatedDate: '2026-02-19',
    status: 'published'
  }
];

export const DEFAULT_ADMIN_ANNOUNCEMENTS: AdminAnnouncementItem[] = [
  {
    id: 'ann-401',
    title: 'NTA JEE Main Session 2 Admit Cards Live - Download Instructions',
    message: 'National Testing Agency has released official admit cards for JEE Main 2026. Verify your roll number, reporting time, and shift centre. Self-declaration undertaking required at CBT hall.',
    category: 'urgent',
    targetAudience: 'JEE Aspirants',
    priority: 'urgent',
    publishDate: '2026-03-01',
    expiresDate: '2026-04-15',
    isActive: true,
    actionUrl: 'view:student_portal',
    actionText: 'View CBT Center Guidelines'
  },
  {
    id: 'ann-402',
    title: 'All-India Open Scholarship CBT Test (MAX-SCHOLAR 2026) This Sunday',
    message: 'Compete with over 50,000 students nationwide. Top 100 rankers will be awarded 100% scholarship on our 2026-27 Flagship Super 30 Batches. Test starts 10:00 AM sharp.',
    category: 'exam_alert',
    targetAudience: 'All Students',
    priority: 'high',
    publishDate: '2026-02-28',
    expiresDate: '2026-03-10',
    isActive: true,
    actionUrl: 'view:tests',
    actionText: 'Register Free Mock'
  },
  {
    id: 'ann-403',
    title: 'Live Doubt Clearing Marathon with AIIMS & IITian Faculty on Saturday',
    message: 'Special 6-hour non-stop interactive problem-solving session. Submit your complex questions in advance via the Doubt Resolution portal.',
    category: 'batch_update',
    targetAudience: 'All Students',
    priority: 'medium',
    publishDate: '2026-02-25',
    isActive: true,
    actionUrl: 'view:live_classes',
    actionText: 'Join Classroom'
  }
];

export const DEFAULT_ADMIN_BLOGS: AdminBlogItem[] = [
  {
    id: 'blog-501',
    title: 'How AIR 04 Mastered Organic Chemistry in the Final 60 Days',
    slug: 'air-04-organic-chemistry-final-60-days',
    category: 'Topper Secrets',
    author: 'Aarav Singhania (AIR 04, JEE Adv 2025)',
    authorRole: 'IIT Bombay Computer Science & DC Maxwell Alumni',
    readTime: '6 min read',
    publishDate: '2026-02-20',
    summary: 'A step-by-step roadmap on converting reaction roadmaps into muscle memory and avoiding negative marking in multiple correct questions.',
    content: 'Organic Chemistry often intimidates JEE aspirants due to the sheer volume of reagents. My breakthrough came when I stopped memorizing isolated reactions and started grouping them into mechanistic categories: Electrophilic Aromatic Substitutions, Nucleophilic Additions, and Acid Derivatives. Daily 30-minute reaction mapping before bed made all the difference.',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tags: ['JEE Advanced', 'Topper Interview', 'Organic Chemistry', 'Revision'],
    viewsCount: 14200,
    likesCount: 1840,
    status: 'published'
  },
  {
    id: 'blog-502',
    title: 'NEET 2026 Biology: Why 360/360 Requires NCERT Between-the-Lines Reading',
    slug: 'neet-2026-biology-perfect-score-ncert-strategy',
    category: 'Subject Mastery',
    author: 'Dr. Ananya Mukherjee',
    authorRole: 'Head of Clinical Sciences & AIIMS Gold Medalist',
    readTime: '8 min read',
    publishDate: '2026-02-15',
    summary: 'Discover how NTA frames Assertion-Reason questions directly from NCERT footnotes, scientist biographies, and diagram captions.',
    content: 'In NEET Biology, scoring 320 is easy, but reaching 360 requires forensic attention to the NCERT textbook. Pay particular attention to unit summary pages and the historical introductions preceding each unit. NTA frequently lifts tricky statements straight from introductory chapters.',
    coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    tags: ['NEET UG', 'Biology 360', 'NCERT', 'Assertion Reason'],
    viewsCount: 22800,
    likesCount: 3100,
    status: 'published'
  },
  {
    id: 'blog-503',
    title: 'Mastering the UPSC Mains Answer Writing Clock: 7 Minutes per 10-Marker',
    slug: 'upsc-mains-answer-writing-speed-strategy',
    category: 'Exam Strategy',
    author: 'S. Vikramaditya',
    authorRole: 'Senior Academic Director, Civil Services Division',
    readTime: '7 min read',
    publishDate: '2026-02-10',
    summary: 'Structuring introductions, multi-dimensional headings (PESTLE framework), and constitutional case laws in under 420 seconds.',
    content: 'The real challenge of UPSC Mains is not knowledge—it is throughput. Candidates have approximately 7 minutes for 10-mark questions and 11 minutes for 15-mark questions. Learn how to outline instantly with our standard 3-box diagram technique.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    tags: ['UPSC CSE', 'Mains Answer Writing', 'Time Management'],
    viewsCount: 9750,
    likesCount: 1420,
    status: 'published'
  }
];

export const DEFAULT_ADMIN_BANNERS: AdminBannerItem[] = [
  {
    id: 'ban-601',
    title: 'Crack JEE & NEET 2026 with Kota Super-30 Pedagogy',
    subtitle: 'Flat 40% Off on All Annual Comprehensive Batches. Includes 30 Full CBT Mocks & Printed Study Kit.',
    placement: 'homepage_hero',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    backgroundColor: '#1e1b4b',
    ctaText: 'Enroll in 2026 Batch',
    ctaAction: 'view:courses',
    targetAudience: 'all',
    displayOrder: 1,
    isActive: true,
    clickCount: 8430,
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  },
  {
    id: 'ban-602',
    title: 'Live NTA CBT Mock Test Engine: Rank Predictor & AIR Analysis',
    subtitle: 'Experience authentic screen interface, real-time percentile computation, and question-level speed telemetry.',
    placement: 'student_portal',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    backgroundColor: '#064e3b',
    ctaText: 'Start Free Mock Exam',
    ctaAction: 'view:tests',
    targetAudience: 'enrolled_students',
    displayOrder: 2,
    isActive: true,
    clickCount: 12890,
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  },
  {
    id: 'ban-603',
    title: 'DC Maxwell Mobile App 2026 - Study Anytime Offline',
    subtitle: 'Download lectures, solve daily quizzes on the go, and get 24/7 AI Doubt Resolution.',
    placement: 'mobile_app',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    backgroundColor: '#312e81',
    ctaText: 'Open App Simulator',
    ctaAction: 'view:mobile_app',
    targetAudience: 'all',
    displayOrder: 3,
    isActive: true,
    clickCount: 6540,
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  }
];

export const DEFAULT_ADMIN_FAQS: AdminFaqItem[] = [
  {
    id: 'faq-701',
    question: 'How are the live interactive course lectures conducted at DC Maxwell Academy?',
    answer: 'Live classes are conducted via our proprietary low-latency WebRTC classroom with interactive real-time Q&A, live polls with instant percentage telemetry, hand-raising, and chalkboard notes automatically rendered into PDF immediately following each class.',
    category: 'Courses',
    displayOrder: 1,
    isActive: true,
    helpfulVotes: 342,
    updatedAt: '2026-02-15'
  },
  {
    id: 'faq-702',
    question: 'What payment modes and installment EMI options are accepted?',
    answer: 'We support all major payment gateways including UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and No-Cost EMI options (3, 6, 9, 12 months) via leading partner banks.',
    category: 'Payments',
    displayOrder: 2,
    isActive: true,
    helpfulVotes: 412,
    updatedAt: '2026-02-16'
  },
  {
    id: 'faq-703',
    question: 'Does the CBT test series match the exact National Testing Agency (NTA) exam format?',
    answer: 'Yes, 100%. Our CBT exam engine replicates the exact NTA color palette (Answered, Not Answered, Marked for Review, Not Visited), section timers, negative marking scheme (+4 / -1), scientific calculator where applicable, and produces an All-India Percentile rank within seconds of submission.',
    category: 'Exams',
    displayOrder: 3,
    isActive: true,
    helpfulVotes: 489,
    updatedAt: '2026-02-18'
  },
  {
    id: 'faq-704',
    question: 'What is the refund policy and process if I want to cancel my course enrollment?',
    answer: 'We offer an unconditional 7-day money-back guarantee. If you are not completely satisfied with the course pedagogy, faculty mentorship, or test engine within 7 calendar days of enrollment, you can submit a refund ticket for a 100% full refund with zero cancellation fee processed back to the original source in 4-5 business days.',
    category: 'Refunds',
    displayOrder: 4,
    isActive: true,
    helpfulVotes: 378,
    updatedAt: '2026-02-05'
  },
  {
    id: 'faq-705',
    question: 'Can I download video lectures and study offline on mobile devices without buffering?',
    answer: 'Yes! Our Android and iOS mobile applications allow students to download encrypted, DRM-protected video lectures and revision notes directly to internal device storage for seamless high-speed offline playback without cellular connectivity.',
    category: 'Technical Support',
    displayOrder: 5,
    isActive: true,
    helpfulVotes: 512,
    updatedAt: '2026-02-24'
  },
  {
    id: 'faq-706',
    question: 'How do I reset my registered mobile number, email address, or password?',
    answer: 'You can update your profile information from Student Profile > Account Security, or raise an Account ticket with our Verification Desk. Mobile number updates require OTP verification on both old and new numbers for anti-piracy security.',
    category: 'Account Issues',
    displayOrder: 6,
    isActive: true,
    helpfulVotes: 231,
    updatedAt: '2026-02-20'
  },
  {
    id: 'faq-707',
    question: 'How and when will the physical printed books and DPP modules be delivered?',
    answer: 'Once you enroll in an Annual Comprehensive Batch or VIP Subscription, the 14-volume printed study package is dispatched via BlueDart / Delhivery within 48 business hours with live tracking provided in your Student Dashboard. Average doorstep delivery is 3 to 5 business days across India.',
    category: 'Courses',
    displayOrder: 7,
    isActive: true,
    helpfulVotes: 295,
    updatedAt: '2026-02-10'
  }
];

// ==========================================
// DEFAULT ACADEMIC BATCHES
// ==========================================
export const DEFAULT_ACADEMIC_BATCHES: AcademicBatch[] = [
  {
    id: 'batch-jee-alpha-2026',
    name: 'Pinnacle JEE Advanced 2026 - Alpha Elite',
    code: 'PIN-JEE-26-ALPHA',
    courseId: 'crs-jee-pinnacle',
    courseTitle: 'Pinnacle JEE Advanced 2026',
    targetExam: 'JEE Advanced 2026',
    academicYear: '2025-2026',
    status: 'Active',
    maxCapacity: 60,
    description: 'Premier flagship cohort for top 500 AIR aspirants in JEE Advanced with daily high-yield problem solving and Olympiad level mechanics.',
    schedule: {
      days: ['Mon', 'Wed', 'Fri', 'Sat'],
      timeSlot: '05:30 PM - 08:00 PM',
      startDate: '2026-03-01',
      endDate: '2026-12-30',
      roomOrStreamLink: 'https://live.dcmaxwell.edu/stream/jee-alpha-room1',
      isOnline: true,
      totalClassesScheduled: 140,
      classesCompleted: 36
    },
    subjects: ['Physics', 'Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Mathematics'],
    faculty: [
      {
        id: 'fac-1',
        name: 'Er. Rajeshwar Varma',
        subject: 'Physics',
        role: 'Lead Master Faculty',
        email: 'rajeshwar.varma@dcmaxwell.edu',
        phone: '+91 98111 22334',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'fac-2',
        name: 'Dr. Arvind Swaminathan',
        subject: 'Chemistry',
        role: 'Lead Master Faculty',
        email: 'arvind.chem@dcmaxwell.edu',
        phone: '+91 98222 33445',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'fac-3',
        name: 'Prof. Meenakshi Sundaram',
        subject: 'Mathematics',
        role: 'Subject Expert',
        email: 'meenakshi.math@dcmaxwell.edu',
        phone: '+91 98333 44556',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      }
    ],
    students: [
      {
        id: 'usr-student-01',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@dcmaxwell.edu',
        phone: '+91 98765 43210',
        enrollmentNo: 'DCM-2026-0042',
        enrolledDate: '2026-02-10',
        attendancePercent: 96,
        status: 'Active'
      },
      {
        id: 'std-102',
        name: 'Rohan Gupta',
        email: 'rohan.gupta99@gmail.com',
        phone: '+91 98112 34567',
        enrollmentNo: 'DCM-2026-0089',
        enrolledDate: '2026-02-14',
        attendancePercent: 92,
        status: 'Active'
      },
      {
        id: 'std-103',
        name: 'Ananya Sen',
        email: 'ananya.sen.kolkata@gmail.com',
        phone: '+91 98301 23456',
        enrollmentNo: 'DCM-2026-0112',
        enrolledDate: '2026-02-18',
        attendancePercent: 88,
        status: 'Active'
      },
      {
        id: 'std-104',
        name: 'Kabir Mehta',
        email: 'kabir.mehta@gmail.com',
        phone: '+91 99123 44556',
        enrollmentNo: 'DCM-2026-0145',
        enrolledDate: '2026-02-20',
        attendancePercent: 95,
        status: 'Active'
      }
    ],
    videos: [
      {
        id: 'bvid-1',
        title: 'Rotational Dynamics: Calculation of Moment of Inertia for Non-Uniform Mass Distributions',
        subject: 'Physics',
        faculty: 'Er. Rajeshwar Varma',
        duration: '1h 48m',
        url: 'https://stream.dcmaxwell.edu/vod/rot-dyn-01',
        recordedDate: '2026-03-01',
        isLiveRecording: true
      },
      {
        id: 'bvid-2',
        title: 'Chemical Equilibrium & Le Chatelier Principle in Heterogeneous Systems',
        subject: 'Chemistry',
        faculty: 'Dr. Arvind Swaminathan',
        duration: '1h 35m',
        url: 'https://stream.dcmaxwell.edu/vod/chem-eq-02',
        recordedDate: '2026-03-02',
        isLiveRecording: true
      },
      {
        id: 'bvid-3',
        title: 'Definite Integrals as Limit of Sums & Telescoping Sequences',
        subject: 'Mathematics',
        faculty: 'Prof. Meenakshi Sundaram',
        duration: '2h 10m',
        url: 'https://stream.dcmaxwell.edu/vod/math-def-int',
        recordedDate: '2026-03-03',
        isLiveRecording: true
      }
    ],
    tests: [
      {
        id: 'btst-1',
        title: 'CBT Major Assessment 01: Kinematics, Dynamics & Thermodynamics',
        subject: 'Physics',
        totalMarks: 100,
        durationMinutes: 60,
        scheduledDate: '2026-03-08',
        status: 'Upcoming'
      },
      {
        id: 'btst-2',
        title: 'Bi-Weekly Part Test: Stoichiometry & Gaseous State',
        subject: 'Chemistry',
        totalMarks: 100,
        durationMinutes: 60,
        scheduledDate: '2026-03-12',
        status: 'Upcoming'
      },
      {
        id: 'btst-3',
        title: 'Calculus Benchmark Diagnostic: Continuity & Differentiability',
        subject: 'Mathematics',
        totalMarks: 100,
        durationMinutes: 60,
        scheduledDate: '2026-02-28',
        status: 'Completed'
      }
    ],
    studyMaterial: [
      {
        id: 'bmat-1',
        title: 'Advanced Mechanics DPP 01-15 with Complete Multi-Concept Solutions',
        subject: 'Physics',
        type: 'DPP',
        fileSize: '14.8 MB',
        pages: 64,
        downloadUrl: 'https://assets.dcmaxwell.edu/pdf/mechanics_dpp.pdf',
        uploadDate: '2026-02-25'
      },
      {
        id: 'bmat-2',
        title: 'Organic Chemistry Named Reaction Master Map (JEE Advanced Crucial)',
        subject: 'Chemistry',
        type: 'Formula Sheet',
        fileSize: '6.4 MB',
        pages: 28,
        downloadUrl: 'https://assets.dcmaxwell.edu/pdf/organic_reactions.pdf',
        uploadDate: '2026-02-26'
      },
      {
        id: 'bmat-3',
        title: 'Coordinate Geometry Conic Sections High-Yield Workbook',
        subject: 'Mathematics',
        type: 'Notes',
        fileSize: '18.2 MB',
        pages: 82,
        downloadUrl: 'https://assets.dcmaxwell.edu/pdf/conics_workbook.pdf',
        uploadDate: '2026-02-27'
      }
    ]
  },
  {
    id: 'batch-neet-vision-2026',
    name: 'Dr. Visionary NEET UG 2026 - Super 50 Batch',
    code: 'DRV-NEET-26-S50',
    courseId: 'crs-neet-vision',
    courseTitle: 'Dr. Visionary NEET UG 2026',
    targetExam: 'NEET UG 2026',
    academicYear: '2025-2026',
    status: 'Active',
    maxCapacity: 50,
    description: 'Specialized 720/720 target cohort emphasizing line-by-line NCERT Biology decoding, chemical pedigree charts, and high-speed medical physics.',
    schedule: {
      days: ['Tue', 'Thu', 'Sat', 'Sun'],
      timeSlot: '04:00 PM - 07:00 PM',
      startDate: '2026-02-15',
      endDate: '2026-11-25',
      roomOrStreamLink: 'https://live.dcmaxwell.edu/stream/neet-super50-room2',
      isOnline: true,
      totalClassesScheduled: 160,
      classesCompleted: 44
    },
    subjects: ['Botany', 'Zoology', 'Human Physiology', 'Physics for NEET', 'Chemistry'],
    faculty: [
      {
        id: 'fac-4',
        name: 'Dr. Sneha Kulkarni',
        subject: 'Botany & Zoology',
        role: 'Lead Master Faculty',
        email: 'sneha.bio@dcmaxwell.edu',
        phone: '+91 98444 55667',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'fac-2',
        name: 'Dr. Arvind Swaminathan',
        subject: 'Chemistry',
        role: 'Subject Expert',
        email: 'arvind.chem@dcmaxwell.edu',
        phone: '+91 98222 33445',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      }
    ],
    students: [
      {
        id: 'usr-student-01',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@dcmaxwell.edu',
        phone: '+91 98765 43210',
        enrollmentNo: 'DCM-2026-0042',
        enrolledDate: '2026-02-12',
        attendancePercent: 94,
        status: 'Active'
      },
      {
        id: 'std-105',
        name: 'Tanvi Bhatnagar',
        email: 'tanvi.bhatnagar@gmail.com',
        phone: '+91 99100 88234',
        enrollmentNo: 'DCM-2026-0158',
        enrolledDate: '2026-02-16',
        attendancePercent: 98,
        status: 'Active'
      }
    ],
    videos: [
      {
        id: 'bvid-4',
        title: 'Morphology of Flowering Plants: Floral Formulae & Taxonomic Families',
        subject: 'Botany',
        faculty: 'Dr. Sneha Kulkarni',
        duration: '1h 52m',
        url: 'https://stream.dcmaxwell.edu/vod/botany-floral',
        recordedDate: '2026-02-28',
        isLiveRecording: true
      }
    ],
    tests: [
      {
        id: 'btst-4',
        title: 'Full Length Biology Drill: 100 NCERT Pure Questions',
        subject: 'Botany & Zoology',
        totalMarks: 360,
        durationMinutes: 90,
        scheduledDate: '2026-03-09',
        status: 'Upcoming'
      }
    ],
    studyMaterial: [
      {
        id: 'bmat-4',
        title: 'NCERT Exemplar Line-by-Line Biology Notes with Diagram Keys',
        subject: 'Botany',
        type: 'Notes',
        fileSize: '24.1 MB',
        pages: 110,
        downloadUrl: 'https://assets.dcmaxwell.edu/pdf/ncert_exemplar_bio.pdf',
        uploadDate: '2026-02-22'
      }
    ]
  },
  {
    id: 'batch-upsc-samarth-2026',
    name: 'Samarth IAS Foundation 2026 - Morning Cohort',
    code: 'SMT-UPSC-26-MORN',
    courseId: 'crs-upsc-samarth',
    courseTitle: 'Samarth IAS Foundation 2026',
    targetExam: 'UPSC CSE 2026',
    academicYear: '2025-2026',
    status: 'Upcoming',
    maxCapacity: 45,
    description: 'Comprehensive GS Prelims + Mains + CSAT foundation with daily answer writing mentorship by retired civil servants.',
    schedule: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      timeSlot: '07:30 AM - 10:00 AM',
      startDate: '2026-03-15',
      endDate: '2027-02-28',
      roomOrStreamLink: 'https://live.dcmaxwell.edu/stream/upsc-morn-room3',
      isOnline: true,
      totalClassesScheduled: 220,
      classesCompleted: 0
    },
    subjects: ['Indian Polity', 'Modern Indian History', 'Geography & Environment', 'Ethics & Integrity', 'Current Affairs'],
    faculty: [
      {
        id: 'fac-5',
        name: 'Dr. Vivek Sengupta',
        subject: 'Indian Polity & Governance',
        role: 'Lead Master Faculty',
        email: 'vivek.ias@dcmaxwell.edu',
        phone: '+91 98777 88990',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      }
    ],
    students: [
      {
        id: 'std-106',
        name: 'Kunal Deshmukh',
        email: 'kunal.deshmukh@outlook.com',
        phone: '+91 97234 56789',
        enrollmentNo: 'DCM-2026-0182',
        enrolledDate: '2026-02-25',
        attendancePercent: 100,
        status: 'Active'
      }
    ],
    videos: [],
    tests: [
      {
        id: 'btst-5',
        title: 'GS Prelims Mini Mock 01: Constitutional Framework & Fundamental Rights',
        subject: 'Indian Polity',
        totalMarks: 200,
        durationMinutes: 120,
        scheduledDate: '2026-03-25',
        status: 'Upcoming'
      }
    ],
    studyMaterial: [
      {
        id: 'bmat-5',
        title: 'Indian Constitution Articles at a Glance & Landmark Supreme Court Judgments',
        subject: 'Indian Polity',
        type: 'Notes',
        fileSize: '12.5 MB',
        pages: 58,
        downloadUrl: 'https://assets.dcmaxwell.edu/pdf/polity_handbook.pdf',
        uploadDate: '2026-02-28'
      }
    ]
  }
];

// ==========================================
// DEFAULT SUPPORT TICKETS
// ==========================================
export const DEFAULT_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1001',
    ticketNumber: 'TKT-1001',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    category: 'Payment',
    subject: 'Amount debited via UPI but receipt showing pending confirmation',
    description: 'I attempted UPI payment of ₹14,999 for Pinnacle JEE Advanced 2026. The bank debited my account with UTR 40591283921, but my portal still shows unpaid.',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-03-02T10:15:00',
    updatedAt: '2026-03-02T10:15:00',
    relatedCourse: 'Pinnacle JEE Advanced 2026',
    messages: [
      {
        id: 'msg-1',
        senderName: 'Aarav Sharma',
        senderRole: 'student',
        message: 'Hi support team, I have attached my bank transaction screenshot with UTR 40591283921. Please verify and confirm batch allocation.',
        createdAt: '2026-03-02T10:15:00'
      }
    ]
  },
  {
    id: 'tkt-1002',
    ticketNumber: 'TKT-1002',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    category: 'Course Access',
    subject: 'Unable to view Chapter 3 "Thermodynamics" recorded lecture vault',
    description: 'Clicking on Thermodynamics Lesson 3 in my enrolled batch redirects back to overview. Other chapters are working fine.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-03-01T14:30:00',
    updatedAt: '2026-03-02T09:20:00',
    assignedAgent: 'Ramesh Kumar (Tech Support)',
    relatedCourse: 'Pinnacle JEE Advanced 2026',
    resolutionNotes: 'Identified CDN cache replication delay on the HLS stream index file. Fix queued for push.',
    messages: [
      {
        id: 'msg-2',
        senderName: 'Aarav Sharma',
        senderRole: 'student',
        message: 'Please resolve this before my evening revision session.',
        createdAt: '2026-03-01T14:30:00'
      },
      {
        id: 'msg-3',
        senderName: 'Ramesh Kumar',
        senderRole: 'support',
        message: 'Hello Aarav, we have traced this to a momentary CDN cache propagation issue. Our media engineering team has purged the cache. Please re-check in 15 minutes.',
        createdAt: '2026-03-02T09:20:00'
      }
    ]
  },
  {
    id: 'tkt-1003',
    ticketNumber: 'TKT-1003',
    studentId: 'std-102',
    studentName: 'Rohan Gupta',
    studentEmail: 'rohan.gupta99@gmail.com',
    studentPhone: '+91 98112 34567',
    category: 'Video Issue',
    subject: 'Playback stuttering at 1080p resolution on Android tablet',
    description: 'During video playback at 1080p 60fps, audio desyncs after 15 minutes. 720p works normally.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-02-26T16:00:00',
    updatedAt: '2026-02-27T11:45:00',
    assignedAgent: 'Pooja Verma (App Team)',
    resolutionNotes: 'Updated hardware acceleration codec profile in the latest mobile app patch v4.2.1.',
    messages: [
      {
        id: 'msg-4',
        senderName: 'Rohan Gupta',
        senderRole: 'student',
        message: 'Facing frame drops when switching to full-screen mode on Samsung Tab S9.',
        createdAt: '2026-02-26T16:00:00'
      },
      {
        id: 'msg-5',
        senderName: 'Pooja Verma',
        senderRole: 'support',
        message: 'Hi Rohan! We updated app build v4.2.1 with adaptive hardware decoding. Please update from Play Store and toggle "Hardware Acceleration: Optimized" in app settings.',
        createdAt: '2026-02-27T11:45:00'
      }
    ]
  },
  {
    id: 'tkt-1004',
    ticketNumber: 'TKT-1004',
    studentId: 'std-105',
    studentName: 'Tanvi Bhatnagar',
    studentEmail: 'tanvi.bhatnagar@gmail.com',
    studentPhone: '+91 99100 88234',
    category: 'Live Class',
    subject: 'Mic permission not connecting in Live Classroom hand-raise mode',
    description: 'When teacher accepted my hand raise in Zoology session, browser showed mic error code 403.',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-02-24T18:15:00',
    updatedAt: '2026-02-25T10:00:00',
    assignedAgent: 'Ramesh Kumar (Tech Support)',
    resolutionNotes: 'Guided student to enable Chrome site settings microphone permission for live.dcmaxwell.edu.',
    messages: [
      {
        id: 'msg-6',
        senderName: 'Tanvi Bhatnagar',
        senderRole: 'student',
        message: 'Could not ask my doubt verbally during Dr. Sneha class.',
        createdAt: '2026-02-24T18:15:00'
      },
      {
        id: 'msg-7',
        senderName: 'Ramesh Kumar',
        senderRole: 'support',
        message: 'Resolved via Chrome permissions reset. Student verified audio test successfully in test booth.',
        createdAt: '2026-02-25T10:00:00'
      }
    ]
  },
  {
    id: 'tkt-1005',
    ticketNumber: 'TKT-1005',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    category: 'Test',
    subject: 'Question #24 in CBT Mock 02 has ambiguous option formula',
    description: 'In CBT Mock 02 Physics Section B, Question #24 has duplicate option (B) and (D). Please review answer key marking.',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-03-02T08:00:00',
    updatedAt: '2026-03-02T10:45:00',
    assignedAgent: 'Er. Rajeshwar Varma (Academic Panel)',
    relatedCourse: 'Pinnacle JEE Advanced 2026',
    messages: [
      {
        id: 'msg-8',
        senderName: 'Aarav Sharma',
        senderRole: 'student',
        message: 'Kindly award bonus marks or update the answer key before All-India rank list publication.',
        createdAt: '2026-03-02T08:00:00'
      },
      {
        id: 'msg-9',
        senderName: 'Er. Rajeshwar Varma',
        senderRole: 'admin',
        message: 'Academic committee has audited Question #24. Typo verified in denominator. Question marked as BONUS for all test takers. Recalculated percentile will reflect by 2:00 PM.',
        createdAt: '2026-03-02T10:45:00'
      }
    ]
  },
  {
    id: 'tkt-1006',
    ticketNumber: 'TKT-1006',
    studentId: 'std-103',
    studentName: 'Ananya Sen',
    studentEmail: 'ananya.sen.kolkata@gmail.com',
    studentPhone: '+91 98301 23456',
    category: 'Account',
    subject: 'Request to update registered phone number for OTP verification',
    description: 'My primary SIM card was lost. I want to change registered number to +91 98301 23456.',
    priority: 'Medium',
    status: 'Closed',
    createdAt: '2026-02-19T11:00:00',
    updatedAt: '2026-02-20T14:30:00',
    assignedAgent: 'Verification Desk',
    resolutionNotes: 'Completed government ID KYC verification via Aadhaar OTP. Mobile number updated.',
    messages: [
      {
        id: 'msg-10',
        senderName: 'Ananya Sen',
        senderRole: 'student',
        message: 'Attached scanned ID copy and college enrollment card.',
        createdAt: '2026-02-19T11:00:00'
      },
      {
        id: 'msg-11',
        senderName: 'Verification Desk',
        senderRole: 'support',
        message: 'Verification complete. Number updated and verified. Ticket closed.',
        createdAt: '2026-02-20T14:30:00'
      }
    ]
  },
  {
    id: 'tkt-1007',
    ticketNumber: 'TKT-1007',
    studentId: 'usr-student-01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@dcmaxwell.edu',
    studentPhone: '+91 98765 43210',
    category: 'Certificate',
    subject: 'Name misspelling on JEE Advanced Mechanics Foundation Certificate',
    description: 'Certificate was issued as "Arav Sharma" instead of "Aarav Sharma". Please re-issue with correct spelling for my portfolio.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-02-21T15:20:00',
    updatedAt: '2026-02-22T09:10:00',
    assignedAgent: 'Academic Certification Office',
    resolutionNotes: 'Regenerated cryptographic hash credential DCM-CERT-8842-ARV with corrected name.',
    messages: [
      {
        id: 'msg-12',
        senderName: 'Aarav Sharma',
        senderRole: 'student',
        message: 'Please re-issue certificate with double "a".',
        createdAt: '2026-02-21T15:20:00'
      },
      {
        id: 'msg-13',
        senderName: 'Academic Certification Office',
        senderRole: 'support',
        message: 'Corrected certificate with updated cryptographic QR code has been published to your Student Certificates vault.',
        createdAt: '2026-02-22T09:10:00'
      }
    ]
  },
  {
    id: 'tkt-1008',
    ticketNumber: 'TKT-1008',
    studentId: 'std-106',
    studentName: 'Kunal Deshmukh',
    studentEmail: 'kunal.deshmukh@outlook.com',
    studentPhone: '+91 97234 56789',
    category: 'Other',
    subject: 'Inquiry regarding physical books delivery courier tracking number',
    description: 'I enrolled in Samarth IAS Foundation 5 days ago. Could you please share the BlueDart courier tracking AWB?',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-02-27T12:00:00',
    updatedAt: '2026-02-28T16:00:00',
    assignedAgent: 'Logistics Dispatch Desk',
    resolutionNotes: 'BlueDart AWB #3849102834 provided to student. Parcel delivered on Feb 28.',
    messages: [
      {
        id: 'msg-14',
        senderName: 'Kunal Deshmukh',
        senderRole: 'student',
        message: 'Please share the tracking number.',
        createdAt: '2026-02-27T12:00:00'
      },
      {
        id: 'msg-15',
        senderName: 'Logistics Dispatch Desk',
        senderRole: 'support',
        message: 'Your AWB is 3849102834 via BlueDart Express. Tracking link shared on SMS. Enjoy your study material!',
        createdAt: '2026-02-28T16:00:00'
      }
    ]
  }
];




