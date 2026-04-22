import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Insight from '../../components/home/Insight';
import InspirationCard from '../../components/home/InspirationCard';
import MoodPicker from '../../components/home/MoodPicker';
import WantToReflect from '../../components/home/WantToReflect';
import TopBar from '../../components/shared/TopBar';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

export default function HomeScreen() {
  const { backgroundTheme } = useTheme();
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={backgroundTheme.colors}
        style={styles.gradient}>
        <TopBar showGreeting={true} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          <MoodPicker />
          <InspirationCard />
          <WantToReflect />
          <Insight />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.gradientStart,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});