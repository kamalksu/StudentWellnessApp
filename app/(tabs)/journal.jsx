import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TopBar from '../../components/shared/TopBar';

export default function JournalScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="My Journal" />
      <View style={styles.container}>
        <Text style={styles.text}>Journal — Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#999' },
});