import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComboPackage } from '../../types';
import {
  Layers,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Star,
  Video,
  Radio,
  FileCheck,
  FolderDown,
  HelpCircle,
  ShieldCheck,
  Tag,
  Search,
  Sparkles,
  DollarSign,
  PackageCheck,
  Eye
} from 'lucide-react';

export const CombosManagerView: React.FC = () => {
  const { comboPackages, addComboPackage, updateComboPackage, deleteComboPackage, courses } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComboId, setEditingComboId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CA & Commerce (Foundation/Inter)');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(14999);
  const [originalPrice, setOriginalPrice] = useState<number>(29999);
  const [validity, setValidity] = useState('1 Year Full Access');
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  
  // Deliverable flags
  const [hasRecordedVideos, setHasRecordedVideos] = useState(true);
  const [hasLiveClasses, setHasLiveClasses] = useState(true);
  const [hasTestSeries, setHasTestSeries] = useState(true);
  const [hasStudyMaterial, setHasStudyMaterial] = useState(true);
  const [hasDoubtSupport, setHasDoubtSupport] = useState(true);
  const [hasMentorship, setHasMentorship] = useState(true);

  const resetForm = () => {
    setEditingComboId(null);
    setTitle('');
    setCategory('CA & Commerce (Foundation/Inter)');
    setDescription('');
    setPrice(14999);
    setOriginalPrice(29999);
    setValidity('1 Year Full Access');
    setSelectedCourseIds([]);
    setHasRecordedVideos(true);
    setHasLiveClasses(true);
    setHasTestSeries(true);
    setHasStudyMaterial(true);
    setHasDoubtSupport(true);
    setHasMentorship(true);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (combo: ComboPackage) => {
    setEditingComboId(combo.id);
    setTitle(combo.title);
    setCategory(combo.category);
    setDescription(combo.description);
    setPrice(combo.price);
    setOriginalPrice(combo.originalPrice);
    setValidity(combo.validity);
    setSelectedCourseIds(combo.linkedCourseIds || []);
    
    // Check items in includedItems array
    const items = combo.includedItems || [];
    setHasRecordedVideos(items.some(i => i.toLowerCase().includes('recorded') || i.toLowerCase().includes('video')));
    setHasLiveClasses(items.some(i => i.toLowerCase().includes('live')));
    setHasTestSeries(items.some(i => i.toLowerCase().includes('test')));
    setHasStudyMaterial(items.some(i => i.toLowerCase().includes('material') || i.toLowerCase().includes('book')));
    setHasDoubtSupport(items.some(i => i.toLowerCase().includes('doubt')));
    setHasMentorship(items.some(i => i.toLowerCase().includes('mentor') || i.toLowerCase().includes('guidance')));

    setIsModalOpen(true);
  };

  const handleSaveCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const includedItemsList: string[] = [];
    if (hasRecordedVideos) includedItemsList.push('Full Recorded Video Course (4K HDR)');
    if (hasLiveClasses) includedItemsList.push('Daily Live Interactive Batch Classes');
    if (hasTestSeries) includedItemsList.push('All-India CBT Test Series & Mock Exams');
    if (hasStudyMaterial) includedItemsList.push('Printed / Digital Comprehensive Study Material & Formula Sheets');
    if (hasDoubtSupport) includedItemsList.push('24x7 Priority Doubt Support Desk');
    if (hasMentorship) includedItemsList.push('1-on-1 Faculty Mentorship & Strategy Sessions');

    const discountPercentage = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const comboData: Omit<ComboPackage, 'id'> = {
      title: title.trim(),
      category,
      description: description.trim() || 'All-inclusive comprehensive preparation bundle with complete video lectures, test series, and study materials.',
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercentage,
      includedItems: includedItemsList,
      hasRecordedVideos,
      hasLiveClasses,
      hasTestSeries,
      hasStudyMaterial,
      hasDoubtSupport,
      hasMentorship,
      validity,
      linkedCourseIds: selectedCourseIds,
      isActive: true,
      enrolledCount: editingComboId ? (comboPackages.find(c => c.id === editingComboId)?.enrolledCount || 0) : 0
    };

    if (editingComboId) {
      updateComboPackage(editingComboId, comboData);
    } else {
      addComboPackage(comboData);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const filteredCombos = comboPackages.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-7 rounded-3xl border border-indigo-900/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-400/20">
            <Layers className="w-3.5 h-3.5 text-indigo-400" /> All-In-One Institutional Bundles
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif mt-2">Combo Package System & Bundle Store</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Bundle Recorded Video Courses + Live Classes + CBT Test Series + Comprehensive Study Material + 24x7 Doubt Support at attractive all-inclusive special package pricing.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Combo Package
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search combo package..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="All">All Categories</option>
            <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
            <option value="NEET (Medical)">NEET (Medical)</option>
            <option value="CA & Commerce (Foundation/Inter)">CA & Commerce</option>
            <option value="UPSC & Civil Services">UPSC & Civil Services</option>
          </select>
        </div>
      </div>

      {/* Combo Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCombos.map((combo) => {
          const savings = combo.originalPrice - combo.price;
          return (
            <div
              key={combo.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between hover:border-indigo-300 transition group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded-full border border-indigo-100">
                    {combo.category}
                  </span>
                  <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Save {combo.discountPercentage}%
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif leading-snug group-hover:text-indigo-950 transition">
                    {combo.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{combo.description}</p>
                </div>

                {/* Bundle Component Checklist */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    All-Inclusive Deliverables:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Video className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="font-medium">Recorded Video Course (Full Syllabi)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Radio className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="font-medium">Daily Live Interactive Classes</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium">All-India CBT Test Series & Ranks</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <FolderDown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium">Study Material, Formula Handbooks & DPPs</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <HelpCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="font-medium">24x7 Faculty Doubt Support</span>
                    </div>
                  </div>
                </div>

                {/* Price & Savings */}
                <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900 font-mono">₹{combo.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-400 line-through font-mono">₹{combo.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 font-bold">You save ₹{savings.toLocaleString('en-IN')} with bundle</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{combo.validity}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">{combo.enrolledCount || 0} Students Enrolled</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(combo)}
                    className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
                    title="Edit Combo"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete combo package ${combo.title}?`)) {
                        deleteComboPackage(combo.id);
                      }
                    }}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete Combo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif">
                    {editingComboId ? 'Edit Combo Package' : 'Create Complete Bundle Package'}
                  </h3>
                  <p className="text-[10px] text-slate-500">Configure bundle deliverables, special bundle price, and linked courses</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCombo} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CA Foundation Complete Package (All 4 Subjects)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white text-xs"
                  >
                    <option value="CA & Commerce (Foundation/Inter)">CA & Commerce (Foundation/Inter)</option>
                    <option value="JEE (Main & Adv)">JEE (Main & Adv)</option>
                    <option value="NEET (Medical)">NEET (Medical)</option>
                    <option value="UPSC & Civil Services">UPSC & Civil Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Validity Duration</label>
                  <input
                    type="text"
                    value={validity}
                    onChange={(e) => setValidity(e.target.value)}
                    placeholder="e.g. 1 Year Full Access"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive bundle covering all exams and modules with personal guidance..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              {/* Special Bundle Pricing */}
              <div className="grid grid-cols-2 gap-3 bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100">
                <div>
                  <label className="block font-bold text-indigo-950 mb-1">Special Bundle Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-indigo-200 bg-white font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-indigo-950 mb-1">Total Value / MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-indigo-200 bg-white font-mono text-xs"
                  />
                </div>
              </div>

              {/* Deliverable Checkboxes */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Included Bundle Deliverables:</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRecordedVideos}
                      onChange={(e) => setHasRecordedVideos(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Recorded Video Course</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLiveClasses}
                      onChange={(e) => setHasLiveClasses(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Live Interactive Classes</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasTestSeries}
                      onChange={(e) => setHasTestSeries(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>CBT Test Series</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasStudyMaterial}
                      onChange={(e) => setHasStudyMaterial(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Study Material & Books</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasDoubtSupport}
                      onChange={(e) => setHasDoubtSupport(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>24x7 Doubt Support</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasMentorship}
                      onChange={(e) => setHasMentorship(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>1-on-1 Mentorship</span>
                  </label>
                </div>
              </div>

              {/* Linked Courses */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Link Associated Courses to Auto-Unlock on Purchase:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px]">
                  {courses.map(course => (
                    <label key={course.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedCourseIds.includes(course.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCourseIds([...selectedCourseIds, course.id]);
                          } else {
                            setSelectedCourseIds(selectedCourseIds.filter(id => id !== course.id));
                          }
                        }}
                        className="rounded text-indigo-600"
                      />
                      <span className="truncate">{course.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition"
                >
                  {editingComboId ? 'Update Package' : 'Publish Combo Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
