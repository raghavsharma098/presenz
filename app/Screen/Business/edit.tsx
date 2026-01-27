import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getBusinessPostById, editBusinessPost, BusinessPost } from '@/app/api/businessApi';
// TODO: Replace with your actual user ID fetch logic
import { usePrivy } from '@privy-io/expo';

const EditBusinessPostScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BusinessPost | null>(null);
  const [description, setDescription] = useState('');
  const [promo, setPromo] = useState('');
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const { user, getAccessToken } = usePrivy();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await getAccessToken();
        const safeToken = typeof token === 'string' ? token : undefined;
        const found = await getBusinessPostById(postId as string, safeToken);
        if (found) {
          setPost(found);
          setDescription(found.description || '');
          setPromo(found.promo || '');
          setName(found.name || '');
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to fetch post details');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, getAccessToken]);

  const handleSave = async () => {
    if (!post) return;
    setSaving(true);
    try {
      const token = await getAccessToken();
      const safeToken = typeof token === 'string' ? token : undefined;
      await editBusinessPost(post._id, { description, promo, name }, safeToken);
      Alert.alert('Success', 'Post updated');
      router.back();
    } catch (e: any) {
      let errorMsg = 'Failed to update post';
      if (e?.response?.data?.error) {
        errorMsg += `: ${e.response.data.error}`;
      } else if (e?.message) {
        errorMsg += `: ${e.message}`;
      }
      Alert.alert('Error', errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" /></View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centered}><Text>Post not found</Text></View>
    );
  }


  // Only allow owner to edit (normalize Privy_Id and user.id)
  const normalizePrivyId = (id: string | undefined | null) => id ? String(id).replace(/^did:privy:/, '') : '';
  const isOwner = user?.id && normalizePrivyId(post.Privy_Id) === normalizePrivyId(user.id);

  if (!isOwner) {
    return (
      <View style={styles.centered}><Text>You are not the owner of this post.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Business Name"
      />
      <Text style={styles.label}>Promo</Text>
      <TextInput
        style={styles.input}
        value={promo}
        onChangeText={setPromo}
        placeholder="Promo"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <Button title={saving ? "Saving..." : "Save"} onPress={handleSave} disabled={saving} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditBusinessPostScreen;