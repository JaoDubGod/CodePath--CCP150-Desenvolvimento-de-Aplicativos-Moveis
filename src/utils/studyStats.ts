import { StudyEntry } from '../database/studyRepository';

export type WeeklyStudyStats = {
  minutes: number;
  sessions: number;
  goalMinutes: number;
  goalPercent: number;
  remainingMinutes: number;
};

/** Resume as sessões dos últimos sete dias corridos, incluindo o instante atual. */
export function calculateWeeklyStudyStats(
  entries: StudyEntry[],
  goalMinutes: number,
  now = new Date(),
): WeeklyStudyStats {
  const start = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const recentEntries = entries.filter((entry) => {
    const createdAt = Date.parse(entry.createdAt);
    return createdAt >= start && createdAt <= now.getTime();
  });
  const minutes = recentEntries.reduce((total, entry) => total + entry.minutes, 0);
  const safeGoal = Math.max(1, goalMinutes);

  return {
    minutes,
    sessions: recentEntries.length,
    goalMinutes: safeGoal,
    goalPercent: Math.min(100, Math.round((minutes / safeGoal) * 100)),
    remainingMinutes: Math.max(0, safeGoal - minutes),
  };
}
