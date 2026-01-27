import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import RangeSelector from '../Modals/RangeSelector';
import TranslatableText from './TranslatableText';

export default function MapTopBar() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        {/* Search Icon */}
        <Ionicons name="search-outline" size={20} color="white" />

        {/* Radius Label */}
        <View style={styles.radiusContainer}>
          <Text style={styles.text}>Radius : 20 km</Text>
        </View>

        {/* Unlock Selector */}
        <TouchableOpacity style={styles.selector} onPress={() => setModalVisible(true)}>
          <Text style={styles.text}>Unlock</Text>
          <Ionicons name="chevron-down" size={20} color="white" style={styles.chevron} />
        </TouchableOpacity>
      </View>
      {modalVisible && <RangeSelector onClose={() => setModalVisible(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 0, 96, 0.8)', 
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#1E40AF', 
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: "10%", 
    width: '70%',
    height: "5%",
    justifyContent: 'center',
    alignSelf: 'center',
  },
  radiusContainer: {
    flex: 1,
    marginLeft: 15,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14, // Large text as seen in the screenshot
    fontWeight: '400',
  },
  chevron: {
    marginLeft: 10,
  },
});