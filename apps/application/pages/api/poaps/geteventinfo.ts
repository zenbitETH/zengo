import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.eventId === undefined)
    return res.status(400).json({ message: "Event id is required" });
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const eventInfoResponse = await fetch(
      `https://api.poap.tech/events/id/${req.query.eventId}`,
      options
    );

    const eventInfoResult = await eventInfoResponse.json();
    console.log({ eventInfoResult });
    res.status(200).json({
      message: "Event info fetched successfully",
      eventInfo: eventInfoResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching event info",
      error,
    });
  }
}
