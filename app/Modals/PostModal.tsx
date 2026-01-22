// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
// import * as ImagePicker from 'expo-image-picker';
// import axios, { AxiosError } from 'axios';
// import { useState } from 'react';

// type Props = {
//     onClose: () => void
// }
// const PostModal = ({ onClose }: Props) => {
//     const [selectedMedia, setSelectedMedia] = useState<ImagePicker.ImagePickerAsset | null>(null);

//     const requestPermissions = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Permission needed', 'Camera roll permissions are required to select media');
//             return false;
//         }
//         return true;
//     };

//     const pickImage = async () => {
//         const hasPermission = await requestPermissions();
//         if (!hasPermission) return;

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled && result.assets && result.assets.length > 0) {
//             setSelectedMedia(result.assets[0]);
//             await uploadMedia(result.assets[0]);
//         }
//     };

//     const pickVideo = async () => {
//         const hasPermission = await requestPermissions();
//         if (!hasPermission) return;

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled && result.assets && result.assets.length > 0) {
//             setSelectedMedia(result.assets[0]);
//             await uploadMedia(result.assets[0]);
//         }
//     };

//     const uploadMedia = async (media: ImagePicker.ImagePickerAsset) => {
//         try {
//             const formData = new FormData();
//             formData.append('file', {
//                 uri: media.uri,
//                 type: media.type === 'image' ? 'image/jpeg' : 'video/mp4',
//                 name: media.type === 'image' ? 'photo.jpg' : 'video.mp4',
//             } as any);

//             const response = await axios.post('http://10.0.2.2:3000/api/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             Alert.alert('Success', 'Media uploaded successfully!');
//             console.log('Upload response:', response.data);
//             onClose(); // Close modal after successful upload
//         } catch (error) {
//             const err = error as { response?: { data?: { message?: string } } };

//             console.error("Upload error:", err);

//             const message = err.response?.data?.message || "Failed to upload media";
//             Alert.alert("Error", message);
//         }

//     };

//     return (
//         <View style={styles.modalContent}>

//             {/* <TouchableOpacity onPress={pickImage}> */}
//                 <TouchableOpacity onPress={() => {}}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{
//                         backgroundColor: 'red', borderRadius: 30, padding: 40, marginRight: 10,
//                     }} />
//                     <View >
//                         <Text style={styles.title}>Photo</Text>
//                         <Text style={styles.title}>Share a moment</Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>

//             {/* <TouchableOpacity onPress={pickVideo}> */}
//                 <TouchableOpacity onPress={() => {}}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{
//                         backgroundColor: 'red', borderRadius: 30, padding: 40, marginRight: 10,
//                     }} />
//                     <View >
//                         <Text style={styles.title}>Video</Text>
//                         <Text style={styles.title}>Share a moment</Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>



//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     modalContent: {
//         backgroundColor: 'black',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         alignItems: 'center',
//         gap: 15,
//         width: '100%',
//         height: "30%",
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         color: 'white',
//     },
//     closeButton: {
//         alignSelf: 'flex-end',
//         padding: 10,
//         borderRadius: 5,
//     },
//     closeText: {
//         color: 'white',
//         fontSize: 16,
//     },
// })

// export default PostModal