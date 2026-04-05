import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HomeHeader from '../../components/home/HomeHeader';
import Insight from '../../components/home/Insight';
import InspirationCard from '../../components/home/InspirationCard';
import MoodPicker from '../../components/home/MoodPicker';
import WantToReflect from '../../components/home/WantToReflect';
import TopBar from '../../components/shared/TopBar';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradient}>
        <TopBar title="Welcome" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <HomeHeader />
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