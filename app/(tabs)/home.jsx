import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CampusEvents from '../../components/home/CampusEvents';
import HomeHeader from '../../components/home/HomeHeader';
import InspirationCard from '../../components/home/InspirationCard';
import MoodPicker from '../../components/home/MoodPicker';
import Resources from '../../components/home/Resources';
import TopBar from '../../components/shared/TopBar';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="Welcome" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <MoodPicker />
        <InspirationCard />
        <CampusEvents />
        <Resources />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E6F4F1' },
  container: { flex: 1, backgroundColor: '#f9f9f9' },
});