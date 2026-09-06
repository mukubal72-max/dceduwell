import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadItem, LeadSource, LeadStatus } from '../../types';
import {
  PhoneCall,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  MessageCircle,
  FileSpreadsheet,
  Plus,
  Filter,
  Globe,
  Smartphone,
  Share2,
  Phone,
  Mail,
  Edit3,
  X,
  AlertCircle
} from 'lucide-react';

const SOURCE_BADGES: Record<LeadSource, { bg: string; text: string; icon: string }> = {
  'Website': { bg: 'bg-blue-50', text: 'text-blue-700', icon: '🌐' },
  'App': { bg: 'bg-purple-50', text: 'text-purple-700', icon: '📱' },
  'Facebook': { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '📘' },
  'Instagram': { bg: 'bg-rose-50', text: 'text-rose-700', icon: '📸' },
  'Google': { bg: 'bg-amber-50', text: 'text-amber-700', icon: '🔍' },
  'WhatsApp': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '💬' },
  'Referral': { bg: 'bg-teal-50', text: 'text-teal-700', icon: '🤝' },
  'Offline': { bg: 'bg-slate-100', text: 'text-slate-700', icon: '🏢' }
};

export const CounsellorPanel: React.FC = () => {
  const { leads, updateLeadStage, updateLeadDetails, addLead, courses } = useApp();
  
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  // Edit / Disposition state
  const [editStatus, setEditStatus] = useState<LeadStatus>('New');
  const [editFollowUpDate, setEditFollowUpDate] = useState('');
  const [editRemarks, setEditRemarks] = useState('');
  const [editCounsellor, setEditCounsellor] = useState('Priya Mehra');

  // Quick Lead Registration Modal state
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newInterestedCourse, setNewInterestedCourse] = useState(courses[0]?.title || 'Pinnacle JEE Advanced 2026');
  const [newSource, setNewSource] = useState<LeadSource>('Website');
  const [newCounsellor, setNewCounsellor] = useState('Priya Mehra');
  const [newFollowUpDate, setNewFollowUpDate] = useState('2026-03-10');
  const [newRemarks, setNewRemarks] = useState('');
  const [newStatus, setNewStatus] = useState<LeadStatus>('New');
  const [newDealValue, setNewDealValue] = useState(14999);

  const filteredLeads = leads.filter(l => {
    const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
    const matchesSource = sourceFilter === 'all' || (l.source || 'Website') === sourceFilter;
    const matchesSearch = l.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.targetCourse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSource && matchesSearch;
  });

  const handleOpenEditModal = (ld: LeadItem) => {
    setSelectedLead(ld);
    setEditStatus(ld.stage);
    setEditFollowUpDate(ld.followUpDate || '2026-03-12');
    setEditRemarks(ld.remarks || '');
    setEditCounsellor(ld.counsellorName || 'Priya Mehra');
  };

  const handleSaveLeadDisposition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    if (updateLeadDetails) {
      updateLeadDetails(selectedLead.id, {
        stage: editStatus,
        followUpDate: editFollowUpDate,
        remarks: editRemarks,
        counsellorName: editCounsellor
      });
    } else {
      updateLeadStage(selectedLead.id, editStatus, editRemarks);
    }

    setSelectedLead(null);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMobile.trim()) return;

    const newLd: LeadItem = {
      id: `lead-${Date.now()}`,
      studentName: newName.trim(),
      phone: newMobile.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      targetCourse: newInterestedCourse,
      source: newSource,
      counsellorName: newCounsellor,
      followUpDate: newFollowUpDate,
      remarks: newRemarks || 'Initial intake logged by counsellor.',
      city: 'Inbound CRM',
      stage: newStatus,
      createdAt: 'Today',
      lastFollowUp: 'Just now',
      notes: [newRemarks || 'New aspirant profile registered.'],
      dealValue: Number(newDealValue) || 14999
    };

    addLead(newLd);
    setShowNewLeadModal(false);

    // Reset
    setNewName('');
    setNewMobile('');
    setNewEmail('');
    setNewRemarks('');
  };

  // Metrics
  const totalLeads = leads.length;
  const enrolledLeads = leads.filter(l => l.stage === 'Enrolled').length;
  const conversionRate = totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0;
  const followUpsDueToday = leads.filter(l => l.stage === 'Follow Up' || l.followUpDate?.includes('2026-03')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
              Student Admission & CRM Desk
            </span>
            <span className="text-xs text-slate-400">Senior Academic Counsellor: Priya Mehra</span>
          </div>
          <h1 className="text-2xl font-black font-sans mt-2">Counsellor CRM & Multi-Channel Lead Tracker</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage inquiries across 8 omni-channel sources (Website, App, Facebook, Instagram, Google, WhatsApp, Referral, Offline) with scheduled follow-ups, remarks, and stage pipeline conversion.
          </p>
        </div>

        <button
          onClick={() => setShowNewLeadModal(true)}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-500/25 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Lead
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Inquiries</p>
          <p className="text-2xl font-black text-slate-900 font-sans">{totalLeads}</p>
        </div>
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Follow-ups Due</p>
          <p className="text-2xl font-black text-amber-600 font-sans">{followUpsDueToday}</p>
        </div>
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Enrolled Admissions</p>
          <p className="text-2xl font-black text-emerald-600 font-sans">{enrolledLeads}</p>
        </div>
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Conversion Rate</p>
          <p className="text-2xl font-black text-slate-900 font-sans">{conversionRate}%</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, phone, email or course..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 text-xs"
            >
              <option value="all">All Lead Sources</option>
              <option value="Website">🌐 Website</option>
              <option value="App">📱 App</option>
              <option value="Facebook">📘 Facebook</option>
              <option value="Instagram">📸 Instagram</option>
              <option value="Google">🔍 Google</option>
              <option value="WhatsApp">💬 WhatsApp</option>
              <option value="Referral">🤝 Referral</option>
              <option value="Offline">🏢 Offline</option>
            </select>

            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 text-xs"
            >
              <option value="all">All Stages</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Demo Scheduled">Demo Scheduled</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        {/* Quick source pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
          <span className="text-slate-400 mr-1">Channel:</span>
          {(['all', 'Website', 'App', 'Facebook', 'Instagram', 'Google', 'WhatsApp', 'Referral', 'Offline'] as const).map(src => (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer shrink-0 ${
                sourceFilter === src
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {src === 'all' ? 'All Channels' : src}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 font-sans">
            Aspirant Inquiries Pipeline ({filteredLeads.length})
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live CRM Database</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Student & Contact</th>
                <th className="py-3 px-4">Interested Course</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Assigned Counsellor</th>
                <th className="py-3 px-4">Follow-up Date</th>
                <th className="py-3 px-4">Remarks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((ld) => {
                const src = ld.source || 'Website';
                const badge = SOURCE_BADGES[src] || SOURCE_BADGES['Website'];

                return (
                  <tr key={ld.id} className="hover:bg-slate-50/80 transition">
                    {/* Name + Mobile */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{ld.studentName}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" /> {ld.phone}
                      </div>
                      <div className="text-[11px] text-slate-400">{ld.email}</div>
                    </td>

                    {/* Interested Course */}
                    <td className="py-3 px-4 font-semibold text-indigo-950">
                      <div>{ld.targetCourse}</div>
                      <div className="text-[10px] text-emerald-700 font-bold">₹{ld.dealValue.toLocaleString()}</div>
                    </td>

                    {/* Source */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text} border border-slate-200/80`}>
                        <span>{badge.icon}</span>
                        <span>{src}</span>
                      </span>
                    </td>

                    {/* Assigned Counsellor */}
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {ld.counsellorName || 'Priya Mehra'}
                    </td>

                    {/* Follow-up Date */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-800 font-bold text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-500" />
                        <span>{ld.followUpDate || '2026-03-12'}</span>
                      </div>
                    </td>

                    {/* Remarks */}
                    <td className="py-3 px-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2 text-[11px]">
                        {ld.remarks || ld.notes?.[0] || 'No remarks logged.'}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        ld.stage === 'Enrolled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ld.stage === 'Interested' || ld.stage === 'Demo Scheduled'
                          ? 'bg-purple-100 text-purple-800'
                          : ld.stage === 'Follow Up'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {ld.stage}
                      </span>
                    </td>

                    {/* Quick Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenEditModal(ld)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] transition cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Edit3 className="w-3 h-3" /> Update
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No leads found matching criteria. Click "Add New Lead" to log an enquiry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: UPDATE LEAD DETAILS & REMARKS */}
      {/* ========================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  {selectedLead.source || 'Website'} Lead
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">
                  Update Lead: {selectedLead.studentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLeadDisposition} className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 space-y-1">
                <p><b>Mobile:</b> {selectedLead.phone} • <b>Email:</b> {selectedLead.email}</p>
                <p><b>Interested Course:</b> {selectedLead.targetCourse}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status *</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Enrolled">Enrolled ✓</option>
                    <option value="Lost">Lost</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Follow-up Date *</label>
                  <input
                    type="date"
                    required
                    value={editFollowUpDate}
                    onChange={e => setEditFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Assigned Counsellor</label>
                <input
                  type="text"
                  value={editCounsellor}
                  onChange={e => setEditCounsellor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Remarks & Follow-up Notes *</label>
                <textarea
                  rows={3}
                  required
                  value={editRemarks}
                  onChange={e => setEditRemarks(e.target.value)}
                  placeholder="Record student conversation, scholarship eligibility, target test date..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold cursor-pointer shadow-md"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW LEAD */}
      {/* ========================================================================= */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" /> Log Inbound Aspirant Lead
                </h3>
                <p className="text-xs text-slate-500">Capture student lead across digital and offline touchpoints</p>
              </div>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yashvardhan Sharma"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newMobile}
                    onChange={e => setNewMobile(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Interested Course *</label>
                  <select
                    value={newInterestedCourse}
                    onChange={e => setNewInterestedCourse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lead Source *</label>
                  <select
                    value={newSource}
                    onChange={e => setNewSource(e.target.value as LeadSource)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Website">🌐 Website</option>
                    <option value="App">📱 App</option>
                    <option value="Facebook">📘 Facebook</option>
                    <option value="Instagram">📸 Instagram</option>
                    <option value="Google">🔍 Google</option>
                    <option value="WhatsApp">💬 WhatsApp</option>
                    <option value="Referral">🤝 Referral</option>
                    <option value="Offline">🏢 Offline</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Counsellor</label>
                  <input
                    type="text"
                    value={newCounsellor}
                    onChange={e => setNewCounsellor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Follow-up Date</label>
                  <input
                    type="date"
                    value={newFollowUpDate}
                    onChange={e => setNewFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Follow Up">Follow Up</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Remarks</label>
                <textarea
                  rows={2}
                  value={newRemarks}
                  onChange={e => setNewRemarks(e.target.value)}
                  placeholder="Key student requirements, current class, previous attempt score..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer shadow-md"
                >
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
