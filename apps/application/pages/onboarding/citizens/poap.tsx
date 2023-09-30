import React, { useEffect } from "react";
import Image from "next/image";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const eventIdUsed = process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID as string;

const PoapCitizensPage = ({
  eventInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    claimPoap,
    poapScan,
    addressHasPoap,
    poapTokenId,
    connectedWallet,
    setAddressHasPoap,
  } = useOnboardingContextState();

  useEffect(() => {
    const checkIfScan = async () => {
      if (connectedWallet !== "" && addressHasPoap === false) {
        await poapScan(connectedWallet, eventIdUsed);
      }
    };
    checkIfScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClaimPoap = async () => {
    if (connectedWallet !== "" && addressHasPoap === false) {
      const claimResult = await claimPoap(connectedWallet, eventIdUsed);

      console.log({ claimResult });

      if (claimResult.claimed) {
        setAddressHasPoap(true);
        alert("POAP claimed successfully");
      } else {
        alert(claimResult.error);
      }
    }
  };

  return (
    <>
      <div className="bg-bgd/30 overflow-hidden text-center h-full grid items-center relative">
        <div className="font-exo p-3 gap-3 grid items-center mx-auto relative">
          <div className="POAPcard">
            {!addressHasPoap ? (
              <>
                <div className="POAPmargin">
                  <div className="">
                    {eventInfo?.image_url ? (
                      <Image
                        src={eventInfo.image_url}
                        height={250}
                        width={250}
                        alt="onboarding POAP"
                        className="rounded-full mx-auto animate-pulse w-auto h-auto"
                        priority={true}
                      />
                    ) : null}
                  </div>
                  <div className=" xl:text-xl text-justify bg-mod/70 py-3 px-5 w-full text-white">
                    <ul className="grid gap-3">
                      <li>
                        <span className="text-2xl">🎖️</span>Este POAP certifica
                        tu participación en el evento de introducción para
                        ciudadanos
                      </li>
                      <li>
                        <span className="text-2xl">⛽</span>
                        El POAP te permite crear tu primer propuesta de
                        gobernanza sin gas.
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  className={"homeBT my-5 w-fit mx-auto"}
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
                      ¡Ahora tienes el POAP de ciudadanos!
                    </div>
                    <div className="text-sm xl:text-lg font-bau">
                      Septiembre, 2023 /
                      <span className="cursor-pointer text-mod animate-pulse hover:animate-none hover:text-mod pl-1">
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
                          <span className="text-2xl">🎖️</span> Participaste en
                          el evento de introducción y ahora puedes crear tus
                          propuestas.
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
                <Link href="/proposals/new">
                  <button className="homeBT my-5 w-fit mx-auto">
                    Registrar Propuesta
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
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
    props: { eventInfo: eventInfoResult || {} },
  };
};

export default PoapCitizensPage;
