import { useEffect, useState } from "react";
import Link from "next/link";
import Form1 from "@/components/Form1";
import Form2 from "@/components/Form2";
import Form3 from "@/components/Form3";
import Form4 from "@/components/Form4";
import ProgressBar from "@/components/ProgressBar";
import {
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { useNewProposalState } from "@/contexts/NewProposalContext";
import { contractAddress_zengoDao } from "@/const/contracts";

const Form = () => {
  const { location, evidence, proposalInfo, clearFormState } =
    useNewProposalState();

  const [currentStep, setCurrentStep] = useState(1);
  const [ipfsLoading, setIpfsLoading] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    setIpfsLoading(true);

    const newProposal = {
      ...proposalInfo,
      location,
      evidence,
    };

    const uploadUrl = await upload({
      data: [newProposal],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
    alert(uploadUrl);
    console.log({ uploadUrl });
    setIpfsLoading(false);
    setPath(uploadUrl[0]);
  };

  const { contract /*, isLoading, error */ } = useContract(
    contractAddress_zengoDao // TODO; address is not a contract
  );

  const {
    mutateAsync: submitProposalFn,
    isLoading: submitProposalIsLoading,
    isSuccess: submitProposalIsSuccess,
  } = useContractWrite(contract, "submitProposal");

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (path !== "") {
      callSubmitProposalFn();
    }
  }, [path]);

  const callSubmitProposalFn = async () => {
    try {
      const data = await submitProposalFn({
        args: [proposalInfo.title, path], // TODO: args will change when contract function changes to receive all the proposal fields
      });
      console.info("contract call successs", { data });
      clearFormState();
    } catch (err) {
      console.error("contract call failure", { err }); // TODO: show toaster with error ?
    }
  };

  return (
    <div
      className={
        currentStep === 4
          ? "formBG h-full xl:h-screen py-20"
          : "formBG h-screen"
      }
    >
      <div className="formCard">
        {currentStep === 1 && (
          <div className="">
            <ProgressBar currentStep={1} />
            <Form1 />
          </div>
        )}
        {currentStep === 2 && (
          <div className="">
            <ProgressBar currentStep={2} />
            <Form2 />
          </div>
        )}
        {currentStep === 3 && (
          <div className="">
            <ProgressBar currentStep={3} />
            <Form3 />
          </div>
        )}
        {currentStep === 4 && (
          <div className="">
            <ProgressBar currentStep={4} />
            <Form4 />
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
              // onClick={() => uploadToIpfs()} // TODO: commented for dummy version to prod
            >
              {ipfsLoading
                ? "Uploading to IPFS..."
                : submitProposalIsLoading
                ? "Submitting transaction..."
                : "Registrar propuesta"}
            </button>
          )}
        </div>

        {submitProposalIsSuccess && (
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
      </div>
    </div>
  );
};

export default Form;
