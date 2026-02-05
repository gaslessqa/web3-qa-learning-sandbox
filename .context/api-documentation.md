# API Documentation - Web3 QA Learning Hub

## Supabase Client Usage

### Browser Client (Client Components)

```typescript
import { getClient } from "@/lib/supabase/client";

// Get the singleton client instance
const supabase = getClient();
```

### Server Client (Server Components / Server Actions)

```typescript
import { createClient } from "@/lib/supabase/server";

// Create a new client (must await)
const supabase = await createClient();
```

### Service Client (Admin Operations)

```typescript
import { createServiceClient } from "@/lib/supabase/server";

// Create admin client - bypasses RLS
const supabase = await createServiceClient();
```

---

## Authentication API

### Sign Up

```typescript
const { signUp } = useAuth();

const { error } = await signUp(email, password, {
  display_name: "John Doe",
});

if (error) {
  console.error("Sign up failed:", error.message);
}
```

### Sign In

```typescript
const { signIn } = useAuth();

const { error } = await signIn(email, password);

if (error) {
  console.error("Sign in failed:", error.message);
}
```

### OAuth Sign In

```typescript
const { signInWithOAuth } = useAuth();

// Redirects to OAuth provider
const { error } = await signInWithOAuth("github"); // or "google"
```

### Sign Out

```typescript
const { signOut } = useAuth();

await signOut();
```

### Get Current User

```typescript
const { user, profile, isLoading } = useAuth();

if (isLoading) {
  return <Loading />;
}

if (!user) {
  return <LoginPrompt />;
}

return <div>Welcome, {profile?.display_name || user.email}</div>;
```

---

## Database Queries

### Modules

#### Get All Modules

```typescript
const supabase = await createClient();

const { data: modules, error } = await supabase
  .from("modules")
  .select("*")
  .order("order");
```

#### Get Module with Lessons

```typescript
const { data: module, error } = await supabase
  .from("modules")
  .select(`
    *,
    lessons (*)
  `)
  .eq("slug", "web3-qa-fundamentals")
  .single();
```

#### Get Modules by Level

```typescript
const { data: beginnerModules, error } = await supabase
  .from("modules")
  .select("*")
  .eq("level", "beginner")
  .order("order");
```

### Lessons

#### Get Lesson by Slug

```typescript
const { data: lesson, error } = await supabase
  .from("lessons")
  .select(`
    *,
    module:modules (*)
  `)
  .eq("slug", "intro-to-blockchain-testing")
  .single();
```

#### Get Lessons for Module

```typescript
const { data: lessons, error } = await supabase
  .from("lessons")
  .select("*")
  .eq("module_id", moduleId)
  .order("order");
```

### Progress

#### Get User Progress

```typescript
const { data: progress, error } = await supabase
  .from("progress")
  .select(`
    *,
    lesson:lessons (
      *,
      module:modules (*)
    )
  `)
  .eq("user_id", userId);
```

#### Mark Lesson Complete

```typescript
const { error } = await supabase
  .from("progress")
  .upsert({
    user_id: userId,
    lesson_id: lessonId,
    completed: true,
    completed_at: new Date().toISOString(),
  });
```

#### Get Completion Percentage

```typescript
// Get total lessons
const { count: totalLessons } = await supabase
  .from("lessons")
  .select("*", { count: "exact", head: true });

// Get completed lessons
const { count: completedLessons } = await supabase
  .from("progress")
  .select("*", { count: "exact", head: true })
  .eq("user_id", userId)
  .eq("completed", true);

const percentage = Math.round((completedLessons / totalLessons) * 100);
```

### Achievements

#### Get User Achievements

```typescript
const { data: achievements, error } = await supabase
  .from("achievements")
  .select(`
    *,
    achievement_type:achievement_types (*)
  `)
  .eq("user_id", userId);
```

#### Award Achievement

```typescript
const { error } = await supabase
  .from("achievements")
  .insert({
    user_id: userId,
    achievement_type_id: achievementTypeId,
  });
```

#### Get All Achievement Types

```typescript
const { data: achievementTypes, error } = await supabase
  .from("achievement_types")
  .select("*");
```

### Profiles

#### Get Profile

```typescript
const { data: profile, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single();
```

#### Update Profile

```typescript
const { updateProfile } = useAuth();

const { error } = await updateProfile({
  display_name: "New Name",
  avatar_url: "https://example.com/avatar.jpg",
});
```

#### Link Wallet Address

```typescript
const { updateProfile } = useAuth();

const { error } = await updateProfile({
  wallet_address: "0x1234...5678",
});
```

---

## TypeScript Types

Import generated types:

```typescript
import type { Database } from "@/types/supabase";

// Table row types
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Module = Database["public"]["Tables"]["modules"]["Row"];
type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
type Progress = Database["public"]["Tables"]["progress"]["Row"];
type Achievement = Database["public"]["Tables"]["achievements"]["Row"];
type AchievementType = Database["public"]["Tables"]["achievement_types"]["Row"];

// Insert types
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

// Update types
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
```

---

## Error Handling

```typescript
const { data, error } = await supabase.from("modules").select("*");

if (error) {
  // PostgreSQL error
  console.error("Database error:", error.message);
  console.error("Error code:", error.code);
  console.error("Details:", error.details);
  return;
}

// Success - data is typed
console.log(data);
```

---

## Real-time Subscriptions

### Subscribe to Progress Updates

```typescript
const channel = supabase
  .channel("progress-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "progress",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log("Progress changed:", payload);
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

---

## Server Actions Example

```typescript
// src/app/actions/progress.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("progress").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed: true,
    completed_at: new Date().toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
```
