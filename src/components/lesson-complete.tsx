'use client';

import { useAuth } from '@/contexts/auth-context';
import { getClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useState } from 'react';

export function LessonComplete({
  lessonId,
  initialCompleted,
}: {
  lessonId: string;
  initialCompleted: boolean;
}) {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isSaving, setIsSaving] = useState(false);

  const handleMarkComplete = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      const supabase = getClient();
      console.log('Saving progress for user:', user.id, 'lesson:', lessonId);
      const { error } = await supabase.from('progress').upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      );

      if (error) {
        console.error('Progress save error:', error.message, error.details, error.hint);
      } else {
        console.log('Progress saved successfully');
        setIsCompleted(true);
      }
    } catch (e) {
      console.error('Progress save exception:', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 flex items-center justify-between border border-gray-700/60">
      <div>
        {isCompleted ? (
          <div className="text-green-400 font-semibold">Lesson Completed!</div>
        ) : (
          <span className="text-gray-400">Mark this lesson as complete when you&apos;re done</span>
        )}
      </div>

      {!isCompleted && user && (
        <button
          onClick={handleMarkComplete}
          disabled={isSaving}
          className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Mark Complete'}
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
  );
}
