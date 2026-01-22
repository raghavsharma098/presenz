import { useEmbeddedEthereumWallet, usePrivy } from '@privy-io/expo';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const { user } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallets[0]?.address) return;

      setLoading(true);
      setError(null);

      try {
        const provider = new ethers.JsonRpcProvider(
          'https://ethereum-sepolia.publicnode.com'
        );

        const bal = await provider.getBalance(wallets[0].address);
        setBalance(ethers.formatEther(bal));
      } catch (err) {
        console.error('Failed to fetch balance:', err);
        setError('Failed to fetch balance');
        setBalance('0');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [wallets]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Embedded Wallet</Text>
        <Text style={styles.label}>Wallet Address:</Text>
        <Text style={styles.address}>{wallets[0]?.address || 'No wallet found'}</Text>

        <Text style={styles.label}>Balance:</Text>
        <Text style={styles.balance}>
          {loading ? 'Loading...' : error ? error : `${balance} ETH`}
        </Text>

        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.userId}>{user?.id || 'Not logged in'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  label: {
    color: '#d1d5db',
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  address: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  balance: {
    color: '#fff',
    fontSize: 18,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  userId: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});
