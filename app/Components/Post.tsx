import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Alert, View, TouchableOpacity, StyleSheet } from 'react-native';

const Post = () => {
    // Helper to handle media selection and navigation
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
        <View style={styles.centerIcon}>
            <View style={styles.glowWrapper}>
                <View style={styles.glow} />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleMediaSelect}
                >
                    <Entypo name="plus" size={40} color="white" style={{ padding: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Post
const styles = StyleSheet.create({
    centerIcon: {
        position: 'absolute',
        bottom: "15%",
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
        backgroundColor: 'rgba(6,8,60,0.6)',
        shadowColor: '#000033',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 37,
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

