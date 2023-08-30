import { useState, useEffect } from "react";

export function useEventPoap() {
  const [addressHasPoap, setAddressHasPoap] = useState<boolean>(false);

  const claimPoap = async (address: string) => {
    // step 1: getting qr hashes
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_POAP_AUTH_TOKEN}`,
        "x-api-key": `${process.env.NEXT_PUBLIC_POAP_API_KEY}`,
      },
      body: JSON.stringify({
        secret_code: `${process.env.NEXT_PUBLIC_POAP_EDIT_CODE}`,
      }),
    };

    let qr_hashes: any;
    await fetch(
      `https://api.poap.tech/event/${process.env.NEXT_PUBLIC_POAP_EVENT_ID}/qr-codes`,
      options
    )
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
        authorization: `Bearer ${process.env.NEXT_PUBLIC_POAP_AUTH_TOKEN}`,
        "x-api-key": `${process.env.NEXT_PUBLIC_POAP_API_KEY}`,
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
        authorization: `Bearer ${process.env.NEXT_PUBLIC_POAP_AUTH_TOKEN}`,
        "x-api-key": `${process.env.NEXT_PUBLIC_POAP_API_KEY}`,
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
  };

  const poapScan = async (address: string, eventId: string) => {
    const response = await fetch(
      `/api/poaps/scan?address=${address}&eventId=${eventId}`
    );
    const data = await response.json();
    console.log("poapScan ", { data });
    if (data === true) {
      setAddressHasPoap(true);
    }
  };

  return { claimPoap, poapScan, addressHasPoap };
}
