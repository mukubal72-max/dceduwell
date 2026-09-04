import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Smartphone,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import yellowStationeryBg from '../../assets/images/yellow_stationery_footer_bg_1788426135706.jpg';

export const Footer: React.FC = () => {
  const { setView, setSelectedCategory, setIsEnquiryModalOpen } = useApp();

  return (
    <footer
      className="relative text-slate-900 pt-10 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-8 border-t-4 border-amber-400 text-xs bg-cover bg-bottom bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${yellowStationeryBg})`,
        backgroundColor: '#FDD835',
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/92 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-amber-300/80 shadow-2xl shadow-amber-950/15">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-slate-200">
            
            {/* Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl text-slate-950 tracking-tight font-sans">DC MAXWELL</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full">Academy</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">National Centre for Conceptual Learning</p>
                </div>
              </div>

              <p className="text-slate-700 text-xs leading-relaxed max-w-md">
                DC Maxwell Academy is India’s premier digital education platform combining Kota’s pedagogical rigor, AIIMS clinical precision, and UPSC administrative depth. Bridging the gap between ambitious students and India's top mentors.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 bg-amber-50/80 px-3.5 py-1.5 rounded-xl border border-amber-200 text-slate-800 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-bold">ISO 9001:2026 Certified</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50/80 px-3.5 py-1.5 rounded-xl border border-amber-200 text-slate-800 shadow-xs">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] font-bold">NTA Pattern Accredited</span>
                </div>
              </div>
            </div>

            {/* Academic Categories */}
            <div className="space-y-3">
              <h4 className="text-slate-950 font-extrabold text-xs uppercase tracking-wider">Courses & Streams</h4>
              <ul className="space-y-2 text-slate-700 font-medium">
                <li>
                  <button
                    onClick={() => { setSelectedCategory('JEE (Main & Adv)'); setView('website'); }}
                    className="hover:text-amber-600 transition cursor-pointer flex items-center gap-1"
                  >
                    JEE (Main & Advanced) <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setSelectedCategory('NEET (Medical)'); setView('website'); }}
                    className="hover:text-amber-600 transition cursor-pointer flex items-center gap-1"
                  >
                    NEET UG Medical <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setSelectedCategory('UPSC & Civil Services'); setView('website'); }}
                    className="hover:text-amber-600 transition cursor-pointer flex items-center gap-1"
                  >
                    UPSC Civil Services (IAS) <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setSelectedCategory('Class 11-12 Boards'); setView('website'); }}
                    className="hover:text-amber-600 transition cursor-pointer flex items-center gap-1"
                  >
                    Class 11-12th CBSE Booster <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setSelectedCategory('Foundation (9-10th)'); setView('website'); }}
                    className="hover:text-amber-600 transition cursor-pointer flex items-center gap-1"
                  >
                    Olympiad & NTSE Foundation <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Learning Portals */}
            <div className="space-y-3">
              <h4 className="text-slate-950 font-extrabold text-xs uppercase tracking-wider">Learning Ecosystem</h4>
              <ul className="space-y-2 text-slate-700 font-medium">
                <li>
                  <button onClick={() => setView('student_portal')} className="hover:text-amber-600 transition cursor-pointer">
                    Student Learning Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => setView('mobile_app')} className="hover:text-amber-600 transition cursor-pointer">
                    Android & iOS App Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => setView('student_portal')} className="hover:text-amber-600 transition cursor-pointer">
                    Computer-Based Test (CBT) Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => setView('student_portal')} className="hover:text-amber-600 transition cursor-pointer">
                    High-Yield Formula Bible & Notes
                  </button>
                </li>
                <li>
                  <button onClick={() => setView('student_portal')} className="hover:text-amber-600 transition cursor-pointer">
                    24/7 AI Doubt Resolution Room
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-3">
              <h4 className="text-slate-950 font-extrabold text-xs uppercase tracking-wider">Contact & Admissions</h4>
              <div className="space-y-2 text-slate-700">
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-950 font-bold">1800-889-DCMA</p>
                    <p className="text-[11px] text-slate-500">(Toll-Free, 8 AM - 10 PM)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <p className="font-medium">admissions@dcmaxwell.academy</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-slate-600 text-[11px]">DC Maxwell Knowledge Tower, Knowledge Park III, Greater Noida & Kota Academic Campuses</p>
                </div>
              </div>

              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-amber-300 font-extrabold rounded-xl text-xs transition cursor-pointer mt-2 flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" /> Request Callback
              </button>
            </div>
          </div>

          {/* Bottom copyright & app strip */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-[11px]">
            <p>© 2026 DC Maxwell Academy Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-950 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-950 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-950 cursor-pointer">Honor Code & Security</span>
              <span className="hover:text-slate-950 cursor-pointer">Refund Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
