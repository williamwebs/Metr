import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Wallet } from "@/models/wallet";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const userName = session?.user.name;
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;

  mongoose.connect(process.env.MONGODB_URI);

  const userWallet = await Wallet.findOne({ user: userEmail });

  try {
    if (userWallet) {
      const userProfileInfo = userWallet.profile;
      console.log(userProfileInfo);
      return NextResponse.json({
        userProfileInfo,
        userEmail,
        userImage,
        userName,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: `error: ${error}`,
    });
  }
};
