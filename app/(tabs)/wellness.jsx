import { StyleSheet, Text, View } from 'react-native';

export default function WellnessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wellness — Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, color: '#999' },
});