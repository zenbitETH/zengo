import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useEventPoap } from "@/hooks/useEventPoap";
import { ScanModal } from "@/components/ScanModal";
import { useScanModal } from "@/hooks/useScanModal";
import Image from "next/image";
import Link from "next/link";

export function OnboardingCitizens() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { toggle, visible } = useScanModal(true);

  const address = useAddress();
  const [walletAddress, setWalletaddress] = useState("");

  const { claimPoap, poapScan, addressHasPoap } = useEventPoap();

  const eventIdUsed = process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID as string;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (address) {
      setWalletaddress(address);
    }
  }, [address]);

  useEffect(() => {
    const firstScan = async () => {
      await poapScan(walletAddress, eventIdUsed);

      await sleep(1000);

      toggle(); // after finishing the scan, toggle to hide the scan modal
    };
    if (walletAddress !== "") {
      firstScan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const handleClaimPoap = async () => {
    // setIsModal2Open(true);
    claimPoap(walletAddress, eventIdUsed);
    // setIsModal2Open(false);
  };

  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="md:mx-32 gap-3 pt-32 pb-36 font-bau h-full grid items-center px-3 relative">
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/Mwr3eJgp4_M"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
        <div
          className="homeBT fixed bottom-5 left-1/2 -translate-x-1/2"
          onClick={handleOpenModal}
        >
          Certificar participación
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-background ">
          <div className="rounded-dd  grid items-center mx-auto">
            <div className="POAPcard">
              {addressHasPoap ? (
                <div className="POAPmargin">
                  <div className="">
                    <Image
                      src={"/assets/POAPCit.png"}
                      height={250}
                      width={250}
                      alt="onboarding POAP"
                      className="rounded-full mx-auto"
                    />
                  </div>
                  <div className=" grid gap-3">
                    <div className="text-2xl font-bau">
                      ¡Ahora tienes el POAP de moderadores!
                    </div>
                    <div className="text-sm xl:text-lg font-bau">
                      Septiembre, 2023 /
                      <span className="cursor-pointer hover:text-mod">
                        {" "}
                        <Link href="https://app.poap.xyz/token/6741694">
                          Ver POAP
                        </Link>
                      </span>
                    </div>
                    <div className="xl:text-lg text-justify xl:px-10 bg-cit/70 px-5 py-3 text-white">
                      <ul className="grid gap-3">
                        <li>
                          <span className="text-2xl">🎖️</span>Este POAP
                          certifica tu participación en el evento de
                          introducción para ciudadanos
                        </li>
                        <li>
                          <span className="text-2xl">⛽</span>
                          El POAP te permite crear tu primer propuesta de
                          gobernanza sin gas.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="">
                    <Link href="/newProposal">
                      <button
                        className="homeBT mt-10 w-fit mx-auto hover:bg-cit/70 hover:border-white"
                        // onClick={() => claimViaPaymaster()}
                      >
                        Registrar Propuesta
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="POAPmargin">
                  <button className="closeBT" onClick={handleCloseModal}>
                    x
                  </button>
                  <div className="">
                    <Image
                      src={"/assets/POAPCit.png"}
                      height={250}
                      width={250}
                      alt="onboarding POAP"
                      className="rounded-full mx-auto animate-pulse"
                    />
                  </div>
                  <div className=" xl:text-xl text-justify bg-cit/70 py-3 px-5 w-full text-white">
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
                  <div className="grid items-center">
                    <button
                      className={
                        addressHasPoap
                          ? "hidden"
                          : "homeBT mt-5 w-fit mx-auto hover:bg-cit/70 hover:border-white"
                      }
                      onClick={handleClaimPoap}
                    >
                      Obtener POAP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {walletAddress ? <ScanModal visible={visible} toggle={toggle} /> : null}
    </div>
  );
}
