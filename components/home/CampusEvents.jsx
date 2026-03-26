import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CAMPUS_EVENTS } from '../../constants/eventsData';

export default function CampusEvents() {
  const router = useRouter();
  const previewEvents = CAMPUS_EVENTS.slice(0, 2); // শুধু প্রথম ২টা দেখাবে

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus Events This Week</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/campus')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {previewEvents.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push('/(tabs)/campus')}>
          <Image
            source={{ uri: event.image }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <Text style={styles.eventMeta}>
              📅 {event.date}
            </Text>
            <Text style={styles.eventMeta}>
              🕐 {event.time} • 📍 {event.location}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  seeAll: {
    fontSize: 13,
    color: '#2DD4BF',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#E6F4F1',
  },
  info: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});