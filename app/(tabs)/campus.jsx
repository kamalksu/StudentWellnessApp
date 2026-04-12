import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CampusMap from '../../components/campus/CampusMap';
import EventFilter from '../../components/campus/EventFilter';
import EventList from '../../components/campus/EventList';
import TopBar from '../../components/shared/TopBar';
import { Colors } from '../../constants/Colors';
import { CAMPUSES } from '../../constants/eventsData';

export default function CampusScreen() {
  const [filter, setFilter] = useState('all');
  const [campus, setCampus] = useState('kennesaw');
  const [showDropdown, setShowDropdown] = useState(false);

  const currentCampus = CAMPUSES.find((c) => c.id === campus);

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradient}>
        <TopBar title="My Campus Events" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          <EventFilter selected={filter} onSelect={setFilter} />

          {/* Campus Dropdown */}
          <TouchableOpacity
            style={styles.campusDropdown}
            onPress={() => setShowDropdown(true)}
            activeOpacity={0.7}>
            <Text style={styles.campusLabel}>{currentCampus?.label}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
          </TouchableOpacity>

          <CampusMap campus={campus} filter={filter}/>
          <EventList filter={filter} campus={campus} />
        </ScrollView>
      </LinearGradient>

      {/* Campus Picker Modal */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}>
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownTitle}>Select Campus</Text>
            {CAMPUSES.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.dropdownItem,
                  campus === c.id && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  setCampus(c.id);
                  setShowDropdown(false);
                }}>
                <Text style={[
                  styles.dropdownItemText,
                  campus === c.id && styles.dropdownItemTextSelected,
                ]}>
                  {c.label}
                </Text>
                {campus === c.id && (
                  <MaterialIcons name="check" size={18} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.gradientStart },
  gradient: { flex: 1 },
  container: { flex: 1 },
  campusDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    gap: 4,
  },
  campusLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: Colors.primaryLight,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  dropdownItemTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});