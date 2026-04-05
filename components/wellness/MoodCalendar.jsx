import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebase/config';

const MOODS = [
  { id: 'all', emoji: '🗓️', label: 'All', color: '#E0E0E0' },
  { id: 'happy', emoji: '😄', label: 'Happy', color: '#FFD93D' },
  { id: 'calm', emoji: '😊', label: 'Calm', color: '#6BCB77' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#FFB347' },
  { id: 'sad', emoji: '😔', label: 'Sad', color: '#4D96FF' },
  { id: 'angry', emoji: '😠', label: 'Angry', color: '#FF6B6B' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MOOD_COLORS = {
  happy: '#2DD4BF',
  sad: '#6B9FD4',
  neutral: '#A0A0A0',
  angry: '#E57373',
  sick: '#81C784',
};

export default function MoodCalendar() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear] = useState(today.getFullYear());
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('all');
  const [moodData, setMoodData] = useState({});
  const user = auth.currentUser;

  useEffect(() => {
    fetchMoods();
  }, [selectedMonth]);

  const fetchMoods = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'users', user.uid, 'moods'),
        where('dateKey', '>=', `${selectedYear}-${selectedMonth + 1}-1`),
        where('dateKey', '<=', `${selectedYear}-${selectedMonth + 1}-31`)
      );
      const snapshot = await getDocs(q);
      const data = {};
      snapshot.docs.forEach((doc) => {
        const { dateKey, mood } = doc.data();
        data[dateKey] = mood;
      });
      setMoodData(data);
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  const getDaysInMonth = () => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(selectedYear, selectedMonth, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const cells = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${selectedYear}-${selectedMonth + 1}-${day}`;
      const mood = moodData[dateKey];
      const isToday =
        day === today.getDate() &&
        selectedMonth === today.getMonth();

      const shouldShow =
        selectedMoodFilter === 'all' ||
        mood === selectedMoodFilter;

      const moodEmoji = MOODS.find((m) => m.id === mood)?.emoji;
      const moodColor = mood ? MOOD_COLORS[mood] : null;

      cells.push(
        <View
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            mood && shouldShow && { backgroundColor: moodColor + '30' },
            mood && !shouldShow && styles.dimmedCell,
          ]}>
          <Text
            style={[
              styles.dayText,
              isToday && styles.todayText,
              mood && !shouldShow && styles.dimmedText,
            ]}>
            {day}
          </Text>
          {mood && shouldShow && (
            <Text style={styles.moodEmoji}>{moodEmoji}</Text>
          )}
        </View>
      );
    }

    return cells;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <TouchableOpacity
          onPress={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}>
          <Text style={styles.navArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {MONTHS[selectedMonth]} {selectedYear}
        </Text>
        <TouchableOpacity
          onPress={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}>
          <Text style={styles.navArrow}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Mood Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}>
        {MOODS.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.filterChip,
              selectedMoodFilter === mood.id && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedMoodFilter(mood.id)}>
            <Text style={styles.filterEmoji}>{mood.emoji}</Text>
            <Text
              style={[
                styles.filterLabel,
                selectedMoodFilter === mood.id && styles.filterLabelSelected,
              ]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Calendar */}
      <View style={styles.calendar}>
        {/* Day headers */}
        <View style={styles.weekRow}>
          {DAYS.map((day) => (
            <View key={day} style={styles.dayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Days grid */}
        <View style={styles.daysGrid}>{renderCalendar()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
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
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navArrow: {
    fontSize: 16,
    color: Colors.primary,
    paddingHorizontal: 8,
  },
  monthText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  filterRow: {
    marginBottom: 12,
  },
  filterContent: {
    gap: 8,
    paddingRight: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterChipSelected: {
  backgroundColor: Colors.primaryLight,
  borderColor: Colors.primary,
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterLabel: {
    fontSize: 12,
    color: '#888',
  },
  filterLabelSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  calendar: {
    marginTop: 4,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  todayCell: {
  borderWidth: 2,
  borderColor: Colors.primary,
  },
  dimmedCell: {
    opacity: 0.25,
  },
  weekDayText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  dayText: {
    fontSize: 13,
    color: '#333',
  },
  todayText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  dimmedText: {
    color: '#bbb',
  },
  moodEmoji: {
    fontSize: 10,
  },
});