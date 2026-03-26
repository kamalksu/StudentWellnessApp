import { MaterialIcons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RESOURCES = [
  {
    id: '1',
    title: 'Campus Counseling',
    subtitle: 'KSU Counseling & Psychological Services',
    icon: 'school',
    action: () => Linking.openURL('https://counseling.kennesaw.edu'),
    type: 'link',
  },
  {
    id: '2',
    title: 'Crisis Hotline',
    subtitle: 'Call 988 - Mental Health Crisis Line',
    icon: 'phone',
    action: () => Linking.openURL('tel:988'),
    type: 'call',
  },
];

export default function Resources() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources</Text>

      {RESOURCES.map((resource) => (
        <TouchableOpacity
          key={resource.id}
          style={styles.card}
          onPress={resource.action}
          activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={resource.icon} size={22} color="#2DD4BF" />
          </View>
          <View style={styles.info}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceSubtitle}>{resource.subtitle}</Text>
          </View>
          <MaterialIcons
            name={resource.type === 'call' ? 'chevron-right' : 'chevron-right'}
            size={20}
            color="#ccc"
          />
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
    padding: 14,
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  resourceSubtitle: {
    fontSize: 12,
    color: '#888',
  },
});