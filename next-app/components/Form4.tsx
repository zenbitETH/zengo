import Map from "./Map";
import Image from "next/image"
import file from "../assets/file2.jpg"


interface Evidence {
    date: string;
    description: string;
    evidenceForm: string
  }
  
  interface Proposal {
    name: string;
    type: string;
    description: string;
    location: string;
    evidence: Evidence
  }

interface Form4Props {
    proposal: Proposal;
  }

export default function Form4 (props: Form4Props) {
    const {proposal} = props;
    return(
        <div className='p-3 gap-3'>
            <div className="bg-white h-full rounded-dd grid ">
                <div className="text-left font-bau ">
                    <div className="text-xl pt-3 pl-3">{proposal?.name || "Título de la propuesta"}</div>
                    <div className="italic">{proposal?.type || "Tipo de propuesta"}</div>
                    <div className="text-justify pt-3 font-exo">
                        {proposal?.description || "Este el ejemplo de una propuesta"} 
                    </div>
                    <div className="mx-auto h-52 relative">
                        <Map/>
                    </div>
                </div>
                
                
                <div className=" h-full rounded-dd h-fit grid grid-cols-2">
                    <div className="text-left font-bau p-3">
                        <div>{proposal?.evidence?.date || "20/06/2023"}</div>
                        <div className="text-justify pt-3 font-exo">
                            {proposal?.evidence?.description || "Aquí va la descrición de tu propuesta  "}
                        </div>
                    </div>
                    <div className="h-full bg-gray-300/60 rounded-dd grid items-center text-white text-sm">
                        <Image
                                src={file}
                                width={1920}
                                height={1080}
                                alt="Carousel Button"
                                className="rounded-dd"
                            />
                    </div>
                </div>
               
            </div>
                               
        </div>
    )
}