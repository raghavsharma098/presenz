// Extend Window interface for ReactNativeWebView
declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
    }
}
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

// Add prop for callback to send range instantly to parent (CesiumMap)
type RangeSelectorProps = {
    onRangeChange?: (meters: number) => void;
    onPostsFetched?: (posts: any[]) => void; // Callback to send posts to parent
};

const RangeSelector = ({ onRangeChange, onPostsFetched }: RangeSelectorProps) => {
    const [selectedRangeId, setSelectedRangeId] = useState<string | null>(null)

    // Map range id to meters
    const rangeMap: { [key: string]: number } = {
        '1': 100,
        '2': 300,
        '3': 900,
        '4': 5000,
        '5': 20000,
    };

    // Use local asset images for each range
    const ranges = [
        { id: '1', image: require('../../assets/Range/100m.png'), distance: '100m' },
        { id: '2', image: require('../../assets/Range/300m.png'), distance: '300m' },
        { id: '3', image: require('../../assets/Range/900m.png'), distance: '900m' },
        { id: '4', image: require('../../assets/Range/5km.png'), distance: '5km' },
        { id: '5', image: require('../../assets/Range/20km.png'), distance: '20km' },
    ];

    // Send event to WebView (window) for range selection
    // Use postMessage for React Native WebView communication
    const sendRangeToWebView = (meters: number) => {
        // Ensure the range selection is sent to the WebView (index.html)
        // This triggers the 'message' event listener in index.html (Cesium map)
        if (typeof window !== 'undefined' && window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'RangeSelected', meters }));
        } else if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
            // fallback for web debugging (browser)
            window.dispatchEvent(new CustomEvent('RangeSelected', { detail: { meters } }));
        }
    };

    const fetchNearbyPosts = async (meters: number) => {
        // Try to get user location from window or global state
        let latitude: number | null = null;
        let longitude: number | null = null;

        // Try to get location from window (if injected by parent)
        if (window && (window as any).userLocation) {
            latitude = (window as any).userLocation.latitude;
            longitude = (window as any).userLocation.longitude;
        }

        // If not available, ask for location
        if (latitude === null || longitude === null) {
            if (navigator.geolocation) {
                await new Promise<void>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            latitude = position.coords.latitude;
                            longitude = position.coords.longitude;
                            // Optionally, store in window for future use
                            (window as any).userLocation = { latitude, longitude };
                            resolve();
                        },
                        (error) => {
                            alert('Location permission is required to fetch nearby posts.');
                            reject(error);
                        }
                    );
                });
            } else {
                alert('Geolocation is not supported by this device.');
                return;
            }
        }

        // Map meters to API path
        let distancePath = '20km';
        if (meters === 100) distancePath = '100m';
        else if (meters === 300) distancePath = '300m';
        else if (meters === 900) distancePath = '900m';
        else if (meters === 5000) distancePath = '5km';

        let apiUrl = `https://localhost:300/api/posts/nearby?lat=${latitude}&long=${longitude}`;
        if (distancePath !== '20km') {
            apiUrl = `https://localhost:300/api/posts/nearby/${distancePath}?lat=${latitude}&long=${longitude}`;
        }

        try {
            const response = await fetch(apiUrl);
            const posts = await response.json();
            // Filter only business posts and regular posts (assuming type field)
            const filteredPosts = Array.isArray(posts)
                ? posts.filter(
                    (post) => post.type === 'business' || post.type === 'post' || post.isBusiness || post.isBusinessPost
                )
                : posts;
            // Send filtered posts to parent if callback exists
            if (onPostsFetched) {
                onPostsFetched(filteredPosts);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    return (
        <View style={styles.RangeIcon}>
            {ranges.map((range) => (
                <TouchableOpacity
                    key={range.id}
                    style={styles.rangeContainer}
                    onPress={async () => {
                        setSelectedRangeId(range.id);
                        console.log(`Range ${range.id} selected: ${range.distance}`);
                        sendRangeToWebView(rangeMap[range.id]);
                        if (onRangeChange) onRangeChange(rangeMap[range.id]);
                        await fetchNearbyPosts(rangeMap[range.id]);
                    }}
                >
                    <View style={styles.circle}>
                        <Image
                            source={range.image}
                            style={styles.rangeImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{
                        marginTop: 5,
                        textAlign: 'center',
                        color: 'white'
                    }}>{range.distance}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default RangeSelector

const styles = StyleSheet.create({
    RangeIcon: {
        position: 'absolute',
        bottom: '3%',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: '3%',
        gap: '3%',
    },
    rangeContainer: {
        alignItems: 'center',
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30, // Makes it a circle
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    rangeImage: {
        width: 60,
        height: 60,
    
    },
});