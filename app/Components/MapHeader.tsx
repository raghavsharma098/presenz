import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import Token from '../Modals/Token';

const MapHeader = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <View style={{ position: 'absolute', top: "8%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 32, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, marginRight: 50 }}>
                    <Feather name="settings" size={20} color="white" />
                </View>
                <View style={styles.pillContainer}>
                    {/* Circular Image Wrapper */}
                    <View style={styles.imageBorder}>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/TourEiffelLC.JPG/250px-TourEiffelLC.JPG' }}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.cityText}>Paris</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.tokenContainer}>
                    <MaterialIcons name="token" size={24} color="black" style={styles.tokenIcon} />
                    <Text style={styles.tokenText}>500</Text>
                </View>
                </TouchableOpacity>

            </View>
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
        alignItems: 'center',
        backgroundColor: 'rgb(0, 0, 0,0.4)', // Dark slate/charcoal
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    imageBorder: {
        width: '14%',
        height: "50%",
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 255,0.3)',
        overflow: 'hidden',
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cityText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500',
    },
    tokenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'rgb(0, 0, 0,0.6)', // Gold color
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    tokenIcon: {
        marginRight: 8,
    },
    tokenText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },
});