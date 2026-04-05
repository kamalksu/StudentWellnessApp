import { useRouter } from 'expo-router';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebase/config';

const MOODS = [
  { id: 'happy',   emoji: '😄', label: 'Happy' },
  { id: 'calm',    emoji: '😊', label: 'Calm' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'sad',     emoji: '😔', label: 'Sad' },
  { id: 'angry',   emoji: '😠', label: 'Angry' },
];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function MoodPicker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [existingDocId, setExistingDocId] = useState(null);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    const fetchTodayMood = async () => {
      if (!user) return;
      try {
        const todayKey = getTodayKey();
        const q = query(
          collection(db, 'users', user.uid, 'moods'),
          where('dateKey', '==', todayKey)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setSelectedMood(doc.data().mood);
          setExistingDocId(doc.id);
        }
      } catch (error) {
        console.error('Error fetching mood:', error);
      }
    };
    fetchTodayMood();
  }, []);

  const handleMoodSelect = async (moodId) => {
    if (saving) return;
    setSelectedMood(moodId);
    setSaving(true);

    try {
      const todayKey = getTodayKey();

      if (existingDocId) {
        const { updateDoc, doc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'users', user.uid, 'moods', existingDocId), {
          mood: moodId,
          updatedAt: serverTimestamp(),
        });
      } else {
        const newDoc = await addDoc(
          collection(db, 'users', user.uid, 'moods'),
          {
            mood: moodId,
            dateKey: todayKey,
            createdAt: serverTimestamp(),
          }
        );
        setExistingDocId(newDoc.id);
      }
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.emojiRow}>
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.id;
          const isFaded = selectedMood !== null && !isSelected;

          return (
            <TouchableOpacity
              key={mood.id}
              onPress={() => handleMoodSelect(mood.id)}
              style={[
                styles.emojiButton,
                isSelected && styles.emojiButtonSelected,
              ]}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.emoji,
                  isFaded && styles.emojiFaded,
                  isSelected && styles.emojiSelected,
                ]}>
                {mood.emoji}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedMood && (
        <Text style={styles.savedText}>✓ Mood saved!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emojiButton: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  emoji: {
    fontSize: 34,
  },
  emojiSelected: {
    fontSize: 40,
  },
  emojiFaded: {
    opacity: 0.35,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  savedText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
  writeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  writeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});