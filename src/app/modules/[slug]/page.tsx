"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import type { Database } from "@/types/supabase";

type Module = Database["public"]["Tables"]["modules"]["Row"];
type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export default function ModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();

  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModule() {
      const supabase = getClient();

      // Fetch module
      const { data: moduleData, error: moduleError } = await supabase
        .from("modules")
        .select("*")
        .eq("slug", slug)
        .single();

      if (moduleError) {
        setError("Module not found");
        setIsLoading(false);
        return;
      }

      setModule(moduleData);

      // Fetch lessons for this module
      const { data: lessonsData, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .eq("module_id", moduleData.id)
        .order("order");

      if (!lessonsError && lessonsData) {
        setLessons(lessonsData);
      }

      setIsLoading(false);
    }

    fetchModule();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (error || !module) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Module Not Found</h1>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const levelColors: Record<string, { bg: string; border: string; badge: string }> = {
    beginner: { bg: "from-green-900/50 to-green-800/50", border: "border-green-700", badge: "bg-green-600" },
    intermediate: { bg: "from-yellow-900/50 to-yellow-800/50", border: "border-yellow-700", badge: "bg-yellow-600" },
    expert: { bg: "from-red-900/50 to-red-800/50", border: "border-red-700", badge: "bg-red-600" },
  };

  const colors = levelColors[module.level] || levelColors.beginner;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Web3 QA Hub
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Module Header */}
      <div className={`bg-gradient-to-br ${colors.bg} ${colors.border} border-b`}>
        <div className="container mx-auto px-4 py-12">
          <span className={`text-sm ${colors.badge} px-3 py-1 rounded-full`}>
            {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-2">{module.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{module.description}</p>
          <div className="mt-4 text-sm text-gray-400">
            {lessons.length} lessons
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="bg-gray-800 rounded-xl p-6 flex items-center justify-between hover:bg-gray-750 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  <p className="text-gray-400 text-sm">{lesson.description}</p>
                </div>
              </div>
              <Link
                href={`/lessons/${lesson.slug}`}
                className={`px-4 py-2 ${colors.badge} rounded-lg text-sm hover:opacity-90 transition`}
              >
                Start Lesson
              </Link>
            </div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">No lessons available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
