import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

export default function ImageSelection() {
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

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
        videoMaxDuration: 60, // 1 minute max
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Write something......</Text>
      </View>

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
        ) : (
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={openCamera} activeOpacity={0.8} style={styles.optionButton}>
              <Entypo name="camera" size={32} color="#2D5AFE" />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCameraVideo} activeOpacity={0.8} style={styles.optionButton}>
              <MaterialIcons name="videocam" size={32} color="#2D5AFE" />
              <Text style={styles.optionText}>Take Video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} activeOpacity={0.8} style={styles.optionButton}>
              <Entypo name="image" size={32} color="#2D5AFE" />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.createButton} onPress={() => { router.navigate('./Loading') }}>
          <Text style={styles.createText}>Create Pulse</Text>
        </TouchableOpacity>
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
  headerRow: {
    marginBottom: 12,
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
    paddingVertical: 20,
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
});
