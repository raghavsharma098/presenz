import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'

import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
const Post = () => {

    return (
        <View style={styles.centerIcon}>
            <View style={styles.glowWrapper}>
                <View style={styles.glow} />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => {router.navigate('/Screen/Pulse/ImageSelection')}}
                >
                    <Entypo name="plus" size={40} color="white" style={{ padding: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Post
const styles = StyleSheet.create({
    centerIcon: {
        position: 'absolute',
        bottom: "20%",
        alignSelf: 'center',
        borderRadius: 50,
        padding: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    glowWrapper: {
        width: "95%",
        height:"95%",
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glow: {
        position: 'absolute',
        width: "120%",
        height: "120%",
        borderRadius: 105,
        backgroundColor: 'rgba(6,8,60,0.95)',
        shadowColor: '#000033',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 30,
    },
    button: {
        borderRadius: 70,
        backgroundColor: '#2747D9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        // button slight inner shadow for depth (iOS)
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 10,
    },

})

