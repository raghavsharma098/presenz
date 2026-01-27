import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,

} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePrivy } from '@privy-io/expo';
import axios from 'axios';
import { router } from "expo-router";
import Pin from "../../../assets/logo/pin.svg";
import DeletePulseConfirm from "../../Modals/deleteModal";
import * as ImagePicker from 'expo-image-picker';


interface Post {
  _id: string;
  url: string;
  type: string;
  publicId: string;
  description: string;
  location: {
    address: string;
    long: number;
    lat: number;
  };
  postTime: Date;
  expiryType: string;
  createdAt: Date;
  status: string;
  Privy_Id: string;
}

export default function HistoryPulse() {
  const { user } = usePrivy();
  const [posts, setPosts] = useState<Post[]>([]);
  const [now, setNow] = useState(new Date());
  const handleMediaSelect = async () => {
    if (Platform.OS === 'web') {
      const choice = window.prompt('Type: photo, video, or gallery');
      if (choice === 'photo') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.9,
        });
        const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
        if (!canceled) {
          const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
          router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'image' } });
        }
      } else if (choice === 'video') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 0.9,
          videoMaxDuration: 20,
        });
        const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
        if (!canceled) {
          const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
          router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'video' } });
        }
      } else if (choice === 'gallery') {
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
          router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: type === 'video' ? 'video' : 'image' } });
        }
      }
    } else {
      Alert.alert(
        'Select Media',
        'Choose an option',
        [
          {
            text: 'Take Photo',
            onPress: async () => {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.9,
              });
              const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
              if (!canceled) {
                const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'image' } });
              }
            },
          },
          {
            text: 'Take Video',
            onPress: async () => {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.9,
                videoMaxDuration: 20,
              });
              const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
              if (!canceled) {
                const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'video' } });
              }
            },
          },
          {
            text: 'Choose from Gallery',
            onPress: async () => {
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
                router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: type === 'video' ? 'video' : 'image' } });
              }
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };
  useEffect(() => {
    const nowInterval = setInterval(() => setNow(new Date()), 1000); // Update every second
    const fetchInterval = setInterval(() => {
      fetchPosts();
    }, 10000); // Refresh posts every 10 seconds
    return () => {
      clearInterval(nowInterval);
      clearInterval(fetchInterval);
    };
  }, [user?.id]);

  const fetchPosts = () => {
    if (user?.id) {
      const encodedId = encodeURIComponent(user.id);
      axios.get(`https://localhost:300/api/posts/user/${encodedId}/active`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?.id]);

  const getCountdown = (expiryTime: Date) => {
    const diff = expiryTime.getTime() - now.getTime();
    if (diff <= 0) return '00:00:00';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Mark post as expired (not actually deleted)
  const expirePost = async (postId: string) => {
    try {
      await axios.delete(`https://localhost:300/api/posts/${postId}`, {
        data: { privyId: user?.id },
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      // Refetch posts after expiring
      fetchPosts();
    } catch (error) {
      console.error('Error expiring post:', error);
      alert('Failed to expire post');
    }
  };

  return (
    <LinearGradient
      colors={["#020024", "#020024", "#020024"]}
      style={{ flex: 1, }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(0, 0, 0,0.95)' }}>

        <View style={styles.topBar}>
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={20} color="#fff" style={{ backgroundColor: 'rgba(30, 41, 59, 1)', borderRadius: 20, padding: 4 }} />
          </TouchableOpacity>
          <Text style={styles.pulseText}>Pulse</Text>
        </View>
        <View style={styles.container}>

          {/* Header with close button */}
          <View style={styles.header}>
            <Text style={styles.title}>Active Pulse</Text>
          </View>

          {posts.filter(post => post.status === 'active').length === 0 ? (
            <View style={styles.noPulseContainer}>
              <Text style={styles.noPulseTitle}>You have no active pulse.</Text>
              <TouchableOpacity style={styles.createPulseBtn} onPress={handleMediaSelect}>
                <Text style={styles.createPulseBtnText}>Create Pulse</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backHomeBtn} onPress={() => router.navigate('/Screen/Map/Map')}>
                <Text style={styles.backHomeBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          ) : (
            posts.filter(post => post.status === 'active').map((post, index) => {
              const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
              const expiryTime = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
              return (
                <PulseCard
                  key={index}
                  iconColor="#60a5fa"
                  title={post.description || 'No description'}
                  address={post.location?.address || 'Unknown location'}
                  time={getCountdown(expiryTime)}
                  danger={false}
                  onDelete={() => expirePost(post._id)}
                />
              );
            })
          )}
        </View>
      </SafeAreaView>

    </LinearGradient>
  );
}

/* ---------------- Card Component ---------------- */

const PulseCard = ({
  iconColor,
  title,
  address,
  time,
  danger,
  onDelete,
}: {
  iconColor: string;
  title: string;
  address: string;
  time: string;
  danger?: boolean;
  onDelete: () => void;
}) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Pin width={30} height={30} style={{ marginTop: 2 }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{address}</Text>
        </View>
      </View>
      <Text style={[styles.time, danger && { color: "#ef4444" }]}>
        {time}
      </Text>
      <TouchableOpacity style={styles.delete} onPress={() => setShowDelete(true)}>
        <Feather name="trash-2" size={16} color="#fff" />
      </TouchableOpacity>
      {showDelete && (
        <DeletePulseConfirm
          onDelete={() => {
            setShowDelete(false);
            onDelete();
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </View>

  );
};

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  noPulseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  noPulseTitle: {
    color: '#60a5fa',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 70,
    textAlign: 'center',
  },
  createPulseBtn: {
    backgroundColor: '#316CFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#7DAAFF',
    shadowColor: '#60a5fa',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  createPulseBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  backHomeBtn: {
    marginTop: 0,
  },
  backHomeBtnText: {
    color: '#BFC9DA',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 2,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pulseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#05052a",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
  },

  title: {
    color: "rgba(90, 185, 245, 1)",
    fontSize: 20,
    fontWeight: "600",
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(1, 0, 38, 1)",
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(96,165,250,0.3)",
    paddingTop: 20,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    paddingRight: 40,
  },

  cardSubtitle: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
  },

  time: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  delete: {
    marginLeft: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#6b7280",
    justifyContent: "center",
    alignItems: "center",
  },
});
