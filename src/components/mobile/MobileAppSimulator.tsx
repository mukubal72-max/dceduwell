import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  Radio,
  BookOpen,
  FileCheck,
  Download,
  Bell,
  Search,
  User,
  Play,
  CheckCircle2,
  HelpCircle,
  Wifi,
  Battery,
  Flame,
  ArrowLeft,
  Star,
  Tag,
  Sparkles
} from 'lucide-react';

export const MobileAppSimulator: React.FC = () => {
  const {
    courses,
    liveClasses,
    testSeries,
    currentUser,
    setActiveLiveClass,
    setActiveVideoLesson,
    setActiveTest,
    addToCart
  } = useApp();

  const [devicePlatform, setDevicePlatform] = useState<'android' | 'ios'>('android');
  const [mobileTab, setMobileTab] = useState<'home' | 'courses' | 'tests' | 'downloads' | 'profile'>('home');
  const [downloadedLectures, setDownloadedLectures] = useState<string[]>([
    'Electrostatics: Gauss Law in Spherical Conductors'
  ]);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);

  const toggleDownload = (title: string) => {
    if (downloadedLectures.includes(title)) {
      setDownloadedLectures(prev => prev.filter(t => t !== title));
    } else {
      setDownloadedLectures(prev => [...prev, title]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Controls & Intro */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-400/30">
            Native Mobile App Simulator
          </span>
          <h2 className="text-xl font-bold font-serif mt-1">DC Maxwell Learning App (Android & iOS)</h2>
          <p className="text-xs text-slate-300">
            Experience high-performance native mobile features: offline encrypted video caching, push notifications, and bite-sized revision.
          </p>
        </div>

        {/* Platform & Offline switch */}
        <div className="flex items-center gap-3 bg-slate-800 p-1.5 rounded-2xl border border-slate-700 text-xs">
          <button
            onClick={() => setDevicePlatform('android')}
            className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
              devicePlatform === 'android' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            🤖 Android
          </button>
          <button
            onClick={() => setDevicePlatform('ios')}
            className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
              devicePlatform === 'ios' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            🍎 iOS iPhone
          </button>
        </div>
      </div>

      {/* Center Phone Device Mockup */}
      <div className="flex justify-center py-4">
        <div className={`w-[360px] h-[720px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 ${
          devicePlatform === 'ios' ? 'border-slate-800 ring-4 ring-slate-900' : 'border-slate-800'
        } relative flex flex-col overflow-hidden`}>
          
          {/* Dynamic Island / Notch */}
          {devicePlatform === 'ios' ? (
            <div className="w-28 h-5 bg-black rounded-full mx-auto mb-1 flex items-center justify-center shrink-0 z-30">
              <span className="w-2 h-2 rounded-full bg-slate-900 mr-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-950"></span>
            </div>
          ) : (
            <div className="w-3 h-3 bg-black rounded-full mx-auto mb-1 shrink-0 z-30"></div>
          )}

          {/* Status Bar */}
          <div className="flex items-center justify-between text-[10px] text-white px-4 py-1 shrink-0 font-medium">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-slate-300" />
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Phone Screen Container */}
          <div className="flex-1 bg-slate-50 rounded-[32px] overflow-hidden flex flex-col justify-between text-slate-900 relative">
            
            {/* Top In-App Header */}
            <div className="bg-indigo-950 text-white p-3.5 flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-2">
                <img src={currentUser.avatar} alt="User" className="w-7 h-7 rounded-full border border-amber-400 object-cover" />
                <div>
                  <p className="text-[11px] font-bold leading-tight">{currentUser.name}</p>
                  <p className="text-[9px] text-amber-300 font-semibold">{currentUser.targetExam}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Bell className="w-4 h-4" />
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
              {mobileTab === 'home' && (
                <>
                  {/* Daily Streak Card */}
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-3 text-slate-950 flex items-center justify-between shadow-xs">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase">Daily Ranker Streak</p>
                      <p className="text-sm font-black">{currentUser.studyStreakDays} Days Fire 🔥</p>
                    </div>
                    <span className="text-[10px] bg-slate-950 text-amber-300 font-bold px-2 py-1 rounded-lg">
                      +50 Pts
                    </span>
                  </div>

                  {/* Live Class in Progress */}
                  {liveClasses[0] && (
                    <div className="bg-slate-900 rounded-2xl p-3 text-white space-y-2">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> LIVE NOW
                        </span>
                        <span className="text-slate-400">{liveClasses[0].subject}</span>
                      </div>
                      <p className="font-bold text-xs text-white line-clamp-1">{liveClasses[0].title}</p>
                      <button
                        onClick={() => setActiveLiveClass(liveClasses[0])}
                        className="w-full py-1.5 bg-rose-600 text-white font-bold rounded-lg text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" /> Watch Live (1.2k attending)
                      </button>
                    </div>
                  )}

                  {/* Enrolled Courses list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-slate-900">Continue Learning</span>
                      <span className="text-[10px] text-indigo-900 font-bold">See All</span>
                    </div>

                    {courses.slice(0, 2).map((c) => (
                      <div key={c.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-indigo-950 line-clamp-1">{c.title}</span>
                          <span className="text-slate-400">42%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-900 rounded-full w-[42%]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {mobileTab === 'courses' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Explore All Batches</span>
                    <span className="text-[10px] text-slate-500">{courses.length} Programs</span>
                  </div>

                  {courses.map((c) => (
                    <div key={c.id} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded-full">
                          {c.category}
                        </span>
                        <span className="text-[9px] font-extrabold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-0.5">
                          <Tag className="w-2.5 h-2.5" /> {c.discountPercentage}% OFF
                        </span>
                      </div>

                      <div>
                        <p className="font-bold text-xs text-slate-900 line-clamp-1">{c.title}</p>
                        <p className="text-[10px] text-slate-500">Mentor: {c.facultyName}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{c.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({c.reviewsCount} reviews)</span>
                      </div>

                      {/* Price, Discount & Enroll CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-black text-slate-900">₹{c.price.toLocaleString('en-IN')}</span>
                            <span className="text-[9px] text-slate-400 line-through">₹{c.originalPrice.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              const firstLesson = c.chapters?.[0]?.lessons?.[0];
                              if (firstLesson) {
                                setActiveVideoLesson({ course: c, lesson: firstLesson });
                              }
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold cursor-pointer"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => addToCart(c)}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mobileTab === 'tests' && (
                <div className="space-y-2">
                  <span className="font-bold text-xs">CBT Test Simulator</span>
                  {testSeries.map((t) => (
                    <div key={t.id} className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <p className="font-bold text-[11px] text-slate-900">{t.title}</p>
                      <p className="text-[10px] text-slate-500">{t.totalQuestions} Qs • {t.durationMinutes} mins</p>
                      <button
                        onClick={() => setActiveTest(t)}
                        className="w-full py-1.5 bg-indigo-950 text-white rounded-lg text-[10px] font-bold"
                      >
                        Start Test Engine
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {mobileTab === 'downloads' && (
                <div className="space-y-2">
                  <span className="font-bold text-xs">Offline Cached Lectures</span>
                  {downloadedLectures.map((item, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[11px] text-slate-900">{item}</p>
                        <p className="text-[9px] text-emerald-700 font-semibold">Cached (184 MB) • Play Offline</p>
                      </div>
                      <button
                        onClick={() => toggleDownload(item)}
                        className="text-[10px] text-rose-600 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {mobileTab === 'profile' && (
                <div className="space-y-3 bg-white p-3 rounded-2xl border border-slate-200 text-xs">
                  <div className="text-center space-y-1">
                    <img src={currentUser.avatar} alt="avatar" className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-indigo-900" />
                    <p className="font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                    <p><strong>Target Exam:</strong> {currentUser.targetExam}</p>
                    <p><strong>Wallet Balance:</strong> ₹{currentUser.walletBalance}</p>
                    <p><strong>Enrolled Batches:</strong> {currentUser.enrolledCourseIds?.length || 0}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom App Navigation Bar */}
            <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-between shrink-0 text-[9px] font-bold text-slate-500">
              <button
                onClick={() => setMobileTab('home')}
                className={`flex flex-col items-center gap-0.5 ${mobileTab === 'home' ? 'text-indigo-950 font-black' : ''}`}
              >
                <BookOpen className="w-4 h-4" /> Home
              </button>
              <button
                onClick={() => setMobileTab('courses')}
                className={`flex flex-col items-center gap-0.5 ${mobileTab === 'courses' ? 'text-indigo-950 font-black' : ''}`}
              >
                <Play className="w-4 h-4" /> Batches
              </button>
              <button
                onClick={() => setMobileTab('tests')}
                className={`flex flex-col items-center gap-0.5 ${mobileTab === 'tests' ? 'text-indigo-950 font-black' : ''}`}
              >
                <FileCheck className="w-4 h-4" /> Tests
              </button>
              <button
                onClick={() => setMobileTab('downloads')}
                className={`flex flex-col items-center gap-0.5 ${mobileTab === 'downloads' ? 'text-indigo-950 font-black' : ''}`}
              >
                <Download className="w-4 h-4" /> Offline
              </button>
              <button
                onClick={() => setMobileTab('profile')}
                className={`flex flex-col items-center gap-0.5 ${mobileTab === 'profile' ? 'text-indigo-950 font-black' : ''}`}
              >
                <User className="w-4 h-4" /> Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
