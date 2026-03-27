import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
const { Marker } = require('react-native-maps');

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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.0397,
          longitude: -84.5800,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {EVENT_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            title={location.title}
            pinColor={location.color}
          />
        ))}
      </MapView>
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
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    padding: 12,
    backgroundColor: '#fff',
  },
  map: {
    height: 200,
    width: '100%',
  },
});