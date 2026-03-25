import { Image, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/config';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomeHeader() {
  const user = auth.currentUser;
  const name = user?.displayName || 'Student';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/owl.png')}
          style={styles.owl}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {getGreeting()}, <Text style={styles.name}>{name}</Text>
          </Text>
          <Text style={styles.date}>{getFormattedDate()}</Text>
          <Text style={styles.campus}>Kennesaw Campus</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  owl: {
    width: 56,
    height: 56,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2DD4BF',
  },
  date: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  campus: {
    fontSize: 13,
    color: '#666',
    marginTop: 1,
  },
});