import React, { useState } from "react";
// import Carousel from "./Carousel";

export const OnboardingStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const CommonOnboardingSteps = [
    {
      // Component: () => <Carousel />,
      name: "Intro Videos",
      //   state: {
      //     showWarning: isVisited("/") && contactInfoMissing,
      //     showSuccess: isVisited("/") && !contactInfoMissing,
      //   },
    },
    {
      Component: () => <div>Install Metamask</div>,
      name: "Wallet Installation",
      //   state: {
      //     showSuccess: isVisited("/education"),
      //   },
    },
    {
      Component: () => <div>Register/Connect Wallet</div>,
      name: "Connect",
      //   state: {
      //     showSuccess: isVisited("/about"),
      //   },
    },
    {
      Component: () => <div>Video + Poap claim + Role request</div>,
      name: "Moderators",
      //   state: {},
    },
  ];

  return (
    <>
      {/* <>{CommonOnboardingSteps[currentStep - 1].Component()}</> */}
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
            // onClick={() => submitProposalForm()}
          >
            Finalizar
          </button>
        )}
      </div>
    </>
  );
};
