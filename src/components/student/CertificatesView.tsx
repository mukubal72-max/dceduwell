import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CertificateItem } from '../../types';
import {
  Award,
  Download,
  Printer,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  QrCode,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Share2,
  BookOpen
} from 'lucide-react';

export const CertificatesView: React.FC = () => {
  const {
    certificates,
    currentUser,
    courses,
    claimCertificate,
    setSelectedCertificate,
    setIsVerificationModalOpen
  } = useApp();

  const [selectedCourseToClaim, setSelectedCourseToClaim] = useState<string>('');
  const [claimSuccessMsg, setClaimSuccessMsg] = useState<string>('');

  const enrolledCourses = courses.filter((c) => currentUser.enrolledCourseIds.includes(c.id));

  const handleClaimNew = () => {
    if (!selectedCourseToClaim) return;
    const course = courses.find((c) => c.id === selectedCourseToClaim);
    if (!course) return;

    const newCert = claimCertificate(course.id, course.title, 'Outstanding (A+)');
    setClaimSuccessMsg(`Certificate for "${course.title}" successfully claimed and issued!`);
    setSelectedCourseToClaim('');
    setTimeout(() => setClaimSuccessMsg(''), 4000);
  };

  const handleVerifyCert = (cert: CertificateItem) => {
    setSelectedCertificate(cert);
    setIsVerificationModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950 p-6 sm:p-8 rounded-2xl text-white space-y-3 border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs border border-amber-400/30">
            <Award className="w-3.5 h-3.5" /> Official Academic Credentials & Verified Badges
          </div>
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/20"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Public Certificate Verification Portal</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-serif">Verified Digital Certificates & Milestone Badges</h2>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Tamper-proof digital certificates issued upon qualifying benchmark test series and module milestones. Each credential includes a verified cryptographic hash, QR code validation, and academy seal.
        </p>

        {/* Claim Eligible Certificate Action */}
        <div className="pt-2 flex flex-wrap items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Claim Completed Course Certificate:</span>
          </span>
          <select
            value={selectedCourseToClaim}
            onChange={(e) => setSelectedCourseToClaim(e.target.value)}
            className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 max-w-xs"
          >
            <option value="">Select Enrolled Course...</option>
            {enrolledCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
          <button
            onClick={handleClaimNew}
            disabled={!selectedCourseToClaim}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Claim Certificate</span>
          </button>
        </div>

        {claimSuccessMsg && (
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> {claimSuccessMsg}
          </p>
        )}
      </div>

      {/* Certificates List */}
      <div className="space-y-10">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-8 border-slate-900 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden space-y-8 text-center max-w-3xl mx-auto print:border-4 print:p-6 print:m-0 print:shadow-none"
          >
            {/* Background seal watermarks */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <GraduationCap className="w-96 h-96 text-slate-950" />
            </div>

            {/* Certificate Header with Academy Logo */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-amber-400 font-black text-sm tracking-tighter shadow-lg border-2 border-amber-400/40">
                  DC
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black font-serif text-slate-900 tracking-wider uppercase">
                    DC MAXWELL ACADEMY
                  </h3>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    National Board of Advanced Academic Sciences
                  </p>
                </div>
              </div>

              <div className="inline-block bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border border-amber-300">
                Official Digital Credential
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-950 tracking-tight">
                Certificate of Academic Excellence
              </h1>
              <p className="text-xs text-slate-500 italic">This is formally conferred upon verification to certify that</p>
            </div>

            {/* Student Name */}
            <div className="relative z-10 border-b-2 border-slate-300 pb-3 max-w-md mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 font-serif tracking-wide">
                {cert.studentName}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono mt-1">Student ID: {cert.studentId || 'VED-STU-10492'}</p>
            </div>

            {/* Course & Grade Details */}
            <div className="relative z-10 text-xs text-slate-700 leading-relaxed max-w-xl mx-auto space-y-2">
              <p>
                Has successfully demonstrated rigorous conceptual mastery, module milestones, and benchmark performance in:
              </p>
              <p className="font-bold text-sm sm:text-base text-slate-900 font-serif bg-slate-100 py-1.5 px-4 rounded-xl border border-slate-200">
                {cert.courseTitle}
              </p>
              <p className="text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Performance Grade: <strong>{cert.grade || 'Outstanding (A+)'}</strong></span>
              </p>
            </div>

            {/* Skills Earned Badges */}
            {cert.skillsEarned && (
              <div className="relative z-10 flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto">
                {cert.skillsEarned.map((skill, sIdx) => (
                  <span key={sIdx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Footer with Signatures, Seal & Interactive QR Code */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 items-end gap-4 pt-6 border-t border-slate-200 text-xs">
              {/* Authorized Signatures */}
              <div className="text-left space-y-1">
                <div className="w-32 h-8 border-b border-slate-400 flex items-end pb-0.5">
                  <span className="font-serif italic font-bold text-indigo-950 text-xs">
                    {cert.authorizedSignature || 'Prof. R. C. Verma'}
                  </span>
                </div>
                <p className="font-bold text-slate-900 text-[11px] font-serif">{cert.instructorName}</p>
                <p className="text-[10px] text-slate-400">Dean & Controller of Examinations</p>
                <p className="text-[10px] text-slate-500 font-mono">Date: {cert.completionDate}</p>
              </div>

              {/* Gold Verification Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 flex items-center justify-center text-amber-950 shadow-md">
                  <ShieldCheck className="w-8 h-8 text-amber-950" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mt-1">
                  DC MAXWELL VERIFIED SEAL
                </span>
              </div>

              {/* QR Code & Verification Lookup Action */}
              <div className="text-right space-y-1 flex flex-col items-end">
                <button
                  type="button"
                  onClick={() => handleVerifyCert(cert)}
                  className="group p-2 rounded-xl bg-white border border-slate-300 shadow-xs hover:border-indigo-600 transition flex items-center gap-2 cursor-pointer text-left"
                  title="Click to scan/verify authenticity"
                >
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center shrink-0">
                    <QrCode className="w-6 h-6 text-amber-400 group-hover:scale-110 transition" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block">SCAN TO VERIFY</span>
                    <span className="text-[10px] font-bold text-indigo-950 block font-mono">{cert.credentialId}</span>
                  </div>
                </button>

                <div className="flex items-center gap-2 pt-2 print:hidden">
                  <button
                    onClick={() => handleVerifyCert(cert)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg text-[10px] font-bold border border-slate-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Verify
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <Printer className="w-3 h-3" /> Print / PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
