import { useAddress } from "@thirdweb-dev/react";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
// import { useContract, useContractEvents } from "@thirdweb-dev/react";
// import { contractAddress_zengoDao } from "@/const/contracts";

interface IGlobalCycleStageContext {
  stage: string;
  walletIsConnected: boolean;
  claimPoap: (address: string, eventId: string) => void;
  poapScan: (address: string, eventId: string) => void;
  addressHasPoap: boolean;
}

export const GlobalCycleStageContext = createContext<IGlobalCycleStageContext>({
  stage: "",
  walletIsConnected: false,
  claimPoap: (address: string, eventId: string) => {},
  poapScan: (address: string, eventId: string) => {},
  addressHasPoap: false,
});

interface IProps {
  children: ReactNode;
}

export function GlobalCycleStageContextProvider({ children }: IProps) {
  const [stage, setStage] = useState("verification");
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [addressHasPoap, setAddressHasPoap] = useState<boolean>(false);

  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletIsConnected(true);
    }
  }, [address]);

  const claimPoap = async (address: string, eventId: string) => {
    // const claimApiResponse = await fetch(
    //   `/api/poaps/claim?address=${address}&eventId=${eventId}`
    // );

    // const claimApiData = await claimApiResponse.json();

    // if (claimApiData.claimed) {
    //   console.log("claimed true");
    setAddressHasPoap(true);
    // poapScan(address, eventId);
    // }
  };

  const poapScan = async (address: string, eventId: string) => {
    const response = await fetch(
      `/api/poaps/scan?address=${address}&eventId=${eventId}`
    );
    const data = await response.json();
    setAddressHasPoap(data.scan);
  };

  // const { contract } = useContract(contractAddress_zengoDao);
  // const {
  //   data: globalStageChangedData,
  //   isLoading,
  //   error,
  // } = useContractEvents(
  //   contract,
  //   "GlobalStageChanged", // TODO: to be defined in the contract and changed here
  //   {
  //     subscribe: true, // Subscribe to new events
  //   }
  // );

  // useEffect(() => {
  //   if (globalStageChangedData) {
  //     console.log({ globalStageChangedData });
  //     //   setStage(globalStageChangedData);
  //   }
  // }, [globalStageChangedData]);

  const state = {
    stage,
    walletIsConnected,
    claimPoap,
    poapScan,
    addressHasPoap,
  };

  return (
    <GlobalCycleStageContext.Provider value={state}>
      {children}
    </GlobalCycleStageContext.Provider>
  );
}

GlobalCycleStageContext.displayName = "ZengoGlobalCycleStageContext";

export function useGlobalCycleStageState() {
  const context = useContext(GlobalCycleStageContext);
  if (!context) {
    throw new Error(
      "useGlobalCycleStageState must be used within the GlobalCycleStageContextProvider"
    );
  }
  return context;
}
