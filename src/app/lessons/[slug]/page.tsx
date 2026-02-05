"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import type { Database } from "@/types/supabase";

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
type Module = Database["public"]["Tables"]["modules"]["Row"];

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { user } = useAuth();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLesson() {
      const supabase = getClient();

      // Fetch lesson with module
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("*, module:modules(*)")
        .eq("slug", slug)
        .single();

      if (lessonError || !lessonData) {
        setError("Lesson not found");
        setIsLoading(false);
        return;
      }

      setLesson(lessonData);
      setModule(lessonData.module as Module);

      // Check if user has completed this lesson
      if (user) {
        const { data: progressData } = await supabase
          .from("progress")
          .select("completed")
          .eq("user_id", user.id)
          .eq("lesson_id", lessonData.id)
          .single();

        if (progressData?.completed) {
          setIsCompleted(true);
        }
      }

      setIsLoading(false);
    }

    fetchLesson();
  }, [slug, user]);

  const handleMarkComplete = async () => {
    if (!user || !lesson) return;

    setIsCompleting(true);
    const supabase = getClient();

    const { error } = await supabase.from("progress").upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      completed: true,
      completed_at: new Date().toISOString(),
    });

    if (!error) {
      setIsCompleted(true);
    }
    setIsCompleting(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (error || !lesson || !module) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Web3 QA Hub
          </Link>
          <Link
            href={`/modules/${module.slug}`}
            className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Module
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-400">
            <Link href="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/modules/${module.slug}`} className="hover:text-white">
              {module.title}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{lesson.title}</span>
          </nav>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-400 text-lg">{lesson.description}</p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
            <p className="text-gray-300 mb-4">
              This is a placeholder for the lesson content. In a full implementation,
              the content would be loaded from MDX files at: <code className="bg-gray-700 px-2 py-1 rounded">{lesson.content_path}</code>
            </p>

            <div className="bg-gray-700/50 rounded-lg p-6 my-6">
              <h3 className="text-lg font-semibold mb-2">What you&apos;ll learn:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Core concepts of {module.title.toLowerCase()}</li>
                <li>Practical examples and exercises</li>
                <li>Best practices for Web3 QA</li>
              </ul>
            </div>

            <p className="text-gray-300">
              Complete this lesson to track your progress and unlock achievements!
            </p>
          </div>
        </div>

        {/* Completion Section */}
        <div className="bg-gray-800 rounded-xl p-6 flex items-center justify-between">
          <div>
            {isCompleted ? (
              <div className="flex items-center gap-2 text-green-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Lesson Completed!</span>
              </div>
            ) : (
              <span className="text-gray-400">
                Mark this lesson as complete when you&apos;re done
              </span>
            )}
          </div>
          {!isCompleted && user && (
            <button
              onClick={handleMarkComplete}
              disabled={isCompleting}
              className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {isCompleting ? "Saving..." : "Mark Complete"}
            </button>
          )}
          {!user && (
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login to Track Progress
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
