import type { NextPage } from "next";
import Carousel from "@/components/Carousel";
import { OnboardingMods } from "@/components/OnboardingMods";
import { useGlobalCycleStageState } from "@/contexts/GlobalStageCycleContext";

const Home: NextPage = () => {
  const { walletIsConnected } = useGlobalCycleStageState();
  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen">
      {!walletIsConnected ? <Carousel /> : <OnboardingMods />}
    </div>
  );
};

export default Home;
