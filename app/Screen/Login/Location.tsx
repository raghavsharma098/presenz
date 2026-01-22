import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Modal } from 'react-native';
import Pin from "../../../assets/logo/pin.svg";
export default function LocationPermissionScreen() {
  return (
    // <ImageBackground 
    //   source={require('./assets/space-bg.png')} 
    //   style={styles.container}
    // >
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

            <Text style={styles.title}>Sense your surroundings</Text>
            
            <Text style={styles.description}>
              PRESENZ uses your location to show moments near you. Your location is never shared with others.
            </Text>

            <TouchableOpacity 
              style={styles.allowButton}
              onPress={() => {router.navigate('/Screen/Login/Language')}}
            >
              <Text style={styles.allowText}>Allow Location</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.notNowButton}
    
            >
              <Text style={styles.notNowText}>Not now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  safeArea: { flex: 1 ,backgroundColor: '#000'},
  backButton: { 
    marginTop: 20, 
    marginLeft: 20, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    padding: 10, 
    borderRadius: 20, 
    alignSelf: 'flex-start' 
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
    borderColor: 'rgba(59, 130, 246, 0.3)', // Subtle blue glow border
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
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