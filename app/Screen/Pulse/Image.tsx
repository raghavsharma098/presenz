
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import ImagePostDetail from './ImagePostDetail';
import VideoPostDetail from './VideoPostDetail';
import { useLocalSearchParams } from 'expo-router';

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) throw new Error('No post ID provided');
        const res = await axios.get(`https://localhost:300/api/posts/${postId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        console.log('Fetched post data:', res.data);
        setPost(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b1020' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }
  if (error || !post) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b1020' }}>
        <Text style={{ color: 'red' }}>{'Error loading post'}</Text>
      </View>
    );
  }
  if (post.type === 'image') {
    return <ImagePostDetail post={post} />;
  } else if (post.type === 'video') {
    return <VideoPostDetail post={post} />;
  } else {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b1020' }}><Text style={{ color: '#fff' }}>Unsupported media</Text></View>;
  }
}