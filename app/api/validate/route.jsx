import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // destructure the form data to get the service, meterNumber & meterType
    const { meterNumber, meterType, service } = await req.json();

    console.log("Extracted values: ", meterType, meterNumber, service);

    const username = "anazawilliam1@gmail.com";
    const password = "Williampay#1";

    const credentials = btoa(username + ":" + password);
    const basicAuth = "Basic " + credentials;

    const response = await axios.post(
      `https://api-service.paybeta.ng/v1/electricity/validate`,
      {
        service: service,
        meterNumber: meterNumber,
        meterType: meterType,
      },
      {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({
      error: "Couldn't validate meter",
    });
  }
};
