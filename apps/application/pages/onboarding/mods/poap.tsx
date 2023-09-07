import React, { useEffect } from "react";
import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const eventIdUsed = process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID as string;

const PoapModeratorsPage = ({
  eventInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const address = useAddress();
  const { claimPoap, poapScan, addressHasPoap, poapTokenId } =
    useOnboardingContextState();

  useEffect(() => {
    if (address) {
      poapScan(address, eventIdUsed);
    }
  }, [address]);

  const handleClaimPoap = async () => {
    if (address) {
      claimPoap(address, eventIdUsed);
    }
  };

  return (
    <div className="overflow-hidden text-center h-screen grid items-center relative px-32">
      <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center px-5 relative">
        <div className="grid items-center xl:col-span-4">
          {!addressHasPoap ? (
            <>
              <div className="POAPmargin">
                <div className="">
                  <Image
                    src={eventInfo.image_url}
                    height={250}
                    width={250}
                    alt="onboarding POAP"
                    className="rounded-full mx-auto animate-pulse w-auto h-auto"
                    priority={true}
                  />
                </div>
                <div className=" xl:text-xl text-justify bg-mod/70 py-3 px-5 w-full text-white">
                  <ul className="grid gap-3">
                    <li>
                      <span className="text-2xl">🎖️</span> Este POAP certifica
                      tu participación en el evento de introducción para
                      Moderadores de Zengo.
                    </li>
                    <li>
                      <span className="text-2xl">⛽</span>
                      Además te permite participar en este ciclo de gobernanza
                      sin gas.
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className={"homeBT mt-5 w-fit mx-auto"}
                onClick={handleClaimPoap}
              >
                Obtener POAP
              </button>
            </>
          ) : (
            <>
              <div className="POAPmargin">
                <div className="">
                  <Image
                    src={eventInfo.image_url}
                    height={250}
                    width={250}
                    alt="onboarding POAP"
                    className="rounded-full mx-auto"
                  />
                </div>
                <div className="grid gap-3">
                  <div className="text-2xl font-bau">
                    ¡Ahora tienes el POAP de moderadores!
                  </div>
                  <div className="text-sm xl:text-lg font-bau">
                    Septiembre, 2023 /
                    <span className="cursor-pointer hover:text-mod">
                      {poapTokenId ? (
                        <a
                          href={`https://app.poap.xyz/token/${poapTokenId}`}
                          target="_blank"
                        >
                          Ver POAP
                        </a>
                      ) : null}
                    </span>
                  </div>
                  <div className="xl:text-lg text-justify xl:px-10 bg-mod/70 px-5 py-3 text-white">
                    <ul className="grid gap-3">
                      <li>
                        <span className="text-2xl">🎖️</span> Participaste en el
                        evento de introducción y ahora puedes registrarte como
                        moderador.
                      </li>
                      <li>
                        <span className="text-2xl">⛽</span>
                        El POAP te otorga gas para las interacciones que
                        realices en Zengo a lo largo de este ciclo de
                        gobernanza.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Link href="/onboarding/mods/register">
                <button className="homeBT mt-5 w-fit mx-auto">
                  Listo! Solicitar mi rango de moderador
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  eventInfo: any;
}> = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": `${process.env.POAP_API_KEY}`,
    },
  };

  const eventInfoResponse = await fetch(
    `https://api.poap.tech/events/id/${eventIdUsed}`,
    options
  );

  const eventInfoResult = await eventInfoResponse.json();
  return {
    props: { eventInfo: eventInfoResult },
  };
};

export default PoapModeratorsPage;
