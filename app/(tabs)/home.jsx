import { Image, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/config';

export default function HomeScreen() {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/owl.png')} style={styles.logo} />

      <Text style={styles.greeting}>Good afternoon,</Text>
      <Text style={styles.name}>{user?.displayName || 'Student'} </Text>
      <Text style={styles.subtitle}>How are you feeling today?</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome to the Mental Health App </Text>
        <Text style={styles.cardText}>
          Great team work!!. :)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  logo: { width: 40, height: 40, alignSelf: 'center', marginBottom: 16 },
  greeting: { fontSize: 20, color: '#666', textAlign: 'center' },
  name: { fontSize: 32, fontWeight: 'bold', color: '#2DD4BF', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#999', textAlign: 'center', marginBottom: 32 },
  card: { backgroundColor: '#F0FAFA', borderRadius: 12, padding: 20, borderLeftWidth: 4, borderLeftColor: '#2DD4BF' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#666', lineHeight: 22 }
});