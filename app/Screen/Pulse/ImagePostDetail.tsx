import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native"
import { router } from "expo-router";
const { height } = Dimensions.get("window");

export default function PostDetailScreen({ post }: { post: any }) {
  const [countdown, setCountdown] = useState<string>("");

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

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [post]);

  return (
    <LinearGradient colors={["#ff4b8b", "#7a1fa2"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportBtn} onPress={() => router.navigate('/Modals/Report')}>
            <Ionicons name="warning-outline" size={16} color="#fff" />
            <Text style={styles.reportText}> Report</Text>
          </TouchableOpacity>
        </View>

        {/* TITLE */}

        <View style={{ maxHeight: 66, marginBottom: 1 }}>
          <ScrollView style={{ flexGrow: 0 }} showsVerticalScrollIndicator={true}>
            <Text style={styles.title}>
              {post.description}
            </Text>
          </ScrollView>
        </View>

        {/* IMAGE CARD */}
        <View style={styles.card}>
          <Image
            source={{
              uri:
                post?.url ||
                "Format Issue",
            }}
            style={styles.image}
          />
        </View>

        {/* INFO SECTION */}
        <View style={styles.infoSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {post?.expiryType}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#fff" />
            <Text style={styles.infoText}>
              {" "}
              {post?.location?.address}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.infoText}>
              {post?.status === "expired"
                ? "Expired"
                : `Expires in ${countdown}`}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safe: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 8,
    borderRadius: 20,
  },

  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  reportText: {
    color: "#fff",
    fontSize: 13,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingBottom: 10,

  },

  card: {
    height: '70%',
    borderRadius: 24,
    overflow: "hidden",
    marginTop: 10,
  },

  image: {
    width: "100%",
    height: "100%",

  },

  infoSection: {
    marginTop: 16,
  },

  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#ff5fa2",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },

  tagText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  infoText: {
    color: "#fff",
    fontSize: 14,
  },
});
