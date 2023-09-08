import Carousel from "@/components/Carousel";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [stateReady, setStateReady] = useState<boolean>(false);
  const { walletIsConnected } = useOnboardingContextState();

  const router = useRouter();

  useEffect(() => {
    if (walletIsConnected) {
      router.push("/onboarding/mods");
    }
    setStateReady(true);
  }, [walletIsConnected]);

  // useEffect(() => {
  //   setStateReady(true);
  // }, []);

  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen">
      {stateReady ? <Carousel /> : null}
    </div>
  );
};

export default Home;
