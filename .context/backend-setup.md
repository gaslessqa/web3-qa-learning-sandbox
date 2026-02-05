# Backend Setup Guide - Web3 QA Learning Hub

## Overview

This document describes the Supabase backend infrastructure for the Web3 QA Learning Hub platform.

## Supabase Project Details

| Property | Value |
|----------|-------|
| **Project Name** | web3qahub-supabase |
| **Project ID** | `fvcbjkkbzxvdewcbakyr` |
| **Region** | eu-central-1 |
| **URL** | https://fvcbjkkbzxvdewcbakyr.supabase.co |
| **Dashboard** | https://supabase.com/dashboard/project/fvcbjkkbzxvdewcbakyr |

## Database Schema

### Tables

#### 1. `profiles`
Stores user profile information, linked to Supabase Auth.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references auth.users |
| `wallet_address` | TEXT | Optional Web3 wallet address |
| `display_name` | TEXT | User's display name |
| `avatar_url` | TEXT | Profile picture URL |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### 2. `modules`
Learning modules organized by difficulty level.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `slug` | TEXT | URL-friendly identifier |
| `title` | TEXT | Module title |
| `description` | TEXT | Module description |
| `level` | TEXT | 'beginner', 'intermediate', or 'expert' |
| `order` | INT | Display order |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### 3. `lessons`
Individual lessons within modules.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `module_id` | UUID | References modules |
| `slug` | TEXT | URL-friendly identifier |
| `title` | TEXT | Lesson title |
| `description` | TEXT | Lesson description |
| `content_path` | TEXT | Path to MDX content file |
| `order` | INT | Display order within module |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### 4. `achievement_types`
Defines available achievements.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Achievement name |
| `description` | TEXT | Achievement description |
| `icon_url` | TEXT | Achievement icon URL |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### 5. `progress`
Tracks user lesson completion.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References profiles |
| `lesson_id` | UUID | References lessons |
| `completed` | BOOLEAN | Completion status |
| `completed_at` | TIMESTAMPTZ | When completed |
| `metadata` | JSONB | Additional data (quiz scores, etc.) |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

#### 6. `achievements`
User-earned achievements.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References profiles |
| `achievement_type_id` | UUID | References achievement_types |
| `earned_at` | TIMESTAMPTZ | When earned |

### Indexes

- `idx_profiles_wallet` - Fast wallet address lookups
- `idx_modules_level` - Filter modules by level
- `idx_modules_order` - Order modules correctly
- `idx_lessons_module` - Get lessons by module
- `idx_lessons_order` - Order lessons correctly
- `idx_progress_user` - Get user's progress
- `idx_progress_lesson` - Get lesson completion stats
- `idx_achievements_user` - Get user's achievements

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

### profiles
- **SELECT**: Users can only view their own profile
- **INSERT**: Users can only create their own profile
- **UPDATE**: Users can only update their own profile
- **DELETE**: Users can only delete their own profile

### modules, lessons, achievement_types
- **SELECT**: Public read access (anyone can view)
- Admin operations require service role key

### progress
- **SELECT**: Users can only view their own progress
- **INSERT**: Authenticated users can track their own progress
- **UPDATE**: Users can only update their own progress
- **DELETE**: Users can only delete their own progress

### achievements
- **SELECT**: Users can only view their own achievements
- **INSERT**: Users can claim their own achievements

## Triggers

### `on_auth_user_created`
Automatically creates a profile when a new user signs up via Supabase Auth.

### `update_profiles_updated_at`
Updates the `updated_at` timestamp when a profile is modified.

## Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://fvcbjkkbzxvdewcbakyr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Supabase Client Files

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser client for Client Components |
| `src/lib/supabase/server.ts` | Server client for Server Components/Actions |
| `src/lib/supabase/middleware.ts` | Session management in middleware |

## Authentication Flow

1. User signs up via email/password or OAuth
2. `on_auth_user_created` trigger creates profile
3. Middleware refreshes session on each request
4. Protected routes redirect unauthenticated users to `/login`
5. Auth routes redirect authenticated users to `/dashboard`

## Seed Data

The database is pre-populated with:
- 3 modules (Beginner, Intermediate, Expert)
- 8 lessons across all modules
- 5 achievement types

## Migrations

All migrations are tracked in Supabase and can be viewed in the dashboard under Database > Migrations.
