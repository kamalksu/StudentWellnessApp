import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CAMPUS_EVENTS, CAMPUSES } from '../../constants/eventsData';

export default function CampusMap({ campus, filter }) {
  const campusData = CAMPUSES.find((c) => c.id === campus) || CAMPUSES[0];
  const events = CAMPUS_EVENTS.filter((e) => {
    const matchCampus = e.campus === campus;
    const matchFilter = filter === 'all' || e.type === filter;
    return matchCampus && matchFilter;
  });

  const { latitude, longitude } = campusData.region;

  return (
    <View style={styles.container}>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1`}
        width="100%"
        height="280"
        style={{ border: 0, display: 'block' }}
        allowFullScreen=""
        loading="lazy"
      />
      <View style={styles.legend}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.legendItem}
            onPress={() => Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${event.coordinate.latitude},${event.coordinate.longitude}`
            )}>
            <Text style={styles.pin}>📍</Text>
            <Text style={styles.legendText}>{event.location}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16, marginTop: 16,
    borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#fff', shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  legend: {
    padding: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 8,
  },
  legendItem: {
    flexDirection: 'row', alignItems: 'center',
    gap: 4, marginRight: 12, marginBottom: 4,
  },
  pin: { fontSize: 12 },
  legendText: { fontSize: 12, color: '#555' },
});