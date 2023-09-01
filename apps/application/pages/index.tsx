import type { NextPage } from "next";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import { useGlobalCycleStageState } from "@/contexts/GlobalStageCycleContext";

const Home: NextPage = () => {
  const { walletIsConnected } = useGlobalCycleStageState();
  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen">
      {!walletIsConnected ? <Carousel /> : null}
      {walletIsConnected ? (
        <div className=" grid items-center h-screen text-white font-bau text-center">
          <div className=" mx-auto grid xl:grid-cols-3 gap-3 ">
            <div className="text-5xl animate-pulse xl:col-span-3 pb-3">
              Pronto comenzará el registro de propuestas y moderadores
            </div>
            <Link href="/empecemos">
              <div className="newBT hover:bg-white/75">
                <div className="text-9xl">
                  ⛽<div className="text-2xl">Obtener Gas</div>
                </div>
              </div>
            </Link>
            <Link href="/newProposal">
              <div className="newBT hover:bg-cit/75">
                <div className="text-9xl">
                  🗳️
                  <div className="text-2xl"> Registrar propuesta</div>
                </div>
              </div>
            </Link>
            <Link href="/ceremony">
              <div className="newBT hover:bg-mod/75">
                <div className="text-9xl">
                  🔍
                  <div className="text-2xl">Registrarse como moderador</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
