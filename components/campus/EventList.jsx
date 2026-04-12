import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CAMPUS_EVENTS } from '../../constants/eventsData';

export default function EventList({ filter, campus }) {
  const [search, setSearch] = useState('');

  const filtered = CAMPUS_EVENTS.filter((e) => {
    const matchCampus = e.campus === campus;
    const matchFilter = filter === 'all' || e.type === filter;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchCampus && matchFilter && matchSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's happening around you</Text>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          placeholderTextColor={Colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
        <MaterialIcons name="search" size={20} color={Colors.textLight} />
      </View>

      {/* Event list */}
      <View style={styles.card}>
        {filtered.length === 0 ? (
          <Text style={styles.emptyText}>No events found.</Text>
        ) : (
          filtered.map((event, index) => (
            <View key={event.id}>
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.7}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>
                <MaterialIcons name="chevron-right" size={20} color={Colors.textLight} />
              </TouchableOpacity>
              {index < filtered.length - 1 && <View style={styles.divider} />}
            </View>
          ))
        )}
      </View>
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
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  eventTitle: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  emptyText: {
    padding: 16,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
});