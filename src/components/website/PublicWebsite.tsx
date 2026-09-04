import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCategory, Course } from '../../types';
import { CourseDetailModal } from './CourseDetailModal';
import { AboutUs } from './AboutUs';
import {
  Sparkles,
  BookOpen,
  PlayCircle,
  Award,
  Star,
  Users,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  ShieldCheck,
  Zap,
  Radio,
  FileText,
  Calendar,
  Smartphone,
  ChevronRight,
  GraduationCap,
  Tag,
  Percent,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { TOPPER_RESULTS } from '../../mockData';
import chalkboardBg from '../../assets/images/chalkboard_background_1788425536992.jpg';
import blueOrangeGeometricBg from '../../assets/images/blue_orange_geometric_bg_1788427419369.jpg';
import periwinkleCbtBg from '../../assets/images/periwinkle_cbt_bg_1788427924958.jpg';

export const PublicWebsite: React.FC = () => {
  const {
    courses,
    liveClasses,
    testSeries,
    setSelectedCourseForDetail,
    selectedCourseForDetail,
    addToCart,
    setView,
    setActiveLiveClass,
    setActiveTest,
    setIsEnquiryModalOpen,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    currentUser,
    toggleWishlist
  } = useApp();

  const [websiteTab, setWebsiteTab] = useState<'home' | 'about' | 'courses'>('home');
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<'all' | 'live' | 'recorded' | 'test_series'>('all');

  const categories: CourseCategory[] = [
    'JEE (Main & Adv)',
    'NEET (Medical)',
    'UPSC & Civil Services',
    'Class 11-12 Boards',
    'Foundation (9-10th)',
    'Tech & Data Science'
  ];

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = 
      selectedFormatFilter === 'all' ||
      (selectedFormatFilter === 'live' && c.format.includes('Live')) ||
      (selectedFormatFilter === 'recorded' && c.format.includes('Recorded')) ||
      (selectedFormatFilter === 'test_series' && c.format.includes('Test'));

    return matchesCategory && matchesSearch && matchesFormat;
  });

  const popularCourses = courses.filter(c => c.isPopular);
  const featuredCourses = courses.filter(c => c.isFeatured);

  const handleOpenCourse = (course: Course) => {
    setSelectedCourseForDetail(course);
  };

  const handleJoinLiveStream = (cls: any) => {
    setActiveLiveClass(cls);
    setView('student_portal');
  };

  const handleStartMockTest = (test: any) => {
    setActiveTest(test);
    setView('student_portal');
  };

  return (
    <div className="space-y-16">
      
      {/* Sub-Header Navigation Tab for Website (Home / Courses / About Us) */}
      <div className="bg-[#1E293B] border-b border-slate-800 sticky top-16 z-30 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setWebsiteTab('home')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                websiteTab === 'home' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home Overview
            </button>
            <button
              onClick={() => setWebsiteTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                websiteTab === 'courses' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Courses & Batches ({courses.length})
            </button>
            <button
              onClick={() => setWebsiteTab('about')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                websiteTab === 'about' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              About DC Maxwell Academy
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <button
              onClick={() => setView('student_portal')}
              className="text-indigo-300 hover:text-white font-semibold flex items-center gap-1.5 cursor-pointer bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" /> Jump to Student Portal
            </button>
          </div>
        </div>
      </div>

      {websiteTab === 'about' ? (
        <AboutUs />
      ) : websiteTab === 'courses' ? (
        /* Course Catalog View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">Comprehensive Academic Catalog 2026-27</h1>
            <p className="text-xs text-slate-500">
              Browse Kota-mentored programs, medical batches, civil services modules, and school board boosters.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            {/* Category selection */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer shrink-0 ${
                  selectedCategory === 'All' ? 'bg-indigo-950 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Streams ({courses.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer shrink-0 ${
                    selectedCategory === cat ? 'bg-indigo-950 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Format selection */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setSelectedFormatFilter('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold ${selectedFormatFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
              >
                All Formats
              </button>
              <button
                onClick={() => setSelectedFormatFilter('live')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold ${selectedFormatFilter === 'live' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
              >
                Live Classes
              </button>
              <button
                onClick={() => setSelectedFormatFilter('recorded')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold ${selectedFormatFilter === 'recorded' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
              >
                Recorded Mastery
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-300 transition duration-200 flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Category & Format Tag */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-2.5 py-0.5 rounded-full font-sans shadow-sm">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-semibold bg-slate-950/70 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {course.format}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-extrabold bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {course.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Bottom Image Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-slate-700/60">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-amber-300">{course.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-300">({course.reviewsCount.toLocaleString()})</span>
                    </div>
                    <span className="text-[11px] text-slate-200 bg-slate-950/70 px-2 py-0.5 rounded-full backdrop-blur-xs">{course.language}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <h3 className="font-bold text-base text-slate-900 font-sans line-clamp-2 leading-snug group-hover:text-indigo-600 transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.tagline}
                  </p>

                  {/* Rating & Review Counter in Card Body */}
                  <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                      <span className="font-extrabold text-slate-900 ml-1">{course.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">{course.reviewsCount.toLocaleString()} Verified Ratings</span>
                  </div>

                  {/* Faculty & Schedule info */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.facultyAvatar}
                        alt={course.facultyName}
                        className="w-6 h-6 rounded-full object-cover border border-indigo-200"
                      />
                      <span className="text-[11px] font-semibold text-slate-800 line-clamp-1">{course.facultyName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {course.validity}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">{course.startDate}</span>
                    </div>
                  </div>

                  {/* Pricing, Discount & Enroll CTA */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-slate-900 font-sans">₹{course.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block mt-0.5">
                          Save ₹{(course.originalPrice - course.price).toLocaleString('en-IN')} ({course.discountPercentage}% Discount)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`view-details-${course.id}`}
                        onClick={() => handleOpenCourse(course)}
                        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Syllabus
                      </button>
                      <button
                        id={`enroll-btn-${course.id}`}
                        onClick={() => addToCart(course)}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Home Overview Sections */
        <>
          {/* 1. Hero Banner */}
          <section className="relative bg-[#386641] text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3e7048] via-[#386641] to-[#2e5536] pointer-events-none" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#25492d]/80 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#528d5e]/50 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kota Pedagogy • AIIMS Faculty • 100% NTA CBT Pattern</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-tight">
                  Crack JEE, NEET & UPSC with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-100">Absolute Conceptual Mastery</span>
                </h1>

                <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl leading-relaxed">
                  Join India's highest-yield digital academy. Daily interactive live lectures, 3D anatomical & physical visualizers, 30+ CBT full mocks, and 24/7 AI-guided doubt clearing.
                </p>

                {/* Quick Target Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs text-emerald-100/80 font-semibold mr-1">Popular Targets:</span>
                  {['JEE Advanced 2026', 'NEET UG 2026', 'UPSC Prelims', 'Class 12 Boards'].map((target) => (
                    <button
                      key={target}
                      onClick={() => { setWebsiteTab('courses'); }}
                      className="text-xs bg-[#24462c]/80 hover:bg-[#1c3822] text-white px-3 py-1 rounded-lg border border-[#4d8258] transition cursor-pointer"
                    >
                      {target}
                    </button>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    id="hero-explore-batches-btn"
                    onClick={() => setWebsiteTab('courses')}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-black/20 transition cursor-pointer flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" /> Explore 2026-27 Batches
                  </button>

                  <button
                    id="hero-book-demo-btn"
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs border border-white/30 backdrop-blur-xs transition cursor-pointer flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-300" /> Book Free Counselling & Demo
                  </button>
                </div>

                {/* Trust Stats Counter */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#4f855b]/60 text-xs">
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-amber-300 font-serif">45k+</p>
                    <p className="text-emerald-100/80 text-[11px]">Enrolled Students</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-emerald-200 font-serif">AIR 01</p>
                    <p className="text-emerald-100/80 text-[11px]">JEE Adv 2025 Rank</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-amber-200 font-serif">4.95★</p>
                    <p className="text-emerald-100/80 text-[11px]">Average Rating</p>
                  </div>
                </div>
              </div>

              {/* Right Hero Live Ticker Box */}
              <div className="lg:col-span-5 space-y-4">
                {/* Live Class Spotlight Card */}
                {liveClasses[0] && (
                  <div className="bg-[#24462c]/95 border border-[#4d8258] rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
                        <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                          <Radio className="w-3.5 h-3.5" /> Happening Now
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-100 bg-[#193220] px-2 py-0.5 rounded border border-[#396541]">
                        {liveClasses[0].attendeesCount} Live Viewers
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-white font-serif leading-snug">
                        {liveClasses[0].title}
                      </h4>
                      <p className="text-xs text-emerald-100/80 mt-1">Instructor: {liveClasses[0].facultyName} ({liveClasses[0].subject})</p>
                    </div>

                    <div className="bg-[#193220]/90 p-3 rounded-xl border border-[#396541] space-y-1.5 text-xs text-emerald-50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Class Highlights:</p>
                      {liveClasses[0].topicsCovered.slice(0, 2).map((top, idx) => (
                        <p key={idx} className="text-[11px] flex items-center gap-1.5 text-emerald-100">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{top}</span>
                        </p>
                      ))}
                    </div>

                    <button
                      id="hero-join-live-class-btn"
                      onClick={() => handleJoinLiveStream(liveClasses[0])}
                      className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-rose-600/30"
                    >
                      <PlayCircle className="w-4 h-4" /> Join Live Classroom (Free Trial)
                    </button>
                  </div>
                )}

                {/* Free Mock Test Banner */}
                <div className="bg-[#24462c]/90 border border-amber-400/40 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white">All India Major Mock Test 01</h5>
                      <p className="text-[11px] text-emerald-100/80">Live NTA CBT Engine with Instant AIR Rank</p>
                    </div>
                  </div>
                  <button
                    id="hero-test-attempt-btn"
                    onClick={() => handleStartMockTest(testSeries[0])}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer shrink-0"
                  >
                    Attempt Free
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Stream Categories Explorer */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Specialized Academics</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Explore By Preparation Target</h2>
              </div>
              <button
                onClick={() => setWebsiteTab('courses')}
                className="text-xs font-bold text-indigo-900 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                View All Batches <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setWebsiteTab('courses'); }}
                  className="p-4 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition group cursor-pointer shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-900 group-hover:text-white flex items-center justify-center text-slate-700 transition mb-3">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-950">{cat}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Top Batches & Mocks</p>
                </button>
              ))}
            </div>
          </section>

          {/* 3. Popular & Featured Courses */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Proven Results</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Flagship Comprehensive Programs</h2>
              </div>
              <button
                onClick={() => setWebsiteTab('courses')}
                className="text-xs font-bold text-indigo-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                See All Programs
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-300 transition duration-200 flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    <div className="absolute top-3 left-3 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                      {course.category}
                    </div>

                    {/* Discount & Wishlist Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        id={`toggle-wishlist-${course.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(course.id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-md transition shadow-md cursor-pointer ${
                          currentUser.wishlistCourseIds?.includes(course.id)
                            ? 'bg-rose-500 text-white hover:bg-rose-600'
                            : 'bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-900 border border-white/20'
                        }`}
                        title={currentUser.wishlistCourseIds?.includes(course.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            currentUser.wishlistCourseIds?.includes(course.id) ? 'fill-white text-white' : ''
                          }`}
                        />
                      </button>
                      <span className="text-[10px] font-extrabold bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {course.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Rating Badge on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-slate-700/60">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-amber-300">{course.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-slate-300">({course.reviewsCount.toLocaleString()})</span>
                      </div>
                      <span className="text-[11px] text-slate-200 bg-slate-950/70 px-2 py-0.5 rounded-full backdrop-blur-xs">{course.language}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-base text-slate-900 font-sans line-clamp-2 leading-snug group-hover:text-indigo-600 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.tagline}
                    </p>

                    {/* Rating Display */}
                    <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          ))}
                        </div>
                        <span className="font-extrabold text-slate-900 ml-1">{course.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[11px] text-slate-600 font-medium">{course.reviewsCount.toLocaleString()} Reviews</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-slate-800 line-clamp-1">👨‍🏫 {course.facultyName}</p>
                      <p className="text-[11px] text-slate-500">📅 {course.startDate} • {course.validity}</p>
                    </div>

                    {/* Pricing, Discount & Enroll CTA */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-3 mt-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-slate-900 font-sans">₹{course.price.toLocaleString('en-IN')}</span>
                            <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block mt-0.5">
                            Save ₹{(course.originalPrice - course.price).toLocaleString('en-IN')} ({course.discountPercentage}% Discount)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenCourse(course)}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={() => addToCart(course)}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. CBT Test Series & Examination Spotlight */}
          <section 
            className="relative text-white py-16 px-4 sm:px-6 overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(74, 66, 186, 0.75), rgba(46, 39, 130, 0.84)), url(${periwinkleCbtBg})`,
              backgroundColor: '#6258df',
              backgroundAttachment: 'scroll'
            }}
          >
            {/* Subtle decorative doodles & floating badge inspired by Image 1 */}
            <div className="max-w-7xl mx-auto space-y-10 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-amber-300 px-3.5 py-1 rounded-full shadow-sm inline-block">
                    National Testing Agency (NTA) Simulation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-2 text-white drop-shadow-sm">
                    Computer-Based Test (CBT) Series 2026
                  </h2>
                  <p className="text-xs text-indigo-100 max-w-xl mt-1.5 leading-relaxed">
                    Experience exact exam screen UI, negative marking, section timers, question palette, and instant All-India Rank (AIR) analytics.
                  </p>
                </div>
                <button
                  onClick={() => setView('student_portal')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer shrink-0 shadow-lg shadow-black/20"
                >
                  View All Test Series
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testSeries.map((test) => (
                  <div key={test.id} className="bg-[#1e1957]/90 border border-[#837af7]/40 hover:border-amber-400/80 rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-2xl transition">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-200 px-2.5 py-0.5 rounded border border-cyan-400/30">
                        {test.targetExam}
                      </span>
                      <span className="text-xs font-semibold text-amber-300">
                        {test.isFree ? '100% Free Open Mock' : `₹${test.price}`}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-serif text-white">{test.title}</h3>

                    <div className="grid grid-cols-3 gap-2 bg-[#120e3d]/85 p-3 rounded-xl border border-[#423999]/60 text-center text-xs">
                      <div>
                        <p className="text-indigo-200 text-[10px]">Questions</p>
                        <p className="font-bold text-white mt-0.5">{test.totalQuestions} Qs</p>
                      </div>
                      <div>
                        <p className="text-indigo-200 text-[10px]">Duration</p>
                        <p className="font-bold text-white mt-0.5">{test.durationMinutes} Mins</p>
                      </div>
                      <div>
                        <p className="text-indigo-200 text-[10px]">Marking Scheme</p>
                        <p className="font-bold text-amber-300 mt-0.5">+4 / -1 Scheme</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-indigo-200">{test.attemptsCount.toLocaleString()} Candidates Attempted</span>
                      <button
                        id={`start-cbt-test-${test.id}`}
                        onClick={() => handleStartMockTest(test)}
                        className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <span>Launch CBT Exam</span> <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Topper Hall of Fame & Results */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Wall of Glory</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Our Students in Top Ranks</h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Real rankers from across the nation who mastered concepts with DC Maxwell Academy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TOPPER_RESULTS.map((topper, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <img
                      src={topper.avatar}
                      alt={topper.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-xs"
                    />
                    <div>
                      <div className="inline-block bg-amber-100 text-amber-900 font-black text-xs px-2 py-0.5 rounded">
                        {topper.rank}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">{topper.name}</h4>
                      <p className="text-[11px] text-slate-500">{topper.exam} • {topper.score}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{topper.quote}"
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-950">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>Admitted to: {topper.college}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Why Choose DC Maxwell Academy */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6">
            <div 
              className="relative rounded-3xl p-8 sm:p-12 text-white space-y-8 overflow-hidden shadow-2xl bg-cover bg-center border-2 border-orange-500/70"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 42, 115, 0.72), rgba(6, 26, 75, 0.82)), url(${blueOrangeGeometricBg})`,
                backgroundColor: '#0a4cb8'
              }}
            >
              {/* Decorative Geometric Corner Elements inspired by Image 2 */}
              <div className="absolute top-4 right-6 flex items-center gap-2 pointer-events-none opacity-80">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-orange-300 shadow-sm" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-orange-500/20 rounded-3xl rotate-45 border-4 border-orange-400/30 pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-600/15 rounded-2xl rotate-12 border-2 border-white/20 pointer-events-none" />

              <div className="text-center space-y-2 max-w-2xl mx-auto relative z-10">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-300 bg-orange-500/20 border border-orange-400/40 px-3.5 py-1 rounded-full backdrop-blur-xs inline-block">
                  The DC Maxwell Advantage
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white drop-shadow-sm">
                  Why 45,000+ Students Trust DC Maxwell
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs relative z-10">
                {[
                  { title: 'Top Faculty Pedagogy', desc: 'Classes taught exclusively by ex-IITians, AIIMS Doctors, and Top Kota Mentors.' },
                  { title: 'NTA CBT Test Series', desc: 'Exact exam interface simulation with in-depth percentile & speed analytics.' },
                  { title: 'Physical Hardcopy Study Kit', desc: 'Comprehensive formula bibles, mind maps and DPP books delivered to your door.' },
                  { title: '24/7 AI & Faculty Doubt Forum', desc: 'Post any photo or formula and receive step-by-step mathematical proofs within minutes.' },
                  { title: '1-on-1 Academic Mentorship', desc: 'Weekly strategy calls with dedicated counsellors to monitor your study discipline.' },
                  { title: 'Seamless Mobile & Web Sync', desc: 'Switch effortlessly between Web Portal and Android/iOS Mobile Apps with offline mode.' },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#061e47]/85 border border-white/20 hover:border-orange-400/70 rounded-2xl p-5 space-y-2 backdrop-blur-md transition shadow-lg hover:shadow-orange-500/10"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                      ✓
                    </div>
                    <h4 className="font-bold text-sm text-white font-serif">{item.title}</h4>
                    <p className="text-blue-100/90 leading-relaxed text-[11px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Mobile App Download Showcase */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  <Smartphone className="w-3.5 h-3.5" /> Android & iOS Learning Apps
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                  Study Anywhere with the DC Maxwell Mobile App
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download lectures for offline viewing during commute, attempt daily 5-minute bite-sized quizzes, receive live class alerts, and snap photos of questions for instant doubt solving.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setView('mobile_app')}
                    className="px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400" /> Launch Mobile App Simulator
                  </button>
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs border border-slate-300 transition cursor-pointer"
                  >
                    Send Download Link to SMS
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-64 bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800">
                  <div className="bg-white rounded-[28px] overflow-hidden p-4 space-y-3 text-slate-900 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>9:41 AM</span>
                      <span>5G 100%</span>
                    </div>
                    <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                      <p className="font-extrabold text-indigo-950 text-xs">DC Maxwell Mobile</p>
                      <p className="text-[10px] text-indigo-700">Daily Study Streak: 14 Days 🔥</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-[10px] space-y-1">
                      <p className="font-bold text-slate-800">Upcoming Live Class in 25m</p>
                      <p className="text-slate-500">Physics: Electrostatics Mastery</p>
                    </div>
                    <button 
                      onClick={() => setView('mobile_app')}
                      className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-lg text-[10px] text-center"
                    >
                      Open Mobile Simulator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Selected Course Detail Modal */}
      {selectedCourseForDetail && (
        <CourseDetailModal
          course={selectedCourseForDetail}
          onClose={() => setSelectedCourseForDetail(null)}
        />
      )}
    </div>
  );
};
