import React from 'react';
import Link from 'next/link';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import Form3 from "../components/Form3";
import Form4 from "../components/Form4"
import ProgressBar from '../components/ProgressBar';
import { uploadIpfs } from '../utils/ipfs';
import SpaceTimeDAO_ABI from '../abi/SpaceTimeDAO.abi.json';


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

const Form = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [ipfsLoading, setIpfsLoading] = React.useState<boolean>(false);
  const [path, setPath] = React.useState<string>("");
  const [triggerTx, setTriggerTx] = React.useState<boolean>(false);
  const [evidence, setEvidence] = React.useState<Evidence>({
    date: "",
    description: "",
    evidenceForm: "",
  })
  const [proposal, setProposal] = React.useState<Proposal>({
    name: "",
    type: "",
    description: "",
    location: "",
    evidence: evidence,
  });

  const { config } = usePrepareContractWrite({
    address: '0x74A91C3BAaFCb2eB22Da68A369Ad4048d84C5f0C',
    abi: SpaceTimeDAO_ABI,
    functionName: 'create',
    args: [path]
  })
  const { write, data } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const uploadMetadata = async () => {
    try {
      setIpfsLoading(true);
      const { path } = await uploadIpfs({
        proposal
      })
      setIpfsLoading(false)
      if (path) {
        setPath(path);
        setTriggerTx(true);
      }
      return path;
    } catch (error) {
      setIpfsLoading(false)
      console.error(error);
    }
  }

  React.useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  React.useEffect(() => {
    console.log(path);
    console.log(triggerTx);
    if (triggerTx) {
      write?.(); 
    }
    setTriggerTx(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerTx])

  return (
    <div className="from-cit to-cit bg-gradient-to-b h-screen grid items-center text-center mx-auto">
      <form className='formCard'>
        {currentStep === 1 && (
          <div className=''>
           <ProgressBar currentStep={1}/>
           <Form1 proposal={proposal} setProposal={setProposal} nextStep={nextStep} />
          </div>
        )}
        {currentStep === 2 && (
          <div className=''>
            <ProgressBar currentStep={2}/>
            <Form2 nextStep={nextStep}/>
         </div>
        )}
        {currentStep === 3 && (
          <div className=''>
            <ProgressBar currentStep={3}/>
            <Form3 proposal={proposal} setProposal={setProposal} nextStep={nextStep} />
         </div>
        )}
        {currentStep === 4 && (
          <div className=''>
            <ProgressBar currentStep={4}/>
            <Form4 proposal={proposal}/>
          </div>
        )}
        <div className=" flex justify-between  m-auto mb-5 gap-5">
          {currentStep !== 1 && (
            <button
              type='button'
              className="formBT"
              onClick={prevStep}
            >
              Regresar
            </button>
          )}
          {currentStep !== 4 ? (
            <button
              type='button'
              className="formBT"
              onClick={nextStep}
            >
              Siguiente
            </button>
          ) : (
            <button
              type='button'
              className="formBT"
              onClick={() => uploadMetadata()}              
            >
              {ipfsLoading ? "Uploading to IPFS..." : isLoading ? "Uploading transaction..." : "Registrar propuesta"}
            </button>
          )}
        </div>

        {isSuccess && (
        <div className=" flex justify-between m-auto gap-5">
          Tu propuesta se creo satisfactoriamente! 
          <div>
            <Link href={`https://hyperspace.filfox.info/en/message/${data?.hash}`} > View CID on explorer </Link>
          </div>
        </div>
        )}
      </form>
    </div>
  );
};

export default Form;