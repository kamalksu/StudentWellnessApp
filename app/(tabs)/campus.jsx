import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CampusMap from '../../components/campus/CampusMap';
import EventFilter from '../../components/campus/EventFilter';
import EventList from '../../components/campus/EventList';
import TopBar from '../../components/shared/TopBar';

export default function CampusScreen() {
  const [filter, setFilter] = useState('all');

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="My Campus Events" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <EventFilter selected={filter} onSelect={setFilter} />
        <CampusMap />
        <EventList filter={filter} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1 },
});