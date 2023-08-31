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
}

export const GlobalCycleStageContext = createContext<IGlobalCycleStageContext>({
  stage: "",
  walletIsConnected: false,
});

interface IProps {
  children: ReactNode;
}

export function GlobalCycleStageContextProvider({ children }: IProps) {
  const [stage, setStage] = useState("verification");
  const [walletIsConnected, setWalletIsConnected] = useState(false);

  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletIsConnected(true);
    }
  }, [address]);

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
