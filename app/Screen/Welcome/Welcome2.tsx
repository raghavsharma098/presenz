import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Pin from "../../../assets/logo/pin.svg";

export default function WelcomeScreen() {
    return (
        <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.mapHeader}>
                <Pin width={120} height={150} />
            </View>
            <View style={styles.content}>
                <Text style={styles.welcomeSubtitle}>Welcome To</Text>
                <Text style={styles.brandNameLarge}>PRESENZ</Text>
                <Text style={styles.exploreText}>Explore what&apos;s happening near you</Text>
                <TouchableOpacity style={styles.getStartedButton} onPress={() => { router.navigate('../Login/Login') }}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        backgroundColor: '#000'
    },
    backButton: {
        position: 'absolute',
        top: 50, left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(30, 58, 138, 0.5)',
        padding: 10,
        borderRadius: 100
    },
    mapHeader: {
        height: '50%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    placeholderPinLarge: {
        width: 80, height: 110,
        backgroundColor: '#6366f1',
        marginBottom: -20
    },
    content: {
        flex: 1, alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 40
    },
    welcomeSubtitle: {
        color: '#fff',
        fontSize: 18, opacity: 0.8
    },
    brandNameLarge: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
        letterSpacing: 4,
        marginVertical: 10
    },
    exploreText: {
        color: '#9ca3af',
        fontSize: 14,
        marginBottom: 40
    },
    getStartedButton: {
        width: '100%',
        backgroundColor: '#2563eb',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});