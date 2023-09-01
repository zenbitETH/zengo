import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  let addressHasPoap = false;

  if (req.query.address) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": `${process.env.POAP_API_KEY}`,
      },
    };

    fetch(
      `https://api.poap.tech/actions/scan/${req.query.address}/${req.query.eventId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log({ response });
        if (response.statusCode === 404) {
          console.log("this address doesn't have the poap");
          addressHasPoap = false;
        } else {
          console.log("this address OWNS the poap scanned");
          addressHasPoap = true;
        }
      })
      .catch((err) => console.error(err));
    // Get data from your database
    res.status(200).json(addressHasPoap);
  } else {
    res.status(200).json(false);
  }
}
