'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { SearchResult } from '@/app/api/search/route';

const LEVEL_COLOR: Record<string, string> = {
  beginner: 'text-green-400 bg-green-400/10',
  intermediate: 'text-yellow-400 bg-yellow-400/10',
  expert: 'text-red-400 bg-red-400/10',
};

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
      />
    </svg>
  );
}

export function DocsSearch({ navbarMode = false }: { navbarMode?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Open on Cmd+K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setActiveIdx(0);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data: SearchResult[] = await res.json();
        setResults(data);
        setActiveIdx(0);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(id);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/lessons/${slug}`);
      setOpen(false);
    },
    [router]
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIdx]) navigate(results[activeIdx].slug);
    }
  }

  return (
    <>
      {/* Trigger button */}
      {navbarMode ? (
        // Compact icon+shortcut button for the navbar
        <button
          onClick={() => setOpen(true)}
          title="Search docs (⌘K)"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/60 border border-gray-600 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300 transition"
        >
          <SearchIcon />
          <span className="text-xs">Search</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded bg-gray-600 px-1.5 py-0.5 text-[10px] font-mono text-gray-400">
            ⌘K
          </kbd>
        </button>
      ) : (
        // Full-width button for the sidebar
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300 transition"
        >
          <SearchIcon />
          <span className="flex-1 text-left">Search docs…</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-gray-700 px-1.5 py-0.5 text-[10px] font-mono text-gray-400">
            ⌘K
          </kbd>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl mx-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search lessons…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
              />
              {loading && (
                <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-300 text-xs font-mono border border-gray-700 rounded px-1.5 py-0.5 transition"
              >
                esc
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-[60vh] overflow-y-auto py-2">
                {results.map((r, i) => (
                  <li key={r.slug}>
                    <button
                      onClick={() => navigate(r.slug)}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 transition ${
                        i === activeIdx ? 'bg-blue-600/20' : 'hover:bg-gray-800/60'
                      }`}
                    >
                      <SearchIcon />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{r.title}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{r.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-600">{r.module_title}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${LEVEL_COLOR[r.level] ?? 'text-gray-400 bg-gray-400/10'}`}
                          >
                            {r.level}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty state */}
            {query.length >= 2 && !loading && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No results for <span className="text-gray-300">"{query}"</span>
              </div>
            )}

            {/* Hint */}
            {query.length < 2 && (
              <div className="px-4 py-4 text-xs text-gray-600">
                Type at least 2 characters to search across all lessons.
              </div>
            )}

            {/* Footer shortcuts */}
            {results.length > 0 && (
              <div className="border-t border-gray-800 px-4 py-2 flex items-center gap-4 text-[11px] text-gray-600">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> open
                </span>
                <span>
                  <kbd className="font-mono">esc</kbd> close
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
