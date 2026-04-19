import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase/config';

export default function TopBar({ title = 'Welcome' }) {
  const router = useRouter();
  const user = auth.currentUser;
  const { profileImage } = useTheme();



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => router.push('/(tabs)/settings')}
        activeOpacity={0.7}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatarImage} />
        ) : (
          <MaterialIcons name="person" size={22} color={Colors.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  avatar: {
    width: 38, height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 38, height: 38,
    borderRadius: 19,
  },
});