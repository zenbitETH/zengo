import { useOnboardingContextState } from "@/contexts/OnboardingContext";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const RegisterModeratorRolePage = () => {
  const [moderatorType, setModeratorType] = useState<string>("0");
  const [moderatorPosition, setModeratorPosition] = useState<string>("");
  const [moderatorOrganization, setModeratorOrganization] =
    useState<string>("");

  const address = useAddress();

  const { addModeratorCall, userIsModerator } = useOnboardingContextState();

  const router = useRouter();

  const handleRegisterClick = () => {
    if (
      address !== undefined &&
      moderatorPosition !== "" &&
      moderatorOrganization !== ""
    ) {
      addModeratorCall({
        modAddress: address,
        modType: moderatorType,
        modPosition: moderatorPosition,
        modOrganization: moderatorOrganization,
      });
    } else {
      alert("Por favor llena todos los campos ");
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