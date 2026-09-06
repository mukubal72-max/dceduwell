import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterialItem, StudyMaterialType, CourseCategory } from '../../types';
import { PdfDocumentViewer } from '../common/PdfDocumentViewer';
import {
  BookOpen,
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  ShieldCheck,
  Lock,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  FileCheck,
  Layers,
  Award,
  Calendar,
  X,
  BookMarked,
  Clock,
  ExternalLink,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

const REQUIRED_MATERIAL_TYPES: { type: StudyMaterialType; label: string; icon: string; desc: string }[] = [
  { type: 'PDF', label: 'PDF Documents', icon: '📄', desc: 'Classroom handouts, high-yield summaries & formula guides' },
  { type: 'Notes', label: 'Handwritten Notes', icon: '📝', desc: 'Faculty classroom notes & annotated lecture transcripts' },
  { type: 'Books', label: 'Reference Books', icon: '📚', desc: 'Comprehensive digital textbooks & reference literature' },
  { type: 'Assignments', label: 'Assignments', icon: '📋', desc: 'Graded homework, problem sheets & weekly subjective drills' },
  { type: 'Question Banks', label: 'Question Banks', icon: '❓', desc: 'Topic-wise practice questions with step-by-step solutions' },
  { type: 'Previous Year Papers', label: 'Previous Year Papers', icon: '⏳', desc: 'Past 10-year official papers with examiner answer keys' },
  { type: 'Revision Material', label: 'Revision Material', icon: '⚡', desc: 'Last day revision (LDR) memory capsules & concept maps' },
  { type: 'Practice Papers', label: 'Practice Papers', icon: '🎯', desc: 'Full-length timed mock exams with OMR score sheets' }
];

export const StudyMaterialManagerView: React.FC = () => {
  const {
    studyMaterials,
    uploadStudyMaterial,
    updateStudyMaterial,
    deleteStudyMaterial,
    currentUser
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');

  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<StudyMaterialItem | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterialItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<StudyMaterialType>('PDF');
  const [formSubject, setFormSubject] = useState('Accounts');
  const [formCategory, setFormCategory] = useState<CourseCategory>('CA Foundation');
  const [formAuthor, setFormAuthor] = useState(currentUser.name || 'Master Faculty');
  const [formPagesCount, setFormPagesCount] = useState(48);
  const [formFileSize, setFormFileSize] = useState('6.4 MB');
  const [formIsFree, setFormIsFree] = useState(true);
  const [formHasWatermark, setFormHasWatermark] = useState(true);
  const [formRestrictedDownload, setFormRestrictedDownload] = useState(false);
  const [formDescription, setFormDescription] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('Comprehensive_Module_Notes.pdf');

  // Unique Subjects for filter
  const uniqueSubjects = Array.from(new Set(studyMaterials.map(m => m.subject).filter(Boolean)));

  // Filtered list
  const filteredMaterials = studyMaterials.filter(m => {
    const matchSearch =
      !searchQuery.trim() ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.authorFaculty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = selectedTypeFilter === 'All' || m.type === selectedTypeFilter;
    const matchCategory = selectedCategoryFilter === 'All' || m.category === selectedCategoryFilter;
    const matchSubject = selectedSubjectFilter === 'All' || m.subject === selectedSubjectFilter;

    return matchSearch && matchType && matchCategory && matchSubject;
  });

  const resetForm = () => {
    setFormTitle('');
    setFormType('PDF');
    setFormSubject('Accounts');
    setFormCategory('CA Foundation');
    setFormAuthor(currentUser.name || 'Master Faculty');
    setFormPagesCount(48);
    setFormFileSize('6.4 MB');
    setFormIsFree(true);
    setFormHasWatermark(true);
    setFormRestrictedDownload(false);
    setFormDescription('');
    setSelectedFileName('Comprehensive_Module_Notes.pdf');
    setEditingMaterial(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setShowUploadModal(true);
  };

  const handleOpenEditModal = (item: StudyMaterialItem) => {
    setEditingMaterial(item);
    setFormTitle(item.title);
    setFormType(item.type);
    setFormSubject(item.subject);
    setFormCategory(item.category as CourseCategory);
    setFormAuthor(item.authorFaculty || currentUser.name || 'Master Faculty');
    setFormPagesCount(item.pagesCount || 32);
    setFormFileSize(item.fileSize || '5.2 MB');
    setFormIsFree(item.isFree);
    setFormHasWatermark(item.hasWatermark !== false);
    setFormRestrictedDownload(!!item.restrictedDownload);
    setFormDescription(item.description || '');
    setSelectedFileName('Uploaded_Document.pdf');
    setShowUploadModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingMaterial) {
      updateStudyMaterial({
        ...editingMaterial,
        title: formTitle,
        type: formType,
        subject: formSubject,
        category: formCategory,
        authorFaculty: formAuthor,
        pagesCount: Number(formPagesCount),
        fileSize: formFileSize,
        isFree: formIsFree,
        hasWatermark: formHasWatermark,
        restrictedDownload: formRestrictedDownload,
        description: formDescription,
        updatedDate: 'Just Now'
      });
    } else {
      uploadStudyMaterial({
        title: formTitle,
        type: formType,
        subject: formSubject,
        category: formCategory,
        authorFaculty: formAuthor,
        pagesCount: Number(formPagesCount),
        fileSize: formFileSize,
        isFree: formIsFree,
        hasWatermark: formHasWatermark,
        restrictedDownload: formRestrictedDownload,
        description: formDescription,
        downloadUrl: '#',
        downloadsCount: 0,
        viewsCount: 0,
        updatedDate: 'Just Now'
      });
    }

    setShowUploadModal(false);
    resetForm();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the Study Material Vault?`)) {
      deleteStudyMaterial(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#1E293B] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
              Module 28 • Academic Study Material Vault
            </span>
            <span className="text-xs text-slate-300 font-mono">Admin & Faculty Control Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-sans mt-2">
            Study Material & Curriculum Repository Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Publish, categorize, and protect all 8 core resource formats: PDF documents, handwritten notes, reference books, graded assignments, comprehensive question banks, solved PYQ archives, fast-track revision capsules, and mock practice papers.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New Study Material</span>
        </button>
      </div>

      {/* 8-TYPE SUMMARY BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
        {REQUIRED_MATERIAL_TYPES.map(matMeta => {
          const count = studyMaterials.filter(m => m.type === matMeta.type).length;
          const isSelected = selectedTypeFilter === matMeta.type;

          return (
            <button
              key={matMeta.type}
              onClick={() => setSelectedTypeFilter(isSelected ? 'All' : matMeta.type)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-amber-50 border-amber-400 shadow-xs ring-2 ring-amber-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{matMeta.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs truncate">{matMeta.label}</p>
                <p className="text-[10px] text-slate-400 line-clamp-1">{matMeta.type}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* KPI METRICS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Vault Documents</span>
          <div className="text-2xl font-black text-slate-900 font-sans">{studyMaterials.length} Resources</div>
          <p className="text-[11px] text-emerald-600 font-bold">Active in Student Library</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Downloads</span>
          <div className="text-2xl font-black text-indigo-950 font-sans">
            {studyMaterials.reduce((acc, m) => acc + (m.downloadsCount || 0), 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-indigo-600 font-bold">Verified Reading Access</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Watermark Protection</span>
          <div className="text-2xl font-black text-emerald-700 font-sans">
            {studyMaterials.filter(m => m.hasWatermark !== false).length} Secured
          </div>
          <p className="text-[11px] text-slate-500">Anti-Piracy Dynamic Stamp</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DRM Restricted Downloads</span>
          <div className="text-2xl font-black text-amber-800 font-sans">
            {studyMaterials.filter(m => m.restrictedDownload).length} Read-Only
          </div>
          <p className="text-[11px] text-amber-700 font-bold">Protected in App Viewer</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, subject (Accounts, Law, Economics...), or faculty name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Categories / Exams</option>
            <option value="CA Foundation">CA Foundation</option>
            <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
            <option value="NEET (Medical)">NEET (Medical)</option>
            <option value="UPSC & Civil Services">UPSC & Civil Services</option>
            <option value="Class 11-12 Boards">Class 11-12 Boards</option>
          </select>

          {/* Subject Filter */}
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Subjects</option>
            {uniqueSubjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All 8 Resource Types</option>
            {REQUIRED_MATERIAL_TYPES.map(t => (
              <option key={t.type} value={t.type}>{t.icon} {t.label}</option>
            ))}
          </select>

          {(selectedTypeFilter !== 'All' || selectedCategoryFilter !== 'All' || selectedSubjectFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTypeFilter('All');
                setSelectedCategoryFilter('All');
                setSelectedSubjectFilter('All');
                setSearchQuery('');
              }}
              className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold cursor-pointer transition flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* STUDY MATERIALS REPOSITORY TABLE / GRID */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-slate-900">
              Curated Study Resources ({filteredMaterials.length} Matched)
            </h3>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
              PDF • Notes • Books • Assignments • Question Banks • PYQs • Revision • Practice Papers
            </span>
          </div>

          <span className="text-xs text-slate-500">
            Showing {filteredMaterials.length} of {studyMaterials.length} resources
          </span>
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">No Study Materials Found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No material matches the selected search filters. Try selecting "All 8 Resource Types" or upload a new resource.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition"
            >
              Upload Material Now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredMaterials.map((mat) => {
              const typeMeta = REQUIRED_MATERIAL_TYPES.find(t => t.type === mat.type) || {
                icon: '📄',
                label: mat.type
              };

              return (
                <div
                  key={mat.id}
                  className="p-5 hover:bg-slate-50/70 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-indigo-50 border border-slate-200 flex items-center justify-center text-xl shrink-0 shadow-xs">
                      {typeMeta.icon}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition">
                          {mat.title}
                        </span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                          {mat.type}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {mat.category}
                        </span>
                        {mat.isFree ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Free Demo
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Enrolled Students
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {mat.description || 'Comprehensive syllabus notes, high-yield summaries, and verified derivations.'}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-0.5">
                        <span className="font-bold text-slate-700">Subject: {mat.subject}</span>
                        <span>•</span>
                        <span>Faculty: <strong className="text-slate-700">{mat.authorFaculty || 'Master Faculty'}</strong></span>
                        <span>•</span>
                        <span>{mat.pagesCount} Pages</span>
                        <span>•</span>
                        <span>{mat.fileSize}</span>
                        <span>•</span>
                        <span className="text-indigo-600 font-medium">{(mat.downloadsCount || 0).toLocaleString()} Downloads</span>
                        {mat.hasWatermark !== false && (
                          <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Watermark Active
                          </span>
                        )}
                        {mat.restrictedDownload && (
                          <span className="text-amber-600 font-bold flex items-center gap-0.5">
                            <Lock className="w-3 h-3" /> Read-Only DRM
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <button
                      onClick={() => setPreviewMaterial(mat)}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview Reader
                    </button>

                    <button
                      onClick={() => alert(`Downloading "${mat.title}" (${mat.fileSize}) with dynamic security watermark stamped for user ${currentUser.name}...`)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(mat)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                      title="Edit Material"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(mat.id, mat.title)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                      title="Delete Material"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* UPLOAD / EDIT MATERIAL MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-5 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded">
                  {editingMaterial ? 'Edit Existing Resource' : '28. Study Material Management'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">
                  {editingMaterial ? 'Update Study Material Asset' : 'Upload New Academic Resource'}
                </h3>
              </div>
              <button
                onClick={() => { setShowUploadModal(false); resetForm(); }}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. CA Foundation Accounts Comprehensive Ind AS & Balance Sheet Master Guide"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 font-semibold text-slate-800"
                />
              </div>

              {/* Resource Type & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Resource Type (8 Mandatory Formats) *
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as StudyMaterialType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800"
                  >
                    {REQUIRED_MATERIAL_TYPES.map(t => (
                      <option key={t.type} value={t.type}>
                        {t.icon} • {t.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Category / Exam *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CourseCategory)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800"
                  >
                    <option value="CA Foundation">CA Foundation</option>
                    <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                    <option value="NEET (Medical)">NEET (Medical)</option>
                    <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                    <option value="Class 11-12 Boards">Class 11-12 Boards</option>
                  </select>
                </div>
              </div>

              {/* Subject & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Subject *</label>
                  <input
                    type="text"
                    required
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="e.g. Accounts, Law, Economics, Physics..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author / Lead Faculty</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. CA Nitin Singhania"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Pages count & File size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formPagesCount}
                    onChange={(e) => setFormPagesCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">File Size</label>
                  <input
                    type="text"
                    value={formFileSize}
                    onChange={(e) => setFormFileSize(e.target.value)}
                    placeholder="e.g. 5.6 MB"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Key Topics</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Summarize key chapters, syllabus coverage, formulas, or assignment guidelines..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-normal"
                />
              </div>

              {/* File Attachment Drag & Drop simulation */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-indigo-600 mx-auto" />
                <div>
                  <p className="font-bold text-slate-800">
                    {selectedFileName ? selectedFileName : 'Choose Document File or Drag & Drop'}
                  </p>
                  <p className="text-[10px] text-slate-400">PDF, EPUB, DOCX supported up to 100MB</p>
                </div>
                <label className="inline-block px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shadow-xs">
                  Browse Device
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Access & Security Toggles */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  Access Privileges & Digital Rights Management (DRM)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={formIsFree}
                      onChange={(e) => setFormIsFree(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Free Preview</span>
                      <span className="text-[10px] text-slate-400">Public access</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={formHasWatermark}
                      onChange={(e) => setFormHasWatermark(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">Watermark Stamp</span>
                      <span className="text-[10px] text-slate-400">Student ID & Email</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={formRestrictedDownload}
                      onChange={(e) => setFormRestrictedDownload(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">In-App Read Only</span>
                      <span className="text-[10px] text-slate-400">Block file download</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowUploadModal(false); resetForm(); }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingMaterial ? 'Save Changes' : 'Publish Study Material'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF VIEWER PREVIEW MODAL */}
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
