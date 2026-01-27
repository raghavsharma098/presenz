import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Pin from "../../../assets/logo/pin.svg";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../store/hooks';
export default function LocationPermissionScreen() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const translations = useAppSelector((state: any) => state.language.translations);
  // Helper to fetch location with timeout
  const getLocationWithTimeout = async (timeoutMs = 10000): Promise<Location.LocationObject> => {
    return Promise.race([
      Location.getCurrentPositionAsync({}),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Location request timed out.')), timeoutMs))
    ]);
  };
  return (
    <ImageBackground 
      source={require('../../../assets/background/welcome.png')} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
       <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        {/* Modal-like Card */}
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            {/* 3D Pin SVG Placeholder */}
            <View style={styles.iconContainer}>

               <Pin width={100} height={130} />
            </View>

            <Text style={styles.title}>{translations.senseSurroundings}</Text>
            
            <Text style={styles.description}>
              {translations.locationDesc}
            </Text>

            <TouchableOpacity 
              style={styles.allowButton}
              disabled={loading}
              onPress={()=>router.navigate('/Screen/Login/Language')}
            >
               <Text style={styles.allowText}>{translations.allowLocation}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.notNowButton}
            >
              <Text style={styles.notNowText}>{translations.notNow}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
     </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 ,backgroundColor: 'rgb(0, 0, 0,0.6)'},
  backButton: { 
    position: 'absolute',
    top: "5%",
    left: "5%",
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    padding: "1%",
    borderRadius: 20,
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark translucent background
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: 'rgba(43, 77, 255, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15, // for Android
  },
  iconContainer: { marginBottom: 30 },
  placeholderPin: { width: 100, height: 130, backgroundColor: '#4f46e5', borderRadius: 20 },
  title: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15 
  },
  description: { 
    color: '#9ca3af', 
    textAlign: 'center', 
    lineHeight: 22, 
    fontSize: 14,
    marginBottom: 30 
  },
  allowButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2563eb',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  allowText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  notNowButton: { paddingVertical: 10 },
  notNowText: { color: '#9ca3af', fontSize: 14 },
});