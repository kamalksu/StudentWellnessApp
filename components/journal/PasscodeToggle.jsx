import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PasscodeToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('set'); // 'set' | 'disable'
  const [pin, setPin] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [step, setStep] = useState(1); // 1 = enter pin, 2 = confirm pin
  const inputRef = useRef(null);

  useEffect(() => {
    const checkPasscode = async () => {
      const saved = await AsyncStorage.getItem('journal_pin');
      setIsEnabled(!!saved);
    };
    checkPasscode();
  }, []);

  const handleToggle = async () => {
    if (!isEnabled) {
      setModalMode('set');
      setStep(1);
      setPin('');
      setFirstPin('');
      setModalVisible(true);
    } else {
      setModalMode('disable');
      setStep(1);
      setPin('');
      setModalVisible(true);
    }
  };

  const handlePinInput = (text) => {
    if (text.length > 4) return;
    setPin(text);

    if (text.length === 4) {
      if (modalMode === 'set' && step === 1) {
        // প্রথম PIN সরিয়ে রাখো, step 2 তে যাও
        setTimeout(() => {
          setFirstPin(text);
          setStep(2);
          setPin('');
        }, 200);

      } else if (modalMode === 'set' && step === 2) {
        // প্রথম PIN এর সাথে compare করো
        if (text === firstPin) {
          handleSavePin(text);
        } else {
          Alert.alert('Error', 'PINs do not match. Try again.');
          setStep(1);
          setPin('');
          setFirstPin('');
        }

      } else if (modalMode === 'disable') {
        handleVerifyToDisable(text);
      }
    }
  };

  const handleSavePin = async (savedPin) => {
    await AsyncStorage.setItem('journal_pin', savedPin);
    setIsEnabled(true);
    setModalVisible(false);
    setPin('');
    setFirstPin('');
    Alert.alert('Success', 'Passcode has been set!');
  };

  const handleVerifyToDisable = async (enteredPin) => {
    const saved = await AsyncStorage.getItem('journal_pin');
    if (enteredPin === saved) {
      await AsyncStorage.removeItem('journal_pin');
      setIsEnabled(false);
      setModalVisible(false);
      setPin('');
      Alert.alert('Success', 'Passcode has been removed.');
    } else {
      Alert.alert('Error', 'Incorrect PIN. Try again.');
      setPin('');
    }
  };

  const getDots = (value) => {
    return [0, 1, 2, 3].map((i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i < value.length && styles.dotFilled,
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialIcons name="lock" size={20} color="#555" />
        <Text style={styles.label}>Password protect this page</Text>
        <TouchableOpacity
          style={[styles.toggle, isEnabled && styles.toggleOn]}
          onPress={handleToggle}
          activeOpacity={0.8}>
          <View style={[styles.thumb, isEnabled && styles.thumbOn]} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {modalMode === 'disable'
                ? 'Enter PIN to Disable'
                : step === 1
                ? 'Set a 4-digit PIN'
                : 'Confirm your PIN'}
            </Text>
            <Text style={styles.modalSubtitle}>
              {modalMode === 'disable'
                ? 'Enter your current PIN'
                : step === 1
                ? 'Choose a 4-digit PIN'
                : 'Re-enter your PIN to confirm'}
            </Text>

            <View style={styles.dotsRow}>
              {getDots(pin)}
            </View>

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

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                setPin('');
                setFirstPin('');
                setStep(1);
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: '#2DD4BF',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2DD4BF',
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: '#2DD4BF',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelText: {
    color: '#888',
    fontSize: 15,
  },
});