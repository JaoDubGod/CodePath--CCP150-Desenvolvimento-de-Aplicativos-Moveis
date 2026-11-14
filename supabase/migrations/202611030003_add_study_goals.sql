create table if not exists public.study_goals (
  user_id uuid primary key references auth.users(id) on delete cascade,
  weekly_target_minutes integer not null default 150
    check (weekly_target_minutes between 1 and 10080),
  updated_at timestamptz not null default now()
);

alter table public.study_goals enable row level security;
create policy "study_goals_select_own" on public.study_goals
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "study_goals_insert_own" on public.study_goals
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "study_goals_update_own" on public.study_goals
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
grant select, insert, update on public.study_goals to authenticated;
