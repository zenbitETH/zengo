import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import poap from '../assets/poaptest.png'
import { useAccount } from 'wagmi';
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ChainId } from "@biconomy/core-types"
import { IPaymaster, BiconomyPaymaster, IHybridPaymaster,SponsorUserOperationDto, PaymasterMode } from '@biconomy/paymaster'
import { Wallet, providers, ethers } from 'ethers';


export default function GasStation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [secretWord, setSecretWord] = useState("");
    const [hasPoap, setHasPoap] = useState(false);
    const { address } = useAccount();

    const eventId = process.env.NEXT_PUBLIC_POAP_EVENT_ID
    const poap_api_key = process.env.NEXT_PUBLIC_POAP_API_KEY
    const accessToken = process.env.NEXT_PUBLIC_POAP_AUTH_TOKEN
    const secretCode = process.env.NEXT_PUBLIC_POAP_EDIT_CODE

    // console.log("poapkey", eventId, poap_api_key, accessToken, secretCode)


    // biconomy part


const provider = new providers.JsonRpcProvider("https://rpc.ankr.com/optimism_testnet")
const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY || "", provider);

const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/420/abc',     
  chainId: ChainId.OPTIMISM_GOERLI_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const paymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/420/naL6CUCdQ.858103be-f118-4248-b53b-98b2f5326240' // you can get this value from biconomy dashboard. https://dashboard.biconomy.io
})

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
  signer: wallet,
  chainId: ChainId.OPTIMISM_GOERLI_TESTNET,
  bundler: bundler,
  paymaster:paymaster
}

    useEffect(() => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  'x-api-key': `${poap_api_key}`
                }
              };
              fetch(`https://api.poap.tech/actions/scan/${address}/${eventId}`, options)
                .then(response => response.json())
                .then(response => {
                    response.statusCode === 404 ? setHasPoap(false) : setHasPoap(true)
                  })
                .catch(err => console.error(err));
                  console.log(hasPoap)
    }, [address, hasPoap])
    

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal2 = () => {
        console.log("can claim")
        setIsModal2Open(true);
    };

    const handleCloseModal2 = () => {
        setIsModal2Open(false);
    };

    const claimPoap = async () => {
        await setIsModalOpen(true);
        // step 1: getting qr hashes
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Bearer ${accessToken}`,
              'x-api-key': `${poap_api_key}`
            },
            body: JSON.stringify({secret_code: `${secretCode}`})
          };
          
         let qr_hashes: any;
         await fetch(`https://api.poap.tech/event/${eventId}/qr-codes`, options)
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => {
                qr_hashes = response
            })
            .catch(err => console.error(err))

          await console.log("qr hashes are :", qr_hashes)

          let claimable_qr: any;
            // step 2: define which qr_hash is claimable
            for (let i = 0; i < qr_hashes.length; i++) {
                //  console.log(qr_hashes[i]); // prints all element one by one
                if(qr_hashes[i].claimed == false){
                    claimable_qr = qr_hashes[i].qr_hash;
                    break
                }
              }
              console.log("claimable_qr is: ", claimable_qr);

      
        //step 3: call the get claim_qr function to get the secret
        const options2 = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              authorization: `Bearer ${accessToken}`,
              'x-api-key': `${poap_api_key}`
            }
          };
          
          let qr_secret: any
          await fetch(`https://api.poap.tech/actions/claim-qr?qr_hash=${claimable_qr}`, options2)
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => {
                qr_secret = response
            })
            .catch(err => console.error(err));
            
           await console.log("secret code is: ", qr_secret.secret)

           //step4: claim poap step

           const options3 = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Bearer ${accessToken}`,
              'x-api-key': `${poap_api_key}`
            },
            body: JSON.stringify({
              address: address,
              qr_hash: claimable_qr,
              secret: qr_secret.secret
            })
          };
          await console.log(options3)

         await fetch('https://api.poap.tech/actions/claim-qr', options3)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        await setIsModalOpen(false)

    }

    const createAccount = async () => {
        let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
        biconomySmartAccount =  await biconomySmartAccount.init()
        console.log("owner: ", biconomySmartAccount.owner)
        console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
        return biconomySmartAccount;
      }

    const claimViaPaymaster = async () => {
        await setIsModal2Open(true)
        console.log("creating account")

        const smartAccount = await createAccount();
      
        const incrementTx = new ethers.utils.Interface(["function claim(address)"]);
          const data = incrementTx.encodeFunctionData("claim", [address]);
      
        const transaction = {
          to: '0x415B6E0d30d99313186D6a7A61b97F3B0cFada99', // smart contract 
          data: data,
          // value: ethers.utils.parseEther('0.01'),
        }
      
        const partialUserOp = await smartAccount.buildUserOp([transaction])
      
        const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      
        let paymasterServiceData: SponsorUserOperationDto = {
          mode: PaymasterMode.SPONSORED,
          // optional params...
        };
      
        console.log(partialUserOp)
      
        const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
        partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
      
        const userOpResponse = await smartAccount.sendUserOp(partialUserOp)
      
        console.log(userOpResponse)
      
        const transactionDetail = await userOpResponse.wait()
      
        console.log("transaction detail below")
        console.log(transactionDetail)
        await setIsModal2Open(false)
    }

    return (
        <div className="from-cit to-mod bg-gradient-to-t h-screen grid items-center text-center mx-auto">
            <div className="grid 2xl:grid-cols-2 gap-3 px-3 xl:px-32 py-20 h-full text-white font-bau">
                <div className="bg-black/20 rounded-dd h-full p-3 grid items-center">
                    <div className="text-3xl">1. Obtén el POAP que certifica tu participación:</div>
                    <div className={hasPoap ? "md:mx-16 mx-3 grid border rounded-dd p-3": "md:mx-16 mx-3 grid border rounded-dd p-3 animate-pulse" } /*animate-none after POAP is claimed*/>
                        <div>
                            <div className='font-exo  p-3 gap-3 grid'>
                                <div className='text-2xl font-bau'>Ceremonia de Moderadores</div>
                                <div><Image src={poap} height={250} width={250} alt='onboarding POAP' className='rounded-full'/></div>
                                
                                <div className='text-sm xl:text-lg3'>Mar 24, 2023 - Mar 31, 2023 (UTC-06:00)
                                    <div >Video Call (Zoom, GoogleMeet, etc) , POAPcet Onboarding</div>
                                </div>
                                
                                <div className='xl:text-lg'>
                                    Este POAP es certifica tu registro durante la ceremonia de moderadores y te otorga ⛽ gas para interactuar en zengo.
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className={hasPoap ? "hidden" : "homeBT mt-5 w-fit mx-auto"} onClick={claimPoap}/* hidden after POAP is claimed*/>Obtener POAP</div>
                    {isModalOpen && (
                    <div className="modal-background">
                        <div className="modal bg-white/30 ">
                            <button className='closeBT' onClick={handleCloseModal}>x</button>
                            <div className='grid '>
                                <div>
                                    <Image src={poap} height={250} width={250} alt='onboarding POAP'
                                    className='rounded-full animate-pulse' /*animate-none after POAP is claimed*//>
                                </div>
                                <div className='text-2xl font-bau'>Tu poap va en camino</div>
                                <div className='text-xl animate-pulse'  /*animate-none and "Tu dirección 0x123abc recibio el POAP que certifica <br/>tu asistencia al evento de intrroducción a Zengo" after POAP is claimed*/>
                                    cargando...
                                </div>
                            </div>
                        </div>
                    </div>
                    )}

                </div>
                <div className="bg-black/20 rounded-dd h-full p-3 grid items-center ">
                    <div className="text-3xl">2 Obtén gas con tu POAP del evento</div>
                    <div className="text-6xl animate-pulse font-exo gap-3 grid "
                     /* After POAP is claimed, replace text with 
                        <div className='font-bau'> ¡Tienes el POAP!</div>
                        <div className='text-xl'>Puedes solicitar 0.00025 ETH</div>
                        <div className='text-9xl'>⛽</div>*/>
                    <div className="text-6xl animate-pulse font-exo"> No cuentas con el POAP</div>
                        
                    </div>
                    <button className={hasPoap ? "poapBT mt-10 w-fit mx-auto border-white/50 text-white/50": "hidden"}/*cursor-pointer,text-white & border-white after POAP is claimed */ disabled={!hasPoap} onClick={() => claimViaPaymaster()} >Obtener Gas</button>
                    {isModal2Open && (
                    <div className="modal-background">
                        <div className="modal bg-white/30 ">
                            <button className='closeBT' onClick={handleCloseModal2}>x</button>
                            <div className='grid gap-6 p-10'>
                                <div className='text-2xl font-bau'>Tu ETH va en camino</div>
                                <span className='text-8xl animate-pulse'>🔥</span>
                                <div className='text-xl animate-pulse' /*animate-none and "Tu dirección 0x123abc recibio 0.001 ETH para el gas de tus interacciones en Zengo" after gas is claimed*/>
                                    cargando...
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div> 
            </div>
        </div>
    )
}