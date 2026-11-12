import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { exercises, Language } from '../data/exercises';
import { ScreenLayout } from '../components/ScreenLayout';
import { ExercisesStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExercisesStackParamList, 'Catalog'>;
type LanguageFilter = 'Todas' | Language;

const filters: LanguageFilter[] = ['Todas', 'Python', 'JavaScript'];

export function ExerciseCatalogScreen({ navigation }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageFilter>('Todas');
  const visibleExercises = exercises.filter(
    (exercise) => selectedLanguage === 'Todas' || exercise.language === selectedLanguage,
  );

  return (
    <ScreenLayout
      title="Exercícios"
      description="Escolha uma linguagem e pratique os conceitos de programação."
    >
      <View style={styles.filters}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            accessibilityRole="button"
            onPress={() => setSelectedLanguage(filter)}
            style={[
              styles.filter,
              selectedLanguage === filter && styles.selectedFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedLanguage === filter && styles.selectedFilterText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {visibleExercises.map((exercise) => (
        <Pressable
          key={exercise.id}
          accessibilityRole="button"
          onPress={() => navigation.navigate('Detail', { exerciseId: exercise.id })}
          style={styles.exerciseCard}
        >
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>
          <Text style={styles.exerciseMeta}>
            {exercise.language} · {exercise.category}
          </Text>
          <Text style={styles.exerciseMeta}>{exercise.difficulty}</Text>
        </Pressable>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filter: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedFilter: {
    backgroundColor: '#315F59',
    borderColor: '#315F59',
  },
  filterText: {
    color: '#252C31',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  exerciseTitle: {
    color: '#252C31',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  exerciseMeta: {
    color: '#566168',
    fontSize: 13,
    marginTop: 3,
  },
});
