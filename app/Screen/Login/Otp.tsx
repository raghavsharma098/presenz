import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePrivy } from '@privy-io/expo';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OTPScreen() {
    const [timer, setTimer] = useState(12);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<(TextInput | null)[]>([]);
    const privy = usePrivy();



    // Simple countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        } else if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) return;
        try {
            await (privy as any).submitOtp(otpCode);
            router.navigate('../wallet');
        } catch (error) {
            console.error('OTP verification error:', error);
            Alert.alert("Error", "Failed to verify OTP");
        }
    };

    const handleResend = async () => {
        if (timer > 0) return;
        try {
            await (privy as any).resendCode();
            setTimer(12);
        } catch (error) {
            console.error('Resend error:', error);
            Alert.alert("Error", "Failed to resend OTP");
        }
    };

    return (
        // <ImageBackground source={require('./assets/space-bg.png')} style={styles.container}>
        <SafeAreaView style={styles.overlay}>
            <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconCircle} onPress={router.back}>
                        <Ionicons name="arrow-back" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themeCircle}>
                        <FontAwesome5 name="moon" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Enter OTP</Text>
                    <Text >
                        {/* <Text style={styles.otpSubtitle}>  */}
                        We&apos;ve Sent An OTP. Please Check Your Email or SMS And Enter The Code.
                    </Text>

                    {/* OTP Input Row */}
                    <View style={styles.otpContainer}>
                        {[...Array(6)].map((_, i) => (
                            <View key={i} style={styles.otpBox}>
                                <TextInput
                                    ref={(el) => { inputs.current[i] = el; }}
                                    style={styles.otpInput}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    placeholder="0"
                                    placeholderTextColor="#4b5563"
                                    value={otp[i]}
                                    onChangeText={(text) => handleChange(text, i)}
                                />
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.buttonMain} onPress={() => router.navigate('/Screen/Login/Verify')}>
                        <Text style={styles.buttonText}>Verify</Text>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                        <Text style={styles.resendText}>
                            Resend OTP <Text style={styles.timerText}>(00:{timer < 10 ? `0${timer}` : timer})</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView >
        // </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    overlay: {
        flex: 1,
        backgroundColor: '#000'
    },
    keyboardAvoid: {
        flex: 1,
    },
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
    
    },
    title: {
        color: '#fff',
        fontSize: 28, fontWeight: 'bold',
        marginBottom: 20
    },
  

    
    buttonMain: {
        width: '90%',
        height: 55,
        backgroundColor: 'rgba(43, 77, 255, 1)', // Bright blue for active verify
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
        
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: "3%"
    },
    otpBox: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: '#4b5563',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpInput: {
        color: '#fff',

        fontSize: 18,
        fontWeight: 'bold'
    },
    resendText: {
        color: '#9ca3af',
        marginTop: 25
    },
    timerText: { color: '#fcd34d' }, // Gold color for timer
    footer: {
        paddingBottom: 20,
        alignItems: 'center'
    },
    footerText: {
        color: '#9ca3af',
        fontSize: 12
    },
    footerLink: {
        color: '#9ca3af',
        fontSize: 12,
        textDecorationLine: 'underline'
    }
});