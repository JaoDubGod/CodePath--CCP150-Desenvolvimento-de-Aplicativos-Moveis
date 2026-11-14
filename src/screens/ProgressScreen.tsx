import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InfoCard } from '../components/InfoCard';
import { ScreenLayout } from '../components/ScreenLayout';
import { useStudy } from '../context/StudyContext';
import { exercises } from '../data/exercises';
import { calculateCategoryAssessments, recommendExercises } from '../utils/assessment';
import { calculateWeeklyStudyStats } from '../utils/studyStats';

export function ProgressScreen() {
  const { attempts, backendStatus, studyEntries, weeklyGoalMinutes } = useStudy();
  const solvedCount = new Set(
    attempts.filter((attempt) => attempt.correct).map((attempt) => attempt.exerciseId),
  ).size;
  const correctAttempts = attempts.filter((attempt) => attempt.correct).length;
  const assessments = useMemo(
    () => calculateCategoryAssessments(attempts, exercises),
    [attempts],
  );
  const recommendations = useMemo(
    () => recommendExercises(attempts, exercises, assessments),
    [attempts, assessments],
  );
  const weeklyStats = useMemo(
    () => calculateWeeklyStudyStats(studyEntries, weeklyGoalMinutes),
    [studyEntries, weeklyGoalMinutes],
  );

  return (
    <ScreenLayout
      title="Meu progresso"
      description="Veja quais assuntos você já praticou e onde pode continuar estudando."
    >
      <InfoCard
        title={backendStatus === 'connected' ? 'Seu progresso' : 'Nesta sessão'}
        message={`Exercícios resolvidos: ${solvedCount}\nTentativas: ${attempts.length}\nRespostas corretas: ${correctAttempts}`}
      />
      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Meta dos últimos 7 dias</Text>
        <Text style={styles.goalText}>
          {weeklyStats.minutes} de {weeklyStats.goalMinutes} min · {weeklyStats.sessions} sessões · {weeklyStats.goalPercent}%
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${weeklyStats.goalPercent}%` }]} />
        </View>
        <Text style={styles.goalText}>
          {weeklyStats.remainingMinutes === 0
            ? 'Meta semanal alcançada.'
            : `Faltam ${weeklyStats.remainingMinutes} minutos para atingir a meta.`}
        </Text>
      </View>
      <InfoCard
        title="Como interpretar"
        message="O índice de 0 a 100 resume acertos recentes, dificuldade superada, variedade de exercícios e evolução; não é uma taxa de acerto. O nível também respeita a dificuldade mais alta que você já acertou. Com menos de três exercícios diferentes, a confiança ainda é baixa."
      />

      <InfoCard
        title="Recomendações para praticar"
        message={recommendations.length
          ? recommendations.map(({ exercise, reason }) => `${exercise.title} (${exercise.language} · ${exercise.category}) — ${reason}`).join('\n\n')
          : 'Você já acertou todos os exercícios disponíveis. Novos desafios poderão ser adicionados ao catálogo.'}
      />

      {assessments.length === 0 ? (
        <InfoCard title="Desempenho por assunto" message="Resolva exercícios para começar a estimar seu conhecimento em cada assunto." />
      ) : assessments.map((item) => {
        const trend = item.trendPoints === null
          ? 'evolução ainda sem dados suficientes'
          : item.trendPoints > 0
            ? `subindo ${item.trendPoints} pontos percentuais`
            : item.trendPoints < 0
              ? `caindo ${Math.abs(item.trendPoints)} pontos percentuais`
              : 'estável';
        return (
          <InfoCard
            key={`${item.language}-${item.category}`}
            title={`${item.language} · ${item.category}`}
            message={`Nível: ${item.level} · índice ${item.score}/100 · confiança ${item.confidence}\nExercícios diferentes: ${item.uniqueExerciseCount} (${item.correctUniqueCount} corretos) · tentativas: ${item.attemptCount}\nEvolução: ${trend}`}
          />
        );
      })}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 16,
  },
  goalTitle: {
    color: '#252C31',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  goalText: {
    color: '#566168',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
  },
  progressTrack: {
    backgroundColor: '#E5E9E7',
    borderRadius: 5,
    height: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#315F59',
    height: '100%',
  },
});
