import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenLayoutProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export function ScreenLayout({ title, description, children }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>CODEPATH</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.children}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6F4',
  },
  content: {
    padding: 20,
  },
  brand: {
    color: '#315F59',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 18,
  },
  title: {
    color: '#252C31',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#566168',
    fontSize: 15,
    lineHeight: 22,
  },
  children: {
    marginTop: 20,
  },
});
