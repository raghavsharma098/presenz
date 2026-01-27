import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLoginWithEmail } from '@privy-io/expo';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../store/hooks';
export default function LoginScreen() {
  const [contact, setContact] = useState("");
  const { sendCode } = useLoginWithEmail();
  const translations = useAppSelector((state: any) => state.language.translations);

  const handleGetOtp = async () => {
    if (!contact.includes("@")) {
      Alert.alert("Error", translations.enterEmailDesc);
      return;
    }

    try {
      await sendCode({ email: contact });
      router.push(
        `/Screen/Login/Otp?contact=${encodeURIComponent(contact)}`
      );
    } catch (error: any) {
      console.error("OTP error:", error);
      Alert.alert(
        "Error",
        error?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background/welcome.png')}
      style={styles.container}
    >
    <SafeAreaView style={styles.overlay}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => router.navigate('/Screen/Welcome/Welcome2')}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.themeCircle}>
          <FontAwesome5 name="moon" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <Text style={styles.title}>{translations.welcomePresenz}</Text>
        <Text style={styles.subtitle}>
          {translations.enterEmailDesc}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={translations.enterEmail}
          placeholderTextColor="#6b7280"
          value={contact}
          onChangeText={text => setContact(text.replace(/\s+$/, ""))}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.button]}
          onPress={handleGetOtp}
        >
          <Text style={styles.buttonText}>{translations.getOtp}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {translations.byContinuing}
        </Text>
        <Text style={styles.footerLink}>{translations.terms}</Text>
      </View>
    </SafeAreaView>
     </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgb(0, 0, 0, 0.6)' },
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