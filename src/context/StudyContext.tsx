import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ensureAnonymousSession } from '../database/authService';
import { isSupabaseConfigured } from '../database/supabase';
import { exercises } from '../data/exercises';
import { calculateCategoryAssessments } from '../utils/assessment';
import {
  AttemptResult,
  createStudyEntry as createRemoteStudyEntry,
  deleteStudyEntry as deleteRemoteStudyEntry,
  ExerciseAttempt,
  loadAttempts,
  loadStudyEntries,
  loadWeeklyStudyGoal,
  StudyEntry,
  saveWeeklyStudyGoal,
  submitAttempt,
  saveCategoryProgress,
  updateStudyEntry as updateRemoteStudyEntry,
} from '../database/studyRepository';

type StudyContextValue = {
  attempts: ExerciseAttempt[];
  studyEntries: StudyEntry[];
  weeklyGoalMinutes: number;
  backendStatus: 'local' | 'connecting' | 'connected' | 'error';
  backendMessage: string;
  registerAttempt: (exerciseId: string, correct: boolean, selectedOption: number) => Promise<AttemptResult | null>;
  addStudyEntry: (topic: string, notes: string, minutes: number) => Promise<void>;
  updateStudyEntry: (id: string, topic: string, notes: string, minutes: number) => Promise<void>;
  deleteStudyEntry: (id: string) => Promise<void>;
  setWeeklyGoalMinutes: (minutes: number) => Promise<void>;
};

const StudyContext = createContext<StudyContextValue | undefined>(undefined);

export function StudyProvider({ children }: PropsWithChildren) {
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [studyEntries, setStudyEntries] = useState<StudyEntry[]>([]);
  const [weeklyGoalMinutes, setWeeklyGoalMinutesState] = useState(150);
  const [backendStatus, setBackendStatus] = useState<StudyContextValue['backendStatus']>(
    isSupabaseConfigured ? 'connecting' : 'local',
  );
  const [backendMessage, setBackendMessage] = useState(
    isSupabaseConfigured
      ? 'Conectando ao Supabase...'
      : 'Modo local: configure .env.local e execute o SQL para salvar dados na nuvem.',
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;
    async function connectAndLoad() {
      try {
        await ensureAnonymousSession();
        const [remoteAttempts, remoteEntries] = await Promise.all([
          loadAttempts(),
          loadStudyEntries(),
        ]);
        if (!active) return;
        setAttempts(remoteAttempts);
        setStudyEntries(remoteEntries);
        void saveCategoryProgress(calculateCategoryAssessments(remoteAttempts, exercises)).catch(() => {
          if (active) {
            setBackendMessage('Conectado; execute a migration 002 para salvar o resumo por categoria.');
          }
        });
        setBackendStatus('connected');
        setBackendMessage('Conectado ao Supabase. Seus registros estão sincronizados.');
        try {
          const goal = await loadWeeklyStudyGoal();
          if (active && goal) setWeeklyGoalMinutesState(goal.weeklyTargetMinutes);
        } catch {
          if (active) setBackendMessage('Conectado; execute a migration 003 para sincronizar a meta semanal.');
        }
      } catch (error) {
        if (!active) return;
        const message = error instanceof Error ? error.message : 'Erro desconhecido.';
        setBackendStatus('error');
        setBackendMessage(`Banco indisponível; os novos dados ficam apenas nesta sessão. ${message}`);
      }
    }

    void connectAndLoad();
    return () => { active = false; };
  }, []);

  async function registerAttempt(
    exerciseId: string,
    correct: boolean,
    selectedOption: number,
  ): Promise<AttemptResult | null> {
    if (backendStatus === 'connected') {
      const result = await submitAttempt(exerciseId, selectedOption);
      const updatedAttempts = [result.attempt, ...attempts];
      setAttempts(updatedAttempts);
      try {
        await saveCategoryProgress(calculateCategoryAssessments(updatedAttempts, exercises));
      } catch {
        setBackendMessage('Tentativa salva; não foi possível atualizar o resumo de progresso.');
      }
      return result;
    }

    setAttempts((current) => [
      {
        id: `${Date.now()}-${current.length}`,
        exerciseId,
        selectedOption,
        correct,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    return null;
  }

  async function addStudyEntry(topic: string, notes: string, minutes: number) {
    if (backendStatus === 'connected') {
      const entry = await createRemoteStudyEntry({ topic, notes, minutes });
      setStudyEntries((current) => [entry, ...current]);
      return;
    }
    setStudyEntries((current) => [
      { id: `${Date.now()}-${current.length}`, topic, notes, minutes, createdAt: new Date().toISOString() },
      ...current,
    ]);
  }

  async function updateStudyEntry(id: string, topic: string, notes: string, minutes: number) {
    if (backendStatus === 'connected') {
      const entry = await updateRemoteStudyEntry(id, { topic, notes, minutes });
      setStudyEntries((current) => current.map((item) => item.id === id ? entry : item));
      return;
    }
    setStudyEntries((current) => current.map((item) => item.id === id
      ? { ...item, topic, notes, minutes }
      : item));
  }

  async function deleteStudyEntry(id: string) {
    if (backendStatus === 'connected') await deleteRemoteStudyEntry(id);
    setStudyEntries((current) => current.filter((item) => item.id !== id));
  }

  async function updateWeeklyGoal(minutes: number) {
    if (backendStatus === 'connected') await saveWeeklyStudyGoal(minutes);
    setWeeklyGoalMinutesState(minutes);
  }

  return (
    <StudyContext.Provider value={{
      attempts,
      studyEntries,
      weeklyGoalMinutes,
      backendStatus,
      backendMessage,
      registerAttempt,
      addStudyEntry,
      updateStudyEntry,
      deleteStudyEntry,
      setWeeklyGoalMinutes: updateWeeklyGoal,
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy deve ser usado dentro de StudyProvider.');
  return context;
}
