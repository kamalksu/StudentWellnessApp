import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import MoodPicker from '../../components/home/MoodPicker';
import TopBar from '../../components/shared/TopBar';
import MoodCalendar from '../../components/wellness/MoodCalendar';
import RelaxingTechniques from '../../components/wellness/RelaxingTechniques';
import WellbeingTopics from '../../components/wellness/WellbeingTopics';

export default function WellnessScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="My Wellness" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <MoodPicker />
        <MoodCalendar />
        <RelaxingTechniques />
        <WellbeingTopics />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1 },
});