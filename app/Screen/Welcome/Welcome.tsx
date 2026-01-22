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
          <View style={styles.logoContainer}>
            <Pin
              style={{
                width: "40%",
                height: "60%",
                marginBottom: "-15%"
              }}
            />
            <Logo width={"80%"} height={"20%"} />
             <Text style={styles.brandName}>BE HERE</Text>
          </View>
          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.checkboxRow}>
              <Checkbox
                value={agreeTerms}
                onValueChange={setAgreeTerms}
                color={agreeTerms ? 'rgba(43, 77, 255, 1)' : '#ffffff'}
              />
              <Text style={styles.checkboxLabel}>
                I have read and agree to <Text style={styles.boldText}>Presenz Terms of Use.</Text>
              </Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                value={ageConfirm}
                onValueChange={setAgeConfirm}
                color={ageConfirm ? 'rgba(43, 77, 255, 1)' : '#ffffff'}
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    paddingHorizontal: "5%"
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "10%",
    marginBottom: "5%"
  },
  brandName: {
    color: 'rgba(129, 222, 255, 1)',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 8,
    marginTop: "-2%"
  },
  formContainer: {
    width: '100%',

  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: "5%",
    paddingHorizontal: "3%"
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 11,
    marginLeft: "5%",
    flexShrink: 1
  },
  boldText: { fontWeight: 'bold' },
  button: {
    backgroundColor: 'rgba(43, 77, 255, 1)',
    paddingVertical: "4%",
    borderRadius: 12,
    alignItems: 'center',
    marginTop: "15%"
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