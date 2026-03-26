import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CampusEvents from '../../components/home/CampusEvents';
import HomeHeader from '../../components/home/HomeHeader';
import InspirationCard from '../../components/home/InspirationCard';
import MoodPicker from '../../components/home/MoodPicker';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <MoodPicker/>
        <InspirationCard />
        <CampusEvents />
        {/* বাকি modules এখানে আসবে একে একে */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#E6F4F1',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});