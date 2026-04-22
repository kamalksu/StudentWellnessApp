import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth } from '../../firebase/config';
import OwlLogo from '../../assets/images/owl.svg';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export default function TopBar({ title, showGreeting = false }) {
  const router = useRouter();
  const user = auth.currentUser;
  const name = user?.displayName || 'Student';

  return (
    <View style={styles.container}>
      {showGreeting ? (
        <View style={styles.greetingRow}>
          <OwlLogo width={40} height={40} color={Colors.primary} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>
              {getGreeting()}, <Text style={styles.name}>{name}</Text>
            </Text>
            <Text style={styles.date}>{getFormattedDate()}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      <TouchableOpacity
        style={styles.avatar}
        onPress={() => router.push('/(tabs)/settings')}
        activeOpacity={0.7}>
        <MaterialIcons name="person" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  owlImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});