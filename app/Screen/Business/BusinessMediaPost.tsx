import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { usePrivy } from '@privy-io/expo';
import { router } from 'expo-router';
import { createBusinessPost as createBusinessPostApi } from '../../api/businessApi';

export default function BusinessMediaPost() {
  const { user } = usePrivy();
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [promo, setPromo] = useState('');
  const [tickets, setTickets] = useState('0');

  const location = { lat:28.751013, long: 77.121755 };

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

  const openCamera = async (type: 'image' | 'video') => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.9,
        videoMaxDuration: 20,
      });
      const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
      if (!canceled) {
        const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
        setMediaUri(uri || null);
        setMediaType(type);
      }
    } catch (e) {
      console.warn('camera error', e);
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.9,
        videoMaxDuration: 20,
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

  const handleCreateBusinessPost = async () => {
    if (!mediaUri || !mediaType) {
      alert('Please select an image or video.');
      return;
    }
    if (!description.trim() || !name.trim() || !category.trim()) {
      alert('Name, Category, and Description are required.');
      return;
    }
    if (!user?.id) {
      alert('You must be logged in to upload. Please log in first.');
      return;
    }
    const token = (user as any).accessToken || (user as any).token || (user as any).jwt || undefined;
    setUploading(true);
    try {
      const url = mediaUri;
      const post = {
        url,
        type: mediaType,
        description,
        location,
        name,
        category,
        promo,
        tickets: parseInt(tickets) || 0,
      };
      await createBusinessPostApi(post, token, user.id); // Pass Privy_Id for backend
      Alert.alert('Success', 'Business post created!');
      setMediaUri(null);
      setMediaType(null);
      setDescription('');
      setName('');
      setCategory('');
      setPromo('');
      setTickets('0');
    } catch (e: any) {
      console.log('Business post error:', e?.response?.data || e);
      Alert.alert('Error', 'Failed to create business post.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Business Post</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
      <TextInput placeholder="Promo" style={styles.input} value={promo} onChangeText={setPromo} />
      <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
      <TextInput placeholder="Tickets" style={styles.input} keyboardType="numeric" value={tickets} onChangeText={setTickets} />
      <View style={styles.mediaRow}>
        <TouchableOpacity style={styles.mediaBtn} onPress={() => openCamera('image')}><Text>Camera (Image)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.mediaBtn} onPress={() => openCamera('video')}><Text>Camera (Video)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.mediaBtn} onPress={openGallery}><Text>Gallery</Text></TouchableOpacity>
      </View>
      {mediaUri && (
        <View style={styles.previewWrapper}>
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
      )}
      <Button title={uploading ? 'Creating...' : 'Create Business Post'} onPress={handleCreateBusinessPost} disabled={uploading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 },
  mediaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  mediaBtn: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 8 },
  previewWrapper: { alignItems: 'center', marginBottom: 12 },
  previewImage: { width: 300, height: 300, borderRadius: 16, borderWidth: 2, borderColor: '#2D5AFE' },
});
