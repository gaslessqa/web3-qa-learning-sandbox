import { LessonComplete } from '@/components/lesson-complete';
import type { LoadedMdx } from '@/lib/mdx';
import { loadMdxByContentPath } from '@/lib/mdx';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';
import Link from 'next/link';

type LessonRow = Database['public']['Tables']['lessons']['Row'];
type ModuleRow = Database['public']['Tables']['modules']['Row'];

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Unwrap params for Next 15 + Turbopack
  const supabase = await createClient();

  // Fetch lesson with module
  const { data: lessonData, error: lessonError } = await supabase
    .from('lessons')
    .select('*, module:modules(*)')
    .eq('slug', slug)
    .single();

  if (lessonError || !lessonData) {
    // Log the real Supabase error in the Next.js server terminal
    console.error('Lesson fetch error:', lessonError);

    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto mb-4">
          Check the server terminal for the Supabase error details.
        </p>
        <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const lesson = lessonData as LessonRow & { module: ModuleRow };
  const module = lesson.module;

  // Load MDX from filesystem
  let mdx: LoadedMdx | null = null;
  try {
    if (lesson.content_path) {
      mdx = await loadMdxByContentPath(lesson.content_path);
    }
  } catch (e) {
    console.error('MDX load error:', e);
    mdx = null;
  }

  // Server-side auth + completion state
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  let initialCompleted = false;
  if (user) {
    const { data: progress } = await supabase
      .from('progress')
      .select('completed')
      .eq('user_id', user.id)
      .eq('lesson_id', lesson.id)
      .single();

    initialCompleted = !!progress?.completed;
  }

  const displayTitle = mdx?.frontmatter.title ?? lesson.title;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/dashboard" className="hover:text-white transition">
          Dashboard
        </Link>
        <span>/</span>
        <Link href={`/modules/${module.slug}`} className="hover:text-white transition">
          {module.title}
        </Link>
        <span>/</span>
        <span className="text-white">{displayTitle}</span>
      </nav>

      {/* Lesson Content */}
      <div>
        <div className="bg-gray-800 rounded-2xl p-10 mb-10 shadow-lg shadow-black/20 border border-gray-700/60">
          <article
            className="prose prose-invert prose-lg max-w-none space-y-4
              prose-headings:text-white
              prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-3
              prose-ul:my-4 prose-ol:my-4 prose-li:my-1
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:bg-gray-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-green-400 prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-gray-700/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
              prose-table:border-collapse
              prose-th:bg-gray-700 prose-th:px-4 prose-th:py-2 prose-th:text-left
              prose-td:border prose-td:border-gray-700 prose-td:px-4 prose-td:py-2"
          >
            {mdx ? (
              <>
                <h1>{displayTitle}</h1>

                {/* Meta chips */}
                <div className="not-prose mb-6 flex flex-wrap gap-2 text-sm">
                  {mdx.frontmatter.level && (
                    <span className="rounded-full bg-gray-700 px-3 py-1 text-gray-200">
                      Level: {mdx.frontmatter.level}
                    </span>
                  )}
                  {typeof mdx.frontmatter.estimated_minutes === 'number' && (
                    <span className="rounded-full bg-gray-700 px-3 py-1 text-gray-200">
                      {mdx.frontmatter.estimated_minutes} min
                    </span>
                  )}
                  {mdx.frontmatter.module && (
                    <span className="rounded-full bg-gray-700 px-3 py-1 text-gray-200">
                      Module: {mdx.frontmatter.module}
                    </span>
                  )}
                </div>

                {mdx.content}
              </>
            ) : (
              <>
                <h1>{lesson.title}</h1>
                <p className="text-gray-400">{lesson.description}</p>
                <div className="bg-gray-700/50 rounded-lg p-6 my-6">
                  <p className="text-gray-300">Content for this lesson is coming soon.</p>
                </div>
              </>
            )}
          </article>
        </div>

        <LessonComplete lessonId={lesson.id} initialCompleted={initialCompleted} />
      </div>
    </div>
  );
}
