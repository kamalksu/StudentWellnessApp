import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRef, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    actions,
    RichEditor,
    RichToolbar,
} from 'react-native-pell-rich-editor';
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
  const richText = useRef();
  const router = useRouter();
  const user = auth.currentUser;

  const handleChange = (html) => {
    const plain = html.replace(/<[^>]+>/g, '').trim();
    const count = plain === '' ? 0 : plain.split(/\s+/).length;
    setWordCount(count);
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
        <Text style={styles.headerTitle}>
          {isReadOnly ? 'Journal Entry' : 'New Journal Entry'}
        </Text>
        {!isReadOnly ? (
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}>
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      {/* Toolbar */}
      {!isReadOnly && (
        <RichToolbar
          editor={richText}
          actions={[
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.insertImage,
          ]}
          style={styles.toolbar}
          selectedIconTint="#2DD4BF"
          iconTint="#555"
        />
      )}

      <ScrollView style={styles.container}>
        <Text style={styles.date}>{getFormattedDate()}</Text>

        {/* Rich Editor */}
        <RichEditor
          ref={richText}
          style={styles.editor}
          placeholder="Today I feel..."
          initialContentHTML={existingText || starter || ''}
          onChange={handleChange}
          disabled={isReadOnly}
          editorStyle={{
            backgroundColor: '#fff',
            color: '#333',
            fontSize: 16,
            lineHeight: 26,
          }}
        />

        <Text style={styles.wordCount}>{wordCount} Words</Text>
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
  toolbar: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  editor: {
    minHeight: 400,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 8,
  },
  wordCount: {
    fontSize: 13,
    color: '#bbb',
    textAlign: 'right',
    marginTop: 8,
  },
});