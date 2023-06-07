import Map from "./Map"
import Link from "next/link"
import Image from "next/image"
import file from "../assets/file.png"

export default function daoProposals () {
    return(
        <div className='h-screen grid items-center'>
            <div className="card0">
                <div className="propDashboard">
                    <div className="propCard relative">
                        <div className="bg-white rounded-t-gen grid grid-cols-6 relative">
                            
                            <div className="col-span-4 p-5 my-auto">
                                <div className="italic">Proposal #1</div>
                                <div className="font-bold text-xl">Test proposal</div>
                                <div className="italic"> <span className="not-italic text-xl">💻</span>Online event</div>
                                <div className="text-sm">made on 02/06/2023</div>
                                <div className="text-sm">made by 0x04...5cC9</div>
                            </div>
                            <div className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-tr-gen 
                                rounded-bl-gen grid grid-rows-3"
                            >
                                <div className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-ssss"
                                >
                                    Voting
                                </div>
                                <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full">
                                    <div className="mx-auto">
                                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>     
                                    </div>
                                    <div className="mx-auto">
                                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>     
                                    </div>
                                    <div className="mx-auto">
                                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>     
                                    </div>  
                                    
                                </div>
                                <Link href='/proposal-id'>
                                    <div className="
                                        bg-mod hover:bg-mod 
                                        cursor-pointer hover:text-white 
                                        grid items-center 
                                        text-xl px-10 
                                        rounded-tl-gen"
                                    > 
                                        Details
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gray-200/50 rounded-b-gen relative">
                            <Map/>
                            <div className="
                                absolute bottom-0 left-1/2 -translate-x-1/2 w-full 
                                text-center italic text-white
                                bg-mod
                                p-3 rounded-b-dd"
                            >
                                Queretaro, Mexico, 20.587834, -100.389245
                            </div>
                        </div>
               
                    </div>
                    <div className="propCard relative">
                        <div className="bg-white rounded-t-gen grid grid-cols-6 relative">
                            
                            <div className="col-span-4 p-5 my-auto">
                                <div className="italic">Proposal #2</div>
                                <div className="font-bold text-xl">Clean the park</div>
                                <div className="italic"> <span className="not-italic text-xl">👷</span>Request work or          maintenance</div>
                                <div className="text-sm">made on 02/06/2023</div>
                                <div className="text-sm">made by 0x04...5cC9</div>
                            </div>
                            <div className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-tr-gen 
                                rounded-bl-gen grid grid-rows-3"
                            >
                                <div className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-gray-500 text-white"
                                >
                                    On review
                                </div>
                                <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full">
                                    <div className="mx-auto">
                                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>     
                                    </div>
                                    <div className="mx-auto">
                                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>     
                                    </div>
                                    <div className="mx-auto">
                                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>     
                                    </div>  
                                    
                                </div>
                                <Link href='/proposal-id-2'>
                                    <div className="
                                        bg-mod hover:bg-mod 
                                        cursor-pointer hover:text-white 
                                        grid items-center 
                                        text-xl px-10 
                                        rounded-tl-gen"
                                    > 
                                        Details
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gray-200/50 rounded-b-gen relative">
                            <Map/>
                            <div className="
                                absolute bottom-0 left-1/2 -translate-x-1/2 w-full 
                                text-center italic text-white
                                bg-mod
                                p-3 rounded-b-dd"
                            >
                                Queretaro, Mexico, 20.587834, -100.389245
                            </div>
                        </div>
               
                    </div>
                    <Link href='/newProposal'>
                        <div className="newProp h-[375px] rounded-gen text-white ">+ Add a new proposal</div>
                    </Link>
                </div>
                <div className="daoMembers">
                    <div className="bg-white/75 items-center grid text-center rounded-dd">
                        <div>
                            <div className="text-6xl ">1</div> 
                            <div className="text-xl">New</div>
                        </div>
                    </div>
                    <div className="bg-white/75 items-center grid text-center rounded-dd">
                        <div>
                            <div className="text-6xl ">0</div> 
                            <div className="text-xl">On review</div>
                        </div>
                    </div>
                    <div className="bg-white/75 rounded-dd col-span-2 items-center text-center grid">
                        <div>
                            <div className="text-6xl ">0</div> 
                            <div className="text-xl">Solved</div>
                        </div>
                    </div>
                    <div className="bg-white/75 rounded-dd col-span-2 row-span-2 items-center text-center grid grid-cols-2">
                        <div className="col-span-2">
                            <div className="text-6xl ">1</div> 
                            <div className="text-xl">Voting</div>
                        </div>
                        <div>
                            <div className="text-6xl ">0</div> 
                            <div className="text-xl">Funding</div>
                        </div>
                        <div>
                            <div className="text-6xl ">0</div> 
                            <div className="text-xl">Rejected</div>
                        </div>
                    </div>
                    <div className="bg-white/75 rounded-dd col-span-2 row-span-2 items-center text-center grid">
                        <div>
                            <div className="text-6xl ">2</div> 
                            <div className="text-xl">Total proposals</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}