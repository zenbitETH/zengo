import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useOnboardingContextState } from "@/contexts/OnboardingContext";

export const ScanModal: React.FC = () => {
  const { visible } = useOnboardingContextState();
  return visible
    ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-background">
            <div className="modal animate-pulse text-white">
              <div className="grid ">
                <div className="mb-10">
                  <Image
                    src={"/assets/zenload.png"}
                    height={250}
                    width={250}
                    alt="onboarding POAP"
                    className="rounded-full animate-spin"
                  />
                </div>
                <div className="text-2xl text-center">Cargando...</div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};
