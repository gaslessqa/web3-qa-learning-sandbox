import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';
import Link from 'next/link';

type ModuleRow = Database['public']['Tables']['modules']['Row'];
type LessonRow = Database['public']['Tables']['lessons']['Row'];

type LessonWithModule = LessonRow & { module: ModuleRow | null };

function levelRank(level: string | null) {
  if (level === 'beginner') return 1;
  if (level === 'intermediate') return 2;
  if (level === 'expert') return 3;
  return 0;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: modulesData }, { data: lessonsData }, { data: progressData }] =
    await Promise.all([
      supabase.from('modules').select('*').order('order', { ascending: true }),
      supabase.from('lessons').select('*, module:modules(*)').order('order', { ascending: true }),
      user
        ? supabase.from('progress').select('*').eq('user_id', user.id).eq('completed', true)
        : Promise.resolve({ data: [] }),
    ]);

  const modules = (modulesData as ModuleRow[]) ?? [];
  const lessons = (lessonsData as LessonWithModule[]) ?? [];
  const completedIds = new Set((progressData ?? []).map((p) => p.lesson_id));

  const totalLessons = lessons.length;
  const completed = completedIds.size;
  const overall = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  let currentLevel: 'Beginner' | 'Intermediate' | 'Expert' = 'Beginner';
  for (const l of lessons) {
    if (completedIds.has(l.id)) {
      const r = levelRank(l.module?.level ?? null);
      if (r >= 3) currentLevel = 'Expert';
      else if (r === 2 && currentLevel !== 'Expert') currentLevel = 'Intermediate';
    }
  }

  const sorted = [...lessons].sort((a, b) => {
    const ma = modules.find((m) => m.id === a.module_id)?.order ?? 999;
    const mb = modules.find((m) => m.id === b.module_id)?.order ?? 999;
    if (ma !== mb) return ma - mb;
    return (a.order ?? 999) - (b.order ?? 999);
  });
  const nextLesson = sorted.find((l) => !completedIds.has(l.id)) ?? null;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400">{completed}</div>
            <div className="text-gray-400 mt-1">Lessons Completed</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">0</div>
            <div className="text-gray-400 mt-1">Achievements</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400">{overall}%</div>
            <div className="text-gray-400 mt-1">Overall Progress</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">{currentLevel}</div>
            <div className="text-gray-400 mt-1">Current Level</div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <div className="bg-gray-800 rounded-xl p-6 flex items-center justify-between gap-4">
            {nextLesson ? (
              <>
                <div>
                  <p className="text-gray-300 font-semibold">{nextLesson.title}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {nextLesson.description ?? 'Next recommended lesson'}
                  </p>
                </div>
                <Link
                  href={`/lessons/${nextLesson.slug}`}
                  className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Continue
                </Link>
              </>
            ) : (
              <p className="text-gray-400">All lessons completed!</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Modules</h2>
          {modules.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-gray-400">No modules found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {modules.map((m) => {
                const moduleLessons = lessons.filter((l) => l.module_id === m.id);
                const completedInModule = moduleLessons.filter((l) =>
                  completedIds.has(l.id)
                ).length;

                const badgeColor =
                  m.level === 'beginner'
                    ? 'bg-green-600'
                    : m.level === 'intermediate'
                      ? 'bg-yellow-600'
                      : 'bg-red-600';

                const borderColor =
                  m.level === 'beginner'
                    ? 'border-green-700'
                    : m.level === 'intermediate'
                      ? 'border-yellow-700'
                      : 'border-red-700';

                const bgGradient =
                  m.level === 'beginner'
                    ? 'from-green-900/50 to-green-800/50'
                    : m.level === 'intermediate'
                      ? 'from-yellow-900/50 to-yellow-800/50'
                      : 'from-red-900/50 to-red-800/50';

                return (
                  <div
                    key={m.id}
                    className={`bg-gradient-to-br ${bgGradient} border ${borderColor} rounded-xl p-6`}
                  >
                    <span className={`text-sm ${badgeColor} px-2 py-1 rounded capitalize`}>
                      {m.level}
                    </span>
                    <h3 className="text-xl font-semibold mt-4 mb-2">{m.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{m.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        {completedInModule}/{moduleLessons.length} lessons
                      </span>
                      <Link
                        href={`/modules/${m.slug}`}
                        className="px-4 py-2 bg-gray-900/40 border border-gray-700 rounded-lg text-sm hover:bg-gray-900/70 transition"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-6">
            Total lessons: {totalLessons} · Completed: {completed}
          </div>
        </section>
      </div>
    </main>
  );
}
