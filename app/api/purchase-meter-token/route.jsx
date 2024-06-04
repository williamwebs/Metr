import { Wallet } from "@/models/wallet";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  const {
    customerName,
    customerAddress,
    amount,
    meterNumber,
    meterType,
    service,
    reference,
  } = await req.json();

  const session = await getServerSession(authOptions);

  const username = "anazawilliam1@gmail.com";
  const password = "Williampay#1";

  const credentials = btoa(username + ":" + password);
  const basicAuth = "Basic " + credentials;
  const baseURL = process.env.API_URL;

  // 62417430642

  console.log(
    customerName,
    customerAddress,
    amount,
    meterNumber,
    meterType,
    service,
    reference
  );

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // check if the user has a wallet created already attached to their email address
    const userWallet = await Wallet.findOne({ user: session?.user?.email });
    let userBalance = userWallet.balance;

    //   get admin wallet balance
    let myWalletBalance = 0;

    const response = await axios.get(`${baseURL}/v1/wallet/balance`, {
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response.data);

    if (response.status === "successful") {
      myWalletBalance = response.data.data.availableBalance;
      console.log(myWalletBalance);

      console.log(myWalletBalance < amount);
      return NextResponse.json({
        message: "fetch paybeta balance returned",
      });

      // check if the amount entered is less than the balance
      if (amount <= userBalance) {
        // check if the amount in my wallet is less than / equal to the amount
        if (myWalletBalance < amount)
          return NextResponse.json({
            message: "Technical issue. contact the developer on",
          });
        // else, purchase meter token

        if (myWalletBalance >= amount) {
          const res = await axios.post(
            `${baseURL}/v1/electricity/purchase`,
            {
              customerName,
              customerAddress,
              amount: parseInt(amount),
              meterNumber,
              meterType,
              service,
              reference,
            },
            {
              headers: {
                Authorization: basicAuth,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          console.log(res);
          console.log(res.data);
          console.log(res.status);
          console.log(res.data.data.token);
          console.log(res.data.data.unit);

          if (res.status === "successful") {
            // update the db with the transaction
            const newTransaction = {
              reference,
              amount,
              type: "withdrawal",
            };
            userWallet.transactions.push(newTransaction);

            // deduct amount from user wallet & update the wallet balance
            const lastTransaction =
              userWallet.transactions[userWallet.transactions.length - 1];

            if (lastTransaction.type === "fund") {
              userBalance = parseInt(userBalance) + parseInt(amount);
            } else if (lastTransaction.type === "withdrawal") {
              userBalance = parseInt(userBalance) - parseInt(amount);
            }

            // save in the db
            await userWallet.save();

            console.log(res.data.unit);

            let unit = res.data.data.unit;
            let token = res.data.data.token;

            // email notification (nodemail)
            let message = `You just purchased ${unit} units of electricity token. Welcome to the light! Here is your metr token ${token} - Metr`;
            try {
              await axios.post("/api/send-email", { message });

              console.log("mail sent!");
            } catch (error) {
              console.log("mail not sent!");
            }

            return NextResponse.json(res.data);
          } else {
            return NextResponse.json({
              error: "Transaction unsuccessful",
            });
          }
        }
      } else {
        return NextResponse.json({
          error:
            "Your balance is low for the transaction. Fund your wallet & try again",
        });
      }
    } else {
      return NextResponse.json({
        error: "Error fetching wallet balance. Try again!",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: "An error occures. Try again Later or contact the technical team",
    });
  }
};
