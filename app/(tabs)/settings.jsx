import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import CounselorContact from '../../components/settings/CounselorContact';
import CustomizationSettings from '../../components/settings/CustomizationSettings';
import NotificationsSettings from '../../components/settings/NotificationsSettings';
import ProfileSection from '../../components/settings/ProfileSection';
import TopBar from '../../components/shared/TopBar';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase/config';


export default function SettingsScreen() {
  const { backgroundTheme } = useTheme();
  const [notifications, setNotifications] = useState(false);
  const [passcode, setPasscode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => await signOut(auth) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={backgroundTheme.colors}
        style={styles.gradient}>
        <TopBar title="Profile" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

          {/* Profile Section */}
          <ProfileSection />

          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <View style={styles.card}>
              {/* Notifications */}
              <TouchableOpacity 
                style={styles.row} 
                activeOpacity={0.7}
                onPress={() => setShowNotifications(true)}>
                <MaterialIcons name="notifications" size={22} color={Colors.primary} />
                <Text style={styles.rowLabel}>Notifications</Text>
                <MaterialIcons name="chevron-right" size={22} color={Colors.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Customization */}
              <TouchableOpacity 
                style={styles.row} 
                activeOpacity={0.7}
                onPress={() => setShowCustomization(true)}>
                <MaterialIcons name="edit" size={22} color={Colors.primary} />
                <Text style={styles.rowLabel}>Customization</Text>
                <MaterialIcons name="chevron-right" size={22} color={Colors.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Passcode */}
              <View style={styles.row}>
                <MaterialIcons name="lock" size={22} color={Colors.primary} />
                <Text style={styles.rowLabel}>Passcode</Text>
                <Switch
                  value={passcode}
                  onValueChange={setPasscode}
                  trackColor={{ false: '#ddd', true: Colors.primary }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.divider} />

              {/* Dark Mode */}
              <View style={styles.row}>
                <MaterialIcons name="dark-mode" size={22} color={Colors.primary} />
                <Text style={styles.rowLabel}>Dark Mode</Text>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#ddd', true: Colors.primary }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </View>

          {/* Counselor Contact */}
          <View style={styles.section}>
            <CounselorContact />
          </View>

          {/* Log Out */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

        </ScrollView>
        <NotificationsSettings
          visible={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
        <CustomizationSettings
          visible={showCustomization}
          onClose={() => setShowCustomization(false)}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.gradientStart },
  gradient: { flex: 1 },
  container: { flex: 1 },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
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
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  logoutButton: {
  backgroundColor: Colors.primary,
  marginHorizontal: 16,
  marginTop: 24,
  marginBottom: 32,
  padding: 16,
  borderRadius: 16,
  alignItems: 'center',

  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});