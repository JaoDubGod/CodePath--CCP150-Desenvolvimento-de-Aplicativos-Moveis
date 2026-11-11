import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InfoCard } from './src/components/InfoCard';
import { ScreenLayout } from './src/components/ScreenLayout';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenLayout
        title="Aprenda programação"
        description="Pratique no seu ritmo e acompanhe sua evolução."
      >
        <InfoCard
          title="Bem-vindo ao CodePath"
          message="Este é o primeiro esboço da tela inicial."
        />
        <InfoCard
          title="Próxima atividade"
          message="O catálogo de exercícios será conectado nas próximas etapas."
        />
      </ScreenLayout>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
