
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { router } from "expo-router";


const { width } = Dimensions.get("window");

export default function VideoPostDetail({ post }: { post: any }) {
  const videoRef = useRef<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  // Countdown timer for expiry
  useEffect(() => {
    if (!post?.createdAt || post?.status === "expired") return;
    const expiryMs = 24 * 60 * 60 * 1000;
    const created = new Date(post.createdAt).getTime();
    const expiry = created + expiryMs;
    const updateCountdown = () => {
      const diff = expiry - Date.now();
      if (diff <= 0) {
        setCountdown("Expired");
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [post]);

  // Format time helper
  const formatTime = (ms: number | undefined) => {
    const totalSec = Math.floor((ms || 0) / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Progress for bar
  const progress = status && status.isLoaded && status.positionMillis && status.durationMillis
    ? status.positionMillis / status.durationMillis
    : 0;

  return (
    <LinearGradient colors={["#2f5bff", "#0a1b4f"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={()=>router.back()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportBtn}>
          <Feather name="alert-triangle" size={14} color="#fff" />
          <Text style={styles.reportText}> Report</Text>
        </TouchableOpacity>
      </View>
      {/* Title */}
      <View style={{ maxHeight: 66, marginBottom: 1 }}>
        <ScrollView style={{ flexGrow: 0 }} showsVerticalScrollIndicator={true}>
          <Text style={styles.title}>
            {post.description}
          </Text>
        </ScrollView>
      </View>
      {/* Video Card */}
      <View style={styles.card}>
        <Video
          ref={videoRef}
          source={{ uri: post.url }}
          style={styles.image}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={s => setStatus(s)}
        />
       <TouchableOpacity
          style={styles.playBtn}
          onPress={async () => {
            if (!videoRef.current) return;
            if (isPlaying) {
              await videoRef.current.pauseAsync();
            } else {
              await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
          }}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={26} color="#fff" />
        </TouchableOpacity>
       
      </View>

       
      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.time}>{formatTime(status && status.isLoaded ? status.durationMillis : 0)}</Text>
      </View>
      {/* Tag */}
      <View style={styles.tag}>
        <Text style={styles.tagText}>{post.expiryType}</Text>
      </View>
      {/* Info */}
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={16} color="#fff" />
        <Text style={styles.infoText}> {post.location?.address}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={16} color="#fff" />
        <Text style={styles.infoText}> {post.status === 'expired' ? 'Expired' : `Expires in ${countdown}`}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  reportText: {
    color: "#fff",
    fontSize: 13,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  card: {
    borderRadius: 20,
    overflow: "hidden",
    width: width - 40,
    height: '60%',
    alignSelf: "center",
    marginTop: 10,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  playBtn: {
    position: "absolute",
    bottom: -24,
    alignSelf: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2f5bff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#0a1b4f",
  
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },

  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
  },

  progressFill: {
    width: "30%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },

  time: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 10,
  },

  tag: {
    marginTop: 16,
    backgroundColor: "#1f3cff",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tagText: {
    color: "#fff",
    fontSize: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  infoText: {
    color: "#fff",
    fontSize: 13,
  },
});
