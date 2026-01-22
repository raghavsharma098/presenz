import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const RangeSelector = () => {
    const [selectedRangeId, setSelectedRangeId] = useState<string | null>(null)

    const ranges = [
        { 'id': '1', 'image': 'https://i.pravatar.cc/100', 'distance': '100m' },
        { 'id': '2', 'image': 'https://i.pravatar.cc/100', 'distance': '300m' },
        { 'id': '3', 'image': 'https://i.pravatar.cc/100', 'distance': '900m' },
        { 'id': '4', 'image': 'https://i.pravatar.cc/100', 'distance': '5km' },
        { 'id': '5', 'image': 'https://i.pravatar.cc/100', 'distance': '20km' },
    ]
    return (
        <View style={styles.RangeIcon}>
            {ranges.map((range) => (
                <TouchableOpacity
                    key={range.id}
                    style={styles.rangeContainer}
                    onPress={() => {
                        setSelectedRangeId(range.id)
                        console.log(`Range ${range.id} selected: ${range.distance}`)
                    }}
                >
                    <View style={[
                        styles.circle,
                        selectedRangeId === range.id && styles.circleSelected
                    ]} />
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
        bottom: "7%",
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 50,
        padding: 15,
        gap: 8,
    },
    rangeContainer: {
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25, // Makes it a circle
        backgroundColor: 'blue',
    },
    circleSelected: {
        backgroundColor: 'rgba(0, 100, 255, 1)',
        borderWidth: 3,
        borderColor: '#fff',
    },

})