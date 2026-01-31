/*
  # Comprehensive Security and Performance Fix - Final

  ## Changes Made

  ### 1. Add Missing Foreign Key Indexes
  - Add index on `ai_tool_results.user_id`
  - Add index on `assets.team_id`
  - Add index on `movie_projects.team_id`
  - Add index on `render_jobs.user_id`
  - Add index on `team_members.user_id`

  ### 2. Remove Unused Indexes
  - Drop all indexes that are not being used to reduce database overhead

  ### 3. Fix RLS Policies for Performance
  - Replace all `auth.uid()` calls with `(select auth.uid())` to prevent re-evaluation per row
  - Recreate all policies with optimized patterns

  ### 4. Fix Function Search Paths
  - Update functions to have immutable search paths for security

  ### 5. Notes
  - This migration significantly improves query performance at scale
  - Reduces database overhead by removing unused indexes
  - Enhances security by fixing function search paths
*/

-- ============================================================
-- PART 1: ADD MISSING FOREIGN KEY INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_ai_tool_results_user_id_fk 
ON public.ai_tool_results(user_id);

CREATE INDEX IF NOT EXISTS idx_assets_team_id_fk 
ON public.assets(team_id);

CREATE INDEX IF NOT EXISTS idx_movie_projects_team_id_fk 
ON public.movie_projects(team_id);

CREATE INDEX IF NOT EXISTS idx_render_jobs_user_id_fk 
ON public.render_jobs(user_id);

CREATE INDEX IF NOT EXISTS idx_team_members_user_id_fk 
ON public.team_members(user_id);

-- ============================================================
-- PART 2: REMOVE UNUSED INDEXES
-- ============================================================

DROP INDEX IF EXISTS public.idx_movie_projects_user_id;
DROP INDEX IF EXISTS public.idx_movie_projects_created_at;
DROP INDEX IF EXISTS public.idx_chat_messages_team_id;
DROP INDEX IF EXISTS public.idx_projects_user_id;
DROP INDEX IF EXISTS public.idx_render_jobs_team_id;
DROP INDEX IF EXISTS public.idx_teams_created_by;
DROP INDEX IF EXISTS public.idx_assets_user_id;
DROP INDEX IF EXISTS public.idx_assets_created_at;
DROP INDEX IF EXISTS public.idx_ai_tool_outputs_user_id;
DROP INDEX IF EXISTS public.idx_ai_tool_outputs_tool_page;
DROP INDEX IF EXISTS public.idx_chat_messages_user_id;
DROP INDEX IF EXISTS public.idx_chat_messages_created_at;
DROP INDEX IF EXISTS public.idx_ai_tool_results_status;
DROP INDEX IF EXISTS public.idx_ai_tool_results_created_at;
DROP INDEX IF EXISTS public.idx_team_members_email;
DROP INDEX IF EXISTS public.idx_team_members_team_id;
DROP INDEX IF EXISTS public.idx_render_jobs_status;
DROP INDEX IF EXISTS public.idx_render_jobs_created_at;
DROP INDEX IF EXISTS public.idx_render_scenes_job_id;
DROP INDEX IF EXISTS public.idx_render_scenes_status;

-- ============================================================
-- PART 3: FIX ALL RLS POLICIES
-- ============================================================

-- PROFILES TABLE
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;

CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- PROJECTS TABLE
DROP POLICY IF EXISTS "projects_select" ON public.projects;
DROP POLICY IF EXISTS "projects_insert" ON public.projects;
DROP POLICY IF EXISTS "projects_update" ON public.projects;
DROP POLICY IF EXISTS "projects_delete" ON public.projects;

CREATE POLICY "projects_select" ON public.projects
  FOR SELECT TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "projects_insert" ON public.projects
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "projects_update" ON public.projects
  FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "projects_delete" ON public.projects
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));

-- MOVIE_PROJECTS TABLE
DROP POLICY IF EXISTS "movie_projects_select" ON public.movie_projects;
DROP POLICY IF EXISTS "movie_projects_insert" ON public.movie_projects;
DROP POLICY IF EXISTS "movie_projects_update" ON public.movie_projects;
DROP POLICY IF EXISTS "movie_projects_delete" ON public.movie_projects;

CREATE POLICY "movie_projects_select" ON public.movie_projects
  FOR SELECT TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "movie_projects_insert" ON public.movie_projects
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "movie_projects_update" ON public.movie_projects
  FOR UPDATE TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "movie_projects_delete" ON public.movie_projects
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));

-- ASSETS TABLE
DROP POLICY IF EXISTS "assets_select" ON public.assets;
DROP POLICY IF EXISTS "assets_insert" ON public.assets;
DROP POLICY IF EXISTS "assets_update" ON public.assets;
DROP POLICY IF EXISTS "assets_delete" ON public.assets;

CREATE POLICY "assets_select" ON public.assets
  FOR SELECT TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "assets_insert" ON public.assets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "assets_update" ON public.assets
  FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "assets_delete" ON public.assets
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));

-- AI_TOOL_OUTPUTS TABLE
DROP POLICY IF EXISTS "ai_tool_outputs_select" ON public.ai_tool_outputs;
DROP POLICY IF EXISTS "ai_tool_outputs_insert" ON public.ai_tool_outputs;
DROP POLICY IF EXISTS "ai_tool_outputs_update" ON public.ai_tool_outputs;
DROP POLICY IF EXISTS "ai_tool_outputs_delete" ON public.ai_tool_outputs;

CREATE POLICY "ai_tool_outputs_select" ON public.ai_tool_outputs
  FOR SELECT TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "ai_tool_outputs_insert" ON public.ai_tool_outputs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "ai_tool_outputs_update" ON public.ai_tool_outputs
  FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "ai_tool_outputs_delete" ON public.ai_tool_outputs
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));

-- CHAT_MESSAGES TABLE
DROP POLICY IF EXISTS "chat_messages_select" ON public.chat_messages;
DROP POLICY IF EXISTS "chat_messages_insert" ON public.chat_messages;

CREATE POLICY "chat_messages_select" ON public.chat_messages
  FOR SELECT TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "chat_messages_insert" ON public.chat_messages
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- TEAMS TABLE
DROP POLICY IF EXISTS "teams_select" ON public.teams;
DROP POLICY IF EXISTS "teams_insert" ON public.teams;
DROP POLICY IF EXISTS "teams_update" ON public.teams;

CREATE POLICY "teams_select" ON public.teams
  FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "teams_insert" ON public.teams
  FOR INSERT TO authenticated
  WITH CHECK (created_by = (select auth.uid()));

CREATE POLICY "teams_update" ON public.teams
  FOR UPDATE TO authenticated
  USING (created_by = (select auth.uid()))
  WITH CHECK (created_by = (select auth.uid()));

-- TEAM_MEMBERS TABLE
DROP POLICY IF EXISTS "team_members_select" ON public.team_members;
DROP POLICY IF EXISTS "team_members_insert" ON public.team_members;
DROP POLICY IF EXISTS "team_members_update" ON public.team_members;
DROP POLICY IF EXISTS "team_members_delete" ON public.team_members;

CREATE POLICY "team_members_select" ON public.team_members
  FOR SELECT TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "team_members_insert" ON public.team_members
  FOR INSERT TO authenticated
  WITH CHECK (
    team_id IN (
      SELECT id FROM public.teams 
      WHERE created_by = (select auth.uid())
    )
  );

CREATE POLICY "team_members_update" ON public.team_members
  FOR UPDATE TO authenticated
  USING (
    team_id IN (
      SELECT id FROM public.teams 
      WHERE created_by = (select auth.uid())
    )
  )
  WITH CHECK (
    team_id IN (
      SELECT id FROM public.teams 
      WHERE created_by = (select auth.uid())
    )
  );

CREATE POLICY "team_members_delete" ON public.team_members
  FOR DELETE TO authenticated
  USING (
    team_id IN (
      SELECT id FROM public.teams 
      WHERE created_by = (select auth.uid())
    )
  );

-- AI_TOOL_RESULTS TABLE
DROP POLICY IF EXISTS "ai_tool_results_select" ON public.ai_tool_results;
DROP POLICY IF EXISTS "ai_tool_results_insert" ON public.ai_tool_results;
DROP POLICY IF EXISTS "ai_tool_results_update" ON public.ai_tool_results;
DROP POLICY IF EXISTS "ai_tool_results_delete" ON public.ai_tool_results;

CREATE POLICY "ai_tool_results_select" ON public.ai_tool_results
  FOR SELECT TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "ai_tool_results_insert" ON public.ai_tool_results
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "ai_tool_results_update" ON public.ai_tool_results
  FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "ai_tool_results_delete" ON public.ai_tool_results
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));

-- RENDER_JOBS TABLE
DROP POLICY IF EXISTS "render_jobs_select" ON public.render_jobs;
DROP POLICY IF EXISTS "render_jobs_insert" ON public.render_jobs;
DROP POLICY IF EXISTS "render_jobs_update" ON public.render_jobs;
DROP POLICY IF EXISTS "render_jobs_delete" ON public.render_jobs;

CREATE POLICY "render_jobs_select" ON public.render_jobs
  FOR SELECT TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "render_jobs_insert" ON public.render_jobs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "render_jobs_update" ON public.render_jobs
  FOR UPDATE TO authenticated
  USING (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    user_id = (select auth.uid()) OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "render_jobs_delete" ON public.render_jobs
  FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));

-- RENDER_SCENES TABLE
DROP POLICY IF EXISTS "render_scenes_select" ON public.render_scenes;
DROP POLICY IF EXISTS "render_scenes_insert" ON public.render_scenes;
DROP POLICY IF EXISTS "render_scenes_update" ON public.render_scenes;

CREATE POLICY "render_scenes_select" ON public.render_scenes
  FOR SELECT TO authenticated
  USING (
    render_job_id IN (
      SELECT id FROM public.render_jobs 
      WHERE user_id = (select auth.uid()) OR
      team_id IN (
        SELECT team_id FROM public.team_members 
        WHERE user_id = (select auth.uid())
      )
    )
  );

CREATE POLICY "render_scenes_insert" ON public.render_scenes
  FOR INSERT TO authenticated
  WITH CHECK (
    render_job_id IN (
      SELECT id FROM public.render_jobs 
      WHERE user_id = (select auth.uid())
    )
  );

CREATE POLICY "render_scenes_update" ON public.render_scenes
  FOR UPDATE TO authenticated
  USING (
    render_job_id IN (
      SELECT id FROM public.render_jobs 
      WHERE user_id = (select auth.uid()) OR
      team_id IN (
        SELECT team_id FROM public.team_members 
        WHERE user_id = (select auth.uid())
      )
    )
  )
  WITH CHECK (
    render_job_id IN (
      SELECT id FROM public.render_jobs 
      WHERE user_id = (select auth.uid()) OR
      team_id IN (
        SELECT team_id FROM public.team_members 
        WHERE user_id = (select auth.uid())
      )
    )
  );

-- ============================================================
-- PART 4: FIX FUNCTION SEARCH PATHS
-- ============================================================

-- Recreate update_updated_at_column with immutable search path
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate calculate_processing_time with immutable search path
DROP FUNCTION IF EXISTS public.calculate_processing_time() CASCADE;

CREATE OR REPLACE FUNCTION public.calculate_processing_time()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.processing_time_seconds = EXTRACT(EPOCH FROM (NEW.completed_at - NEW.started_at))::INTEGER;
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate triggers
DO $$
BEGIN
  DROP TRIGGER IF EXISTS update_movie_projects_updated_at ON public.movie_projects;
  CREATE TRIGGER update_movie_projects_updated_at
    BEFORE UPDATE ON public.movie_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
  CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
  CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  DROP TRIGGER IF EXISTS update_assets_updated_at ON public.assets;
  CREATE TRIGGER update_assets_updated_at
    BEFORE UPDATE ON public.assets
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  DROP TRIGGER IF EXISTS update_ai_tool_outputs_updated_at ON public.ai_tool_outputs;
  CREATE TRIGGER update_ai_tool_outputs_updated_at
    BEFORE UPDATE ON public.ai_tool_outputs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  DROP TRIGGER IF EXISTS update_render_jobs_updated_at ON public.render_jobs;
  CREATE TRIGGER update_render_jobs_updated_at
    BEFORE UPDATE ON public.render_jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  DROP TRIGGER IF EXISTS calculate_render_job_processing_time ON public.render_jobs;
  CREATE TRIGGER calculate_render_job_processing_time
    BEFORE UPDATE ON public.render_jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.calculate_processing_time();
END $$;
