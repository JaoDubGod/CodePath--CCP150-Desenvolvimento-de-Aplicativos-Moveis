import { supabase } from './supabase';

export async function ensureAnonymousSession(): Promise<void> {
  if (!supabase) {
    throw new Error('Configure o Supabase no arquivo .env.local antes de conectar.');
  }

  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (data.session) return;

  const { error: signInError } = await supabase.auth.signInAnonymously();
  if (signInError) throw signInError;
}
