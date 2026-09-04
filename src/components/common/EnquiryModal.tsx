import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadItem } from '../../types';
import {
  X,
  Sparkles,
  Phone,
  Mail,
  User,
  MapPin,
  BookOpen,
  CheckCircle2,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, addLead } = useApp();
  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    city: '',
    targetCourse: 'Pinnacle JEE Advanced 2026',
    notes: 'Interested in live classes & test series'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone) return;

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      studentName: formData.studentName,
      phone: formData.phone,
      email: formData.email || `${formData.studentName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city: formData.city || 'India',
      targetCourse: formData.targetCourse,
      stage: 'New Enquiry',
      counsellorName: 'Priya Mehra',
      createdAt: 'Just now',
      lastFollowUp: 'Pending first call',
      notes: [formData.notes, 'Source: Website Enquiry Modal Form'],
      dealValue: 14999
    };

    addLead(newLead);
    setIsSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setIsEnquiryModalOpen(false);
      setFormData({
        studentName: '',
        phone: '',
        email: '',
        city: '',
        targetCourse: 'Pinnacle JEE Advanced 2026',
        notes: 'Interested in live classes & test series'
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-900 p-6 text-white relative">
          <button
            id="close-enquiry-modal"
            onClick={() => setIsEnquiryModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 font-semibold px-2.5 py-1 rounded-full text-xs border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Free Academic Counselling & Demo
          </div>
          <h2 className="text-xl font-bold font-serif">Book a Free 1-on-1 Strategy Session</h2>
          <p className="text-xs text-slate-300 mt-1">Get an individualized roadmap for JEE, NEET, UPSC & Boards from Kota & AIIMS Mentors.</p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Our Senior Academic Counsellor will call you within 15 minutes to share your test login & free demo access.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student / Parent Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Aarav Sharma / Dr. Sharma"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (For OTP/Demo) *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Exam / Goal</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.targetCourse}
                    onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                  >
                    <option value="Pinnacle JEE Advanced 2026">JEE (Main + Advanced 2026/27)</option>
                    <option value="Dr. Visionary NEET UG 2026">NEET UG (Medical 2026/27)</option>
                    <option value="Samarth IAS - UPSC 2026">UPSC Civil Services (IAS/IPS)</option>
                    <option value="Class 12th Board Booster">Class 11th - 12th Board Booster</option>
                    <option value="Foundation & Olympiad (9-10th)">Class 9th - 10th Olympiad / Foundation</option>
                    <option value="Tech & Data Science">Tech, Python & Generative AI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City / State</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Patna, Kota, Hyderabad"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            <button
              id="submit-enquiry-form-btn"
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-3.5 h-3.5" /> Book Free Strategy Call & Get Study Kit
            </button>
            <p className="text-[10px] text-center text-slate-400">
              🔒 100% Privacy Guaranteed. No spam. Instant access to trial classes.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
