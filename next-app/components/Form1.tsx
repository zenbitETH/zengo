import * as React from "react";

export default function Form1 (props: any) {
    const {proposal, setProposal} = props;        

    const handleNameChange = (event: any) => {
        const updatedProposal = {...proposal, name: event.target.value as string};
        setProposal(updatedProposal);
      };
    const handleTypeChange = (event: any) => {
        const updatedProposal = {...proposal, type: event.target.value as string};
        setProposal(updatedProposal);
      };
    const handleDescriptionChange = (event: any) => {
        const updatedProposal = {...proposal, description: event.target.value as string};
        setProposal(updatedProposal);
      };

    return(
        <div className='p-3 gap-5 grid'>
            <div>
                <div className='formLabel'>Proposal Title</div>
        
                <input type='text' placeholder='Name your proposal' className='placeholder:italic px-6 py-3 text-black w-full border-color1-500 mx-auto rounded-dd' onChange={handleNameChange}></input>
        
            </div>
            <div>
                <div className='formLabel'>Type of proposal</div>
                <select className='pl-5 text-black w-full rounded-dd px-6 py-3 border-color1-500' defaultValue="" onChange={handleTypeChange}>
                    <option className='formLabel' value="" selected>Please select</option>
                    <option>🗳️ Improvement in public administration</option>
                    <option>🌳 Face-to-face event</option>
                    <option>💻 Online event</option>
                    <option>⚠️ Security Report</option>
                    <option>👷 Request work or maintenance</option>
                    <option>⚙️ Add function to the DAO</option>
                </select>
            </div>
            <div className='row-span-2 w-full mx-auto h-72'>
                <div className='formLabel'>Description</div>
                <textarea placeholder='Describe your proposal' className='p-3 text-black w-full mx-auto rounded-dd placeholder:italic h-full border-color1-500' onChange={handleDescriptionChange}></textarea>
            </div>
        </div>
    )
}