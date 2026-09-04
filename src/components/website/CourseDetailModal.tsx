import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import {
  X,
  Star,
  CheckCircle2,
  PlayCircle,
  FileText,
  Clock,
  Award,
  Users,
  ShieldCheck,
  Package,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { addToCart, enrollInCourse, setView, setActiveVideoLesson } = useApp();
  const [includeCombo, setIncludeCombo] = useState(true);
  const [activeTab, setActiveTab] = useState<'curriculum' | 'faculty' | 'reviews'>('curriculum');

  if (!course) return null;

  const finalPrice = includeCombo ? course.price + 1999 : course.price;
  const originalFinalPrice = includeCombo ? course.originalPrice + 4000 : course.originalPrice;

  const handleEnrollDirectly = () => {
    addToCart(course, includeCombo);
    onClose();
  };

  const handlePlayPreview = (lesson: any) => {
    setActiveVideoLesson({ course, lesson });
    setView('student_portal');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Strip */}
        <div className="relative bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950 text-white p-6 pb-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-sans">
              {course.category}
            </span>
            <span className="text-[10px] font-semibold bg-white/10 text-white px-2 py-0.5 rounded-full border border-white/20">
              {course.language}
            </span>
            <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Batch Starts: {course.startDate}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif max-w-2xl leading-tight">
            {course.title}
          </h2>
          <p className="text-xs text-slate-300 mt-2 max-w-2xl">
            {course.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{course.rating}</span>
              <span className="text-slate-400 font-normal">({course.reviewsCount.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{course.enrolledCount.toLocaleString()} Students Enrolled</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{course.validity}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Combo Pack Upsell Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 font-serif">DC Maxwell Ultimate All-in-One Combo Bundle</span>
                  <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">Save 60%</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Includes: Full Video Course + 30 All-India CBT Test Series + Physical Printed Books Shipped to Home + 24/7 AI Doubt Solver.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-amber-300 shadow-2xs shrink-0">
              <input
                type="checkbox"
                checked={includeCombo}
                onChange={(e) => setIncludeCombo(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              <span className="text-xs font-bold text-slate-800">Add Combo (+₹1,999)</span>
            </label>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`pb-2.5 px-4 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'curriculum'
                  ? 'border-indigo-900 text-indigo-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Curriculum & Syllabus ({(course.chapters || []).reduce((acc, c) => acc + (c.lessons?.length || 0), 0)} Lectures)
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`pb-2.5 px-4 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'faculty'
                  ? 'border-indigo-900 text-indigo-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Master Faculty & Mentors
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2.5 px-4 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-indigo-900 text-indigo-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Student Reviews & Results
            </button>
          </div>

          {/* Tab 1: Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {(course.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {!course.chapters || course.chapters.length === 0 ? (
                  <div className="text-center p-8 bg-slate-50 rounded-xl text-slate-500 text-xs">
                    Comprehensive full-syllabus weekly planner released upon enrollment.
                  </div>
                ) : (
                  course.chapters.map((chapter) => (
                    <div key={chapter.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="bg-slate-100/70 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">{chapter.subject}</span>
                          <h4 className="font-bold text-xs text-slate-900">{chapter.title}</h4>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">{chapter.lessons?.length || 0} Lectures</span>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {(chapter.lessons || []).map((lesson) => (
                          <div key={lesson.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-xs">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900">
                                <PlayCircle className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 line-clamp-1">{lesson.title}</p>
                                <p className="text-[11px] text-slate-500">{lesson.durationMinutes} mins • {lesson.summary}</p>
                              </div>
                            </div>

                            {lesson.isFreePreview ? (
                              <button
                                onClick={() => handlePlayPreview(lesson)}
                                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg text-xs border border-emerald-300 transition cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                <PlayCircle className="w-3.5 h-3.5" /> Free Trial
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium px-2 py-1 bg-slate-100 rounded">Locked</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Faculty */}
          {activeTab === 'faculty' && (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={course.facultyAvatar}
                  alt={course.facultyName}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-indigo-900 shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{course.facultyName}</h4>
                  <p className="text-xs text-amber-700 font-semibold">{course.facultyDesignation}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{course.facultyBio}</p>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Award className="w-3.5 h-3.5 text-indigo-600" /> 18+ Years Pedagogy
                    </span>
                    <span>•</span>
                    <span>Produced AIR 1, AIR 4, AIR 11 in JEE Advanced</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
                <div className="flex items-center gap-2 text-indigo-950 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.95 out of 5.0 Star Rating</span>
                </div>
                <p className="text-slate-600 text-[11px] mt-1">Based on 1,400+ verified student ratings across India.</p>
              </div>

              <div className="p-3.5 border border-slate-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Rishabh Agarwal (IIT Kharagpur)</span>
                  <span className="text-[10px] text-slate-400">Verified Student</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  "The conceptual clarity delivered in the live electrostatics lectures helped me solve all multi-correct questions easily. The CBT mock tests felt 100% identical to the real JEE Advanced exam."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">₹{finalPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-slate-400 line-through">₹{originalFinalPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-emerald-600">
                ({Math.round(((originalFinalPrice - finalPrice) / originalFinalPrice) * 100)}% Off)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {includeCombo ? 'Includes Full Course + 30 Mock Tests + Home Study Kit' : 'Standard Course Batch Access'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="add-to-cart-modal-btn"
              onClick={() => { addToCart(course, includeCombo); }}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button
              id="enroll-now-modal-btn"
              onClick={handleEnrollDirectly}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Enroll Now</span> <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
