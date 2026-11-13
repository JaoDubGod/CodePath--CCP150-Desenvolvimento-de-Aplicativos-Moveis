import { supabase } from './supabase';
import { CategoryAssessment } from '../utils/assessment';

export type ExerciseAttempt = {
  id: string;
  exerciseId: string;
  selectedOption: number;
  correct: boolean;
  createdAt: string;
};

export type StudyEntry = {
  id: string;
  topic: string;
  notes: string;
  minutes: number;
  createdAt: string;
};

export type WeeklyStudyGoal = {
  weeklyTargetMinutes: number;
};

export type AttemptResult = {
  attempt: ExerciseAttempt;
  expectedOutput: string;
  explanation: string;
};

function requireSupabase() {
  if (!supabase) throw new Error('O cliente Supabase ainda nao foi configurado.');
  return supabase;
}

function throwIfError(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

function slug(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function saveCategoryProgress(assessments: CategoryAssessment[]): Promise<void> {
  if (assessments.length === 0) return;
  const client = requireSupabase();
  const { data: userData, error: userError } = await client.auth.getUser();
  throwIfError(userError);
  if (!userData.user) throw new Error('A sessão do usuário não está ativa.');

  const rows = assessments.map((assessment) => ({
    user_id: userData.user.id,
    language_id: slug(assessment.language),
    category_id: slug(assessment.category),
    score: assessment.score,
    proficiency_level: assessment.level,
    attempt_count: assessment.attemptCount,
    unique_exercise_count: assessment.uniqueExerciseCount,
    correct_unique_count: assessment.correctUniqueCount,
    highest_solved_difficulty: assessment.highestSolvedDifficulty,
    trend_points: assessment.trendPoints,
    confidence: assessment.confidence,
    calculated_at: new Date().toISOString(),
  }));

  const { error } = await client
    .from('user_category_progress')
    .upsert(rows, { onConflict: 'user_id,language_id,category_id' });
  throwIfError(error);
}

export async function loadAttempts(): Promise<ExerciseAttempt[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('exercise_attempts')
    .select('id, exercise_id, selected_option, is_correct, submitted_at')
    .order('submitted_at', { ascending: false });
  throwIfError(error);
  return (data ?? []).map((row) => ({
    id: row.id,
    exerciseId: row.exercise_id,
    selectedOption: row.selected_option,
    correct: row.is_correct,
    createdAt: row.submitted_at,
  }));
}

export async function submitAttempt(exerciseId: string, selectedOption: number): Promise<AttemptResult> {
  const client = requireSupabase();
  const { data, error } = await client.rpc('submit_exercise_attempt', {
    p_exercise_id: exerciseId,
    p_selected_option: selectedOption,
  });
  throwIfError(error);
  const result = data?.[0];
  if (!result) throw new Error('O servidor nao retornou o resultado da tentativa.');

  return {
    attempt: {
      id: result.attempt_id,
      exerciseId,
      selectedOption,
      correct: result.is_correct,
      createdAt: result.submitted_at,
    },
    expectedOutput: result.expected_output,
    explanation: result.explanation,
  };
}

export async function loadStudyEntries(): Promise<StudyEntry[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('study_entries')
    .select('id, topic, notes, minutes, created_at')
    .order('created_at', { ascending: false });
  throwIfError(error);
  return (data ?? []).map((row) => ({
    id: row.id,
    topic: row.topic,
    notes: row.notes,
    minutes: row.minutes,
    createdAt: row.created_at,
  }));
}

export async function loadWeeklyStudyGoal(): Promise<WeeklyStudyGoal | null> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('study_goals')
    .select('weekly_target_minutes')
    .maybeSingle();
  throwIfError(error);
  return data ? { weeklyTargetMinutes: data.weekly_target_minutes } : null;
}

export async function saveWeeklyStudyGoal(weeklyTargetMinutes: number): Promise<void> {
  const client = requireSupabase();
  const { data: userData, error: userError } = await client.auth.getUser();
  throwIfError(userError);
  if (!userData.user) throw new Error('A sessão do usuário não está ativa.');
  const { error } = await client.from('study_goals').upsert({
    user_id: userData.user.id,
    weekly_target_minutes: weeklyTargetMinutes,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  throwIfError(error);
}

export async function createStudyEntry(input: Pick<StudyEntry, 'topic' | 'notes' | 'minutes'>): Promise<StudyEntry> {
  const client = requireSupabase();
  const { data: userData, error: userError } = await client.auth.getUser();
  throwIfError(userError);
  if (!userData.user) throw new Error('A sessão do usuário não está ativa.');
  const { data, error } = await client
    .from('study_entries')
    .insert({ ...input, user_id: userData.user.id })
    .select('id, topic, notes, minutes, created_at')
    .single();
  throwIfError(error);
  if (!data) throw new Error('O servidor nao retornou o registro criado.');
  return {
    id: data.id,
    topic: data.topic,
    notes: data.notes,
    minutes: data.minutes,
    createdAt: data.created_at,
  };
}

export async function updateStudyEntry(
  id: string,
  input: Pick<StudyEntry, 'topic' | 'notes' | 'minutes'>,
): Promise<StudyEntry> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('study_entries')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, topic, notes, minutes, created_at')
    .single();
  throwIfError(error);
  if (!data) throw new Error('Registro nao encontrado para atualizacao.');
  return {
    id: data.id,
    topic: data.topic,
    notes: data.notes,
    minutes: data.minutes,
    createdAt: data.created_at,
  };
}

export async function deleteStudyEntry(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('study_entries').delete().eq('id', id);
  throwIfError(error);
}

export async function deleteAttempt(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('exercise_attempts').delete().eq('id', id);
  throwIfError(error);
}
