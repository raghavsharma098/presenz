import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';
import Pin from "../../../assets/logo/pin.svg";
import Logo from "../../../assets/logo/1.svg";
import { router } from 'expo-router';

export default function Welcome() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [ageConfirm, setAgeConfirm] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/background/welcome.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Pin
              style={{
                width: "47%",
                height: "37%",
              }}
            />
            <Logo width={"80%"} height={"20%"} />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.checkboxRow}>
              <Checkbox
                value={agreeTerms}
                onValueChange={setAgreeTerms}
                color={agreeTerms ? '#3b82f6' : '#ffffff'}
              />
              <Text style={styles.checkboxLabel}>
                I have read and agree to <Text style={styles.boldText}>Presenz Terms of Use.</Text>
              </Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                value={ageConfirm}
                onValueChange={setAgeConfirm}
                color={ageConfirm ? '#3b82f6' : '#ffffff'}
              />
              <Text style={styles.checkboxLabel}>
                I confirm that I am at least 16 years old.
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, (!agreeTerms || !ageConfirm) && styles.buttonDisabled]}
              disabled={!agreeTerms || !ageConfirm}
              onPress={() => router.navigate('/Screen/Welcome/Welcome2')}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  background: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 1
  },
  placeholderPin: {
    width: 100,
    height: 130,
    backgroundColor: '#6366f1',
    borderRadius: 50,
    marginBottom: 10
  },
  brandName: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 6
  },
  tagline: {
    color: '#22d3ee',
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: '600'
  },
  formContainer: {
    width: '100%'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 12,
    flexShrink: 1
  },
  boldText: { fontWeight: 'bold' },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },
  buttonDisabled: {
    backgroundColor: '#4b5563'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});