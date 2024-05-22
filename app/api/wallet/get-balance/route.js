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

    const userWallet = await Wallet.findOne({ user: session?.user?.email });
    console.log(userWallet);

    if (userWallet) {
      const currentBalance = userWallet.balance;
      console.log(currentBalance);

      return NextResponse.json({
        balance: currentBalance,
      });
      // return new Response(
      //   JSON.stringify({
      //     balance: currentBalance,
      //   }),
      //   {
      //     status: 200,
      //   }
      // );
    }
    const newUserWallet = new Wallet({
      user: session?.user?.email,
      balance: "0",
    });

    await newUserWallet.save();

    console.log(newUserWallet);
    return NextResponse.json({
      message: "User wallet created successfully",
    });

    // return new Response(JSON.stringify(newUserWallet), { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to register user wallet: ${error.message}`,
    });
    return new Response("Failed to register user wallet!", { status: 500 });
  }
};
