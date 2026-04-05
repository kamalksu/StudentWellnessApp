import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebase/config';

function getFormattedDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getPlainText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function getPreview(text) {
  const plain = getPlainText(text);
  return plain.length > 50 ? plain.substring(0, 50) + '...' : plain;
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
        <ActivityIndicator size="small" color={Colors.primary} />
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
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Entries</Text>

      <View style={styles.card}>
        {entries.map((entry, index) => (
          <View key={entry.id}>
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => router.push({
                pathname: '/journal/new-entry',
                params: { entryId: entry.id, text: entry.text, readOnly: 'true' },
              })}>
              <MaterialIcons
                name="insert-drive-file"
                size={22}
                color={Colors.primary}
              />
              <View style={styles.info}>
                <Text style={styles.date}>{getFormattedDate(entry.createdAt)}</Text>
                <Text style={styles.preview}>{getPreview(entry.text)}</Text>
              </View>
            </TouchableOpacity>
            {index < entries.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
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
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  preview: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});