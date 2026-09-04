import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { GlobalSearchCategory, GlobalSearchResult } from '../../types';
import {
  Search,
  X,
  BookOpen,
  Layers,
  Video,
  UserCheck,
  Award,
  FileText,
  Bookmark,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Clock,
  Star,
  CheckCircle2,
  TrendingUp,
  Tag
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    performGlobalSearch,
    handleGlobalSearchResultClick,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [activeCategory, setActiveCategory] = useState<GlobalSearchCategory>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external search query if opened
  useEffect(() => {
    if (isGlobalSearchOpen) {
      setLocalQuery(searchQuery || '');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isGlobalSearchOpen, searchQuery]);

  // Global Keyboard Listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isGlobalSearchOpen) {
        setIsGlobalSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGlobalSearchOpen, setIsGlobalSearchOpen]);

  const results = useMemo(() => {
    return performGlobalSearch(localQuery, activeCategory);
  }, [localQuery, activeCategory, performGlobalSearch]);

  const categories: { id: GlobalSearchCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Results', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'subjects', label: 'Subjects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'faculty', label: 'Faculty', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'test_series', label: 'Test Series', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'study_material', label: 'Study Material', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'chapters', label: 'Chapters', icon: <Bookmark className="w-3.5 h-3.5" /> }
  ];

  const popularSearches = [
    'Electrostatics',
    'Organic Chemistry',
    'Corporate Law',
    'CBT Mock Test 01',
    'Er. Rajeshwar Varma',
    'Ind AS Formula Sheet',
    'Partnership Accounts',
    'Calculus'
  ];

  const getCategoryBadge = (cat: GlobalSearchCategory) => {
    switch (cat) {
      case 'courses':
        return <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><BookOpen className="w-3 h-3" /> Course</span>;
      case 'subjects':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Layers className="w-3 h-3" /> Subject</span>;
      case 'videos':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Video className="w-3 h-3" /> Video</span>;
      case 'faculty':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><UserCheck className="w-3 h-3" /> Faculty</span>;
      case 'test_series':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Award className="w-3 h-3" /> Test Series</span>;
      case 'study_material':
        return <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><FileText className="w-3 h-3" /> Material</span>;
      case 'chapters':
        return <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"><Bookmark className="w-3 h-3" /> Chapter</span>;
      default:
        return null;
    }
  };

  const highlightMatch = (text: string = '', query: string) => {
    if (!query.trim() || !text) return text;
    const parts = text.split(new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-slate-900 font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (!isGlobalSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-indigo-600 shrink-0 ml-1" />
          <input
            ref={inputRef}
            id="spotlight-global-search-input"
            type="text"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search across Courses, Subjects, Videos, Faculty, Tests, Materials & Chapters..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {localQuery && (
            <button
              onClick={() => {
                setLocalQuery('');
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1.5 shrink-0 border-l border-slate-200 pl-3">
            <kbd className="hidden sm:inline-block px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-mono text-slate-500 shadow-xs">
              ESC
            </kbd>
            <button
              id="close-spotlight-search-btn"
              onClick={() => setIsGlobalSearchOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 7 Filter Category Chips */}
        <div className="px-4 py-2.5 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const count = cat.id === 'all' 
              ? performGlobalSearch(localQuery, 'all').length 
              : performGlobalSearch(localQuery, cat.id).length;

            return (
              <button
                key={cat.id}
                id={`search-filter-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {localQuery.trim() && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeCategory === cat.id ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {!localQuery.trim() ? (
            <div className="py-8 px-4 text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Global Academy Search</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                Instantly search across <strong className="text-slate-700">Courses</strong>, <strong className="text-slate-700">Subjects</strong>, <strong className="text-slate-700">Video Lessons</strong>, <strong className="text-slate-700">Faculty Mentors</strong>, <strong className="text-slate-700">Test Series</strong>, <strong className="text-slate-700">Study Materials</strong>, and <strong className="text-slate-700">Syllabus Chapters</strong>.
              </p>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> Popular & Trending Searches
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setLocalQuery(term);
                        setSearchQuery(term);
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-slate-200 rounded-full text-xs font-medium text-slate-700 transition cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <X className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">No Results Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any match for "<strong className="text-slate-700">{localQuery}</strong>" in{' '}
                <span className="capitalize">{activeCategory.replace('_', ' ')}</span>. Try refining your keywords or switching category filters.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {results.length} Matches Found
                </span>
                <span className="text-[11px] text-slate-400">Click result to open</span>
              </div>

              {results.map((item) => (
                <div
                  key={item.id}
                  id={`search-result-item-${item.id}`}
                  onClick={() => handleGlobalSearchResultClick(item)}
                  className="p-3 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-indigo-300 rounded-xl transition cursor-pointer group flex items-start justify-between gap-3 shadow-2xs hover:shadow-sm"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        {item.category === 'courses' && <BookOpen className="w-5 h-5" />}
                        {item.category === 'subjects' && <Layers className="w-5 h-5" />}
                        {item.category === 'videos' && <Video className="w-5 h-5" />}
                        {item.category === 'faculty' && <UserCheck className="w-5 h-5" />}
                        {item.category === 'test_series' && <Award className="w-5 h-5" />}
                        {item.category === 'study_material' && <FileText className="w-5 h-5" />}
                        {item.category === 'chapters' && <Bookmark className="w-5 h-5" />}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {getCategoryBadge(item.category)}
                        {item.tag && (
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                        )}
                        {item.rating && (
                          <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition truncate">
                        {highlightMatch(item.title, localQuery)}
                      </h4>

                      {item.subtitle && (
                        <p className="text-[11px] font-medium text-slate-500 truncate mb-1">
                          {highlightMatch(item.subtitle, localQuery)}
                        </p>
                      )}

                      {item.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {highlightMatch(item.description, localQuery)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Link & Price */}
                  <div className="flex flex-col items-end shrink-0 justify-between self-stretch">
                    {item.price !== undefined && (
                      <span className="text-xs font-bold text-slate-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    )}
                    {item.duration && (
                      <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </span>
                    )}
                    <div className="mt-auto pt-2 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3 bg-slate-100/80 border-t border-slate-200 text-slate-500 text-xs flex items-center justify-between px-4">
          <div className="flex items-center gap-4 text-[11px]">
            <span><kbd className="bg-white px-1.5 py-0.5 border border-slate-300 rounded font-mono text-[10px]">↑</kbd> <kbd className="bg-white px-1.5 py-0.5 border border-slate-300 rounded font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="bg-white px-1.5 py-0.5 border border-slate-300 rounded font-mono text-[10px]">↵</kbd> to select</span>
            <span><kbd className="bg-white px-1.5 py-0.5 border border-slate-300 rounded font-mono text-[10px]">ESC</kbd> to dismiss</span>
          </div>
          <span className="text-[11px] text-indigo-700 font-medium">DC Maxwell Global Search Engine</span>
        </div>
      </div>
    </div>
  );
};
