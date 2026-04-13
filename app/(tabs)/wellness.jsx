import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import MoodPicker from '../../components/home/MoodPicker';
import TopBar from '../../components/shared/TopBar';
import MoodCalendar from '../../components/wellness/MoodCalendar';
import RelaxingTechniques from '../../components/wellness/RelaxingTechniques';
import WellbeingTopics from '../../components/wellness/WellbeingTopics';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

export default function WellnessScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const router = useRouter();
  const { backgroundTheme } = useTheme();

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={backgroundTheme.colors}
        style={styles.gradient}>
        <TopBar title="My Wellness" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          <MoodPicker 
               onMoodSelect={(mood) => setSelectedMood(mood)} 
               showWriteButton={true} 
            />

    

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
  writeButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  writeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});