
import { PrivyProvider } from '@privy-io/expo';
import { Slot } from 'expo-router';
export default function App() {
  return (
    <PrivyProvider

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