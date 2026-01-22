// import { View, Text, Button } from 'react-native'
// import React, { useState } from 'react'
// import { getUserEmbeddedEthereumWallet, usePrivy } from '@privy-io/expo'
// import { useEmbeddedEthereumWallet } from '@privy-io/expo';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Home = () => {
//   const { logout, user } = usePrivy()
//   const [walletError, setWalletError] = useState('')

//   // Get an EIP-1193 Provider
//   const { wallets, create } = useEmbeddedEthereumWallet();
//   const account = getUserEmbeddedEthereumWallet(user)

//   const handleCreateWallet = async () => {
//     try {
//       setWalletError('')
//       await create?.()
//     } catch (error) {
//       console.error('Error creating wallet:', error)
//       setWalletError('Failed to create wallet')
//     }
//   }

//   return (
//     <SafeAreaView>
//       <Text>This is Home Screen </Text>
//       <Text>User: {user?.id}</Text>
//       <Button title="Logout" onPress={logout} />
//       <Button title="Create wallet" onPress={handleCreateWallet} />
//       <Text>Welcome {account?.address}</Text>
//       {walletError && <Text style={{ color: 'red' }}>Wallet Error: {walletError}</Text>}
//     </SafeAreaView>
//   )
// }

// export default Home
