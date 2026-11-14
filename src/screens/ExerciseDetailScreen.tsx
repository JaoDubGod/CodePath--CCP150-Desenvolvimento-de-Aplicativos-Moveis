import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { InfoCard } from '../components/InfoCard';
import { ScreenLayout } from '../components/ScreenLayout';
import { useStudy } from '../context/StudyContext';
import { exercises } from '../data/exercises';
import { ExercisesStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExercisesStackParamList, 'Detail'>;

export function ExerciseDetailScreen({ route }: Props) {
  const exercise = exercises.find((item) => item.id === route.params.exerciseId);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { registerAttempt, backendStatus } = useStudy();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!exercise) {
    return (
      <ScreenLayout title="Exercício não encontrado" description="Volte ao catálogo e escolha outro exercício.">
        <InfoCard title="Item indisponível" message="Este exercício não está presente no catálogo local." />
      </ScreenLayout>
    );
  }

  const currentExercise = exercise;

  async function checkAnswer() {
    if (selectedOption === null) {
      setFeedback('Escolha uma alternativa antes de verificar.');
      return;
    }

    setIsSubmitting(true);
    try {
      const locallyCorrect = selectedOption === currentExercise.correctOption;
      const result = await registerAttempt(currentExercise.id, locallyCorrect, selectedOption);
      const correct = result?.attempt.correct ?? locallyCorrect;
      void Haptics.notificationAsync(
        correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
      ).catch(() => undefined);
      setFeedback(correct
        ? `Saída esperada: ${result?.expectedOutput ?? currentExercise.expectedOutput}. ${result?.explanation ?? currentExercise.explanation}`
        : backendStatus === 'connected'
          ? 'Ainda não. Revise o código e tente outra alternativa.'
          : 'Ainda não. Revise o código e tente outra alternativa.');
    } catch (submitError) {
      setFeedback(submitError instanceof Error ? submitError.message : 'Não foi possível registrar a tentativa.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenLayout
      title={currentExercise.title}
      description={`${currentExercise.language} · ${currentExercise.category} · ${currentExercise.difficulty}`}
    >
      <InfoCard title="Enunciado" message={currentExercise.statement} />
      <InfoCard title="Entrada esperada" message={currentExercise.expectedInput} />
      <InfoCard title="Exemplo" message={currentExercise.example} />
      <InfoCard title="Conceitos" message={currentExercise.concepts.join(', ')} />
      <InfoCard title="Critério de avaliação" message={currentExercise.evaluationCriteria} />

      <Text style={styles.sectionTitle}>Escolha a saída correta</Text>
      {currentExercise.options.map((option, index) => (
        <Pressable
          key={option}
          accessibilityRole="button"
          onPress={() => {
            setSelectedOption(index);
            setFeedback(null);
          }}
          style={[
            styles.option,
            selectedOption === index && styles.selectedOption,
          ]}
        >
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}

      <Pressable accessibilityRole="button" onPress={() => void checkAnswer()} style={styles.submitButton}>
        <Text style={styles.submitText}>{isSubmitting ? 'Registrando...' : 'Verificar resposta'}</Text>
      </Pressable>

      {feedback ? (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      ) : null}

    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#252C31',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 18,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 8,
    padding: 12,
  },
  selectedOption: {
    borderColor: '#315F59',
    borderWidth: 2,
  },
  optionText: {
    color: '#252C31',
    fontSize: 14,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#315F59',
    borderRadius: 7,
    marginBottom: 12,
    marginTop: 8,
    padding: 13,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  feedbackBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  feedbackText: {
    color: '#252C31',
    fontSize: 14,
    lineHeight: 21,
  },
});
