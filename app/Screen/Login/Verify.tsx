import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import Verified from '../../../assets/logo/verified.svg';

export default function VerifiedScreen() {
    return (
        // <ImageBackground 
        //   source={require('./assets/space-bg.png')} 
        //   style={styles.container}
        // >
        <SafeAreaView style={styles.overlay}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
                   <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.centerContent}>
                <Text style={styles.title}>Account Verified</Text>
                <Text style={styles.subtitle}>You have full access.</Text>
                <Verified
                    width={150}
                    height={150}
                    style={styles.glowContainer}
                />
            </View>

            <TouchableOpacity
                style={styles.primaryButton}
              onPress={() => router.navigate('./In')}
            >
                <Text style={styles.buttonText}>Start Exploring</Text>
            </TouchableOpacity>
        </SafeAreaView>
        // </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    overlay: { flex: 1, paddingHorizontal: 25, paddingBottom: 40, backgroundColor: '#000' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    iconCircle: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 10,
        borderRadius: 25
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
        backgroundColor: '#34495E', // Match the dark blue/grey button
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4CC9FE', // Glow border
        shadowColor: '#4CC9FE',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});