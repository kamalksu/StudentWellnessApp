import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebase/config';

function getInsightMessage(moods) {
  if (moods.length === 0) return "Start tracking your mood to see insights!";

  const moodCounts = {};
  moods.forEach((m) => {
    moodCounts[m] = (moodCounts[m] || 0) + 1;
  });

  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];

  const messages = {
    happy: "You've been feeling happy lately. Keep it up! 😄",
    calm: "You've been feeling calm lately. That's wonderful! 😊",
    anxious: "You've been feeling anxious lately. Remember to breathe. 😰",
    sad: "You've been feeling sad lately. You're not alone. 😔",
    angry: "You've been feeling angry lately. Try some relaxation techniques. 😠",
  };

  return messages[topMood] || "Keep tracking your mood for insights!";
}

export default function Insight() {
  const [insight, setInsight] = useState('Loading your insights...');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchInsight = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'users', user.uid, 'moods'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const moods = snapshot.docs.map((doc) => doc.data().mood);
        setInsight(getInsightMessage(moods.slice(0, 7)));
      } catch (error) {
        setInsight('Keep tracking your mood for insights!');
      }
    };
    fetchInsight();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="lightbulb" size={18} color={Colors.primary} />
        <Text style={styles.title}>Insight</Text>
      </View>
      <Text style={styles.message}>{insight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: '#fff',
  marginHorizontal: 16,
  marginTop: 12,
  marginBottom: 24,
  borderRadius: 16,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
  },
  message: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
});