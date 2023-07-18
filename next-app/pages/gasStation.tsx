import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import poap from '../assets/poaptest.png'
import { useAccount } from 'wagmi';
import axios from 'axios';



// poap api key: 0yYbM2ktD4SPSsFu1TXidinC7Q2ACRN9LmkWSQQGX2T809jdVYsoGiHmNSr0a4dBEafZ7hcMUz6IXrQUhx7cjHo46MWP5pTS3jBwfJeOW00h70EeA0JU6XQ7fx3v1QD7 



export default function GasStation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [secretWord, setSecretWord] = useState("");
    const [hasPoap, setHasPoap] = useState(false);
    const { address } = useAccount();

    const eventId = "141409"
    const poap_api_key = "0yYbM2ktD4SPSsFu1TXidinC7Q2ACRN9LmkWSQQGX2T809jdVYsoGiHmNSr0a4dBEafZ7hcMUz6IXrQUhx7cjHo46MWP5pTS3jBwfJeOW00h70EeA0JU6XQ7fx3v1QD7"
    const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qQTNOalpGUWpkRE9ESTNRa0V3UlVSRE9VVkVNRVUxT1VVd1JrSTNNRGs1TlRORVFqUTNSUSJ9.eyJpc3MiOiJodHRwczovL2F1dGguYWNjb3VudHMucG9hcC54eXovIiwic3ViIjoic3MybGNiM1Vmd1pKT0NNVkxTZmlERUNkckd0YThVWmhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnBvYXAudGVjaCIsImlhdCI6MTY4OTQ4MTA5MSwiZXhwIjoxNjg5NTY3NDkxLCJhenAiOiJzczJsY2IzVWZ3WkpPQ01WTFNmaURFQ2RyR3RhOFVaaCIsInNjb3BlIjoibWludCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbIm1pbnQiXX0.GflHKxcTpBkLyyjdcVmaeZQsazeb68Gu7X2ERJNceAqdXMpH-pHbldpMN7_GM5dnMj-TOMU5YeW7m-b_RMfweA1KVUwpeeu-Llg5TZtoZHMyTkT1g_LdwPwkDvEeYXdMWexGA2B0vvkSVJ8FLHyVY8bIQFZEVXKqLPL-OICyDCZAshIG4DfWtGQTFzHr-D9eCSanXsTYyy21JTu8yAMN2OSUOnFLgPyRaSGNy4Y3g0j7t4cRpI54VACGoARExmK29sm5igsxFA7t2ZoeAT66-MXpeezkrY25jDmqQYiwglhte3-Kxo1m-M516qRySkgZxkKlaNOkpC8hv9WdxvcRGg"

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-api-key': poap_api_key
            }
          };
          
          fetch(`https://api.poap.tech/actions/scan/${address}/${eventId}`, options)
            .then(response => response.json())
            .then(response => {
                response.statusCode === 404 ? setHasPoap(false) : setHasPoap(true)
              })
            .catch(err => console.error(err));
    }, [address])
    

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
        // step 1: getting qr hashes
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Bearer ${accessToken}`,
              'x-api-key': `${poap_api_key}`
            },
            body: JSON.stringify({secret_code: '859707'})
          };
          
         let qr_hashes: any;
         await fetch('https://api.poap.tech/event/141409/qr-codes', options)
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
    }

    return (
        <div className="from-cit to-mod bg-gradient-to-t h-screen grid items-center text-center mx-auto">
             
            <div className="grid 2xl:grid-cols-2 gap-3 px-3 xl:px-32 py-20 h-full text-white font-bau">
                <div className="bg-black/20 rounded-dd h-full p-3 grid items-center">
                    <div className="text-3xl">1. Obtén el POAP que certifica tu participación:</div>
                    <div className="md:mx-32 mx-3 grid">
                        <div className="text-xl font-exo pb-5">Ingresa la palabra secreta del evento:</div>
                        <input type='text' placeholder='Escribe la palabra una vez que termine el evento' className='input font-exo text-xl' onChange={e => setSecretWord(e.target.value)}></input>
                    </div>
                    <div className="homeBT mt-5 w-fit mx-auto" onClick={claimPoap}>Obtener POAP</div>
                    {isModalOpen && (
                    <div className="modal-background">
                        <div className="modal bg-white/30 ">
                            <button className='closeBT' onClick={handleCloseModal}>x</button>
                            <div className='grid gap-6 p-3'>
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
                    <div className="text-6xl animate-pulse font-exo"> No cuentas con el POAP</div>
                    <button className="homeBT mt-10 w-fit mx-auto" onClick={handleOpenModal2} disabled={hasPoap}>Obtener gas</button>
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