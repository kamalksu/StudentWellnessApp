import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'mental_health', label: 'Mental Health' },
  { id: 'sports', label: 'Sports' },
  { id: 'music', label: 'Music' },
];

export default function EventFilter({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      {FILTERS.map((filter) => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.chip,
            selected === filter.id && styles.chipSelected,
          ]}
          onPress={() => onSelect(filter.id)}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.label,
              selected === filter.id && styles.labelSelected,
            ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: Colors.primaryLight,
  },
  label: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
  labelSelected: {
    fontWeight: '700',
  },
});