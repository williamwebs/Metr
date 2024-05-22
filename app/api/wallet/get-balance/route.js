import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Wallet } from "@/models/wallet";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // check if the user has a wallet created already attached to their email address
    const userWallet = await Wallet.findOne({ user: session?.user?.email });
    console.log(userWallet);

    // check for the user's balance from the wallet collection in the db
    if (userWallet) {
      const currentBalance = userWallet.balance;
      console.log(currentBalance);

      return NextResponse.json({
        balance: currentBalance,
      });
    }

    // if no wallet found attacked to user email, create a new wallet for the user
    const newUserWallet = new Wallet({
      user: session?.user?.email,
      balance: "0",
    });

    await newUserWallet.save();
    console.log(newUserWallet);

    return NextResponse.json({
      message: "User wallet created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to register user wallet: ${error.message}`,
    });
  }
};
