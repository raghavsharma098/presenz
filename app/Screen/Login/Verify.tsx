import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { usePrivy } from '@privy-io/expo';
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import Verified from '../../../assets/logo/verified.svg';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function VerifiedScreen() {


    return (
        <ImageBackground 
          source={require('../../../assets/background/welcome.png')} 
          style={styles.container}
        >
        <SafeAreaView style={styles.overlay}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconCircle} onPress={router.back}>
                    <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.themeCircle}>
                    <FontAwesome5 name="moon" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.centerContent}>
                <Text style={styles.title}>Account Verified</Text>
                <Text style={styles.subtitle}>You have full access.</Text>
                <View style={[styles.glowContainer, { width: 150, height: 150 }]}>
                    <Verified />
                </View>
            </View>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.navigate('./In')}
            >
                <Text style={styles.buttonText}>Start Exploring</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    overlay: { flex: 1, backgroundColor: 'rgb(0, 0, 0,0.6)' },
    header: {
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
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 10 },
    subtitle: { color: '#fff', fontSize: 16, opacity: 0.9, marginBottom: 50 },

    // Glowing Checkmark Styles
    glowContainer: {
        shadowColor: '#4CC9FE',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 15,
    },
    outerCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#4CC9FE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 4,
        borderColor: '#4CC9FE',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 201, 254, 0.1)',
    },
    checkmark: { color: '#4CC9FE', fontSize: 40, fontWeight: 'bold' },

    // Final Welcome Styles
    pinWrapper: { alignItems: 'center', marginBottom: 40 },
    pinShadow: {
        position: 'absolute',
        bottom: -10,
        width: 60,
        height: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        transform: [{ scaleX: 2 }],
    },
    hugeTitle: {
        color: '#fff',
        fontSize: 48,
        fontWeight: '900',
        fontFamily: 'serif' // Use a slab-serif font if available
    },
    liveSubtitle: { color: '#fff', fontSize: 18, marginTop: 10, opacity: 0.8 },

    // Button Style
    primaryButton: {
        backgroundColor: 'rgba(43, 77, 255, 1)', // Match the dark blue/grey button
        height: "7%",
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: "20%",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4CC9FE', // Glow border
        shadowColor: '#4CC9FE',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});