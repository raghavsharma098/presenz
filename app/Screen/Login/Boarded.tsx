import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel'; // Carousel library
import { BlurView } from 'expo-blur'; // Frosted glass effect
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CAROUSEL_DATA = [
  {
    title: "Notice\nWhat’s real.",
    description: "Live updates, nearby events, and moments that matter all in one place.",
    buttonText: "Start Exploring",
  },
  {
    title: "Different Vibes\nDifferent Places",
    description: "Find the activities that match your vibe, happening right now around you.",
    buttonText: "Explore Activities",
  },
  {
    title: "No Profiles.\nNo Followers.\nJust Presenz.",
    description: "Live updates, nearby events, and moments that matter all in one place.",
    buttonText: "Enter Presenz",
  },
];
interface OnboardingItem {
  title: string;
  description: string;
  buttonText: string;
}
export default function OnboardingCarousel() {
  const [index, setIndex] = useState(0);
  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slideContainer}>
      {/* Dynamic Main Title */}
      <View style={styles.textOverlay}>
        <Text style={styles.mainTitle}>{item.title}</Text>
      </View>

      {/* Bottom Frosted Glass Box */}
      <BlurView intensity={20} tint="dark" style={styles.blurBox}>
        <Text style={styles.descriptionText}>{item.description}</Text>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {CAROUSEL_DATA.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={() => { router.navigate('./Location') }}>
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <ImageBackground 
        source={require('./assets/city-bg.png')} // Replace with your city background
        style={styles.background}
      > */}
      <SafeAreaView style={{ flex: 1 }}>
         <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        <Carousel
          loop={false}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          autoPlay={false}
          data={CAROUSEL_DATA}
          onSnapToItem={(idx) => setIndex(idx)}
          renderItem={renderItem}
        />
      </SafeAreaView>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: "5%",
    left: "5%",
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    padding: "1%",
    borderRadius: 20,
  },
  slideContainer: { flex: 1, justifyContent: 'space-between', paddingBottom: '20%' },
  textOverlay: { paddingHorizontal: 30, paddingTop: 60 },
  mainTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    fontStyle: 'italic',
    lineHeight: 48
  },
  blurBox: {
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  descriptionText: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20
  },
  paginationContainer: { flexDirection: 'row', marginBottom: 25 },
  dot: { height: 4, borderRadius: 2, marginHorizontal: 3 },
  activeDot: { width: 24, backgroundColor: '#3b82f6' },
  inactiveDot: { width: 12, backgroundColor: 'rgba(255,255,255,0.3)' },
  actionButton: {
    backgroundColor: '#2563eb',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});