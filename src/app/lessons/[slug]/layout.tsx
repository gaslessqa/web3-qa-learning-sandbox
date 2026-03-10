import { DocsSidebar } from '@/components/docs-sidebar';
import { DocsSearch } from '@/components/docs-search';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';

type ModuleRow = Database['public']['Tables']['modules']['Row'];
type LessonRow = Database['public']['Tables']['lessons']['Row'];

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch all modules + lessons for sidebar navigation
  const [{ data: modulesData }, { data: lessonsData }] = await Promise.all([
    supabase.from('modules').select('*').order('order', { ascending: true }),
    supabase
      .from('lessons')
      .select('id, slug, title, order, module_id')
      .order('order', { ascending: true }),
  ]);

  const modules = (modulesData as ModuleRow[] | null) ?? [];
  const lessons =
    (lessonsData as Pick<LessonRow, 'id' | 'slug' | 'title' | 'order' | 'module_id'>[] | null) ??
    [];

  const sidebarModules = modules.map(m => ({
    id: m.id,
    slug: m.slug,
    title: m.title,
    level: m.level,
    order: m.order,
    lessons: lessons
      .filter(l => l.module_id === m.id)
      .map(l => ({ id: l.id, slug: l.slug, title: l.title, order: l.order })),
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pb-8">
            <DocsSearch />
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4 px-2">
              Documentation
            </p>
            <DocsSidebar modules={sidebarModules} currentSlug={slug} />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
