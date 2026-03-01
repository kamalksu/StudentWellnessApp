import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/owl.png')}
        style={styles.owl}
      />
      <Text style={styles.title}>Student Wellness</Text>
      <Text style={styles.subtitle}>Your campus companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  owl: { width: 160, height: 160, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2DD4BF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#999' }
});