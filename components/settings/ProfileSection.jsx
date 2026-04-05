import { MaterialIcons } from '@expo/vector-icons';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth } from '../../firebase/config';

export default function ProfileSection() {
  const user = auth.currentUser;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || 'Student');

  const handleSave = async () => {
    try {
      await updateProfile(user, { displayName: name });
      setEditing(false);
      Alert.alert('✅ Success', 'Profile updated!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={28} color={Colors.primary} />
        </View>

        {/* Name */}
        {editing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoFocus
            onSubmitEditing={handleSave}
          />
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        {/* Edit + Close icons */}
        <TouchableOpacity
          onPress={() => editing ? handleSave() : setEditing(true)}
          style={styles.iconBtn}>
          <MaterialIcons
            name={editing ? 'check' : 'edit'}
            size={20}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>

        {editing && (
          <TouchableOpacity
            onPress={() => setEditing(false)}
            style={styles.iconBtn}>
            <MaterialIcons name="close" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingVertical: 4,
  },
  iconBtn: {
    padding: 4,
  },
});