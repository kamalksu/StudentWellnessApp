import { Image, StyleSheet, Text, View } from 'react-native';
import OwlLogo from '../../assets/images/owl.svg';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export default function HomeHeader() {
  const { profileImage } = useTheme();

  return (
    <View style={styles.container}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <OwlLogo
          width={44}
          height={44}
          color={Colors.primary}
        />
      )}
      <Text style={styles.date}>{getFormattedDate()}</Text>
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
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  date: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
});