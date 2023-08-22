import React from "react";
import Link from "next/link";
import { getUser } from "./api/auth/[...thirdweb]";

export default function daoProposals() {
  return (
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
                    <div>votos recibidos</div>
                    <div className="text-6xl">10</div>
                  </div>
                </div>

                <Link href="/proposal-id-2">
                  <div
                    className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-center 
                                        rounded-br-gen"
                  >
                    27.7% del presupuesto descentralizado
                  </div>
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
                    <div>votos recibidos</div>
                    <div className="text-6xl">8</div>
                  </div>
                </div>

                <Link href="/proposal-id-2">
                  <div
                    className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-center 
                                        rounded-br-gen"
                  >
                    22.2% del presupuesto descentralizado
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
                    <div>votos recibidos</div>
                    <div className="text-6xl">3</div>
                  </div>
                </div>

                <Link href="/proposal-id-2">
                  <div
                    className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-center 
                                        rounded-br-gen"
                  >
                    8.3% del presupuesto descentralizado
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
                    <div>votos recibidos</div>
                    <div className="text-6xl">6</div>
                  </div>
                </div>

                <Link href="/proposal-id-2">
                  <div
                    className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-center 
                                        rounded-br-gen"
                  >
                    16.6% del presupuesto descentralizado
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
                    <div>Votos recibidos</div>
                    <div className="text-6xl">9</div>
                  </div>
                </div>

                <Link href="/proposal-id-2">
                  <div
                    className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-center 
                                        rounded-br-gen"
                  >
                    25% del presupuesto descentralizado
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="sortProposals">
          <div className="propBT">
            <div>
              <div className="text-6xl font-bold">1,000 DAI</div>
              <div>en el presupuesto descentralizado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const user = await getUser(context.req);

  console.log({ user });

  if (!user) {
    console.log("asdasdas");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
