import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExerciseCatalogScreen } from '../screens/ExerciseCatalogScreen';
import { ExerciseDetailScreen } from '../screens/ExerciseDetailScreen';
import { ExercisesStackParamList } from './types';

const Stack = createNativeStackNavigator<ExercisesStackParamList>();

export function ExercisesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catalog"
        component={ExerciseCatalogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={ExerciseDetailScreen}
        options={{
          title: 'Exercício',
          headerStyle: { backgroundColor: '#F5F6F4' },
          headerTintColor: '#252C31',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
