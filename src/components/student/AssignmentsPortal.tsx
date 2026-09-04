import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssignmentItem } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  Download,
  Award,
  AlertCircle,
  FileCheck,
  Paperclip,
  Send,
  Eye,
  Calendar,
  Sparkles,
  MessageSquareQuote,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export const AssignmentsPortal: React.FC = () => {
  const { assignments, submitAssignment, currentUser } = useApp();
  const [selectedAsn, setSelectedAsn] = useState<AssignmentItem | null>(null);
  const [submissionFileName, setSubmissionFileName] = useState('Aarav_Sharma_Solution_Doc.pdf');
  const [fileType, setFileType] = useState('PDF Document');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const filteredAssignments = assignments.filter((asn) => {
    if (activeTab === 'all') return true;
    return asn.submissionStatus === activeTab;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsn) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(selectedAsn.id, submissionFileName, notes);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedAsn(null);
        setNotes('');
      }, 1800);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white space-y-3 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 font-bold px-3 py-1 rounded-full text-xs border border-emerald-400/30">
          <Sparkles className="w-3.5 h-3.5" /> 30. Subjective Assignment & DPP Evaluation System
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
          Daily Practice Problems (DPP) & Subjective Case Studies
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Submit hand-solved proofs, analytical essays, and numerical working sheets. Get line-by-line faculty annotations, scores, and model answers.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> 1-on-1 Faculty Grading
          </span>
          <span className="flex items-center gap-1 text-amber-300">
            <Award className="w-4 h-4" /> Detailed Rubric Marks
          </span>
          <span className="flex items-center gap-1 text-cyan-300">
            <FileText className="w-4 h-4" /> Download Question Briefs
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Assignments' },
            { id: 'pending', label: '⏳ Pending Action' },
            { id: 'submitted', label: '📤 Under Evaluation' },
            { id: 'graded', label: '🏆 Graded & Evaluated' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-slate-400 text-xs font-medium">
          Total: <span className="text-slate-900 font-bold">{filteredAssignments.length}</span> Assignments
        </div>
      </div>

      {/* Grid of assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((asn) => (
          <div
            key={asn.id}
            id={`assignment-card-${asn.id}`}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-indigo-300 transition duration-200 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header row */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full border border-indigo-100">
                  {asn.subject} • {asn.courseTitle}
                </span>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
                    asn.submissionStatus === 'graded'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : asn.submissionStatus === 'submitted'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {asn.submissionStatus === 'graded' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Graded & Evaluated
                    </>
                  ) : asn.submissionStatus === 'submitted' ? (
                    <>
                      <Clock className="w-3 h-3 text-blue-600" /> Under Evaluation
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-amber-600" /> Pending Submission
                    </>
                  )}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-base text-slate-900 font-serif leading-snug">{asn.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{asn.description}</p>

              {/* Assignment Meta */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline: {asn.dueDate}
                  </span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                    Max Marks: {asn.totalPoints}
                  </span>
                </div>

                {asn.attachmentName && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                    <span className="flex items-center gap-1 text-slate-500 font-medium truncate">
                      <Paperclip className="w-3 h-3 text-indigo-500" /> {asn.attachmentName}
                    </span>
                    <button
                      onClick={() => alert(`Opening Question Sheet: ${asn.attachmentName}`)}
                      className="text-indigo-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <Download className="w-3 h-3" /> Download Sheet
                    </button>
                  </div>
                )}
              </div>

              {/* Student Submission Record if exists */}
              {asn.studentSubmission && (
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    asn.submissionStatus === 'graded'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-indigo-700" />
                      Submitted: {asn.studentSubmission.fileName}
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {asn.studentSubmission.submittedAt}
                    </span>
                  </div>

                  {asn.studentSubmission.notes && (
                    <p className="text-slate-600 text-[11px] bg-white/70 p-2 rounded-xl border border-slate-100">
                      <strong>Student Note:</strong> {asn.studentSubmission.notes}
                    </p>
                  )}

                  {asn.submissionStatus === 'graded' && asn.studentSubmission.score !== undefined && (
                    <div className="pt-2 border-t border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-900">Score Awarded:</span>
                        <span className="text-sm font-extrabold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                          {asn.studentSubmission.score} / {asn.totalPoints} Marks ({Math.round((asn.studentSubmission.score / asn.totalPoints) * 100)}%)
                        </span>
                      </div>
                      {asn.studentSubmission.facultyFeedback && (
                        <div className="p-2.5 bg-white/90 rounded-xl border border-emerald-100 text-[11px] text-slate-700 space-y-0.5">
                          <p className="font-bold text-emerald-900 flex items-center gap-1">
                            <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-600" /> Faculty Remark:
                          </p>
                          <p className="italic">{asn.studentSubmission.facultyFeedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                id={`download-problem-btn-${asn.id}`}
                onClick={() => alert(`Downloading question brief: ${asn.attachmentName}`)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Problem PDF
              </button>

              {asn.submissionStatus === 'pending' ? (
                <button
                  id={`submit-answer-btn-${asn.id}`}
                  onClick={() => setSelectedAsn(asn)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload & Submit Answer
                </button>
              ) : (
                <button
                  id={`resubmit-answer-btn-${asn.id}`}
                  onClick={() => setSelectedAsn(asn)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> {asn.submissionStatus === 'graded' ? 'View Details' : 'Update Submission'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal Dialog */}
      {selectedAsn && (
        <div
          id="assignment-submission-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn"
        >
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {selectedAsn.subject}
                </span>
                <h3 className="font-bold text-base text-slate-900 font-serif mt-1">{selectedAsn.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAsn(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Select Solution Document / Scan (PDF / Image / Doc) *</label>
                <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-5 rounded-2xl text-center space-y-2">
                  <Upload className="w-8 h-8 text-indigo-600 mx-auto" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800">
                      {submissionFileName || 'Click to select solution file'}
                    </p>
                    <p className="text-[11px] text-slate-500">Supports PDF, PNG, JPG, or DOCX (Max 25 MB)</p>
                  </div>
                  <div className="flex justify-center gap-2 pt-2">
                    {['Aarav_Sharma_Handwritten_Proof.pdf', 'Aarav_Sharma_Math_Derivation.pdf', 'Aarav_Sharma_Accounts_BRS.pdf'].map((fname) => (
                      <button
                        key={fname}
                        type="button"
                        onClick={() => setSubmissionFileName(fname)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border cursor-pointer ${
                          submissionFileName === fname
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {fname}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Add Submission Note / Working Steps (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain any assumptions made or specific question numbers solved..."
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  Submitted papers are assigned to faculty lead within 24 hours for evaluation and marks release.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedAsn(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="confirm-submit-assignment-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Uploading Answer...</span>
                  ) : isSuccess ? (
                    <span className="flex items-center gap-1 text-emerald-200">
                      <CheckCircle2 className="w-4 h-4" /> Submitted Successfully!
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit for Evaluation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
