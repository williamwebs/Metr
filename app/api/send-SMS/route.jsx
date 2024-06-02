import { Vonage } from "@vonage/server-sdk";

export const POST = async (req, res) => {
  const { message } = await req.json();
  const vonage = new Vonage({
    apiKey: "",
    apiSecret: "",
  });

  const from = process.env.VONAGE_VIRTUAL_NUMBER;

  try {
    const vonage_response = await vonage.sms.send({
      to: formData.get("number"),
      from,
      text: formData.get("text"),
    });

    return {
      response:
        vonage_response.messages[0].status === "0"
          ? `🎉 Message sent successfully.`
          : `There was an error sending the SMS. ${
              // prettier-ignore
              vonage_response.messages[0].error-text
            }`,
    };
  } catch (error) {
    return NextResponse.json({
      error: "Message not sent",
    });
  }
};
