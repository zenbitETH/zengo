import { createContext, useContext } from "react";
import { type ReactNode, useState } from "react";
import { IEvidence, ILocation, IProposalInfo } from "../interfaces";
import {
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { contractAddress_zengoDao } from "@/const/contracts";

interface IProposalsContext {
  evidence: IEvidence;
  setEvidence: (evidence: IEvidence) => void;
  location: ILocation;
  setLocation: (location: ILocation) => void;
  proposalInfo: IProposalInfo;
  setProposalInfo: (proposal: IProposalInfo) => void;
  clearFormState: () => void;
  uploadEvidenceToIpfs: (fileToUpload: File) => Promise<string>;
  submitProposalForm: () => void;
  metadataUploadIsLoading: boolean;
  submitProposalFormIsLoading: boolean;
  submitProposalSuccess: boolean;
  addVotingIterationCall: (proposalId: string) => void;
  concludeVotingIterationCall: (
    votingIterationId: string,
    proposalId: string
  ) => void;
  voteToClassifyProposalCall: (
    vote: number,
    votingIteration: number,
    proposalId: number
  ) => void;
}

interface ISubmitProposalProps {
  title: string;
  proposalDescription: string;
  evidenceDescription: string;
  evidenceUri: string;
  proposalType: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
}

export const ProposalsContext = createContext<IProposalsContext | undefined>(
  undefined
  // {
  // evidence: {
  //   date: "",
  //   description: "",
  //   ipfsUrl: "",
  // },
  // setEvidence: () => {},
  // location: {
  //   locationText: "",
  //   gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
  // },
  // setLocation: () => {},
  // proposalInfo: {
  //   title: "",
  //   type: "",
  //   description: "",
  // },
  // setProposalInfo: () => {},
  // clearFormState: () => {},
  // uploadEvidenceToIpfs: (fileToUpload: File) => Promise.resolve(""),
  // submitProposalForm: () => {},
  // metadataUploadIsLoading: false,
  // submitProposalFormIsLoading: false,
  // submitProposalSuccess: false,
  // addVotingIterationCall: (proposalId: string) => {},
  // concludeVotingIterationCall: (
  //   votingIterationId: string,
  //   proposalId: string
  // ) => {},
  // voteToClassifyProposalCall: (
  //   vote: number,
  //   votingIteration: number,
  //   proposalId: number
  // ) => {},
  // }
);

interface IProps {
  children: ReactNode;
}

export function ProposalsContextProvider({ children }: IProps) {
  const [metadataUploadIsLoading, setMetadataUploadIsLoading] = useState(false);
  const [submitProposalSuccess, setSubmitProposalSuccess] = useState(false);
  const { mutateAsync: upload } = useStorageUpload();

  const [evidence, setEvidence] = useState<IEvidence>({
    date: "",
    description: "",
    ipfsUrl: "",
  });

  const [location, setLocation] = useState<ILocation>({
    locationText: "",
    gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
  });

  const [proposalInfo, setProposalInfo] = useState<IProposalInfo>({
    title: "",
    type: "",
    description: "",
  });

  const clearFormState = () => {
    setEvidence({
      date: "",
      description: "",
      ipfsUrl: "",
    });
    setLocation({
      locationText: "",
      gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
    });
    setProposalInfo({
      title: "",
      type: "",
      description: "",
    });
    setSubmitProposalSuccess(false);
  };

  const uploadEvidenceToIpfs = async (fileToUpload: File): Promise<string> => {
    const uploadUrl = await upload({
      data: [fileToUpload],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });

    if (!uploadUrl) {
      return "";
    }

    return uploadUrl[0];
  };

  const { contract: contractZengoDao /*, isLoading, error */ } = useContract(
    contractAddress_zengoDao
  );

  const uploadProposalMetadataToIpfs = async () => {
    setMetadataUploadIsLoading(true);

    const newProposal = {
      ...proposalInfo,
      location,
      evidence,
    };

    const uploadUrl = await upload({
      data: [newProposal],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
    console.log({ uploadUrl });
    setMetadataUploadIsLoading(false);
    if (uploadUrl) {
      return uploadUrl[0];
    }
  };

  const { mutateAsync: submitProposal, isLoading: submitProposalIsLoading } =
    useContractWrite(contractZengoDao, "submitProposal");

  const submitProposalCall = async ({
    title,
    proposalDescription,
    evidenceDescription,
    evidenceUri,
    proposalType,
    streetAddress,
    latitude,
    longitude,
  }: ISubmitProposalProps) => {
    try {
      const data = await submitProposal({
        args: [
          title,
          proposalDescription,
          evidenceDescription,
          evidenceUri,
          proposalType,
          streetAddress,
          latitude,
          longitude,
        ],
      });
      console.info("contract call successs", data);
      setSubmitProposalSuccess(true);
      clearFormState();
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const submitProposalForm = async () => {
    try {
      const metadataPath = await uploadProposalMetadataToIpfs();

      if (metadataPath) {
        await submitProposalCall({
          title: proposalInfo.title,
          proposalDescription: proposalInfo.description,
          proposalType: proposalInfo.type,
          evidenceDescription: evidence.description,
          evidenceUri: metadataPath,
          streetAddress: location.locationText,
          latitude: location.gMapsLocationObject.lat,
          longitude: location.gMapsLocationObject.lng,
        });
        clearFormState();
      }
    } catch (err) {
      console.error("contract call failure", { err }); // TODO: show toaster with error ?
    }
  };

  const {
    mutateAsync: addVotingIteration,
    isLoading: addVotingIterationIsLoading,
  } = useContractWrite(contractZengoDao, "addVotingIteration");

  const addVotingIterationCall = async (proposalId: string) => {
    try {
      const data = await addVotingIteration({ args: [proposalId] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const {
    mutateAsync: concludeVotingIteration,
    isLoading: concludeVotingIterationIsLoading,
  } = useContractWrite(contractZengoDao, "concludeVotingIteration");

  const concludeVotingIterationCall = async (
    votingIterationId: string,
    proposalId: string
  ) => {
    try {
      const data = await concludeVotingIteration({
        args: [votingIterationId, proposalId],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const {
    mutateAsync: voteToClassifyProposal,
    isLoading: voteToClassifyProposalIsLoading,
  } = useContractWrite(contractZengoDao, "voteToClassifyProposal");

  const voteToClassifyProposalCall = async (
    vote: number,
    votingIteration: number,
    proposalId: number
  ) => {
    try {
      const data = await voteToClassifyProposal({
        args: [vote, votingIteration, proposalId],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const state = {
    evidence,
    setEvidence,
    location,
    setLocation,
    proposalInfo,
    setProposalInfo,
    clearFormState,
    uploadEvidenceToIpfs,
    submitProposalForm,
    metadataUploadIsLoading,
    submitProposalFormIsLoading: submitProposalIsLoading,
    submitProposalSuccess,
    addVotingIterationCall,
    concludeVotingIterationCall,
    voteToClassifyProposalCall,
  };

  return (
    <ProposalsContext.Provider value={state}>
      {children}
    </ProposalsContext.Provider>
  );
}

ProposalsContext.displayName = "ProposalsContext";

export function useProposalsContextState() {
  const context = useContext(ProposalsContext);
  if (!context) {
    throw new Error(
      "useProposalsContextState must be used within the ProposalsContextProvider"
    );
  }
  return context;
}
