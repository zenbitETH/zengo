import Carousel from "@/components/Onboarding/Carousel";
// import InstallWalletPage from "@/components/Onboarding/InstallWallet";
import React, { useState } from "react";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [carouselActiveSection, setCarouselActiveSection] = useState(0);

  const nextCarouselSection = () => {
    setCarouselActiveSection(carouselActiveSection + 1);
  };

  const prevCarouselSection = () => {
    if (carouselActiveSection > 0) {
      setCarouselActiveSection(carouselActiveSection - 1);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // const CommonOnboardingSteps = [
  //   {
  //     Component: () => (
  //       <Carousel
  //         nextSection={nextCarouselSection}
  //         prevSection={prevCarouselSection}
  //       />
  //     ),
  //     name: "Intro Videos",
  //     //   state: {
  //     //     showWarning: isVisited("/") && contactInfoMissing,
  //     //     showSuccess: isVisited("/") && !contactInfoMissing,
  //     //   },
  //   },
  //   {
  //     Component: () => <InstallWalletPage />,
  //     name: "Wallet Installation",
  //     //   state: {
  //     //     showSuccess: isVisited("/education"),
  //     //   },
  //   },
  //   {
  //     Component: () => <div>Register/Connect Wallet</div>,
  //     name: "Connect",
  //     //   state: {
  //     //     showSuccess: isVisited("/about"),
  //     //   },
  //   },
  //   {
  //     Component: () => <div>Video + Poap claim + Role request</div>,
  //     name: "Moderators",
  //     //   state: {},
  //   },
  // ];

  return (
    <div className="relative h-full ">
      <Carousel />
    </div>
  );
};

export default OnboardingPage;
