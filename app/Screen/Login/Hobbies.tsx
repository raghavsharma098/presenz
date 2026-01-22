import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const HOBBIES = [
  "Art", "Music", "Nightlife", 
  "Cinema & Media", "Theatre", 
  "Wellness", "Festivals & Events", 
  "Outdoor/Nature", "Sports/Fitness", 
  "Food/Drinks", "Street / Shopping", 
  "Urban Moment"
];

export default function HobbiesScreen() {
  const [selectedHobbies, setSelectedHobbies] = useState(["Nightlife", "Outdoor/Nature"]);

  const toggleHobby = (hobby:string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  return (
    // <ImageBackground 
    //   source={{ uri: 'https://images.unsplash.com/photo-1506318137071-a8e063b49ec2?auto=format&fit=crop&q=80' }} 
    //   style={styles.background}
    // >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hobbies</Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* Chips Container */}
        <ScrollView contentContainerStyle={styles.chipContainer}>
          {HOBBIES.map((hobby) => {
            const isSelected = selectedHobbies.includes(hobby);
            return (
              <TouchableOpacity
                key={hobby}
                onPress={() => toggleHobby(hobby)}
                style={[
                  styles.chip,
                  isSelected ? styles.chipSelected : styles.chipUnselected
                ]}
              >
                <Text style={styles.chipText}>{hobby}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity  onPress={() => router.navigate('/Screen/Login/NightLife')}>
            <LinearGradient
              colors={['#4D66FF', '#2948FF']}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "#000", 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    margin: 6,
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: 'rgba(10, 15, 60, 0.7)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  chipSelected: {
    backgroundColor: '#3DA9FC', // Matching the sky blue in your image
    borderColor: '#3DA9FC',
  },
  chipText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 30,
    paddingBottom: 50,
  },
  nextButton: {
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});