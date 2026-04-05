import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function WantToReflect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Want to reflect?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/journal/new-entry')}
        activeOpacity={0.7}>
        <MaterialIcons name="edit-note" size={20} color={Colors.primary} />
        <Text style={styles.buttonText}>Write a Journal Entry</Text>
        <MaterialIcons name="arrow-forward" size={18} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  button: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  marginLeft: 150,
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});