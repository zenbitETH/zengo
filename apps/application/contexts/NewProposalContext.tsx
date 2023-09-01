import { createContext, useContext } from "react";
import { type ReactNode, useState } from "react";
import { IEvidence, ILocation, IProposalInfo } from "../interfaces";
import {
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { contractAddress_zengoDao } from "@/const/contracts";

interface INewProposalContext {
  evidence: IEvidence;
  setEvidence: (evidence: IEvidence) => void;
  location: ILocation;
  setLocation: (location: ILocation) => void;
  proposalInfo: IProposalInfo;
  setProposalInfo: (proposal: IProposalInfo) => void;
  clearFormState: () => void;
  uploadEvidenceToIpfs: (fileToUpload: File) => void;
  submitProposalForm: () => void;
  metadataUploadIsLoading: boolean;
  submitProposalFormIsLoading: boolean;
  submitProposalSuccess: boolean;
}

export const NewProposalContext = createContext<INewProposalContext>({
  evidence: {
    date: "",
    description: "",
    ipfsUrl: "",
  },
  setEvidence: () => {},
  location: {
    locationText: "",
    gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
  },
  setLocation: () => {},
  proposalInfo: {
    title: "",
    type: "",
    description: "",
  },
  setProposalInfo: () => {},
  clearFormState: () => {},
  uploadEvidenceToIpfs: () => {},
  submitProposalForm: () => {},
  metadataUploadIsLoading: false,
  submitProposalFormIsLoading: false,
  submitProposalSuccess: false,
});

interface IProps {
  children: ReactNode;
}

export function NewProposalContextProvider({ children }: IProps) {
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

  const uploadEvidenceToIpfs = async (fileToUpload: File) => {
    const uploadUrl = await upload({
      data: [fileToUpload],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
    setEvidence({
      ...evidence,
      ipfsUrl: uploadUrl[0],
    });
  };

  const { contract: contractZengoDao /*, isLoading, error */ } = useContract(
    contractAddress_zengoDao
  );

  const {
    mutateAsync: submitProposalFn,
    isLoading: submitProposalIsLoading,
    isSuccess: submitProposalIsSuccess,
  } = useContractWrite(contractZengoDao, "submitProposal");

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

  const callSubmitProposalFn = async (path: string) => {
    try {
      const data = await submitProposalFn({
        args: [proposalInfo.title, path], // TODO: args will change when contract function changes to receive all the proposal fields
      });
      console.info("contract call successs", { data });
      setSubmitProposalSuccess(true);
      clearFormState();
    } catch (err) {
      console.error("contract call failure", { err }); // TODO: show toaster with error ?
    }
  };

  const submitProposalForm = async () => {
    try {
      const metadataPath = await uploadProposalMetadataToIpfs();

      if (metadataPath) {
        await callSubmitProposalFn(metadataPath);
        clearFormState();
      }
    } catch (err) {
      console.error("contract call failure", { err }); // TODO: show toaster with error ?
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
  };

  return (
    <NewProposalContext.Provider value={state}>
      {children}
    </NewProposalContext.Provider>
  );
}

NewProposalContext.displayName = "ZengoNewProposalContext";

export function useNewProposalState() {
  const context = useContext(NewProposalContext);
  if (!context) {
    throw new Error(
      "useNewProposalState must be used within the NewProposalContextProvider"
    );
  }
  return context;
}
