import React, { useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import CesiumMap from './CesiumMap';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import DeletePulseConfirm from '@/app/Modals/deleteModal';
import MapHeader from '@/app/Components/MapHeader';
import MapTopBar from '@/app/Components/MapTopBar';
import Post from '@/app/Components/Post';
import RangeSelector from '@/app/Components/RangeSelector';
import { usePrivy } from '@privy-io/expo';
import axios from 'axios';

function Map() {
  const isDarkMode = useColorScheme() === 'dark';
  const cesiumMapRef = useRef<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user, getAccessToken, isReady } = usePrivy();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deleteAction, setDeleteAction] = useState<'delete' | 'expire'>('delete');
  const router = useRouter();



  const onRefresh = async () => {
    setRefreshing(true);
    // Call a method on CesiumMap to refresh location (if exposed)
    if (cesiumMapRef.current && cesiumMapRef.current.refreshLocation) {
      await cesiumMapRef.current.refreshLocation();
    }
    setRefreshing(false);
  };

  // Get user ID from Privy user object (Privy_Id does not exist on User)
  const currentUserId = user?.id || '';

  // Handler for messages from CesiumMap WebView
  const handleWebViewMessage = (event: any) => {
    try {
      const data = typeof event?.nativeEvent?.data === 'string' ? JSON.parse(event.nativeEvent.data) : event.nativeEvent.data;
      if (data?.type === 'navigateToEditScreen' && data?.postId) {
        router.push({
          pathname: '/Screen/Business/edit',
          params: { postId: data.postId },
        });
      }
      if (data?.type === 'openDeleteModal' && data?.postId) {
        setShowDeleteModal(true);
        setDeletePostId(data.postId);
        setDeleteAction(data.action || 'expire');
      }
      // Handle navigation to Image screen from WebView
      if (data?.type === 'navigateToMedia' && data?.mediaType === 'image' && data?.postId) {
        router.push({ pathname: '/Screen/Pulse/Image', params: { postId: data.postId } });
      }
    } catch (e) {
      console.warn('Failed to handle WebView message:', e);
    }
  };

  const handleDelete = async () => {
    if (deletePostId) {
      try {
        // Fetch Privy access token for authenticated request
        let token = undefined;
        if (isReady && user) {
          try {
            token = await getAccessToken();
            console.log('Privy access token (Map):', token);
            // Decode JWT to check expiry
            if (token) {
              const [, payloadB64] = token.split('.');
              const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
              const now = Math.floor(Date.now() / 1000);
              if (payload.exp && payload.exp < now) {
                console.warn('Privy access token is expired!', payload);
              } else {
                console.log('Privy access token expiry:', payload.exp, 'now:', now);
              }
            }
          } catch (err) {
            console.warn('Failed to get Privy access token:', err);
          }
        }
        if (!token) {
          alert('You must be logged in to perform this action.');
          setShowDeleteModal(false);
          setDeletePostId(null);
          return;
        }
        // Authenticated PATCH request
        const headers = {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
          ...(user?.id ? { 'x-privy-id': user.id } : {}),
        };
        console.log('PATCH expire headers:', headers);
        try {
          const res = await axios.patch(
            `https://localhost:300/api/business/${deletePostId}/expire`,
            {},
            { headers }
          );
          console.log('Expire response:', res.data);
        } catch (e:any) {
          if (e.response) {
            console.warn('Failed to expire post:', e, 'Response:', e.response.data);
          } else {
            console.warn('Failed to expire post:', e);
          }
        }
      } catch (e) {
        console.warn('Failed to expire post:', e);
      }
    }
    setShowDeleteModal(false);
    setDeletePostId(null);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setDeletePostId(null);
  };

  // Removed old access token log (token is not on user object)

  if (!user) {
    alert('You must be logged in to perform this action.');
    return;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <CesiumMap ref={cesiumMapRef} userId={currentUserId} onMessage={handleWebViewMessage} />
          <MapHeader />
          <MapTopBar />
          <Post />
          <RangeSelector />
          {showDeleteModal && (
            <DeletePulseConfirm onDelete={handleDelete} onCancel={handleCancel} />
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Map;
