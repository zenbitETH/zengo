import { contractAddress_zengoDao } from "@/const/contracts";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
  if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID) {
    return res.status(400).json({
      message: "Missing client id",
    });
  }

  if (
    !req.body.modAddress ||
    !req.body.modType ||
    !req.body.modPosition ||
    !req.body.modOrganization
  ) {
    return res.status(400).json({
      message: "Missing parameters",
    });
  }
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY as string,
    "optimism-goerli",
    {
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID, // Use client id if using on the client side, get it from dashboard settings
      secretKey: process.env.THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
    }
  );
  const contract = await sdk.getContract(contractAddress_zengoDao);

  if (contract === null) {
    return res.status(400).json({
      message: "Contract not found",
    });
  }
  const data = await contract.call(
    "addModerator", // Name of your function as it is on the smart contract
    [
      req.body.modAddress,
      req.body.modType,
      req.body.modPosition,
      req.body.modOrganization,
    ]
  );

  return res.status(200).json(data);
};

export default handler;
