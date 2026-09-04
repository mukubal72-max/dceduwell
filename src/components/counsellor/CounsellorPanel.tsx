import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadItem } from '../../types';
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
  FileSpreadsheet
} from 'lucide-react';

export const CounsellorPanel: React.FC = () => {
  const { leads, updateLeadStage, addLead, courses } = useApp();
  
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [callNotes, setCallNotes] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  // Quick Lead Registration Modal state
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newExam, setNewExam] = useState('Pinnacle JEE Advanced 2026');
  const [newCity, setNewCity] = useState('');

  const filteredLeads = leads.filter(l => {
    if (stageFilter === 'all') return true;
    return l.stage === stageFilter;
  });

  const handleUpdateStage = (leadId: string, newStage: LeadItem['stage']) => {
    updateLeadStage(leadId, newStage, callNotes || undefined);
    setSelectedLead(null);
    setCallNotes('');
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newLd: LeadItem = {
      id: `lead-${Date.now()}`,
      studentName: newName.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      targetCourse: newExam,
      city: newCity.trim() || 'Online Inbound',
      stage: 'New Enquiry',
      counsellorName: 'Priya Mehra',
      createdAt: 'Today',
      lastFollowUp: 'Just now',
      notes: ['Inbound walk-in enquiry registered.'],
      dealValue: 14999
    };

    addLead(newLd);
    setShowNewLeadModal(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewCity('');
  };

  // Metrics
  const totalLeads = leads.length;
  const enrolledLeads = leads.filter(l => l.stage === 'Enrolled').length;
  const conversionRate = totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-[#1E293B] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/20">
              Student Admission & CRM Desk
            </span>
            <span className="text-xs text-slate-400">Senior Academic Counsellor: Priya Mehra</span>
          </div>
          <h1 className="text-2xl font-bold font-sans mt-2">Admissions Pipeline & Lead Tracker</h1>
          <p className="text-xs text-slate-300 mt-1">
            Qualify incoming aspirants, conduct diagnostic counseling, offer scholarship grants, and guide course enrollment.
          </p>
        </div>

        <button
          onClick={() => setShowNewLeadModal(true)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-500/30"
        >
          <PhoneCall className="w-4 h-4" /> Add Walk-in Lead
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Inquiries</p>
          <p className="text-3xl font-black text-slate-900 font-sans">{totalLeads}</p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Free Demos Booked</p>
          <p className="text-3xl font-black text-indigo-600 font-sans">
            {leads.filter(l => l.stage === 'Demo Scheduled').length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Enrolled Admissions</p>
          <p className="text-3xl font-black text-emerald-600 font-sans">{enrolledLeads}</p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Conversion Rate</p>
          <p className="text-3xl font-black text-slate-900 font-sans">{conversionRate}%</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs text-xs">
        {['all', 'New Enquiry', 'Contacted', 'Demo Scheduled', 'Enrolled', 'Follow Up'].map((st) => (
          <button
            key={st}
            onClick={() => setStageFilter(st)}
            className={`px-4 py-2 rounded-xl font-bold transition capitalize cursor-pointer shrink-0 ${
              stageFilter === st
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 font-serif">Aspirant Inquiries ({filteredLeads.length})</h3>
          <span className="text-xs text-slate-400 font-mono">Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Target Batch</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Stage</th>
                <th className="pb-3">Deal Value</th>
                <th className="pb-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((ld) => (
                <tr key={ld.id} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-900">{ld.studentName}</td>
                  <td className="py-3 font-medium text-indigo-900">{ld.targetCourse}</td>
                  <td className="py-3 text-slate-600 font-mono">{ld.phone}</td>
                  <td className="py-3 text-slate-500">{ld.city}</td>
                  <td className="py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-900">
                      {ld.stage}
                    </span>
                  </td>
                  <td className="py-3 text-emerald-700 font-bold">₹{ld.dealValue.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => { setSelectedLead(ld); setCallNotes(''); }}
                      className="px-3 py-1 bg-indigo-950 hover:bg-indigo-900 text-white rounded-lg font-bold text-[11px] transition cursor-pointer"
                    >
                      Update Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Lead Disposition Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  {selectedLead.targetCourse}
                </span>
                <h3 className="font-bold text-sm text-slate-900 font-serif mt-1">
                  Counseling Log: {selectedLead.studentName}
                </h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-900">✕</button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <p><strong>Phone:</strong> {selectedLead.phone} | <strong>City:</strong> {selectedLead.city}</p>
              <p><strong>Counsellor:</strong> {selectedLead.counsellorName}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Add Counseling Remarks & Diagnostic Log</label>
                <textarea
                  rows={3}
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="e.g. Discussed scholarship test syllabus; student eager to join Pinnacle JEE batch..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2">
                <label className="block font-semibold text-slate-700 mb-2">Move Pipeline Stage:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStage(selectedLead.id, 'Contacted')}
                    className="p-2 bg-blue-50 text-blue-900 rounded-lg font-bold border border-blue-200 hover:bg-blue-100"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedLead.id, 'Demo Scheduled')}
                    className="p-2 bg-purple-50 text-purple-900 rounded-lg font-bold border border-purple-200 hover:bg-purple-100"
                  >
                    Schedule Free Demo
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedLead.id, 'Enrolled')}
                    className="p-2 bg-emerald-50 text-emerald-900 rounded-lg font-bold border border-emerald-200 hover:bg-emerald-100"
                  >
                    Confirm Enrollment ✓
                  </button>
                  <button
                    onClick={() => handleUpdateStage(selectedLead.id, 'Follow Up')}
                    className="p-2 bg-amber-50 text-amber-900 rounded-lg font-bold border border-amber-200 hover:bg-amber-100"
                  >
                    Follow Up Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Walk-in Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Add Inbound Aspirant Lead</h3>
            
            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Divyanshu Goyal"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Batch</label>
                <select
                  value={newExam}
                  onChange={(e) => setNewExam(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Pinnacle JEE Advanced 2026">Pinnacle JEE Advanced 2026</option>
                  <option value="Dr. Visionary NEET UG 2026">Dr. Visionary NEET UG 2026</option>
                  <option value="Samarth IAS - UPSC 2026">Samarth IAS - UPSC 2026</option>
                  <option value="Class 12th Board Booster">Class 12th Board Booster</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">City / State</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="e.g. Lucknow, UP"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
