import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import PinSetupModal from '../../components/shared/PinSetupModal';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebase/config';

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NewEntryScreen() {
  const { starter, text: existingText, readOnly } = useLocalSearchParams();
  const isReadOnly = readOnly === 'true';
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const richText = useRef();
  const router = useRouter();
  const user = auth.currentUser;

  const handleChange = (html) => {
    const plain = html.replace(/<[^>]+>/g, '').trim();
    const count = plain === '' ? 0 : plain.split(/\s+/).length;
    setWordCount(count);
  };

  const handleBack = async () => {
    const html = await richText.current?.getContentHtml();
    const hasContent = html && html.replace(/<[^>]+>/g, '').trim() !== '';

    if (hasContent && !isReadOnly) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to exit?',
        [
          { text: 'Stay', style: 'cancel' },
          { text: 'Exit', style: 'destructive', onPress: () => router.replace('/(tabs)/journal') },
        ]
      );
    } else {
      router.replace('/(tabs)/journal');
    }
  };

  const handleSave = async () => {
    const html = await richText.current?.getContentHtml();
    if (!html || html.replace(/<[^>]+>/g, '').trim() === '') {
      Alert.alert('Empty', 'Please write something before saving.');
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'journals'), {
        text: html,
        wordCount: wordCount,
        isLocked: isLocked,
        createdAt: serverTimestamp(),
      });
      router.replace('/(tabs)/journal');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLockToggle = async (value) => {
    if (value) {
      const existingPin = await AsyncStorage.getItem('journal_pin');
      if (existingPin) {
        setIsLocked(true);
      } else {
        setShowPinSetup(true);
      }
    } else {
      setIsLocked(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradient}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}>
            <Text style={styles.backText}>← New Journal Entry</Text>
          </TouchableOpacity>
        </View>

        {/* Lock toggle */}
        {!isReadOnly && (
          <View style={styles.lockRow}>
            <Text style={styles.lockText}>🔒 Lock this entry</Text>
            <Switch
              value={isLocked}
              onValueChange={handleLockToggle}
              trackColor={{ false: '#ddd', true: Colors.primary }}
              thumbColor="#fff"
            />
          </View>
        )}

        {/* Toolbar */}
        {!isReadOnly && (
          <RichToolbar
            editor={richText}
            actions={[
              actions.undo,
              actions.redo,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.setStrikethrough,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            style={styles.toolbar}
            selectedIconTint={Colors.primary}
            iconTint="#555"
          />
        )}

        {/* Editor */}
        <ScrollView
          style={styles.editorContainer}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}>
          <Text style={styles.date}>{getFormattedDate()}</Text>
          <RichEditor
            ref={richText}
            style={styles.editor}
            placeholder="What's on your mind?"
            initialContentHTML={existingText || starter || ''}
            onChange={handleChange}
            disabled={isReadOnly}
            editorStyle={{
              backgroundColor: 'transparent',
              color: Colors.textPrimary,
              fontSize: 16,
              lineHeight: 26,
              paddingHorizontal: 4,
            }}
          />
        </ScrollView>

        {/* Save Button */}
        {!isReadOnly && (
          <View style={styles.saveContainer}>
            <TouchableOpacity
              style={[styles.saveButton, saving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={saving}>
              <Text style={styles.saveButtonText}>
                {saving ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <PinSetupModal
          visible={showPinSetup}
          onSuccess={() => {
            setIsLocked(true);
            setShowPinSetup(false);
          }}
          onCancel={() => setShowPinSetup(false)}
        />

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.gradientStart },
  gradient: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  lockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  lockText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  toolbar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  editorContainer: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  editor: {
    minHeight: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
  },
  saveContainer: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#aaa',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});