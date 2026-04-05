import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function NewEntryButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('/journal/new-entry')}
      activeOpacity={0.8}>
      <MaterialIcons name="edit-note" size={22} color={Colors.primary} />
      <Text style={styles.text}>New Entry</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryLight,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});