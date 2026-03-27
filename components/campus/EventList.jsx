import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CAMPUS_EVENTS } from '../../constants/eventsData';

export default function EventList({ filter }) {
  const filtered = filter === 'all'
    ? CAMPUS_EVENTS
    : CAMPUS_EVENTS.filter((e) => e.type === filter);

  if (filtered.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Campus Events</Text>
      {filtered.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          activeOpacity={0.8}>
          <Image
            source={{ uri: event.image }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <Text style={styles.eventMeta}>📅 {event.date}</Text>
            <Text style={styles.eventMeta}>🕐 {event.time} • 📍 {event.location}</Text>
            <View style={[styles.badge,
              event.type === 'counseling' ? styles.badgeCounseling : styles.badgeWorkshop
            ]}>
              <Text style={styles.badgeText}>{event.category}</Text>
            </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
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
    width: 70,
    height: 70,
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
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 6,
  },
  badgeCounseling: {
    backgroundColor: '#E6F4F1',
  },
  badgeWorkshop: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
  },
});