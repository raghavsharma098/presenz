import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';

const deletePulse = () => {

    const handleMediaSelect = async () => {
        if (Platform.OS === 'web') {
            const choice = window.prompt('Type: photo, video, or gallery');
            if (choice === 'photo') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [3, 4],
                    quality: 0.9,
                });
                const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
                if (!canceled) {
                    const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                    router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'image' } });
                }
            } else if (choice === 'video') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                    allowsEditing: true,
                    aspect: [3, 4],
                    quality: 0.9,
                    videoMaxDuration: 20,
                });
                const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
                if (!canceled) {
                    const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                    router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'video' } });
                }
            } else if (choice === 'gallery') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [3, 4],
                    quality: 0.9,
                    videoMaxDuration: 20,
                });
                const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
                if (!canceled) {
                    const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                    const type = (result as any).assets?.[0]?.type ?? (result as any).type;
                    router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: type === 'video' ? 'video' : 'image' } });
                }
            }
        } else {
            Alert.alert(
                'Select Media',
                'Choose an option',
                [
                    {
                        text: 'Take Photo',
                        onPress: async () => {
                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [3, 4],
                                quality: 0.9,
                            });
                            const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
                            if (!canceled) {
                                const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                                router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'image' } });
                            }
                        },
                    },
                    {
                        text: 'Take Video',
                        onPress: async () => {
                            const result = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                                allowsEditing: true,
                                aspect: [3, 4],
                                quality: 0.9,
                                videoMaxDuration: 20,
                            });
                            const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
                            if (!canceled) {
                                const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                                router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: 'video' } });
                            }
                        },
                    },
                    {
                        text: 'Choose from Gallery',
                        onPress: async () => {
                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.All,
                                allowsEditing: true,
                                aspect: [3, 4],
                                quality: 0.9,
                                videoMaxDuration: 20,
                            });
                            const canceled = typeof (result as any).canceled === 'boolean' ? (result as any).canceled : (result as any).cancelled;
                            if (!canceled) {
                                const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
                                const type = (result as any).assets?.[0]?.type ?? (result as any).type;
                                router.navigate({ pathname: '/Screen/Pulse/ImageSelection', params: { mediaUri: uri, mediaType: type === 'video' ? 'video' : 'image' } });
                            }
                        },
                    },
                    { text: 'Cancel', style: 'cancel' },
                ]
            );
        }
    };


    return (
       <LinearGradient
             colors={["#020024", "#020024", "#020024"]}
             style={{ flex: 1, }}
           >
             <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(0, 0, 0,0.95)' }}>
       
               <View style={styles.topBar}>
                 <TouchableOpacity onPress={router.back}>
                   <Ionicons name="arrow-back" size={20} color="#fff" style={{ backgroundColor: 'rgba(30, 41, 59, 1)', borderRadius: 20, padding: 4 }} />
                 </TouchableOpacity>
                 <Text style={styles.pulseText}>Pulse</Text>
               </View>
               <View style={styles.container}>
       
                 {/* Header with close button */}
                 <View style={styles.deletedContainer}>
              <View style={styles.deletedIconWrapper}>
                <View style={styles.deletedIconGlow} />
                <Feather name="trash-2" size={48} color="#60a5fa" style={styles.deletedIcon} />
              </View>
              <Text style={styles.deletedTitle}>Pulse Deleted</Text>
              <Text style={styles.deletedSubtitle}>Your pulse has been permanently deleted.</Text>
              <TouchableOpacity style={styles.createPulseBtn} onPress={handleMediaSelect}>
                <Text style={styles.createPulseBtnText}>Create New Pulse</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backHomeBtn} onPress={()=>router.navigate('/Screen/Map/Map')}>
                <Text style={styles.backHomeBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </View>             
                              </View>
             </SafeAreaView>
       
           </LinearGradient>


    )
}

export default deletePulse

const styles = StyleSheet.create({
    deletedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    deletedIconWrapper: {
        marginBottom: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deletedIconGlow: {
        position: 'absolute',
        top: -16,
        left: -16,
        right: -16,
        bottom: -16,
        borderRadius: 48,
        backgroundColor: 'rgba(96,165,250,0.2)',
        zIndex: 0,
    },
    deletedIcon: {
        zIndex: 1,
    },
    deletedTitle: {
        color: '#60a5fa',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    deletedSubtitle: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 32,
        textAlign: 'center',
    },
    createPulseBtn: {
        backgroundColor: '#2563eb',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 36,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#60a5fa',
        shadowColor: '#60a5fa',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    createPulseBtnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
    backHomeBtn: {
        marginTop: 0,
    },
    backHomeBtnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pulseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#05052a",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
  },
});