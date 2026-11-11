import { StyleSheet, Text, View } from 'react-native';

type InfoCardProps = {
  title: string;
  message: string;
};

export function InfoCard({ title, message }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9DEDC',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 16,
  },
  title: {
    color: '#252C31',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  message: {
    color: '#566168',
    fontSize: 14,
    lineHeight: 21,
  },
});
