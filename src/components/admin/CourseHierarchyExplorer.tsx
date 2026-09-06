import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Chapter, Lesson, CourseCategory } from '../../types';
import {
  Layers,
  BookOpen,
  FolderKanban,
  Video,
  FileText,
  Clock,
  Play,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight,
  Shield,
  Sparkles,
  Search,
  Filter,
  Eye,
  Check
} from 'lucide-react';

export const CourseHierarchyExplorer: React.FC = () => {
  const { courses, setCourses, setActiveVideoLesson } = useApp();

  // All distinct categories
  const categories: CourseCategory[] = [
    'CA Foundation',
    'CA & Commerce (Foundation/Inter)',
    'JEE (Main & Adv)',
    'NEET (Medical)',
    'UPSC & Civil Services',
    'Class 11-12 Boards',
    'Foundation (9-10th)',
    'Tech & Data Science'
  ];

  // Hierarchy selections
  const [selectedCategory, setSelectedCategory] = useState<string>('CA Foundation');
  
  // Courses in category
  const filteredCourses = courses.filter(
    (c) => c.category === selectedCategory || (selectedCategory === 'CA Foundation' && c.category === 'CA & Commerce (Foundation/Inter)')
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    filteredCourses[0]?.id || courses[0]?.id || ''
  );

  // Active course
  const activeCourse = courses.find((c) => c.id === selectedCourseId) || filteredCourses[0] || courses[0];

  // Batch
  const [selectedBatch, setSelectedBatch] = useState<string>(
    activeCourse?.batchName || 'Achievers Alpha Dec 2026 Batch'
  );

  // Derive all distinct subjects from the course chapters
  const allSubjects = Array.from(
    new Set(activeCourse?.chapters.map((ch) => ch.subject).filter(Boolean))
  ) as string[];

  const defaultSubject = allSubjects.length > 0 ? allSubjects[0] : 'Accounts';
  const [selectedSubject, setSelectedSubject] = useState<string>(defaultSubject);

  // Filter chapters by selected subject
  const subjectChapters = activeCourse?.chapters.filter((ch) => ch.subject === selectedSubject) || [];
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    subjectChapters[0]?.id || activeCourse?.chapters[0]?.id || ''
  );

  const activeChapter = activeCourse?.chapters.find((ch) => ch.id === selectedChapterId) || subjectChapters[0] || activeCourse?.chapters[0];

  // Active lecture
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    activeChapter?.lessons[0]?.id || ''
  );
  const activeLesson = activeChapter?.lessons.find((l) => l.id === selectedLessonId) || activeChapter?.lessons[0];

  // Modals for adding
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [newLectureTitle, setNewLectureTitle] = useState('');
  const [newLectureDuration, setNewLectureDuration] = useState(60);
  const [newLectureVideoUrl, setNewLectureVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [newLectureNotesTitle, setNewLectureNotesTitle] = useState('');
  const [newLectureIsFree, setNewLectureIsFree] = useState(false);
  const [newLectureSummary, setNewLectureSummary] = useState('');

  // Handle adding a new subject
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim() || !activeCourse) return;

    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      subject: newSubjectName.trim(),
      title: `Chapter 1: Foundations of ${newSubjectName.trim()}`,
      lessons: [
        {
          id: `les-${Date.now()}`,
          title: `Lecture 1: Comprehensive Introduction to ${newSubjectName.trim()}`,
          durationMinutes: 45,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          isFreePreview: true,
          summary: 'Foundational concepts, syllabus mapping and core examination blueprints.'
        }
      ]
    };

    const updatedCourses = courses.map((c) => {
      if (c.id === activeCourse.id) {
        return {
          ...c,
          chapters: [...c.chapters, newChapter]
        };
      }
      return c;
    });

    setCourses(updatedCourses);
    setSelectedSubject(newSubjectName.trim());
    setSelectedChapterId(newChapter.id);
    setSelectedLessonId(newChapter.lessons[0].id);
    setShowAddSubjectModal(false);
    setNewSubjectName('');
  };

  // Handle adding a new chapter
  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim() || !activeCourse) return;

    const nextChapterNum = (subjectChapters.length || 0) + 1;
    const formattedTitle = newChapterTitle.startsWith('Chapter')
      ? newChapterTitle
      : `Chapter ${nextChapterNum}: ${newChapterTitle.trim()}`;

    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      subject: selectedSubject,
      title: formattedTitle,
      lessons: [
        {
          id: `les-${Date.now()}`,
          title: `Lecture 1: Core Fundamentals & Principles`,
          durationMinutes: 50,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          isFreePreview: true,
          summary: 'Key theories, exam derivations, and practical question setups.'
        }
      ]
    };

    const updatedCourses = courses.map((c) => {
      if (c.id === activeCourse.id) {
        return {
          ...c,
          chapters: [...c.chapters, newChapter]
        };
      }
      return c;
    });

    setCourses(updatedCourses);
    setSelectedChapterId(newChapter.id);
    setSelectedLessonId(newChapter.lessons[0].id);
    setShowAddChapterModal(false);
    setNewChapterTitle('');
  };

  // Handle adding a new lecture
  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLectureTitle.trim() || !activeCourse || !activeChapter) return;

    const nextLectureNum = (activeChapter.lessons.length || 0) + 1;
    const formattedTitle = newLectureTitle.startsWith('Lecture')
      ? newLectureTitle
      : `Lecture ${nextLectureNum}: ${newLectureTitle.trim()}`;

    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      title: formattedTitle,
      durationMinutes: Number(newLectureDuration) || 60,
      videoUrl: newLectureVideoUrl.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      isFreePreview: newLectureIsFree,
      notesPdfTitle: newLectureNotesTitle.trim() || `${formattedTitle.replace(/\s+/g, '_')}_Notes.pdf`,
      notesPdfUrl: '#',
      summary: newLectureSummary.trim() || 'Comprehensive in-depth lecture addressing curriculum requirements and question solving.'
    };

    const updatedCourses = courses.map((c) => {
      if (c.id === activeCourse.id) {
        return {
          ...c,
          chapters: c.chapters.map((ch) => {
            if (ch.id === activeChapter.id) {
              return {
                ...ch,
                lessons: [...ch.lessons, newLesson]
              };
            }
            return ch;
          })
        };
      }
      return c;
    });

    setCourses(updatedCourses);
    setSelectedLessonId(newLesson.id);
    setShowAddLectureModal(false);
    setNewLectureTitle('');
    setNewLectureSummary('');
    setNewLectureNotesTitle('');
  };

  // Delete lecture
  const handleDeleteLecture = (lessonId: string) => {
    if (!activeCourse || !activeChapter) return;
    const updatedCourses = courses.map((c) => {
      if (c.id === activeCourse.id) {
        return {
          ...c,
          chapters: c.chapters.map((ch) => {
            if (ch.id === activeChapter.id) {
              return {
                ...ch,
                lessons: ch.lessons.filter((l) => l.id !== lessonId)
              };
            }
            return ch;
          })
        };
      }
      return c;
    });
    setCourses(updatedCourses);
  };

  // Toggle Free Preview
  const handleToggleFreePreview = (lessonId: string) => {
    if (!activeCourse || !activeChapter) return;
    const updatedCourses = courses.map((c) => {
      if (c.id === activeCourse.id) {
        return {
          ...c,
          chapters: c.chapters.map((ch) => {
            if (ch.id === activeChapter.id) {
              return {
                ...ch,
                lessons: ch.lessons.map((l) => {
                  if (l.id === lessonId) {
                    return { ...l, isFreePreview: !l.isFreePreview };
                  }
                  return l;
                })
              };
            }
            return ch;
          })
        };
      }
      return c;
    });
    setCourses(updatedCourses);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Explaining Course Hierarchy */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-indigo-900/50 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/20 flex items-center gap-1">
                <FolderKanban className="w-3 h-3 text-indigo-400" /> 6-Level Course Management Hierarchy
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Unlimited Courses Supported
              </span>
            </div>
            <h2 className="text-xl font-bold font-serif mt-2">Course Hierarchy Explorer & Manager</h2>
            <p className="text-xs text-slate-300 mt-1">
              Organize, navigate, and manage unlimited courses through the strict 6-tier academic taxonomy:
            </p>
          </div>

          {/* User's Exact Example Highlighted */}
          <div className="bg-indigo-900/60 border border-indigo-500/40 rounded-2xl p-3.5 text-xs max-w-md w-full">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Specified Hierarchy Example
            </div>
            <div className="font-mono text-[11px] text-slate-200 flex flex-wrap items-center gap-1 font-semibold">
              <span className="bg-indigo-700/80 px-1.5 py-0.5 rounded text-white">CA Foundation</span>
              <span>&rarr;</span>
              <span className="bg-indigo-700/80 px-1.5 py-0.5 rounded text-white">Accounts</span>
              <span>&rarr;</span>
              <span className="bg-indigo-700/80 px-1.5 py-0.5 rounded text-white">Chapter 1</span>
              <span>&rarr;</span>
              <span className="bg-emerald-700/80 px-1.5 py-0.5 rounded text-white">Lecture 1</span>
              <span>&rarr;</span>
              <span className="bg-emerald-700/80 px-1.5 py-0.5 rounded text-white">Lecture 2</span>
            </div>
          </div>
        </div>

        {/* Dynamic Breadcrumbs Pipeline */}
        <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <div className="flex items-center gap-1 text-indigo-300 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">1. Category:</span>
            <strong className="text-white bg-indigo-600 px-2 py-0.5 rounded">{selectedCategory}</strong>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />

          <div className="flex items-center gap-1 text-indigo-300 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">2. Course:</span>
            <strong className="text-white bg-indigo-600/80 px-2 py-0.5 rounded truncate max-w-[160px]">{activeCourse?.title}</strong>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />

          <div className="flex items-center gap-1 text-indigo-300 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">3. Batch:</span>
            <strong className="text-white bg-indigo-600/60 px-2 py-0.5 rounded truncate max-w-[140px]">{selectedBatch}</strong>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />

          <div className="flex items-center gap-1 text-indigo-300 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">4. Subject:</span>
            <strong className="text-white bg-indigo-600/50 px-2 py-0.5 rounded">{selectedSubject}</strong>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />

          <div className="flex items-center gap-1 text-indigo-300 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">5. Chapter:</span>
            <strong className="text-white bg-indigo-600/40 px-2 py-0.5 rounded truncate max-w-[150px]">{activeChapter?.title}</strong>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />

          <div className="flex items-center gap-1 text-emerald-300 shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-400">6. Lecture:</span>
            <strong className="text-white bg-emerald-600 px-2 py-0.5 rounded truncate max-w-[160px]">
              {activeLesson?.title || 'Lecture 1'}
            </strong>
          </div>
        </div>
      </div>

      {/* 6-Level Interactive Hierarchy Multi-Column Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
        
        {/* Column 1: Category & Course (md:col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5 text-indigo-600" /> 1. Categories ({categories.length})
              </h4>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const matching = courses.filter((c) => c.category === cat);
                    if (matching.length > 0) {
                      setSelectedCourseId(matching[0].id);
                    }
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl transition cursor-pointer font-medium flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> 2. Courses ({filteredCourses.length})
              </h4>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {filteredCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCourseId(c.id);
                    setSelectedBatch(c.batchName || 'Default Batch');
                    if (c.chapters[0]?.subject) {
                      setSelectedSubject(c.chapters[0].subject);
                    }
                    if (c.chapters[0]?.id) {
                      setSelectedChapterId(c.chapters[0].id);
                    }
                  }}
                  className={`w-full text-left p-2 rounded-xl transition cursor-pointer border ${
                    selectedCourseId === c.id
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="line-clamp-2 text-xs leading-snug">{c.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-normal">
                    <span>₹{c.price.toLocaleString()}</span>
                    <span>{c.chapters.length} Chapters</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Batch & Subject (md:col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" /> 3. Batch
              </h4>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 space-y-1">
              <div className="font-bold text-indigo-950">{selectedBatch}</div>
              <div className="text-[10px] text-slate-500">
                Timing: 7:00 AM - 10:30 AM &bull; Mon-Sat Live
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" /> 4. Subjects ({allSubjects.length})
              </h4>
              <button
                type="button"
                onClick={() => setShowAddSubjectModal(true)}
                className="px-2 py-0.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Subject
              </button>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {allSubjects.map((sub) => {
                const count = activeCourse?.chapters.filter((ch) => ch.subject === sub).length || 0;
                return (
                  <button
                    key={sub}
                    onClick={() => {
                      setSelectedSubject(sub);
                      const firstCh = activeCourse?.chapters.find((ch) => ch.subject === sub);
                      if (firstCh) {
                        setSelectedChapterId(firstCh.id);
                        setSelectedLessonId(firstCh.lessons[0]?.id || '');
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition cursor-pointer font-medium flex items-center justify-between border ${
                      selectedSubject === sub
                        ? 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      selectedSubject === sub ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count} Chapters
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 3: Chapters (md:col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-600" /> 5. Chapters ({subjectChapters.length})
            </h4>
            <button
              type="button"
              onClick={() => setShowAddChapterModal(true)}
              className="px-2 py-0.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add Chapter
            </button>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {subjectChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterId(ch.id);
                  if (ch.lessons[0]) {
                    setSelectedLessonId(ch.lessons[0].id);
                  }
                }}
                className={`w-full text-left p-2.5 rounded-xl transition cursor-pointer border ${
                  selectedChapterId === ch.id
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="line-clamp-2 text-xs leading-snug">{ch.title}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-normal">
                  <span>{ch.lessons.length} Lectures</span>
                  <span className="text-indigo-600 font-bold">Select &rarr;</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Column 4: Lectures in Chapter (md:col-span-3) */}
        <div className="md:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-emerald-600" /> 6. Lectures ({activeChapter?.lessons.length || 0})
            </h4>
            <button
              type="button"
              onClick={() => setShowAddLectureModal(true)}
              className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add Lecture
            </button>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {activeChapter?.lessons.map((les) => (
              <div
                key={les.id}
                className={`p-2.5 rounded-xl border transition ${
                  selectedLessonId === les.id
                    ? 'bg-emerald-50/80 border-emerald-300 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div
                    onClick={() => setSelectedLessonId(les.id)}
                    className="font-bold text-xs cursor-pointer flex-1"
                  >
                    {les.title}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteLecture(les.id)}
                    className="text-slate-400 hover:text-rose-600 p-0.5"
                    title="Delete Lecture"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2 text-[10px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {les.durationMinutes} mins
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleFreePreview(les.id)}
                    className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                      les.isFreePreview
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {les.isFreePreview ? 'Demo Video (Free)' : 'Locked (Paid)'}
                  </button>
                </div>

                {/* Direct Play/Preview Button */}
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeCourse) {
                        setActiveVideoLesson({ course: activeCourse, lesson: les });
                      }
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-indigo-600" /> Preview Video
                  </button>
                  {les.notesPdfTitle && (
                    <span className="text-[10px] text-slate-400 truncate max-w-[100px]">
                      {les.notesPdfTitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Selected Lecture Video Preview & Metadata Panel */}
      {activeLesson && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                  Active Lecture Inspection
                </span>
                <span className="text-xs text-slate-500">{selectedSubject} &bull; {activeChapter?.title}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">{activeLesson.title}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (activeCourse) {
                    setActiveVideoLesson({ course: activeCourse, lesson: activeLesson });
                  }
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Launch Fullscreen Player
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="md:col-span-2 bg-slate-950 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center">
              <video
                src={activeLesson.videoUrl}
                controls
                className="w-full h-full object-contain"
                poster={activeCourse?.thumbnail}
              />
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Lecture Deliverables</h4>
              
              <div>
                <span className="text-slate-500 font-medium">Lecture Summary:</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed text-xs">
                  {activeLesson.summary || 'Essential theoretical foundations and problem solving procedures.'}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Class Duration:</span>
                <div className="text-slate-800 font-bold mt-0.5">{activeLesson.durationMinutes} Minutes</div>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Study Material PDF:</span>
                <div className="text-indigo-600 font-bold mt-0.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  {activeLesson.notesPdfTitle || 'CA_Accounts_LectureNotes.pdf'}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Access Permission:</span>
                <div className="mt-0.5">
                  {activeLesson.isFreePreview ? (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                      Free Preview (Public Demo Video)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-bold text-[10px]">
                      Protected (Enrolled Students Only)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Subject */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Add New Academic Subject</h3>
            <p className="text-xs text-slate-500">
              Create a new subject inside <strong>{activeCourse?.title}</strong>
            </p>

            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="e.g. Accounts / Corporate Law / Costing"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Chapter */}
      {showAddChapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Add New Chapter</h3>
            <p className="text-xs text-slate-500">
              Add chapter under Subject: <strong>{selectedSubject}</strong>
            </p>

            <form onSubmit={handleAddChapter} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chapter Title *</label>
                <input
                  type="text"
                  required
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  placeholder="e.g. Chapter 3: Special Transactions & Consignment"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddChapterModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  Create Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Lecture */}
      {showAddLectureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-900 font-serif">Add New Lecture</h3>
            <p className="text-xs text-slate-500">
              Under <strong>{selectedSubject}</strong> &rarr; <strong>{activeChapter?.title}</strong>
            </p>

            <form onSubmit={handleAddLecture} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lecture Title *</label>
                <input
                  type="text"
                  required
                  value={newLectureTitle}
                  onChange={(e) => setNewLectureTitle(e.target.value)}
                  placeholder="e.g. Lecture 3: Journal Entries & Adjustments"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes) *</label>
                  <input
                    type="number"
                    required
                    value={newLectureDuration}
                    onChange={(e) => setNewLectureDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Free Demo Preview?</label>
                  <select
                    value={newLectureIsFree ? 'true' : 'false'}
                    onChange={(e) => setNewLectureIsFree(e.target.value === 'true')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="false">Paid / Enrolled Only</option>
                    <option value="true">Free Demo Video (Public)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Video Stream URL *</label>
                <input
                  type="url"
                  required
                  value={newLectureVideoUrl}
                  onChange={(e) => setNewLectureVideoUrl(e.target.value)}
                  placeholder="https://commondatastorage.googleapis.com/...mp4"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Study Material PDF Title</label>
                <input
                  type="text"
                  value={newLectureNotesTitle}
                  onChange={(e) => setNewLectureNotesTitle(e.target.value)}
                  placeholder="e.g. Chapter1_ClassNotes_Handwritten.pdf"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lecture Description / Summary</label>
                <textarea
                  rows={2}
                  value={newLectureSummary}
                  onChange={(e) => setNewLectureSummary(e.target.value)}
                  placeholder="Key concepts, formulas, and homework questions covered..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLectureModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md"
                >
                  Save Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
