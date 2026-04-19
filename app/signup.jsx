import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import OwlLogo from '../assets/images/owl.svg';
import { Colors } from '../constants/Colors';
import { auth, db } from '../firebase/config';


export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={styles.header}>
            <OwlLogo
              width={70}
              height={70}
              fill={Colors.primary}
            />
            <Text style={styles.title}>Sign up</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Username */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a username"
                  placeholderTextColor={Colors.textLight}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textLight}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password123"
                  placeholderTextColor={Colors.textLight}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  textContentType="oneTimeCode"
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password123"
                  placeholderTextColor={Colors.textLight}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  textContentType="oneTimeCode"
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              onPress={() => router.push('/')}
              activeOpacity={0.7}>
              <Text style={styles.link}>
                Already have an account?{' '}
                <Text style={styles.linkBold}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  owl: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  inputIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  linkBold: {
    color: Colors.primary,
    fontWeight: '700',
  },
});