import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Modal,

} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { usePrivy } from "@privy-io/expo";
import Token from "../Modals/Token";
import HistoryPulse from "../Screen/Pulse/HistoryPulse";export default function SettingsScreen() {
    const { logout, user } = usePrivy();
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <>
            {/* <ImageBackground
                source={{ uri: "" }}
                style={styles.background}
            > */}
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <View style={{ width: 22 }} />
                </View>

                {/* Menu */}
                <View style={styles.menu}>
                    <MenuItem
                        icon={<Ionicons name="location-outline" size={18} color="#fff" />}
                        label="Pulse"
                        onPress={() => router.push('/Screen/Pulse/HistoryPulse')}
                    />

                    <MenuItem
                        icon={<Feather name="briefcase" size={18} color="#fff" />}
                        label="Business Page"
                    />

                    <MenuItem
                        icon={<Ionicons name="wallet-outline" size={18} color="#fff" />}
                        label="Wallet"
                        onPress={() => setModalVisible(true)}
                    />

                    <MenuItem
                        icon={<MaterialIcons name="language" size={18} color="#fff" />}
                        label="Language"
                    />

                    <MenuItem
                        icon={<Feather name="share-2" size={18} color="#fff" />}
                        label="Share App"
                    />

                    <MenuItem
                        icon={<Feather name="file-text" size={18} color="#fff" />}
                        label="Terms and Conditions"
                    />

                    <MenuItem
                        icon={<Feather name="mail" size={18} color="#fff" />}
                        label="Contact"
                    />

                    <MenuItem
                        icon={<Feather name="log-out" size={18} color="#fff" />}
                        label="Logout"
                        danger
                        logoutFn={logout}
                    />

                </View>
                <Modal visible={modalVisible} animationType='slide' transparent={true} onRequestClose={() => setModalVisible(false)}>
                    <Token onClose={() => setModalVisible(false)} />
                </Modal>
              
            </SafeAreaView>

            {/* </ImageBackground> */}
        </>
    );
}

/* ---------------- Components ---------------- */

const MenuItem = ({
    icon,
    label,
    danger,
    logoutFn,
    onPress,

}: {
    icon: React.ReactNode;
    label: string;
    danger?: boolean;
    logoutFn?: () => void;
    onPress?: () => void;

}) => (
    <TouchableOpacity style={styles.item} onPress={() => {
        if (onPress) { onPress(); return; }
        if (label === "Logout" && logoutFn) {
            logoutFn();
            router.navigate('/Screen/Login/Login');
        }
        if (label === "Pulse") {
            router.push('/Screen/Pulse/HistoryPulse');
        }
        if (label === "Language") {
            router.push('/Screen/Login/Language');
        }
        if (label === "Business Page") {
            router.push('/Screen/Business/BusinessMediaPost');
        }
    }}>
        <View style={styles.icon}>{icon}</View>
        <Text style={[styles.label, danger && { color: "#f87171" }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const ActiveItem = ({
    icon,
    label,
}: {
    icon: any;
    label: string;
}) => (
    <TouchableOpacity style={styles.activeItem}>
        <Ionicons name={icon} size={18} color="#fff" />
        <Text style={styles.activeLabel}>{label}</Text>
    </TouchableOpacity>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#000",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },

    menu: {
        marginTop: 10,
    },

    activeItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 16,
    },
    activeLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 12,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },
    icon: {
        width: 30,
        alignItems: "center",
    },
    label: {
        color: "#fff",
        fontSize: 15,
        marginLeft: 10,
    },
});
