import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Lock,
  ShieldCheck,
  Printer,
  Moon,
  Sun,
  Eye,
  X,
  AlertTriangle,
  Bookmark,
  Share2,
  Sparkles
} from 'lucide-react';
import { StudyMaterialItem, UserProfile } from '../../types';

interface PdfDocumentViewerProps {
  material: StudyMaterialItem;
  currentUser: UserProfile;
  onClose: () => void;
}

export const PdfDocumentViewer: React.FC<PdfDocumentViewerProps> = ({
  material,
  currentUser,
  onClose
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = material.pagesCount || 12;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSecurityNotice, setShowSecurityNotice] = useState(false);
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([1]);

  const isDownloadRestricted = material.restrictedDownload ?? false;
  const hasWatermark = material.hasWatermark ?? true;

  // Watermark text composed of student credentials
  const studentWatermarkText = `${currentUser.name || 'Student'} • ${currentUser.email || 'student@dcmaxwell.edu'} • ID: ${currentUser.id} • ${new Date().toLocaleDateString()}`;

  const toggleBookmark = (page: number) => {
    if (bookmarkedPages.includes(page)) {
      setBookmarkedPages(bookmarkedPages.filter((p) => p !== page));
    } else {
      setBookmarkedPages([...bookmarkedPages, page]);
    }
  };

  const handleDownloadAttempt = () => {
    if (isDownloadRestricted) {
      setShowSecurityNotice(true);
      setTimeout(() => setShowSecurityNotice(false), 4000);
    } else {
      const link = document.createElement('a');
      link.href = material.downloadUrl || '#';
      link.download = `${material.title.replace(/\s+/g, '_')}.pdf`;
      link.click();
    }
  };

  // Sample rendered page content for rich in-app reading experience
  const samplePagesContent = material.contentPages || [
    {
      page: 1,
      title: `${material.title} - Chapter Overview & Core Theorems`,
      subtitle: `Course: ${material.category} | Faculty Author: ${material.authorFaculty}`,
      body: [
        '1. Fundamental Axioms & Definition Scope:',
        '• Systematic breakdown of key mathematical principles and statutory framework.',
        '• Step-by-step conceptual derivations for top score in national examinations.',
        '• Critical edge cases tested in recent 5 years of examination papers.',
        '2. High-Yield Summary Formulas & Standard Notations:',
        '• Formula 1: ΔH = ΔU + Δ(PV) = ΔU + (Δn_g)RT (At constant temperature)',
        '• Formula 2: Total Electric Flux Φ_E = ∮ E · dA = Q_enclosed / ε₀',
        '• Formula 3: Net Present Value NPV = Σ [ CF_t / (1 + r)^t ] - Initial Outlay'
      ]
    },
    {
      page: 2,
      title: 'Detailed Derivations & Analytical Framework',
      subtitle: 'Section 2: High-Difficulty Solved Case Studies & Proofs',
      body: [
        'Theorem Application (Standard Case):',
        '• Given boundary condition: At infinity V(∞) = 0. Charge distribution resides exclusively on outer metallic skin.',
        '• Using symmetry considerations and Gauss divergence theorem: ∇ · E = ρ / ε₀',
        '• In any empty cavity, ρ = 0 and boundary potential is equipotential, yielding Laplacian ∇²V = 0 with unique constant solution.',
        '• Hence electric field intensity E = -∇V = 0 identically across the enclosed region.',
        'Examiner Tip for 100% Marks:',
        'Always draw clean labelled diagrams and state the primary statute or theorem before writing numerical substitutions.'
      ]
    },
    {
      page: 3,
      title: 'Previous Years Exam Questions & Model Solutions',
      subtitle: 'Section 3: Rapid Revision Drill (10 Must-Solve Questions)',
      body: [
        'Question 1 (ICAI / NTA Benchmark):',
        'Analyze the impact of timing errors on reconciliations and compute adjusted ledger balance.',
        'Solution Outline:',
        '1. Start with Cash Book unadjusted closing balance.',
        '2. Add: Direct deposits by customers not recorded in cash book.',
        '3. Deduct: Bank charges and direct debits not yet advised.',
        '4. Resulting figure aligns precisely with Bank Passbook statement balance.'
      ]
    }
  ];

  const currentPageData = samplePagesContent[(currentPage - 1) % samplePagesContent.length];

  return (
    <div
      id="pdf-document-viewer-modal"
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md transition-all ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      <div
        className={`w-full h-full flex flex-col rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${
          isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'
        }`}
      >
        {/* Top Header / Toolbar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Document Title & Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-indigo-900/60 text-indigo-300 rounded-xl border border-indigo-700/50">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  {material.type}
                </span>
                {isDownloadRestricted && (
                  <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Download Restricted
                  </span>
                )}
                {hasWatermark && (
                  <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" /> DRM Watermarked
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm text-white truncate max-w-md sm:max-w-xl font-serif mt-0.5">
                {material.title}
              </h3>
            </div>
          </div>

          {/* Viewer Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Page Navigation */}
            <div className="flex items-center bg-slate-800 rounded-xl px-2 py-1 border border-slate-700">
              <button
                id="pdf-prev-page-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px] text-slate-300">
                <span className="font-bold text-white">{currentPage}</span> / {totalPages}
              </span>
              <button
                id="pdf-next-page-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-xl px-2 py-1 border border-slate-700 gap-1">
              <button
                id="pdf-zoom-out-btn"
                onClick={() => setZoomLevel((z) => Math.max(60, z - 15))}
                className="p-1 text-slate-300 hover:text-white cursor-pointer transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 w-10 text-center">{zoomLevel}%</span>
              <button
                id="pdf-zoom-in-btn"
                onClick={() => setZoomLevel((z) => Math.min(160, z + 15))}
                className="p-1 text-slate-300 hover:text-white cursor-pointer transition"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              id="pdf-theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 cursor-pointer transition"
              title="Toggle Dark/Light Document Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            </button>

            {/* Bookmark Current Page */}
            <button
              id="pdf-bookmark-btn"
              onClick={() => toggleBookmark(currentPage)}
              className={`p-2 rounded-xl border cursor-pointer transition ${
                bookmarkedPages.includes(currentPage)
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Bookmark Page"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            {/* Download Button */}
            <button
              id="pdf-download-btn"
              onClick={handleDownloadAttempt}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                isDownloadRestricted
                  ? 'bg-slate-800 hover:bg-rose-950/50 text-slate-400 border border-slate-700'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
              }`}
              title={isDownloadRestricted ? 'Download Restricted by Institution' : 'Download Document'}
            >
              {isDownloadRestricted ? <Lock className="w-3.5 h-3.5 text-rose-400" /> : <Download className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isDownloadRestricted ? 'Protected' : 'Download'}</span>
            </button>

            {/* Close Button */}
            <button
              id="pdf-close-viewer-btn"
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 rounded-xl border border-slate-700 cursor-pointer transition"
              title="Close Document"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security Warning Banner if Download Restricted is clicked */}
        {showSecurityNotice && (
          <div className="bg-rose-950 border-b border-rose-800 px-4 py-2 text-rose-200 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Institutional DRM Protection Active:</strong> Offline downloading is restricted by faculty. You can read, highlight, and bookmark pages anytime inside the platform.
              </span>
            </div>
            <button onClick={() => setShowSecurityNotice(false)} className="text-rose-300 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Document Canvas Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/60 custom-scrollbar">
          <div
            style={{
              width: `${Math.min(920, 780 * (zoomLevel / 100))}px`,
              minHeight: '820px'
            }}
            className={`relative rounded-xl border shadow-2xl p-8 sm:p-12 transition-all duration-200 select-none overflow-hidden ${
              isDarkMode
                ? 'bg-slate-900 text-slate-100 border-slate-800'
                : 'bg-white text-slate-900 border-slate-200'
            }`}
          >
            {/* Dynamic Repeated Diagonal Watermark */}
            {hasWatermark && (
              <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-around overflow-hidden opacity-[0.14] select-none transform -rotate-12">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="whitespace-nowrap text-center text-xs sm:text-sm font-black uppercase tracking-widest text-indigo-900">
                    {studentWatermarkText} • DC MAXWELL DIGITAL DRM • LICENSED TO {currentUser.name?.toUpperCase()}
                  </div>
                ))}
              </div>
            )}

            {/* Page Header */}
            <div className="border-b pb-4 mb-6 flex items-center justify-between border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                  {material.category} • {material.subject}
                </p>
                <h2 className="text-base sm:text-lg font-bold font-serif">{currentPageData.title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{currentPageData.subtitle}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>
                {bookmarkedPages.includes(currentPage) && (
                  <span className="block text-[10px] text-amber-500 font-bold">★ Bookmarked</span>
                )}
              </div>
            </div>

            {/* Main Content Render */}
            <div className="space-y-5 text-xs sm:text-sm leading-relaxed">
              {currentPageData.body.map((paragraph, pIdx) => {
                const isHeading = paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('Theorem') || paragraph.startsWith('Question') || paragraph.startsWith('Examiner Tip') || paragraph.startsWith('Solution');
                return (
                  <p
                    key={pIdx}
                    className={`${
                      isHeading
                        ? 'font-bold text-indigo-950 dark:text-indigo-300 pt-2 text-sm'
                        : paragraph.startsWith('• Formula')
                        ? 'p-3 bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700 rounded-xl font-mono text-xs text-indigo-900 dark:text-indigo-200 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}

              {/* Study Notes Callout Box */}
              <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Master Faculty Note by {material.authorFaculty}:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  "Revise this section twice before attempting the weekly CBT Mock Test Series. Key focus should remain on speed and precision while writing steps."
                </p>
              </div>
            </div>

            {/* Page Footer */}
            <div className="mt-12 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>DC Maxwell Academy Digital Vault • Protected Copy</span>
              <span>Student ID: {currentUser.id} • {currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Status / Navigation Bar */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>{material.viewsCount || 2450} Total Student Views</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-[11px]">
              Last Updated: {material.updatedDate}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Previous Page
            </button>
            <span className="font-mono text-xs text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
