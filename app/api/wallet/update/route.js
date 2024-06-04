import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Wallet } from "@/models/wallet";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, amount, transactionRef } = await req.json();

  const session = await getServerSession(authOptions);

  mongoose.connect(process.env.MONGODB_URI);

  try {
    // get the user wallet via email
    const userEmail = session?.user?.email;
    const userWallet = await Wallet.findOne({ user: userEmail });

    if (userWallet) {
      // update the db with the amount
      const newTransaction = {
        reference: transactionRef,
        amount,
        type: "fund",
      };
      userWallet.transactions.push(newTransaction);

      const lastTransaction =
        userWallet.transactions[userWallet.transactions.length - 1];

      if (lastTransaction.type === "fund") {
        userWallet.balance = parseInt(userWallet.balance) + parseInt(amount);
      } else if (lastTransaction.type === "withdrawal") {
        userWallet.balance = parseInt(userWallet.balance) - parseInt(amount);
      }

      await userWallet.save();

      return NextResponse.json({
        message: "Wallet updated successfully",
      });
    } else {
      return NextResponse.json({
        message: "User wallet not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Failed to update wallet",
    });
  }
};
