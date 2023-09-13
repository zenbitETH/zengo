import { contractAddress_zengoDao } from "@/const/contracts";
import {
  useAddress,
  useConnectionStatus,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { type Address, toEther } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { IModeratorsByType } from "../interfaces";

interface IOnboardingContext {
  cycleState: number | null;
  walletIsConnected: boolean;
  claimPoap: (address: string, eventId: string) => void;
  poapScan: (address: string, eventId: string) => void;
  addressHasPoap: boolean;
  // addModeratorCall: (props: IAddModeratorCallProps) => void;
  removeModeratorCall: (moderatorAddress: Address) => void;
  setIndividualVotingPointsCall: (
    moderatorAddress: Address,
    points: number
  ) => void;
  poapTokenId: string;
  allModeratorsList: any[];
  userIsModerator: boolean;
  setUserIsModerator: (value: boolean) => void;
  moderatorsByType: IModeratorsByType;
  connectedWallet: string;
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

interface IAddModeratorCallProps {
  modAddress: Address;
  modType: string;
  modPosition: string;
  modOrganization: string;
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
      // if (process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID) {
      //   poapScan(address, process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID);
      // }
      // if (process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID) {
      //   poapScan(address, process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID);
      // }
    }
  }, [address]);

  const claimPoap = async (address: string, eventId: string) => {
    const claimApiResponse = await fetch(
      `/api/poaps/claim?address=${address}&eventId=${eventId}`
    );

    const claimApiData = await claimApiResponse.json();
    console.log({ claimApiData });
    if (claimApiData.claimed) {
      console.log("claimed true");
      setAddressHasPoap(true);
      await poapScan(address, eventId);
    }
    return;
  };

  const poapScan = async (address: string, eventId: string) => {
    const response = await fetch(
      `/api/poaps/scan?address=${address}&eventId=${eventId}`
    );
    const data = await response.json();

    if (data.tokenId !== "") {
      console.log("tokendid true ", { scan: data.scan });
      setAddressHasPoap(data.scan);
      setPoapTokenId(data.tokenId);
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

  const { mutateAsync: addModerator, isLoading: addModeratorIsLoading } =
    useContractWrite(zengoDaoContract, "addModerator");

  const addModeratorCall = async ({
    modAddress,
    modType,
    modPosition,
    modOrganization,
  }: IAddModeratorCallProps) => {
    try {
      const data = await addModerator({
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

  const {
    data: getModeratorsData,
    isLoading: getModeratorsIsLoading,
    isSuccess: getModeratorsIsSuccess,
  } = useContractRead(zengoDaoContract, "getModerators");

  useEffect(() => {
    if (getModeratorsData) {
      const moderatorsFormatedData: any[] = getModeratorsData.map(
        (moderator: any) => {
          const modTypeTxt =
            moderator.moderatorType === 0
              ? "Organizaciones Civiles"
              : moderator.moderatorType === 1
              ? "Sector Privado"
              : moderator.moderatorType === 2
              ? "Academia"
              : moderator.moderatorType === 3
              ? "Gobierno"
              : moderator.moderatorType === 4
              ? "Moderador abierto"
              : "No definido";
          return {
            address: moderator.address || "0xAddress",
            modType: moderator.moderatorType,
            modPosition: moderator.position,
            modOrganization: moderator.organization,
            modTypeTxt,
          };
        }
      );
      if (moderatorsFormatedData) {
        setAllModeratorsList(moderatorsFormatedData);
        const modsByType = moderatorsFormatedData.reduce(
          (acc, mod) => {
            if (mod.modType === 0) {
              acc.civil.push(mod);
            } else if (mod.modType === 1) {
              acc.private.push(mod);
            } else if (mod.modType === 2) {
              acc.academy.push(mod);
            } else if (mod.modType === 3) {
              acc.government.push(mod);
            } else if (mod.modType === 4) {
              acc.open.push(mod);
            }
            return acc;
          },
          {
            civil: [],
            private: [],
            academy: [],
            government: [],
            open: [],
          }
        );
        setModeratorsByType(modsByType);
      }
    }
  }, [getModeratorsIsSuccess]);

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
    removeModeratorCall,
    setIndividualVotingPointsCall,
    poapTokenId,
    allModeratorsList,
    userIsModerator,
    setUserIsModerator,
    moderatorsByType,
    connectedWallet,
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
