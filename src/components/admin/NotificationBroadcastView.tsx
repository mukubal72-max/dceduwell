import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformNotificationType } from '../../types';
import {
  Bell,
  Send,
  Sparkles,
  Radio,
  FileQuestion,
  Trophy,
  ClipboardList,
  HelpCircle,
  Award,
  Tag,
  Megaphone,
  UserCheck,
  Video,
  ShoppingBag,
  Smartphone,
  CheckCircle2,
  Trash2,
  Clock,
  ExternalLink
} from 'lucide-react';

export const NotificationBroadcastView: React.FC = () => {
  const {
    notifications,
    sendBroadcastNotification,
    deleteNotification,
    courses,
    liveClasses,
    testSeries
  } = useApp();

  const [selectedType, setSelectedType] = useState<PlatformNotificationType>('live_class');
  const [title, setTitle] = useState('🔴 Master Live Class is Starting Now!');
  const [message, setMessage] = useState('Er. Rajeshwar Varma is live with JEE Advanced Electrostatics Deep Dive. Join the interactive doubts session.');
  const [targetAudience, setTargetAudience] = useState<'all' | 'enrolled_jee' | 'enrolled_neet' | 'enrolled_ca' | 'wishlist_leads'>('all');
  const [actionTarget, setActionTarget] = useState<string>('live_classes');
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // 12 Preset Notification Templates
  const notificationPresets: Array<{
    type: PlatformNotificationType;
    label: string;
    icon: React.ReactNode;
    defaultTitle: string;
    defaultMessage: string;
    actionTarget: string;
  }> = [
    {
      type: 'live_class',
      label: 'Live Class Starting',
      icon: <Radio className="w-4 h-4 text-rose-600" />,
      defaultTitle: '🔴 Master Live Class is Starting in 5 Minutes!',
      defaultMessage: 'Er. Rajeshwar Varma is live with JEE Advanced Electrostatics Deep-Dive & Ranker problem solving.',
      actionTarget: 'live_classes'
    },
    {
      type: 'new_video',
      label: 'New Video Lecture',
      icon: <Video className="w-4 h-4 text-blue-600" />,
      defaultTitle: '🎬 New Video Uploaded: Chapter 4 Reaction Mechanisms',
      defaultMessage: 'Dr. Alok Verma has uploaded 3 new HD 4K concept lectures with interactive quiz checkpoints.',
      actionTarget: 'courses'
    },
    {
      type: 'test',
      label: 'Test Series Live',
      icon: <FileQuestion className="w-4 h-4 text-purple-600" />,
      defaultTitle: '📝 All India CBT Benchmark Mock Test 04 is Live!',
      defaultMessage: 'Test window open for 48 hours. Attempt now to receive All India Rank (AIR) & percentile breakdown.',
      actionTarget: 'cbt_test'
    },
    {
      type: 'result',
      label: 'Results & AIR',
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      defaultTitle: '🏆 CBT Mock Test 03 Results & Detailed Analysis Published',
      defaultMessage: 'Your performance analytics, speed-accuracy matrix, and chapter weakness heatmaps are ready.',
      actionTarget: 'cbt_test'
    },
    {
      type: 'assignment',
      label: 'Assignment Evaluation',
      icon: <ClipboardList className="w-4 h-4 text-teal-600" />,
      defaultTitle: '📋 Assignment Graded: Organic Synthesis Practice Set 2',
      defaultMessage: 'Faculty has graded your assignment: 48/50. Detailed step-by-step annotation feedback attached.',
      actionTarget: 'assignments'
    },
    {
      type: 'doubt_response',
      label: 'Doubt Resolved',
      icon: <HelpCircle className="w-4 h-4 text-cyan-600" />,
      defaultTitle: '💡 Faculty Responded to Your Physics Doubt',
      defaultMessage: 'Er. Rajeshwar Varma posted a comprehensive step-by-step derivation for question #204.',
      actionTarget: 'doubts'
    },
    {
      type: 'certificate',
      label: 'Certificate Issued',
      icon: <Award className="w-4 h-4 text-yellow-600" />,
      defaultTitle: '🎓 Verified Certificate of Mastery Generated!',
      defaultMessage: 'Congratulations on completing your syllabus with 94% aggregate score. Download your certificate.',
      actionTarget: 'certificates'
    },
    {
      type: 'offers',
      label: 'Scholarship Offer',
      icon: <Tag className="w-4 h-4 text-orange-600" />,
      defaultTitle: '🔥 35% Early Bird Scholarship Voucher: MAXWELL35',
      defaultMessage: 'Special festive discount is now unlocked for all courses and combo test series packages!',
      actionTarget: 'store'
    },
    {
      type: 'registration',
      label: 'Welcome / Registration',
      icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
      defaultTitle: '🎉 Welcome to DC Maxwell Academy!',
      defaultMessage: 'Your student account is active. Explore your personalized study dashboard and attend free demo lessons.',
      actionTarget: 'student_portal'
    },
    {
      type: 'course_purchase',
      label: 'Course Purchase',
      icon: <ShoppingBag className="w-4 h-4 text-indigo-600" />,
      defaultTitle: '💳 Payment Successful: Invoice #INV-2026-9041 Generated',
      defaultMessage: 'Thank you for enrolling in JEE Advanced Pinnacle 2026 Batch. Your invoice is available in billing.',
      actionTarget: 'invoices'
    },
    {
      type: 'course_activation',
      label: 'Course Activation',
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      defaultTitle: '⚡ Course Activated: 1-Year Full Access Unlocked',
      defaultMessage: 'All video lectures, PDF notes vault, test series, and 24/7 doubt resolution features are now enabled.',
      actionTarget: 'courses'
    },
    {
      type: 'announcements',
      label: 'General Announcement',
      icon: <Megaphone className="w-4 h-4 text-indigo-600" />,
      defaultTitle: '📢 Academy Advisory: Server Maintenance at 2 AM',
      defaultMessage: 'We will be upgrading video streaming nodes tonight from 2:00 AM to 3:00 AM IST.',
      actionTarget: 'student_portal'
    }
  ];

  const handleApplyPreset = (preset: typeof notificationPresets[0]) => {
    setSelectedType(preset.type);
    setTitle(preset.defaultTitle);
    setMessage(preset.defaultMessage);
    setActionTarget(preset.actionTarget);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    sendBroadcastNotification({
      title: title.trim(),
      message: message.trim(),
      type: selectedType,
      category: selectedType,
      actionTarget
    });

    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Bell className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Omnichannel Notification Dispatcher
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Broadcast real-time push and in-app alerts across all 12 academic categories with deep-linking navigation.
          </p>
        </div>

        {isSuccessToast && (
          <div className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Notification broadcasted successfully to all students!</span>
          </div>
        )}
      </div>

      {/* 12-Category Preset Templates Strip */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Quick 1-Click Templates (12 Academic Categories)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {notificationPresets.map((preset) => (
            <button
              key={preset.type}
              id={`preset-template-${preset.type}`}
              onClick={() => handleApplyPreset(preset)}
              className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                selectedType === preset.type
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-2xs'
                  : 'border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-white shadow-2xs shrink-0 border border-slate-100">
                {preset.icon}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800 line-clamp-1 block">
                  {preset.label}
                </span>
                <span className="text-[10px] text-slate-400 capitalize truncate block">
                  {preset.type.replace('_', ' ')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dispatcher Form & Mobile Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>Compose Notification Broadcast</span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full capitalize">
              {selectedType.replace('_', ' ')}
            </span>
          </h3>

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notification Category (12 Types)
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-indigo-500"
                >
                  <option value="live_class">Live Class</option>
                  <option value="new_video">New Video</option>
                  <option value="test">Test Series</option>
                  <option value="result">Exam Result</option>
                  <option value="assignment">Assignment</option>
                  <option value="doubt_response">Doubt Response</option>
                  <option value="certificate">Certificate</option>
                  <option value="offers">Special Offer</option>
                  <option value="registration">Registration</option>
                  <option value="course_purchase">Course Purchase</option>
                  <option value="course_activation">Course Activation</option>
                  <option value="announcements">Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Student Audience
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-indigo-500"
                >
                  <option value="all">All Registered Students (3,850)</option>
                  <option value="enrolled_jee">JEE Pinnacle Batches (1,420)</option>
                  <option value="enrolled_neet">NEET Vision Batches (980)</option>
                  <option value="enrolled_ca">CA Foundation & Inter (750)</option>
                  <option value="wishlist_leads">Students with Wishlist Items (620)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notification Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notification Body / Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Deep-Linking Target View
              </label>
              <select
                value={actionTarget}
                onChange={(e) => setActionTarget(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-indigo-500"
              >
                <option value="live_classes">Live Classes Screen</option>
                <option value="cbt_test">CBT Mock Test & Results Screen</option>
                <option value="courses">Course Player / Video Screen</option>
                <option value="doubts">Doubt Clearing Desk</option>
                <option value="assignments">Assignments Desk</option>
                <option value="certificates">Certificate Verification Vault</option>
                <option value="store">Store / Scholarship Offers</option>
                <option value="student_portal">Student Learning Dashboard</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                id="send-broadcast-notification-btn"
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Notification Now</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Phone Mockup Preview */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-3xl p-4 shadow-xl border-4 border-slate-800 sticky top-24 text-white">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pb-3 border-b border-slate-800">
              <span className="font-semibold">Live Push Preview</span>
              <Smartphone className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="mt-4 p-3 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-lg space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5 font-bold text-indigo-400">
                  <Bell className="w-3 h-3" />
                  <span>DC Maxwell Academy</span>
                </div>
                <span>Just now</span>
              </div>

              <div className="text-xs font-bold text-white">
                {title || 'Notification Headline'}
              </div>

              <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                {message || 'Notification description text goes here...'}
              </p>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-indigo-300 font-medium">
                <span>Tap to view {actionTarget.replace('_', ' ')}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-4">
              Real-time synchronization with Android & iOS mobile app status bar.
            </p>
          </div>
        </div>
      </div>

      {/* Sent Notifications Log */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Platform Notifications Log</h3>
            <p className="text-xs text-slate-500">Live feed of all {notifications.length} recent system notifications</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{notifications.length} Total</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {notifications.map((notif) => (
            <div key={notif.id} className="py-3 flex items-start justify-between gap-3 group">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                  {(notif.type || notif.category || 'General').replace('_', ' ')}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{notif.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" /> {notif.time}
                </span>
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                  title="Delete notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
