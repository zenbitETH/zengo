import Carousel from "@/components/Onboarding/Carousel";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

const OnboardingPage = () => {
  const address = useAddress();

  return (
    <div className="relative h-full ">
      <Carousel />
      <center>
        {!address ? (
          <ConnectWallet
            className="homeBT"
            btnTitle="Acceder"
            detailsBtn={() => {
              return <button className="homeBT"> Cuenta </button>;
            }}
            auth={{
              loginOptional: true,
            }}
          />
        ) : (
          <Link href="/onboarding/mods">
            <button className="homeBT">Continuar el proceso</button>
          </Link>
        )}
      </center>
    </div>
  );
};

export default OnboardingPage;
