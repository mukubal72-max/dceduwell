import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterialItem, StudyMaterialType } from '../../types';
import { PdfDocumentViewer } from '../common/PdfDocumentViewer';
import {
  FileText,
  Download,
  Search,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  Eye,
  FileCheck,
  Filter,
  ShieldCheck,
  Layers,
  HelpCircle,
  Clock,
  BookMarked
} from 'lucide-react';

export const StudyMaterialVault: React.FC = () => {
  const { studyMaterials, currentUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterialItem | null>(null);

  const materialTypes: { label: string; value: string }[] = [
    { label: 'All Resources', value: 'All' },
    { label: '📄 PDF', value: 'PDF' },
    { label: '📝 Notes', value: 'Notes' },
    { label: '📚 Books', value: 'Books' },
    { label: '📋 Assignments', value: 'Assignments' },
    { label: '❓ Question Banks', value: 'Question Banks' },
    { label: '⏳ Previous Year Papers', value: 'Previous Year Papers' },
    { label: '⚡ Revision Material', value: 'Revision Material' },
    { label: '🎯 Practice Papers', value: 'Practice Papers' },
    { label: '🔬 Formula Sheets', value: 'PDF Formula Sheet' },
    { label: '✍️ Handwritten Notes', value: 'Handwritten Notes' }
  ];

  const courseCategories = [
    'All',
    'CA Foundation',
    'JEE (Main & Adv)',
    'NEET (Medical)',
    'UPSC & Civil Services',
    'Class 11-12 Boards'
  ];

  const filteredMaterials = studyMaterials.filter((m) => {
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchType =
      selectedType === 'All' ||
      m.type === selectedType ||
      (selectedType === 'PDF' && (m.type === 'PDF' || m.type === 'PDF Formula Sheet')) ||
      (selectedType === 'Notes' && (m.type === 'Notes' || m.type === 'Handwritten Notes')) ||
      (selectedType === 'Previous Year Papers' && (m.type === 'Previous Year Papers' || m.type === 'Previous Year Question (PYQ)')) ||
      (selectedType === 'Assignments' && (m.type === 'Assignments' || m.type === 'Assignment Sheet'));
    const matchSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.authorFaculty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white space-y-3 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" /> 28. Study Material Management & 29. Secure In-App PDF Reader
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
          Comprehensive Study Material & Knowledge Vault
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Access high-yield PDFs, handwritten faculty notes, complete e-books, chapter-wise question banks, previous year solved papers (PYQs), revision formula bibles, and practice papers with student watermark protection.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Dynamic Student Watermarking
          </span>
          <span className="flex items-center gap-1 text-amber-300">
            <Lock className="w-4 h-4" /> DRM Download Restrictions
          </span>
          <span className="flex items-center gap-1 text-cyan-300">
            <BookOpen className="w-4 h-4" /> Seamless In-App Reader
          </span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="material-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, chapter, subject, or faculty author (e.g. Accounts, Gauss Law, Neha Roy)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {courseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl font-bold transition cursor-pointer shrink-0 text-xs ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Material Type Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold flex items-center gap-1 mr-1 text-[11px] shrink-0">
              <Filter className="w-3 h-3" /> Type:
            </span>
            {materialTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedType(t.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                  selectedType === t.value
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Material Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <p>
          Showing <span className="font-bold text-slate-900">{filteredMaterials.length}</span> curated study resources
        </p>
        <span className="text-[11px] text-indigo-600 font-bold">
          Click "Read In-App" to launch secure watermarked viewer
        </span>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            id={`study-material-card-${mat.id}`}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Type Badge & Security Tag */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-md border border-indigo-100">
                  {mat.type}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                  {mat.restrictedDownload && (
                    <span className="inline-flex items-center gap-0.5 text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-rose-200">
                      <Lock className="w-2.5 h-2.5" /> DRM Locked
                    </span>
                  )}
                  <span>{mat.fileSize} • {mat.pagesCount} Pgs</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                  {mat.subject} • {mat.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 font-serif leading-snug group-hover:text-indigo-600 transition mt-0.5">
                  {mat.title}
                </h4>
              </div>

              {/* Author & Stats */}
              <div className="pt-2 text-xs text-slate-500 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> By {mat.authorFaculty}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>Updated: {mat.updatedDate}</span>
                  <span className="font-semibold text-slate-600">{mat.downloadsCount.toLocaleString()} Reads</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mt-3">
              <button
                id={`read-in-app-btn-${mat.id}`}
                onClick={() => setPreviewMaterial(mat)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" /> Read In-App
              </button>

              {!mat.restrictedDownload ? (
                <button
                  id={`download-material-btn-${mat.id}`}
                  onClick={() => {
                    alert(`Downloading "${mat.title}" with student license watermark.`);
                  }}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div
                  className="p-2.5 bg-rose-50 text-rose-500 rounded-xl text-xs font-bold border border-rose-200 cursor-not-allowed"
                  title="Download restricted by institution for copyright protection"
                >
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PDF Modal Reader */}
      {previewMaterial && (
        <PdfDocumentViewer
          material={previewMaterial}
          currentUser={currentUser}
          onClose={() => setPreviewMaterial(null)}
        />
      )}
    </div>
  );
};
