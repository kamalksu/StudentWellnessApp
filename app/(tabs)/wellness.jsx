import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import MoodPicker from '../../components/home/MoodPicker';
import TopBar from '../../components/shared/TopBar';
import MoodCalendar from '../../components/wellness/MoodCalendar';
import RelaxingTechniques from '../../components/wellness/RelaxingTechniques';
import WellbeingTopics from '../../components/wellness/WellbeingTopics';
import { Colors } from '../../constants/Colors';

export default function WellnessScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradient}>
        <TopBar title="My Wellness" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <MoodPicker />
          <MoodCalendar />
          <RelaxingTechniques />
          <WellbeingTopics />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.gradientStart },
  gradient: { flex: 1 },
  container: { flex: 1 },
});