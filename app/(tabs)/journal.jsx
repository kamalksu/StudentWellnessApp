import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import JournalTemplates from '../../components/journal/JournalTemplates';
import NewEntryButton from '../../components/journal/NewEntryButton';
import PastEntries from '../../components/journal/PastEntries';
import TopBar from '../../components/shared/TopBar';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext'; // 👈 add

function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handlePinInput = async (text) => {
    if (text.length > 4) return;
    setPin(text);
    setError('');
    if (text.length === 4) {
      const saved = await AsyncStorage.getItem('journal_pin');
      if (text === saved) {
        onUnlock();
      } else {
        setError('Incorrect PIN. Try again.');
        setTimeout(() => setPin(''), 500);
      }
    }
  };

  const getDots = (value) => {
    return [0, 1, 2, 3].map((i) => (
      <View key={i} style={[styles.dot, i < value.length && styles.dotFilled]} />
    ));
  };

  return (
    <View style={styles.pinContainer}>
      <MaterialIcons name="lock" size={48} color={Colors.primary} />
      <Text style={styles.pinTitle}>My Journal</Text>
      <Text style={styles.pinSubtitle}>Enter your PIN to continue</Text>
      <View style={styles.dotsRow}>{getDots(pin)}</View>
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={pin}
        onChangeText={handlePinInput}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
        autoFocus
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.pinButton}
        onPress={() => inputRef.current?.focus()}>
        <Text style={styles.pinButtonText}>Tap to enter PIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function JournalScreen() {
  const [isLocked, setIsLocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const { backgroundTheme } = useTheme(); // 👈 add

  useFocusEffect(
    useCallback(() => {
      const checkPin = async () => {
        const saved = await AsyncStorage.getItem('journal_pin');
        if (saved) setIsLocked(true);
        setChecking(false);
      };
      checkPin();
    }, [])
  );

  if (checking) return null;

  if (isLocked) {
    return (
      <SafeAreaView style={styles.safe}>
        <LinearGradient colors={backgroundTheme.colors} style={styles.gradient}>
          <TopBar title="My Journal" />
          <PinGate onUnlock={() => setIsLocked(false)} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={backgroundTheme.colors} style={styles.gradient}>
        <TopBar title="My Journal" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <NewEntryButton />
          <JournalTemplates />
          <PastEntries />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9f9f9' },
  gradient: { flex: 1 },
  container: { flex: 1 },
  pinContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 32, gap: 12,
  },
  pinTitle: { fontSize: 24, fontWeight: '700', color: '#333', marginTop: 16 },
  pinSubtitle: { fontSize: 15, color: '#888', marginBottom: 16 },
  dotsRow: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  dot: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 2, borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  dotFilled: { backgroundColor: Colors.primary },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  errorText: { color: '#FF4444', fontSize: 14, textAlign: 'center' },
  pinButton: {
    marginTop: 16, backgroundColor: Colors.primary,
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20,
  },
  pinButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});