import { Vonage } from "@vonage/server-sdk";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { phoneNumber } = await req.json();
  const vonage = new Vonage({
    apiKey: "",
    apiSecret: "",
  });

  const from = process.env.VONAGE_VIRTUAL_NUMBER;

  try {
    // check if user has number saved in profile
    const vonage_response = await vonage.sms.send({
      to: phoneNumber, // make it a number not string
      from,
      text: formData.get("text"),
    });

    return NextResponse.json({
      response:
        vonage_response.messages[0].status === "0"
          ? `🎉 Message sent successfully.`
          : `There was an error sending the SMS. ${
              // prettier-ignore
              vonage_response.messages[0].error-text
            }`,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Message not sent",
    });
  }
};
