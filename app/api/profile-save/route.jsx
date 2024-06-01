import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { Wallet } from "@/models/wallet";

export const POST = async (req, res) => {
  const { validationResult, service } = await req.json();
  const { customerAddress, customerName, meterNumber, meterType } =
    validationResult;

  const session = await getServerSession(authOptions);
  mongoose.connect(process.env.MONGODB_URI);

  try {
    const userEmail = session?.user?.email;
    const userWallet = await Wallet.findOne({ user: userEmail });

    if (userWallet) {
      const newProfile = {
        customerAddress,
        customerName,
        meterNumber,
        meterType,
        service,
      };

      userWallet.profile.push(newProfile);
      await userWallet.save();

      return NextResponse.json({
        message: "profile saved successfully!",
      });
    } else {
      return NextResponse.json({
        error: "no wallet attached to user",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: `error saving profile: ${error}`,
    });
  }
};
