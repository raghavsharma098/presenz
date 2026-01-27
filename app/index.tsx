
import { usePrivy } from "@privy-io/expo";
import Welcome from "./Screen/Welcome/Welcome";
import Login from "./Screen/Login/Login";
import Map from "./Screen/Map/Map";
import Location from "./Screen/Login/Location";
import Image from "./Screen/Pulse/Image";
import ReduxProvider from "./store/Provider";

export default function Index() {
  const { user } = usePrivy();
  return (
    <ReduxProvider>
      {!user ? <Welcome /> : <Map />}
    </ReduxProvider>
  );
}
