import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OwlLogo from '../assets/images/owl.svg';
import { Colors } from '../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.container}>

      <View style={styles.content}>
        <OwlLogo
          width={120}
          height={120}
          fill={Colors.primary}
        />
        <Text style={styles.title}>Welcome to Owlmind</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/')}
          activeOpacity={0.8}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/signup')}
          activeOpacity={0.8}>
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service{'\n'}and Privacy Policy
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  owl: {
    width: 120,
    height: 120,
    marginBottom: 8,
    tintColor: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  buttons: {
    gap: 12,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  createButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  createText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  terms: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
});