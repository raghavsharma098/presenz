import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

const OPTIONS = [
  "Violence",
  "Nudity",
  "Misleading",
  "Illegal activities",
];


import { Alert } from "react-native";

type ReportContentModalProps = {
  visible: boolean;
  onClose: () => void;
  postId: string;
  postType: string;
};

const ReportContentModal: React.FC<ReportContentModalProps> = ({ visible, onClose, postId, postType }) => {
  const [selected, setSelected] = useState("Violence");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Adjust the URL and payload as per your backend API
      const response = await fetch(
        postType === "business"
          ? `https://localhost:300/api/business/post/${postId}/report`
          : `https://localhost:300/api/posts/${postId}/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: selected }),
        }
      );
      if (response.ok) {
        Alert.alert("Reported", "Thank you for your feedback.");
        onClose();
      } else {
        let errorMsg = `Failed to report. Status: ${response.status}`;
        try {
          const data = await response.json();
          if (data && data.error) errorMsg += `\n${data.error}`;
        } catch (e) {}
        Alert.alert("Error", errorMsg);
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Report Content</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Options */}
          {OPTIONS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.option,
                selected === item && styles.optionSelected,
              ]}
              onPress={() => setSelected(item)}
              disabled={loading}
            >
              <Text
                style={[
                  styles.optionText,
                  selected === item && styles.optionTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitText}>{loading ? "Submitting..." : "Submit"}</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity onPress={onClose} disabled={loading}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ReportContentModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#0B0F1A",
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  close: {
    color: "#fff",
    fontSize: 18,
  },
  option: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: "#1B1F6B",
  },
  optionText: {
    color: "#E5E7EB",
    fontSize: 15,
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#3B5BFF",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancel: {
    color: "#C7C9D1",
    textAlign: "center",
    marginTop: 14,
  },
});
