import { StyleSheet, Text, View } from 'react-native';

const QUOTES = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
  { text: "You are not alone in the struggles of life. Entire cosmos is with you. It evolves through the way you face and overcome challenges.", author: "Amit Ray" },
  { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
  { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brown" },
  { text: "You are enough just as you are. Each emotion you feel, everything in your life is there as your teacher.", author: "Oprah Winfrey" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", author: "Albus Dumbledore" },
  { text: "Promise me you'll always remember: You're braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
];

function getDailyQuote() {
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

export default function InspirationCard() {
  const quote = getDailyQuote();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Daily Inspiration</Text>
      <Text style={styles.quote}>"{quote.text}"</Text>
      <Text style={styles.author}>— {quote.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
  },
  quote: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  author: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    textAlign: 'right',
  },
});