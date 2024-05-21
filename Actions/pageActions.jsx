import axios from "axios";

export async function validateBiller(formData) {
  const meternumber = formData.get("meternumber");
  // const disconamee = formData.get("disconame");
  const mtype = formData.get("mtype");
  const disconame = "Ibadan Electric";

  console.log("clicked");
  console.log(meternumber, disconame, mtype);

  // 62417430642

  try {
    // `https://mabrooktelecoms.com/api/validatemeter?meternumber=${meternumber}& &disconame=${disconame}& &mtype=${mtype}`

    const res = axios.post(
      `https://mabrooktelecoms.com/api/validatemeter?meternumber=${meternumber}& &disconame=${disconame}& &mtype=${mtype}`,
      {
        meternumber,
        disconame,
        mtype,
      },
      {
        headers: {
          Authorization: "cddfaf5469df98fb868dca0f2bf190c4495294ff",
        },
      }
    );

    // const response = await fetch(
    //   `https://mabrooktelecoms.com/api/validatemeter?meternumber=${meternumber}& &disconame=${disconamee}& &mtype=${mtype}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: process.env.TOKEN,
    //     },
    //   }
    // );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
