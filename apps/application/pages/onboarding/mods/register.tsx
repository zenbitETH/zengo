import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
    } else {
      console.log("Error: status !== 1");
      setVisible(false);
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
    <div className="from-mod to-mod/60 bg-gradient-to-b text-center xl:h-screen h-full grid items-center py-20 relative">
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

export default RegisterModeratorRolePage;
