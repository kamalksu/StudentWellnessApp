import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function WantToReflect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Want to reflect?</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/journal/new-entry')}
          activeOpacity={0.7}>
          <MaterialIcons name="edit-note" size={20} color={Colors.primary} />
          <Text style={styles.label}>Write a Journal Entry</Text>
          <MaterialIcons name="chevron-right" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});