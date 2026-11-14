-- Snapshot derivado do historico. O app pode recalcula-lo sem perder tentativas originais.
create table if not exists public.user_category_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  language_id text not null references public.languages(id),
  category_id text not null references public.categories(id),
  score numeric(5, 2) not null check (score >= 0 and score <= 100),
  proficiency_level text not null check (proficiency_level in ('Iniciante', 'Básico', 'Intermediário', 'Avançado')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  unique_exercise_count integer not null default 0 check (unique_exercise_count >= 0),
  correct_unique_count integer not null default 0 check (correct_unique_count >= 0),
  highest_solved_difficulty text check (highest_solved_difficulty in ('Iniciante', 'Básico', 'Intermediário', 'Avançado')),
  trend_points integer,
  confidence text not null check (confidence in ('baixa', 'média', 'boa')),
  calculated_at timestamptz not null default now(),
  primary key (user_id, language_id, category_id)
);

create index if not exists user_category_progress_user_score_idx
  on public.user_category_progress(user_id, score asc);

alter table public.user_category_progress enable row level security;
create policy "category_progress_select_own" on public.user_category_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "category_progress_insert_own" on public.user_category_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "category_progress_update_own" on public.user_category_progress
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
grant select, insert, update on public.user_category_progress to authenticated;
