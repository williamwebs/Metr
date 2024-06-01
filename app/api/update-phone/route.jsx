import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { Wallet } from "@/models/wallet";

export const POST = async (req, res) => {
  const { phoneNumber } = await req.json();

  const session = await getServerSession(authOptions);
  mongoose.connect(process.env.MONGODB_URI);

  try {
    const userEmail = session?.user?.email;
    const userWallet = await Wallet.findOne({ user: userEmail });

    if (userWallet) {
      const update = {
        $set: {
          "profile.0.phoneNumber": phoneNumber.toString(),
        },
      };

      const userWallet = await Wallet.findOneAndUpdate(
        { user: userEmail },
        update,
        { new: true }
      );

      return NextResponse.json({
        message: "phone number saved successfully!",
      });
    } else {
      return NextResponse.json({
        error: "no wallet attached to user",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: `error saving phone number: ${error}`,
    });
  }
};
