import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";

interface DeletePulseConfirmProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeletePulseConfirm: React.FC<DeletePulseConfirmProps> = ({ onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete();
    router.navigate('/Screen/Pulse/deletePulse');
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Are you sure you want to delete pulse ?</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Yes,Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',   
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#10153A',
    borderRadius: 18,
    padding: 30,
    width: 350,
    height:200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteBtn: {
    backgroundColor: '#316CFF',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#316CFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeletePulseConfirm;
