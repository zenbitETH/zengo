import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";
import { getUser } from "./api/auth/[...thirdweb]";
// import { useEventPoap } from "@/hooks/useEventPoap";

export default function GasStation() {
  const address = useAddress();
  const [walletAddress, setWalletaddress] = useState("");

  const addressHasPoap = false;

  // const { claimPoap, poapScan, addressHasPoap } = useEventPoap();

  const eventIdUsed = process.env.NEXT_PUBLIC_POAP_CITIZEN_EVENT_ID as string; // process.env.NEXT_PUBLIC_POAP_MODERATOR_EVENT_ID as string; // TODO: to be changed based on the onboarding type (for citizens/for moderators)

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (address) {
      setWalletaddress(address);
    }
  }, [address]);

  useEffect(() => {
    const firstScan = async () => {
      // await poapScan(walletAddress, eventIdUsed);

      await sleep(1000);
    };
    if (walletAddress !== "") {
      firstScan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const handleClaimPoap = async () => {
    // setIsModal2Open(true);
    // claimPoap(walletAddress, eventIdUsed);
    // setIsModal2Open(false);
  };

  return (
    <div className="from-cit to-mod bg-gradient-to-t h-screen grid items-center text-center mx-auto">
      <div className="grid gap-3 px-3 py-20 h-full text-white font-bau">
        <div className="rounded-dd  grid items-center">
          <div
            className={
              addressHasPoap
                ? "bg-black/20 h-fit mx-auto p-3 max-w-4xl grid items center rounded-dd"
                : "bg-black/20 h-fit mx-auto p-3 max-w-4xl grid items center rounded-dd animate-pulse"
            }
          >
            {addressHasPoap ? (
              <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center ">
                <div className="">
                  <Image
                    src={"/assets/poaptest.png"}
                    height={250}
                    width={250}
                    alt="onboarding POAP"
                    className="rounded-full"
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
                  <button
                    className="homeBT mt-10 w-fit mx-auto"
                    // onClick={() => claimViaPaymaster()}
                  >
                    Obtener ⛽ 0.005 ETH
                  </button>
                </div>
              </div>
            ) : (
              <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center px-5">
                <div className="">
                  <Image
                    src={"/assets/poaptest.png"}
                    height={250}
                    width={250}
                    alt="onboarding POAP"
                    className="rounded-full"
                  />
                </div>
                <div className="xl:col-span-3 grid gap-3 text-2xl text-justify">
                  Participa en la ceremonia de moderadores para obtener tu
                  certificado de asistencia (POAP) y obtener gas ⛽ para usar
                  zengo: presupuesto descentralizado.
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
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
