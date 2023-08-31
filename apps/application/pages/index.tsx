import type { NextPage } from "next";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import Onboarding from "@/components/Onboarding";
import { useGlobalCycleStageState } from "@/contexts/GlobalStageCycleContext";

const Home: NextPage = () => {
  const { walletIsConnected } = useGlobalCycleStageState();
  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen">
      {!walletIsConnected ? <Carousel /> : <Onboarding />}
    </div>
  );
};

export default Home;
