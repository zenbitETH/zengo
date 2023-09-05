import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

const ConnectPage = () => {
  const address = useAddress();

  return (
    <div className="overflow-hidden text-center items-center relative my-40">
      <h1 className="text-3xl mb-10">Conectar la billetera de metamask</h1>
      <div className="mb-10">
        Ahora conectaremos la wallet de metamask a la aplicación para poder
        interactuar con la blockchain
      </div>
      <ConnectWallet
        auth={{
          loginOptional: true,
        }}
        style={{
          marginBottom: "50px",
        }}
      />
      <br />
      {address ? (
        <Link href="/onboarding/mods">
          <button className="homeBT">
            Siguiente paso: Responsabilidades de Moderador
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default ConnectPage;
