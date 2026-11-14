import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { InfoCard } from '../components/InfoCard';
import { ScreenLayout } from '../components/ScreenLayout';
import { useStudy } from '../context/StudyContext';

export function JournalScreen() {
  const {
    studyEntries,
    addStudyEntry,
    deleteStudyEntry,
    backendStatus,
    weeklyGoalMinutes,
    setWeeklyGoalMinutes,
  } = useStudy();
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [minutes, setMinutes] = useState('');
  const [error, setError] = useState('');
  const [goalDraft, setGoalDraft] = useState<string | null>(null);
  const [goalMessage, setGoalMessage] = useState('');

  async function saveGoal() {
    const parsedGoal = Number(goalDraft ?? weeklyGoalMinutes);
    if (!Number.isInteger(parsedGoal) || parsedGoal < 1 || parsedGoal > 10080) {
      setGoalMessage('Informe uma meta entre 1 e 10.080 minutos por semana.');
      return;
    }
    try {
      await setWeeklyGoalMinutes(parsedGoal);
      setGoalDraft(null);
      setGoalMessage('Meta semanal salva.');
    } catch (goalError) {
      setGoalMessage(goalError instanceof Error ? goalError.message : 'Não foi possível salvar a meta.');
    }
  }

  async function saveEntry() {
    const parsedMinutes = Number(minutes);
    if (!topic.trim() || !Number.isInteger(parsedMinutes) || parsedMinutes <= 0) {
      setError('Informe um assunto e uma duração em minutos maior que zero.');
      return;
    }

    try {
      await addStudyEntry(topic.trim(), notes.trim(), parsedMinutes);
      setTopic('');
      setNotes('');
      setMinutes('');
      setError('');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o registro.');
    }
  }

  return (
    <ScreenLayout
      title="Diário de estudos"
      description="Registre sessões de estudo e anote o que aprendeu."
    >
      <Text style={styles.sectionTitle}>Meta semanal</Text>
      <Text style={styles.label}>Minutos de estudo desejados</Text>
      <View style={styles.goalRow}>
        <TextInput
          value={goalDraft ?? String(weeklyGoalMinutes)}
          onChangeText={(value) => setGoalDraft(value)}
          keyboardType="number-pad"
          placeholder="150"
          style={[styles.input, styles.goalInput]}
        />
        <Pressable accessibilityRole="button" onPress={() => void saveGoal()} style={styles.goalButton}>
          <Text style={styles.saveButtonText}>Salvar meta</Text>
        </Pressable>
      </View>
      {goalMessage ? <Text style={styles.status}>{goalMessage}</Text> : null}

      <Text style={styles.sectionTitle}>Registrar sessão</Text>
      <Text style={styles.label}>Assunto estudado</Text>
      <TextInput
        value={topic}
        onChangeText={setTopic}
        placeholder="Ex.: estruturas condicionais"
        style={styles.input}
      />
      <Text style={styles.label}>Duração em minutos</Text>
      <TextInput
        value={minutes}
        onChangeText={setMinutes}
        keyboardType="number-pad"
        placeholder="Ex.: 30"
        style={styles.input}
      />
      <Text style={styles.label}>Anotações (opcional)</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="O que você aprendeu?"
        style={[styles.input, styles.notesInput]}
      />
      <Pressable accessibilityRole="button" onPress={saveEntry} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar sessão</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.sectionTitle}>Histórico de estudos</Text>
      {studyEntries.length === 0 ? (
        <InfoCard title="Diário vazio" message="Seus registros aparecerão aqui após salvar uma sessão." />
      ) : (
        studyEntries.map((entry) => (
          <View key={entry.id} style={styles.entry}>
            <Text style={styles.entryTitle}>{entry.topic}</Text>
            <Text style={styles.entryMeta}>
              {entry.minutes} min · {new Date(entry.createdAt).toLocaleString('pt-BR')}
            </Text>
            {entry.notes ? <Text style={styles.entryNotes}>{entry.notes}</Text> : null}
            <Pressable
              accessibilityRole="button"
              onPress={() => void deleteStudyEntry(entry.id).catch((deleteError: unknown) => {
                setError(deleteError instanceof Error ? deleteError.message : 'Não foi possível excluir.');
              })}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Excluir registro</Text>
            </Pressable>
          </View>
        ))
      )}
      {backendStatus === 'connecting' ? <Text style={styles.status}>Conectando ao banco...</Text> : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#252C31',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 7,
    borderWidth: 1,
    color: '#252C31',
    fontSize: 15,
    padding: 11,
  },
  notesInput: {
    minHeight: 78,
    textAlignVertical: 'top',
  },
  goalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  goalInput: {
    flex: 1,
  },
  goalButton: {
    alignItems: 'center',
    backgroundColor: '#315F59',
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#315F59',
    borderRadius: 7,
    marginTop: 14,
    padding: 13,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  error: {
    color: '#A33B32',
    fontSize: 13,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#252C31',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 24,
  },
  entry: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  entryTitle: {
    color: '#252C31',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryMeta: {
    color: '#566168',
    fontSize: 13,
    marginTop: 5,
  },
  entryNotes: {
    color: '#252C31',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 5,
  },
  deleteText: {
    color: '#A33B32',
    fontSize: 13,
    fontWeight: 'bold',
  },
  status: {
    color: '#566168',
    fontSize: 13,
    marginTop: 8,
  },
});
