import { signOut } from 'firebase/auth';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PasscodeToggle from '../../components/journal/PasscodeToggle';
import CounselorContact from '../../components/settings/CounselorContact';
import ProfileSection from '../../components/settings/ProfileSection';
import SettingsOptions from '../../components/settings/SettingsOptions';
import TopBar from '../../components/shared/TopBar';
import { auth } from '../../firebase/config';

export default function SettingsScreen() {
  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => await signOut(auth) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="Settings" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileSection />
        <SettingsOptions />
        <PasscodeToggle />
        <CounselorContact />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1 },
  logoutButton: {
    backgroundColor: '#2DD4BF',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});