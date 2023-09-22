import { IClaimResponse } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IClaimResponse>
) {
  // check POST method
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed, use POST", claimed: false });
  }

  // step 1: getting qr hashes
  const secret_code =
    process.env.NEXT_PUBLIC_ZENGO_ONBOARDING !== "off"
      ? process.env.NEXT_PUBLIC_ZENGO_ONBOARDING === "moderators"
        ? (process.env.POAP_MODERATOR_EDIT_CODE as string)
        : process.env.NEXT_PUBLIC_ZENGO_ONBOARDING === "citizens"
        ? (process.env.POAP_CITIZEN_EDIT_CODE as string)
        : ""
      : "";
  const getQrsPOSTOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.POAP_AUTH_TOKEN}`,
      "x-api-key": `${process.env.POAP_API_KEY}`,
    },
    body: JSON.stringify({
      secret_code, // This will change on type of onboarding: citizens/moderators
    }),
  };

  try {
    const qrHashesResponse = await fetch(
      `https://api.poap.tech/event/${req.body.eventId}/qr-codes`,
      getQrsPOSTOptions
    );

    const qrHashes = await qrHashesResponse.json();

    console.log("qrHashes are :", { qrHashes });

    if (!qrHashes) {
      return res
        .status(200)
        .json({ error: "No QR Hashes found", claimed: false });
    }

    const claimableQeHashes = qrHashes
      ?.map((qrHash: any) => {
        if (qrHash.claimed === false) {
          return qrHash.qr_hash;
        }
      })
      .filter((qrHash: any) => qrHash !== undefined);

    console.log("claimableQeHashes is: ", { claimableQeHashes });

    // IF we have at least 1 Claimable QR Hash...
    if (claimableQeHashes.length === 0) {
      return res
        .status(200)
        .json({ error: "No Claimable QR Hashes found", claimed: false });
    }

    //step 3: call the get claim_qr function to get the secret
    const claimGetSecretGETOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.POAP_AUTH_TOKEN}`,
        "x-api-key": `${process.env.POAP_API_KEY}`,
      },
    };

    const qrHashSecretResponse = await fetch(
      `https://api.poap.tech/actions/claim-qr?qr_hash=${claimableQeHashes[0]}`,
      claimGetSecretGETOptions
    );

    const qrHashSecret = await qrHashSecretResponse.json();

    console.log("qrHashSecret secret code is: ", qrHashSecret.secret);

    if (!qrHashSecret) {
      return res
        .status(200)
        .json({ error: "No QR Hash Secret found", claimed: false });
    }

    //step4: claim poap step
    const claimForAddressPOSTOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.POAP_AUTH_TOKEN}`,
        "x-api-key": `${process.env.POAP_API_KEY}`,
      },
      body: JSON.stringify({
        address: req.body.address,
        qr_hash: claimableQeHashes[0],
        secret: qrHashSecret.secret,
      }),
    };

    const claimForAddressResponse = await fetch(
      "https://api.poap.tech/actions/claim-qr",
      claimForAddressPOSTOptions
    );
    const claimForAddress = await claimForAddressResponse.json();

    console.log({ claimForAddress });
    if (claimForAddress.claimed) {
      const scanOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": `${process.env.POAP_API_KEY}`,
        },
      };

      const scanFetchResponse = await fetch(
        `https://api.poap.tech/actions/scan/${req.body.address}/${req.body.eventId}`,
        scanOptions
      );

      const scanFetchResult = await scanFetchResponse.json();
      return res
        .status(200)
        .json({ claimed: true, tokenId: scanFetchResult.tokenId });
    } else {
      return res.status(200).json({ claimed: false, error: "Not claimed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ claimed: false, error: "Fatal error" });
  }
}
