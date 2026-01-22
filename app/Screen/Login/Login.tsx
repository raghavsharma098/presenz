import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePrivy } from '@privy-io/expo';

import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function LoginScreen() {

  const [contact, setContact] = useState("");
  const privy = usePrivy();
  const handleGetOtp = async () => {
    if (!contact.trim()) return;
    try {
      await (privy as any).sendOtp({
        to: contact.trim(),
      });
      router.navigate('./Otp');
    } catch (e) {
      Alert.alert("Error", "Failed to send OTP");
      console.log(e);
    }
  };
  return (
    // <ImageBackground
    //   source={require('./assets/space-bg.png')} // Your star background SVG/Image
    //   style={styles.container}
    // >
    <SafeAreaView style={styles.overlay}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle} onPress={router.back}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.themeCircle}>
          <FontAwesome5 name="moon" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to PRESENZ</Text>
        <Text style={styles.subtitle}>
          Please enter <Text style={styles.bold}>your email address or phone number</Text>, so we can verify you.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email or phone number"
          placeholderTextColor="#6b7280"
          value={contact}
          onChangeText={setContact}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => router.navigate('/Screen/Login/Otp')}
        >
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to PRESENZ&apos;s
        </Text>
        <Text style={styles.footerLink}>Terms of Service and Privacy Policy</Text>
      </View>
    </SafeAreaView>
    // </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: { flex: 1, backgroundColor: '#000' },
  header: {
    padding: "1%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,

  },
  iconCircle: {
    position: 'absolute',
    top: "5%",
    left: "5%",
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    padding: "1%",
    borderRadius: 20,
  },
  themeCircle: {
    position: 'absolute',
    top: "5%",
    right: "5%",
    padding: "1%",
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: "5%",
  },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { color: '#d1d5db', textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  bold: { fontWeight: 'bold', color: '#fff' },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 15,
    paddingHorizontal: 20,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(37, 99, 235, 0.4)', // Faded blue from image
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(241, 245, 249, 1)'
  },
  buttonMain: {
    width: '100%',
    height: 55,
    backgroundColor: '#3b82f6', // Bright blue for active verify
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 20 },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otpInput: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resendText: { color: '#9ca3af', marginTop: 25 },
  timerText: { color: '#fcd34d' }, // Gold color for timer
  footer: { paddingBottom: 20, alignItems: 'center' },
  footerText: { color: '#9ca3af', fontSize: 12 },
  footerLink: { color: '#9ca3af', fontSize: 12, textDecorationLine: 'underline' }
});