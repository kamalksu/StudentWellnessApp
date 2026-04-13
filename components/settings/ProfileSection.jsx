import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert, Image, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase/config';

const PROFILE_IMAGE_KEY = 'profile_image_uri';
const PROFILE_IMAGE_PATH = () => FileSystem.documentDirectory + `profile_image_${Date.now()}.jpg`;

const { profileImage, updateProfileImage } = useTheme();


export default function ProfileSection() {
  const user = auth.currentUser;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || 'Student');
  const [photoURI, setPhotoURI] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Load saved image on mount
  useState(() => {
    const loadImage = async () => {
      const saved = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      if (saved) setPhotoURI(saved);
    };
    loadImage();
  });

  const handleSave = async () => {
    try {
      await updateProfile(user, { displayName: name });
      setEditing(false);
      Alert.alert('✅ Success', 'Profile updated!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleImagePick = async () => {
    Alert.alert('Profile Photo', 'Choose an option', [
      {
        text: 'Gallery', onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission Required', 'Gallery permission is needed.');
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, aspect: [1, 1], quality: 0.7,
          });
          if (!result.canceled) await saveImageLocally(result.assets[0].uri);
        }
      },
      {
        text: 'Camera', onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission Required', 'Camera permission is needed.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, aspect: [1, 1], quality: 0.7,
          });
          if (!result.canceled) await saveImageLocally(result.assets[0].uri);
        }
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

const saveImageLocally = async (uri) => {
  setUploading(true);
  try {
    const newPath = FileSystem.documentDirectory + `profile_image_${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: uri, to: newPath });
    await updateProfileImage(newPath); // 👈 use context
    Alert.alert('✅ Success', 'Profile photo updated!');
  } catch (error) {
    Alert.alert('Error', error.message);
  } finally {
    setUploading(false);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Avatar with camera icon */}
        <TouchableOpacity onPress={handleImagePick} style={styles.avatarWrapper}>
          {profileImage ? (  // 👈 use profileImage from context
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={28} color={Colors.primary} />
            </View>
          )}
          {uploading ? (
            <View style={styles.cameraBtn}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : (
            <View style={styles.cameraBtn}>
              <MaterialIcons name="camera-alt" size={12} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        {/* Name */}
        {editing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoFocus
            onSubmitEditing={handleSave}
          />
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        {/* Edit + Close icons */}
        <TouchableOpacity
          onPress={() => editing ? handleSave() : setEditing(true)}
          style={styles.iconBtn}>
          <MaterialIcons
            name={editing ? 'check' : 'edit'}
            size={20}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>

        {editing && (
          <TouchableOpacity onPress={() => setEditing(false)} style={styles.iconBtn}>
            <MaterialIcons name="close" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0, right: 0,
    width: 20, height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  name: {
    flex: 1, fontSize: 16,
    fontWeight: '600', color: Colors.textPrimary,
  },
  input: {
    flex: 1, fontSize: 16,
    fontWeight: '600', color: Colors.textPrimary,
    borderBottomWidth: 1, borderBottomColor: Colors.primary,
    paddingVertical: 4,
  },
  iconBtn: { padding: 4 },
});