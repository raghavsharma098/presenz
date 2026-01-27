import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,

  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '../../store/hooks';

const HOBBY_KEYS = [
  'hobbyArt', 'hobbyMusic', 'hobbyNightlife',
  'hobbyCinema', 'hobbyTheatre',
  'hobbyWellness', 'hobbyFestivals',
  'hobbyOutdoor', 'hobbySports',
  'hobbyFood', 'hobbyStreet',
  'hobbyUrban'
];

export default function HobbiesScreen() {
  const translations = useAppSelector((state: any) => state.language.translations);
  const [selectedHobbies, setSelectedHobbies] = useState([
    translations.hobbyNightlife,
    translations.hobbyOutdoor
  ]);

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background/welcome.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{translations.hobbies}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Chips Container */}
        <ScrollView contentContainerStyle={styles.chipContainer}>
          {HOBBY_KEYS.map((key) => {
            const hobby = translations[key];
            const isSelected = selectedHobbies.includes(hobby);
            return (
              <TouchableOpacity
                key={key}
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
          <TouchableOpacity onPress={() => router.navigate('/Screen/Login/NightLife')}>
            <LinearGradient
              colors={['#4D66FF', '#2948FF']}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>{translations.next}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0,0.6)',

    padding: '15%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: "35%",

  },
  backButton: {
    position: 'absolute',
    top: "5%",
    left: "5%",
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    padding: "1%",
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

  },
  nextButton: {
    height: '40%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: 'rgba(43, 77, 255, 1)',
    // position: 'absolute',
    // bottom: '90%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});