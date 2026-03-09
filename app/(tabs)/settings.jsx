import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/config';

export default function SettingsScreen() {
  const [password, setPassword] = useState('');
  const user = auth.currentUser;

const handleLogout = async () => {
    if (Platform.OS === 'web') {
      // Use standard browser confirmation for web
      const confirmLogout = window.confirm('Are you sure you want to logout?');
      if (confirmLogout) {
        await signOut(auth);
      }
    } else {
      // Use native Alert for iOS/Android
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: async () => await signOut(auth) }
        ]
      );
    }
  };

  const handleDeleteAccount = () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password to delete account');
      return;
    }
    Alert.alert(
      'Delete Account',
      'This cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: confirmDelete }
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.name}>{user?.displayName}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2DD4BF', marginBottom: 32, marginTop: 60 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  email: { fontSize: 16, color: '#666', marginBottom: 4 },
  name: { fontSize: 16, color: '#666' },
  logoutButton: { backgroundColor: '#2DD4BF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 24 },
  dangerTitle: { fontSize: 16, fontWeight: 'bold', color: '#FF4444', marginBottom: 8 },
  dangerText: { fontSize: 14, color: '#666', marginBottom: 16, lineHeight: 22 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  deleteButton: { backgroundColor: '#FF4444', padding: 16, borderRadius: 8, alignItems: 'center' },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});