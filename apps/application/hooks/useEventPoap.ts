import { useState, useEffect } from "react";

export function useEventPoap() {
  const [addressHasPoap, setAddressHasPoap] = useState<boolean>(false);

  const claimPoap = async (address: string, eventId: string) => {
    const claimApiResponse = await fetch(
      `/api/poaps/claim?address=${address}&eventId=${eventId}`
    );

    const claimApiData = await claimApiResponse.json();

    if (claimApiData.claimed) {
      console.log("claimed true");
      setAddressHasPoap(true);
    }
  };

  const poapScan = async (address: string, eventId: string) => {
    const response = await fetch(
      `/api/poaps/scan?address=${address}&eventId=${eventId}`
    );
    const data = await response.json();
    setAddressHasPoap(data.scan);
  };

  return { claimPoap, poapScan, addressHasPoap };
}
