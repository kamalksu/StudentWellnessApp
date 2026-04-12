// components/campus/CampusMap.web.jsx
import { StyleSheet, Text, View } from 'react-native';

const EVENT_LOCATIONS = [
  {
    id: '1',
    title: 'Recreation Center',
    coordinate: { latitude: 34.0397, longitude: -84.5800 },
    color: '#2DD4BF',
  },
  {
    id: '2',
    title: 'English Building',
    coordinate: { latitude: 34.0410, longitude: -84.5785 },
    color: '#FF6B6B',
  },
  {
    id: '3',
    title: '3D Lab - STEM Building',
    coordinate: { latitude: 34.0388, longitude: -84.5810 },
    color: '#6C63FF',
  },
  {
    id: '4',
    title: 'Student Center',
    coordinate: { latitude: 34.0402, longitude: -84.5795 },
    color: '#FF9800',
  },
];

export default function CampusMap() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kennesaw Campus</Text>

      {/* Google Maps iframe centered on KSU */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d-84.5800!3d34.0397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f51e1f5a123455%3A0x1234567890abcdef!2sKennesaw%20State%20University!5e0!3m2!1sen!2sus!4v1"
        width="100%"
        height="200"
        style={{ border: 0, display: 'block' }}
        allowFullScreen=""
        loading="lazy"
      />

      {/* Location pins legend */}
      <View style={styles.legend}>
        {EVENT_LOCATIONS.map((location) => (
          <View key={location.id} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: location.color }]} />
            <Text style={styles.legendText}>{location.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    padding: 12,
    backgroundColor: '#fff',
  },
  legend: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12,
    marginBottom: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
});