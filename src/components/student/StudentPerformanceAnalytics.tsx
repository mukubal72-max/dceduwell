import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  Target,
  Zap
} from 'lucide-react';

export const StudentPerformanceAnalytics: React.FC = () => {
  const { testResults, testSeries, setActiveTest, setActiveTestResult } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ca' | 'jee' | 'neet'>('all');

  // Specific Subject Performance Data as specified in requirements
  const subjectPerformanceList = [
    { subject: 'Accounts', scorePercent: 82, accuracy: 88, questionsAttempted: 145, testsCount: 4, color: 'bg-emerald-500', lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { subject: 'Law', scorePercent: 71, accuracy: 78, questionsAttempted: 110, testsCount: 3, color: 'bg-amber-500', lightColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { subject: 'Economics', scorePercent: 88, accuracy: 92, questionsAttempted: 160, testsCount: 5, color: 'bg-indigo-500', lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { subject: 'Quantitative Aptitude', scorePercent: 84, accuracy: 86, questionsAttempted: 130, testsCount: 4, color: 'bg-purple-500', lightColor: 'bg-purple-50 text-purple-700 border-purple-200' },
    { subject: 'Physics', scorePercent: 85, accuracy: 89, questionsAttempted: 180, testsCount: 5, color: 'bg-cyan-500', lightColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { subject: 'Chemistry', scorePercent: 91, accuracy: 94, questionsAttempted: 195, testsCount: 6, color: 'bg-teal-500', lightColor: 'bg-teal-50 text-teal-700 border-teal-200' },
    { subject: 'Mathematics', scorePercent: 78, accuracy: 82, questionsAttempted: 140, testsCount: 4, color: 'bg-blue-500', lightColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  ];

  // Strong and Weak Topics
  const strongTopics = [
    { name: 'Bank Reconciliation Statement', subject: 'Accounts', accuracy: 94, tests: 3, mastery: 'Mastered' },
    { name: 'Doctrine of Corporate Veil', subject: 'Law', accuracy: 90, tests: 2, mastery: 'Mastered' },
    { name: 'Demand & Supply Elasticity', subject: 'Economics', accuracy: 92, tests: 4, mastery: 'Mastered' },
    { name: 'Thermodynamics & Gibbs Free Energy', subject: 'Chemistry', accuracy: 95, tests: 5, mastery: 'Mastered' },
    { name: 'Electrostatics & Conductor Potentials', subject: 'Physics', accuracy: 91, tests: 4, mastery: 'Mastered' },
    { name: 'Standard Indefinite Integrals', subject: 'Mathematics', accuracy: 88, tests: 3, mastery: 'Mastered' },
  ];

  const weakTopics = [
    { name: 'Partnership Accounts: Goodwill Adjustment', subject: 'Accounts', accuracy: 58, tests: 2, recommendation: 'Revise Module 3 Lecture 4 + Solve DPP 08' },
    { name: 'Sale of Goods Act: Unpaid Seller Rights', subject: 'Law', accuracy: 62, tests: 2, recommendation: 'Review Case Laws PDF & Attempt 15 Practice Qs' },
    { name: 'National Income Keynesian Multipliers', subject: 'Economics', accuracy: 65, tests: 3, recommendation: 'Watch Macroeconomics Fastrack Revision' },
    { name: 'Rotational Dynamics & Moment of Inertia', subject: 'Physics', accuracy: 60, tests: 4, recommendation: 'Practice Kota DPP Series Level 2' },
    { name: 'Ionic Equilibrium & Buffer Solutions', subject: 'Chemistry', accuracy: 64, tests: 3, recommendation: 'Consult Faculty Doubt Room' }
  ];

  // Overall calculations across recorded test results
  const results = testResults && testResults.length > 0 ? testResults : [];
  const scores = results.map(r => r.percentage);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 84;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 90;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 74;
  const avgAccuracy = results.length > 0 ? Math.round(results.reduce((a, b) => a + (b.accuracy || 80), 0) / results.length) : 83;
  const totalTimeSpentMinutes = results.length > 0 ? Math.round(results.reduce((a, b) => a + (b.timeSpentSeconds || 1800), 0) / 60) : 130;
  const avgTimePerTest = results.length > 0 ? Math.round(totalTimeSpentMinutes / results.length) : 28;

  // Rank progression history milestones
  const rankProgression = [
    { testName: 'All India Baseline Mock #01', date: 'Jan 15, 2026', rank: 124, total: 3100, percentile: 96.0, score: '76%' },
    { testName: 'CA Accounts BRS Chapter Test', date: 'Jan 28, 2026', rank: 78, total: 2890, percentile: 97.3, score: '82%' },
    { testName: 'CA Business Laws Subject Simulation', date: 'Feb 10, 2026', rank: 54, total: 3400, percentile: 98.4, score: '86%' },
    { testName: 'JEE Advanced Major Simulation #01', date: 'Feb 25, 2026', rank: 18, total: 4120, percentile: 99.4, score: '90%' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#1E293B] text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200 space-y-2 relative overflow-hidden">
        <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-400/20">
          Academic Analytics & Diagnostic Suite
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-sans">Student Performance & Topic Mastery</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Granular subject-wise analysis, topic-level strengths/weaknesses, national percentile trajectory, and step-by-step test solutions.
        </p>

        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <BarChart3 className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* 1. OVERALL METRICS BENTO */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Average Score</span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-950 font-serif">{avgScore}%</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +6% this month
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Highest Score</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-serif">{highestScore}%</div>
          <span className="text-[10px] text-slate-400">AIR 18 Qualifier</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Lowest Score</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-700 font-serif">{lowestScore}%</div>
          <span className="text-[10px] text-slate-400">Baseline Attempt</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Test Accuracy</span>
          <div className="text-2xl sm:text-3xl font-black text-teal-600 font-serif">{avgAccuracy}%</div>
          <span className="text-[10px] text-teal-700 font-semibold">High Precision</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Average Time</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-950 font-serif">{avgTimePerTest} <span className="text-xs font-sans text-slate-400">min</span></div>
          <span className="text-[10px] text-purple-600 font-semibold">Fast Solving</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Best AIR Rank</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-serif">AIR 18</div>
          <span className="text-[10px] text-amber-700 font-bold">Top 0.5% in India</span>
        </div>
      </div>

      {/* 2. SUBJECT PERFORMANCE SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-sans">Subject Performance Breakdown</h3>
            <p className="text-xs text-slate-500">Benchmarked against national topper averages and qualification thresholds</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter Domain:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${selectedCategory === 'all' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedCategory('ca')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${selectedCategory === 'ca' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                CA & Commerce
              </button>
              <button
                onClick={() => setSelectedCategory('jee')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${selectedCategory === 'jee' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Engineering / Medical
              </button>
            </div>
          </div>
        </div>

        {/* Visual Progress Bars for Subjects (Accounts 82%, Law 71%, Economics 88%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjectPerformanceList
            .filter((s) => {
              if (selectedCategory === 'ca') return ['Accounts', 'Law', 'Economics', 'Quantitative Aptitude'].includes(s.subject);
              if (selectedCategory === 'jee') return ['Physics', 'Chemistry', 'Mathematics'].includes(s.subject);
              return true;
            })
            .map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-800 shadow-xs">
                      {item.subject.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.subject}</h4>
                      <p className="text-[11px] text-slate-500">{item.testsCount} Mock Tests • {item.questionsAttempted} Questions</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 font-serif">{item.scorePercent}%</span>
                    <span className="block text-[10px] font-bold text-emerald-600">{item.accuracy}% Accuracy</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.scorePercent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Passing: 40%</span>
                    <span>National Average: 64%</span>
                    <span className="text-slate-700 font-bold">Your Score: {item.scorePercent}%</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 3. CHAPTER & TOPIC PERFORMANCE (STRONG & WEAK TOPICS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strong Topics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Strong Topics</h3>
                <p className="text-[11px] text-slate-500">Mastery ≥ 85% Accuracy across tests</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              {strongTopics.length} Topics
            </span>
          </div>

          <div className="space-y-3">
            {strongTopics.map((topic, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{topic.name}</span>
                    <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      {topic.subject}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{topic.tests} Full Mock Appearances</p>
                </div>

                <div className="text-right">
                  <span className="font-black text-emerald-700 text-sm">{topic.accuracy}%</span>
                  <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-wider">✓ {topic.mastery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics with Revision Recommendations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Weak Topics (Target Areas)</h3>
                <p className="text-[11px] text-slate-500">Requires targeted drills & concept review</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
              {weakTopics.length} Focus Topics
            </span>
          </div>

          <div className="space-y-3">
            {weakTopics.map((topic, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/70 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{topic.name}</span>
                    <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      {topic.subject}
                    </span>
                  </div>
                  <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                    {topic.accuracy}% Accuracy
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span><strong>Action:</strong> {topic.recommendation}</span>
                  </div>
                  <button
                    onClick={() => {
                      const matched = testSeries.find(t => t.subjectName?.toLowerCase().includes(topic.subject.toLowerCase()));
                      if (matched) setActiveTest(matched);
                    }}
                    className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-lg transition cursor-pointer shrink-0 ml-2"
                  >
                    Practice Topic
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. ALL-INDIA RANK (AIR) & TEST PROGRESSION HISTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-sans">Rank Progress & Examination History</h3>
            <p className="text-xs text-slate-500">Live trajectory across all simulated national CBT examinations</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Rank Progression: AIR 124 ➔ AIR 18</span>
          </div>
        </div>

        {/* Milestone Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rankProgression.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{item.date}</span>
                <span className="font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {item.score}
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.testName}</h4>
              <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <span className="text-lg font-black text-slate-900 font-serif">AIR {item.rank}</span>
                  <span className="text-[10px] text-slate-400 block">of {item.total.toLocaleString()}</span>
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                  {item.percentile}%ile
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Attempted Test Results Ledger */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Attempted Test History & Solution Keys</h4>
          
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {results.map((res, idx) => (
              <div key={res.id || idx} className="p-4 bg-white hover:bg-slate-50/80 transition flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{res.testTitle}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Attempted on {res.attemptDate} • Time: {Math.round(res.timeSpentSeconds / 60)} mins • {res.accuracy}% Accuracy
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-black text-indigo-950 text-sm">
                      {res.totalScore} / {res.maxScore} ({res.percentage}%)
                    </span>
                    <span className="block text-[11px] text-amber-600 font-bold">AIR {res.airRank} ({res.percentile}%ile)</span>
                  </div>

                  <button
                    onClick={() => {
                      const matched = testSeries.find(t => t.id === res.testId) || testSeries[0];
                      if (matched) {
                        setActiveTest(matched);
                        setActiveTestResult(res);
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <span>View Solution Key</span> <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
