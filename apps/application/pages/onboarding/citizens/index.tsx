import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import Link from "next/link";
import React from "react";

const CitizensVideoPage = () => {
  const { addressHasPoap } = useOnboardingContextState();

  return (
    <div className="overflow-hidden text-center h-full grid items-center relative">
      <div className=" m-auto gap-3 pt-5 font-bau h-full grid items-center px-3 relative">
        <iframe
          className="xl:w-[1280px] xl:h-[720px]  rounded-2xl"
          src="https://www.youtube.com/embed/Mwr3eJgp4_M"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />

        {!addressHasPoap ? (
          <Link href="/onboarding/citizens/poap">
            <button className="homeBT fixed bottom-5 left-1/2 -translate-x-1/2">
              Certificar participación
            </button>
          </Link>
        ) : (
          <Link href="/proposals">
            <button className="homeBT fixed bottom-5 left-1/2 -translate-x-1/2">
              Continuar al panel de propuestas
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CitizensVideoPage;
