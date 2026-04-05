import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const TEMPLATES = [
  {
    id: 'avoiding',
    label: 'What am I avoiding, and why?',
    starter: 'What I am avoiding right now is ',
  },
  {
    id: 'grateful',
    label: 'What am I grateful for today?',
    starter: 'Today I am grateful for ',
  },
  {
    id: 'lookingforward',
    label: "Something I'm looking forward to",
    starter: "Something I'm looking forward to is ",
  },
  {
    id: 'tomorrow',
    label: 'What would make tomorrow better?',
    starter: 'To make tomorrow better, I will ',
  },
  {
    id: 'stressed',
    label: 'What stressed me out today?',
    starter: 'Today I felt stressed about ',
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
      <View style={styles.card}>
        <Text style={styles.title}>Templates</Text>

        {TEMPLATES.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.row}
            onPress={() => handleTemplate(template)}
            activeOpacity={0.7}>
            <MaterialIcons
              name="edit-note"
              size={22}
              color={Colors.primary}
            />
            <Text style={styles.label}>{template.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.viewMore} activeOpacity={0.7}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    flex: 1,
    fontWeight: '500',
  },
  viewMore: {
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  viewMoreText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});