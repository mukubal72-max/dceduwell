import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  Users,
  Target,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  ChevronRight,
  Filter,
  Sparkles,
  Flame
} from 'lucide-react';

export const FacultyPerformanceTab: React.FC = () => {
  const { testResults, allUsers, testSeries, courses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTestFilter, setSelectedTestFilter] = useState('all');

  // Simulated student performance leaderboard
  const studentLeaderboard = [
    {
      id: 'usr-101',
      name: 'Aditya Sharma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rank: 1,
      totalScore: 288,
      maxScore: 300,
      percentile: 99.8,
      accuracy: 94.2,
      testsAttempted: 14,
      attendanceRate: 98,
      strongTopics: ['Mechanics', 'Electrostatics', 'Calculus'],
      weakTopics: ['Organic Conversions']
    },
    {
      id: 'usr-102',
      name: 'Priya Narang',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rank: 2,
      totalScore: 276,
      maxScore: 300,
      percentile: 99.4,
      accuracy: 92.0,
      testsAttempted: 12,
      attendanceRate: 95,
      strongTopics: ['Human Physiology', 'Genetics', 'Organic Chemistry'],
      weakTopics: ['Thermodynamics']
    },
    {
      id: 'usr-103',
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      rank: 3,
      totalScore: 264,
      maxScore: 300,
      percentile: 98.6,
      accuracy: 89.5,
      testsAttempted: 15,
      attendanceRate: 92,
      strongTopics: ['Financial Accounting', 'Corporate Law'],
      weakTopics: ['Taxation Provisions']
    },
    {
      id: 'usr-104',
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rank: 4,
      totalScore: 248,
      maxScore: 300,
      percentile: 96.8,
      accuracy: 86.4,
      testsAttempted: 11,
      attendanceRate: 88,
      strongTopics: ['General Studies Paper 1', 'Indian Polity'],
      weakTopics: ['CSAT Data Interpretation']
    },
    {
      id: 'usr-105',
      name: 'Vikram Joshi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rank: 5,
      totalScore: 195,
      maxScore: 300,
      percentile: 88.2,
      accuracy: 74.5,
      testsAttempted: 8,
      attendanceRate: 72,
      strongTopics: ['Inorganic Chemistry'],
      weakTopics: ['Rotational Dynamics', 'Complex Numbers']
    }
  ];

  const filteredLeaderboard = studentLeaderboard.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.strongTopics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-900 px-2.5 py-0.5 rounded border border-purple-200">
              Student Performance Center
            </span>
            <span className="text-slate-500 font-medium">Class Ranks, Percentiles & Score Analytics</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-sans mt-0.5">Batch Academic Analytics & Scorecards</h3>
          <p className="text-slate-500 mt-0.5">
            Evaluate individual student strengths, test completion rates, speed vs accuracy trends, and identify learners requiring academic intervention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
            Batch Average: 84.6% Accuracy
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Average Test Score</span>
          <p className="text-2xl font-black text-slate-900 font-sans">254 / 300</p>
          <span className="text-[11px] text-emerald-600 font-semibold">+6.2% vs last assessment</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Highest Score in Batch</span>
          <p className="text-2xl font-black text-purple-900 font-sans">288 / 300</p>
          <span className="text-[11px] text-purple-700 font-semibold">99.8th Percentile (AIR 1 Tier)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Test Submissions</span>
          <p className="text-2xl font-black text-indigo-900 font-sans">
            {testResults?.length ? testResults.length : 142}
          </p>
          <span className="text-[11px] text-indigo-700 font-semibold">92.4% Submission Turnout</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">At-Risk Learners</span>
          <p className="text-2xl font-black text-rose-600 font-sans">4 Students</p>
          <span className="text-[11px] text-rose-600 font-semibold">Flagged for extra doubt rooms</span>
        </div>
      </div>

      {/* Topic Mastery Radar Strip */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <h4 className="font-bold text-sm text-slate-900 font-sans">Batch Topic Mastery & High-Yield Accuracy</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1.5">
            <div className="flex items-center justify-between text-emerald-950 font-bold">
              <span>Mechanics & Laws of Motion</span>
              <span>92% Accuracy</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '92%' }} />
            </div>
            <span className="text-[10px] text-emerald-700">Top strong topic across batch</span>
          </div>

          <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1.5">
            <div className="flex items-center justify-between text-indigo-950 font-bold">
              <span>Electrostatics & Magnetism</span>
              <span>86% Accuracy</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '86%' }} />
            </div>
            <span className="text-[10px] text-indigo-700">Well prepared, steady speed</span>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-1.5">
            <div className="flex items-center justify-between text-amber-950 font-bold">
              <span>Rotational Dynamics & Inertia</span>
              <span>64% Accuracy</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2">
              <div className="bg-amber-600 h-2 rounded-full" style={{ width: '64%' }} />
            </div>
            <span className="text-[10px] text-amber-800">Requires dedicated revision drill</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900 font-sans">Batch Rank Leaderboard</h4>
            <p className="text-slate-500 text-[11px]">Ranked by cumulative test scores, accuracy, and attendance.</p>
          </div>

          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or topic..."
              className="p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Rank</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Latest Score</th>
                <th className="p-3">Percentile</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Strengths</th>
                <th className="p-3 text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeaderboard.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <span
                      className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-black text-[11px] ${
                        st.rank === 1
                          ? 'bg-amber-400 text-amber-950 shadow-xs'
                          : st.rank === 2
                          ? 'bg-slate-300 text-slate-900'
                          : st.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {st.rank}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={st.avatar} alt={st.name} className="w-7 h-7 rounded-full object-cover border" />
                      <span className="font-bold text-slate-900">{st.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-slate-900">
                    {st.totalScore} <span className="text-slate-400 font-normal">/ {st.maxScore}</span>
                  </td>
                  <td className="p-3 font-bold text-purple-900">{st.percentile}%ile</td>
                  <td className="p-3 font-bold text-emerald-700">{st.accuracy}%</td>
                  <td className="p-3 text-slate-700 font-semibold">{st.attendanceRate}%</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {st.strongTopics.slice(0, 2).map((top, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-indigo-50 text-indigo-900 px-1.5 py-0.5 rounded">
                          {top}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => alert(`Personalized revision feedback sent to ${st.name}!`)}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold rounded-lg transition cursor-pointer text-[10px]"
                    >
                      Send Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
