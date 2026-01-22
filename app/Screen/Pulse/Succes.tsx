import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Token from '@/app/Modals/Token';

interface FeedbackScreenProps {
    status?: 'success' | 'error';
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ status = 'success' }) => {
    const isSuccess = status === 'success';
    const [modalVisible, setModalVisible] = React.useState(false);
    // Theme configuration based on status
    const theme = {
        gradient: isSuccess
            ? ['#020308', '#082613', '#155333', '#082613', '#020308'] as const
            : ['#020308', '#260808', '#531515', '#260808', '#020308'] as const,
        iconName: isSuccess ? 'checkmark-circle-outline' : 'alert-circle-outline' as any,
        iconColor: isSuccess ? '#4ade80' : '#f87171',
        title: isSuccess ? 'Pulse is live now' : 'Content Rejected',
        subTitle: isSuccess ? 'Congratulations' : 'Content Flagged for violating community guidelines',
        showEarnings: isSuccess,
    };

    return (
        <SafeAreaView style={styles.outerContainer}>
            <LinearGradient
                colors={theme.gradient as unknown as [string, string, ...string[]]}
                locations={[0, 0.3, 0.5, 0.7, 1]}
                style={styles.backgroundGradient}
            >
                <View style={styles.card}>
                    {/* Header Icon */}
                    <View style={styles.iconContainer}>
                        <Ionicons name={theme.iconName} size={100} color={theme.iconColor} />
                    </View>

                    {/* Main Content */}
                    <View style={styles.textSection}>
                        <Text style={styles.mainTitle}>{theme.title}</Text>
                        <Text style={styles.subTitle}>{theme.subTitle}</Text>

                        {theme.showEarnings && (
                            <View style={styles.earningsContainer}>
                                <Text style={styles.earningsText}>You have earned +2 $PSZ</Text>
                                <MaterialCommunityIcons name="hexagon-slice-6" size={18} color="#7B61FF" style={{ marginLeft: 5 }} />
                            </View>
                        )}
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity style={styles.walletButton} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>Go to Wallet</Text>
                    </TouchableOpacity>

                    {/* Footer Info */}
                    <Text style={styles.footerText}>
                        Pulse will be automatically deleted after 48 hours
                    </Text>
                </View>
            </LinearGradient>
            <Modal visible={modalVisible} animationType='slide' transparent={true} onRequestClose={() => setModalVisible(false)}>
                <Token onClose={() => setModalVisible(false)} />
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '80%',
        backgroundColor: 'rgba(5, 7, 20, 0.3)',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(78, 189, 239, 0.2)',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginTop: 40,
    },
    textSection: {
        alignItems: 'center',
    },
    mainTitle: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subTitle: {
        color: '#E0E0E0',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    earningsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    earningsText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    walletButton: {
        backgroundColor: '#2D5AFE',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footerText: {
        color: '#9CA3AF',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default FeedbackScreen;