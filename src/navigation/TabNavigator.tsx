import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExercisesStack } from './ExercisesStack';
import { HomeScreen } from '../screens/HomeScreen';
import { JournalScreen } from '../screens/JournalScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#315F59',
        tabBarInactiveTintColor: '#737C82',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#D9DEDC',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen
        name="Exercises"
        component={ExercisesStack}
        options={{ title: 'Exercícios' }}
      />
      <Tab.Screen name="Journal" component={JournalScreen} options={{ title: 'Diário' }} />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: 'Progresso' }}
      />
    </Tab.Navigator>
  );
}
