
import { Image, StyleSheet, Text, View } from 'react-native';
import OwlLogo from '../../assets/images/owl.svg';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase/config';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export default function HomeHeader() {
  const user = auth.currentUser;
  const name = user?.displayName || 'Owl';
  const { profileImage } = useTheme();

  return (
    <View style={styles.container}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <OwlLogo
          width={44}
          height={44}
          color={Colors.primary}  // 👈 blue owl
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{getGreeting()}, {name}</Text>
        <Text style={styles.date}>{getFormattedDate()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  owlImage: {
    width: 44, height: 44,
    borderRadius: 22,
    tintColor: Colors.primary,
  },
  profileImage: {
    width: 44, height: 44,
    borderRadius: 22,
  },
  textContainer: { flex: 1 },
  greeting: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  date: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});