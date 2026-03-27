import { MaterialIcons } from '@expo/vector-icons';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../../firebase/config';

export default function ProfileSection() {
  const user = auth.currentUser;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || 'Student');

  const initials = name.charAt(0).toUpperCase();

  const handleSave = async () => {
    try {
      await updateProfile(user, { displayName: name });
      setEditing(false);
      Alert.alert('Success', 'Profile updated!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      {editing ? (
        <View style={styles.editRow}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoFocus
            placeholder="Your name"
          />
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={() => setEditing(true)}>
            <MaterialIcons name="edit" size={18} color="#2DD4BF" />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2DD4BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#999',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2DD4BF',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#2DD4BF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});