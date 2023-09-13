import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // step 1: getting qr hashes
  const getQrsPOSTOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.POAP_AUTH_TOKEN}`,
      "x-api-key": `${process.env.POAP_API_KEY}`,
    },
    body: JSON.stringify({
      secret_code: `${process.env.POAP_MODERATOR_EDIT_CODE}`, // This will change on type of onboarding: citizens/moderators
    }),
  };

  try {
    const qrHashesResponse = await fetch(
      `https://api.poap.tech/event/${req.query.eventId}/qr-codes`,
      getQrsPOSTOptions
    );

    const qrHashes = await qrHashesResponse.json();

    console.log("qrHashes are :", { qrHashes });

    if (!qrHashes) {
      res.status(200).json(false);
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
    if (claimableQeHashes.length > 0) {
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
        res.status(200).json(false);
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
          address: req.query.address,
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

      res.status(200).json({ claimForAddress });
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
