import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert, TextInput } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { usePrivy } from '@privy-io/expo';
import axios from 'axios';
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImageSelection() {
  const { user } = usePrivy();
  const params = useLocalSearchParams();
  const [mediaUri, setMediaUri] = useState<string | null>(params.mediaUri ? String(params.mediaUri) : null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(params.mediaType === 'video' || params.mediaType === 'image' ? params.mediaType as 'image' | 'video' : null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          Alert.alert('Permission required', 'Camera permission is required to take photos and videos.');
        }
        if (mediaStatus.status !== 'granted') {
          Alert.alert('Permission required', 'Media library permission is required to choose from gallery.');
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.9,
      });

      const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
      if (!canceled) {
        const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
        setMediaUri(uri || null);
        setMediaType('image');
      }
    } catch (e) {
      console.warn('camera error', e);
    }
  };

  const openCameraVideo = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.9,
        videoMaxDuration: 20, // 20 seconds max
      });

      const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
      if (!canceled) {
        const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
        setMediaUri(uri || null);
        setMediaType('video');
      }
    } catch (e) {
      console.warn('camera video error', e);
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.9,
        videoMaxDuration: 20, // 20 seconds max
      });

      const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
      if (!canceled) {
        const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
        const type = (result as any).assets?.[0]?.type ?? (result as any).type;
        setMediaUri(uri || null);
        setMediaType(type === 'video' ? 'video' : 'image');
      }
    } catch (e) {
      console.warn('gallery error', e);
    }
  };


  const [description, setDescription] = useState('');
  // Always use Eiffel Tower coordinates
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>({
    lat: 48.855749,
    lon: 2.290566
  });
  const [locLoading] = useState(false);

  const handleCreatePulse = async () => {
    if (!mediaUri || !mediaType) {
      alert('Please select an image or video.');
      return;
    }
    if (!description.trim()) {
      alert('Description is required.');
      return;
    }
    if (!user?.id) {
      alert('You must be logged in to upload. Please log in first.');
      return;
    }
    if (!location) {
      alert('Location is required.');
      return;
    }
    if (
      location.lat === undefined ||
      location.lon === undefined ||
      isNaN(location.lat) ||
      isNaN(location.lon)
    ) {
      alert('Location data is incomplete. Please try again.');
      return;
    }
    // Instead of uploading here, navigate to Loading and pass params
    router.navigate({
      pathname: '/Screen/Pulse/Loading',
      params: {
        mediaUri,
        mediaType,
        description,
        lat: location.lat,
        lon: location.lon,
        privyId: user.id,
      },
    });
  };
  return (
    <SafeAreaView style={styles.safeArea}>

      <TextInput
        style={styles.inputBox}
        placeholder="Write something..."
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={4}
        scrollEnabled
        value={description}
        onChangeText={setDescription}
      />



      <View style={styles.previewWrapper}>
        {mediaUri ? (
          <View style={styles.mediaPreview}>
            {mediaType === 'image' ? (
              <Image source={{ uri: mediaUri }} style={styles.previewImage} />
            ) : (
              <Video
                source={{ uri: mediaUri }}
                style={styles.previewImage}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            )}
          </View>
        ) : null}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.createButton, (uploading || locLoading) && { opacity: 0.5 }]}
          onPress={handleCreatePulse}
          disabled={uploading || locLoading}
        >
          <Text style={styles.createText}>
            {uploading ? 'Uploading...' : locLoading ? 'Getting location...' : 'Create Pulse'}
          </Text>
        </TouchableOpacity>
        {/* Auto-location and 48 hours info */}
        <View style={styles.infoRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ color: '#2D5AFE', fontSize: 16, fontWeight: 'bold', marginRight: 6 }}>📍</Text>
            <Text style={{ color: '#2D5AFE', fontSize: 16, fontWeight: 'bold' }}>Auto - location</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#9CA3AF', fontSize: 14, marginRight: 6 }}>🕒</Text>
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>Pulse will be automatically deleted after 48 hours</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1020',
    padding: 16,
  },
  infoRow: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaPreview: {
    width: '100%',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(45, 90, 254, 0.1)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2D5AFE',
    minWidth: 80,
  },
  optionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: 420,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: '#2D5AFE',
  },
  placeholder: {
    width: '100%',
    height: 420,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: '#2D5AFE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  placeholderText: {
    color: '#9CA3AF',
    marginTop: 8,
  },
  actionsRow: {

    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#201737',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2D5AFE',
  },
  createText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputBox: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',


    padding: 12,
    minHeight: 60,
    maxHeight: 120,
    marginBottom: 3,
    // textAlignVertical: 'top',
    top: 70,
  },
});
