import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth, db } from '../../firebase/config';

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function NewEntryScreen() {
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const handleSave = async () => {
    if (!text.trim()) {
      Alert.alert('Empty', 'Please write something before saving.');
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'journals'), {
        text: text.trim(),
        wordCount: countWords(text),
        createdAt: serverTimestamp(),
      });
      router.replace('/(tabs)/journal');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/journal')}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Journal Entry</Text>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}>
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Date */}
        <Text style={styles.date}>{getFormattedDate()}</Text>

        {/* Text Editor */}
        <TextInput
          style={styles.editor}
          placeholder="Today I feel..."
          placeholderTextColor="#bbb"
          multiline
          value={text}
          onChangeText={setText}
          autoFocus
          textAlignVertical="top"
        />

        {/* Word Count */}
        <Text style={styles.wordCount}>{countWords(text)} Words</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backText: {
    fontSize: 15,
    color: '#2DD4BF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#2DD4BF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#aaa',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  editor: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    minHeight: 400,
  },
  wordCount: {
    fontSize: 13,
    color: '#bbb',
    textAlign: 'right',
    marginTop: 8,
  },
});