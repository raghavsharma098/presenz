import { PrivyProvider } from '@privy-io/expo';
import { Slot } from 'expo-router';
import ReduxProvider from './store/Provider';
import AutoTranslate from './auto-translate';
export default function App() {
  return (
    <PrivyProvider
      appId="cmkfot3fg01kejj0c2w7c3pmy"
      clientId="client-WY6V7kP3qtzYGmhWda35fgDrsgqMDWw8hPzpnv1V5DSu1"
      supportedChains={[
        {
          id: 11155111, // Sepolia
          name: 'Sepolia',
          rpcUrls: {
            default: {
              http: ['https://sepolia.infura.io/v3/a2443d74b1ab454c9131028b95a79920'],
            },
          }, nativeCurrency: {
            name: 'Sepolia ETH',
            symbol: 'ETH',
            decimals: 18,
          },
        },
      ]}
      config={{
        embedded: {
          ethereum: {
            createOnLogin: 'all-users',
          },
        },
      }}
    >
      <ReduxProvider>
        
        <Slot />
      </ReduxProvider>
    </PrivyProvider>
  );
}