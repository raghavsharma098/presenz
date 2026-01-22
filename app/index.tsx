import { usePrivy } from "@privy-io/expo";
import Welcome from "./Screen/Welcome/Welcome";
import Login from "./Screen/Login/Login"
import Map from "./Screen/Map/Map";

export default function Index() {
  const { user } = usePrivy()
  return (
    (<Welcome />) 
  );
  // return (
  //   !user ? (<Login />) : (<Map />)
  // );
}
