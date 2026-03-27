import { useRouter } from 'expo-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/config';



function getPreview(text) {
  return text.length > 60 ? text.substring(0, 60) + '...' : text;
}

function getFormattedDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PastEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'journals'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#2DD4BF" />
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Past Entries</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📖</Text>
          <Text style={styles.emptyText}>No entries yet!</Text>
          <Text style={styles.emptySubtext}>Start writing your first journal entry.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Entries</Text>

      {entries.map((entry) => (
        <TouchableOpacity
          key={entry.id}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => router.push({
            pathname: '/journal/new-entry',
            params: { entryId: entry.id, text: entry.text, readOnly: 'true' },
          })}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>📝</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.date}>{getFormattedDate(entry.createdAt)}</Text>
            <Text style={styles.preview}>{getPreview(entry.text)}</Text>
            <Text style={styles.wordCount}>{entry.wordCount} words</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  emojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  preview: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  wordCount: {
    fontSize: 12,
    color: '#bbb',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});