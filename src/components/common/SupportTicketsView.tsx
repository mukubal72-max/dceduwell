import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportTicket, TicketCategory, TicketPriority, TicketStatus } from '../../types';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  CreditCard,
  Video,
  Radio,
  FileCheck,
  Award,
  HelpCircle,
  X,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  mode: 'student' | 'admin';
}

const CATEGORY_ICONS: Record<TicketCategory, React.ReactNode> = {
  'Payment': <CreditCard className="w-4 h-4 text-emerald-600" />,
  'Course Access': <ShieldCheck className="w-4 h-4 text-indigo-600" />,
  'Video Issue': <Video className="w-4 h-4 text-rose-500" />,
  'Live Class': <Radio className="w-4 h-4 text-amber-500" />,
  'Test': <FileCheck className="w-4 h-4 text-blue-600" />,
  'Account': <User className="w-4 h-4 text-purple-600" />,
  'Certificate': <Award className="w-4 h-4 text-amber-600" />,
  'Other': <HelpCircle className="w-4 h-4 text-slate-500" />
};

const STATUS_COLORS: Record<TicketStatus, { bg: string; text: string; border: string }> = {
  'Open': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  'In Progress': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'Resolved': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Closed': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' }
};

export const SupportTicketsView: React.FC<Props> = ({ mode }) => {
  const {
    supportTickets,
    createTicket,
    updateTicketStatus,
    replyToTicket,
    assignTicketAgent,
    currentUser,
    courses
  } = useApp();

  const [selectedTicketId, setSelectedTicketId] = useState<string>(supportTickets[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState<'All' | TicketStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | TicketCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Raise Ticket Modal (Student)
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [category, setCategory] = useState<TicketCategory>('Course Access');
  const [priority, setPriority] = useState<TicketPriority>('Medium');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedCourse, setRelatedCourse] = useState(courses[0]?.title || '');

  // Reply state
  const [replyMessage, setReplyMessage] = useState('');

  // Filter tickets based on student or admin
  const relevantTickets = mode === 'student'
    ? supportTickets.filter(t => t.studentId === currentUser.id || t.studentEmail === currentUser.email)
    : supportTickets;

  const filteredTickets = relevantTickets.filter(t => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const activeTicket = relevantTickets.find(t => t.id === selectedTicketId) || filteredTickets[0];

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    createTicket({
      studentId: currentUser.id || 'std-guest',
      studentName: currentUser.name || 'Enrolled Aspirant',
      studentEmail: currentUser.email || 'student@dcmaxwell.edu',
      studentPhone: currentUser.phone || '+91 98765 43210',
      category,
      subject: subject.trim(),
      description: description.trim(),
      priority,
      relatedCourse: relatedCourse || undefined
    });

    setShowRaiseModal(false);
    setSubject('');
    setDescription('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicket) return;

    replyToTicket(
      activeTicket.id,
      replyMessage.trim(),
      mode === 'admin' ? 'Support Desk Specialist' : currentUser.name,
      mode === 'admin' ? 'support' : 'student'
    );

    setReplyMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full border border-rose-400/30 flex items-center gap-1.5">
              <LifeBuoy className="w-3 h-3" /> Priority Helpdesk
            </span>
            <span className="text-xs text-slate-400 font-medium">SLA Resolution Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white font-sans">
            {mode === 'admin' ? 'Student Support Ticket Control Center' : 'My Support Tickets & Helpdesk'}
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {mode === 'admin'
              ? 'Resolve student grievances across Payment, Course Access, Video Streaming, Live Classes, CBT Tests, Accounts, and Certificates with status progression (Open → In Progress → Resolved → Closed).'
              : 'Have an issue with payments, video lectures, live class links, or CBT tests? Raise an official ticket for immediate resolution by our technical support coordinators.'}
          </p>
        </div>

        {mode === 'student' && (
          <button
            onClick={() => setShowRaiseModal(true)}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-rose-500/25 shrink-0"
          >
            <Plus className="w-4 h-4" /> Raise Support Ticket
          </button>
        )}
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['Open', 'In Progress', 'Resolved', 'Closed'] as const).map(st => {
          const count = relevantTickets.filter(t => t.status === st).length;
          const conf = STATUS_COLORS[st];
          return (
            <div
              key={st}
              onClick={() => setStatusFilter(statusFilter === st ? 'All' : st)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                statusFilter === st
                  ? `${conf.bg} ${conf.border} shadow-xs font-bold`
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{st}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conf.bg} ${conf.text} border ${conf.border}`}>
                  {count}
                </span>
              </div>
              <p className="text-xl font-black text-slate-900 mt-1">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ticket #, subject or name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 text-xs"
          >
            <option value="All">All Categories</option>
            <option value="Payment">Payment</option>
            <option value="Course Access">Course Access</option>
            <option value="Video Issue">Video Issue</option>
            <option value="Live Class">Live Class</option>
            <option value="Test">Test</option>
            <option value="Account">Account</option>
            <option value="Certificate">Certificate</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 text-xs"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Left Ticket List, Right Thread Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredTickets.map(ticket => {
              const isSelected = activeTicket?.id === ticket.id;
              const statusConf = STATUS_COLORS[ticket.status];

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-rose-50/50 border-rose-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-rose-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
                        {CATEGORY_ICONS[ticket.category]}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {ticket.ticketNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 ml-2">
                          • {ticket.category}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                      {ticket.subject}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-600">
                      {mode === 'admin' ? ticket.studentName : (ticket.assignedAgent ? `Agent: ${ticket.assignedAgent}` : 'Unassigned')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-slate-400" /> {ticket.messages.length} replies
                    </span>
                    <span>{ticket.createdAt}</span>
                  </div>
                </div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
                No support tickets found matching criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Detail & Message Thread */}
        <div className="lg:col-span-7">
          {activeTicket ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[640px]">
              
              {/* Ticket Top Bar */}
              <div className="p-5 border-b border-slate-200 bg-slate-50/70 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                        {activeTicket.ticketNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        {CATEGORY_ICONS[activeTicket.category]} {activeTicket.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        activeTicket.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-800'
                          : activeTicket.priority === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {activeTicket.priority} Priority
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mt-1">{activeTicket.subject}</h3>
                    <p className="text-[11px] text-slate-500">
                      Raised by <b>{activeTicket.studentName}</b> ({activeTicket.studentEmail}) on {activeTicket.createdAt}
                      {activeTicket.relatedCourse ? ` • Course: ${activeTicket.relatedCourse}` : ''}
                    </p>
                  </div>

                  {/* Status Progression Selector for Admin */}
                  {mode === 'admin' ? (
                    <div className="space-y-1 text-right shrink-0">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Change Status</label>
                      <select
                        value={activeTicket.status}
                        onChange={e => updateTicketStatus(activeTicket.id, e.target.value as TicketStatus)}
                        className="block px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-300 bg-white shadow-2xs"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  ) : (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_COLORS[activeTicket.status].bg} ${STATUS_COLORS[activeTicket.status].text} ${STATUS_COLORS[activeTicket.status].border}`}>
                      Status: {activeTicket.status}
                    </span>
                  )}
                </div>

                {/* Status progression tracker indicator */}
                <div className="flex items-center gap-2 pt-1">
                  {(['Open', 'In Progress', 'Resolved', 'Closed'] as const).map((step, idx) => {
                    const stepOrder = ['Open', 'In Progress', 'Resolved', 'Closed'];
                    const currentIdx = stepOrder.indexOf(activeTicket.status);
                    const isPassed = currentIdx >= idx;

                    return (
                      <React.Fragment key={step}>
                        <div className={`flex items-center gap-1 text-[10px] font-bold ${
                          isPassed ? 'text-indigo-600' : 'text-slate-400'
                        }`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                            isPassed ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                        {idx < 3 && <div className={`flex-1 h-0.5 ${currentIdx > idx ? 'bg-indigo-500' : 'bg-slate-200'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Messages Thread Container */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {/* Original Description */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" /> {activeTicket.studentName} (Original Query)
                    </span>
                    <span className="text-slate-400">{activeTicket.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {activeTicket.description}
                  </p>
                </div>

                {/* Conversation Replies */}
                {activeTicket.messages.map(msg => {
                  const isStaff = msg.senderRole === 'support' || msg.senderRole === 'admin';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isStaff ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl text-xs space-y-1.5 ${
                          isStaff
                            ? 'bg-indigo-50/80 border border-indigo-200 text-slate-900'
                            : 'bg-slate-900 text-white shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 text-[10px] font-bold">
                          <span className={isStaff ? 'text-indigo-700' : 'text-amber-300'}>
                            {msg.senderName} ({isStaff ? 'Helpdesk Coordinator' : 'Student'})
                          </span>
                          <span className={isStaff ? 'text-slate-400' : 'text-slate-400'}>
                            {msg.createdAt}
                          </span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Reply Composer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                <form onSubmit={handleSendReply} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={
                      mode === 'admin'
                        ? 'Type resolution notes or reply to student...'
                        : 'Reply or provide additional clarification...'
                    }
                    value={replyMessage}
                    onChange={e => setReplyMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
              Select a ticket from the left panel to review message thread and response history.
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: RAISE TICKET (STUDENT) */}
      {/* ========================================================================= */}
      {showRaiseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-rose-600" /> Raise Official Support Ticket
                </h3>
                <p className="text-xs text-slate-500">Submit an inquiry or grievance for priority technical resolution</p>
              </div>
              <button
                onClick={() => setShowRaiseModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRaiseSubmit} className="space-y-4 text-xs">
              {/* Category selector */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Category *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Payment', 'Course Access', 'Video Issue', 'Live Class', 'Test', 'Account', 'Certificate', 'Other'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                        category === cat
                          ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {CATEGORY_ICONS[cat]}
                      <span className="text-center">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Priority Level</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Low">Low (General Query)</option>
                    <option value="Medium">Medium (Regular Issue)</option>
                    <option value="High">High (Impacting Studies)</option>
                    <option value="Urgent">Urgent (Exam/Payment Blocked)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Related Course</label>
                  <select
                    value={relatedCourse}
                    onChange={e => setRelatedCourse(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                    <option value="General Platform">General Platform / Portal</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Subject / Issue Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cannot access lecture notes PDF for Thermodynamics"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe the issue in detail, error messages seen, and what device/browser you are using..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRaiseModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
