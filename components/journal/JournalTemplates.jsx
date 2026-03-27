import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TEMPLATES = [
  {
    id: 'excited',
    emoji: '',
    label: 'Something I am excited about...',
    starter: 'Something I am excited about is ',
  },
  {
    id: 'anxious',
    emoji: '',
    label: 'I felt anxious about...',
    starter: 'I felt anxious about ',
  },
  {
    id: 'todo',
    emoji: '',
    label: 'To-do plan for this week...',
    starter: 'My to-do plan for this week:\n1. \n2. \n3. ',
  },
];

export default function JournalTemplates() {
  const router = useRouter();

  const handleTemplate = (template) => {
    router.push({
      pathname: '/journal/new-entry',
      params: { starter: template.starter },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose from templates</Text>

      {TEMPLATES.map((template) => (
        <TouchableOpacity
          key={template.id}
          style={styles.card}
          onPress={() => handleTemplate(template)}
          activeOpacity={0.7}>
          <Text style={styles.emoji}>{template.emoji}</Text>
          <Text style={styles.label}>{template.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
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
    gap: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: {
    fontSize: 22,
  },
  label: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
});