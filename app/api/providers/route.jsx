import axios from "axios";
import { NextResponse } from "next/server";
import NextCors from "nextjs-cors";

export const GET = async (req, res) => {
  NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: ["*"],
    optionsSuccessStatus: 200,
  });

  try {
    const username = "anazawilliam1@gmail.com";
    const password = "Williampay#1";
    const baseURL = process.env.API_URL;

    const credentials = btoa(username + ":" + password);
    const basicAuth = "Basic " + credentials;

    const response = await axios.get(`${baseURL}/v1/electricity/providers`, {
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        message: `failed to fetch providers ${error}`,
      },
      500
    );
  }
};
