import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DoubtItem, DoubtStatus } from '../../types';
import {
  HelpCircle,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  User,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Mic,
  MicOff,
  Video,
  Play,
  Pause,
  Upload,
  UserCheck,
  Filter,
  CheckCircle,
  XCircle,
  ArrowRight,
  Bot,
  Layers,
  Paperclip,
  Share2,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

export const DoubtForum: React.FC = () => {
  const { doubts, submitDoubt, currentUser, courses } = useApp();

  // Submission State
  const [questionText, setQuestionText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Accounting');
  const [courseTitle, setCourseTitle] = useState('CA Foundation Complete Video Course Package');
  const [submissionType, setSubmissionType] = useState<'text' | 'image' | 'pdf' | 'audio'>('text');
  
  // Media attachments
  const [attachedImageUrl, setAttachedImageUrl] = useState('');
  const [attachedPdfName, setAttachedPdfName] = useState('');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordedAudioDuration, setRecordedAudioDuration] = useState('0:42');
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Ask Your Teacher Direct Mode
  const [isAskTeacherMode, setIsAskTeacherMode] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState('CA CS Nitin Sharma');

  // Filtering
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'assigned' | 'answered' | 'closed'>('all');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Available Faculty for "Ask Your Teacher"
  const facultyList = [
    { name: 'CA CS Nitin Sharma', subject: 'Accounting & Principles', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
    { name: 'Er. Rajeshwar Varma', subject: 'Physics & Mechanics', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Dr. Ananya Mukherjee', subject: 'Biology & NCERT Dissection', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80' },
    { name: 'Prof. Neha Singhal', subject: 'Chemistry & Board Booster', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { name: 'S. Vikramaditya', subject: 'UPSC Indian Polity & Ethics', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
  ];

  const handleToggleRecordAudio = () => {
    if (!isRecordingAudio) {
      setIsRecordingAudio(true);
      setTimeout(() => {
        setIsRecordingAudio(false);
        setHasRecordedAudio(true);
      }, 3000);
    } else {
      setIsRecordingAudio(false);
      setHasRecordedAudio(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const chosenFaculty = isAskTeacherMode ? selectedFaculty : undefined;
    const facultyObj = facultyList.find(f => f.name === chosenFaculty);

    submitDoubt(
      selectedSubject,
      courseTitle,
      questionText.trim(),
      attachedImageUrl || undefined,
      {
        submissionType,
        pdfUrl: attachedPdfName ? '#' : undefined,
        pdfName: attachedPdfName || undefined,
        audioUrl: hasRecordedAudio ? 'mock_audio.mp3' : undefined,
        audioDuration: hasRecordedAudio ? recordedAudioDuration : undefined,
        isDirectAskTeacher: isAskTeacherMode,
        assignedFacultyName: chosenFaculty,
        assignedFacultyAvatar: facultyObj?.avatar,
        status: isAskTeacherMode ? 'assigned' : 'pending'
      } as any
    );

    setQuestionText('');
    setAttachedImageUrl('');
    setAttachedPdfName('');
    setHasRecordedAudio(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  const filteredDoubts = doubts.filter((d) => {
    const matchStatus =
      statusFilter === 'all' ||
      d.status === statusFilter ||
      (statusFilter === 'pending' && (d.status === 'unresolved' || d.status === 'pending'));
    const matchSubject = subjectFilter === 'All' || d.subject.toLowerCase().includes(subjectFilter.toLowerCase());
    return matchStatus && matchSubject;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 sm:p-8 rounded-3xl text-white space-y-3 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 bg-purple-400/20 text-purple-300 font-bold px-3 py-1 rounded-full text-xs border border-purple-400/30">
          <Sparkles className="w-3.5 h-3.5" /> 31. Multi-Modal Doubt Solving & 32. Ask Your Teacher
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
          Instant 24/7 Doubt Resolution & Faculty Desk
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Submit tricky numericals, case laws, or conceptual doubts via Text, Image, PDF, or Voice Notes. Get video explanations, verified step proofs, and direct responses from assigned master faculty.
        </p>

        {/* Quick Highlights */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1 text-purple-300">
            <Mic className="w-4 h-4" /> Voice Notes & Audio Doubts
          </span>
          <span className="flex items-center gap-1 text-amber-300">
            <Video className="w-4 h-4" /> Faculty Video Solutions
          </span>
          <span className="flex items-center gap-1 text-emerald-300">
            <UserCheck className="w-4 h-4" /> 1-on-1 "Ask Your Teacher" Desk
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Ask Doubt / Ask Your Teacher Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          
          {/* Toggle: General Doubt vs Ask Your Teacher */}
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
            <button
              id="general-doubt-tab-btn"
              type="button"
              onClick={() => setIsAskTeacherMode(false)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                !isAskTeacherMode ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> General Doubt Forum
            </button>
            <button
              id="ask-teacher-tab-btn"
              type="button"
              onClick={() => setIsAskTeacherMode(true)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                isAskTeacherMode ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Ask Your Teacher 🌟
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* If Ask Teacher Mode: Faculty Selector */}
            {isAskTeacherMode && (
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 animate-fadeIn">
                <label className="block font-bold text-purple-950">
                  Select Assigned Faculty to Direct Question:
                </label>
                <div className="space-y-1.5">
                  {facultyList.map((fac) => (
                    <label
                      key={fac.name}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition ${
                        selectedFaculty === fac.name
                          ? 'bg-white border-purple-500 shadow-xs'
                          : 'bg-purple-50/50 border-purple-200 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faculty"
                        checked={selectedFaculty === fac.name}
                        onChange={() => setSelectedFaculty(fac.name)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <img
                        src={fac.avatar}
                        alt={fac.name}
                        className="w-8 h-8 rounded-full object-cover border border-purple-300"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900 leading-tight">{fac.name}</p>
                        <p className="text-[10px] text-purple-700 truncate">{fac.subject}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-[10px] text-purple-700 italic">
                  ✓ Teacher receives direct push & email notification. Response guaranteed within 12 hours.
                </p>
              </div>
            )}

            {/* Subject & Course */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject *</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Accounting">Accounting</option>
                  <option value="Business Laws">Business Laws</option>
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="Business Economics">Business Economics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Polity">Polity & GS</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Program</label>
                <select
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="CA Foundation Complete Video Course Package">CA Foundation May 2026</option>
                  <option value="Pinnacle JEE Advanced & Main 2026">Pinnacle JEE Advanced</option>
                  <option value="Dr. Visionary NEET UG 2026">Dr. Visionary NEET UG</option>
                  <option value="Samarth IAS - UPSC 2026">Samarth IAS 2026</option>
                </select>
              </div>
            </div>

            {/* Submission Mode Icons */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Choose Submission Format:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'text', label: 'Text / Formula', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                  { id: 'image', label: 'Image Scan', icon: <ImageIcon className="w-3.5 h-3.5" /> },
                  { id: 'pdf', label: 'PDF Document', icon: <FileText className="w-3.5 h-3.5" /> },
                  { id: 'audio', label: 'Voice Note', icon: <Mic className="w-3.5 h-3.5" /> }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSubmissionType(m.id as any)}
                    className={`py-2 px-1 rounded-xl font-bold text-[11px] border cursor-pointer transition flex flex-col items-center gap-1 ${
                      submissionType === m.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Question Details / Formula Description *
              </label>
              <textarea
                rows={4}
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type your question or explain where you are stuck in the problem derivation..."
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            {/* Conditional Multi-Modal Attachment Boxes */}
            {submissionType === 'image' && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block font-bold text-slate-700">Attach Question Photo / Whiteboard Snapshot</label>
                <div className="flex items-center gap-2">
                  {['https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80'].map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAttachedImageUrl(imgUrl)}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                        attachedImageUrl === imgUrl ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      Sample Diagram {i + 1}
                    </button>
                  ))}
                </div>
                {attachedImageUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-indigo-300 max-h-32">
                    <img src={attachedImageUrl} alt="Attachment" className="w-full h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => setAttachedImageUrl('')}
                      className="absolute top-1 right-1 bg-slate-900/80 text-white p-1 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}

            {submissionType === 'pdf' && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block font-bold text-slate-700">Attach Question / Notes PDF</label>
                <div className="flex flex-wrap gap-2">
                  {['BRS_Question_Page_14.pdf', 'Gauss_Law_Numerical_Proof.pdf', 'Contract_Act_Case_Query.pdf'].map((fname) => (
                    <button
                      key={fname}
                      type="button"
                      onClick={() => setAttachedPdfName(fname)}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                        attachedPdfName === fname ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {fname}
                    </button>
                  ))}
                </div>
                {attachedPdfName && (
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Attached: {attachedPdfName}
                  </p>
                )}
              </div>
            )}

            {submissionType === 'audio' && (
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-950">Record Voice Note Query:</span>
                  <span className="font-mono text-xs text-purple-700 font-bold">
                    {isRecordingAudio ? '🔴 Recording (0:15)...' : hasRecordedAudio ? `Audio Ready (${recordedAudioDuration})` : '0:00'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleRecordAudio}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      isRecordingAudio
                        ? 'bg-rose-600 text-white animate-pulse'
                        : hasRecordedAudio
                        ? 'bg-slate-900 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                    }`}
                  >
                    {isRecordingAudio ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isRecordingAudio ? 'Stop Recording' : hasRecordedAudio ? 'Re-record' : 'Start Recording'}</span>
                  </button>

                  {hasRecordedAudio && (
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingAudio ? 'Pause' : 'Play Voice Note'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              id="submit-doubt-query-btn"
              type="submit"
              className={`w-full py-3.5 text-white font-bold rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                isAskTeacherMode
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800'
                  : 'bg-gradient-to-r from-indigo-900 to-slate-900 hover:from-indigo-950 hover:to-slate-950'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isAskTeacherMode ? `Send Question to ${selectedFaculty}` : 'Submit Doubt for Faculty Verification'}</span>
            </button>

            {submittedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Query submitted successfully! Status updated to {isAskTeacherMode ? '"Assigned"' : '"Pending"'}.
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Doubt Stream & Resolution Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Status Filter Tabs (Pending → Assigned → Answered → Closed) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Queries' },
                { id: 'pending', label: '⏳ Pending' },
                { id: 'assigned', label: '📌 Assigned' },
                { id: 'answered', label: '✅ Answered' },
                { id: 'closed', label: '🔒 Closed' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                    statusFilter === st.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className="text-slate-400 text-xs font-medium">
              Showing <span className="font-bold text-slate-900">{filteredDoubts.length}</span> queries
            </div>
          </div>

          {/* Doubt Feed Items */}
          <div className="space-y-4">
            {filteredDoubts.map((dbt) => {
              const currentStatus: DoubtStatus = dbt.status || 'answered';
              return (
                <div
                  key={dbt.id}
                  id={`doubt-card-${dbt.id}`}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-indigo-300 transition duration-200"
                >
                  {/* Doubt Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={dbt.studentAvatar}
                        alt={dbt.studentName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">{dbt.studentName}</h4>
                          {dbt.isDirectAskTeacher && (
                            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                              Ask Your Teacher
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {dbt.subject} • {dbt.courseTitle} • {dbt.createdAt}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge (Pending → Assigned → Answered → Closed) */}
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border flex items-center gap-1 shrink-0 ${
                        currentStatus === 'answered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : currentStatus === 'assigned'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : currentStatus === 'closed'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {currentStatus === 'answered'
                        ? 'Answered ✓'
                        : currentStatus === 'assigned'
                        ? `Assigned (${dbt.assignedFacultyName?.split(' ')[1] || 'Faculty'})`
                        : currentStatus === 'closed'
                        ? 'Closed 🔒'
                        : 'Pending ⏳'}
                    </span>
                  </div>

                  {/* Question Body */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                      {dbt.questionText}
                    </p>

                    {/* Media attachments */}
                    {dbt.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 max-h-48">
                        <img src={dbt.imageUrl} alt="Query diagram" className="w-full h-48 object-cover" />
                      </div>
                    )}

                    {dbt.pdfName && (
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <FileText className="w-4 h-4 text-indigo-600" /> {dbt.pdfName}
                        </span>
                        <button
                          onClick={() => alert(`Opening student attachment: ${dbt.pdfName}`)}
                          className="text-indigo-600 font-bold hover:underline"
                        >
                          View PDF
                        </button>
                      </div>
                    )}

                    {dbt.audioUrl && (
                      <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-purple-900 font-bold">
                          <Mic className="w-4 h-4 text-purple-600" /> Student Voice Note ({dbt.audioDuration || '0:42'})
                        </span>
                        <button
                          onClick={() => alert('Playing student voice note')}
                          className="px-3 py-1 bg-purple-600 text-white rounded-lg font-bold text-[11px] flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" /> Listen
                        </button>
                      </div>
                    )}
                  </div>

                  {/* AI Instant Suggestion Box if pending */}
                  {dbt.aiSuggestion && (
                    <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs space-y-1">
                      <div className="flex items-center gap-1 font-bold text-indigo-950">
                        <Bot className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Instant AI Derivation Assistance:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{dbt.aiSuggestion}</p>
                    </div>
                  )}

                  {/* Faculty Solution Block */}
                  {dbt.facultyReply && (
                    <div className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50/40 rounded-2xl border border-indigo-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={dbt.facultyReply.facultyAvatar}
                            alt={dbt.facultyReply.facultyName}
                            className="w-8 h-8 rounded-full object-cover border border-indigo-300"
                          />
                          <div>
                            <p className="font-bold text-xs text-indigo-950 flex items-center gap-1">
                              {dbt.facultyReply.facultyName}
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Master Faculty Solution • {dbt.facultyReply.repliedAt}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Verified Proof
                        </span>
                      </div>

                      {/* Reply Text */}
                      <p className="text-xs text-slate-800 leading-relaxed font-sans">
                        {dbt.facultyReply.text}
                      </p>

                      {/* Formula Proof Box */}
                      {dbt.facultyReply.formulaOrExplanation && (
                        <div className="p-2.5 bg-white rounded-xl border border-indigo-200 font-mono text-xs text-indigo-900 font-bold shadow-2xs">
                          {dbt.facultyReply.formulaOrExplanation}
                        </div>
                      )}

                      {/* Video Answer Attachment if available */}
                      {dbt.facultyReply.videoAnswerUrl && (
                        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-amber-400" />
                            <span>Faculty Recorded Video Explanation ({dbt.facultyReply.videoDuration || '4:15'})</span>
                          </div>
                          <button
                            onClick={() => alert(`Launching video player: ${dbt.facultyReply?.videoAnswerUrl}`)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Play className="w-3 h-3" /> Watch
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
