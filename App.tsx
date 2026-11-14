import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StudyProvider } from './src/context/StudyContext';
import { TabNavigator } from './src/navigation/TabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StudyProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </StudyProvider>
    </SafeAreaProvider>
  );
}
