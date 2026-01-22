import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';
import CesiumMap from './CesiumMap';
import MapHeader from '@/app/Components/MapHeader';
import MapTopBar from '@/app/Components/MapTopBar';
import Post from '@/app/Components/Post';
import RangeSelector from '@/app/Components/RangeSelector';

export default function Map() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <CesiumMap />
        <MapHeader />
        <MapTopBar />
        <Post />
        <RangeSelector />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
