import { contractAddress_zengoDao } from "@/const/contracts";
import {
  useAddress,
  useConnectionStatus,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { toEther } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import {
  type IClaimResponse,
  type IModeratorsByType,
  ZengoOnboardingOptions,
} from "@/interfaces";
import { generateModeratorsLists } from "@/lib/generateModeratorsLists";

interface IOnboardingContext {
  cycleState: number | null;
  walletIsConnected: boolean;
  claimPoap: (address: string, eventId: string) => Promise<IClaimResponse>;
  poapScan: (address: string, eventId: string) => Promise<void>;
  addressHasPoap: boolean;
  setAddressHasPoap: (value: boolean) => void;
  // addModeratorCall: (props: IAddModeratorCallProps) => void;
  // removeModeratorCall: (moderatorAddress: Address) => void;
  // setIndividualVotingPointsCall: (
  //   moderatorAddress: Address,
  //   points: number
  // ) => void;
  poapTokenId: string;
  // allModeratorsList: any[];
  userIsModerator: boolean;
  setUserIsModerator: (value: boolean) => void;
  moderatorsByType: IModeratorsByType;
  connectedWallet: string;
  setVisible: (show: boolean | null) => void;
  visible: boolean | null;
  getModeratorsListRefetch: () => Promise<any>;
  getModeratorsRefetch: () => Promise<any>;
}

export const OnboardingContext = createContext<IOnboardingContext | undefined>(
  undefined
  // {
  // cycleState: null,
  // walletIsConnected: false,
  // claimPoap: (address: string, eventId: string) => {},
  // poapScan: (address: string, eventId: string) => {},
  // addressHasPoap: false,
  // addModeratorCall: (props: IAddModeratorCallProps) => {},
  // removeModeratorCall: (moderatorAddress: Address) => {},
  // setIndividualVotingPointsCall: (
  //   moderatorAddress: Address,
  //   points: number
  // ) => {},
  // poapTokenId: "",
  // allModeratorsList: [],
  // userIsModerator: false,
  // moderatorsByType: {
  //   civil: [],
  //   private: [],
  //   academy: [],
  //   government: [],
  //   open: [],
  // },
  // connectedWallet: "",
  // }
);

interface IProps {
  children: ReactNode;
}

export function OnboardingContextProvider({ children }: IProps) {
  const [cycleState, setCycleState] = useState<number | null>(null);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [addressHasPoap, setAddressHasPoap] = useState<boolean>(false);
  const [poapTokenId, setPoapTokenId] = useState<string>("");
  const [allModeratorsList, setAllModeratorsList] = useState<any[]>([]);
  const [userIsModerator, setUserIsModerator] = useState<boolean>(false);
  const [moderatorsByType, setModeratorsByType] = useState<IModeratorsByType>({
    civil: [],
    private: [],
    academy: [],
    government: [],
    open: [],
  });

  const [visible, setVisible] = useState<boolean | null>(null);

  const router = useRouter();
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    if (connectionStatus === "disconnected") {
      setWalletIsConnected(false);
      setConnectedWallet("");
      setAddressHasPoap(false);
      setPoapTokenId("");
      setUserIsModerator(false);
      router.push("/");
    }
  }, [connectionStatus]);

  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletIsConnected(true);
      setConnectedWallet(address);
      if (
        process.env.NEXT_PUBLIC_ZENGO_ONBOARDING ===
        ZengoOnboardingOptions.moderators
      ) {
        if (process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID) {
          poapScan(address, process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID);
        }
      } else if (
        process.env.NEXT_PUBLIC_ZENGO_ONBOARDING ===
        ZengoOnboardingOptions.citizens
      ) {
        if (process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID) {
          poapScan(address, process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID);
        }
      } else {
        console.log(
          "Zengo onboarding should be off. status: ",
          process.env.NEXT_PUBLIC_ZENGO_ONBOARDING
        );
      }
    }
  }, [address]);

  const claimPoap = async (
    address: string,
    eventId: string
  ): Promise<IClaimResponse> => {
    setVisible(true);
    //step4: claim poap step
    const claimPOSTOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        eventId: eventId,
      }),
    };

    const claimApiResponse = await fetch(`/api/poaps/claim`, claimPOSTOptions);

    const claimApiData = await claimApiResponse.json();

    if (claimApiData.claimed) {
      console.log("claimed true");
      setAddressHasPoap(true);
      setPoapTokenId(claimApiData.tokenId);
      // await poapScan(address, eventId); // now scanned on server side api route
      setVisible(false);
      return claimApiData;
    } else {
      console.log("claimed false");
      setVisible(false);
      return claimApiData;
    }
  };

  const poapScan = async (address: string, eventId: string): Promise<void> => {
    const response = await fetch(
      `/api/poaps/scan?address=${address}&eventId=${eventId}`
    );
    const data = await response.json();

    if (data.tokenId !== "") {
      console.log("tokendid true ", { scan: data.scan });
      setAddressHasPoap(data.scan);
      setPoapTokenId(data.tokenId);
    } else {
      console.log("tokendid false ", { scan: data.scan });
    }
    return;
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

  const {
    data: getModeratorsListData,
    isLoading: getModeratorsListIsLoading,
    isSuccess: getModeratorsListIsSuccess,
    refetch: getModeratorsListRefetch,
  } = useContractRead(zengoDaoContract, "getModeratorsList");

  const {
    data: getModeratorsData,
    isLoading: getModeratorsIsLoading,
    isSuccess: getModeratorsIsSuccess,
    refetch: getModeratorsRefetch,
  } = useContractRead(zengoDaoContract, "getModerators");

  useEffect(() => {
    if (getModeratorsData && getModeratorsListData) {
      const { /* moderatorsFormatedData, */ modsByType } =
        generateModeratorsLists(getModeratorsData, getModeratorsListData);
      // setAllModeratorsList(moderatorsFormatedData);
      setModeratorsByType(modsByType);
    }
  }, [getModeratorsIsSuccess, getModeratorsListIsSuccess]);

  const {
    data: addressIsModeratorData,
    isLoading: addressIsModeratorIsLoading,
    isSuccess: addressIsModeratorIsSuccess,
  } = useContractRead(zengoDaoContract, "moderators", [address]);

  useEffect(() => {
    if (addressIsModeratorData) {
      setUserIsModerator(addressIsModeratorData);
    }
  }, [addressIsModeratorIsSuccess]);

  // return context state
  const state = {
    cycleState,
    walletIsConnected,
    claimPoap,
    poapScan,
    addressHasPoap,
    setAddressHasPoap,
    poapTokenId,
    // allModeratorsList,
    userIsModerator,
    setUserIsModerator,
    moderatorsByType,
    connectedWallet,
    visible,
    setVisible,
    getModeratorsListRefetch,
    getModeratorsRefetch,
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
