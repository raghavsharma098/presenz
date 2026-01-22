import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Pin from "../../../assets/logo/pin.svg";
import Logo from "../../../assets/logo/1.svg";
export default function WelcomeScreen() {
    return (
        <View style={styles.welcomeContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.mapHeader}>
                <Pin style={{ width: "40%", height: "60%", top: "15%" }} />
            </View>
            <View style={styles.content}>
                <Text style={styles.welcomeSubtitle}>Welcome To</Text>
                <Logo style={{ width: "80%", height: "20%" }} />
                <Text style={styles.exploreText}>Explore what's happening near you</Text>
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
        top: "5%",
        left: "5%",
        backgroundColor: 'rgba(96, 165, 250, 0.3)',
        padding: "1%",
        borderRadius: 20,
    },
    mapHeader: {
        height: '50%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "15%",
        paddingHorizontal: "5%"
    },
    welcomeSubtitle: {
        color: '#fff',
        fontSize: 18,
        opacity: 0.8,
        marginBottom: "5%"
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
        fontSize: 18,
        marginTop: 100,
    },
    getStartedButton: {
        width: '100%',
        position: 'absolute',
        bottom: "15%",
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