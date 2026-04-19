import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import {
    Alert, Modal, Platform, ScrollView,
    StyleSheet, Switch, Text, TouchableOpacity, View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = ['00', '15', '30', '45'];
const PERIODS = ['AM', 'PM'];

export default function NotificationsSettings({ visible, onClose }) {
  const [moodReminder, setMoodReminder] = useState(false);
  const [quoteNotification, setQuoteNotification] = useState(false);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const [quoteHour, setQuoteHour] = useState(9);
  const [quoteMinute, setQuoteMinute] = useState('00');
  const [quotePeriod, setQuotePeriod] = useState('AM');
  const [showQuoteTimePicker, setShowQuoteTimePicker] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionGranted(status === 'granted');
  };

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionGranted(status === 'granted');
    return status === 'granted';
  };

    const scheduleMoodReminder = async (hour, minute, period) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) hour24 = hour + 12;
    if (period === 'AM' && hour === 12) hour24 = 0;

    await Notifications.scheduleNotificationAsync({
        content: {
        title: '🦉 Owlmind',
        body: 'How are you feeling today? Take a moment to check in.',
        },
        trigger: {
        type: 'daily',        // 👈 add type
        hour: hour24,
        minute: parseInt(minute),
        },
    });
    };

    const scheduleQuoteNotification = async (hour, minute, period) => {
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) hour24 = hour + 12;
    if (period === 'AM' && hour === 12) hour24 = 0;

    await Notifications.scheduleNotificationAsync({
        content: {
        title: '💬 Daily Inspiration',
        body: 'You are stronger than you think. Have a great day!',
        },
        trigger: {
        type: 'daily',
        hour: hour24,
        minute: parseInt(minute),
        },
    });
    };
  const handleMoodToggle = async (value) => {
    if (value) {
      const granted = permissionGranted || await requestPermissions();
      if (!granted) {
        Alert.alert('Permission Required', 'Please enable notifications in your device settings.');
        return;
      }
      setMoodReminder(true);
      await scheduleMoodReminder(selectedHour, selectedMinute, selectedPeriod);
      Alert.alert('Reminder Set', `Daily mood reminder set for ${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    } else {
      setMoodReminder(false);
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

    const handleQuoteToggle = async (value) => {
    if (value) {
        const granted = permissionGranted || await requestPermissions();
        if (!granted) {
        Alert.alert('Permission Required', 'Please enable notifications in your device settings.');
        return;
        }
        setQuoteNotification(true);
        await scheduleQuoteNotification(quoteHour, quoteMinute, quotePeriod);
        Alert.alert('Enabled', `Daily inspiration set for ${quoteHour}:${quoteMinute} ${quotePeriod}!`);
    } else {
        setQuoteNotification(false);
    }
    };

  const handleTimeConfirm = async () => {
    setShowTimePicker(false);
    if (moodReminder) {
      await scheduleMoodReminder(selectedHour, selectedMinute, selectedPeriod);
      Alert.alert('Updated', `Reminder updated to ${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    }
  };

  const handleQuoteTimeConfirm = async () => {
  setShowQuoteTimePicker(false);
  if (quoteNotification) {
    await scheduleQuoteNotification(quoteHour, quoteMinute, quotePeriod);
    Alert.alert('Updated', `Inspiration updated to ${quoteHour}:${quoteMinute} ${quotePeriod}`);
  }
  };
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          {/* Mood Reminder */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <MaterialIcons name="mood" size={22} color={Colors.primary} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.rowTitle}>Daily Mood Reminder</Text>
                <Text style={styles.rowSubtitle}>Get reminded to check in daily</Text>
              </View>
              <Switch
                value={moodReminder}
                onValueChange={handleMoodToggle}
                trackColor={{ false: '#ddd', true: Colors.primary }}
                thumbColor="#fff"
              />
            </View>

            {/* Time Picker */}
            {moodReminder && (
              <>
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.timeRow}
                  onPress={() => setShowTimePicker(true)}
                  activeOpacity={0.7}>
                  <MaterialIcons name="access-time" size={20} color={Colors.textLight} />
                  <Text style={styles.timeLabel}>Reminder Time</Text>
                  <Text style={styles.timeValue}>
                    {selectedHour}:{selectedMinute} {selectedPeriod}
                  </Text>
                  <MaterialIcons name="chevron-right" size={20} color={Colors.textLight} />
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Quote Notification */}
<View style={styles.card}>
  <View style={styles.row}>
    <View style={styles.iconWrap}>
      <MaterialIcons name="format-quote" size={22} color={Colors.primary} />
    </View>
    <View style={styles.textWrap}>
      <Text style={styles.rowTitle}>Daily Inspiration</Text>
      <Text style={styles.rowSubtitle}>
        {quoteNotification 
          ? `Every day at ${quoteHour}:${quoteMinute} ${quotePeriod}`
          : 'Receive a daily inspirational quote'}
      </Text>
    </View>
    <Switch
      value={quoteNotification}
      onValueChange={handleQuoteToggle}
      trackColor={{ false: '#ddd', true: Colors.primary }}
      thumbColor="#fff"
    />
  </View>

  {/* Quote Time Picker */}
  {quoteNotification && (
    <>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.timeRow}
        onPress={() => setShowQuoteTimePicker(true)}
        activeOpacity={0.7}>
        <MaterialIcons name="access-time" size={20} color={Colors.textLight} />
        <Text style={styles.timeLabel}>Inspiration Time</Text>
        <Text style={styles.timeValue}>
          {quoteHour}:{quoteMinute} {quotePeriod}
        </Text>
        <MaterialIcons name="chevron-right" size={20} color={Colors.textLight} />
      </TouchableOpacity>
    </>
  )}
</View>

          {/* Info */}

        </ScrollView>

        {/* Time Picker Modal */}
        <Modal visible={showTimePicker} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setShowTimePicker(false)}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Reminder Time</Text>

              <View style={styles.pickerRow}>
                {/* Hour */}
                <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
                  {HOURS.map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[styles.pickerItem, selectedHour === h && styles.pickerItemSelected]}
                      onPress={() => setSelectedHour(h)}>
                      <Text style={[styles.pickerItemText, selectedHour === h && styles.pickerItemTextSelected]}>
                        {h}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.pickerColon}>:</Text>

                {/* Minute */}
                <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
                  {MINUTES.map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.pickerItem, selectedMinute === m && styles.pickerItemSelected]}
                      onPress={() => setSelectedMinute(m)}>
                      <Text style={[styles.pickerItemText, selectedMinute === m && styles.pickerItemTextSelected]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* AM/PM */}
                <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
                  {PERIODS.map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={[styles.pickerItem, selectedPeriod === p && styles.pickerItemSelected]}
                      onPress={() => setSelectedPeriod(p)}>
                      <Text style={[styles.pickerItemText, selectedPeriod === p && styles.pickerItemTextSelected]}>
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <TouchableOpacity style={styles.confirmBtn} onPress={handleTimeConfirm}>
                <Text style={styles.confirmBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        {/* Quote Time Picker Modal */}
<Modal visible={showQuoteTimePicker} transparent animationType="fade">
  <TouchableOpacity
    style={styles.overlay}
    activeOpacity={1}
    onPress={() => setShowQuoteTimePicker(false)}>
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerTitle}>Select Inspiration Time</Text>
      <View style={styles.pickerRow}>
        <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
          {HOURS.map((h) => (
            <TouchableOpacity
              key={h}
              style={[styles.pickerItem, quoteHour === h && styles.pickerItemSelected]}
              onPress={() => setQuoteHour(h)}>
              <Text style={[styles.pickerItemText, quoteHour === h && styles.pickerItemTextSelected]}>
                {h}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.pickerColon}>:</Text>
        <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
          {MINUTES.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.pickerItem, quoteMinute === m && styles.pickerItemSelected]}
              onPress={() => setQuoteMinute(m)}>
              <Text style={[styles.pickerItemText, quoteMinute === m && styles.pickerItemTextSelected]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.pickerItem, quotePeriod === p && styles.pickerItemSelected]}
              onPress={() => setQuotePeriod(p)}>
              <Text style={[styles.pickerItemText, quotePeriod === p && styles.pickerItemTextSelected]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.confirmBtn} onPress={handleQuoteTimeConfirm}>
        <Text style={styles.confirmBtnText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>
      </View>
    </Modal>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
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
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  rowSubtitle: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 16 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  timeLabel: { flex: 1, fontSize: 14, color: Colors.textSecondary },
  timeValue: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    marginBottom: 32,
  },
  infoText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    gap: 8,
  },
  pickerCol: { width: 70, height: 160 },
  pickerColon: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  pickerItem: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 4,
  },
  pickerItemSelected: { backgroundColor: Colors.primaryLight },
  pickerItemText: { fontSize: 18, color: Colors.textSecondary },
  pickerItemTextSelected: { color: Colors.primary, fontWeight: '700' },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});