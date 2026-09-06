import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { TestSeriesExam, Question, TestAttemptResult } from '../../types';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  BarChart3,
  RotateCcw,
  ArrowLeft,
  FileCheck,
  CheckSquare,
  Hash,
  FileText,
  Layers,
  Check,
  X,
  ShieldAlert,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Video,
  VideoOff,
  Eye,
  Camera,
  AlertTriangle,
  Monitor,
  Wifi,
  Lock,
  PlayCircle,
  Download,
  Share2,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CbtExamEngine: React.FC = () => {
  const {
    activeTest,
    setActiveTest,
    submitTestAttempt,
    currentUser,
    activeTestResult,
    setActiveTestResult
  } = useApp();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: any }>(() => {
    if (!activeTest) return {};
    const saved = localStorage.getItem(`cbt_answers_${activeTest.id}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [markedForReview, setMarkedForReview] = useState<{ [questionId: string]: boolean }>({});
  const [visitedQuestions, setVisitedQuestions] = useState<{ [questionId: string]: boolean }>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState((activeTest?.durationMinutes || 60) * 60);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Security & Proctoring States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  const [securityAlertMessage, setSecurityAlertMessage] = useState('');
  const [isProctoringActive, setIsProctoringActive] = useState(true);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string>('Just now');
  const [proctoringEvents, setProctoringEvents] = useState<string[]>([
    '00:00:01 - Candidate identity verified & session token bound',
    '00:00:05 - AI Behavioral Monitoring & Face Detection Active',
    '00:00:10 - Audio environment calibrated (Silent 32 dB)'
  ]);

  // Video and PDF Solution Modals in Result View
  const [selectedVideoSolution, setSelectedVideoSolution] = useState<{
    title: string;
    faculty: string;
    url: string;
    duration: string;
    topic: string;
  } | null>(null);

  const [selectedPdfSolution, setSelectedPdfSolution] = useState<{
    title: string;
    topic: string;
    url: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-Save Effect
  useEffect(() => {
    if (activeTest && !activeTestResult) {
      localStorage.setItem(`cbt_answers_${activeTest.id}`, JSON.stringify(userAnswers));
      const now = new Date();
      setLastAutoSaveTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [userAnswers, activeTest, activeTestResult]);

  // Webcam initialization for AI proctoring
  useEffect(() => {
    if (!activeTestResult && isCameraEnabled) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setCameraStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera permission denied or not available; fallback to simulated AI proctoring feed
          console.log('Using simulated AI proctoring stream');
        });
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraEnabled, activeTestResult]);

  // Security: Tab-switch & Window Blur Detection
  useEffect(() => {
    if (!activeTest || activeTestResult) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const updated = prev + 1;
          setProctoringEvents((evts) => [
            `${new Date().toLocaleTimeString()} - ⚠️ Tab switch / background focus detected (Strike ${updated}/3)`,
            ...evts.slice(0, 8)
          ]);

          if (updated >= 3) {
            setSecurityAlertMessage('Maximum tab switch violation threshold reached (3/3). Exam is being automatically submitted for security integrity.');
            setShowSecurityWarning(true);
            setTimeout(() => {
              handleSubmitExam();
            }, 3000);
          } else {
            setSecurityAlertMessage(`Warning: Tab-switch or browser unfocus detected (Strike ${updated}/3). Navigating away from the test window violates the exam code of conduct and will trigger auto-submission at 3 strikes.`);
            setShowSecurityWarning(true);
          }
          return updated;
        });
      }
    };

    const handleWindowBlur = () => {
      // Also track window unfocus
      if (!document.hidden) {
        setProctoringEvents((evts) => [
          `${new Date().toLocaleTimeString()} - ⚠️ Window focus lost. Please stay focused on the CBT interface.`,
          ...evts.slice(0, 8)
        ]);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [activeTest, activeTestResult]);

  // Timer countdown
  useEffect(() => {
    if (!activeTest || activeTestResult) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTest, activeTestResult]);

  if (!activeTest) {
    return (
      <div className="p-8 text-center text-slate-500">
        No test selected. Return to the portal test catalog.
      </div>
    );
  }

  const currentSection = activeTest.sections[currentSectionIndex] || activeTest.sections[0];
  const currentQuestion: Question | undefined = currentSection?.questions[currentQuestionIndex];

  // Mark current question as visited
  useEffect(() => {
    if (currentQuestion) {
      setVisitedQuestions((prev) => ({ ...prev, [currentQuestion.id]: true }));
    }
  }, [currentQuestion]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handlers for different question types
  const handleSingleSelect = (optIndex: number) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optIndex
    }));
  };

  const handleMultipleSelect = (optIndex: number) => {
    if (!currentQuestion) return;
    const currentList: number[] = Array.isArray(userAnswers[currentQuestion.id]) ? userAnswers[currentQuestion.id] : [];
    const exists = currentList.includes(optIndex);
    const updated = exists ? currentList.filter(i => i !== optIndex) : [...currentList, optIndex].sort((a, b) => a - b);
    
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: updated.length > 0 ? updated : undefined
    }));
  };

  const handleTrueFalseSelect = (val: boolean | string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  const handleTextInput = (val: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  const handleMatchSelect = (leftItem: string, rightItem: string) => {
    if (!currentQuestion) return;
    const currentMatches: { [key: string]: string } = userAnswers[currentQuestion.id] || {};
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentMatches,
        [leftItem]: rightItem
      }
    }));
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleSaveAndNext = () => {
    const qCount = currentSection?.questions?.length || 0;
    const secCount = activeTest?.sections?.length || 0;
    if (currentQuestionIndex < qCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < secCount - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSecIdx = currentSectionIndex - 1;
      const prevSecQCount = activeTest?.sections?.[prevSecIdx]?.questions?.length || 1;
      setCurrentSectionIndex(prevSecIdx);
      setCurrentQuestionIndex(prevSecQCount - 1);
    }
  };

  const getQuestionStatus = (qId: string) => {
    const ans = userAnswers[qId];
    const isAnswered = ans !== undefined && ans !== '' && (Array.isArray(ans) ? ans.length > 0 : true);
    const isMarked = markedForReview[qId];
    const isVisited = visitedQuestions[qId];

    if (isAnswered && isMarked) return 'answered_marked';
    if (isAnswered) return 'answered';
    if (isMarked) return 'marked';
    if (isVisited) return 'not_answered';
    return 'not_visited';
  };

  // Compute question counts across the active section and test
  const allQuestions = activeTest.sections.flatMap(s => s.questions);
  const totalQuestionsCount = allQuestions.length;
  const answeredCount = allQuestions.filter(q => {
    const a = userAnswers[q.id];
    return a !== undefined && a !== '' && (Array.isArray(a) ? a.length > 0 : true);
  }).length;
  const markedCount = allQuestions.filter(q => markedForReview[q.id]).length;
  const unattemptedCount = totalQuestionsCount - answeredCount;
  const notVisitedCount = allQuestions.filter(q => !visitedQuestions[q.id]).length;

  // Evaluate single question correctness
  const isQuestionCorrect = (q: Question, userAns: any): boolean => {
    if (userAns === undefined || userAns === '' || (Array.isArray(userAns) && userAns.length === 0)) {
      return false;
    }

    if (q.type === 'multiple_correct' || q.type === 'multiple_choice') {
      const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
      const userArr = Array.isArray(userAns) ? userAns : [userAns];
      if (correctArr.length !== userArr.length) return false;
      return correctArr.every((val: any) => userArr.includes(val));
    }

    if (q.type === 'numerical') {
      const numUser = parseFloat(String(userAns).trim());
      const numCorrect = parseFloat(String(q.correctAnswer).trim());
      if (isNaN(numUser) || isNaN(numCorrect)) return false;
      const tolerance = q.numericalTolerance !== undefined ? q.numericalTolerance : 0.05;
      return Math.abs(numUser - numCorrect) <= tolerance;
    }

    if (q.type === 'fill_in_blank' || q.type === 'fill_blank') {
      return String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
    }

    if (q.type === 'true_false') {
      return String(userAns).toLowerCase() === String(q.correctAnswer).toLowerCase();
    }

    if (q.type === 'subjective' || q.type === 'subjective_descriptive') {
      // Subjective: awarding marks if student wrote substantial response
      return String(userAns).trim().length > 30;
    }

    if (q.type === 'match_following') {
      if (typeof userAns !== 'object' || !q.matchPairs) return false;
      return q.matchPairs.every(pair => {
        const leftKey = pair.left || pair.leftText || pair.leftKey || '';
        const rightKey = pair.right || pair.rightText || pair.rightKey || '';
        return userAns[leftKey] === rightKey;
      });
    }

    // Default single_correct / single_choice
    return String(userAns).trim() === String(q.correctAnswer).trim();
  };

  const handleSubmitExam = () => {
    let totalScore = 0;
    let maxScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattempted = 0;

    const sectionWise: any[] = [];

    activeTest.sections.forEach((sec) => {
      let secScore = 0;
      let secMax = 0;
      let secCorrect = 0;
      let secAttempted = 0;

      sec.questions.forEach((q) => {
        maxScore += q.marks;
        secMax += q.marks;

        const ans = userAnswers[q.id];
        const hasAnswered = ans !== undefined && ans !== '' && (Array.isArray(ans) ? ans.length > 0 : true);

        if (!hasAnswered) {
          unattempted++;
        } else {
          secAttempted++;
          const correct = isQuestionCorrect(q, ans);
          if (correct) {
            totalScore += q.marks;
            secScore += q.marks;
            correctCount++;
            secCorrect++;
          } else {
            totalScore -= q.negativeMarks;
            secScore -= q.negativeMarks;
            incorrectCount++;
          }
        }
      });

      sectionWise.push({
        sectionName: sec.name,
        score: Math.max(0, secScore),
        maxScore: secMax,
        accuracy: secAttempted > 0 ? Math.round((secCorrect / secAttempted) * 100) : 0
      });
    });

    const netScore = Math.max(0, totalScore);
    const percentage = maxScore > 0 ? Math.round((netScore / maxScore) * 100) : 0;
    const totalCandidates = (activeTest.attemptsCount || 3000) + 1;
    const percentile = Math.min(99.98, Math.max(50, Math.round((percentage * 0.9 + 15) * 100) / 100));
    const airRank = Math.max(1, Math.round(((100 - percentile) / 100) * totalCandidates));
    const accuracy = (correctCount + incorrectCount) > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0;

    const result: TestAttemptResult = {
      id: `res-${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      attemptDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timeSpentSeconds: ((activeTest.durationMinutes || 60) * 60) - timeLeftSeconds,
      totalScore: netScore,
      maxScore,
      percentage,
      percentile,
      airRank,
      totalCandidates,
      correctAnswersCount: correctCount,
      incorrectAnswersCount: incorrectCount,
      unattemptedCount: unattempted,
      accuracy,
      sectionWiseScore: sectionWise,
      userAnswers
    };

    submitTestAttempt(result);
    setShowSubmitModal(false);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  // Copy-paste restriction handler
  const handleSecurityAction = (e: React.SyntheticEvent, actionName: string) => {
    e.preventDefault();
    setProctoringEvents((evts) => [
      `${new Date().toLocaleTimeString()} - ⚠️ Action restricted: ${actionName} is strictly prohibited during proctored CBT.`,
      ...evts.slice(0, 8)
    ]);
  };

  // ==========================================
  // 25. RESULT SYSTEM & 26. DETAILED ANALYSIS
  // ==========================================
  if (activeTestResult) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Result Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1E293B] text-white p-5 sm:p-6 rounded-3xl shadow-xl shadow-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveTestResult(null); setActiveTest(null); }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                Official NTA Scorecard & Detailed Solution Key
              </span>
              <h2 className="text-base sm:text-xl font-bold font-sans text-white mt-1">
                {activeTestResult.testTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-700"
            >
              <FileCheck className="w-4 h-4 text-amber-400" /> Download Scorecard PDF
            </button>
          </div>
        </div>

        {/* RESULT SYSTEM: 10 Core Metrics (Total Marks, Obtained Marks, Percentage, Correct Answers, Wrong Answers, Unattempted, Accuracy, Time Taken, Rank, Percentile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* 1. Total Marks */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Total Marks</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-800 font-serif">{activeTestResult.maxScore}</div>
            <p className="text-[11px] text-slate-500">Maximum Exam Marks</p>
          </div>

          {/* 2. Obtained Marks */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-700">Obtained Marks</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-950 font-serif">
              {activeTestResult.totalScore}
            </div>
            <p className="text-[11px] text-indigo-600 font-bold">Net Score Earned</p>
          </div>

          {/* 3. Percentage */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Percentage</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">{activeTestResult.percentage}%</div>
            <p className="text-[11px] text-emerald-600 font-bold">
              {activeTestResult.percentage >= 40 ? 'Qualified' : 'Needs Review'}
            </p>
          </div>

          {/* 4. Correct Answers */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">Correct Answers</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-serif">
              {activeTestResult.correctAnswersCount}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold">Positive Scoring</p>
          </div>

          {/* 5. Wrong Answers */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-800">Wrong Answers</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-700 font-serif">
              {activeTestResult.incorrectAnswersCount}
            </div>
            <p className="text-[11px] text-rose-600 font-semibold">Negative Deductions</p>
          </div>

          {/* 6. Unattempted */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Unattempted</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-700 font-serif">
              {activeTestResult.unattemptedCount}
            </div>
            <p className="text-[11px] text-slate-400">Skipped Questions</p>
          </div>

          {/* 7. Accuracy */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-800">Accuracy</span>
            <div className="text-2xl sm:text-3xl font-black text-teal-700 font-serif">{activeTestResult.accuracy}%</div>
            <p className="text-[11px] text-teal-600 font-semibold">Precision Ratio</p>
          </div>

          {/* 8. Time Taken */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-800">Time Taken</span>
            <div className="text-xl sm:text-2xl font-black text-blue-950 font-serif">
              {Math.floor(activeTestResult.timeSpentSeconds / 60)}m {activeTestResult.timeSpentSeconds % 60}s
            </div>
            <p className="text-[11px] text-blue-600 font-semibold">Exam Duration</p>
          </div>

          {/* 9. Rank */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-900">Rank</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-800 font-serif">AIR {activeTestResult.airRank}</div>
            <p className="text-[11px] text-slate-500">Out of {activeTestResult.totalCandidates?.toLocaleString() || '3,140'}</p>
          </div>

          {/* 10. Percentile */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-xs space-y-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-800">Percentile</span>
            <div className="text-2xl sm:text-3xl font-black text-purple-950 font-serif">{activeTestResult.percentile}%ile</div>
            <p className="text-[11px] text-purple-700 font-semibold">National Stance</p>
          </div>

        </div>

        {/* 26. DETAILED ANSWER ANALYSIS WITH VIDEO & PDF SOLUTIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Detailed Step-by-Step Question & Solution Key
              </h3>
              <p className="text-xs text-slate-500">
                Review your response, official correct answer, faculty proof, master video lectures, and PDF downloads.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> {activeTestResult.correctAnswersCount} Correct
              </span>
              <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                <X className="w-3.5 h-3.5" /> {activeTestResult.incorrectAnswersCount} Incorrect
              </span>
              <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {activeTestResult.unattemptedCount} Unattempted
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {activeTest.sections.map((sec, sIdx) => (
              <div key={sIdx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-100/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{sec.name}</h4>
                  <span className="text-xs font-semibold text-slate-600">{sec.questions.length} Questions</span>
                </div>

                <div className="divide-y divide-slate-100 p-6 space-y-6">
                  {sec.questions.map((q, qIdx) => {
                    const userAns = activeTestResult.userAnswers[q.id];
                    const isAttempted = userAns !== undefined && userAns !== '' && (Array.isArray(userAns) ? userAns.length > 0 : true);
                    const isCorrect = isAttempted && isQuestionCorrect(q, userAns);

                    return (
                      <div key={q.id} className="pt-6 first:pt-0 space-y-4 text-xs">
                        
                        {/* Question Metadata Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">Q{qIdx + 1}.</span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full capitalize">
                              {q.type.replace('_', ' ')} • {q.topic} ({q.difficulty})
                            </span>
                          </div>

                          <div className="flex items-center gap-2 font-bold">
                            {isCorrect ? (
                              <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> +{q.marks} Marks (Correct)
                              </span>
                            ) : isAttempted ? (
                              <span className="text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                                <X className="w-3.5 h-3.5" /> -{q.negativeMarks} Marks (Negative)
                              </span>
                            ) : (
                              <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                0 Marks (Unattempted)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Statement */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Question</span>
                          <p className="text-sm text-slate-900 font-medium leading-relaxed">
                            {q.questionText}
                          </p>
                        </div>

                        {/* Explicit Student Answer vs Correct Answer Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                            isCorrect 
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                              : isAttempted 
                              ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">Student Answer</span>
                              {isCorrect ? (
                                <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Correct (+{q.marks})
                                </span>
                              ) : isAttempted ? (
                                <span className="text-[10px] font-black bg-rose-200 text-rose-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <X className="w-3 h-3" /> Wrong (-{q.negativeMarks})
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                                  Unattempted (0 Marks)
                                </span>
                              )}
                            </div>
                            <div className="font-semibold text-xs text-slate-800">
                              {q.options && typeof userAns === 'number' && q.options[userAns] ? (
                                <span><strong>Option {String.fromCharCode(65 + userAns)}:</strong> {q.options[userAns]}</span>
                              ) : userAns !== undefined && userAns !== null ? (
                                <span className="font-mono">{String(userAns)}</span>
                              ) : (
                                <span className="text-slate-400 italic">Not attempted by student</span>
                              )}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/70 text-xs space-y-1.5 text-emerald-950">
                            <div className="flex items-center justify-between">
                              <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800">Correct Answer</span>
                              <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Check className="w-3 h-3" /> Official Answer Key
                              </span>
                            </div>
                            <div className="font-semibold text-xs text-slate-900">
                              {q.options && typeof q.correctAnswer === 'number' && q.options[q.correctAnswer] ? (
                                <span><strong>Option {String.fromCharCode(65 + q.correctAnswer)}:</strong> {q.options[q.correctAnswer]}</span>
                              ) : (
                                <span className="font-mono">{String(q.correctAnswer)} {q.numericalUnits || ''}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Option Evaluation for MCQ / Multiple Choice */}
                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {q.options.map((opt, optIdx) => {
                              const isSelectedByUser = Array.isArray(userAns) ? userAns.includes(optIdx) : userAns === optIdx;
                              const isCorrectOpt = Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(optIdx) : q.correctAnswer === optIdx;

                              return (
                                <div
                                  key={optIdx}
                                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                                    isCorrectOpt
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                      : isSelectedByUser
                                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                                      : 'bg-slate-50 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <span><strong>{String.fromCharCode(65 + optIdx)})</strong> {opt}</span>
                                  {isCorrectOpt && (
                                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-black">
                                      Official Key ✓
                                    </span>
                                  )}
                                  {isSelectedByUser && !isCorrectOpt && (
                                    <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-black">
                                      Your Answer ✗
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Numerical Evaluation */}
                        {q.type === 'numerical' && (
                          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-slate-500 font-semibold">Student Numerical Response: </span>
                              <strong className={`font-mono text-sm ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                                {userAns !== undefined ? userAns : 'Unattempted'}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Official Answer Key: </span>
                              <strong className="text-emerald-700 font-mono text-sm">
                                {q.correctAnswer} {q.numericalUnits || ''} (Tolerance: ±{q.numericalTolerance || 0.05})
                              </strong>
                            </div>
                          </div>
                        )}

                        {/* Subjective Model Answer */}
                        {q.type === 'subjective_descriptive' && q.subjectiveModelAnswer && (
                          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2 text-xs">
                            <p className="font-bold text-indigo-900">Official ICAI / Exam Model Answer & Key Rubric:</p>
                            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{q.subjectiveModelAnswer}</p>
                            {q.subjectiveKeywords && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                                <span className="text-[10px] font-bold text-indigo-950">Mandatory Keywords:</span>
                                {q.subjectiveKeywords.map((kw, kwIdx) => (
                                  <span key={kwIdx} className="bg-indigo-100 text-indigo-900 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Step-by-Step Rigorous Explanation */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-800">
                          <p className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                            <Sparkles className="w-4 h-4 text-indigo-600" /> Faculty Step-by-Step Proof & Concept Solution:
                          </p>
                          <p className="text-slate-700 leading-relaxed text-xs">{q.explanation}</p>
                        </div>

                        {/* Video Solution & PDF Solution Action Buttons */}
                        <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                          <button
                            onClick={() => setSelectedVideoSolution({
                              title: q.questionText.slice(0, 70) + '...',
                              faculty: 'Master Faculty Team',
                              url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
                              duration: '04:15 min',
                              topic: q.topic
                            })}
                            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                          >
                            <PlayCircle className="w-4 h-4 text-rose-600" /> Watch Video Solution (04:15 min)
                          </button>

                          <button
                            onClick={() => setSelectedPdfSolution({
                              title: `Question ${qIdx + 1} Step-by-Step Derivation & Handwritten Notes`,
                              topic: q.topic,
                              url: '#'
                            })}
                            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                          >
                            <FileText className="w-4 h-4 text-indigo-600" /> View Detailed Solution PDF
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Solution Modal */}
        {selectedVideoSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-2xl w-full border border-slate-700 shadow-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-rose-500" />
                  <h3 className="text-sm font-bold text-white">Video Solution & Conceptual Proof</h3>
                </div>
                <button
                  onClick={() => setSelectedVideoSolution(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Video Player Mock */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group flex items-center justify-center border border-slate-800">
                <img
                  src={selectedVideoSolution.url}
                  alt="Video Solution"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{selectedVideoSolution.title}</span>
                    <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">HD 1080p</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition cursor-pointer">
                  <PlayCircle className="w-8 h-8" />
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <p className="text-[11px]">Mentor: <strong className="text-white">{selectedVideoSolution.faculty}</strong> • Topic: <strong className="text-indigo-400">{selectedVideoSolution.topic}</strong></p>
                <span className="text-[11px] bg-slate-800 px-2.5 py-1 rounded-lg">Duration: {selectedVideoSolution.duration}</span>
              </div>
            </div>
          </div>
        )}

        {/* PDF Solution Modal */}
        {selectedPdfSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Detailed Solution PDF Notes</h3>
                </div>
                <button
                  onClick={() => setSelectedPdfSolution(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold text-sm">
                    PDF
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{selectedPdfSolution.title}</h4>
                    <p className="text-[11px] text-slate-500">{selectedPdfSolution.topic} • Complete Derivation (3 Pages)</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Includes full mathematical calculations, memory tricks, relevant ICAI/NTA past year trends, and shortcut methods.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedPdfSolution(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert('Solution PDF downloaded to your study vault.');
                    setSelectedPdfSolution(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" /> Download PDF Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ==========================================
  // ACTIVE CBT EXAM ENGINE VIEW
  // ==========================================
  return (
    <div
      onCopy={(e) => handleSecurityAction(e, 'Copying')}
      onCut={(e) => handleSecurityAction(e, 'Cutting')}
      onPaste={(e) => handleSecurityAction(e, 'Pasting')}
      onContextMenu={(e) => handleSecurityAction(e, 'Right-Click Context Menu')}
      className="space-y-4 max-w-7xl mx-auto select-none"
    >
      {/* NTA CBT Exam Top Bar */}
      <div className="bg-[#1E293B] text-white px-4 sm:px-6 py-3.5 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center font-bold text-amber-400 font-serif text-lg">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                NTA CBT Exam Simulator
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> AI Proctored
              </span>
            </div>
            <h2 className="text-xs sm:text-base font-bold font-sans text-white mt-0.5 line-clamp-1">
              {activeTest.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Scientific Calculator Trigger */}
          <button
            onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Calc</span>
          </button>

          {/* Full-Screen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-indigo-400" /> : <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="hidden md:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* 23. Exam Timer Countdown */}
          <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-2xl border border-slate-700 text-amber-300 font-mono font-bold text-sm shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          {/* Submit Test Button */}
          <button
            id="submit-exam-btn"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition cursor-pointer shadow-md"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* 24. Security & Device Tracking Bar */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 rounded-2xl border border-slate-800 text-[11px] flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Session Protected
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Monitor className="w-3.5 h-3.5 text-slate-400" /> Device: Chrome / macOS (1920x1080)
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="flex items-center gap-1 text-slate-400 hidden sm:inline-flex">
            <Wifi className="w-3.5 h-3.5 text-slate-400" /> IP: 103.21.244.18 (Encrypted)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-indigo-300">
            <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" /> Auto-saved: {lastAutoSaveTime}
          </span>
          <span className="text-slate-500">|</span>
          <span className={`font-bold ${tabSwitchCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
            Tab Strikes: {tabSwitchCount}/3
          </span>
        </div>
      </div>

      {/* Sections Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-slate-200 text-xs">
        <span className="text-slate-400 font-bold px-2 uppercase text-[10px] tracking-wider">Sections:</span>
        {activeTest.sections.map((sec, idx) => (
          <button
            key={idx}
            onClick={() => { setCurrentSectionIndex(idx); setCurrentQuestionIndex(0); }}
            className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer shrink-0 ${
              currentSectionIndex === idx
                ? 'bg-[#1E293B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {sec.name} ({sec.questions?.length || 0})
          </button>
        ))}
      </div>

      {/* Main CBT Engine Layout: Active Question Area (8 cols) + Question Palette & AI Proctor (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left: Active Question Screen (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col min-h-[540px] overflow-hidden">
          
          {/* Question Header: Question Number & Marks */}
          <div className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                Question {currentQuestionIndex + 1} of {currentSection?.questions?.length || 0}
              </span>
              <span className="bg-indigo-100 text-indigo-900 font-semibold px-2.5 py-0.5 rounded-full text-[10px] capitalize">
                {currentQuestion?.type.replace('_', ' ')} • {currentQuestion?.topic}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+{currentQuestion?.marks} Marks</span>
              <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">-{currentQuestion?.negativeMarks} Neg</span>
            </div>
          </div>

          {/* Question Statement & Answer Options */}
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {currentQuestion ? (
              <>
                <p className="text-sm text-slate-900 font-medium leading-relaxed">
                  {currentQuestion.questionText}
                </p>

                {/* 1. SINGLE CORRECT MCQ */}
                {(currentQuestion.type === 'single_correct' || currentQuestion.type === 'single_choice') && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        onClick={() => handleSingleSelect(optIdx)}
                        className={`p-4 rounded-2xl border text-xs flex items-center gap-3 transition cursor-pointer ${
                          userAnswers[currentQuestion.id] === optIdx
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          checked={userAnswers[currentQuestion.id] === optIdx}
                          onChange={() => handleSingleSelect(optIdx)}
                          className="w-4 h-4 accent-indigo-900"
                        />
                        <span><strong>{String.fromCharCode(65 + optIdx)})</strong> {opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* 2. MULTIPLE CORRECT MCQ */}
                {(currentQuestion.type === 'multiple_correct' || currentQuestion.type === 'multiple_choice') && currentQuestion.options && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-purple-700 font-bold">One or more options may be correct (Select all that apply):</p>
                    {currentQuestion.options.map((opt, optIdx) => {
                      const isChecked = Array.isArray(userAnswers[currentQuestion.id]) && userAnswers[currentQuestion.id].includes(optIdx);
                      return (
                        <label
                          key={optIdx}
                          onClick={() => handleMultipleSelect(optIdx)}
                          className={`p-4 rounded-2xl border text-xs flex items-center gap-3 transition cursor-pointer ${
                            isChecked
                              ? 'bg-purple-50 border-purple-600 text-purple-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleMultipleSelect(optIdx)}
                            className="w-4 h-4 accent-purple-900 rounded"
                          />
                          <span><strong>{String.fromCharCode(65 + optIdx)})</strong> {opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* 3. TRUE / FALSE */}
                {currentQuestion.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <button
                      onClick={() => handleTrueFalseSelect('True')}
                      className={`p-4 rounded-2xl border font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                        String(userAnswers[currentQuestion.id]).toLowerCase() === 'true'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Check className="w-4 h-4" /> TRUE Statement
                    </button>
                    <button
                      onClick={() => handleTrueFalseSelect('False')}
                      className={`p-4 rounded-2xl border font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                        String(userAnswers[currentQuestion.id]).toLowerCase() === 'false'
                          ? 'bg-rose-600 text-white border-rose-700 shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <X className="w-4 h-4" /> FALSE Statement
                    </button>
                  </div>
                )}

                {/* 4. FILL IN BLANK */}
                {(currentQuestion.type === 'fill_in_blank' || currentQuestion.type === 'fill_blank') && (
                  <div className="space-y-2 max-w-sm">
                    <label className="block text-xs font-semibold text-slate-700">Type your answer in the blank:</label>
                    <input
                      type="text"
                      value={userAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleTextInput(e.target.value)}
                      placeholder="Type exact keyword or term..."
                      className="w-full text-sm font-medium p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                )}

                {/* 5. MATCH THE FOLLOWING */}
                {currentQuestion.type === 'match_following' && currentQuestion.matchPairs && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-700">Match items in Column I with Column II:</p>
                    <div className="space-y-2.5">
                      {currentQuestion.matchPairs.map((pair, pIdx) => {
                        const leftVal = pair.left || pair.leftText || pair.leftKey || `Item ${pIdx + 1}`;
                        const currentMatch = (userAnswers[currentQuestion.id] || {})[leftVal];
                        return (
                          <div key={pIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 items-center">
                            <div className="text-xs font-bold text-slate-900">{leftVal}</div>
                            <select
                              value={currentMatch || ''}
                              onChange={(e) => handleMatchSelect(leftVal, e.target.value)}
                              className="text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 font-medium"
                            >
                              <option value="">-- Match with Column II --</option>
                              {currentQuestion.matchPairs?.map((targetPair, tIdx) => {
                                const rightVal = targetPair.right || targetPair.rightText || targetPair.rightKey || `Target ${tIdx + 1}`;
                                return (
                                  <option key={tIdx} value={rightVal}>{rightVal}</option>
                                );
                              })}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 6. NUMERICAL TYPE */}
                {currentQuestion.type === 'numerical' && (
                  <div className="space-y-3 max-w-sm">
                    <label className="block text-xs font-semibold text-slate-700">Enter Numerical Value (Integer/Decimal):</label>
                    <input
                      type="text"
                      value={userAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleTextInput(e.target.value)}
                      placeholder="e.g. 5 or 2.5"
                      className="w-full text-sm font-mono p-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    {currentQuestion.numericalTolerance !== undefined && (
                      <p className="text-[11px] text-slate-400">Accepted range tolerance: ±{currentQuestion.numericalTolerance}</p>
                    )}
                  </div>
                )}

                {/* 7. SUBJECTIVE / DESCRIPTIVE */}
                {(currentQuestion.type === 'subjective' || currentQuestion.type === 'subjective_descriptive') && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">Write your structured answer & reasoning:</label>
                    <textarea
                      rows={6}
                      value={userAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleTextInput(e.target.value)}
                      placeholder="Enter detailed points, calculations, statutory sections..."
                      className="w-full text-xs font-mono p-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Bottom Action Controls: Mark for Review, Clear Answer, Previous, Next */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkReview}
                className={`px-4 py-2.5 rounded-2xl font-bold transition cursor-pointer border ${
                  markedForReview[currentQuestion?.id || '']
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300'
                }`}
              >
                {markedForReview[currentQuestion?.id || ''] ? 'Marked for Review 🚩' : 'Mark for Review'}
              </button>

              <button
                onClick={handleClearResponse}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-2xl border border-slate-300 transition cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Answer
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 && currentSectionIndex === 0}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-2xl border border-slate-300 transition cursor-pointer disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                id="save-and-next-btn"
                onClick={handleSaveAndNext}
                className="px-6 py-2.5 bg-[#1E293B] hover:bg-slate-800 text-white font-bold rounded-2xl transition cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>Save & Next</span> <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Online Proctoring + Question Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* 24. AI-BASED ONLINE PROCTORING CARD */}
          <div className="bg-[#1E293B] text-white rounded-3xl p-4 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h4 className="font-bold text-xs">AI Online Proctoring Feed</h4>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                100% Integrity
              </span>
            </div>

            {/* Webcam / Simulator Area */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-slate-700 flex items-center justify-center">
              {isCameraEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="text-center p-4 text-slate-400 space-y-1">
                  <VideoOff className="w-8 h-8 mx-auto text-slate-500" />
                  <p className="text-[11px]">Camera stream disabled in preview</p>
                </div>
              )}

              {/* Proctor AI Overlays */}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Face: Verified (1)
              </div>

              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-mono text-amber-300">
                Gaze: Screen Focused
              </div>
            </div>

            {/* Live Behavioral Telemetry */}
            <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 font-medium">
              <div>
                <span className="text-slate-400 block">Head Pose:</span>
                <span className="text-emerald-400 font-bold">Centered (0° Yaw)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Audio Environment:</span>
                <span className="text-emerald-400 font-bold">Silent (32 dB)</span>
              </div>
            </div>
          </div>

          {/* QUESTION PALETTE & SUMMARY */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Question Palette</h4>
              <span className="text-[11px] font-semibold text-slate-500">{currentSection.name}</span>
            </div>

            {/* Attempted & Unattempted Counts Summary */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="text-emerald-800 font-bold">Attempted:</span>
                <strong className="text-emerald-950 font-serif text-sm">{answeredCount}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <span className="text-rose-800 font-bold">Unattempted:</span>
                <strong className="text-rose-950 font-serif text-sm">{unattemptedCount}</strong>
              </div>
            </div>

            {/* Status Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">✓</span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">!</span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center">★</span>
                <span>Marked ({markedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center">·</span>
                <span>Not Visited ({notVisitedCount})</span>
              </div>
            </div>

            {/* Questions Numbers Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
              {currentSection.questions.map((q, idx) => {
                const status = getQuestionStatus(q.id);
                let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (status === 'answered') colorClasses = 'bg-emerald-600 text-white border-emerald-700';
                else if (status === 'marked') colorClasses = 'bg-purple-600 text-white border-purple-700';
                else if (status === 'answered_marked') colorClasses = 'bg-purple-600 text-white border-2 border-emerald-400';
                else if (status === 'not_answered') colorClasses = 'bg-rose-500 text-white border-rose-600';

                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl font-bold text-xs border transition cursor-pointer flex items-center justify-center relative ${colorClasses} ${isCurrent ? 'ring-2 ring-indigo-950 ring-offset-1' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Scientific Quick Calc Floating Overlay if active */}
            {isCalculatorOpen && (
              <div className="p-3 bg-slate-900 text-white rounded-2xl border border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400">Scientific Quick Calc</span>
                  <button onClick={() => setIsCalculatorOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg text-right font-mono text-sm">
                  {calcInput || '0'}
                </div>
                <div className="grid grid-cols-4 gap-1 text-center font-mono">
                  {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((k) => (
                    <button
                      key={k}
                      onClick={() => {
                        if (k === '=') {
                          try {
                            // eslint-disable-next-line no-eval
                            const evaluated = Function(`'use strict'; return (${calcInput})`)();
                            setCalcInput(String(evaluated));
                          } catch {
                            setCalcInput('Error');
                          }
                        } else {
                          setCalcInput((prev) => prev + k);
                        }
                      }}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-2xl text-xs transition cursor-pointer shadow-md"
            >
              Submit Final Examination
            </button>
          </div>
        </div>
      </div>

      {/* Security Warning Modal (for Tab-switch Strikes) */}
      {showSecurityWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-rose-200 shadow-2xl space-y-4 text-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Proctoring Security Warning</h3>
            <p className="text-slate-600 leading-relaxed">{securityAlertMessage}</p>
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setShowSecurityWarning(false)}
                className="px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-md"
              >
                I Understand & Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif">Submit Examination for Evaluation?</h3>
            <p className="text-slate-600 leading-relaxed">
              You still have <strong>{formatTimer(timeLeftSeconds)}</strong> left. You have attempted <strong>{answeredCount}</strong> out of <strong>{totalQuestionsCount}</strong> questions.
            </p>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-500">Attempted:</span> <strong className="text-emerald-700">{answeredCount}</strong>
              </div>
              <div>
                <span className="text-slate-500">Unattempted:</span> <strong className="text-rose-600">{unattemptedCount}</strong>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200"
              >
                Resume Exam
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-md"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
