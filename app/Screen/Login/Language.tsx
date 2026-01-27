import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLanguage, fetchTranslations } from '../../store/languageSlice';
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
import TranslatableText from '@/app/Components/TranslatableText';
// Define the shape of our language data
interface Language {
    id: string;
    name: string;
    flag: string; // URL or local asset
}

const LANGUAGES: Language[] = [
  { id: '1', name: 'English', flag: 'https://flagcdn.com/w160/gb.png' },
  { id: '2', name: 'Chinese (Mandarin)', flag: 'https://flagcdn.com/w160/cn.png' },
  { id: '3', name: 'Hindi', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '4', name: 'Spanish', flag: 'https://flagcdn.com/w160/es.png' },
  { id: '5', name: 'French', flag: 'https://flagcdn.com/w160/fr.png' },
  { id: '6', name: 'Arabic', flag: 'https://flagcdn.com/w160/sa.png' },
  { id: '7', name: 'Bengali', flag: 'https://flagcdn.com/w160/bd.png' },
  { id: '8', name: 'Russian', flag: 'https://flagcdn.com/w160/ru.png' },
  { id: '9', name: 'Portuguese', flag: 'https://flagcdn.com/w160/pt.png' },
  { id: '10', name: 'Urdu', flag: 'https://flagcdn.com/w160/pk.png' },
  { id: '11', name: 'Indonesian', flag: 'https://flagcdn.com/w160/id.png' },
  { id: '12', name: 'German', flag: 'https://flagcdn.com/w160/de.png' },
  { id: '13', name: 'Japanese', flag: 'https://flagcdn.com/w160/jp.png' },
  { id: '14', name: 'Swahili', flag: 'https://flagcdn.com/w160/tz.png' },
  { id: '15', name: 'Marathi', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '16', name: 'Telugu', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '17', name: 'Turkish', flag: 'https://flagcdn.com/w160/tr.png' },
  { id: '18', name: 'Tamil', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '19', name: 'Vietnamese', flag: 'https://flagcdn.com/w160/vn.png' },
  { id: '20', name: 'Korean', flag: 'https://flagcdn.com/w160/kr.png' },
  { id: '21', name: 'Italian', flag: 'https://flagcdn.com/w160/it.png' },
  { id: '22', name: 'Thai', flag: 'https://flagcdn.com/w160/th.png' },
  { id: '23', name: 'Gujarati', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '24', name: 'Persian (Farsi)', flag: 'https://flagcdn.com/w160/ir.png' },
  { id: '25', name: 'Polish', flag: 'https://flagcdn.com/w160/pl.png' },
  { id: '26', name: 'Ukrainian', flag: 'https://flagcdn.com/w160/ua.png' },
  { id: '27', name: 'Malay', flag: 'https://flagcdn.com/w160/my.png' },
  { id: '28', name: 'Kannada', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '29', name: 'Odia', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '30', name: 'Punjabi', flag: 'https://flagcdn.com/w160/in.png' },
  { id: '31', name: 'Romanian', flag: 'https://flagcdn.com/w160/ro.png' },
  { id: '32', name: 'Dutch', flag: 'https://flagcdn.com/w160/nl.png' },
  { id: '33', name: 'Greek', flag: 'https://flagcdn.com/w160/gr.png' },
  { id: '34', name: 'Czech', flag: 'https://flagcdn.com/w160/cz.png' },
  { id: '35', name: 'Hungarian', flag: 'https://flagcdn.com/w160/hu.png' },
  { id: '36', name: 'Hebrew', flag: 'https://flagcdn.com/w160/il.png' },
  { id: '37', name: 'Swedish', flag: 'https://flagcdn.com/w160/se.png' },
  { id: '38', name: 'Finnish', flag: 'https://flagcdn.com/w160/fi.png' },
  { id: '39', name: 'Norwegian', flag: 'https://flagcdn.com/w160/no.png' },
  { id: '40', name: 'Danish', flag: 'https://flagcdn.com/w160/dk.png' }
];



export default function LanguageSelectionScreen({ navigation }: any) {
    const dispatch = useAppDispatch();
    const [selectedId, setSelectedId] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');
    const { selected, translations, loading } = useAppSelector((state: { language: any }) => state.language);

    const selectedLanguage = LANGUAGES.find(lang => lang.id === selectedId);

    const renderLanguageItem = ({ item }: { item: Language }) => (
        <TouchableOpacity
            style={[
                styles.languageItem,
                selectedId === item.id && styles.selectedRow
            ]}
            onPress={() => {
                setSelectedId(item.id);
                dispatch(setLanguage(item.name));
                dispatch(fetchTranslations({ targetLanguage: item.name }));
            }}
        >
            <Image source={{ uri: item.flag }} style={styles.flagIcon} />
            <Text style={styles.languageText}>{item.name || ''}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground 
          source={require('../../../assets/background/welcome.png')} 
          style={styles.container}
        >
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.content}>
                <TranslatableText style={styles.headerTitle}>{'Choose the language'}</TranslatableText>
                <TranslatableText style={styles.headerSubtitle}>{'Select your preferred language below. This helps us serve you better.'}</TranslatableText>

                {/* Current Selection Display */}
                <TranslatableText style={styles.sectionLabel}>{'You Selected'}</TranslatableText>
                <View style={styles.selectedBox}>
                    <Image source={{ uri: selectedLanguage?.flag }} style={styles.flagIcon} />
                    <TranslatableText style={styles.languageText}>{selectedLanguage?.name || ''}</TranslatableText>
                </View>

                {/* All Languages List */}
                <TranslatableText style={styles.sectionLabel}>{'All Languages'}</TranslatableText>
                <View style={styles.listContainer}>
                    {/* Search Bar */}
                    <View style={styles.searchBar}>

                        <FontAwesome name="search" size={24} color="white" />
                        <TextInput
                            placeholder={'Search'}
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
                    <TranslatableText style={styles.continueText}>{loading ? '...' : 'Continue'}</TranslatableText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
 </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'rgb(0, 0, 0,0.6)',
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


