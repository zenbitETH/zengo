import Link from "next/link";
import React, { useEffect } from "react";

const InstallWalletPage = () => {
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }
  }),
    [window.ethereum];

  return (
    <div className="overflow-hidden text-center items-center relative my-40">
      {typeof window.ethereum !== "undefined" ? (
        <>
          <h1 className="text-3xl mb-10">Metamask Installed</h1>
          <div className="mb-10">
            Ya tienes metamask instalado asique puedes avanzar al proximo paso
            para crear tu propia wallet
          </div>
          <Link href="/onboarding/connect">
            <button className="homeBT">
              Siguiente paso: Conectar mi billetara
            </button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl mb-10">Metamask Not Installed</h1>
          <div className="mb-20">
            Necesitas instalar metamask para poder avanzar al proximo paso
          </div>
          <br />
          <>
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
            >
              <button className="homeBT">Install Metamask</button>
            </a>
          </>
        </>
      )}
    </div>
  );
};

export default InstallWalletPage;
