import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { WebView as WebViewType } from 'react-native-webview';
import { router } from 'expo-router';
// import html from './index.html';

type CesiumMapProps = {
  userId?: string;
  onMessage?: (event: any) => void;
};

const CesiumMap = React.forwardRef(function CesiumMap({ userId = '', onMessage }: CesiumMapProps, ref) {
  const [location, setLocation] = useState<LocationObject | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }
      // Initial fetch
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      // Set initial range to 20km on load
      if (webViewRef.current) {
        const js = `window.postMessage(JSON.stringify({ type: 'RangeSelected', meters: 20000 }), '*');`;
        webViewRef.current.injectJavaScript(js);
      }
      // Set interval for auto-refresh every 2 minutes
      intervalId = setInterval(async () => {
        try {
          let updatedLoc = await Location.getCurrentPositionAsync({});
          setLocation(updatedLoc);
        } catch (err) {
          console.warn('Failed to refresh location:', err);
        }
      }, 2 * 60 * 1000); // 2 minutes
    })();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Send location to WebView when available
  const onWebViewLoad = (webViewRef: WebViewType | null) => {
    if (location && webViewRef) {
      const js = `window.dispatchEvent(new CustomEvent('RNLocation', { detail: { latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude} } }));`;
      webViewRef.injectJavaScript(js);
    }
  };

  // Keep a ref to WebView to inject JS
  const webViewRef = React.useRef<WebViewType | null>(null);

  // Expose method to parent to inject range instantly
  React.useImperativeHandle(ref, () => ({
    injectRangeToWebView: (meters: number) => {
      if (webViewRef.current) {
        const js = `window.postMessage(JSON.stringify({ type: 'RangeSelected', meters: ${meters} }), '*');`;
        webViewRef.current.injectJavaScript(js);
      }
    }
  }), []);

  useEffect(() => {
    if (location && webViewRef.current) {
      const js = `window.dispatchEvent(new CustomEvent('RNLocation', { detail: { latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude} } }));`;
      webViewRef.current.injectJavaScript(js);
    }
  }, [location]);

  // Toggle this to true to use deployed website instead of local file
  const USE_DEPLOYED_SITE = false;
  // Replace with your deployed site URL
  const DEPLOYED_SITE_URL = './index.html';

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={
          USE_DEPLOYED_SITE
            ? { uri: DEPLOYED_SITE_URL }
            : require('./index.html')
        }
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={() => onWebViewLoad(webViewRef.current)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={onMessage}
        injectedJavaScript={`
          window.currentUserId = '${userId.replace(/'/g, "\\'")}';
          true;
        `}
      />
    </View>
  );
});

export default CesiumMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
