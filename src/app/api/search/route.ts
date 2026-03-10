import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export type SearchResult = {
  slug: string;
  title: string;
  description: string;
  module_title: string;
  module_slug: string;
  level: string;
};

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  const supabase = await createClient();

  // Join lessons → modules, filter by title OR description (case-insensitive)
  const { data, error } = await supabase
    .from('lessons')
    .select('slug, title, description, modules(slug, title, level)')
    .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
    .order('title', { ascending: true })
    .limit(12);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  type RawRow = {
    slug: string;
    title: string;
    description: string;
    modules: { slug: string; title: string; level: string } | null;
  };
  const results: SearchResult[] = ((data as RawRow[]) ?? []).map(row => ({
    slug: row.slug,
    title: row.title,
    description: row.description ?? '',
    module_title: row.modules?.title ?? '',
    module_slug: row.modules?.slug ?? '',
    level: row.modules?.level ?? '',
  }));

  return NextResponse.json(results);
}
