import { useState } from "react";
import Link from "next/link";
import Form1 from "@/components/Form1";
import Form2 from "@/components/Form2";
import Form3 from "@/components/Form3";
import Form4 from "@/components/Form4";
import ProgressBar from "@/components/ProgressBar";
import { useProposalsContextState } from "@/contexts/ProposalsContext";

const NewProposalPage = () => {
  const {
    submitProposalForm,
    metadataUploadIsLoading,
    submitProposalFormIsLoading,
    submitProposalSuccess,
  } = useProposalsContextState();

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
              onClick={() => submitProposalForm()}
            >
              {metadataUploadIsLoading
                ? "Uploading to IPFS..."
                : submitProposalFormIsLoading
                ? "Submitting transaction..."
                : "Registrar propuesta"}
            </button>
          )}
        </div>

        {submitProposalSuccess && (
          <div className=" modal-background">
            <div className="modal bg-cit/60 h-96 grid items-center ">
              <div>
                <div className="text-8xl animate-bounce">🗳️</div>
                <div className="text-xl text-white animation-pulse ">
                  ¡Tu propuesta ha sido creada!{" "}
                </div>
              </div>
              <Link href="/proposals">
                <span className="homeBT">Ir a panel de propuestas</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProposalPage;
