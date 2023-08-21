import Map from "@/components/Map";
import Image from "next/image";
import Link from "next/link";

export default function proposalDetail() {
  return (
    <div className="from-cit to-mod bg-gradient-to-t h-full xl:h-screen grid items-center text-center mx-auto pt-20 xl:pt-0">
      <div className="detailCard">
        <div className="bg-white/50 rounded-med h-full grid grid-rows-3 items-center gap-5 relative row-span-6">
          <div className="font-exo text-lg absolute top-0 flex justify-between w-full p-3 bg-cit rounded-med text-bgd">
            <div className="italic font-bold"> Propuesta #1</div>
            <div>
              <span className="text-sm -mb-2">
                Hecha el
                <span className="font-bold"> 02/06/2023 </span>
                por
              </span>
              <span className="font-bold text-sm"> 0x04...5cC9</span>
            </div>
          </div>
          <div className="text-left font-bau pt-16 px-5">
            <div className="text-2xl font-bold justify">
              Limpiar el parque Santa Mónica
            </div>
            <div className="italic">
              {" "}
              <span className="not-italic text-xl">👷</span>Solicitud de
              mantenimiento
            </div>
            <div className="text-justify pt-3 font-exo text-lg">
              Se solicita limpieza en el parque Santa Mónica, se añaden fotos
              del estado actual
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mx-5 items-center  bg-black/50 rounded-med relative">
            <div className=" rounded-med h-full text-white ">
              <div className="text-left font-bau p-3">
                <div className="text-justify  text-sm pt-3 font-exo font-bold">
                  Evidencia del 02/06/2023
                </div>

                <div className="text-justify text-sm pt-3 font-exo">
                  Foto del parque
                </div>
              </div>
            </div>
            <div className="h-full bg-gray-300/60 rounded-med grid items-center text-sm">
              <Image
                src={"/assets/file2.jpg"}
                width={1920}
                height={1080}
                alt="Carousel Button"
                className="rounded-2xl cursor-pointer"
              />
            </div>
          </div>

          <div id="map-parent" className="grid h-full relative">
            <Map />
            <div
              className="
                            absolute bottom-0 left-1/2 -translate-x-1/2 w-full 
                            text-center italic text-bgd
                            bg-cit backdrop-blur-md font-bold
                            p-1 rounded-b-med"
            >
              Queretaro, Mexico
            </div>
          </div>
        </div>

        <div className=" bg-white/50 rounded-dd row-span-6">
          <div className=" grid grid-rows-2  p-3 gap-3 h-full">
            <div className="blockedEvidence ">
              Los moderadores revisarán tu propuesta
            </div>

            {/* NEW PROPOSAL / BLOCKED EVIDENCE
                            <div className="blockedEvidence ">Moderators will review your proposal</div>

                            ON REVIEW / LOCAL REQUEST                            
                            <div className="newEvidence ">Upload local request</div>
                            
                            ON REVIEW / LOCAL RESPONSE
                            <div className="blockedEvidence2 ">Once you have the local response <br/> Please upload the file</div>

                            VOTING STATE / LOCAL EVIDENCE ONLY
                            <div className="grid grid-cols-2 gap-3 items-center  bg-white rounded-dd relative">
                            <div className="bg-white rounded-dd ">
                                <div className="text-left font-bau p-3">
                                    
                                    <div className="text-center">01/01/2023</div>
                                    <div className="text-justify text-sm pt-3 font-exo">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                                    </div>
                                </div>
                            </div>
                            <div className="h-full bg-gray-300/60 rounded-dd grid items-center text-sm">
                                Your evidence will be previewed here
                            </div>
                            <div className="absolute top-0 right-0 p-2 bg-gray-500 rounded-bl-dd rounded-tr-dd text-white text-sm ">
                                <div className="italic"> Local Request</div>
                                <div className="text-[12px] -mb-1">made on 01/02/23</div>
                                <div className="text-[12px]">made by 0x123..abc</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 items-center  bg-white rounded-dd relative">
                            <div className="bg-white rounded-dd ">
                                <div className="text-left font-bau p-3">
                                    
                                    <div className="text-center">01/01/2023</div>
                                    <div className="text-justify text-sm pt-3 font-exo">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                                    </div>
                                </div>
                            </div>
                            <div className="h-full bg-gray-300/60 rounded-dd grid items-center text-sm">
                                Your evidence will be previewed here
                            </div>
                            <div className="absolute top-0 right-0 p-2 bg-gray-500 rounded-bl-dd rounded-tr-dd text-white text-sm">
                                <div className="italic"> Local Response</div>
                                <div className="text-[12px] -mb-1">made on 01/02/23</div>
                                <div className="text-[12px]">made by 0x123..abc</div>
                            </div>
                        </div>
                        */}
          </div>
        </div>
        <div className="grid grid-rows-2 gap-3 row-span-6 ">
          <div className="stateCard row-span-2 ">
            <div className="mx-auto grid items-center gap-1 ">
              <div className=" text-white text-3xl">Estado de la propuesta</div>
              <div className="md:text-5xl text-3xl grid items-center pt-5 text-white font-exo">
                Por verificar
              </div>
              <div className="grid grid-cols-3 gap-2 px-3 pb-3 items-center">
                <Link href="/proposal-id-3" className="cardBT	">
                  {/* <div className="cardBT	"> */}{" "}
                  <span className="text-2xl">🔍 </span>Verificación municipal
                  {/* </div> */}
                </Link>
                <div className="cardBT	">
                  {" "}
                  <span className="text-2xl">🗳️ </span>Lista para fondeo
                </div>
                <div className="cardBT">
                  {" "}
                  <span className="text-2xl">❌ </span>Rechazar propuesta
                </div>
              </div>
            </div>
          </div>

          {/* 
                        NEW PROPOSAL STATE
                        <div className="stateCard row-span-2 ">
                            <div className="mx-auto grid gap-3">
                                <div className=" text-white text-3xl">Proposal State</div>
                                <div className="text-7xl">New Proposal</div>
                                <div className="grid grid-cols-2">
                                    <div className="cardBT	"> <span className="text-2xl">🔍 </span>Ask for local evidence</div>
                                    <div className="cardBT	"> <span className="text-2xl">🗳️ </span>Ready for voting</div>
                                </div>
                            </div>
                        </div>
                        
                        ON REVIEW STATE / WAITING FOR LOCAL EVIDENCE
                       <div className="stateCard row-span-2 ">
                            <div className="mx-auto grid gap-3">
                                <div className=" text-white text-3xl">Proposal State</div>
                                <div className="text-7xl">🔍On review
                                    <div className="text-2xl italic">Waiting for local evidence</div>
                                </div>
                            </div>
                        </div>


                        ON REVIEW / LOCAL EVIDENCE ON REVIEW
                        <div className="stateCard row-span-2 ">
                            <div className="mx-auto grid gap-3">
                                <div className=" text-white text-3xl">Proposal State</div>
                                <div className="text-7xl">🔍On review
                                    <div className="text-2xl italic">Local evidence on review</div>
                                </div>

                                <div className="grid grid-cols-2">
                                    <div className="cardBT	"> <span className="text-2xl">✅ </span>Mark as solved</div>
                                    <div className="cardBT	"> <span className="text-2xl">🗳️ </span>Ready for voting</div>
                                </div>
                            </div>
                        </div>
                    */}

          {/* SOLVED STATE
                        <div className="stateCard row-span-2 ">
                            <div className="mx-auto grid gap-3">
                                <div className=" text-white text-3xl">Proposal State</div>
                                <div className="text-7xl">✅Solved
                                    <div className="text-2xl italic">Solved with local evidence</div>
                                </div>
                            </div>
                        </div>
                    */}

          {/* VOTING STATE
                        <div className="stateCard row-span-2">
                            <div className="mx-auto grid gap-3">
                                <div className=" text-white text-3xl">Proposal State</div>
                                <div className="text-7xl">Voting</div>
                                <div className="voteCard">
                                    <div className="italic col-span-2">0/10 citizen moderators have voted <br/>
                                        2/10 government moderators have votes</div>
                                    <div className="cardBT"><span className="text-5xl">👍</span></div>
                                    <div className="cardBT"><span className="text-5xl">👎</span></div>
                                </div>
                            </div>
                        </div>
                        
                    */}
        </div>
      </div>
    </div>
  );
}
