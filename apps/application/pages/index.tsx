import Carousel from "@/components/Carousel";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage: NextPage = () => {
  const [stateReady, setStateReady] = useState<boolean>(false);
  const { walletIsConnected } = useOnboardingContextState();

  const router = useRouter();

  useEffect(() => {
    if (walletIsConnected) {
      if (process.env.NEXT_PUBLIC_ZENGO_ONBOARDING === "moderators") {
        router.push("/onboarding/mods");
      } else if (process.env.NEXT_PUBLIC_ZENGO_ONBOARDING === "citizens") {
        router.push("/onboarding/citizens");
      } else {
        console.log(
          "Zengo onboarding should be off. status: ",
          process.env.NEXT_PUBLIC_ZENGO_ONBOARDING
        );
      }
    }
    setStateReady(true);
  }, [walletIsConnected]);

  // useEffect(() => {
  //   setStateReady(true);
  // }, []);

  return (
    <div className="from-cit to-mod bg-gradient-to-t h-full">
      {stateReady ? <Carousel /> : null}
    </div>
  );
};

export default HomePage;
