import { Wallet } from "@/models/wallet";
import { Vonage } from "@vonage/server-sdk";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req, res) => {
  const session = await getServerSession(authOptions);

  const vonage = new Vonage({
    apiKey: "yac069c09",
    apiSecret: "YFY0B27oIK3ZVvoz",
  });

  const from = "Metr";
  const messageText = "Metr SMS from vonage";

  try {
    // check if user has number saved in profile
    await mongoose.connect(process.env.MONGODB_URI);
    const userWallet = await Wallet.findOne({ user: session?.user?.email });
    let userPhoneNumber = userWallet.profile[0].phoneNumber;

    if (userPhoneNumber) {
      const modifiedPhoneNumber = parseInt("234" + userPhoneNumber.slice(1));

      const vonage_response = await vonage.sms.send({
        to: modifiedPhoneNumber, // make it a number not string
        from: "Metr",
        text: messageText,
      });

      return NextResponse.json({
        message: `Message sent successfully ${vonage_response}`,
      });
      /*
       return NextResponse.json({
        message: `modified phone number is: ${modifiedPhoneNumber}`,
      });
       */
    } else {
      return NextResponse.json({
        message: "no phone number found in profile",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: `Message not sent. Error: ${error}`,
    });
  }
};
