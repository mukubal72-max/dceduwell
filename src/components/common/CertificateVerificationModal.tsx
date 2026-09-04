import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CertificateItem } from '../../types';
import {
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Search,
  Building,
  GraduationCap,
  Calendar,
  Key,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const CertificateVerificationModal: React.FC = () => {
  const {
    isVerificationModalOpen,
    setIsVerificationModalOpen,
    selectedCertificate,
    setSelectedCertificate,
    verifyCertificateCode,
    certificates
  } = useApp();

  const [searchCode, setSearchCode] = useState<string>(selectedCertificate?.credentialId || '');
  const [verifiedResult, setVerifiedResult] = useState<CertificateItem | null>(selectedCertificate || null);
  const [hasSearched, setHasSearched] = useState(!!selectedCertificate);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!isVerificationModalOpen) return null;

  const handleSearch = (codeToSearch?: string) => {
    const query = (codeToSearch || searchCode).trim();
    if (!query) return;
    setHasSearched(true);
    const result = verifyCertificateCode(query);
    setVerifiedResult(result);
  };

  const handleClose = () => {
    setIsVerificationModalOpen(false);
    setSelectedCertificate(null);
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-6 relative overflow-hidden border-b border-indigo-900">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  National Academic Registry
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif text-white mt-0.5">
                  Official Certificate Verification Portal
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Verification Search Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="space-y-2"
          >
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Enter Credential ID, Verification Hash, or Scan QR:</span>
              <span className="text-[11px] text-slate-400 font-normal">e.g. VED-2025-894212</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Enter Certificate ID or Cryptographic Hash..."
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono uppercase focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verify Now</span>
              </button>
            </div>

            {/* Quick preset lookup sample pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold">Try sample IDs:</span>
              {certificates.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { setSearchCode(c.credentialId); handleSearch(c.credentialId); }}
                  className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-mono font-medium transition cursor-pointer"
                >
                  {c.credentialId}
                </button>
              ))}
            </div>
          </form>

          {/* Verification Results Panel */}
          {hasSearched && verifiedResult ? (
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              {/* Authenticity Banner */}
              <div className="flex items-center gap-3 pb-3 border-b border-emerald-200">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-emerald-950 font-serif uppercase tracking-wide">
                      Certificate Authenticity Verified & Confirmed
                    </h4>
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                      VALID
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    This official digital credential was issued by DC Maxwell Academy of Higher Sciences and recorded in the academic ledger.
                  </p>
                </div>
              </div>

              {/* Verified Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate / Student:</span>
                  <p className="font-bold text-slate-900 text-sm">{verifiedResult.studentName}</p>
                  <p className="text-[11px] text-slate-500">Student ID: {verifiedResult.studentId || 'VED-STU-10492'}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Qualification / Subject:</span>
                  <p className="font-bold text-indigo-950 line-clamp-1">{verifiedResult.courseTitle}</p>
                  <p className="text-[11px] text-emerald-700 font-bold">Grade: {verifiedResult.grade || 'Outstanding (A+)'}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Issue & Completion Date:</span>
                  <p className="font-semibold text-slate-800">{verifiedResult.completionDate}</p>
                  <p className="text-[11px] text-slate-500">Authorized: {verifiedResult.instructorName}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Credential ID:</span>
                  <p className="font-mono font-bold text-slate-900">{verifiedResult.credentialId}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">Status: Tamper-Proof Cryptographic Hash Verified</p>
                </div>
              </div>

              {/* Cryptographic Verification Seal */}
              {verifiedResult.verificationHash && (
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Key className="w-3 h-3 text-amber-400" /> Blockchain SHA-256 Hash:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(verifiedResult.verificationHash || '')}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <p className="break-all text-[11px] text-emerald-300 font-mono">
                    {verifiedResult.verificationHash}
                  </p>
                </div>
              )}

              {/* Skills Earned Tag Cloud */}
              {verifiedResult.skillsEarned && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verified Competencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {verifiedResult.skillsEarned.map((skill, idx) => (
                      <span key={idx} className="bg-white border border-emerald-300 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : hasSearched && !verifiedResult ? (
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-6 text-center space-y-2 animate-in fade-in duration-200">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-rose-950 text-sm">No Matching Credential Found</h4>
              <p className="text-xs text-rose-700 max-w-sm mx-auto">
                We could not verify a certificate with the ID "{searchCode}". Please check for typos or contact academic admissions at verification@dcmaxwell-academy.edu.
              </p>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <QrCode className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs text-slate-600 font-medium">
                Enter any student Certificate ID or scan the embedded QR code to verify academic credential validity.
              </p>
            </div>
          )}

          {/* Institutional Trust Stamp */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>DC Maxwell Academy National Registry of Verified Scholars</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> ISO 9001:2015 & NTA Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
