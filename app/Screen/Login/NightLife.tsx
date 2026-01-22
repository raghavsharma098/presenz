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

// Define the shape of our props/data for type safety
const NIGHTLIFE_OPTIONS: string[] = [
  "Techno / House Night", "Afrobeats", 
  "Rooftop Party", "Hip-Hop Night", 
  "Afterparty", "Underground Club", 
  "Karaoke Night", "Bar / Lounge", 
  "Cocktail Spot", "Night Club", 
  "Late Night Street Scene"
];

export default function NightlifeScreen() {
  // Explicitly type the state as an array of strings
  const [selectedItems, setSelectedItems] = useState<string[]>(["Afrobeats", "Karaoke Night"]);

  // Explicitly type the 'item' parameter as a string
  const toggleSelection = (item: string): void => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
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
          <Text style={styles.headerTitle}>Nightlife</Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* Options Grid */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.chipContainer}>
            {NIGHTLIFE_OPTIONS.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => toggleSelection(item)}
                  style={[
                    styles.chip,
                    isSelected ? styles.chipSelected : styles.chipUnselected
                  ]}
                >
                  <Text style={styles.chipText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Action Button */}
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>{router.navigate('/Screen/Map/Map')}}>
            <LinearGradient
              colors={['#4D66FF', '#2948FF']}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Done</Text>
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
    backgroundColor: 'rgba(0,0,0,1)', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 25,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 6,
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: 'rgba(5, 10, 40, 0.8)',
    borderColor: 'rgba(255,255,255,0.25)',
  },
  chipSelected: {
    backgroundColor: '#3DA9FC',
    borderColor: '#3DA9FC',
  },
  chipText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  doneButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});