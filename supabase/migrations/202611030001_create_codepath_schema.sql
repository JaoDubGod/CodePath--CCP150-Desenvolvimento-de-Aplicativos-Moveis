create table if not exists public.languages (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.exercises (
  id text primary key,
  title text not null,
  language_id text not null references public.languages(id),
  category_id text not null references public.categories(id),
  difficulty text not null check (difficulty in ('Iniciante', 'Básico', 'Intermediário', 'Avançado')),
  statement text not null,
  expected_input text not null,
  example text not null,
  concepts text[] not null default '{}',
  evaluation_criteria text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- A resposta correta fica fora do schema público da API.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.exercise_answer_keys (
  exercise_id text primary key references public.exercises(id) on delete cascade,
  correct_option integer not null check (correct_option >= 0),
  expected_output text not null,
  explanation text not null
);
revoke all on private.exercise_answer_keys from public, anon, authenticated;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null references public.exercises(id),
  selected_option integer not null check (selected_option >= 0),
  is_correct boolean not null,
  submitted_at timestamptz not null default now()
);

create table if not exists public.study_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null check (length(trim(topic)) > 0),
  notes text not null default '',
  minutes integer not null check (minutes > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists exercise_attempts_user_submitted_idx
  on public.exercise_attempts(user_id, submitted_at desc);
create index if not exists exercise_attempts_exercise_idx
  on public.exercise_attempts(exercise_id);
create index if not exists study_entries_user_created_idx
  on public.study_entries(user_id, created_at desc);

-- Cria um perfil de forma automatica para cada conta Auth, inclusive anonima.
create or replace function public.create_codepath_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function public.create_codepath_profile() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_codepath on auth.users;
create trigger on_auth_user_created_codepath
  after insert on auth.users
  for each row execute procedure public.create_codepath_profile();

alter table public.profiles enable row level security;
alter table public.languages enable row level security;
alter table public.categories enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.study_entries enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "languages_read_authenticated" on public.languages for select to authenticated using (true);
create policy "categories_read_authenticated" on public.categories for select to authenticated using (true);
create policy "exercises_read_authenticated" on public.exercises for select to authenticated using (is_active);

create policy "attempts_select_own" on public.exercise_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "attempts_delete_own" on public.exercise_attempts for delete to authenticated using ((select auth.uid()) = user_id);

create policy "study_entries_select_own" on public.study_entries for select to authenticated using ((select auth.uid()) = user_id);
create policy "study_entries_insert_own" on public.study_entries for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "study_entries_update_own" on public.study_entries for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "study_entries_delete_own" on public.study_entries for delete to authenticated using ((select auth.uid()) = user_id);

-- Tentativas sao registradas no servidor para nao confiar na pontuacao enviada pelo app.
create or replace function public.submit_exercise_attempt(
  p_exercise_id text,
  p_selected_option integer
)
returns table (attempt_id uuid, is_correct boolean, expected_output text, explanation text, submitted_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_correct_option integer;
  v_expected_output text;
  v_explanation text;
  v_option_count integer;
  v_attempt_id uuid;
  v_submitted_at timestamptz;
  v_is_correct boolean;
begin
  if v_user_id is null then
    raise exception 'A user session is required';
  end if;

  select jsonb_array_length(e.options), k.correct_option, k.expected_output, k.explanation
    into v_option_count, v_correct_option, v_expected_output, v_explanation
  from public.exercises e
  join private.exercise_answer_keys k on k.exercise_id = e.id
  where e.id = p_exercise_id and e.is_active;

  if not found then
    raise exception 'Exercise not found';
  end if;
  if p_selected_option < 0 or p_selected_option >= v_option_count then
    raise exception 'Selected option is invalid';
  end if;

  v_is_correct := p_selected_option = v_correct_option;
  insert into public.exercise_attempts as inserted(user_id, exercise_id, selected_option, is_correct)
  values (v_user_id, p_exercise_id, p_selected_option, v_is_correct)
  returning inserted.id, inserted.submitted_at into v_attempt_id, v_submitted_at;

  return query select v_attempt_id, v_is_correct, v_expected_output, v_explanation, v_submitted_at;
end;
$$;

revoke all on function public.submit_exercise_attempt(text, integer) from public, anon;
grant execute on function public.submit_exercise_attempt(text, integer) to authenticated;

grant select on public.languages, public.categories, public.exercises to authenticated;
grant select, update on public.profiles to authenticated;
grant select, delete on public.exercise_attempts to authenticated;
grant select, insert, update, delete on public.study_entries to authenticated;

