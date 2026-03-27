import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'counseling', label: 'Counseling' },
  { id: 'workshop', label: 'Workshops' },
];

export default function EventFilter({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.button,
            selected === filter.id && styles.buttonSelected,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonSelected: {
    backgroundColor: '#2DD4BF',
    borderColor: '#2DD4BF',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  labelSelected: {
    color: '#fff',
    fontWeight: '700',
  },
});