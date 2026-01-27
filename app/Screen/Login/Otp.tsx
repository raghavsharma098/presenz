import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useLoginWithEmail,
  useEmbeddedEthereumWallet,
  usePrivy,
  getUserEmbeddedEthereumWallet,
} from "@privy-io/expo";


import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Export a hook to get the Privy user globally
export function usePrivyUser() {
  const { user } = usePrivy();
  return user;
}
import axios from "axios";

export default function OTPScreen() {
  const { contact } = useLocalSearchParams<{ contact: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);
  const hasSavedRef = useRef(false);

  const { loginWithCode, sendCode } = useLoginWithEmail();
  const { create } = useEmbeddedEthereumWallet();
  const { user, getAccessToken, isReady } = usePrivy();

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    console.log("Timer started");
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- OTP INPUT ---------------- */
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) inputs.current[index + 1]?.focus();
    if (!text && index > 0) inputs.current[index - 1]?.focus();
  };

  /* ---------------- RESEND OTP ---------------- */
  const handleResend = async () => {
    if (timer > 0) return;
    try {
      console.log("Resending OTP to:", contact);
      await sendCode({ email: contact });
      setTimer(30);
    } catch (error) {
      console.error("Resend OTP error:", error);
      Alert.alert("Error", "Failed to resend OTP");
    }
  };

  // Track if code was sent for this email
  const [codeSent, setCodeSent] = useState(false);
  useEffect(() => {
    if (contact && !codeSent) {
      sendCode({ email: contact })
        .then(() => setCodeSent(true))
        .catch((err) => {
          console.error("Failed to send OTP on mount:", err);
          Alert.alert("Error", "Failed to send OTP. Please try again.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  const handleVerifyOtp = async () => {
    if (otp.some((d) => d === "")) {
      Alert.alert("Error", "Please enter complete OTP");
      return;
    }

    setLoading(true);
    console.log("Verifying OTP:", otp.join(""));

    try {
      if (!codeSent) {
        await sendCode({ email: contact });
        setCodeSent(true);
      }
      await loginWithCode({ code: otp.join("") });
      console.log("OTP verified successfully");
      // Access token will be fetched in useEffect when user is set
    } catch (err) {
      console.error("OTP verification failed:", err);
      Alert.alert("Error", "Invalid or expired OTP");
      setLoading(false);
    }
  };
// Fetch Privy access token when user becomes available and isReady is true
  // Only fetch Privy access token once per session
 

  /* ---------------- WALLET CREATION + BACKEND ---------------- */
  useEffect(() => {
    if (!user?.id) return;
    if (hasSavedRef.current) return;

    const ensureWalletAndSave = async () => {
      try {
        hasSavedRef.current = true;
        console.log("User object available:", user);

        // 1️⃣ Check AsyncStorage for existing wallet
        let walletAddress = await AsyncStorage.getItem(`wallet_${user.id}`);
        if (walletAddress) {
          console.log("Found wallet in AsyncStorage:", walletAddress);
        }

        // 2️⃣ Check Privy embedded wallet

        let wallet;
        try {
          wallet = getUserEmbeddedEthereumWallet(user);
          if (!wallet) {
            console.log("No embedded wallet, creating new wallet...");
            await create();
            wallet = getUserEmbeddedEthereumWallet(user);
          }
        } catch (walletErr) {
          console.error("Wallet provider error:", walletErr);
          Alert.alert(
            "Wallet Error",
            "Could not connect to the embedded wallet provider. Please check your internet connection and try again."
          );
          setLoading(false);
          return;
        }

        if (!wallet?.address) {
          Alert.alert(
            "Wallet Error",
            "Wallet address missing after creation. Please try again later."
          );
          setLoading(false);
          return;
        }
        walletAddress = wallet.address;

        // 3️⃣ Save wallet to AsyncStorage
        await AsyncStorage.setItem(`wallet_${user.id}`, walletAddress);
        console.log("Wallet persisted in AsyncStorage:", walletAddress);

        // 4️⃣ Call backend API
        console.log("Calling backend API with wallet and user info...");
        const res = await axios.post(
          "https://localhost:300/api/login",
          {
            Email: contact,
            Privy_Id: user.id,
            Wallet_Address: walletAddress,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            timeout: 10000
          }
        );

        if (res.data?.success) {
          console.log("Backend login successful:", res.data);
          router.replace("/Screen/Login/Verify");
        } else {
          console.warn("Backend login failed:", res.data);
          Alert.alert("Error", "Backend login failed");
        }
      } catch (err) {
        console.error("Wallet/Backend setup failed:", err);
        Alert.alert("Error", "Login setup failed");
      } finally {
        setLoading(false);
      }
    };

    ensureWalletAndSave();
  }, [user]);

  return (
    <ImageBackground
          source={require('../../../assets/background/welcome.png')} // Your star background SVG/Image
          style={{flex:1}}
        >

    <SafeAreaView style={styles.overlay}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconCircle} onPress={router.back}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <FontAwesome5 name="moon" size={18} color="white" />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            We’ve sent a 6-digit code to your email
          </Text>

          {/* OTP Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((v, i) => (
              <View key={i} style={styles.otpBox}>
                <TextInput
                  ref={(el: TextInput | null) => {
                    inputs.current[i] = el ?? null;
                  }}
                  value={v}
                  onChangeText={(t) => handleChange(t, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.otpInput}
                  />
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOtp}
            disabled={loading}
            >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text style={styles.resendText}>
              Resend OTP{" "}
              <Text style={styles.timerText}>
                (00:{timer < 10 ? `0${timer}` : timer})
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
</ImageBackground>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgb(0, 0, 0,0.6)" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconCircle: {
    backgroundColor: "rgba(96,165,250,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#9ca3af", marginVertical: 12 },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 20,
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  otpInput: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  button: {
    width: "90%",
    height: 55,
    backgroundColor: "#2563eb",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  resendText: { color: "#9ca3af", marginTop: 20 },
  timerText: { color: "#fcd34d" },
});
