import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,

    TextInput,
    FlatList,
    Image
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
// Define the shape of our language data
interface Language {
    id: string;
    name: string;
    flag: string; // URL or local asset
}

const LANGUAGES: Language[] = [
    { id: '1', name: 'Chinese', flag: 'https://flagcdn.com/w160/cn.png' },
    { id: '2', name: 'Spanish', flag: 'https://flagcdn.com/w160/es.png' },
    { id: '3', name: 'French', flag: 'https://flagcdn.com/w160/fr.png' },
    { id: '4', name: 'German', flag: 'https://flagcdn.com/w160/de.png' },
    { id: '5', name: 'Japanese', flag: 'https://flagcdn.com/w160/jp.png' },
    { id: '6', name: 'Korean', flag: 'https://flagcdn.com/w160/kr.png' },
];

export default function LanguageSelectionScreen({ navigation }: any) {
    const [selectedId, setSelectedId] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');

    const selectedLanguage = LANGUAGES.find(lang => lang.id === selectedId);

    const renderLanguageItem = ({ item }: { item: Language }) => (
        <TouchableOpacity
            style={[
                styles.languageItem,
                selectedId === item.id && styles.selectedRow
            ]}
            onPress={() => setSelectedId(item.id)}
        >
            <Image source={{ uri: item.flag }} style={styles.flagIcon} />
            <Text style={styles.languageText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        // <ImageBackground 
        //   source={require('./assets/space-bg.png')} 
        //   style={styles.container}
        // >
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.headerTitle}>Choose the language</Text>
                <Text style={styles.headerSubtitle}>
                    Select your preferred language below. This helps us serve you better.
                </Text>

                {/* Current Selection Display */}
                <Text style={styles.sectionLabel}>You Selected</Text>
                <View style={styles.selectedBox}>
                    <Image source={{ uri: selectedLanguage?.flag }} style={styles.flagIcon} />
                    <Text style={styles.languageText}>{selectedLanguage?.name}</Text>
                </View>

                {/* All Languages List */}
                <Text style={styles.sectionLabel}>All Languages</Text>
                <View style={styles.listContainer}>
                    {/* Search Bar */}
                    <View style={styles.searchBar}>

                        <FontAwesome name="search" size={24} color="white" />
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="#9ca3af"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <FlatList
                        data={LANGUAGES.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                        renderItem={renderLanguageItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="white"
                    />
                </View>

                <TouchableOpacity style={styles.continueButton} onPress={() => { router.navigate('/Screen/Login/Hobbies') }}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        // </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#000'
    },
    backButton: {
        position: 'absolute',
        top: "5%",
        left: "5%",
        backgroundColor: 'rgba(96, 165, 250, 0.3)',
        padding: "1%",
        borderRadius: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: '15%'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22, fontWeight: 'bold'
    },
    headerSubtitle: {
        color: '#9ca3af',
        fontSize: 13, marginTop: 8,
        lineHeight: 18
    },
    sectionLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12
    },

    // Selected Language Box
    selectedBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#3b82f6',
    },

    // List Container
    listContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        marginBottom: 20
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    searchInput: {
        color: '#fff',
        flex: 1,
        marginLeft: 10,
        fontSize: 14
    },

    // List Items
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    selectedRow: {
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
    },
    flagIcon: {
        width: 30, height: 30,
        borderRadius: 15, marginRight: 15
    },
    languageText: {
        color: '#fff',
        fontSize: 15
    },

    // Footer Button
    continueButton: {
        backgroundColor: '#2563eb',
        height: 55,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%'
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});


