import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const STAGES = [
  { title: 'Uploading', sub: '' },
  { title: 'AI Safety Check', sub: 'Reviewing Content' },
  { title: 'Detecting Landmark', sub: '' },
  { title: 'Auto-Categorizing', sub: 'Analyzing content and audio..' },
];

export default function LoadingScreen() {
  const [currentStage, setCurrentStage] = useState(0);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Rotation Logic
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  // Stage Cycling Logic (for preview)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <LinearGradient
        colors={['#0A0B1A', '#1A1B3D', '#3B2F7E', '#0A0B1A']}
        style={styles.backgroundGradient}
      >
        <View style={styles.card}>
          <View style={styles.spinnerWrapper}>
            {/* The Background Ring (faint) */}
            
            <View style={styles.backgroundRing} />
            
            {/* The Animated Top Ring (Solid) */}
            <Animated.View 
              style={[
                styles.spinnerBase, 
                { transform: [{ rotate: spin }] }
              ]} 
            />
          </View>
            <Text onPress={()=>{router.navigate('/Screen/Pulse/Succes')}}>s</Text>
            <Text onPress={()=>{router.navigate('/Screen/Pulse/Failure')}}>f</Text>

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{STAGES[currentStage].title}</Text>
            {STAGES[currentStage].sub !== '' && (
              <Text style={styles.subText}>{STAGES[currentStage].sub}</Text>
            )}
          </View>
        </View>
      </LinearGradient>
    
    </SafeAreaView>
  );
}

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
    width: '88%',
    height: '78%',
    backgroundColor: 'rgba(35, 100, 140, 0.85)',
    borderRadius: 45,
    borderWidth: 1.5,
    borderColor: '#03207C',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  spinnerWrapper: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  backgroundRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  spinnerBase: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#4EBDEF', // The bright blue loading segment
    borderRightColor: '#4EBDEF', // Extends the segment slightly
  },
  textContainer: {
    alignItems: 'center',
    minHeight: 80,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subText: {
    color: '#9CA3AF',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.8,
  },
});