import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CodePath</Text>
      <Text>Meu aplicativo Expo está funcionando.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6F4',
    padding: 24,
  },
  title: {
    color: '#315F59',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
