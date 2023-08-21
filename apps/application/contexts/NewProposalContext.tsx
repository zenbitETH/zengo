import { createContext, useContext } from "react";
import { type ReactNode, useState } from "react";
import { IEvidence, ILocation, IProposalInfo } from "../interfaces";
import { useStorageUpload } from "@thirdweb-dev/react";

interface INewProposalContext {
  evidence: IEvidence;
  setEvidence: (evidence: IEvidence) => void;
  location: ILocation;
  setLocation: (location: ILocation) => void;
  proposalInfo: IProposalInfo;
  setProposalInfo: (proposal: IProposalInfo) => void;
  clearFormState: () => void;
  uploadEvidenceToIpfs: (fileToUpload: File) => void;
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
});

interface IProps {
  children: ReactNode;
}

export function NewProposalContextProvider({ children }: IProps) {
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

  const state = {
    evidence,
    setEvidence,
    location,
    setLocation,
    proposalInfo,
    setProposalInfo,
    clearFormState,
    uploadEvidenceToIpfs,
  };

  return (
    <NewProposalContext.Provider value={state}>
      {children}
    </NewProposalContext.Provider>
  );
}

NewProposalContext.displayName = "ZengoNewProposalContext";

// export const useNewProposalContext = () => useContext(NewProposalContext);

export function useNewProposalState() {
  const context = useContext(NewProposalContext);
  if (!context) {
    throw new Error(
      "useNewProposalState must be used within the NewProposalContextProvider"
    );
  }
  return context;
}
