import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  Search,
  Check,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';

export const FacultyStudentsAttendanceTab: React.FC = () => {
  const { allUsers, courses, attendanceRecords, recordStudentAttendance } = useApp();

  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-28');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Simulated student attendance state if not already in recordStudentAttendance
  const [localAttendance, setLocalAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    'user-001': 'present',
    'user-002': 'present',
    'user-003': 'late',
    'user-004': 'present',
    'user-005': 'absent'
  });

  const students = (allUsers || []).filter(u => u.role === 'student');

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.targetExam && student.targetExam.toLowerCase().includes(searchTerm.toLowerCase()));

    const status = localAttendance[student.id] || 'present';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setLocalAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));

    if (recordStudentAttendance) {
      recordStudentAttendance('live-001', studentId, status === 'present' || status === 'late', 75);
    }
  };

  const markAll = (status: 'present' | 'absent') => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach(s => {
      updated[s.id] = status;
    });
    setLocalAttendance(updated);
  };

  const presentCount = students.filter(s => (localAttendance[s.id] || 'present') === 'present').length;
  const lateCount = students.filter(s => (localAttendance[s.id] || 'present') === 'late').length;
  const absentCount = students.filter(s => (localAttendance[s.id] || 'present') === 'absent').length;
  const total = students.length || 1;
  const attendanceRate = Math.round(((presentCount + lateCount) / total) * 100);

  return (
    <div className="space-y-5 text-xs">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200">
              Live Attendance Register
            </span>
            <span className="text-slate-500 font-medium">Session-wise & Batch Roster Tracker</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-sans mt-0.5">Students Directory & Live Attendance</h3>
          <p className="text-slate-500 mt-0.5">
            Mark daily lecture attendance, monitor active student participation rates, and export attendance registers for compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => markAll('present')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl transition cursor-pointer"
          >
            Mark All Present
          </button>
          <button
            onClick={() => alert('Attendance register exported as CSV successfully!')}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold rounded-xl transition cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export Register (CSV)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Total Enrolled</span>
          <p className="text-2xl font-black text-slate-900 font-sans">{students.length}</p>
          <span className="text-[11px] text-slate-500">Across Active Batches</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Present Today</span>
          <p className="text-2xl font-black text-emerald-700 font-sans">{presentCount}</p>
          <span className="text-[11px] text-emerald-700 font-semibold">{Math.round((presentCount / total) * 100)}% On-time</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Late Attendees</span>
          <p className="text-2xl font-black text-amber-600 font-sans">{lateCount}</p>
          <span className="text-[11px] text-amber-700 font-semibold">{lateCount} Students joined late</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Overall Attendance Rate</span>
          <p className="text-2xl font-black text-indigo-900 font-sans">{attendanceRate}%</p>
          <span className="text-[11px] text-indigo-700 font-semibold">Active Class Engagement</span>
        </div>
      </div>

      {/* Controls: Search, Batch, Date Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name, email, roll number..."
            className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="present">Present Only</option>
            <option value="late">Late Only</option>
            <option value="absent">Absent Only</option>
          </select>
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Student</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Target Exam</th>
                <th className="p-4">Enrolled Batches</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Mark Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const status = localAttendance[student.id] || 'present';
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{student.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {student.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-mono">{student.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-900 font-bold rounded-md text-[10px]">
                        {student.targetExam || 'General Prep'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 font-semibold">
                      {student.enrolledCourseIds?.length || 1} Batch{(student.enrolledCourseIds?.length || 1) > 1 ? 'es' : ''}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1 ${
                          status === 'present'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : status === 'late'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {status === 'present' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {status === 'late' && <Clock className="w-3 h-3 text-amber-600" />}
                        {status === 'absent' && <XCircle className="w-3 h-3 text-rose-600" />}
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleMarkAttendance(student.id, 'present')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                            status === 'present'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          Present
                        </button>

                        <button
                          onClick={() => handleMarkAttendance(student.id, 'late')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                            status === 'late'
                              ? 'bg-amber-500 text-slate-950 shadow-2xs'
                              : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700'
                          }`}
                        >
                          Late
                        </button>

                        <button
                          onClick={() => handleMarkAttendance(student.id, 'absent')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                            status === 'absent'
                              ? 'bg-rose-600 text-white shadow-2xs'
                              : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
