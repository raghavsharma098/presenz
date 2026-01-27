import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import TokenIcon from '../../assets/logo/token.svg'
import { usePrivyUser } from '../Screen/Login/Otp';
// Interface for Activity Items
interface ActivityItem {
  id: string;
  title: string;
  time: string;
  amount: string;
  isPositive: boolean;
}

const RECENT_ACTIVITY: ActivityItem[] = [
  { id: '1', title: 'Pulse Created', time: '2 hours ago', amount: '+2 PSZ', isPositive: true },
  { id: '2', title: 'Venue Bonus', time: '5 hours ago', amount: '+5 PSZ', isPositive: true },
  { id: '3', title: 'Plan Purchase', time: '1 day ago', amount: '-25 PSZ', isPositive: false },
  { id: '4', title: 'Pulse Created', time: '2 hours ago', amount: '+2 PSZ', isPositive: true },
  { id: '5', title: 'Venue Bonus', time: '5 hours ago', amount: '+5 PSZ', isPositive: true },
  { id: '6', title: 'Plan Purchase', time: '1 day ago', amount: '-25 PSZ', isPositive: false },
];

export default function Token({ onClose }: { onClose: () => void }) {

  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const user = usePrivyUser();
  const privyId = user?.id || '';

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://localhost:300/api/${privyId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });
        setBalance(res.data.balance);
      } catch (err) {
        setBalance(null);
        console.error('Failed to fetch balance:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, [privyId]);


  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
      <View style={styles.bottomSheet}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Tokens</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-circle-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {/* Token Balance */}
        <View style={styles.tokenBalanceContainer}>
          <TokenIcon style={styles.tokenIcon} />
          <Text style={styles.balanceText}>
            {loading ? '...' : balance !== null ? `${balance}` : '...'} 
            <Text style={styles.pszLabel}>   PSZ tokens</Text></Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Power-Ups Section */}
          <View style={styles.powerUpOuterBorder}>
            <View style={styles.powerUpContainer}>
              <Text style={styles.sectionTitle}>Power-Ups</Text>

              <TouchableOpacity style={[styles.powerUpCard, { backgroundColor: '#1E2959' }]}>
                <View>
                  <Text style={styles.powerUpTitle}>Unlock Radius</Text>
                  <Text style={styles.powerUpSub}>Expand your reach</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.powerUpCard, { backgroundColor: '#3D008E' }]}>
                <View>
                  <Text style={styles.powerUpTitle}>Buy Plan</Text>
                  <Text style={styles.powerUpSub}>Boost visibility</Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity Section */}
          <Text style={[styles.sectionTitle, { marginTop: 30, marginBottom: 15 }]}>Recent Activity</Text>
          {RECENT_ACTIVITY.map((item) => (
            <View key={item.id} style={styles.activityCard}>
              <View>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              <Text style={[
                styles.activityAmount,
                { color: item.isPositive ? '#00FFAD' : '#FF4D4D' }
              ]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0,0.95)',
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
    backgroundColor: 'rgba(1, 0, 38, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tokenBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  balanceText: {
    color: '#00B2FF', // Light blue
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pszLabel: {
    color: '#555A7B',
    fontSize: 16,
    fontWeight: 'normal',
  },
  powerUpOuterBorder: {
    borderWidth: 2,
    borderColor: '#009DFF', // Neon blue border
    borderRadius: 12,
    padding: 2,
  },
  powerUpContainer: {
    backgroundColor: '#020314',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  powerUpCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  powerUpTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  powerUpSub: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#11131A',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  activityTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  activityTime: {
    color: '#4B5563',
    fontSize: 12,
    marginTop: 4,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tokenIcon: {
    marginRight: 1,
    marginTop: 2,
  },
});