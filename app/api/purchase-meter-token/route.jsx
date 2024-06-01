import { Wallet } from "@/models/wallet";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req, res) => {
  const {
    customerName,
    customerAddress,
    amount,
    meterNumber,
    meterType,
    service,
  } = await req.json();

  const session = getServerSession(authOptions);

  const username = process.env.AUTHORIZATION_USERNAME;
  const password = process.env.AUTHORIZATION_PASSWORD;

  const credentials = btoa(username + ":" + password);
  const basicAuth = "Basic " + credentials;

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // check if the user has a wallet created already attached to their email address
    const userWallet = await Wallet.findOne({ user: session?.user?.email });
    let userBalance = userWallet.balance;

    console.log(userBalance);

    //   get payBeta wallet balance using the endpoint
    let myWalletBalance = 0;

    // const username = "anazawilliam1@gmail.com";
    // const password = "Williampay#1";

    const response = await axios.get(
      "https://api-service.paybeta.ng/v1/wallet/balance",
      {
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(response.data);

    if (response.status === "successful") {
      myWalletBalance = response.data.availableBalance;
      console.log(myWalletBalance);

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
            "https://api-service.paybeta.ng/v1/electricity/purchase",
            {
              customerName,
              customerAddress,
              amount,
              meterNumber,
              meterType,
              service,
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

          if (res.status === "successful") {
            // deduct amount from user wallet & update the wallet balance
            userBalance = userBalance - amount;
            /*
              - email notification (nodemail)
              - SMS notification (vonage)
            */
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

    /* check if the amount entered is less than the balance
      if(amount <= wallet.balance) {
      check if the amount in my paybeta wallet is greater than / equall to the amount
        if(myWalletBalance > amount) {
          purchase meter token
          - deduct amount from user wallet
          - update the wallet balance
          - email notification (nodemail)
          - SMS notification (vonage)
        } else {
          throw error to contact the developer attaching my whatsapp Link
        }
      } else {
        throw error informing them that their wallet balance is insufficient for the transaction 
        further prompt them to fund their wallet to continue
      }
    */

    /*
      {
        "status": "successful",
        "message": "Request processed successfully.",
        "data": {
            "availableBalance": 4212.45,
            "pnd": false,
            "lienAmount": 0
        }
    }

        const myWalletBalance = response.data.availableBalance
        
      */
  } catch (error) {
    return NextResponse.json({
      error: "An error occures. Try again Later or contact the technical team",
    });
  }
};
