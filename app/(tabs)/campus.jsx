import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CampusMap from '../../components/campus/CampusMap';
import EventFilter from '../../components/campus/EventFilter';
import EventList from '../../components/campus/EventList';
import TopBar from '../../components/shared/TopBar';
import { Colors } from '../../constants/Colors';

export default function CampusScreen() {
  const [filter, setFilter] = useState('all');

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradient}>
        <TopBar title="My Campus Events" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <EventFilter selected={filter} onSelect={setFilter} />
          <CampusMap />
          <EventList filter={filter} />
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