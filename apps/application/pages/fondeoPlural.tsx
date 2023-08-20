import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function daoProposals() {
  return (
    <Layout>
      <div className="h-screen from-cit to-mod bg-gradient-to-t grid items-center ">
        <div className="card0">
          <div className="propDashboard">
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #1</div>
                  <div className="font-bold text-lg">
                    Limpiar el parque Santa Mónica
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">👷</span>Solicitud de
                    mantenimiento
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid row-span-2
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen
                                    bg-mod"
                  >
                    <div className="text-white">
                      <div>Votos asignados</div>
                      <div className="text-6xl">0</div>
                    </div>
                  </div>

                  <Link href="/proposal-id-2">
                    <span
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-br-gen"
                    >
                      Votar
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #2</div>
                  <div className="font-bold text-lg">
                    Falta de infraestructura en calle Urbanización
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">⚠️ </span>Reporte de
                    seguridad
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid row-span-2
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen
                                    bg-mod"
                  >
                    <div className="text-white">
                      <div>Votos asignados</div>
                      <div className="text-6xl">0</div>
                    </div>
                  </div>

                  <Link href="/proposal-id-2">
                    <div
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-br-gen"
                    >
                      Votar
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #3</div>
                  <div className="font-bold text-lg">
                    Transparentar obras públicas de Felipe Carrillo
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">🗳️</span>Mejora en la
                    administración pública
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid row-span-2
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen
                                    bg-mod"
                  >
                    <div className="text-white">
                      <div>Votos asignados</div>
                      <div className="text-6xl">0</div>
                    </div>
                  </div>

                  <Link href="/proposal-id-2">
                    <div
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-br-gen"
                    >
                      Votar
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #4</div>
                  <div className="font-bold text-lg">
                    Transparentar programa Shark Tank Querétaro{" "}
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">🗳️</span>Mejora en la
                    administración pública
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid row-span-2
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen
                                    bg-mod"
                  >
                    <div className="text-white">
                      <div>Votos asignados</div>
                      <div className="text-6xl">0</div>
                    </div>
                  </div>

                  <Link href="/proposal-id-2">
                    <div
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-br-gen"
                    >
                      Votar
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #5</div>
                  <div className="font-bold text-lg">
                    Ley para presupuesto descentralizado en Qro
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">🗳️</span>Mejora en la
                    administración pública
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid row-span-2
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen
                                    bg-mod"
                  >
                    <div className="text-white">
                      <div>Votos asignados</div>
                      <div className="text-6xl">0</div>
                    </div>
                  </div>

                  <Link href="/proposal-id-2">
                    <div
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-br-gen"
                    >
                      Votar
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="sortProposals grid-rows-2">
            <div className="propCD">
              <div>
                <div className="text-6xl font-bold">25 / 25</div>
                <div>puntos plurales</div>
              </div>
            </div>
            <div className="propCD">
              <div className="grid items-center">
                <div className="text-5xl font-bold">1,000 DAI</div>
                <div className="text-xl">en el presupuesto descentralizado</div>
              </div>
              <div className="mx-auto">
                <div className="homeBT">Despositar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
