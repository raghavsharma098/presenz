// clientId="client-WY6V7kP3qtzYGmhWda35fgDrsgqMDWw8hPzpnv1V5DSu1">
// appId="cmkfot3fg01kejj0c2w7c3pmy"
import { PrivyProvider } from '@privy-io/expo';
import { Slot } from 'expo-router';
export default function App() {
  return (
    <PrivyProvider
      appId="cmkfot3fg01kejj0c2w7c3pmy"
      clientId="client-WY6V7kP3qtzYGmhWda35fgDrsgqMDWw8hPzpnv1V5DSu1"
      config={{
        embedded: {
          ethereum: {
            createOnLogin: 'all-users', 
          },
        },
      } as any}
    >

      <Slot />
    </PrivyProvider>
  );
}