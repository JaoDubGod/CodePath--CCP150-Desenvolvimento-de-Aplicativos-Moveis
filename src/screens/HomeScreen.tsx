import { InfoCard } from '../components/InfoCard';
import { ScreenLayout } from '../components/ScreenLayout';
import { useStudy } from '../context/StudyContext';

export function HomeScreen() {
  const { attempts, backendMessage, backendStatus } = useStudy();
  const solvedCount = new Set(
    attempts.filter((attempt) => attempt.correct).map((attempt) => attempt.exerciseId),
  ).size;

  return (
    <ScreenLayout
      title="Aprenda programação"
      description="Pratique no seu ritmo e acompanhe sua evolução, um assunto de cada vez."
    >
      <InfoCard
        title="Seu estudo até agora"
        message={`${solvedCount} exercícios resolvidos e ${attempts.length} tentativas registradas${backendStatus === 'connected' ? ' na sua conta' : ' nesta sessão'}.`}
      />
      <InfoCard
        title={backendStatus === 'connected' ? 'Banco conectado' : 'Armazenamento'}
        message={backendMessage}
      />
      <InfoCard
        title="Comece por um assunto"
        message="Abra Exercícios no menu e escolha Python ou JavaScript."
      />
    </ScreenLayout>
  );
}
