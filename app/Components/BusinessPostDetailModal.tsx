import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { deleteBusinessPost } from '../api/businessApi';

interface BusinessPostDetailModalProps {
  visible: boolean;
  onClose: () => void;
  post: any; // Your business post object
  currentUserId: string;
  token: string;
  onEdit: (post: any) => void;
  onDeleted?: (postId: string) => void;
}

const BusinessPostDetailModal: React.FC<BusinessPostDetailModalProps> = ({
  visible,
  onClose,
  post,
  currentUserId,
  token,
  onEdit,
  onDeleted,
}) => {
  const isOwner = post?.Privy_Id === currentUserId;

  const handleDelete = async () => {
    try {
      await deleteBusinessPost(post._id, token);
      Alert.alert('Success', 'Post expired!');
      onClose();
      if (onDeleted) onDeleted(post._id);
    } catch (e) {
      Alert.alert('Error', 'Failed to expire post.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={{ uri: post.url }} style={styles.image} />
          <Text style={styles.title}>{post.name}</Text>
          <Text style={styles.desc}>{post.description}</Text>
          <Text style={styles.category}>{post.category}</Text>
          {/* Owner menu */}
          {isOwner && (
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => onEdit(post)}>
                <Text style={styles.editIcon}>✏️</Text>
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  Alert.alert(
                    'Expire Post',
                    'Are you sure you want to expire this post?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Expire', style: 'destructive', onPress: handleDelete },
                    ]
                  )
                }
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
                <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={{ fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: '#fff', borderRadius: 20, padding: 20, width: 320, alignItems: 'center' },
  image: { width: 200, height: 200, borderRadius: 16, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  desc: { fontSize: 16, marginBottom: 4 },
  category: { fontSize: 14, color: '#888', marginBottom: 12 },
  menu: { width: '100%', backgroundColor: '#f7f7f7', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'center' },
  menuText: { fontSize: 18, marginLeft: 8 },
  editIcon: { fontSize: 22, color: '#222' },
  deleteIcon: { fontSize: 22, color: 'red' },
  divider: { height: 1, backgroundColor: '#ddd', marginHorizontal: 16 },
  closeBtn: { marginTop: 8, padding: 8 },
});

export default BusinessPostDetailModal;
