import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { GetServerSideProps } from "next";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const RegisterModeratorRolePage = () => {
  const [moderatorType, setModeratorType] = useState<string>("0");
  const [moderatorPosition, setModeratorPosition] = useState<string>("");
  const [moderatorOrganization, setModeratorOrganization] =
    useState<string>("");

  const { setUserIsModerator, userIsModerator, connectedWallet, setVisible } =
    useOnboardingContextState();

  const router = useRouter();

  const postAddModerator = async (
    modAddress: string,
    modType: string,
    modPosition: string,
    modOrganization: string
  ) => {
    const response = await fetch("/api/modregistration", {
      method: "POST",
      body: JSON.stringify({
        modAddress,
        modType,
        modPosition,
        modOrganization,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    console.log({ responseData });

    if (responseData.receipt.status === 1) {
      setUserIsModerator(true);
      setVisible(false);
      router.push("/modsceremony");
      return;
    } else {
      console.log("Error: status !== 1");
      setVisible(false);
      return;
    }
  };

  const handleRegisterClick = () => {
    setVisible(true);
    if (
      connectedWallet !== undefined &&
      moderatorPosition !== "" &&
      moderatorOrganization !== ""
    ) {
      // addModeratorCall({
      //   modAddress: connectedWallet,
      //   modType: moderatorType,
      //   modPosition: moderatorPosition,
      //   modOrganization: moderatorOrganization,
      // });
      postAddModerator(
        connectedWallet,
        moderatorType,
        moderatorPosition,
        moderatorOrganization
      );
    } else {
      alert("Por favor llena todos los campos ");
      setVisible(false);
    }
  };

  //  useEffect(() => {
  if (userIsModerator) {
    router.push("/modsceremony");
  }
  //  }, [userIsModerator]);

  return (
    <div className="from-mod to-mod/60 bg-gradient-to-b text-center xl:h-full h-full grid items-center py-20 relative">
      <div className="modal bg-bgd/40 ">
        <div className="grid gap-6 text-left">
          <label className="formLabel" htmlFor="tipo-de-moderador">
            Registro moderadores Zengo
          </label>
          <div>
            <label className="formLabel" htmlFor="tipo-de-moderador">
              Tipo de moderador:
            </label>
            <select
              className="drop"
              id="tipo-de-moderador"
              name="tipo-de-moderador"
              value={moderatorType}
              onChange={(e) => setModeratorType(e.target.value)}
            >
              <option value="0">Organizaciones Civiles</option>
              <option value="1">Sector Privado</option>
              <option value="2">Academia</option>
              <option value="3">Gobierno</option>
              <option value="4">Moderador abierto</option>
            </select>
          </div>
          <div>
            <label className="formLabel" htmlFor="puesto">
              Puesto:
            </label>
            <input
              className="input"
              type="text"
              id="puesto"
              name="puesto"
              value={moderatorPosition}
              onChange={(e) => setModeratorPosition(e.target.value)}
            />
          </div>

          <div>
            <label className="formLabel" htmlFor="organizacion">
              Organización:
            </label>
            <input
              className="input"
              type="text"
              id="organizacion"
              name="organizacion"
              value={moderatorOrganization}
              onChange={(e) => setModeratorOrganization(e.target.value)}
            />
          </div>

          <button
            className="homeBT mx-auto mt-5"
            type="button"
            onClick={handleRegisterClick}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

// DEV_NOTE: Maybe check the user has poap to be able to navigate to this page

// export const getServerSideProps: GetServerSideProps = async () => {

// const sdk = new ThirdwebSDK("goerli", {
//   clientId: "YOUR_CLIENT_ID", // Use client id if using on the client side, get it from dashboard settings
//   secretKey: "YOUR_SECRET_KEY", // Use secret key if using on the server, get it from dashboard settings
// });
//   const address = await sdk.wallet.getAddress();

//   const res = await fetch(
//     `/api/poaps/scan?address=${address}&eventId=${eventId}`
//   );
//   const repo = await res.json();

//   return {
//     props: {},
//   };
// };

export default RegisterModeratorRolePage;
