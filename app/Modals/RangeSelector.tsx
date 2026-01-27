import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import TokenIcon from '../../assets/logo/token.svg'
import TranslatableText from '../Components/TranslatableText';
// Define an interface for your options to satisfy TypeScript
interface RadiusOption {
  id: string;
  distance: string;
  tier: string;
  price: string;
  color?: string;
  isCoin?: boolean;
  tierColor?: string;
  subText?: string;
}

const RADIUS_OPTIONS: RadiusOption[] = [
  { id: '1', distance: '20 km', tier: 'Default', price: 'Free', color: '#00FF85' },
  { id: '2', distance: '30 km', tier: 'Silver', price: '25', isCoin: true, tierColor: '#4EBDEF' },
  { id: '3', distance: '50 km', tier: 'Gold', price: '50', isCoin: true, tierColor: '#A55EEA' },
  { id: '4', distance: '100 km', tier: 'Platinum', price: '100', isCoin: true, tierColor: '#FFD700', subText: 'Time-limited:24h' },
];

export default function RangeSelector({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Helper: Get selected tier info
  const selectedOption = RADIUS_OPTIONS.find(opt => opt.id === selectedId);

  // TODO: Replace with actual user ID/token logic
  const userId = 'USER_ID';

  // Unlock handler
  const handleUnlock = async () => {
    if (!selectedOption) return;
    setLoading(true);
    setMessage(null);
    try {
      // Example API endpoint: /api/user/unlock-radius
      // Send: userId, tier, distance, price
      const response = await fetch('https://localhost:300/api/user/unlock-radius', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
        },
        body: JSON.stringify({
          userId,
          tier: selectedOption.tier,
          distance: selectedOption.distance,
          price: selectedOption.price,
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setMessage('Radius unlocked!');
        // Optionally close modal or update UI
      } else {
        setMessage(result.error || 'Unlock failed. Please check your subscription.');
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TranslatableText style={styles.headerText}>Unlock Radius</TranslatableText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Added listContainer to styles below */}
        <ScrollView contentContainerStyle={styles.listContainer}>
          {RADIUS_OPTIONS.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.8}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard
                ]}
              >
                <View style={styles.leftSection}>
                  <MaterialCommunityIcons name="access-point" size={24} color={isSelected ? "#A55EEA" : "#777"} />
                  <View style={styles.textColumn}>
                    <View style={styles.row}>
                      <TranslatableText style={styles.distanceText}>{item.distance}</TranslatableText>
                      <TranslatableText style={[styles.tierText, { color: item.tierColor || '#666' }]}>
                        {item.tier}
                      </TranslatableText>
                    </View>
                    {item.subText && <TranslatableText style={styles.subText}>{item.subText}</TranslatableText>}
                  </View>
                </View>

                <View style={styles.rightSection}>
                  {item.isCoin && (
                    /* Added coinBadge to styles below */
                    <View style={styles.coinBadge}>
                      <TokenIcon style={styles.tokenIcon} />
                    </View>
                  )}
                  <TranslatableText style={[styles.priceText, item.color ? { color: item.color } : null]}>
                    {item.price}
                  </TranslatableText>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock} disabled={loading}>
          <TranslatableText style={styles.unlockButtonText}>{loading ? 'Unlocking...' : 'Unlock'}</TranslatableText>
        </TouchableOpacity>
        {message && (
          <TranslatableText style={{ color: message.includes('error') || message.includes('failed') ? 'red' : 'lime', textAlign: 'center', marginTop: 8 }}>{message}</TranslatableText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -110,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  container: {
    backgroundColor: 'rgba(45, 30, 30, 0.95)',
    borderRadius: 40,
    padding: 15,
    maxHeight: '58%',
    width: '95%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 5,
  },
  listContainer: {
    height: '105%',
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A0B0B',
    borderRadius: 15,
    padding: "5%",
    height: "20%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedCard: {
    borderColor: '#FFD700',
    backgroundColor: '#0A051A',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColumn: {
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  distanceText: {
    color: '#EEE',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '500',
  },
  subText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5E5CE6',
    marginRight: 6,
  },
  priceText: {
    color: '#EEE',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unlockButton: {
    backgroundColor: '#2D5AFE',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  unlockButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tokenIcon: {
    marginRight: 5,
    marginTop: 2,
  },
});