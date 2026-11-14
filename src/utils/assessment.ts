import { Difficulty, Exercise, Language } from '../data/exercises';

export type AttemptForAssessment = {
  id: string;
  exerciseId: string;
  correct: boolean;
  createdAt: string;
};

export type ProficiencyLevel = 'Iniciante' | 'Básico' | 'Intermediário' | 'Avançado';
export type Confidence = 'baixa' | 'média' | 'boa';

export type CategoryAssessment = {
  language: Language;
  category: string;
  score: number;
  level: ProficiencyLevel;
  attemptCount: number;
  uniqueExerciseCount: number;
  correctUniqueCount: number;
  highestSolvedDifficulty: Difficulty | null;
  trendPoints: number | null;
  confidence: Confidence;
};

export type ExerciseRecommendation = {
  exercise: Exercise;
  reason: string;
};

const difficultyRank: Record<Difficulty, number> = {
  Iniciante: 1,
  Básico: 2,
  Intermediário: 3,
  Avançado: 4,
};

const rankDifficulty: Record<number, Difficulty> = {
  1: 'Iniciante',
  2: 'Básico',
  3: 'Intermediário',
  4: 'Avançado',
};

function latestByExercise(attempts: AttemptForAssessment[]) {
  const latest = new Map<string, AttemptForAssessment>();
  for (const attempt of [...attempts].sort(
    (left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt),
  )) {
    latest.set(attempt.exerciseId, attempt);
  }
  return [...latest.values()];
}

function determineLevel(score: number, highestSolvedRank: number): ProficiencyLevel {
  let scoreRank = 1;
  if (score >= 80) scoreRank = 4;
  else if (score >= 65) scoreRank = 3;
  else if (score >= 40) scoreRank = 2;

  // Um nível só é liberado depois de acertar ao menos uma questão dessa dificuldade.
  return rankDifficulty[Math.min(scoreRank, Math.max(1, highestSolvedRank))];
}

function calculateTrend(attempts: AttemptForAssessment[]): number | null {
  const ordered = [...attempts].sort(
    (left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt),
  );
  const recent = ordered.slice(0, 5);
  const previous = ordered.slice(5, 10);
  if (recent.length < 3 || previous.length < 3) return null;

  const recentAccuracy = recent.filter((attempt) => attempt.correct).length / recent.length;
  const previousAccuracy = previous.filter((attempt) => attempt.correct).length / previous.length;
  return Math.round((recentAccuracy - previousAccuracy) * 100);
}

export function calculateCategoryAssessments(
  attempts: AttemptForAssessment[],
  exercises: Exercise[],
  now = new Date(),
): CategoryAssessment[] {
  const exerciseById = new Map(exercises.map((exercise) => [exercise.id, exercise]));
  const attemptsByKey = new Map<string, AttemptForAssessment[]>();

  for (const attempt of attempts) {
    const exercise = exerciseById.get(attempt.exerciseId);
    if (!exercise) continue;
    const key = `${exercise.language}::${exercise.category}`;
    const group = attemptsByKey.get(key) ?? [];
    group.push(attempt);
    attemptsByKey.set(key, group);
  }

  return [...attemptsByKey.entries()].map(([key, categoryAttempts]) => {
    const [language, category] = key.split('::') as [Language, string];
    const latestAttempts = latestByExercise(categoryAttempts);
    let weightedCorrect = 0;
    let totalWeight = 0;
    let highestSolvedRank = 0;

    for (const attempt of latestAttempts) {
      const exercise = exerciseById.get(attempt.exerciseId);
      if (!exercise) continue;
      const ageDays = Math.max(0, (now.getTime() - Date.parse(attempt.createdAt)) / 86_400_000);
      const recencyWeight = Math.max(0.25, Math.exp(-ageDays / 180));
      const weight = difficultyRank[exercise.difficulty] * recencyWeight;
      totalWeight += weight;
      if (attempt.correct) {
        weightedCorrect += weight;
        highestSolvedRank = Math.max(highestSolvedRank, difficultyRank[exercise.difficulty]);
      }
    }

    const weightedAccuracy = totalWeight === 0 ? 0 : (weightedCorrect / totalWeight) * 100;
    const difficultyEvidence = highestSolvedRank * 25;
    const categoryExerciseCount = exercises.filter(
      (exercise) => exercise.language === language && exercise.category === category,
    ).length;
    const breadthTarget = Math.max(1, Math.min(5, categoryExerciseCount));
    const breadthScore = Math.min(100, (latestAttempts.length / breadthTarget) * 100);
    const trendPoints = calculateTrend(categoryAttempts);
    const trendScore = trendPoints === null ? 50 : Math.max(0, Math.min(100, 50 + trendPoints / 2));
    const score = Math.round(
      weightedAccuracy * 0.65 + difficultyEvidence * 0.20 + breadthScore * 0.10 + trendScore * 0.05,
    );

    const confidence: Confidence = latestAttempts.length >= 5
      ? 'boa'
      : latestAttempts.length >= 3
        ? 'média'
        : 'baixa';

    return {
      language,
      category,
      score,
      level: determineLevel(score, highestSolvedRank),
      attemptCount: categoryAttempts.length,
      uniqueExerciseCount: latestAttempts.length,
      correctUniqueCount: latestAttempts.filter((attempt) => attempt.correct).length,
      highestSolvedDifficulty: highestSolvedRank ? rankDifficulty[highestSolvedRank] : null,
      trendPoints,
      confidence,
    };
  }).sort((left, right) => left.score - right.score || left.category.localeCompare(right.category));
}

export function recommendExercises(
  attempts: AttemptForAssessment[],
  exercises: Exercise[],
  assessments = calculateCategoryAssessments(attempts, exercises),
  limit = 3,
): ExerciseRecommendation[] {
  const latestAttempts = latestByExercise(attempts);
  const latestById = new Map(latestAttempts.map((attempt) => [attempt.exerciseId, attempt]));
  const assessmentByKey = new Map(
    assessments.map((assessment) => [`${assessment.language}::${assessment.category}`, assessment]),
  );

  const availableCategories = [...new Set(exercises.map((exercise) => `${exercise.language}::${exercise.category}`))]
    .sort((left, right) => {
      const leftAssessment = assessmentByKey.get(left);
      const rightAssessment = assessmentByKey.get(right);
      return (leftAssessment?.score ?? 101) - (rightAssessment?.score ?? 101);
    });

  const recommendations: ExerciseRecommendation[] = [];
  const chosenIds = new Set<string>();
  for (const key of availableCategories) {
    if (recommendations.length >= limit) break;
    const [language, category] = key.split('::') as [Language, string];
    const assessment = assessmentByKey.get(key);
    const solvedRank = assessment?.highestSolvedDifficulty
      ? difficultyRank[assessment.highestSolvedDifficulty]
      : 0;
    const targetRank = Math.min(4, Math.max(1, solvedRank + 1));

    const candidates = exercises
      .filter((exercise) => exercise.language === language && exercise.category === category)
      .filter((exercise) => !latestById.get(exercise.id)?.correct)
      .filter((exercise) => {
        const latestAttempt = latestById.get(exercise.id);
        return latestAttempt?.correct === false || difficultyRank[exercise.difficulty] <= targetRank;
      })
      .filter((exercise) => !chosenIds.has(exercise.id))
      .sort((left, right) => {
        const leftFailed = latestById.has(left.id) ? 0 : 1;
        const rightFailed = latestById.has(right.id) ? 0 : 1;
        return leftFailed - rightFailed ||
          Math.abs(difficultyRank[left.difficulty] - targetRank) - Math.abs(difficultyRank[right.difficulty] - targetRank);
      });

    const exercise = candidates[0];
    if (!exercise) continue;
    chosenIds.add(exercise.id);
    const reason = !assessment
      ? `Comece a praticar ${category} em ${language}.`
      : assessment.score < 60
        ? `Reforce ${category}: o índice calculado está em ${assessment.score}/100.`
        : `Avance em ${category} com um desafio de dificuldade ${exercise.difficulty.toLowerCase()}.`;
    recommendations.push({ exercise, reason });
  }
  return recommendations;
}
