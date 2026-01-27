import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, useWindowDimensions } from 'react-native'
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import Token from '../Modals/Token';
import axios from 'axios';
import { usePrivyUser } from '../Screen/Login/Otp';
import TokenIcon from '../../assets/logo/token.svg';
const MapHeader = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [balance, setBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { width } = useWindowDimensions();
    // Get Privy_Id from logged-in user
    const user = usePrivyUser();
    const privyId = user?.id || '';

    // City state
    const [city, setCity] = useState<string>('');
    const [cityLoading, setCityLoading] = useState(false);
    const [cityImage, setCityImage] = useState<string>('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG');

    useEffect(() => {
        const getCity = async () => {
            setCityLoading(true);
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setCity('');
                    setCityImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG');
                    setCityLoading(false);
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({});
                const geocode = await Location.reverseGeocodeAsync({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
                if (geocode && geocode.length > 0) {
                    const cityName = geocode[0].city || '';
                    setCity(cityName);
                    // Fetch city image from Unsplash
                    if (cityName) {
                        try {
                            const unsplashRes = await fetch(`https://source.unsplash.com/80x80/?city,${encodeURIComponent(cityName)}`);
                            // Unsplash always returns an image, even if not found, so just use the URL
                            setCityImage(unsplashRes.url);
                        } catch (imgErr) {
                            setCityImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG');
                        }
                    } else {
                        setCityImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG');
                    }
                } else {
                    setCity('');
                    setCityImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG');
                }
            } catch (e) {
                setCity('');
                setCityImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG');
            } finally {
                setCityLoading(false);
            }
        };
        getCity();
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            setLoading(true);
            try {
                                const res = await axios.get(`https://localhost:300/api/${privyId}`,
                                    {
                                        headers: {
                                            'ngrok-skip-browser-warning': 'true',
                                        },
                                    });
                                setBalance(res.data.balance);
            } catch (err) {
                setBalance(null);
                console.error('Failed to fetch balance:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, [privyId]);

    return (
        <>
            <View style={{ position: 'absolute', top: "5%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                <TouchableOpacity onPress={() => router.navigate('/Components/Setting')}>

                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 32, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, marginRight: 50 }}>
                    <Feather name="settings" size={20} color="white" />
                </View>
                </TouchableOpacity>
                <View style={[styles.tokenContainer, {
                    minWidth: width * 0.24,
                    maxWidth: width * 0.4,
                },
                ]}>
                    {/* Circular Image Wrapper */}
                    <View style={styles.imageBorder}>
                        <Image
                            source={{ uri: cityImage }}
                            style={styles.image}
                        />
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={styles.cityText} numberOfLines={1}>
                            {cityLoading ? '...' : city || '...'}
                        </Text>
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={[styles.tokenContainer, {
                        minWidth: width * 0.09, // 40% of screen
                        maxWidth: width * 0.25, // 80% of screen
                    },
                    ]}>
                          <TokenIcon style={styles.tokenIcon} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}

                            contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', padding: 0, margin: 0 }}
                        >
                            <Text style={[styles.tokenText, { margin: 0, padding: 0 }]} numberOfLines={1}>
                                {loading ? '...' : balance !== null ? `${balance}` : '...'}
                            </Text>
                        </ScrollView>
                    </View>
                </TouchableOpacity >

            </View >
            <Modal visible={modalVisible} animationType='slide' transparent={true} onRequestClose={() => setModalVisible(false)}>
                <Token onClose={() => setModalVisible(false)} />
            </Modal>
        </>
    )
}

export default MapHeader

const styles = StyleSheet.create({
    pillContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgb(0, 0, 0,0.4)', // Dark slate/charcoal
        height: 40,                 // fixed height
        paddingHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    imageBorder: {
        width: 20,
        height: 20,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'yellow',
        overflow: 'hidden',
        marginRight: 10,
    },
    image: {
        // width: '200%',
        // height: '100%',
    },
    cityText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },
    tokenContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgb(0, 0, 0,0.6)',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    tokenIcon: {
        marginRight: 5,
        marginTop: 2,
    },
    tokenText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',

    },
});