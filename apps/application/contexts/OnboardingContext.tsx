import { contractAddress_zengoDao } from "@/const/contracts";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { type Address, toEther } from "@thirdweb-dev/sdk";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

interface IOnboardingContext {
  cycleState: number | null;
  walletIsConnected: boolean;
  claimPoap: (address: string, eventId: string) => void;
  poapScan: (address: string, eventId: string) => void;
  addressHasPoap: boolean;
  addModeratorCall: (moderatorAddress: Address) => void;
  addModeratorInfoCall: (props: IAddModeratorInfoCallProps) => void;
  removeModeratorCall: (moderatorAddress: Address) => void;
  setIndividualVotingPointsCall: (
    moderatorAddress: Address,
    points: number
  ) => void;
  poapTokenId: string;
}

export const OnboardingContext = createContext<IOnboardingContext>({
  cycleState: null,
  walletIsConnected: false,
  claimPoap: (address: string, eventId: string) => {},
  poapScan: (address: string, eventId: string) => {},
  addressHasPoap: false,
  addModeratorCall: (moderatorAddress: Address) => {},
  addModeratorInfoCall: (props: IAddModeratorInfoCallProps) => {},
  removeModeratorCall: (moderatorAddress: Address) => {},
  setIndividualVotingPointsCall: (
    moderatorAddress: Address,
    points: number
  ) => {},
  poapTokenId: "",
});

interface IProps {
  children: ReactNode;
}

interface IAddModeratorInfoCallProps {
  modAddress: Address;
  modType: string;
  modPosition: string;
  modOrganization: string;
}

export function OnboardingContextProvider({ children }: IProps) {
  const [cycleState, setCycleState] = useState<number | null>(null);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [addressHasPoap, setAddressHasPoap] = useState<boolean>(false);
  const [poapTokenId, setPoapTokenId] = useState<string>("");

  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletIsConnected(true);
    }
  }, [address]);

  const claimPoap = async (address: string, eventId: string) => {
    const claimApiResponse = await fetch(
      `/api/poaps/claim?address=${address}&eventId=${eventId}`
    );

    const claimApiData = await claimApiResponse.json();

    if (claimApiData.claimed) {
      console.log("claimed true");
      setAddressHasPoap(true);
      poapScan(address, eventId);
    }
  };

  const poapScan = async (address: string, eventId: string) => {
    const response = await fetch(
      `/api/poaps/scan?address=${address}&eventId=${eventId}`
    );
    const data = await response.json();
    setAddressHasPoap(data.scan);
    setPoapTokenId(data.tokenId);
  };

  const { contract: zengoDaoContract } = useContract(contractAddress_zengoDao);

  const {
    data: getGovernanceCycleData,
    // isLoading: getGovernanceCycleIsLoading,
    // error: getGovernanceCycleError,
    isSuccess: getGovernanceCycleIsSuccess,
  } = useContractRead(zengoDaoContract, "getGovernanceCycle");

  useEffect(() => {
    if (getGovernanceCycleData) {
      setCycleState(parseInt(toEther(getGovernanceCycleData)));
    }
  }, [getGovernanceCycleIsSuccess]);

  const { mutateAsync: addModerator, isLoading: addModeratorIsLoading } =
    useContractWrite(zengoDaoContract, "addModerator");

  const addModeratorCall = async (moderatorAddress: Address) => {
    try {
      const data = await addModerator({ args: [moderatorAddress] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const {
    mutateAsync: addModeratorInfo,
    isLoading: addModeratorInfoIsLoading,
  } = useContractWrite(zengoDaoContract, "addModeratorInfo");

  const addModeratorInfoCall = async ({
    modAddress,
    modType,
    modPosition,
    modOrganization,
  }: IAddModeratorInfoCallProps) => {
    try {
      const data = await addModeratorInfo({
        args: [modAddress, modType, modPosition, modOrganization],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: removeModerator, isLoading: removeModeratorIsLoading } =
    useContractWrite(zengoDaoContract, "removeModerator");

  const removeModeratorCall = async (moderatorAddress: Address) => {
    try {
      const data = await removeModerator({ args: [moderatorAddress] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const {
    mutateAsync: setIndividualVotingPoints,
    isLoading: setIndividualVotingPointsIsLoading,
  } = useContractWrite(zengoDaoContract, "setIndividualVotingPoints");

  const setIndividualVotingPointsCall = async (
    moderatorAddress: Address,
    points: number
  ) => {
    try {
      const data = await setIndividualVotingPoints({
        args: [moderatorAddress, points],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // return context state
  const state = {
    cycleState,
    walletIsConnected,
    claimPoap,
    poapScan,
    addressHasPoap,
    addModeratorCall,
    addModeratorInfoCall,
    removeModeratorCall,
    setIndividualVotingPointsCall,
    poapTokenId,
  };

  return (
    <OnboardingContext.Provider value={state}>
      {children}
    </OnboardingContext.Provider>
  );
}

OnboardingContext.displayName = "OnboardingContext";

export function useOnboardingContextState() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContextState must be used within the OnboardingContextProvider"
    );
  }
  return context;
}
