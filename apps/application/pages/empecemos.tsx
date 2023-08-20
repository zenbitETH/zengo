import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { ChainId } from "@biconomy/core-types";
import {
  IPaymaster,
  BiconomyPaymaster,
  IHybridPaymaster,
  SponsorUserOperationDto,
  PaymasterMode,
} from "@biconomy/paymaster";
import { Wallet, providers, ethers } from "ethers";
import Layout from "@/components/Layout";
import { useAddress } from "@thirdweb-dev/react";

export default function GasStation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [hasPoap, setHasPoap] = useState(false);
  const address = useAddress();
  const [walletAddress, setWalletaddress] = useState("");

  const eventId = process.env.NEXT_PUBLIC_POAP_EVENT_ID;
  const poap_api_key = process.env.NEXT_PUBLIC_POAP_API_KEY;
  const accessToken = process.env.NEXT_PUBLIC_POAP_AUTH_TOKEN;
  const secretCode = process.env.NEXT_PUBLIC_POAP_EDIT_CODE;
  // console.log("poapkey", eventId, poap_api_key, accessToken, secretCode)

  // biconomy part

  const provider = new providers.JsonRpcProvider(
    "https://rpc.ankr.com/optimism_testnet"
  );
  const wallet = new Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY || "",
    provider
  );

  const bundler: IBundler = new Bundler({
    bundlerUrl: "https://bundler.biconomy.io/api/v2/420/abc",
    chainId: ChainId.OPTIMISM_GOERLI_TESTNET,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  const paymaster = new BiconomyPaymaster({
    paymasterUrl:
      "https://paymaster.biconomy.io/api/v1/420/naL6CUCdQ.858103be-f118-4248-b53b-98b2f5326240", // you can get this value from biconomy dashboard. https://dashboard.biconomy.io
  });

  const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
    signer: wallet,
    chainId: ChainId.OPTIMISM_GOERLI_TESTNET,
    bundler: bundler,
    paymaster: paymaster,
  };

  useEffect(() => {
    if (address) {
      setWalletaddress(address);
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": `${poap_api_key}`,
      },
    };
    fetch(
      `https://api.poap.tech/actions/scan/${walletAddress}/${eventId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        response.statusCode === 404 ? setHasPoap(false) : setHasPoap(true);
      })
      .catch((err) => console.error(err));
    console.log(hasPoap);
  }, [address, hasPoap]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal2 = () => {
    console.log("can claim");
    setIsModal2Open(true);
  };

  const handleCloseModal2 = () => {
    setIsModal2Open(false);
  };

  const claimPoap = async () => {
    setIsModalOpen(true);
    // step 1: getting qr hashes
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
        "x-api-key": `${poap_api_key}`,
      },
      body: JSON.stringify({ secret_code: `${secretCode}` }),
    };

    let qr_hashes: any;
    await fetch(`https://api.poap.tech/event/${eventId}/qr-codes`, options)
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((response) => {
        qr_hashes = response;
      })
      .catch((err) => console.error(err));

    console.log("qr hashes are :", qr_hashes);
    let claimable_qr: any;
    // step 2: define which qr_hash is claimable
    for (let i = 0; i < qr_hashes.length; i++) {
      //  console.log(qr_hashes[i]); // prints all element one by one
      if (qr_hashes[i].claimed == false) {
        claimable_qr = qr_hashes[i].qr_hash;
        break;
      }
    }
    console.log("claimable_qr is: ", claimable_qr);

    //step 3: call the get claim_qr function to get the secret
    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
        "x-api-key": `${poap_api_key}`,
      },
    };

    let qr_secret: any;
    await fetch(
      `https://api.poap.tech/actions/claim-qr?qr_hash=${claimable_qr}`,
      options2
    )
      .then((response) => response.json())
      // .then(response => console.log(response))
      .then((response) => {
        qr_secret = response;
      })
      .catch((err) => console.error(err));

    console.log("secret code is: ", qr_secret.secret);

    //step4: claim poap step
    const options3 = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
        "x-api-key": `${poap_api_key}`,
      },
      body: JSON.stringify({
        address: address,
        qr_hash: claimable_qr,
        secret: qr_secret.secret,
      }),
    };
    console.log(options3);
    await fetch("https://api.poap.tech/actions/claim-qr", options3)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    await setIsModalOpen(false);
  };

  const createAccount = async () => {
    let biconomySmartAccount = new BiconomySmartAccount(
      biconomySmartAccountConfig
    );
    biconomySmartAccount = await biconomySmartAccount.init();
    console.log("owner: ", biconomySmartAccount.owner);
    console.log(
      "address: ",
      await biconomySmartAccount.getSmartAccountAddress()
    );
    return biconomySmartAccount;
  };

  const claimViaPaymaster = async () => {
    await setIsModal2Open(true);
    console.log("creating account");

    const smartAccount = await createAccount();

    const incrementTx = new ethers.utils.Interface(["function claim(address)"]);
    const data = incrementTx.encodeFunctionData("claim", [address]);

    const transaction = {
      to: "0x415B6E0d30d99313186D6a7A61b97F3B0cFada99", // smart contract
      data: data,
      // value: ethers.utils.parseEther('0.01'),
    };

    const partialUserOp = await smartAccount.buildUserOp([transaction]);

    const biconomyPaymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      // optional params...
    };

    console.log(partialUserOp);

    const paymasterAndDataResponse =
      await biconomyPaymaster.getPaymasterAndData(
        partialUserOp,
        paymasterServiceData
      );
    partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

    const userOpResponse = await smartAccount.sendUserOp(partialUserOp);

    console.log(userOpResponse);

    const transactionDetail = await userOpResponse.wait();

    console.log("transaction detail below");
    console.log(transactionDetail);
    await setIsModal2Open(false);
  };

  return (
    <Layout>
      <div className="from-cit to-mod bg-gradient-to-t h-screen grid items-center text-center mx-auto">
        <div className="grid gap-3 px-3 py-20 h-full text-white font-bau">
          <div className="rounded-dd  grid items-center">
            <div
              className={
                hasPoap
                  ? "bg-black/20 h-fit mx-auto p-3 max-w-4xl grid items center rounded-dd"
                  : "bg-black/20 h-fit mx-auto p-3 max-w-4xl grid items center rounded-dd animate-pulse"
              }
            >
              {hasPoap ? (
                <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center ">
                  <div className="">
                    <Image
                      src={"assets/poaptest.png"}
                      height={250}
                      width={250}
                      alt="onboarding POAP"
                      className="rounded-full"
                    />
                  </div>
                  <div className="xl:col-span-3 grid gap-3">
                    <div className="text-2xl font-bau">
                      Participaste en la Ceremonia de Moderadores
                    </div>
                    <div className="text-sm xl:text-lg font-bau">
                      Agosto, 2023 /
                      <span className="cursor-pointer hover:text-cit">
                        {" "}
                        <Link href="https://app.poap.xyz/token/6741694">
                          Ver POAP
                        </Link>
                      </span>
                    </div>
                    <div className="xl:text-lg text-justify xl:px-10">
                      Este POAP es certifica tu registro durante la ceremonia de
                      moderadores y te otorga ⛽ gas para interactuar en zengo.
                    </div>
                  </div>

                  <div className="xl:col-span-4">
                    <button
                      className="homeBT mt-10 w-fit mx-auto"
                      onClick={() => claimViaPaymaster()}
                    >
                      Obtener ⛽ 0.005 ETH
                    </button>
                    {isModal2Open && (
                      <div className="modal-background">
                        <div className="modal bg-white/30 ">
                          <button
                            className="closeBT"
                            onClick={handleCloseModal2}
                          >
                            x
                          </button>
                          <div className="grid gap-6 p-10">
                            <div className="text-2xl font-bau">
                              Tu ETH va en camino
                            </div>
                            <span className="text-8xl animate-pulse">🔥</span>
                            <div
                              className="text-xl animate-pulse" /*animate-none and "Tu dirección 0x123abc recibio 0.001 ETH para el gas de tus interacciones en Zengo" after gas is claimed*/
                            >
                              cargando...
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="font-exo p-3 gap-3 grid xl:grid-cols-4 items-center px-5">
                  <div className="">
                    <Image
                      src={"assets/poaptest.png"}
                      height={250}
                      width={250}
                      alt="onboarding POAP"
                      className="rounded-full"
                    />
                  </div>
                  <div className="xl:col-span-3 grid gap-3 text-2xl text-justify">
                    Participa en la ceremonia de moderadores para obtener tu
                    certificado de asistencia (POAP) y obtener gas ⛽ para usar
                    zengo: presupuesto descentralizado.
                  </div>
                  <div className="grid items-center xl:col-span-4">
                    <div
                      className={
                        hasPoap ? "hidden" : "homeBT mt-5 w-fit mx-auto"
                      }
                      onClick={claimPoap}
                    >
                      Obtener POAP
                    </div>
                    {isModalOpen && (
                      <div className="modal-background">
                        <div className="modal bg-white/30 ">
                          <button
                            className="closeBT"
                            onClick={handleCloseModal}
                          >
                            x
                          </button>
                          <div className="grid ">
                            <div>
                              <Image
                                src={"assets/poaptest.png"}
                                height={250}
                                width={250}
                                alt="onboarding POAP"
                                className="rounded-full animate-pulse" /*animate-none after POAP is claimed*/
                              />
                            </div>
                            <div className="text-2xl font-bau">
                              Tu poap va en camino
                            </div>
                            <div
                              className="text-xl animate-pulse" /*animate-none and "Tu dirección 0x123abc recibio el POAP que certifica <br/>tu asistencia al evento de intrroducción a Zengo" after POAP is claimed*/
                            >
                              cargando...
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
