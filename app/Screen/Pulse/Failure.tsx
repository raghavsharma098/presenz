//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYzUyYjdjYi05MjgxLTRiNGYtYjc3NC1lNzZlZjhmMzdmNWIiLCJpZCI6Mzc3MzEzLCJpYXQiOjE3NjgxNDgxMTB9.YrR18gxWDoEwKZcN7gLMTrC6hjn1FC5A_kmzOz5SJ0w


import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Define the colors as readonly tuples to satisfy the LinearGradient types
const SUCCESS_COLORS = ['#020308', '#082613', '#155333', '#082613', '#020308'] as const;
const REJECT_COLORS = ['#020308', '#260808', '#531515', '#260808', '#020308'] as const;

interface StatusFeedbackProps {
  status: 'success' | 'rejected';
}

export default function StatusFeedback({ status }: StatusFeedbackProps) {
  const isSuccess = status === 'success';

  return (
    <SafeAreaView style={styles.container}>
      {/* Background with specific color stops to mimic radial glow */}
      <LinearGradient
        colors={isSuccess ? SUCCESS_COLORS : REJECT_COLORS}
        locations={[0, 0.3, 0.5, 0.7, 1]}
        style={styles.gradientBackground}
      >
        <View style={styles.card}>
          {/* Icon Section */}
          <View style={styles.iconWrapper}>
            {isSuccess ? (
              <Ionicons name="checkmark-circle-outline" size={120} color="#4ade80" />
            ) : (
              <View style={styles.rejectIconCircle}>
                <Ionicons name="alert" size={60} color="#000" />
              </View>
            )}
          </View>

          {/* Text Content */}
          <View style={styles.contentSection}>
            <Text style={styles.title}>
              {isSuccess ? 'Pulse is live now' : 'Content Rejected'}
            </Text>
            
            {isSuccess ? (
              <>
                <Text style={styles.congratsText}>Congratulations</Text>
                <View style={styles.earnedRow}>
                  <Text style={styles.earnedLabel}>You have earned +2 $PSZ</Text>
                  <MaterialCommunityIcons name="hexagon-slice-6" size={18} color="#7B61FF" />
                </View>
              </>
            ) : (
              <Text style={styles.rejectedSubText}>
                Content Flagged for violating community guidelines
              </Text>
            )}
          </View>

          {/* Action Button (Success only) */}
          <View style={styles.footerSection}>
            {isSuccess && (
              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Go to Wallet</Text>
              </TouchableOpacity>
            )}

          
          </View>
        </View>
      </LinearGradient>
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '88%',
    height: '82%',
    backgroundColor: 'rgba(10, 11, 26, 0.4)',
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(78, 189, 239, 0.25)', // Subtle blue border from image
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: 60,
  },
  rejectIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  congratsText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  earnedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earnedLabel: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 6,
  },
  rejectedSubText: {
    color: '#E0E0E0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  footerSection: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2D5AFE',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerNote: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
});