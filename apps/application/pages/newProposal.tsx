import React, { useEffect } from "react";
import Link from "next/link";

import Form1 from "@/components/Form1";
import Form2 from "@/components/Form2";
import Form3 from "@/components/Form3";
import Form4 from "@/components/Form4";
import ProgressBar from "@/components/ProgressBar";
import Layout from "@/components/Layout";
import {
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";

export interface Evidence {
  date: string;
  description: string;
  evidenceForm: string;
}

export interface Proposal {
  name: string;
  type: string;
  description: string;
  location: {
    text: string;
    coords: Partial<google.maps.LatLng>;
  };
  evidence: Evidence;
}

const Form = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [ipfsLoading, setIpfsLoading] = React.useState<boolean>(false);
  const [path, setPath] = React.useState<string>("");
  const [evidence, setEvidence] = React.useState<Evidence>({
    date: "",
    description: "",
    evidenceForm: "",
  });
  const [proposal, setProposal] = React.useState<Proposal>({
    name: "",
    type: "",
    description: "",
    location: {
      text: "",
      coords: { lat: () => 20.587834, lng: () => -100.389245 },
    },
    evidence: evidence,
  });

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    setIpfsLoading(true);

    const uploadUrl = await upload({
      data: [proposal],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
    alert(uploadUrl);
    console.log({ uploadUrl });
    setIpfsLoading(false);
    setPath(uploadUrl[0]);
  };

  const { contract /*, isLoading, error */ } = useContract(
    "0xc1fcf7a7879A0b33a6EB84AeEBB10f30F5e533a2" // TODO; address is not a contract
  );

  const { mutateAsync, isLoading, isSuccess } = useContractWrite(
    contract,
    "submitProposal"
  );

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (path !== "") {
      mutateAsync({ args: [proposal.name, path] });
    }
  }, [path]);

  return (
    <Layout>
      <div
        className={
          currentStep === 4
            ? "formBG h-full xl:h-screen py-20"
            : "formBG h-screen"
        }
      >
        <form className="formCard">
          {currentStep === 1 && (
            <div className="">
              <ProgressBar currentStep={1} />
              <Form1
                proposal={proposal}
                setProposal={setProposal}
                nextStep={nextStep}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="">
              <ProgressBar currentStep={2} />
              <Form2 nextStep={nextStep} />
            </div>
          )}
          {currentStep === 3 && (
            <div className="">
              <ProgressBar currentStep={3} />
              <Form3
                proposal={proposal}
                setProposal={setProposal}
                nextStep={nextStep}
              />
            </div>
          )}
          {currentStep === 4 && (
            <div className="">
              <ProgressBar currentStep={4} />
              <Form4 proposal={proposal} />
            </div>
          )}
          <div className="flex justify-between  m-auto gap-5 xl:pt-0 xl:pb-0 pt-9 pb-3">
            {currentStep !== 1 && (
              <button type="button" className="homeBT" onClick={prevStep}>
                Regresar
              </button>
            )}
            {currentStep !== 4 ? (
              <button type="button" className="homeBT " onClick={nextStep}>
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                className="homeBT"
                onClick={() => uploadToIpfs()}
              >
                {ipfsLoading
                  ? "Uploading to IPFS..."
                  : isLoading
                  ? "Uploading transaction..."
                  : "Registrar propuesta"}
              </button>
            )}
          </div>

          {isSuccess && (
            <div className=" modal-background">
              <div className="modal bg-cit/60 h-96 grid items-center ">
                <div>
                  <div className="text-8xl animate-bounce">🗳️</div>
                  <div className="text-xl text-white animation-pulse ">
                    ¡Tu propuesta ha sido creada!{" "}
                  </div>
                </div>
                <Link href="/daoProposals">
                  <span className="homeBT">Ir a panel de propuestas</span>
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Form;
