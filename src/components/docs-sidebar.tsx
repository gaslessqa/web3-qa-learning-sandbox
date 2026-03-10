'use client';

import Link from 'next/link';
import { useState } from 'react';

type SidebarLesson = {
  id: string;
  slug: string;
  title: string;
  order: number;
};

type SidebarModule = {
  id: string;
  slug: string;
  title: string;
  level: string;
  order: number;
  lessons: SidebarLesson[];
};

type Props = {
  modules: SidebarModule[];
  currentSlug: string;
};

const LEVEL_ORDER: Record<string, number> = { beginner: 1, intermediate: 2, expert: 3 };

const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
};

const LEVEL_COLOR: Record<string, string> = {
  beginner: 'text-green-400',
  intermediate: 'text-yellow-400',
  expert: 'text-red-400',
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function DocsSidebar({ modules, currentSlug }: Props) {
  // Find the module that contains the active lesson so we can open it by default
  const activeModuleId = modules.find(m => m.lessons.some(l => l.slug === currentSlug))?.id ?? null;

  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set(activeModuleId ? [activeModuleId] : [])
  );

  function toggleModule(id: string) {
    setOpenModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Group by level, preserve level order
  const levels = Array.from(new Set(modules.map(m => m.level))).sort(
    (a, b) => (LEVEL_ORDER[a] ?? 99) - (LEVEL_ORDER[b] ?? 99)
  );

  return (
    <nav className="w-full" aria-label="Docs sidebar">
      {levels.map(level => {
        const levelModules = modules
          .filter(m => m.level === level)
          .sort((a, b) => a.order - b.order);

        return (
          <div key={level} className="mb-5">
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-2 px-2 ${LEVEL_COLOR[level] ?? 'text-gray-400'}`}
            >
              {LEVEL_LABEL[level] ?? level}
            </p>

            {levelModules.map(mod => {
              const isOpen = openModules.has(mod.id);

              return (
                <div key={mod.id} className="mb-1">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition"
                  >
                    <span className="text-left font-medium truncate">{mod.title}</span>
                    <ChevronIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <ul className="mt-0.5 ml-3 border-l border-gray-700/60 pl-3 space-y-0.5">
                      {mod.lessons
                        .sort((a, b) => a.order - b.order)
                        .map(lesson => {
                          const isActive = lesson.slug === currentSlug;
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={`/lessons/${lesson.slug}`}
                                className={`block px-2 py-1 rounded text-sm transition ${
                                  isActive
                                    ? 'bg-blue-600/20 text-blue-300 font-medium border-l-2 border-blue-500 -ml-3 pl-[calc(0.5rem+2px)]'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
                                }`}
                              >
                                {lesson.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
