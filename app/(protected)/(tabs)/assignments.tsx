import { View, Text, StyleSheet } from 'react-native';

export default function AssignmentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignments</Text>
      <Text style={styles.text}>Your assignments will appear here</Text>
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