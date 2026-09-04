import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Award,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setView, setIsEnquiryModalOpen } = useApp();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="relative bg-[#1E293B] text-white py-16 sm:py-20 px-4 sm:px-6 rounded-3xl mx-4 sm:mx-6 shadow-xl shadow-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-indigo-400/20">
            <Sparkles className="w-3.5 h-3.5" /> Excellence in Digital & Hybrid Pedagogy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
            Nurturing India's Future <span className="text-indigo-400">Innovators, Doctors & Civil Servants</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Founded by a collective of IIT alumni, AIIMS doctors, and senior civil servants, DC Maxwell Academy provides an uncompromising standard of conceptual education accessible to every aspiring student in Bharat.
          </p>
        </div>
      </section>

      {/* Vision & Mission Bento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-sans">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To democratize world-class competitive examination coaching and STEM education, ensuring that no meritorious student is held back by geographical distance or prohibitive offline tuition expenses. We envision an empowered generation of thinkers who solve real-world problems.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-sans">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To blend deep conceptual classroom teaching, precision computer-based testing, immediate doubt resolution, and personalized analytical feedback into a seamless, high-yield digital learning experience for JEE, NEET, UPSC, and School Boards.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars of DC Maxwell Pedagogy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">The DC Maxwell Method</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Our 4-Pillar Academic Architecture</h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Engineered through 20+ years of studying how top rankers study, practice, and retain complex ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'First-Principles Clarity',
              desc: 'No rote memorization. Every formula is derived from core physics and mathematical axioms with 3D models.',
              badge: 'Concept Depth'
            },
            {
              num: '02',
              title: 'Daily Graded DPPs',
              desc: 'Daily Practice Problems tailored from easy board level up to Multi-Correct JEE Advanced & Olympiad standards.',
              badge: 'Daily Rigor'
            },
            {
              num: '03',
              title: 'NTA CBT Simulation',
              desc: 'Real Computer-Based Test engine with negative marking, sectional countdown timers, and All-India ranks.',
              badge: 'Exam Conditioning'
            },
            {
              num: '04',
              title: 'Live 1-on-1 Doubt Engine',
              desc: 'Zero doubt stays unresolved with continuous faculty doubt counters and instant AI derivation assistants.',
              badge: '24/7 Support'
            }
          ].map((pillar) => (
            <div key={pillar.num} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-indigo-600 transition">
              <span className="text-3xl font-black text-indigo-100 group-hover:text-indigo-200 transition">{pillar.num}</span>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {pillar.badge}
              </span>
              <h4 className="font-bold text-sm text-slate-900">{pillar.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">DC Maxwell Legacy & Impact</h2>
            <p className="text-xs text-slate-400">Transforming lives through structured digital mentorship.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">45,000+</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Students Mentored</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-serif">1,250+</div>
              <div className="text-xs text-slate-300 font-medium mt-1">IITians & Doctors Produced</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-serif">99.4%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Student Satisfaction</div>
            </div>
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-serif">85+</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Top 100 All-India Ranks</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Ready to Accelerate Your Preparation?</h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Join our new 2026-27 batches or speak with our chief academic counsellor for a personalized curriculum audit.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setView('website')}
            className="px-6 py-3 bg-indigo-950 text-white font-bold rounded-xl text-xs hover:bg-indigo-900 transition cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Explore 2026 Batches
          </button>
          <button
            onClick={() => setIsEnquiryModalOpen(true)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-2"
          >
            <span>Book Free 1-on-1 Counselling</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
