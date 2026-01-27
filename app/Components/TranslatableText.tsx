import React, { useState } from 'react';
import { TouchableOpacity, Text, Modal, View, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../store/hooks';
import axios from 'axios';

export default function TranslatableText({ children, style }: { children: string, style?: any }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const selectedLanguage = useAppSelector(state => state.language.selected);

  const handleTranslate = async () => {
    setLoading(true);
    setModalVisible(true);
    try {
      const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
      const prompt = `Translate this to ${selectedLanguage}: "${children}"`;
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful translator.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 200,
          temperature: 0.2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      const text = response.data.choices[0].message.content;
      setTranslated(text);
    } catch (e) {
      setTranslated('Translation failed');
    }
    setLoading(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleTranslate}>
        <Text style={style}>{children}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0008' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, minWidth: 200 }}>
            {loading ? <ActivityIndicator /> : <Text>{translated}</Text>}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
