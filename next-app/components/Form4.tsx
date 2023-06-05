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
        <div className='p-5 gap-3 grid grid-cols-2 '>
            <div className="h-full">
                <div className="bg-white h-full rounded-dd grid ">
                    <div className="text-left font-bau p-3">
                        <div className="text-xl">{proposal?.name || "Proposal title"}</div>
                        <div className="italic">{proposal?.type || "Proposal type"}</div>
                        <div className="text-justify pt-3 font-exo">
                            {proposal?.description || "Proposal type"} 
                        </div>
                    </div>
                    
                    <div className="h-full relative">
                        <Map/>
                        <div className="
                            absolute bottom-0 left-1/2 -translate-x-1/2 w-full 
                            text-center italic text-white
                            bg-gray-800/75  
                            p-3 rounded-b-dd"
                        >
                            Queretaro, Mexico, 20.587834, -100.389245
                        </div>
                        
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-rows-2 h-full gap-3">
                    <div className="bg-white border-gray-400 border-2 h-full rounded-dd">
                        <div className="text-left font-bau p-3">
                            <div>{proposal?.evidence?.date || "Evidence date"}</div>
                            <div className="text-justify pt-3 font-exo">
                                {proposal?.evidence?.description || "Evidence description"}
                            </div>
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