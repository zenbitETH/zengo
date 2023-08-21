import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function Ceremony() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="bg-mod text-center xl:h-screen h-full grid items-center py-20 relative">
        <div className="fixed top-7 left-1/2 -translate-x-1/2 text-2xl font-bau text-white">
          Moderadores
        </div>
        <div className="modBT" onClick={handleOpenModal}>
          Registrarse
        </div>

        {isModalOpen && (
          <div className="modal-background ">
            <div className="modal bg-mod/70 ">
              <button className="closeBT" onClick={handleCloseModal}>
                x
              </button>
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
                  <input
                    className="input"
                    type="text"
                    id="puesto"
                    name="puesto"
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
                  />
                </div>

                <input
                  className="homeBT mx-auto mt-5"
                  type="submit"
                  value="Registrarse"
                />
              </form>
            </div>
          </div>
        )}
        <div className="card1">
          <div className="rounded-dd pt-3 text-white bg-black/20 relative">
            <div className="text-xl pb-3">Organizaciones Civiles</div>
            <div className="modGrid">
              <div className="modInfo">
                <div className="">1 </div>
                <div className="col-span-11">
                  <div className="font-bau text-lg ">
                    {" "}
                    Director de comunicación social
                  </div>
                  <div className="text-sm">
                    Instituto Nacional De Transparencia
                  </div>
                </div>
              </div>
              <div className="modInfo">
                <div className="">2 </div>
                <div className="col-span-11">
                  <div className="font-bau text-lg ">
                    {" "}
                    Director de comunicación social
                  </div>
                  <div className="text-sm">
                    Instituto Nacional De Transparencia
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-dd pt-3 text-white bg-black/20">
            <div className="text-xl pb-3">Sector Privado</div>
            <div className="modGrid">
              <div className="modInfo">
                <div className="">1 </div>
                <div className="col-span-11">
                  <div className="font-bau text-lg ">
                    {" "}
                    Director de comunicación social
                  </div>
                  <div className="text-sm">
                    Instituto Nacional De Transparencia
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-dd pt-3 text-white bg-black/20">
            <div className="text-xl pb-3">Academia</div>
            <div className="modGrid">
              <div className="modInfo">
                <div className="">1 </div>
                <div className="col-span-11">
                  <div className="font-bau text-lg ">
                    {" "}
                    Director de comunicación social
                  </div>
                  <div className="text-sm">
                    Instituto Nacional De Transparencia
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-dd pt-3  text-white bg-black/20">
            <div className="text-xl pb-3">Gobierno</div>
            <div className="modGrid">
              <div className="modInfo">
                <div className="">1 </div>
                <div className="col-span-11">
                  <div className="font-bau text-lg ">
                    {" "}
                    Director de comunicación social
                  </div>
                  <div className="text-sm">
                    Instituto Nacional De Transparencia
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-dd pt-3  text-white bg-black/20">
            <div className="text-xl pb-3">Moderador Abierto</div>
            <div className="modGrid">
              <div className="modInfo">
                <div className="">1 </div>
                <div className="col-span-11">
                  <div className="font-bau text-lg ">
                    {" "}
                    Director de comunicación social
                  </div>
                  <div className="text-sm">
                    Instituto Nacional De Transparencia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
