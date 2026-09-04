import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformNotification, PlatformNotificationType } from '../../types';
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  BookOpen,
  ShoppingBag,
  Sparkles,
  Video,
  Radio,
  FileQuestion,
  Trophy,
  ClipboardList,
  HelpCircle,
  Award,
  Tag,
  Megaphone,
  UserCheck,
  ExternalLink,
  Clock,
  Filter
} from 'lucide-react';

export const NotificationCenterModal: React.FC = () => {
  const {
    isNotificationModalOpen,
    setIsNotificationModalOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    setView,
    setSelectedCourseForDetail,
    setActiveLiveClass,
    setActiveTest
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<'all' | 'academic' | 'tests' | 'doubts' | 'offers'>('all');

  if (!isNotificationModalOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: PlatformNotificationType) => {
    switch (type) {
      case 'registration':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'course_purchase':
        return <ShoppingBag className="w-4 h-4 text-indigo-600" />;
      case 'course_activation':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'new_video':
        return <Video className="w-4 h-4 text-blue-600" />;
      case 'live_class':
        return <Radio className="w-4 h-4 text-rose-600" />;
      case 'test':
        return <FileQuestion className="w-4 h-4 text-purple-600" />;
      case 'result':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'assignment':
        return <ClipboardList className="w-4 h-4 text-teal-600" />;
      case 'doubt_response':
        return <HelpCircle className="w-4 h-4 text-cyan-600" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-yellow-600" />;
      case 'offers':
        return <Tag className="w-4 h-4 text-orange-600" />;
      case 'announcements':
      default:
        return <Megaphone className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getNotificationBg = (type: PlatformNotificationType) => {
    switch (type) {
      case 'registration':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'course_purchase':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'course_activation':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'new_video':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'live_class':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'test':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'result':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'assignment':
        return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'doubt_response':
        return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      case 'certificate':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'offers':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'announcements':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'academic') {
      return ['registration', 'course_purchase', 'course_activation', 'new_video', 'live_class', 'certificate'].includes(notif.type || notif.category || '');
    }
    if (filterCategory === 'tests') {
      return ['test', 'result'].includes(notif.type || notif.category || '');
    }
    if (filterCategory === 'doubts') {
      return ['doubt_response', 'assignment'].includes(notif.type || notif.category || '');
    }
    if (filterCategory === 'offers') {
      return ['offers', 'announcements'].includes(notif.type || notif.category || '');
    }
    return true;
  });

  const handleNotificationClick = (notif: PlatformNotification) => {
    markNotificationRead(notif.id);
    setIsNotificationModalOpen(false);

    if (notif.actionTarget === 'live_class' || notif.type === 'live_class') {
      setView('live_classes');
    } else if (notif.actionTarget === 'cbt_test' || notif.actionTarget === 'test_result' || notif.type === 'test' || notif.type === 'result') {
      setView('cbt_exam');
    } else if (notif.actionTarget === 'doubt_forum' || notif.type === 'doubt_response') {
      setView('student_portal');
    } else if (notif.actionTarget === 'certificate' || notif.type === 'certificate') {
      setView('student_portal');
    } else if (notif.actionTarget === 'store' || notif.actionTarget === 'subscription' || notif.type === 'offers') {
      setView('store');
    } else {
      setView('student_portal');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-6 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifications & Alerts</h3>
              <p className="text-[11px] text-slate-500">{unreadCount} unread announcements</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                id="mark-all-read-btn"
                onClick={markAllNotificationsRead}
                className="p-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:bg-indigo-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Read All</span>
              </button>
            )}
            <button
              id="close-notifications-modal-btn"
              onClick={() => setIsNotificationModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 12-Category Filter Bar */}
        <div className="px-3 py-2 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'academic', label: 'Academic & Live' },
            { id: 'tests', label: 'Tests & Results' },
            { id: 'doubts', label: 'Doubts & Tasks' },
            { id: 'offers', label: 'Offers & News' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* List of Notifications */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 divide-y divide-slate-100">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No notifications in this category</p>
              <p className="text-[11px] text-slate-400">You're all caught up with your academic schedule.</p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                id={`notification-card-${item.id}`}
                onClick={() => handleNotificationClick(item)}
                className={`pt-2.5 pb-2.5 px-3 rounded-xl transition cursor-pointer group flex items-start gap-3 relative border ${
                  item.read
                    ? 'bg-white border-transparent hover:bg-slate-50'
                    : 'bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50'
                }`}
              >
                {/* Status Dot */}
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-3.5 right-3 ring-4 ring-indigo-100 animate-pulse" />
                )}

                {/* Category Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${getNotificationBg(item.type || (item.category as any) || 'announcements')}`}>
                  {getNotificationIcon(item.type || (item.category as any) || 'announcements')}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {(item.type || item.category || 'Notification').replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" /> {item.time}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {item.message}
                  </p>

                  {item.actionTarget && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
                      <span>View details</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Delete button */}
                <button
                  id={`delete-notif-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded-md transition cursor-pointer self-start"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="text-[11px] font-medium text-slate-500">
            Total {notifications.length} notifications logged
          </span>
          <button
            onClick={() => markAllNotificationsRead()}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
          >
            Clear Unread
          </button>
        </div>
      </div>
    </div>
  );
};
