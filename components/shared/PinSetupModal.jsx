import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useState } from 'react';
import {
    Modal, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

export default function PinSetupModal({ visible, onSuccess, onCancel }) {
  const [step, setStep] = useState('set'); // 'set' or 'confirm'
  const [pin, setPin] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const reset = () => {
    setStep('set');
    setPin('');
    setFirstPin('');
    setError('');
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handlePinInput = async (text) => {
    if (text.length > 4) return;
    setPin(text);
    setError('');

    if (text.length === 4) {
      if (step === 'set') {
        setFirstPin(text);
        setPin('');
        setStep('confirm');
      } else {
        if (text === firstPin) {
          await AsyncStorage.setItem('journal_pin', text);
          reset();
          onSuccess();
        } else {
          setError('PINs do not match. Try again.');
          setPin('');
          setStep('set');
          setFirstPin('');
        }
      }
    }
  };

  const getDots = (value) => {
    return [0, 1, 2, 3].map((i) => (
      <View key={i} style={[styles.dot, i < value.length && styles.dotFilled]} />
    ));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <MaterialIcons name="lock" size={40} color={Colors.primary} />
          <Text style={styles.title}>
            {step === 'set' ? 'Set a PIN' : 'Confirm PIN'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 'set'
              ? 'Enter a 4-digit PIN to protect your journal'
              : 'Enter the PIN again to confirm'}
          </Text>

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
            style={styles.tapBtn}
            onPress={() => inputRef.current?.focus()}>
            <Text style={styles.tapBtnText}>Tap to enter PIN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  container: {
    backgroundColor: '#fff', borderRadius: 24,
    padding: 32, width: '100%',
    alignItems: 'center', gap: 12,
  },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  dotsRow: { flexDirection: 'row', gap: 16, marginVertical: 8 },
  dot: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 2, borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  dotFilled: { backgroundColor: Colors.primary },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  errorText: { color: Colors.error, fontSize: 14, textAlign: 'center' },
  tapBtn: {
    backgroundColor: Colors.primary, borderRadius: 20,
    paddingHorizontal: 24, paddingVertical: 12,
  },
  tapBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  cancelText: { color: Colors.textSecondary, fontSize: 14, marginTop: 4 },
});