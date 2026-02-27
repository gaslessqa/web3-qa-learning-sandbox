import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Callout, Checklist, Steps, SectionTitle } from '@/components/mdx';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

export type LessonFrontmatter = {
  title?: string;
  level?: 'beginner' | 'intermediate' | 'expert';
  order?: number;
  module?: string;
  estimated_minutes?: number;
};

export type LoadedMdx = {
  frontmatter: LessonFrontmatter;
  content: React.ReactNode;
};

export async function loadMdxByContentPath(contentPath: string): Promise<LoadedMdx> {
  // contentPath example: "beginner/02-connect-disconnect-wallet.mdx"
  const fullPath = path.join(CONTENT_ROOT, contentPath);

  const raw = await fs.readFile(fullPath, 'utf8');
  const { content, data } = matter(raw);

  const compiled = await compileMDX({
    source: content,
    components: {
      Callout,
      Checklist,
      Steps,
      SectionTitle,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    frontmatter: data as LessonFrontmatter,
    content: compiled.content,
  };
}
