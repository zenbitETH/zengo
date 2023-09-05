import React from "react";
import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";
import { useGlobalCycleStageState } from "@/contexts/GlobalStageCycleContext";
import Link from "next/link";

const eventIdUsed = process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID as string;

const PoapModeratorsPage = () => {
  const address = useAddress();
  const { claimPoap, addressHasPoap } = useGlobalCycleStageState();

  const handleClaimPoap = async () => {
    if (address) {
      // setIsModal2Open(true);
      claimPoap(address, eventIdUsed);
      // setIsModal2Open(false);
    }
  };

  return (
    <div className="overflow-hidden text-center h-screen grid items-center relative px-32">
      <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center px-5 relative">
        <div className="">
          <Image
            src={"/assets/poaptest.png"}
            height={250}
            width={250}
            alt="onboarding POAP"
            className="rounded-full mx-auto"
          />
        </div>
        <div className="xl:col-span-3 grid gap-3 text-2xl text-justify px-5">
          Este POAP certifica tu participación en el evento de introducción para
          ciudadanos y te permite crear tu primer propuesta de gobernanza sin
          gas⛽.
        </div>
        <div className="grid items-center xl:col-span-4">
          {!addressHasPoap ? (
            <button
              className={"homeBT mt-5 w-fit mx-auto"}
              onClick={handleClaimPoap}
            >
              Obtener POAP
            </button>
          ) : (
            <Link href="/onboarding/mods/register">
              <button className="homeBT mt-5 w-fit mx-auto">
                Listo! Solicitar mi rango de moderador
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoapModeratorsPage;
