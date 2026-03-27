import { MaterialIcons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TOPICS = [
  {
    id: 'stress',
    title: 'Stress and Anxiety',
    url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
  },
  {
    id: 'fitness',
    title: 'Fitness and Nutrition',
    url: 'https://www.cdc.gov/healthyweight/index.html',
  },
  {
    id: 'sleep',
    title: 'Sleep and Rest',
    url: 'https://www.sleepfoundation.org',
  },
  {
    id: 'social',
    title: 'Social Wellbeing',
    url: 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/social-connections',
  },
];

export default function WellbeingTopics() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wellbeing Topics</Text>
      </View>

      {TOPICS.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.card}
          onPress={() => Linking.openURL(topic.url)}
          activeOpacity={0.7}>
          <MaterialIcons name="folder-open" size={20} color="#2DD4BF" />
          <Text style={styles.topicTitle}>{topic.title}</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ccc" />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
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
  topicTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});