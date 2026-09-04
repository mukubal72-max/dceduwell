import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Send,
  Hand,
  BarChart3,
  Download,
  MessageSquare,
  ArrowLeft,
  Volume2,
  Maximize2,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Clock,
  BookOpen,
  UserCheck,
  Radio,
  HelpCircle,
  PenTool,
  Monitor,
  Video,
  Mic,
  MicOff,
  ThumbsUp,
  RotateCcw,
  Sparkles,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { LiveQaItem, LivePollItem } from '../../types';

export const LiveClassRoom: React.FC = () => {
  const {
    activeLiveClass,
    setActiveLiveClass,
    setView,
    currentUser,
    recordStudentAttendance,
    publishLiveRecording
  } = useApp();

  // Classroom Media Mode: 'video' | 'screenshare' | 'whiteboard'
  const [mediaMode, setMediaMode] = useState<'video' | 'screenshare' | 'whiteboard'>('video');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isMicAllowed, setIsMicAllowed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Classroom Sub Tabs
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'polls' | 'notes' | 'attendance' | 'schedule'>('chat');

  // Attendance & Time Tracking
  const [joinedAtTime] = useState<string>(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; role?: string; text: string; time: string }[]>([
    { id: '1', user: 'Er. Rajeshwar Varma', role: 'Faculty', text: 'Welcome everyone! Today we are tackling top 5 toughest JEE Advanced conductor problems.', time: '7:30 PM' },
    { id: '2', user: 'Tanvi Nair', text: 'Good evening Sir! Ready with my notebook.', time: '7:31 PM' },
    { id: '3', user: 'Rohan Sharma', text: 'Sir, will we cover the dielectric force calculation today?', time: '7:32 PM' },
    { id: '4', user: 'Er. Rajeshwar Varma', role: 'Faculty', text: 'Yes Rohan! Right after solving the spherical shell redistribution.', time: '7:32 PM' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Raise Hand State
  const [handRaised, setHandRaised] = useState(false);
  const [handRaiseQueuePosition, setHandRaiseQueuePosition] = useState<number | null>(null);

  // Q&A State
  const [qaItems, setQaItems] = useState<LiveQaItem[]>([
    {
      id: 'qa-1',
      studentName: 'Aarav Patel',
      studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      question: 'Why does charge always reside on outer surface of a conductor even in arbitrary shape?',
      upvotes: 18,
      hasUpvoted: false,
      answered: true,
      answer: 'By Gauss Law inside the conductor E=0 everywhere in electrostatic equilibrium. Hence integral E.dA = 0, meaning net enclosed charge Q_enc = 0 inside any Gaussian surface entirely within the metal.',
      answeredBy: 'Er. Rajeshwar Varma',
      timestamp: '7:35 PM'
    },
    {
      id: 'qa-2',
      studentName: 'Pooja Hegde',
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      question: 'What happens if we earth the inner spherical shell while holding outer shell at potential V?',
      upvotes: 12,
      hasUpvoted: false,
      answered: false,
      timestamp: '7:42 PM'
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  // Live Polls State
  const [activePoll, setActivePoll] = useState<LivePollItem>({
    id: 'poll-1',
    questionText: 'What is the net electric field inside a hollow spherical conductor with charge +Q on the outer surface?',
    options: [
      { id: 'opt-1', text: 'Zero everywhere inside the cavity', voteCount: 142 },
      { id: 'opt-2', text: 'kQ / r²', voteCount: 18 },
      { id: 'opt-3', text: 'kQ / R²', voteCount: 9 },
      { id: 'opt-4', text: 'Depends on the cavity position', voteCount: 4 }
    ],
    totalVotes: 173,
    isActive: true,
    userVotedOptionId: undefined,
    correctOptionId: 'opt-1'
  });

  // Digital Whiteboard State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#4f46e5');
  const [penSize, setPenSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // Live Notes Scratchpad
  const [studentNotes, setStudentNotes] = useState<string>(
    `# Key Formulas & Notes - Electrostatics Masterclass\n1. Electrostatic Shielding: E_inside = 0\n2. Surface charge density sigma = dq/dA\n3. Potential on conductor is constant throughout body: V = constant\n4. Force per unit area on surface of conductor: P = (sigma^2) / (2 * epsilon_0)`
  );
  const [isNotesSaved, setIsNotesSaved] = useState(false);

  // Anti-piracy Watermark Floating Coordinates
  const [watermarkPos, setWatermarkPos] = useState<{ top: number; left: number }>({ top: 15, left: 15 });
  const [liveClockStr, setLiveClockStr] = useState<string>('');

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Timer & Watermark Engine & Attendance Logger
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setLiveClockStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
      setSecondsElapsed(prev => prev + 1);
    }, 1000);

    const watermarkInterval = setInterval(() => {
      const positions = [
        { top: 18, left: 12 },
        { top: 62, left: 22 },
        { top: 24, left: 65 },
        { top: 70, left: 58 },
        { top: 42, left: 38 }
      ];
      const nextPos = positions[Math.floor(Math.random() * positions.length)];
      setWatermarkPos(nextPos);
    }, 5000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(watermarkInterval);
    };
  }, []);

  // Save student attendance record when active class loads or changes
  useEffect(() => {
    if (activeLiveClass && currentUser) {
      recordStudentAttendance({
        id: `att-${activeLiveClass.id}-${currentUser.id}`,
        liveClassId: activeLiveClass.id,
        liveClassTitle: activeLiveClass.title,
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        joiningTime: joinedAtTime,
        leavingTime: undefined,
        durationMinutes: Math.max(1, Math.floor(secondsElapsed / 60)),
        status: 'present'
      });
    }
  }, [activeLiveClass, currentUser, joinedAtTime, secondsElapsed, recordStudentAttendance]);

  // Setup Canvas for Digital Whiteboard
  useEffect(() => {
    if (mediaMode === 'whiteboard' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [mediaMode]);

  if (!activeLiveClass) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-slate-500">No active live class selected.</p>
        <button
          onClick={() => setView('student_portal')}
          className="px-4 py-2 bg-indigo-950 text-white rounded-lg text-xs font-bold cursor-pointer"
        >
          Return to Portal
        </button>
      </div>
    );
  }

  // Format Elapsed Time (e.g., 00:14:22)
  const formatDuration = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isEraser) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = penSize * 4;
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Send Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      user: `You (${currentUser.name})`,
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate faculty feedback
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: `fmsg-${Date.now()}`,
          user: activeLiveClass.facultyName,
          role: 'Faculty',
          text: 'Excellent observation! Keep tracking these boundary condition equations.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 2800);
  };

  // Raise Hand Action
  const toggleRaiseHand = () => {
    if (!handRaised) {
      setHandRaised(true);
      setHandRaiseQueuePosition(3);
      setTimeout(() => {
        setIsMicAllowed(true);
      }, 4000);
    } else {
      setHandRaised(false);
      setHandRaiseQueuePosition(null);
      setIsMicAllowed(false);
      setIsSpeaking(false);
    }
  };

  // Vote on Live Poll
  const handleVotePoll = (optionId: string) => {
    if (activePoll.userVotedOptionId) return;

    setActivePoll(prev => {
      const updatedOptions = prev.options.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, voteCount: opt.voteCount + 1 };
        }
        return opt;
      });
      return {
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1,
        userVotedOptionId: optionId
      };
    });
  };

  // Post New Q&A
  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newItem: LiveQaItem = {
      id: `qa-${Date.now()}`,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      question: newQuestionText.trim(),
      upvotes: 1,
      hasUpvoted: true,
      answered: false,
      timestamp: 'Just now'
    };

    setQaItems(prev => [newItem, ...prev]);
    setNewQuestionText('');
  };

  // Upvote Question
  const handleUpvoteQuestion = (id: string) => {
    setQaItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.hasUpvoted;
        return {
          ...item,
          hasUpvoted: nextState,
          upvotes: nextState ? item.upvotes + 1 : item.upvotes - 1
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveLiveClass(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Back to portal"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                LIVE CLASSROOM
              </span>
              {activeLiveClass.isFree ? (
                <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Free Demo
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                  Enrolled Batch: {activeLiveClass.batchName || 'Foundation 2026'}
                </span>
              )}
              <span className="text-xs text-slate-400 font-medium">| {activeLiveClass.subject}</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold font-serif text-white line-clamp-1 mt-0.5">
              {activeLiveClass.title}
            </h2>
          </div>
        </div>

        {/* Live Status Controls */}
        <div className="flex items-center gap-2.5 flex-wrap text-xs">
          {/* Active Duration */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-mono text-xs">{formatDuration(secondsElapsed)}</span>
          </div>

          {/* Attendees Counter */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeLiveClass.attendeesCount.toLocaleString()} Live</span>
          </div>

          {/* Mic / Speak Permission Status */}
          {isMicAllowed && (
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border ${
                isSpeaking
                  ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-emerald-500/50'
              }`}
            >
              {isSpeaking ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Mic ON (Speaking)' : 'Faculty Allowed Mic'}</span>
            </button>
          )}

          {/* Raise Hand Button */}
          <button
            onClick={toggleRaiseHand}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              handRaised
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>{handRaised ? `Hand Raised (Queue #${handRaiseQueuePosition || 1}) ✋` : 'Raise Hand'}</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Screen Sharing / Digital Whiteboard / Live Video (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Mode Switcher Bar */}
          <div className="bg-slate-900 text-white p-2 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setMediaMode('video')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  mediaMode === 'video' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Live Video Stream</span>
              </button>

              <button
                onClick={() => setMediaMode('screenshare')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  mediaMode === 'screenshare' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Teacher Screen Share</span>
              </button>

              <button
                onClick={() => setMediaMode('whiteboard')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  mediaMode === 'whiteboard' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Digital Whiteboard</span>
              </button>
            </div>

            {/* Recording Active Status Badge */}
            <div className="flex items-center gap-2 pr-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-[11px] font-mono text-slate-300 hidden sm:inline">REC Cloud HLS AES-128</span>
            </div>
          </div>

          {/* Active Canvas / Stream Window */}
          <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none">
            
            {mediaMode === 'video' ? (
              /* Live Video Mode */
              <video
                src={activeLiveClass.streamUrl}
                autoPlay
                loop
                muted={isAudioMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : mediaMode === 'screenshare' ? (
              /* Teacher Screen Share Simulation */
              <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-between text-white font-mono">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-300 font-bold">Presenter Screen: {activeLiveClass.facultyName}'s Digital Pad</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-slate-700">Slide 14 / 28</span>
                </div>

                <div className="my-auto space-y-4 max-w-xl mx-auto text-left bg-slate-950/80 p-6 rounded-xl border border-slate-800">
                  <h3 className="text-base font-bold text-amber-400 font-sans">Theorem 3.4: Induced Surface Charges on Concentric Spheres</h3>
                  <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700 text-xs text-emerald-300 font-mono space-y-1">
                    <p>• Inner Radius a carries charge +q</p>
                    <p>• Outer Shell b (inner surface) develops -q</p>
                    <p>• Outer Shell c (outer surface) holds +Q + q</p>
                    <p>• E(r) for r &lt; a : 0</p>
                    <p>• E(r) for a &lt; r &lt; b : kq / r²</p>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Note: If outer shell is earthed, V_outer = 0, causing charge redistribution to neutralize external field.
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                  <span>Stream Quality: 1080p 60fps Low-Latency</span>
                  <span>Audio Bitrate: 320kbps Opus</span>
                </div>
              </div>
            ) : (
              /* Digital Whiteboard Interactive Canvas */
              <div className="w-full h-full bg-white relative flex flex-col">
                <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <PenTool className="w-3.5 h-3.5 text-indigo-600" /> Whiteboard Tools:
                    </span>
                    <button
                      onClick={() => setIsEraser(false)}
                      className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                        !isEraser ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Pen
                    </button>
                    <button
                      onClick={() => setIsEraser(true)}
                      className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                        isEraser ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Eraser
                    </button>
                    <input
                      type="color"
                      value={penColor}
                      onChange={(e) => {
                        setPenColor(e.target.value);
                        setIsEraser(false);
                      }}
                      className="w-6 h-6 rounded cursor-pointer border border-slate-300"
                      title="Pen Color"
                    />
                    <select
                      value={penSize}
                      onChange={(e) => setPenSize(Number(e.target.value))}
                      className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5"
                    >
                      <option value={2}>Thin (2px)</option>
                      <option value={4}>Medium (4px)</option>
                      <option value={8}>Thick (8px)</option>
                    </select>
                  </div>

                  <button
                    onClick={clearCanvas}
                    className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear Board
                  </button>
                </div>

                <div className="flex-1 relative cursor-crosshair bg-white">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={450}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white/80 px-2 py-1 rounded border border-slate-200 pointer-events-none">
                    Collaborative Canvas • Live Sync
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Moving Anti-Piracy Watermark on Live Stream */}
            <div
              style={{
                top: `${watermarkPos.top}%`,
                left: `${watermarkPos.left}%`,
                transition: 'all 1.2s ease-in-out'
              }}
              className="absolute pointer-events-none z-30 opacity-35 bg-slate-950/80 px-2.5 py-1 rounded text-white font-mono text-[9px] border border-white/20"
            >
              <p className="font-bold text-amber-300">LIVE: {currentUser.name} • {currentUser.phone}</p>
              <p className="text-[8px] text-emerald-400">UID: {currentUser.id} • {liveClockStr}</p>
            </div>

            {/* Instructor PiP Overlay */}
            <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md rounded-xl p-2.5 border border-slate-700/80 flex items-center gap-2.5 text-white text-xs shadow-lg">
              <img
                src={activeLiveClass.facultyAvatar}
                alt={activeLiveClass.facultyName}
                className="w-8 h-8 rounded-full object-cover border border-amber-400"
              />
              <div>
                <p className="font-bold text-white leading-tight">{activeLiveClass.facultyName}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Speaking (HD Audio)
                </p>
              </div>
            </div>

            {/* Bottom Stream Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-3 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="font-bold">LIVE 1080p 60fps</span>
                <span className="text-[10px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">AES-128 DRM</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="hover:text-white cursor-pointer"
                  title="Toggle Audio"
                >
                  <Volume2 className={`w-4 h-4 ${isAudioMuted ? 'text-rose-400' : 'text-slate-300'}`} />
                </button>
                <button className="hover:text-white cursor-pointer" title="Fullscreen">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Lecture Metadata & Whiteboard Topics */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-serif">{activeLiveClass.topic || activeLiveClass.title}</h4>
                <p className="text-slate-500 text-xs">{activeLiveClass.courseTitle} • {activeLiveClass.batchName || 'Main Batch'}</p>
              </div>
              <button 
                onClick={() => alert(`Downloading Live Lecture Whiteboard Notes PDF for ${activeLiveClass.topic || 'Class'}`)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition"
              >
                <Download className="w-3.5 h-3.5" /> Download Whiteboard PDF
              </button>
            </div>

            {activeLiveClass.description && (
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {activeLiveClass.description}
              </p>
            )}

            <div>
              <span className="font-bold text-slate-700 block mb-1.5">Today's Agenda & Concepts:</span>
              <div className="flex flex-wrap gap-2">
                {activeLiveClass.topicsCovered?.map((topic, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded-lg text-xs font-medium border border-indigo-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-tab Interactive Engagement Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
          
          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-3 whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
                activeTab === 'chat' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`px-3 py-3 whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
                activeTab === 'qa' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" /> Q&A ({qaItems.length})
            </button>

            <button
              onClick={() => setActiveTab('polls')}
              className={`px-3 py-3 whitespace-nowrap transition flex items-center gap-1 cursor-pointer relative ${
                activeTab === 'polls' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-600" /> Polls
              {activePoll.isActive && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>}
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-3 whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
                activeTab === 'notes' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" /> Notes
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-3 py-3 whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
                activeTab === 'attendance' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-600" /> Attendance
            </button>
          </div>

          {/* Tab Content Containers */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
            
            {/* 1. CHAT TAB */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-xl text-xs space-y-0.5 ${
                        msg.role === 'Faculty'
                          ? 'bg-amber-50 border border-amber-200 text-amber-950 shadow-xs'
                          : msg.user.includes('You')
                          ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 ml-4'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold">{msg.user}</span>
                        <span className="text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask a doubt or answer live..."
                    className="flex-1 text-xs px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-950 hover:bg-indigo-900 text-white rounded-lg transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* 2. Q&A TAB */}
            {activeTab === 'qa' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 space-y-3">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {qaItems.map((qa) => (
                    <div key={qa.id} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-xs shadow-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img src={qa.studentAvatar} alt={qa.studentName} className="w-6 h-6 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{qa.studentName}</p>
                            <p className="text-[10px] text-slate-400">{qa.timestamp}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleUpvoteQuestion(qa.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            qa.hasUpvoted
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{qa.upvotes}</span>
                        </button>
                      </div>

                      <p className="font-medium text-slate-800">{qa.question}</p>

                      {qa.answered ? (
                        <div className="bg-emerald-50/80 border border-emerald-200 p-2.5 rounded-lg text-xs space-y-1">
                          <div className="flex items-center gap-1 text-emerald-800 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Answered by {qa.answeredBy}</span>
                          </div>
                          <p className="text-emerald-950 text-xs">{qa.answer}</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-700 text-[10px] font-semibold bg-amber-50 px-2 py-1 rounded">
                          <Clock className="w-3 h-3" /> In faculty queue
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handlePostQuestion} className="border-t border-slate-200 pt-2 flex gap-2">
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Submit a formal question for faculty..."
                    className="flex-1 text-xs px-3 py-2 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-indigo-950 hover:bg-indigo-900 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Post Q&A
                  </button>
                </form>
              </div>
            )}

            {/* 3. LIVE POLLS TAB */}
            {activeTab === 'polls' && (
              <div className="p-4 space-y-4 overflow-y-auto">
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-xs">Live Pop Quiz #02</span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">45s Left</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {activePoll.questionText}
                  </p>

                  <div className="space-y-2 pt-1">
                    {activePoll.options.map((option) => {
                      const pct = activePoll.totalVotes > 0 ? Math.round((option.voteCount / activePoll.totalVotes) * 100) : 0;
                      const isChosen = activePoll.userVotedOptionId === option.id;
                      const isCorrect = option.id === activePoll.correctOptionId;

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleVotePoll(option.id)}
                          disabled={Boolean(activePoll.userVotedOptionId)}
                          className={`w-full text-left p-3 rounded-xl border transition text-xs relative overflow-hidden cursor-pointer ${
                            isChosen
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          {/* Vote percentage bar overlay */}
                          {activePoll.userVotedOptionId && (
                            <div
                              style={{ width: `${pct}%` }}
                              className={`absolute inset-y-0 left-0 opacity-15 ${isCorrect ? 'bg-emerald-600' : 'bg-slate-400'}`}
                            />
                          )}
                          <div className="relative z-10 flex items-center justify-between">
                            <span>{option.text}</span>
                            {activePoll.userVotedOptionId && (
                              <span className="font-mono text-xs font-bold text-slate-700">{pct}% ({option.voteCount})</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {activePoll.userVotedOptionId && (
                    <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Your vote has been recorded live! Total votes: {activePoll.totalVotes}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 4. CLASS NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" /> Student Scratchpad
                  </span>
                  <button
                    onClick={() => {
                      setIsNotesSaved(true);
                      setTimeout(() => setIsNotesSaved(false), 2500);
                    }}
                    className="px-2.5 py-1 bg-indigo-950 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {isNotesSaved ? <Check className="w-3 h-3 text-emerald-400" /> : <Save className="w-3 h-3" />}
                    <span>{isNotesSaved ? 'Saved!' : 'Save Notes'}</span>
                  </button>
                </div>

                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  className="flex-1 text-xs font-mono p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Take timestamped notes during the live lecture..."
                />

                <div className="p-2 bg-indigo-50 rounded-lg text-[11px] text-indigo-950 flex items-center justify-between border border-indigo-100">
                  <span>Notes auto-sync with course profile</span>
                  <button 
                    onClick={() => alert('Exporting notes to PDF document...')}
                    className="font-bold underline cursor-pointer"
                  >
                    Export .MD / PDF
                  </button>
                </div>
              </div>
            )}

            {/* 5. ATTENDANCE & RECORDING TAB */}
            {activeTab === 'attendance' && (
              <div className="p-4 space-y-3 overflow-y-auto text-xs">
                {/* Attendance Metric Card */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Live Attendance Ledger</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300">
                      PRESENT (Auto-Verified)
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-700 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Student:</span>
                      <span className="font-bold text-slate-900">{currentUser.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Joined Time:</span>
                      <span className="font-mono font-bold text-slate-900">{joinedAtTime}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Duration Attended:</span>
                      <span className="font-mono font-bold text-indigo-700">{formatDuration(secondsElapsed)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Semester Attendance Rate:</span>
                      <span className="font-bold text-emerald-600">89.4%</span>
                    </div>
                  </div>
                </div>

                {/* Recording Notice Card */}
                <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-950 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>Live Class Recording</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    This session is being recorded in high-definition. Once the faculty concludes the class, the recording will be automatically processed, signed, and published to your batch vault.
                  </p>
                  <button
                    onClick={() => {
                      publishLiveRecording(activeLiveClass.id);
                      alert(`Live class recording for "${activeLiveClass.title}" published to student vault!`);
                    }}
                    className="w-full py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Simulate Auto-Publish Recording
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
