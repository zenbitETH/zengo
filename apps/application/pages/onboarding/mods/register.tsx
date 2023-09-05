import React from "react";

const RegisterModeratorRolePage = () => {
  return (
    <div className="text-center xl:h-screen h-full grid items-center py-20 relative">
      <div className="modal bg-mod/70 ">
        <form className="grid gap-6 text-left">
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
            >
              <option value="organizaciones-civiles">
                Organizaciones Civiles
              </option>
              <option value="sector-privado">Sector Privado</option>
              <option value="academia">Academia</option>
              <option value="gobierno">Gobierno</option>
              <option value="moderador-abierto">Moderador abierto</option>
            </select>
          </div>
          <div>
            <label className="formLabel" htmlFor="puesto">
              Puesto:
            </label>
            <input className="input" type="text" id="puesto" name="puesto" />
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
            />
          </div>

          <button className="homeBT mx-auto mt-5" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModeratorRolePage;
