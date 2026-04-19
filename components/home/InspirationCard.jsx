import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const QUOTES = [
  "Take a deep breath. You're doing better than you think.",
  "You are not alone in the struggles of life.",
  "Mental health is not a destination, but a process.",
  "Self-care is not selfish. You cannot serve from an empty vessel.",
  "You are enough just as you are.",
  "Happiness can be found even in the darkest of times.",
  "You're braver than you believe, stronger than you seem.",
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
      <Text style={styles.openQuote}>"</Text>
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.closeQuote}>"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  openQuote: {
    fontSize: 36,
    color: Colors.primary,
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: 4,
  },
  quote: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 24,
    fontStyle: 'italic',
    paddingHorizontal: 8,
  },
  closeQuote: {
    fontSize: 36,
    color: Colors.primary,
    fontWeight: '900',
    lineHeight: 30,
    textAlign: 'right',
    marginTop: 4,
  },
});