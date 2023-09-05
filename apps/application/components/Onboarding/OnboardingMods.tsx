import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useEventPoap } from "@/hooks/useEventPoap";
import { ScanModal } from "@/components/ScanModal";
import { useScanModal } from "@/hooks/useScanModal";
import Image from "next/image";
import Link from "next/link";

export function OnboardingMods() {
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

  const eventIdUsed = process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID as string;

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
          <div className="rounded-dd  grid items-center">
            <div
              className={
                addressHasPoap
                  ? "bg-white/50 h-fit mx-auto p-3 max-w-4xl grid items center rounded-dd"
                  : "bg-white/50 h-fit mx-auto p-3 max-w-4xl grid items center rounded-dd animate-pulse"
              }
            >
              {addressHasPoap ? (
                <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center relative">
                  <div className="">
                    <Image
                      src={"/assets/poaptest.png"}
                      height={250}
                      width={250}
                      alt="onboarding POAP"
                      className="rounded-full mx-auto"
                    />
                  </div>
                  <div className="xl:col-span-3 grid gap-3">
                    <div className="text-2xl font-bau">
                      Participaste en la Ceremonia de Moderadores
                    </div>
                    <div className="text-sm xl:text-lg font-bau">
                      Agosto, 2023 /
                      <span className="cursor-pointer hover:text-cit">
                        {" "}
                        <Link href="https://app.poap.xyz/token/6741694">
                          Ver POAP
                        </Link>
                      </span>
                    </div>
                    <div className="xl:text-lg text-justify xl:px-10">
                      Este POAP es certifica tu registro durante la ceremonia de
                      moderadores y te otorga ⛽ gas para interactuar en zengo.
                    </div>
                  </div>

                  <div className="xl:col-span-4">
                    <Link href="/ceremony">
                      <button
                        className="homeBT mt-10 w-fit mx-auto"
                        // onClick={() => claimViaPaymaster()}
                      >
                        Crear propuesta
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center px-5 relative">
                  <button className="closeBT" onClick={handleCloseModal}>
                    x
                  </button>
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
                    Este POAP certifica tu participación en el evento de
                    introducción para ciudadanos y te permite crear tu primer
                    propuesta de gobernanza sin gas⛽.
                  </div>
                  <div className="grid items-center xl:col-span-4">
                    <button
                      className={
                        addressHasPoap ? "hidden" : "homeBT mt-5 w-fit mx-auto"
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
