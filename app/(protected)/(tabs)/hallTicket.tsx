import { View, Text, StyleSheet } from 'react-native';

export default function HallTicketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hall Ticket</Text>
      <Text style={styles.text}>Download your hall tickets here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#212529',
  },
  text: {
    fontSize: 16,
    color: '#6c757d',
  },
});