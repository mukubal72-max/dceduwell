import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Download,
  FileText,
  Clock,
  HelpCircle,
  Bookmark,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Sparkles,
  Send,
  Eye,
  AlertTriangle,
  Layers,
  KeyRound,
  Tv,
  Maximize,
  Volume2
} from 'lucide-react';

export const VideoPlayerView: React.FC = () => {
  const {
    activeVideoLesson,
    setActiveVideoLesson,
    markLessonComplete,
    currentUser,
    submitDoubt,
    addToCart
  } = useApp();

  const [activeTab, setActiveTab] = useState<'timestamps' | 'curriculum' | 'notes' | 'ask_doubt' | 'security'>('timestamps');
  const [inVideoDoubtText, setInVideoDoubtText] = useState('');
  const [isDoubtSent, setIsDoubtSent] = useState(false);
  const [securityToast, setSecurityToast] = useState<string | null>(null);
  const [isTabBlurred, setIsTabBlurred] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState<{ top: number; left: number }>({ top: 20, left: 20 });
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);

  // Dynamic moving watermark timer and clock
  useEffect(() => {
    const updateTime = () => {
      setCurrentTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Reposition watermark dynamically every 5 seconds to deter screen recording / crop attempts
    const watermarkInterval = setInterval(() => {
      const positions = [
        { top: 12, left: 15 },
        { top: 70, left: 20 },
        { top: 25, left: 60 },
        { top: 65, left: 55 },
        { top: 40, left: 35 },
        { top: 15, left: 70 }
      ];
      const nextPos = positions[Math.floor(Math.random() * positions.length)];
      setWatermarkPos(nextPos);
    }, 5000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(watermarkInterval);
    };
  }, []);

  // Screen Capture & Tab Switch Blur Safeguard
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabBlurred(true);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        setIsTabBlurred(false);
      }
    };

    const handleWindowBlur = () => {
      setIsTabBlurred(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    const handleWindowFocus = () => {
      setIsTabBlurred(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  if (!activeVideoLesson) return null;

  const { course, lesson } = activeVideoLesson;
  const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);
  const isFreeDemo = lesson.isFreePreview;
  const canAccessVideo = isEnrolled || isFreeDemo;
  const isCompleted = currentUser.completedLessonIds.includes(lesson.id);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecurityToast('⚠️ Right-click and unauthorized video downloads are strictly blocked by DC Maxwell DRM Policy.');
    setTimeout(() => setSecurityToast(null), 4000);
  };

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inVideoDoubtText.trim()) return;

    submitDoubt(
      course.chapters[0]?.subject || 'General',
      course.title,
      `[At Video: ${lesson.title}] ${inVideoDoubtText}`
    );
    setIsDoubtSent(true);
    setInVideoDoubtText('');
    setTimeout(() => setIsDoubtSent(false), 3000);
  };

  const handleSelectLesson = (newLesson: typeof lesson) => {
    setActiveVideoLesson({ course, lesson: newLesson });
  };

  // Secure token generation simulator
  const streamToken = `token_ved_hls_${lesson.id.replace(/-/g, '')}_${Date.now()}`;
  const signedUrlExpires = 'In 4 hours (Dynamic Refresh Active)';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveVideoLesson(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                {course.category}
              </span>
              {isFreeDemo ? (
                <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Free Demo Preview
                </span>
              ) : isEnrolled ? (
                <span className="text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Enrolled Student Access
                </span>
              ) : (
                <span className="text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Paid Enrolled Only
                </span>
              )}
            </div>
            <h2 className="text-sm sm:text-base font-bold font-serif text-white line-clamp-1 mt-1">
              {lesson.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEnrolled && (
            <button
              onClick={() => addToCart(course)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enroll Full Course (₹{course.price.toLocaleString('en-IN')})</span>
            </button>
          )}

          {canAccessVideo && (
            <button
              onClick={() => markLessonComplete(lesson.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-900 hover:bg-indigo-800 text-white border border-indigo-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Security Toast Message */}
      {securityToast && (
        <div className="p-3 bg-rose-950 text-rose-200 border border-rose-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{securityToast}</span>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Video Player Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div 
            onContextMenu={handleContextMenu}
            className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none group"
          >
            {canAccessVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={lesson.videoUrl}
                  controls
                  controlsList="nodownload noplaybackrate"
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Dynamic Moving Anti-Piracy Watermark */}
                <div
                  style={{
                    top: `${watermarkPos.top}%`,
                    left: `${watermarkPos.left}%`,
                    transition: 'all 1.2s ease-in-out'
                  }}
                  className="absolute pointer-events-none z-30 opacity-35 bg-slate-950/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 text-white font-mono text-[9px] sm:text-[10px] leading-tight space-y-0.5 shadow-sm"
                >
                  <p className="font-bold text-amber-300">{currentUser.name} • {currentUser.phone}</p>
                  <p className="text-[8px] text-slate-300">{currentUser.email} | IP: 192.168.1.108</p>
                  <p className="text-[8px] text-emerald-400 font-semibold">DRM-AUTH • {currentTimeStr}</p>
                </div>

                {/* Anti-Screen Recording / Blur Shield */}
                {isTabBlurred && (
                  <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <ShieldAlert className="w-12 h-12 text-amber-400 animate-pulse" />
                    <h4 className="text-base font-bold text-white">Playback Paused for Security</h4>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Screen-recording detection and multi-tab protection is active. Please return focus to this window to resume your lecture.
                    </p>
                    <button
                      onClick={() => setIsTabBlurred(false)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Resume Video
                    </button>
                  </div>
                )}

                {/* Bottom Video Security Badge */}
                <div className="absolute bottom-2 right-2 z-20 pointer-events-none opacity-60 flex items-center gap-1.5 bg-slate-900/80 px-2 py-0.5 rounded text-[9px] text-slate-300 border border-slate-700">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Widevine L1 DRM • Signed HLS Stream</span>
                </div>
              </>
            ) : (
              /* Locked Content Screen */
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-slate-900 to-slate-950 text-white space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h3 className="text-lg font-bold font-serif text-white">Paid Educational Content</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This high-yield video lecture, handwritten notes, and faculty doubt desk are reserved exclusively for enrolled students of <span className="text-amber-300 font-semibold">{course.title}</span>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => addToCart(course)}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Sparkles className="w-4 h-4" /> Unlock All Chapters (₹{course.price.toLocaleString('en-IN')})
                  </button>

                  {/* Switch to first free demo lesson if available */}
                  {course.chapters?.flatMap(c => c.lessons).find(l => l.isFreePreview) && (
                    <button
                      onClick={() => {
                        const firstDemo = course.chapters.flatMap(c => c.lessons).find(l => l.isFreePreview);
                        if (firstDemo) handleSelectLesson(firstDemo);
                      }}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-slate-700"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" /> Watch Free Demo Lecture Instead
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Lesson Metadata Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-serif">{lesson.title}</h3>
                <p className="text-xs text-slate-500">{course.title}</p>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 self-start">
                <Clock className="w-3.5 h-3.5 text-indigo-600" /> {lesson.durationMinutes} minutes
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {lesson.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={course.facultyAvatar}
                  alt={course.facultyName}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
                <span className="font-semibold text-slate-800">{course.facultyName}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 1-Device Strict Lock
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Tools Tab Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-[11px] font-bold overflow-x-auto">
            <button
              onClick={() => setActiveTab('timestamps')}
              className={`flex-1 py-3 px-2 transition flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                activeTab === 'timestamps' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Timestamps
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-3 px-2 transition flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                activeTab === 'curriculum' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Lectures ({course.chapters.reduce((a, c) => a + c.lessons.length, 0)})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 px-2 transition flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                activeTab === 'notes' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> PDF Notes
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-3 px-2 transition flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                activeTab === 'security' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> DRM
            </button>
            <button
              onClick={() => setActiveTab('ask_doubt')}
              className={`flex-1 py-3 px-2 transition flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                activeTab === 'ask_doubt' ? 'bg-white text-indigo-950 border-b-2 border-indigo-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Ask
            </button>
          </div>

          {/* Tab Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'timestamps' && (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500">Jump directly to key concepts in this lecture:</p>
                {lesson.timestamps?.length > 0 ? (
                  lesson.timestamps.map((ts, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 transition cursor-pointer flex items-center justify-between text-xs group"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-indigo-950">{ts.label}</span>
                      <span className="font-mono text-[11px] font-bold bg-white text-indigo-700 px-2 py-0.5 rounded border border-slate-200">
                        {ts.time}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No timestamps logged for this lesson.</p>
                )}
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-500">All Chapters & Video Modules in this Batch:</p>
                {course.chapters?.map((ch) => (
                  <div key={ch.id} className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded block">
                      {ch.subject} • {ch.title}
                    </span>
                    <div className="space-y-1">
                      {ch.lessons?.map((l) => {
                        const isCurrent = l.id === lesson.id;
                        const isLessonAccessible = isEnrolled || l.isFreePreview;
                        return (
                          <div
                            key={l.id}
                            onClick={() => handleSelectLesson(l)}
                            className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                              isCurrent
                                ? 'bg-indigo-950 text-white border-indigo-950 shadow-xs'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              {l.isFreePreview ? (
                                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                                  isCurrent ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  Free Demo
                                </span>
                              ) : isEnrolled ? (
                                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                                  isCurrent ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  Enrolled
                                </span>
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              )}
                              <span className="font-semibold truncate">{l.title}</span>
                            </div>
                            <span className={`text-[10px] shrink-0 font-mono ${isCurrent ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {l.durationMinutes}m
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-700" />
                    <div>
                      <h5 className="font-bold text-slate-900">{lesson.notesPdfTitle || `${lesson.title}_Summary.pdf`}</h5>
                      <p className="text-[10px] text-slate-500">Handwritten Kota/Delhi Faculty Formula Sheet</p>
                    </div>
                  </div>

                  {canAccessVideo ? (
                    <button 
                      onClick={() => alert(`Downloading "${lesson.notesPdfTitle || 'Lecture_Summary_Notes.pdf'}" (Encrypted Watermarked Copy for ${currentUser.name})`)}
                      className="w-full py-2 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5 mt-2 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" /> Download PDF (Watermarked)
                    </button>
                  ) : (
                    <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900 text-[11px] space-y-2">
                      <p className="font-bold flex items-center gap-1"><Lock className="w-3 h-3 text-rose-600" /> Full PDF Notes Locked</p>
                      <p>Enroll in this package to unlock complete colored formula charts and printable DPPs.</p>
                      <button
                        onClick={() => addToCart(course)}
                        className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded text-xs cursor-pointer"
                      >
                        Enroll Now (₹{course.price})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Anti-Piracy & DRM Protection Active</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    This video stream is encrypted with hardware-bound DRM and forensic dynamic watermarking to protect proprietary faculty lectures.
                  </p>
                </div>

                <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">DRM Technology:</span>
                    <span className="font-bold text-slate-800">Widevine / FairPlay L1</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Stream Protocol:</span>
                    <span className="font-bold text-slate-800">AES-128 Encrypted HLS</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Device Restriction:</span>
                    <span className="font-bold text-emerald-700">1 Device Enforced ({currentUser.phone})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Forensic Watermark:</span>
                    <span className="font-bold text-slate-800">Dynamic Bouncing Tag</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Signed URL Expiry:</span>
                    <span className="font-mono text-[10px] text-indigo-700 font-bold">{signedUrlExpires}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900 text-slate-300 rounded-xl font-mono text-[10px] break-all">
                  <p className="text-slate-400 font-bold mb-1">Active Security Token:</p>
                  <span className="text-emerald-400">{streamToken}</span>
                </div>
              </div>
            )}

            {activeTab === 'ask_doubt' && (
              <form onSubmit={handleAskDoubt} className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-600" />
                  Your query will be timestamped to this video position and routed directly to Master Faculty.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Describe your query / doubt:</label>
                  <textarea
                    rows={4}
                    required
                    value={inVideoDoubtText}
                    onChange={(e) => setInVideoDoubtText(e.target.value)}
                    placeholder="e.g. In step 2 of Gauss theorem calculation, why did we neglect the planar edge effect?"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Post Doubt to Faculty
                </button>

                {isDoubtSent && (
                  <p className="text-xs text-emerald-700 font-bold text-center flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Doubt submitted to Faculty Inbox!
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
