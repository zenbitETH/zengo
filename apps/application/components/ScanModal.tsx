import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

type ScanModalProps = {
  visible: boolean;
  toggle: () => void;
};

export const ScanModal: React.FC<ScanModalProps> = ({ visible, toggle }) =>
  visible
    ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-background">
            <div className="modal bg-white/30 ">
              <div className="grid ">
                <div className="mb-10">
                  <Image
                    src={"/assets/zengo.svg"}
                    height={250}
                    width={250}
                    alt="onboarding POAP"
                    className="rounded-full animate-pulse"
                  />
                </div>
                <div className="text-xl animate-pulse">Cargando...</div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
