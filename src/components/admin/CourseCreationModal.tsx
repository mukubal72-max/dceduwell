import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseCategory, CourseFormat, Chapter, Lesson } from '../../types';
import {
  X,
  Plus,
  Trash2,
  BookOpen,
  Image as ImageIcon,
  Video,
  FileText,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  Languages,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Play,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const CourseCreationModal: React.FC<CourseCreationModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'CA Foundation'
}) => {
  const { addCourse } = useApp();

  // Active section tab in the modal: 'basic' | 'media' | 'pricing' | 'content' | 'deliverables'
  const [activeTab, setActiveTab] = useState<'basic' | 'media' | 'pricing' | 'content' | 'deliverables'>('basic');

  // 1. Course Name
  const [title, setTitle] = useState('');
  
  // 2. Course Category
  const [category, setCategory] = useState<CourseCategory>(
    (initialCategory as CourseCategory) || 'CA Foundation'
  );

  // 3. Course Description
  const [description, setDescription] = useState(
    'Comprehensive structured preparation program featuring interactive daily live classes, high-yield digital notes, curated question banks, and All-India full-length mock tests designed to guarantee top ranks.'
  );

  // 4. Course Thumbnail
  const [thumbnail, setThumbnail] = useState(
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80'
  );

  // 5. Banner
  const [bannerImage, setBannerImage] = useState(
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80'
  );

  // 6. Faculty
  const [facultyName, setFacultyName] = useState('CA CS Nitin Sharma (AIR 3 ICAI)');
  const [facultyDesignation, setFacultyDesignation] = useState('Head of Commerce & Corporate Accounting');
  const [facultyAvatar, setFacultyAvatar] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80');

  // 7. Course Duration
  const [courseDuration, setCourseDuration] = useState('450+ Hours Live & Recorded Masterclasses');

  // 8. Course Validity
  const [validity, setValidity] = useState('12 Months Access (Till Exam 2026)');

  // 9. MRP
  const [originalPrice, setOriginalPrice] = useState<number>(24999);

  // 10. Selling Price
  const [price, setPrice] = useState<number>(14999);

  // 11. Discount (%)
  const [discountPercentage, setDiscountPercentage] = useState<number>(40);

  // 12. Language
  const [language, setLanguage] = useState('English & Hinglish (Bilingual)');

  // 13. Batch
  const [batchName, setBatchName] = useState('Achievers Alpha Dec 2026 Batch');

  // 14. Course Content (Initial Chapters & Lectures)
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: `ch-${Date.now()}-1`,
      subject: 'Accounts & Financial Reporting',
      title: 'Chapter 1: Theoretical Framework & Accounting Process',
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: 'Lecture 1: Meaning and Scope of Accounting',
          durationMinutes: 60,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          isFreePreview: true,
          notesPdfTitle: 'CA_Accounts_Ch1_L1_Notes.pdf',
          summary: 'Introductory concepts, accounting principles, and syllabus breakdown.'
        },
        {
          id: `les-${Date.now()}-2`,
          title: 'Lecture 2: Accounting Principles & Journal Entries',
          durationMinutes: 75,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          isFreePreview: true,
          notesPdfTitle: 'CA_Accounts_Ch1_L2_Notes.pdf',
          summary: 'Detailed journal transactions and ledger postings with exam illustrations.'
        }
      ]
    }
  ]);

  // 15. Demo Videos (Free Preview Lectures)
  const [demoVideos, setDemoVideos] = useState<string[]>([
    'Demo Lecture 1: Meaning and Scope of Accounting (60 mins)',
    'Demo Lecture 2: Accounting Principles & Journal Entries (75 mins)'
  ]);

  // 16. Study Material
  const [studyMaterialsList, setStudyMaterialsList] = useState<string[]>([
    'Comprehensive ICAI Aligned Theory Module Vol 1 & 2',
    'Question Bank with 1,500+ Solved Illustrations',
    'Formula & Key Adjustments Summary Handbook'
  ]);

  // 17. Tests
  const [testsList, setTestsList] = useState<string[]>([
    'Unit Test 1: Theoretical Framework (50 Marks)',
    'Unit Test 2: Journal & Ledger Balancing (50 Marks)',
    'All-India Pre-ICAI Full Syllabus Mock Test 1 (100 Marks)',
    'All-India Pre-ICAI Full Syllabus Mock Test 2 (100 Marks)'
  ]);

  // Temporary inputs for appending items
  const [newDemoVideoInput, setNewDemoVideoInput] = useState('');
  const [newMaterialInput, setNewMaterialInput] = useState('');
  const [newTestInput, setNewTestInput] = useState('');

  if (!isOpen) return null;

  // Recalculate discount when MRP or Selling price changes
  const handlePriceChange = (newSelling: number, newMrp: number) => {
    setPrice(newSelling);
    setOriginalPrice(newMrp);
    if (newMrp > newSelling && newMrp > 0) {
      setDiscountPercentage(Math.round(((newMrp - newSelling) / newMrp) * 100));
    }
  };

  const handleDiscountChange = (newDiscount: number) => {
    setDiscountPercentage(newDiscount);
    if (originalPrice > 0 && newDiscount >= 0 && newDiscount <= 100) {
      const discounted = Math.round(originalPrice * (1 - newDiscount / 100));
      setPrice(discounted);
    }
  };

  // Add demo video
  const handleAddDemoVideo = () => {
    if (!newDemoVideoInput.trim()) return;
    setDemoVideos([...demoVideos, newDemoVideoInput.trim()]);
    setNewDemoVideoInput('');
  };

  // Add study material
  const handleAddMaterial = () => {
    if (!newMaterialInput.trim()) return;
    setStudyMaterialsList([...studyMaterialsList, newMaterialInput.trim()]);
    setNewMaterialInput('');
  };

  // Add test
  const handleAddTest = () => {
    if (!newTestInput.trim()) return;
    setTestsList([...testsList, newTestInput.trim()]);
    setNewTestInput('');
  };

  // Final submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setActiveTab('basic');
      return;
    }

    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title: title.trim(),
      tagline: description.slice(0, 100) + '...',
      description: description.trim(),
      category,
      format: 'Comprehensive Live Batch',
      targetExam: category,
      language,
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80',
      bannerImage: bannerImage.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
      price,
      originalPrice,
      discountPercentage,
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 0,
      facultyName,
      facultyDesignation,
      facultyAvatar,
      facultyBio: `${facultyName} brings decades of educational excellence and rank-producing pedagogy.`,
      courseDuration,
      validity,
      startDate: 'Immediate Access',
      batchName,
      isPublished: true,
      status: 'published',
      isFeatured: true,
      includesTestSeries: true,
      includesHardcopyBooks: true,
      certificateProvided: true,
      chapters,
      demoVideos,
      studyMaterialsList,
      testsList,
      studyMaterialCount: studyMaterialsList.length,
      testsCount: testsList.length,
      features: [
        courseDuration,
        `${testsList.length} Full CBT Mock Tests Included`,
        `${studyMaterialsList.length} High-Yield Modules & Books`,
        `1-on-1 Academic Mentorship & Doubt Sessions`
      ]
    };

    addCourse(newCourse);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 transition-all">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Full 17-Field Course Creation Engine
            </span>
          </div>

          <h2 className="text-xl font-bold font-serif mt-2">Create New Academic Course</h2>
          <p className="text-xs text-indigo-200/90 mt-1">
            Complete administrative creation suite covering pricing, media, faculty, duration, tests, and course hierarchy.
          </p>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 mt-5 bg-white/10 p-1 rounded-xl w-fit overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'basic' ? 'bg-white text-indigo-950 shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              1. Basic Info & Batch
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'media' ? 'bg-white text-indigo-950 shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              2. Thumbnail & Banner
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'pricing' ? 'bg-white text-indigo-950 shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              3. Pricing, Duration & Validity
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'content' ? 'bg-white text-indigo-950 shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              4. Course Content & Lectures
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('deliverables')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'deliverables' ? 'bg-white text-indigo-950 shadow-xs' : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              5. Demo, Notes & Tests
            </button>
          </div>
        </div>

        {/* Content Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-slate-800 text-xs max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: BASIC INFO & BATCH & FACULTY */}
          {activeTab === 'basic' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Core Course Identity
                </h3>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    • Course Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CA Foundation Dec 2026 Complete Batch"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • Course Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CourseCategory)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="CA Foundation">CA Foundation (ICAI 2026)</option>
                      <option value="CA & Commerce (Foundation/Inter)">CA & Commerce (Foundation/Inter)</option>
                      <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                      <option value="NEET (Medical)">NEET (Medical)</option>
                      <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                      <option value="Class 11-12 Boards">Class 11-12 Boards</option>
                      <option value="Foundation (9-10th)">Foundation (9-10th)</option>
                      <option value="Tech & Data Science">Tech & Data Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • Language *
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="English & Hinglish (Bilingual)">English & Hinglish (Bilingual - Most Popular)</option>
                      <option value="Pure English">Pure English Medium</option>
                      <option value="Hindi Medium">Hindi Medium</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    • Batch Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={batchName}
                    onChange={(e) => setBatchName(e.target.value)}
                    placeholder="e.g. Achievers Alpha Dec 2026 Batch"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    • Course Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a comprehensive academic breakdown, objectives, and batch roadmap..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white leading-relaxed"
                  />
                </div>
              </div>

              {/* Faculty Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" /> • Faculty Assignment
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Faculty Name *</label>
                    <input
                      type="text"
                      required
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      placeholder="e.g. CA CS Nitin Sharma (AIR 3 ICAI)"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Faculty Designation *</label>
                    <input
                      type="text"
                      required
                      value={facultyDesignation}
                      onChange={(e) => setFacultyDesignation(e.target.value)}
                      placeholder="e.g. Head of Accounts & Commercial Laws"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Faculty Avatar URL</label>
                  <input
                    type="url"
                    value={facultyAvatar}
                    onChange={(e) => setFacultyAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Thumbnail & Banner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: THUMBNAIL & BANNER */}
          {activeTab === 'media' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-600" /> Visual Assets & Marketing Banners
                </h3>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    • Course Thumbnail URL * (Ratio 16:9 or 4:3)
                  </label>
                  <input
                    type="url"
                    required
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  {thumbnail && (
                    <div className="mt-2 relative w-48 aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                      <img src={thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                        Thumbnail Preview
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    • Course Banner URL * (High Resolution Wide Hero Banner)
                  </label>
                  <input
                    type="url"
                    required
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  {bannerImage && (
                    <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                      <img src={bannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                        Wide Banner Preview
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  &larr; Back to Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pricing')}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Pricing & Duration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRICING, DURATION & VALIDITY */}
          {activeTab === 'pricing' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-600" /> Commercial Pricing & Discounts
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • MRP (Maximum Retail Price ₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={originalPrice}
                      onChange={(e) => handlePriceChange(price, Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white text-base font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • Selling Price (Offer Price ₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => handlePriceChange(Number(e.target.value), originalPrice)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white text-base font-bold font-mono text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • Discount (%) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={discountPercentage}
                        onChange={(e) => handleDiscountChange(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white text-base font-bold font-mono"
                      />
                      <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                  <span>Student saves: <strong>₹{(originalPrice - price).toLocaleString()}</strong></span>
                  <span className="font-bold bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900">{discountPercentage}% OFF Active</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> Academic Duration & Access Validity
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • Course Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                      placeholder="e.g. 450+ Hours Live & Recorded Masterclasses"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      • Course Validity *
                    </label>
                    <select
                      value={validity}
                      onChange={(e) => setValidity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="12 Months Access (Till Exam 2026)">12 Months Access (Till Exam 2026)</option>
                      <option value="6 Months Semester Access">6 Months Semester Access</option>
                      <option value="3 Months Fastrack Revision Access">3 Months Fastrack Revision Access</option>
                      <option value="24 Months Foundation Access (Till 2027)">24 Months Foundation Access (Till 2027)</option>
                      <option value="Lifetime Unlimited Access">Lifetime Unlimited Access</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('media')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  &larr; Back to Media
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('content')}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Course Content & Lectures</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COURSE CONTENT (HIERARCHY: Subject -> Chapter -> Lecture) */}
          {activeTab === 'content' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" /> • Course Content Hierarchy
                  </h3>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Subject &rarr; Chapter &rarr; Lecture
                  </span>
                </div>

                <div className="space-y-3">
                  {chapters.map((ch, chIdx) => (
                    <div key={ch.id} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[10px]">
                            {ch.subject}
                          </span>
                          <span>{ch.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {ch.lessons.length} Lectures
                        </span>
                      </div>

                      <div className="space-y-1.5 pl-3 border-l-2 border-indigo-200">
                        {ch.lessons.map((les, lIdx) => (
                          <div key={les.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-[11px]">
                            <div className="flex items-center gap-2">
                              <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                              <span className="font-semibold text-slate-800">{les.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                              <span>{les.durationMinutes} mins</span>
                              {les.isFreePreview && (
                                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                  Demo Video
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('pricing')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  &larr; Back to Pricing
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('deliverables')}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: Demo Videos, Notes & Tests</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: DEMO VIDEOS, STUDY MATERIAL & TESTS */}
          {activeTab === 'deliverables' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* 15. Demo Videos */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-600" /> • Demo Videos ({demoVideos.length})
                </h3>
                
                <div className="space-y-1.5">
                  {demoVideos.map((video, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-medium text-slate-800">{video}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDemoVideos(demoVideos.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newDemoVideoInput}
                    onChange={(e) => setNewDemoVideoInput(e.target.value)}
                    placeholder="Add demo video title (e.g. Masterclass Demo 3: Trial Balance Shortcuts)"
                    className="flex-1 p-2 rounded-xl border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddDemoVideo}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* 16. Study Material */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" /> • Study Material ({studyMaterialsList.length})
                </h3>

                <div className="space-y-1.5">
                  {studyMaterialsList.map((mat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-medium text-slate-800">{mat}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStudyMaterialsList(studyMaterialsList.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newMaterialInput}
                    onChange={(e) => setNewMaterialInput(e.target.value)}
                    placeholder="Add module (e.g. Chapter-wise Formula & Mind Map Handouts)"
                    className="flex-1 p-2 rounded-xl border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* 17. Tests */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> • Tests ({testsList.length})
                </h3>

                <div className="space-y-1.5">
                  {testsList.map((test, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-medium text-slate-800">{test}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTestsList(testsList.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newTestInput}
                    onChange={(e) => setNewTestInput(e.target.value)}
                    placeholder="Add test (e.g. Full Syllabus Mock Exam 3 CBT)"
                    className="flex-1 p-2 rounded-xl border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTest}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Final Submit Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('content')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  &larr; Back to Content
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Create & Launch Course with all 17 Fields</span>
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
