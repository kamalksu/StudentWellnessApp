import { Slot, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../firebase/config';

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) return;
    const inTabs = segments[0] === '(tabs)';
    const inWelcome = segments[0] === 'welcome';
    const inAuth = segments[0] === 'index' || segments[0] === undefined;

    if (user && !inTabs) {
      router.replace('/(tabs)/home');
    } else if (!user && !inWelcome && !inAuth) {
      router.replace('/welcome');
    } else if (!user && inAuth) {
      router.replace('/welcome');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2DD4BF" />
      </View>
    );
  }

  return <Slot />;
}