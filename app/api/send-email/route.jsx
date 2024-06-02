import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendMail } from "@/libs/mailService";

export const POST = async (req, res) => {
  const { message } = await req.json();

  const session = getServerSession(authOptions);

  try {
    const response = await sendMail(
      "Metr token purchased successfully from Metr App",
      "anazawilliam@yahoo.com",
      message
    );

    console.log(response);

    return NextResponse.json({
      message: "mail sent successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occures. Try again Later or contact the technical team",
    });
  }
};
