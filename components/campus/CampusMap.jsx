import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Linking, Modal, Platform,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CAMPUS_EVENTS, CAMPUSES } from '../../constants/eventsData';

export default function CampusMap({ campus, filter }) {
  const mapRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const campusData = CAMPUSES.find((c) => c.id === campus) || CAMPUSES[0];
  const events = CAMPUS_EVENTS.filter((e) => {
    const matchCampus = e.campus === campus;
    const matchFilter = filter === 'all' || e.type === filter;
    return matchCampus && matchFilter;  // 👈 filter markers too
  });

  const DebugEvents = CAMPUS_EVENTS.filter((e) => {
  const matchCampus = e.campus === campus;
  const matchFilter = filter === 'all' || e.type === filter;
  return matchCampus && matchFilter;
});

console.log('Filter:', filter);
console.log('Campus:', campus);
console.log('Events count:', DebugEvents.length);
console.log('All event coordinates:', JSON.stringify(DebugEvents.map(e => ({ title: e.title, coord: e.coordinate }))));

  useEffect(() => {
    if (mapReady && mapRef.current) {
      setTimeout(() => {
        mapRef.current.setCamera({
          center: {
            latitude: campusData.region.latitude,
            longitude: campusData.region.longitude,
          },
          pitch: 45,      // 👈 3D buildings
          heading: 0,
          altitude: 600, // 👈 higher = more zoomed out = all markers visible
          zoom: 50,       // 👈 lower zoom = more area visible
        });
      }, 300);
    }
  }, [campus, mapReady, filter]);

  const openGoogleMaps = (event) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${event.coordinate.latitude},${event.coordinate.longitude}`;
    Linking.openURL(url);
  };

  const openNativeMaps = (event) => {
    const { latitude, longitude } = event.coordinate;
    const url = Platform.select({
      ios: `maps://app?ll=${latitude},${longitude}&q=${encodeURIComponent(event.location)}`,
      android: `geo:${latitude},${longitude}?q=${encodeURIComponent(event.location)}`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
          <MapView
      ref={mapRef}
      style={styles.map}
      onMapReady={() => setMapReady(true)}
      showsBuildings={true}
      pitchEnabled={true}
      initialCamera={{
        center: {
          latitude: campusData.region.latitude,
          longitude: campusData.region.longitude,
        },
        pitch: 45,
        heading: 0,
        altitude: 1500,
        zoom: 15,
      }}>
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={event.coordinate}
            title={event.title}
            onPress={() => setSelectedEvent(event)}
          />
        ))}
      </MapView>

      <Modal
        visible={!!selectedEvent}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedEvent(null)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setSelectedEvent(null)}>
          <View style={styles.popup}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedEvent(null)}>
              <MaterialIcons name="close" size={18} color="#666" />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>{selectedEvent?.title}</Text>
            <Text style={styles.popupLocation}>📍 {selectedEvent?.location}</Text>
            <TouchableOpacity
              style={styles.mapBtn}
              onPress={() => openGoogleMaps(selectedEvent)}>
              <MaterialIcons name="map" size={16} color="#fff" />
              <Text style={styles.mapBtnText}>Open in Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapBtn, styles.nativeBtn]}
              onPress={() => openNativeMaps(selectedEvent)}>
              <MaterialIcons name="near-me" size={16} color="#4A6FA5" />
              <Text style={[styles.mapBtnText, styles.nativeBtnText]}>
                Open in Maps App
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  map: { height: 280, width: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  closeBtn: { position: 'absolute', top: 12, right: 12, padding: 4 },
  popupTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    paddingRight: 24,
  },
  popupLocation: { fontSize: 13, color: '#666', marginBottom: 16 },
  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4A6FA5',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  mapBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  nativeBtn: { backgroundColor: '#EEF2FF', marginBottom: 0 },
  nativeBtnText: { color: '#4A6FA5' },
});