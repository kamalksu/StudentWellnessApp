import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsOptions() {
  const [notifications, setNotifications] = useState({
    dailyMood: false,
    journal: false,
    campusEvents: false,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>

      {/* Notifications */}
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <MaterialIcons name="notifications" size={22} color="#555" />
        <Text style={styles.label}>Notifications</Text>
        <MaterialIcons name="chevron-right" size={22} color="#ccc" />
      </TouchableOpacity>

      {/* Notification toggles */}
      <View style={styles.subCard}>
        <View style={styles.toggleRow}>
          <Text style={styles.subLabel}>Daily Mood Reminder</Text>
          <Switch
            value={notifications.dailyMood}
            onValueChange={(val) =>
              setNotifications((prev) => ({ ...prev, dailyMood: val }))
            }
            trackColor={{ false: '#ddd', true: '#2DD4BF' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.toggleRow}>
          <Text style={styles.subLabel}>Journal Reminder</Text>
          <Switch
            value={notifications.journal}
            onValueChange={(val) =>
              setNotifications((prev) => ({ ...prev, journal: val }))
            }
            trackColor={{ false: '#ddd', true: '#2DD4BF' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.toggleRow}>
          <Text style={styles.subLabel}>Campus Events</Text>
          <Switch
            value={notifications.campusEvents}
            onValueChange={(val) =>
              setNotifications((prev) => ({ ...prev, campusEvents: val }))
            }
            trackColor={{ false: '#ddd', true: '#2DD4BF' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Customization */}
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <MaterialIcons name="edit" size={22} color="#555" />
        <Text style={styles.label}>Customization</Text>
        <MaterialIcons name="chevron-right" size={22} color="#ccc" />
      </TouchableOpacity>

      {/* Dark Mode */}
      <View style={styles.card}>
        <MaterialIcons name="dark-mode" size={22} color="#555" />
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={false}
          trackColor={{ false: '#ddd', true: '#2DD4BF' }}
          thumbColor="#fff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  subCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  subLabel: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
});